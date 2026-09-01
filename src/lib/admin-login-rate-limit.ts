import { createHmac } from "node:crypto";
import { prisma } from "@/lib/prisma";

const MAX_FAILURES = 5;
const WINDOW_MS = 15 * 60 * 1000;

function fingerprintRequest(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwardedFor || request.headers.get("x-real-ip") || "unknown";
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not defined.");
  }

  return createHmac("sha256", secret).update(ip).digest("hex");
}

export async function getAdminLoginLimit(request: Request) {
  const fingerprint = fingerprintRequest(request);
  const attempt = await prisma.adminLoginAttempt.findUnique({
    where: { fingerprint },
  });
  const now = Date.now();

  if (attempt?.blockedUntil && attempt.blockedUntil.getTime() > now) {
    return {
      fingerprint,
      blocked: true,
      retryAfter: Math.ceil((attempt.blockedUntil.getTime() - now) / 1000),
    };
  }

  return { fingerprint, blocked: false, retryAfter: 0 };
}

export async function recordAdminLoginFailure(fingerprint: string) {
  const existing = await prisma.adminLoginAttempt.findUnique({
    where: { fingerprint },
  });
  const now = new Date();
  const withinWindow =
    existing && now.getTime() - existing.updatedAt.getTime() < WINDOW_MS;
  const failures = withinWindow ? existing.failures + 1 : 1;
  const blockedUntil =
    failures >= MAX_FAILURES ? new Date(now.getTime() + WINDOW_MS) : null;

  await prisma.adminLoginAttempt.upsert({
    where: { fingerprint },
    update: { failures, blockedUntil },
    create: { fingerprint, failures, blockedUntil },
  });
}

export async function clearAdminLoginFailures(fingerprint: string) {
  await prisma.adminLoginAttempt.deleteMany({ where: { fingerprint } });
}

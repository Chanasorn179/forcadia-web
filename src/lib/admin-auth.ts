import {
  createHmac,
  timingSafeEqual,
} from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "forcadia_admin_session";
const SESSION_PAYLOAD = "forcadia-admin-v1";
const SESSION_MAX_AGE = 60 * 60 * 8;
const EXAMPLE_VALUES = new Set([
  "YOUR_ADMIN_PASSWORD",
  "YOUR_RANDOM_SECRET_AT_LEAST_32_CHARACTERS",
]);

function getRequiredEnv(name: "ADMIN_PASSWORD" | "ADMIN_SESSION_SECRET") {
  const value = process.env[name];

  if (!value || EXAMPLE_VALUES.has(value)) {
    throw new Error(`${name} is not defined.`);
  }

  if (name === "ADMIN_SESSION_SECRET" && value.length < 32) {
    throw new Error("ADMIN_SESSION_SECRET must be at least 32 characters.");
  }

  return value;
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

function signSessionPayload(payload: string) {
  return createHmac("sha256", getRequiredEnv("ADMIN_SESSION_SECRET"))
    .update(payload)
    .digest("hex");
}

function createSessionToken(expiresAt: number) {
  const payload = `${SESSION_PAYLOAD}.${expiresAt}`;

  return `${expiresAt}.${signSessionPayload(payload)}`;
}

function verifySessionToken(token: string) {
  const [expiresAtValue, signature, ...extraParts] = token.split(".");
  const expiresAt = Number(expiresAtValue);

  if (
    extraParts.length > 0 ||
    !signature ||
    !Number.isSafeInteger(expiresAt) ||
    expiresAt <= Date.now()
  ) {
    return false;
  }

  const expectedSignature = signSessionPayload(
    `${SESSION_PAYLOAD}.${expiresAt}`,
  );

  return safeEqual(signature, expectedSignature);
}

export function verifyAdminPassword(password: string) {
  return safeEqual(password, getRequiredEnv("ADMIN_PASSWORD"));
}

export async function createAdminSession() {
  const cookieStore = await cookies();
  const expiresAt = Date.now() + SESSION_MAX_AGE * 1000;

  cookieStore.set(COOKIE_NAME, createSessionToken(expiresAt), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function destroyAdminSession() {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return false;
  }

  return verifySessionToken(token);
}

export async function requireAdmin() {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    redirect("/admin/login");
  }
}

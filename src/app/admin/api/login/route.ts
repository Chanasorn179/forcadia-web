import { NextResponse } from "next/server";
import {
  createAdminSession,
  verifyAdminPassword,
} from "@/lib/admin-auth";
import {
  clearAdminLoginFailures,
  getAdminLoginLimit,
  recordAdminLoginFailure,
} from "@/lib/admin-login-rate-limit";

export async function POST(request: Request) {
  const limit = await getAdminLoginLimit(request);

  if (limit.blocked) {
    const response = NextResponse.redirect(
      new URL("/admin/login?error=rate-limit", request.url),
      303,
    );
    response.headers.set("Retry-After", String(limit.retryAfter));
    return response;
  }

  const formData = await request.formData();
  const password = String(formData.get("password") ?? "");

  if (!verifyAdminPassword(password)) {
    await recordAdminLoginFailure(limit.fingerprint);
    return NextResponse.redirect(
      new URL("/admin/login?error=invalid", request.url),
      303,
    );
  }

  await clearAdminLoginFailures(limit.fingerprint);
  await createAdminSession();

  return NextResponse.redirect(
    new URL("/admin", request.url),
    303,
  );
}

import { NextResponse } from "next/server";
import {
  createAdminSession,
  verifyAdminPassword,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const password = String(formData.get("password") ?? "");

  if (!verifyAdminPassword(password)) {
    return NextResponse.redirect(
      new URL("/admin/login?error=invalid", request.url),
      303,
    );
  }

  await createAdminSession();

  return NextResponse.redirect(
    new URL("/admin", request.url),
    303,
  );
}

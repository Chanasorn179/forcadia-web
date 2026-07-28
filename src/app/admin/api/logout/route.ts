import { NextResponse } from "next/server";
import { destroyAdminSession } from "@/lib/admin-auth";

export async function POST(request: Request) {
  await destroyAdminSession();

  return NextResponse.redirect(
    new URL("/admin/login", request.url),
    303,
  );
}

import { Prisma } from "@/generated/prisma/client";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { parseHouseForm } from "@/lib/house-form";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.redirect(
      new URL("/admin/login", request.url),
      303,
    );
  }

  const parsed = parseHouseForm(await request.formData());

  if (!parsed) {
    return NextResponse.redirect(
      new URL("/admin/houses/new?error=invalid", request.url),
      303,
    );
  }

  try {
    await prisma.house.create({
      data: parsed,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.redirect(
        new URL("/admin/houses/new?error=duplicate", request.url),
        303,
      );
    }

    console.error("House creation failed:", error);

    return NextResponse.redirect(
      new URL("/admin/houses/new?error=save", request.url),
      303,
    );
  }

  return NextResponse.redirect(
    new URL("/admin/houses?created=1", request.url),
    303,
  );
}

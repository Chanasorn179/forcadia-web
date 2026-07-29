import { Prisma } from "@/generated/prisma/client";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { parseHouseForm } from "@/lib/house-form";
import { prisma } from "@/lib/prisma";

type Context = {
  params: Promise<{ id: string }>;
};

export async function POST(
  request: Request,
  context: Context,
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.redirect(
      new URL("/admin/login", request.url),
      303,
    );
  }

  const { id } = await context.params;
  const parsed = parseHouseForm(await request.formData());

  if (!parsed) {
    return NextResponse.redirect(
      new URL(`/admin/houses/${id}?error=invalid`, request.url),
      303,
    );
  }

  try {
    await prisma.house.update({
      where: { id },
      data: parsed,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.redirect(
        new URL(`/admin/houses/${id}?error=duplicate`, request.url),
        303,
      );
    }

    console.error("House update failed:", error);

    return NextResponse.redirect(
      new URL(`/admin/houses/${id}?error=save`, request.url),
      303,
    );
  }

  return NextResponse.redirect(
    new URL(`/admin/houses/${id}?saved=1`, request.url),
    303,
  );
}

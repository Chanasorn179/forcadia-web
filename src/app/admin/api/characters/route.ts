import { Prisma } from "@/generated/prisma/client";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { parseCharacterForm } from "@/lib/character-form";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.redirect(
      new URL("/admin/login", request.url),
      303,
    );
  }

  const parsed = parseCharacterForm(await request.formData());

  if (!parsed) {
    return NextResponse.redirect(
      new URL("/admin/characters/new?error=invalid", request.url),
      303,
    );
  }

  try {
    await prisma.character.create({
      data: parsed,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.redirect(
        new URL("/admin/characters/new?error=duplicate", request.url),
        303,
      );
    }

    console.error("Character creation failed:", error);

    return NextResponse.redirect(
      new URL("/admin/characters/new?error=save", request.url),
      303,
    );
  }

  return NextResponse.redirect(
    new URL("/admin/characters?created=1", request.url),
    303,
  );
}

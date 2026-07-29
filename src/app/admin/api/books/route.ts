import { Prisma } from "@/generated/prisma/client";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { parseBookForm } from "@/lib/book-form";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.redirect(
      new URL("/admin/login", request.url),
      303,
    );
  }

  const formData = await request.formData();
  const parsed = parseBookForm(formData);

  if (!parsed) {
    return NextResponse.redirect(
      new URL("/admin/books/new?error=invalid", request.url),
      303,
    );
  }

  try {
    await prisma.book.create({
      data: parsed,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.redirect(
        new URL("/admin/books/new?error=duplicate", request.url),
        303,
      );
    }

    console.error("Book creation failed:", error);

    return NextResponse.redirect(
      new URL("/admin/books/new?error=save", request.url),
      303,
    );
  }

  return NextResponse.redirect(
    new URL("/admin/books?created=1", request.url),
    303,
  );
}

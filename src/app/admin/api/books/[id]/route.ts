import { Prisma } from "@/generated/prisma/client";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { parseBookForm } from "@/lib/book-form";
import { prisma } from "@/lib/prisma";

type Context = {
  params: Promise<{
    id: string;
  }>;
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
  const formData = await request.formData();
  const parsed = parseBookForm(formData);

  if (!parsed) {
    return NextResponse.redirect(
      new URL(`/admin/books/${id}?error=invalid`, request.url),
      303,
    );
  }

  try {
    await prisma.book.update({
      where: {
        id,
      },
      data: parsed,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.redirect(
        new URL(`/admin/books/${id}?error=duplicate`, request.url),
        303,
      );
    }

    console.error("Book update failed:", error);

    return NextResponse.redirect(
      new URL(`/admin/books/${id}?error=save`, request.url),
      303,
    );
  }

  return NextResponse.redirect(
    new URL(`/admin/books/${id}?saved=1`, request.url),
    303,
  );
}

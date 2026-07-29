import { Prisma } from "@/generated/prisma/client";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { parseChapterForm } from "@/lib/chapter-form";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.redirect(
      new URL("/admin/login", request.url),
      303,
    );
  }

  const formData = await request.formData();
  const parsed = parseChapterForm(formData);

  if (!parsed) {
    return NextResponse.redirect(
      new URL("/admin/chapters/new?error=invalid", request.url),
      303,
    );
  }

  const book = await prisma.book.findUnique({
    where: {
      id: parsed.bookId,
    },
    select: {
      id: true,
    },
  });

  if (!book) {
    return NextResponse.redirect(
      new URL("/admin/chapters/new?error=book", request.url),
      303,
    );
  }

  try {
    await prisma.chapter.create({
      data: parsed,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.redirect(
        new URL("/admin/chapters/new?error=slug", request.url),
        303,
      );
    }

    console.error("Chapter creation failed:", error);

    return NextResponse.redirect(
      new URL("/admin/chapters/new?error=save", request.url),
      303,
    );
  }

  return NextResponse.redirect(
    new URL("/admin/chapters?created=1", request.url),
    303,
  );
}

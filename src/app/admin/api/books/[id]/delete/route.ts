import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
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
  const confirmation = String(
    formData.get("confirmation") ?? "",
  );

  const book = await prisma.book.findUnique({
    where: {
      id,
    },
    include: {
      _count: {
        select: {
          chapters: true,
        },
      },
    },
  });

  if (
    !book ||
    confirmation !== book.title ||
    book._count.chapters > 0
  ) {
    return NextResponse.redirect(
      new URL(`/admin/books/${id}?error=delete`, request.url),
      303,
    );
  }

  try {
    await prisma.book.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("Book deletion failed:", error);

    return NextResponse.redirect(
      new URL(`/admin/books/${id}?error=delete`, request.url),
      303,
    );
  }

  return NextResponse.redirect(
    new URL("/admin/books?deleted=1", request.url),
    303,
  );
}

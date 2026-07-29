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

  const chapter = await prisma.chapter.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
    },
  });

  if (!chapter || confirmation !== chapter.title) {
    return NextResponse.redirect(
      new URL(`/admin/chapters/${id}?error=delete`, request.url),
      303,
    );
  }

  try {
    await prisma.chapter.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("Chapter deletion failed:", error);

    return NextResponse.redirect(
      new URL(`/admin/chapters/${id}?error=delete`, request.url),
      303,
    );
  }

  return NextResponse.redirect(
    new URL("/admin/chapters?deleted=1", request.url),
    303,
  );
}

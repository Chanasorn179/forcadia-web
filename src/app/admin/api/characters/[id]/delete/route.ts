import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
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
  const formData = await request.formData();
  const confirmation = String(
    formData.get("confirmation") ?? "",
  );

  const character = await prisma.character.findUnique({
    where: { id },
    include: {
      house: {
        select: {
          id: true,
        },
      },
    },
  });

  if (
    !character ||
    character.house ||
    confirmation !== character.name
  ) {
    return NextResponse.redirect(
      new URL(`/admin/characters/${id}?error=delete`, request.url),
      303,
    );
  }

  try {
    await prisma.character.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Character deletion failed:", error);

    return NextResponse.redirect(
      new URL(`/admin/characters/${id}?error=delete`, request.url),
      303,
    );
  }

  return NextResponse.redirect(
    new URL("/admin/characters?deleted=1", request.url),
    303,
  );
}

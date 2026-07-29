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

  const house = await prisma.house.findUnique({
    where: { id },
    include: {
      city: {
        select: {
          id: true,
        },
      },
    },
  });

  if (
    !house ||
    house.city ||
    confirmation !== house.name
  ) {
    return NextResponse.redirect(
      new URL(`/admin/houses/${id}?error=delete`, request.url),
      303,
    );
  }

  try {
    await prisma.house.delete({
      where: { id },
    });
  } catch (error) {
    console.error("House deletion failed:", error);

    return NextResponse.redirect(
      new URL(`/admin/houses/${id}?error=delete`, request.url),
      303,
    );
  }

  return NextResponse.redirect(
    new URL("/admin/houses?deleted=1", request.url),
    303,
  );
}

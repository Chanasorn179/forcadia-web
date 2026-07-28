import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/admin-auth";

type Context = {
  params: Promise<{
    id: string;
  }>;
};

function normalizeParagraphs(value: string) {
  return value
    .split(/\n\s*\n/g)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

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

  const title = String(formData.get("title") ?? "").trim();
  const orderText = String(
    formData.get("orderText") ?? "",
  ).trim();
  const pov = String(formData.get("pov") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const contentText = String(
    formData.get("content") ?? "",
  ).trim();
  const sortOrder = Number(formData.get("sortOrder"));
  const published = formData.get("published") === "on";

  if (
    !title ||
    !orderText ||
    !pov ||
    !excerpt ||
    !contentText ||
    !Number.isInteger(sortOrder) ||
    sortOrder < 1
  ) {
    return NextResponse.redirect(
      new URL(`/admin/chapters/${id}?error=invalid`, request.url),
      303,
    );
  }

  const content = normalizeParagraphs(contentText);

  if (content.length === 0) {
    return NextResponse.redirect(
      new URL(`/admin/chapters/${id}?error=content`, request.url),
      303,
    );
  }

  try {
    await prisma.chapter.update({
      where: { id },
      data: {
        title,
        orderText,
        pov,
        excerpt,
        content,
        sortOrder,
        published,
      },
    });
  } catch (error) {
    console.error("Chapter update failed:", error);

    return NextResponse.redirect(
      new URL(`/admin/chapters/${id}?error=save`, request.url),
      303,
    );
  }

  return NextResponse.redirect(
    new URL(`/admin/chapters/${id}?saved=1`, request.url),
    303,
  );
}

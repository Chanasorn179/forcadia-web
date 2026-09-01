import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

type Props = { params: Promise<{ type: string; id: string }> };

function text(form: FormData, name: string) {
  return String(form.get(name) ?? "").trim();
}

function optional(form: FormData, name: string) {
  return text(form, name) || null;
}

export async function POST(request: Request, { params }: Props) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  }

  const { type, id } = await params;
  const form = await request.formData();
  const deleting = text(form, "_action") === "delete";

  try {
    if (type === "city") {
      if (deleting) await prisma.city.delete({ where: { id } });
      else await prisma.city.update({ where: { id }, data: {
        slug: text(form, "slug"), name: text(form, "name"), thaiName: text(form, "thaiName"), title: text(form, "title"),
        description: text(form, "description"), atmosphere: text(form, "atmosphere"), architecture: text(form, "architecture"),
        landmark: text(form, "landmark"), accent: text(form, "accent"), symbol: text(form, "symbol"), emblem: optional(form, "emblem"),
      } });
    } else if (type === "era") {
      if (deleting) await prisma.era.delete({ where: { id } });
      else await prisma.era.update({ where: { id }, data: {
        slug: text(form, "slug"), name: text(form, "name"), thaiName: optional(form, "thaiName"), ruler: optional(form, "ruler"),
        detail: text(form, "detail"), description: optional(form, "description"), legacy: optional(form, "legacy"),
        sortOrder: Number(text(form, "sortOrder")),
      } });
    } else if (type === "lore") {
      if (deleting) await prisma.loreEntry.delete({ where: { id } });
      else await prisma.loreEntry.update({ where: { id }, data: {
        slug: text(form, "slug"), term: text(form, "term"), thaiName: optional(form, "thaiName"), category: optional(form, "category"),
        meaning: text(form, "meaning"), description: optional(form, "description"), origin: optional(form, "origin"),
        significance: optional(form, "significance"),
      } });
    } else {
      return new NextResponse("Unsupported content type", { status: 404 });
    }
  } catch (error) {
    console.error("Admin content mutation failed", { type, id, deleting, error });
    return NextResponse.redirect(new URL("/admin/content?error=save", request.url), 303);
  }

  revalidatePath("/", "layout");
  return NextResponse.redirect(new URL(`/admin/content?${deleting ? "deleted" : "saved"}=1`, request.url), 303);
}

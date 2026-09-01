import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

type Props = { params: Promise<{ type: string }> };

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

  const { type } = await params;
  const form = await request.formData();

  try {
    if (type === "city") {
      await prisma.city.create({ data: {
        slug: text(form, "slug"), name: text(form, "name"), thaiName: text(form, "thaiName"),
        title: text(form, "title"), description: text(form, "description"), atmosphere: text(form, "atmosphere"),
        architecture: text(form, "architecture"), landmark: text(form, "landmark"), accent: text(form, "accent"),
        symbol: text(form, "symbol"), emblem: optional(form, "emblem"), houseId: optional(form, "houseId"),
      } });
    } else if (type === "era") {
      await prisma.era.create({ data: {
        slug: text(form, "slug"), name: text(form, "name"), thaiName: optional(form, "thaiName"),
        ruler: optional(form, "ruler"), detail: text(form, "detail"), description: optional(form, "description"),
        legacy: optional(form, "legacy"), sortOrder: Number(text(form, "sortOrder")),
      } });
    } else if (type === "lore") {
      await prisma.loreEntry.create({ data: {
        slug: text(form, "slug"), term: text(form, "term"), thaiName: optional(form, "thaiName"),
        category: optional(form, "category"), meaning: text(form, "meaning"), description: optional(form, "description"),
        origin: optional(form, "origin"), significance: optional(form, "significance"),
      } });
    } else {
      return new NextResponse("Unsupported content type", { status: 404 });
    }
  } catch (error) {
    console.error("Admin content creation failed", { type, error });
    return NextResponse.redirect(new URL("/admin/content?error=create", request.url), 303);
  }

  revalidatePath("/", "layout");
  return NextResponse.redirect(new URL("/admin/content?created=1", request.url), 303);
}

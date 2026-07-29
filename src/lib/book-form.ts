export type ParsedBookForm = {
  title: string;
  thaiTitle: string;
  subtitle: string;
  slug: string;
  description: string;
  cover: string | null;
  status: "DRAFT" | "ONGOING" | "COMPLETED";
  order: number;
};

export function slugifyBook(value: string) {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function parseBookForm(formData: FormData): ParsedBookForm | null {
  const title = String(formData.get("title") ?? "").trim();
  const thaiTitle = String(formData.get("thaiTitle") ?? "").trim();
  const subtitle = String(formData.get("subtitle") ?? "").trim();
  const rawSlug = String(formData.get("slug") ?? "").trim();
  const slug = slugifyBook(rawSlug || title);
  const description = String(formData.get("description") ?? "").trim();
  const coverValue = String(formData.get("cover") ?? "").trim();
  const statusValue = String(formData.get("status") ?? "DRAFT");
  const order = Number(formData.get("order"));

  const status =
    statusValue === "ONGOING" || statusValue === "COMPLETED"
      ? statusValue
      : "DRAFT";

  if (
    !title ||
    !thaiTitle ||
    !subtitle ||
    !slug ||
    !description ||
    !Number.isInteger(order) ||
    order < 1
  ) {
    return null;
  }

  return {
    title,
    thaiTitle,
    subtitle,
    slug,
    description,
    cover: coverValue || null,
    status,
    order,
  };
}

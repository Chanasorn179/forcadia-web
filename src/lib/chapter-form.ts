export type ParsedChapterForm = {
  title: string;
  slug: string;
  orderText: string;
  sortOrder: number;
  pov: string;
  excerpt: string;
  content: string[];
  published: boolean;
  bookId: string;
};

export function slugifyChapter(value: string) {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function normalizeParagraphs(value: string) {
  return value
    .split(/\n\s*\n/g)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export function parseChapterForm(
  formData: FormData,
): ParsedChapterForm | null {
  const title = String(formData.get("title") ?? "").trim();
  const rawSlug = String(formData.get("slug") ?? "").trim();
  const slug = slugifyChapter(rawSlug || title);
  const orderText = String(
    formData.get("orderText") ?? "",
  ).trim();
  const pov = String(formData.get("pov") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const contentText = String(
    formData.get("content") ?? "",
  ).trim();
  const bookId = String(formData.get("bookId") ?? "").trim();
  const sortOrder = Number(formData.get("sortOrder"));
  const published = formData.get("published") === "on";
  const content = normalizeParagraphs(contentText);

  if (
    !title ||
    !slug ||
    !orderText ||
    !pov ||
    !excerpt ||
    !bookId ||
    content.length === 0 ||
    !Number.isInteger(sortOrder) ||
    sortOrder < 1
  ) {
    return null;
  }

  return {
    title,
    slug,
    orderText,
    sortOrder,
    pov,
    excerpt,
    content,
    published,
    bookId,
  };
}

export type ParsedHouseForm = {
  slug: string;
  name: string;
  thaiName: string;
  emblem: string;
  emblemName: string;
  motto: string;
  accent: string;
  description: string;
  keyName: string;
  domain: string;
  rulerId: string;
};

export function slugifyHouse(value: string) {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function isHexColor(value: string) {
  return /^#[0-9a-fA-F]{6}$/.test(value);
}

export function parseHouseForm(formData: FormData): ParsedHouseForm | null {
  const name = String(formData.get("name") ?? "").trim();
  const thaiName = String(formData.get("thaiName") ?? "").trim();
  const rawSlug = String(formData.get("slug") ?? "").trim();
  const slug = slugifyHouse(rawSlug || name);
  const emblem = String(formData.get("emblem") ?? "").trim();
  const emblemName = String(formData.get("emblemName") ?? "").trim();
  const motto = String(formData.get("motto") ?? "").trim();
  const accent = String(formData.get("accent") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const keyName = String(formData.get("keyName") ?? "").trim();
  const domain = String(formData.get("domain") ?? "").trim();
  const rulerId = String(formData.get("rulerId") ?? "").trim();

  if (
    !slug ||
    !name ||
    !thaiName ||
    !emblem ||
    !emblemName ||
    !motto ||
    !isHexColor(accent) ||
    !description ||
    !keyName ||
    !domain ||
    !rulerId
  ) {
    return null;
  }

  return {
    slug,
    name,
    thaiName,
    emblem,
    emblemName,
    motto,
    accent,
    description,
    keyName,
    domain,
    rulerId,
  };
}

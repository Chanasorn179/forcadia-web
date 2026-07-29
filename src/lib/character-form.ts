export type ParsedCharacterForm = {
  slug: string;
  name: string;
  thaiName: string;
  title: string;
  summary: string;
  keyName: string;
  eye: string;
  domain: string;
  army: string;
  powers: string[];
  accent: string;
  symbol: string;
};

export function slugifyCharacter(value: string) {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parsePowers(value: string) {
  return value
    .split(/\r?\n|,/g)
    .map((power) => power.trim())
    .filter(Boolean);
}

function isHexColor(value: string) {
  return /^#[0-9a-fA-F]{6}$/.test(value);
}

export function parseCharacterForm(
  formData: FormData,
): ParsedCharacterForm | null {
  const name = String(formData.get("name") ?? "").trim();
  const thaiName = String(formData.get("thaiName") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const summary = String(formData.get("summary") ?? "").trim();
  const keyName = String(formData.get("keyName") ?? "").trim();
  const eye = String(formData.get("eye") ?? "").trim();
  const domain = String(formData.get("domain") ?? "").trim();
  const army = String(formData.get("army") ?? "").trim();
  const rawSlug = String(formData.get("slug") ?? "").trim();
  const slug = slugifyCharacter(rawSlug || name);
  const powers = parsePowers(
    String(formData.get("powers") ?? ""),
  );
  const accent = String(formData.get("accent") ?? "").trim();
  const symbol = String(formData.get("symbol") ?? "").trim();

  if (
    !slug ||
    !name ||
    !thaiName ||
    !title ||
    !summary ||
    !keyName ||
    !eye ||
    !domain ||
    !army ||
    powers.length === 0 ||
    !isHexColor(accent) ||
    !symbol
  ) {
    return null;
  }

  return {
    slug,
    name,
    thaiName,
    title,
    summary,
    keyName,
    eye,
    domain,
    army,
    powers,
    accent,
    symbol,
  };
}

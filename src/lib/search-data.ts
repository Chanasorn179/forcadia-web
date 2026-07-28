import { chapters, characters, cities, eras, lore } from "@/data/forcadia";
import { houses } from "@/data/houses";

export type SearchCategory =
  | "character"
  | "house"
  | "city"
  | "chapter"
  | "era"
  | "lore";

export type SearchItem = {
  id: string;
  category: SearchCategory;
  title: string;
  subtitle: string;
  description: string;
  href: string;
  keywords: string[];
};

export const searchItems: SearchItem[] = [
  ...characters.map((character) => ({
    id: `character-${character.slug}`,
    category: "character" as const,
    title: character.name,
    subtitle: `${character.thaiName} · ${character.title}`,
    description: character.summary,
    href: `/characters/${character.slug}`,
    keywords: [
      character.name,
      character.thaiName,
      character.title,
      character.house,
      character.city,
      character.key,
      character.eye,
      character.domain,
      character.army,
      ...character.powers,
    ],
  })),

  ...houses.map((house) => ({
    id: `house-${house.slug}`,
    category: "house" as const,
    title: house.name,
    subtitle: `${house.thaiName} · ${house.emblemName}`,
    description: house.description,
    href: `/houses/${house.slug}`,
    keywords: [
      house.name,
      house.thaiName,
      house.ruler,
      house.city,
      house.emblemName,
      house.motto,
      house.key,
      house.domain,
    ],
  })),

  ...cities.map((city) => ({
    id: `city-${city.slug}`,
    category: "city" as const,
    title: city.name,
    subtitle: `${city.thaiName} · ${city.faction}`,
    description: city.description,
    href: `/world/${city.slug}`,
    keywords: [
      city.name,
      city.thaiName,
      city.ruler,
      city.faction,
      city.title,
      city.landmark,
      city.atmosphere,
      city.architecture,
    ],
  })),

  ...chapters.map((chapter) => ({
    id: `chapter-${chapter.slug}`,
    category: "chapter" as const,
    title: chapter.title,
    subtitle: `${chapter.order} · POV: ${chapter.pov}`,
    description: chapter.excerpt,
    href: `/read/${chapter.slug}`,
    keywords: [
      chapter.title,
      chapter.order,
      chapter.pov,
      chapter.excerpt,
      ...chapter.content,
    ],
  })),

  ...eras.map((era, index) => ({
    id: `era-${era.slug ?? index}`,
    category: "era" as const,
    title: era.name,
    subtitle:
      "thaiName" in era && typeof era.thaiName === "string"
        ? era.thaiName
        : `Era ${String(index + 1).padStart(2, "0")}`,
    description:
      "description" in era && typeof era.description === "string"
        ? era.description
        : era.detail,
    href: `/timeline/${era.slug ?? `era-${index + 1}`}`,
    keywords: [
      era.name,
      era.detail,
      "thaiName" in era && typeof era.thaiName === "string"
        ? era.thaiName
        : "",
      "ruler" in era && typeof era.ruler === "string" ? era.ruler : "",
      "legacy" in era && typeof era.legacy === "string" ? era.legacy : "",
    ],
  })),

  ...lore.map((entry, index) => ({
    id: `lore-${entry.slug ?? index}`,
    category: "lore" as const,
    title: entry.term,
    subtitle:
      "thaiName" in entry && typeof entry.thaiName === "string"
        ? entry.thaiName
        : "Imperial Codex",
    description:
      "description" in entry && typeof entry.description === "string"
        ? entry.description
        : entry.meaning,
    href: `/lore/${entry.slug ?? `entry-${index + 1}`}`,
    keywords: [
      entry.term,
      entry.meaning,
      "thaiName" in entry && typeof entry.thaiName === "string"
        ? entry.thaiName
        : "",
      "category" in entry && typeof entry.category === "string"
        ? entry.category
        : "",
      "origin" in entry && typeof entry.origin === "string"
        ? entry.origin
        : "",
      "significance" in entry && typeof entry.significance === "string"
        ? entry.significance
        : "",
    ],
  })),
];

function normalize(value: string) {
  return value
    .toLocaleLowerCase("th")
    .normalize("NFKC")
    .replace(/\s+/g, " ")
    .trim();
}

export function searchForcadia(query: string) {
  const normalizedQuery = normalize(query);

  if (!normalizedQuery) {
    return [];
  }

  const terms = normalizedQuery.split(" ").filter(Boolean);

  return searchItems
    .map((item) => {
      const title = normalize(item.title);
      const subtitle = normalize(item.subtitle);
      const description = normalize(item.description);
      const keywords = normalize(item.keywords.join(" "));
      const searchableText = `${title} ${subtitle} ${description} ${keywords}`;

      const score = terms.reduce((total, term) => {
        if (title === term) return total + 100;
        if (title.startsWith(term)) return total + 50;
        if (title.includes(term)) return total + 30;
        if (subtitle.includes(term)) return total + 18;
        if (keywords.includes(term)) return total + 12;
        if (description.includes(term)) return total + 6;
        if (searchableText.includes(term)) return total + 2;
        return total;
      }, 0);

      return { item, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
    .map(({ item }) => item);
}

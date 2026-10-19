import { houses } from "@/data/houses";
import { books } from "@/data/books";

export type ArchiveLocationId =
  | "grand-table"
  | "world-map"
  | "eight-houses"
  | "restricted-archive"
  | "observatory";

export type ArchiveEntry = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  image?: string;
  location: ArchiveLocationId;
  accent?: string;
  meta?: string;
  href?: string;
};

export const archiveLocations: Array<{
  id: ArchiveLocationId;
  label: string;
  shortLabel: string;
  eyebrow: string;
}> = [
  { id: "grand-table", label: "Grand Table", shortLabel: "Table", eyebrow: "I" },
  { id: "world-map", label: "World Map", shortLabel: "Map", eyebrow: "II" },
  { id: "eight-houses", label: "Eight Houses", shortLabel: "Houses", eyebrow: "III" },
  { id: "restricted-archive", label: "Restricted Archive", shortLabel: "Restricted", eyebrow: "IV" },
  { id: "observatory", label: "Observatory", shortLabel: "Stars", eyebrow: "V" },
];

export const archiveEntries: ArchiveEntry[] = [
  {
    id: "imperial-codex",
    title: books[0].title,
    subtitle: books[0].thaiTitle,
    category: "หนังสือ · เล่มที่ 1",
    description:
      books[0].description,
    href: `/books/${books[0].slug}`,
    image: "/images/crests-transparent/unity-crown.png",
    location: "grand-table",
    meta: books[0].subtitle,
  },
  {
    id: "shattered-ring-map",
    title: "The Shattered Ring",
    subtitle: "Survey of the imperial territories",
    category: "World · Cartography",
    description:
      "An astral chart of Forcadia's provinces, sea roads, fortress lines, and the silent territory that no official map is permitted to name.",
    location: "world-map",
    meta: "Eight provinces · One absent dominion",
  },
  {
    id: "sealed-timeline",
    title: "The Cycle of Ash",
    subtitle: "A scroll with three missing years",
    category: "Timeline · Classified",
    description:
      "The official chronology ends in gold ink. Beneath it, a second hand has recorded the disappearance of an emperor and the first night without dawn.",
    location: "grand-table",
    meta: "Seal broken · Author unknown",
  },
  {
    id: "nightfall-ledger",
    title: "The Nameless Ledger",
    subtitle: "Black index of House Night-Fall",
    category: "Restricted · Obsidian Class",
    description:
      "A locked volume recovered from Nihil Ruina. The lock has no keyhole; it opens only beneath the light of an eclipsed moon.",
    image: "/images/crests-transparent/night-fall.png",
    location: "restricted-archive",
    accent: "#8d6bd1",
    meta: "Clearance VIII required",
  },
  {
    id: "celestial-engine",
    title: "Celestial Engine",
    subtitle: "Constellations of the sovereign keys",
    category: "Observatory · Astral Record",
    description:
      "The armillary tracks eight constellations around an empty polar star. Each alignment corresponds to a Sovereign Key awakening somewhere in the empire.",
    location: "observatory",
    accent: "#8ea1ff",
    meta: "Next alignment · 00:47:12",
  },
];

export const houseArchive = houses.map((house, index): ArchiveEntry => ({
  id: `house-${house.slug}`,
  title: house.name,
  subtitle: house.thaiName,
  category: `Imperial House · ${String(index + 1).padStart(2, "0")}`,
  description: house.description,
  image: house.emblem,
  location: "eight-houses",
  accent: house.accent,
  meta: `${house.city} · ${house.motto}`,
  href: `/houses/${house.slug}`,
}));

export const allArchiveEntries = [...archiveEntries, ...houseArchive];

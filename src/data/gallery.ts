import { empire } from "@/data/empire";
import { houses } from "@/data/houses";

export type GalleryCategory =
  | "imperial"
  | "house";

export type GalleryItem = {
  id: string;
  category: GalleryCategory;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  href: string;
  accent: string;
};

export const galleryItems: GalleryItem[] = [
  {
    id: "imperial-crest",
    category: "imperial",
    title: empire.thaiName,
    subtitle: empire.name,
    description: empire.description,
    image: empire.crest,
    href: "/world/fourcadir-central-capital",
    accent: "#e7c66f",
  },

  ...houses.map((house) => ({
    id: `house-${house.slug}`,
    category: "house" as const,
    title: house.thaiName,
    subtitle: house.name,
    description: `${house.emblemName} · ${house.motto}`,
    image: house.emblem,
    href: `/houses/${house.slug}`,
    accent: house.accent,
  })),
];

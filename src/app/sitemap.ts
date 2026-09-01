import type { MetadataRoute } from "next";
import {
  getPublicCharacters,
  getPublicCities,
  getPublicEras,
  getPublicHouses,
  getPublicLoreEntries,
  getPublishedBooks,
  getPublishedChapters,
} from "@/lib/public-content";

const baseUrl = "https://forcadia-web.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [books, chapters, characters, houses, cities, eras, lore] =
    await Promise.all([
      getPublishedBooks(),
      getPublishedChapters(),
      getPublicCharacters(),
      getPublicHouses(),
      getPublicCities(),
      getPublicEras(),
      getPublicLoreEntries(),
    ]);
  const now = new Date();
  const staticRoutes = [
    "",
    "/books",
    "/characters",
    "/houses",
    "/world",
    "/timeline",
    "/lore",
    "/glossary",
    "/sovereign-keys",
    "/gallery",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...books.map((book) => ({
      url: `${baseUrl}/books/${book.slug}`,
      lastModified: book.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...chapters.map((chapter) => ({
      url: `${baseUrl}/read/${chapter.slug}`,
      lastModified: chapter.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...characters.map((character) => ({
      url: `${baseUrl}/characters/${character.slug}`,
      lastModified: character.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...houses.map((house) => ({
      url: `${baseUrl}/houses/${house.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...cities.map((city) => ({
      url: `${baseUrl}/world/${city.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...eras.map((era) => ({
      url: `${baseUrl}/timeline/${era.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...lore.map((entry) => ({
      url: `${baseUrl}/lore/${entry.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}

import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import {
  PrismaClient,
  PublicationStatus,
} from "../src/generated/prisma/client";
import {
  chapters,
  characters,
  cities,
  eras,
  lore,
} from "../src/data/forcadia";
import { books } from "../src/data/books";
import { houses } from "../src/data/houses";
import { worldLinks } from "../src/data/world-links";

const connectionString = process.env.DIRECT_URL ?? process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DIRECT_URL or DATABASE_URL is not defined.");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

function toPublicationStatus(status: string) {
  switch (status) {
    case "ongoing":
      return PublicationStatus.ONGOING;
    case "completed":
      return PublicationStatus.COMPLETED;
    default:
      return PublicationStatus.DRAFT;
  }
}

async function seedCharacters() {
  for (const character of characters) {
    await prisma.character.upsert({
      where: { slug: character.slug },
      update: {
        name: character.name,
        thaiName: character.thaiName,
        title: character.title,
        summary: character.summary,
        keyName: character.key,
        eye: character.eye,
        domain: character.domain,
        army: character.army,
        powers: character.powers,
        accent: character.accent,
        symbol: character.symbol,
      },
      create: {
        slug: character.slug,
        name: character.name,
        thaiName: character.thaiName,
        title: character.title,
        summary: character.summary,
        keyName: character.key,
        eye: character.eye,
        domain: character.domain,
        army: character.army,
        powers: character.powers,
        accent: character.accent,
        symbol: character.symbol,
      },
    });
  }
}

async function seedHouses() {
  for (const house of houses) {
    const ruler = await prisma.character.findUniqueOrThrow({
      where: { slug: house.rulerSlug },
    });

    await prisma.house.upsert({
      where: { slug: house.slug },
      update: {
        name: house.name,
        thaiName: house.thaiName,
        emblem: house.emblem,
        emblemName: house.emblemName,
        motto: house.motto,
        accent: house.accent,
        description: house.description,
        keyName: house.key,
        domain: house.domain,
        rulerId: ruler.id,
      },
      create: {
        slug: house.slug,
        name: house.name,
        thaiName: house.thaiName,
        emblem: house.emblem,
        emblemName: house.emblemName,
        motto: house.motto,
        accent: house.accent,
        description: house.description,
        keyName: house.key,
        domain: house.domain,
        rulerId: ruler.id,
      },
    });
  }
}

async function seedCities() {
  for (const city of cities) {
    const link = worldLinks.find(
      (item) => item.citySlug === city.slug,
    );

    const house = link
      ? await prisma.house.findUnique({
          where: { slug: link.houseSlug },
        })
      : null;

    await prisma.city.upsert({
      where: { slug: city.slug },
      update: {
        name: city.name,
        thaiName: city.thaiName,
        title: city.title,
        description: city.description,
        atmosphere: city.atmosphere,
        architecture: city.architecture,
        landmark: city.landmark,
        accent: city.accent,
        symbol: city.symbol,
        emblem: city.emblem ?? null,
        houseId: house?.id ?? null,
      },
      create: {
        slug: city.slug,
        name: city.name,
        thaiName: city.thaiName,
        title: city.title,
        description: city.description,
        atmosphere: city.atmosphere,
        architecture: city.architecture,
        landmark: city.landmark,
        accent: city.accent,
        symbol: city.symbol,
        emblem: city.emblem ?? null,
        houseId: house?.id ?? null,
      },
    });
  }
}

async function seedBooksAndChapters() {
  for (const book of books) {
    const savedBook = await prisma.book.upsert({
      where: { slug: book.slug },
      update: {
        title: book.title,
        thaiTitle: book.thaiTitle,
        subtitle: book.subtitle,
        description: book.description,
        cover: book.cover ?? null,
        status: toPublicationStatus(book.status),
        order: book.order,
      },
      create: {
        slug: book.slug,
        title: book.title,
        thaiTitle: book.thaiTitle,
        subtitle: book.subtitle,
        description: book.description,
        cover: book.cover ?? null,
        status: toPublicationStatus(book.status),
        order: book.order,
      },
    });

    const bookChapters = book.chapterSlugs
      .map((slug) => chapters.find((chapter) => chapter.slug === slug))
      .filter(
        (chapter): chapter is (typeof chapters)[number] =>
          Boolean(chapter),
      );

    for (const [index, chapter] of bookChapters.entries()) {
      await prisma.chapter.upsert({
        where: { slug: chapter.slug },
        update: {
          title: chapter.title,
          orderText: chapter.order,
          sortOrder: index + 1,
          pov: chapter.pov,
          excerpt: chapter.excerpt,
          content: chapter.content,
          published: book.status !== "draft",
          bookId: savedBook.id,
        },
        create: {
          slug: chapter.slug,
          title: chapter.title,
          orderText: chapter.order,
          sortOrder: index + 1,
          pov: chapter.pov,
          excerpt: chapter.excerpt,
          content: chapter.content,
          published: book.status !== "draft",
          bookId: savedBook.id,
        },
      });
    }
  }
}

async function seedEras() {
  for (const [index, era] of eras.entries()) {
    const slug =
      "slug" in era && typeof era.slug === "string"
        ? era.slug
        : `era-${index + 1}`;

    await prisma.era.upsert({
      where: { slug },
      update: {
        name: era.name,
        thaiName:
          "thaiName" in era && typeof era.thaiName === "string"
            ? era.thaiName
            : null,
        ruler:
          "ruler" in era && typeof era.ruler === "string"
            ? era.ruler
            : null,
        detail: era.detail,
        description:
          "description" in era &&
          typeof era.description === "string"
            ? era.description
            : null,
        legacy:
          "legacy" in era && typeof era.legacy === "string"
            ? era.legacy
            : null,
        sortOrder: index + 1,
      },
      create: {
        slug,
        name: era.name,
        thaiName:
          "thaiName" in era && typeof era.thaiName === "string"
            ? era.thaiName
            : null,
        ruler:
          "ruler" in era && typeof era.ruler === "string"
            ? era.ruler
            : null,
        detail: era.detail,
        description:
          "description" in era &&
          typeof era.description === "string"
            ? era.description
            : null,
        legacy:
          "legacy" in era && typeof era.legacy === "string"
            ? era.legacy
            : null,
        sortOrder: index + 1,
      },
    });
  }
}

async function seedLore() {
  for (const [index, entry] of lore.entries()) {
    const slug =
      "slug" in entry && typeof entry.slug === "string"
        ? entry.slug
        : `entry-${index + 1}`;

    await prisma.loreEntry.upsert({
      where: { slug },
      update: {
        term: entry.term,
        thaiName:
          "thaiName" in entry &&
          typeof entry.thaiName === "string"
            ? entry.thaiName
            : null,
        category:
          "category" in entry &&
          typeof entry.category === "string"
            ? entry.category
            : null,
        meaning: entry.meaning,
        description:
          "description" in entry &&
          typeof entry.description === "string"
            ? entry.description
            : null,
        origin:
          "origin" in entry && typeof entry.origin === "string"
            ? entry.origin
            : null,
        significance:
          "significance" in entry &&
          typeof entry.significance === "string"
            ? entry.significance
            : null,
      },
      create: {
        slug,
        term: entry.term,
        thaiName:
          "thaiName" in entry &&
          typeof entry.thaiName === "string"
            ? entry.thaiName
            : null,
        category:
          "category" in entry &&
          typeof entry.category === "string"
            ? entry.category
            : null,
        meaning: entry.meaning,
        description:
          "description" in entry &&
          typeof entry.description === "string"
            ? entry.description
            : null,
        origin:
          "origin" in entry && typeof entry.origin === "string"
            ? entry.origin
            : null,
        significance:
          "significance" in entry &&
          typeof entry.significance === "string"
            ? entry.significance
            : null,
      },
    });
  }
}

async function main() {
  await seedCharacters();
  await seedHouses();
  await seedCities();
  await seedBooksAndChapters();
  await seedEras();
  await seedLore();

  console.log("✓ Forcadia database seeded.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

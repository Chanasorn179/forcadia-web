import { prisma } from "@/lib/prisma";
import { books as staticBooks, getBookChapters } from "@/data/books";
import {
  chapters as staticChapters,
  characters as staticCharacters,
  cities as staticCities,
  eras as staticEras,
  lore as staticLore,
} from "@/data/forcadia";
import { houses as staticHouses } from "@/data/houses";

const statusMap = {
  draft: "DRAFT",
  ongoing: "ONGOING",
  completed: "COMPLETED",
} as const;

function reportFallback(resource: string, error: unknown) {
  console.warn(`Database unavailable for ${resource}; using bundled public content.`, error);
}

export async function getPublishedBooks() {
  try {
    return await prisma.book.findMany({
      where: {
        chapters: {
          some: {
            published: true,
          },
        },
      },
      orderBy: {
        order: "asc",
      },
      include: {
        _count: {
          select: {
            chapters: {
              where: {
                published: true,
              },
            },
          },
        },
      },
    });
  } catch (error) {
    reportFallback("books", error);
    return staticBooks.map((book) => ({
      ...book,
      id: book.slug,
      cover: book.cover ?? null,
      status: statusMap[book.status],
      createdAt: new Date(0),
      updatedAt: new Date(0),
      _count: { chapters: getBookChapters(book).length },
    }));
  }
}

export async function getPublicBookBySlug(slug: string) {
  try {
    return await prisma.book.findFirst({
    where: {
      slug,
      chapters: {
        some: {
          published: true,
        },
      },
    },
    include: {
      chapters: {
        where: {
          published: true,
        },
        orderBy: {
          sortOrder: "asc",
        },
      },
    },
    });
  } catch (error) {
    reportFallback(`book:${slug}`, error);
    const book = staticBooks.find((item) => item.slug === slug);
    if (!book) return null;

    return {
      ...book,
      id: book.slug,
      cover: book.cover ?? null,
      status: statusMap[book.status],
      createdAt: new Date(0),
      updatedAt: new Date(0),
      chapters: getBookChapters(book).map((chapter, index) => ({
        id: chapter.slug,
        slug: chapter.slug,
        title: chapter.title,
        orderText: chapter.order,
        sortOrder: index,
        pov: chapter.pov,
        excerpt: chapter.excerpt,
        content: chapter.content,
        published: true,
        bookId: book.slug,
        createdAt: new Date(0),
        updatedAt: new Date(0),
      })),
    };
  }
}

export async function getPublishedChapterBySlug(slug: string) {
  try {
    return await prisma.chapter.findFirst({
    where: {
      slug,
      published: true,
    },
    include: {
      book: {
        select: {
          slug: true,
          title: true,
          thaiTitle: true,
          order: true,
        },
      },
    },
    });
  } catch (error) {
    reportFallback(`chapter:${slug}`, error);
    const chapterIndex = staticChapters.findIndex((item) => item.slug === slug);
    if (chapterIndex < 0) return null;
    const chapter = staticChapters[chapterIndex];
    const book = staticBooks.find((item) => item.chapterSlugs.includes(slug));
    if (!book) return null;

    return {
      id: chapter.slug,
      slug: chapter.slug,
      title: chapter.title,
      orderText: chapter.order,
      sortOrder: chapterIndex,
      pov: chapter.pov,
      excerpt: chapter.excerpt,
      content: chapter.content,
      published: true,
      bookId: book.slug,
      createdAt: new Date(0),
      updatedAt: new Date(0),
      book: {
        slug: book.slug,
        title: book.title,
        thaiTitle: book.thaiTitle,
        order: book.order,
      },
    };
  }
}

export async function getFirstPublishedChapter() {
  try {
    return await prisma.chapter.findFirst({
      where: { published: true },
      orderBy: [
        { book: { order: "asc" } },
        { sortOrder: "asc" },
      ],
      select: { slug: true },
    });
  } catch (error) {
    reportFallback("first chapter", error);
    const firstBook = [...staticBooks].sort((a, b) => a.order - b.order)[0];
    const firstChapter = firstBook ? getBookChapters(firstBook)[0] : undefined;
    return firstChapter ? { slug: firstChapter.slug } : null;
  }
}

export async function getChapterNavigation(
  bookId: string,
  currentSortOrder: number,
) {
  try {
    const [previousChapter, nextChapter, allChapters] = await Promise.all([
      prisma.chapter.findFirst({
        where: {
          bookId,
          published: true,
          sortOrder: {
            lt: currentSortOrder,
          },
        },
        orderBy: {
          sortOrder: "desc",
        },
        select: {
          slug: true,
          title: true,
          orderText: true,
        },
      }),
      prisma.chapter.findFirst({
        where: {
          bookId,
          published: true,
          sortOrder: {
            gt: currentSortOrder,
          },
        },
        orderBy: {
          sortOrder: "asc",
        },
        select: {
          slug: true,
          title: true,
          orderText: true,
        },
      }),
      prisma.chapter.findMany({
        where: {
          bookId,
          published: true,
        },
        orderBy: {
          sortOrder: "asc",
        },
        select: {
          slug: true,
          title: true,
          orderText: true,
        },
      }),
    ]);

    return { previousChapter, nextChapter, allChapters };
  } catch (error) {
    reportFallback(`chapter navigation:${bookId}`, error);
    const book = staticBooks.find((item) => item.slug === bookId);
    const allChapters = (book ? getBookChapters(book) : staticChapters).map(
      (chapter) => ({
        slug: chapter.slug,
        title: chapter.title,
        orderText: chapter.order,
      }),
    );
    const currentIndex = allChapters.findIndex(
      (chapter) => chapter.slug === staticChapters[currentSortOrder]?.slug,
    );
    return {
      previousChapter: currentIndex > 0 ? allChapters[currentIndex - 1] : null,
      nextChapter:
        currentIndex >= 0 && currentIndex < allChapters.length - 1
          ? allChapters[currentIndex + 1]
          : null,
      allChapters,
    };
  }
}

export async function getPublicCharacters() {
  try {
    return await prisma.character.findMany({
      orderBy: { name: "asc" },
      include: { house: { select: { name: true, slug: true } } },
    });
  } catch (error) {
    reportFallback("characters", error);
    return staticCharacters
      .map((character) => {
        const house = staticHouses.find((item) => item.rulerSlug === character.slug);
        return {
          ...character,
          id: character.slug,
          keyName: character.key,
          createdAt: new Date(0),
          updatedAt: new Date(0),
          house: house ? { name: house.name, slug: house.slug } : null,
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }
}

export async function getPublicCharacterBySlug(slug: string) {
  try {
    return await prisma.character.findUnique({
      where: { slug },
      include: {
        house: {
          select: { slug: true, name: true, thaiName: true, motto: true, emblem: true },
        },
      },
    });
  } catch (error) {
    reportFallback(`character:${slug}`, error);
    const character = staticCharacters.find((item) => item.slug === slug);
    if (!character) return null;
    const house = staticHouses.find((item) => item.rulerSlug === character.slug);
    return {
      ...character,
      id: character.slug,
      keyName: character.key,
      createdAt: new Date(0),
      updatedAt: new Date(0),
      house: house
        ? {
            slug: house.slug,
            name: house.name,
            thaiName: house.thaiName,
            motto: house.motto,
            emblem: house.emblem,
          }
        : null,
    };
  }
}

export async function getPublicHouses(): Promise<typeof staticHouses> {
  try {
    const houses = await prisma.house.findMany({
      orderBy: { name: "asc" },
      include: {
        ruler: { select: { slug: true, name: true } },
        city: { select: { name: true, slug: true } },
      },
    });

    return houses.map((house) => {
      const presentation = staticHouses.find((item) => item.slug === house.slug);

      return {
        slug: house.slug,
        name: house.name,
        thaiName: house.thaiName,
        ruler: house.ruler.name,
        rulerSlug: house.ruler.slug,
        city: house.city?.name ?? presentation?.city ?? "ยังไม่กำหนดนคร",
        citySlug: house.city?.slug ?? presentation?.citySlug ?? "",
        emblem: house.emblem,
        emblemName: house.emblemName,
        motto: house.motto,
        accent: house.accent,
        description: house.description,
        key: house.keyName,
        domain: house.domain,
      };
    });
  } catch (error) {
    reportFallback("houses", error);
    return staticHouses;
  }
}

export async function getPublicHouseBySlug(slug: string) {
  const houses = await getPublicHouses();
  return houses.find((house) => house.slug === slug) ?? null;
}

export async function getPublicCities(): Promise<typeof staticCities> {
  try {
    const cities = await prisma.city.findMany({
      orderBy: { name: "asc" },
      include: {
        house: {
          select: {
            name: true,
            ruler: { select: { name: true } },
          },
        },
      },
    });

    return cities.map((city) => {
      const presentation = staticCities.find((item) => item.slug === city.slug);

      return {
        slug: city.slug,
        name: city.name,
        thaiName: city.thaiName,
        ruler: city.house?.ruler.name ?? presentation?.ruler ?? "Imperial Council",
        faction: city.house?.name ?? presentation?.faction ?? "Imperial Capital",
        title: city.title,
        description: city.description,
        atmosphere: city.atmosphere,
        architecture: city.architecture,
        landmark: city.landmark,
        accent: city.accent,
        symbol: city.symbol,
        position: presentation?.position ?? "center",
        emblem:
          city.emblem ??
          presentation?.emblem ??
          "/images/logos/unity-crown-webmark-gold.png",
      };
    });
  } catch (error) {
    reportFallback("cities", error);
    return staticCities;
  }
}

export async function getPublicCityBySlug(slug: string) {
  const cities = await getPublicCities();
  return cities.find((city) => city.slug === slug) ?? null;
}

export async function getPublicEras(): Promise<typeof staticEras> {
  try {
    const eras = await prisma.era.findMany({ orderBy: { sortOrder: "asc" } });

    return eras.map((era, index) => {
      const presentation = staticEras.find((item) => item.slug === era.slug);

      return {
        slug: era.slug,
        name: era.name,
        thaiName: era.thaiName ?? presentation?.thaiName ?? "",
        ruler: era.ruler ?? presentation?.ruler ?? "ไม่ปรากฏ",
        duration: presentation?.duration ?? `ศักราชที่ ${index + 1}`,
        detail: era.detail,
        description: era.description ?? presentation?.description ?? era.detail,
        events: presentation?.events ?? [],
        legacy: era.legacy ?? presentation?.legacy ?? "",
        accent: presentation?.accent ?? "#d9b86c",
        symbol: presentation?.symbol ?? "✦",
      };
    });
  } catch (error) {
    reportFallback("eras", error);
    return staticEras;
  }
}

export async function getPublicEraBySlug(slug: string) {
  const eras = await getPublicEras();
  return eras.find((era) => era.slug === slug) ?? null;
}

export async function getPublicLoreEntries(): Promise<typeof staticLore> {
  try {
    const entries = await prisma.loreEntry.findMany({ orderBy: { term: "asc" } });

    return entries.map((entry) => {
      const presentation = staticLore.find((item) => item.slug === entry.slug);

      return {
        slug: entry.slug,
        term: entry.term,
        thaiName: entry.thaiName ?? presentation?.thaiName ?? "",
        category: entry.category ?? presentation?.category ?? "Imperial Codex",
        meaning: entry.meaning,
        description: entry.description ?? presentation?.description ?? entry.meaning,
        origin: entry.origin ?? presentation?.origin ?? "ไม่ปรากฏในบันทึก",
        significance: entry.significance ?? presentation?.significance ?? entry.meaning,
        related: presentation?.related ?? [],
        symbol: presentation?.symbol ?? "✦",
      };
    });
  } catch (error) {
    reportFallback("lore", error);
    return staticLore;
  }
}

export async function getPublicLoreBySlug(slug: string) {
  const entries = await getPublicLoreEntries();
  return entries.find((entry) => entry.slug === slug) ?? null;
}

export async function getPublishedChapters() {
  try {
    return await prisma.chapter.findMany({
      where: { published: true },
      orderBy: [{ book: { order: "asc" } }, { sortOrder: "asc" }],
      include: { book: { select: { slug: true, title: true } } },
    });
  } catch (error) {
    reportFallback("chapters", error);
    return staticChapters.map((chapter, index) => ({
      id: chapter.slug,
      slug: chapter.slug,
      title: chapter.title,
      orderText: chapter.order,
      sortOrder: index,
      pov: chapter.pov,
      excerpt: chapter.excerpt,
      content: chapter.content,
      published: true,
      bookId: "static",
      createdAt: new Date(0),
      updatedAt: new Date(0),
      book: { slug: "the-empty-throne", title: "Book I: The Empty Throne" },
    }));
  }
}

export function parseChapterContent(content: unknown): string[] {
  if (!Array.isArray(content)) {
    return [];
  }

  return content.filter(
    (paragraph): paragraph is string =>
      typeof paragraph === "string" &&
      paragraph.trim().length > 0,
  );
}

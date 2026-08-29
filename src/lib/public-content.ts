import { prisma } from "@/lib/prisma";
import { books as staticBooks, getBookChapters } from "@/data/books";
import { chapters as staticChapters, characters as staticCharacters } from "@/data/forcadia";
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

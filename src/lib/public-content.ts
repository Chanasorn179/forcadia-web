import { prisma } from "@/lib/prisma";

export async function getPublishedBooks() {
  return prisma.book.findMany({
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
}

export async function getPublicBookBySlug(slug: string) {
  return prisma.book.findFirst({
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
}

export async function getPublishedChapterBySlug(slug: string) {
  return prisma.chapter.findFirst({
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
}

export async function getChapterNavigation(
  bookId: string,
  currentSortOrder: number,
) {
  const [previousChapter, nextChapter, allChapters] =
    await Promise.all([
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

  return {
    previousChapter,
    nextChapter,
    allChapters,
  };
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

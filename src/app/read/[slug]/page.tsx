import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChapterBookmarkButton } from "@/components/chapter-bookmark-button";
import { NovelReader } from "@/components/novel-reader";
import {
  getChapterNavigation,
  getPublishedChapterBySlug,
  parseChapterContent,
} from "@/lib/public-content";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const chapter = await getPublishedChapterBySlug(slug);

  if (!chapter) {
    return { title: "ไม่พบตอน" };
  }

  return {
    title: `${chapter.orderText}: ${chapter.title}`,
    description: chapter.excerpt,
  };
}

export default async function ChapterPage({
  params,
}: Props) {
  const { slug } = await params;
  const chapter = await getPublishedChapterBySlug(slug);

  if (!chapter) {
    notFound();
  }

  const paragraphs = parseChapterContent(chapter.content);

  if (paragraphs.length === 0) {
    notFound();
  }

  const {
    previousChapter,
    nextChapter,
    allChapters,
  } = await getChapterNavigation(
    chapter.bookId,
    chapter.sortOrder,
  );

  return (
    <main className="container-page pb-28 pt-8 md:pb-20 md:pt-12">
      <div className="mx-auto mb-6 flex max-w-5xl flex-wrap items-center justify-between gap-4">
        <div>
          <Link
            href={`/books/${chapter.book.slug}`}
            className="inline-flex items-center gap-2 text-sm text-amber-200 transition hover:text-amber-100"
          >
            <span aria-hidden="true">←</span>
            กลับไปสารบัญ {chapter.book.title}
          </Link>

          <p className="mt-3 text-sm text-slate-500">
            POV · {chapter.pov}
          </p>
        </div>

        <ChapterBookmarkButton
          slug={chapter.slug}
          title={chapter.title}
          order={chapter.orderText}
          excerpt={chapter.excerpt}
        />
      </div>

      <NovelReader
        chapterSlug={chapter.slug}
        chapterTitle={chapter.title}
        chapterOrder={chapter.orderText}
        paragraphs={paragraphs}
        previousChapter={
          previousChapter
            ? {
                slug: previousChapter.slug,
                title: previousChapter.title,
                order: previousChapter.orderText,
              }
            : undefined
        }
        nextChapter={
          nextChapter
            ? {
                slug: nextChapter.slug,
                title: nextChapter.title,
                order: nextChapter.orderText,
              }
            : undefined
        }
        allChapters={allChapters.map((item) => ({
          slug: item.slug,
          title: item.title,
          order: item.orderText,
        }))}
      />
    </main>
  );
}

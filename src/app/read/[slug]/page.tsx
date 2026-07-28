import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChapterBookmarkButton } from "@/components/chapter-bookmark-button";
import { NovelReader } from "@/components/novel-reader";
import { chapters } from "@/data/forcadia";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return chapters.map((chapter) => ({
    slug: chapter.slug,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const chapter = chapters.find((item) => item.slug === slug);

  if (!chapter) {
    return {
      title: "ไม่พบตอน",
    };
  }

  return {
    title: `${chapter.order}: ${chapter.title}`,
    description: chapter.excerpt,
  };
}

export default async function ChapterPage({ params }: Props) {
  const { slug } = await params;
  const chapterIndex = chapters.findIndex((item) => item.slug === slug);

  if (chapterIndex === -1) {
    notFound();
  }

  const chapter = chapters[chapterIndex];
  const previousChapter = chapters[chapterIndex - 1];
  const nextChapter = chapters[chapterIndex + 1];

  const navigationChapters = chapters.map((item) => ({
    slug: item.slug,
    title: item.title,
    order: item.order,
  }));

  return (
    <main className="container-page pb-28 pt-8 md:pb-20 md:pt-12">
      <div className="mx-auto mb-6 flex max-w-5xl flex-wrap items-center justify-between gap-4">
        <div>
          <Link
            href="/books"
            className="inline-flex items-center gap-2 text-sm text-amber-200 transition hover:text-amber-100"
          >
            <span aria-hidden="true">←</span>
            กลับไปห้องสมุด
          </Link>

          <p className="mt-3 text-sm text-slate-500">
            POV · {chapter.pov}
          </p>
        </div>

        <ChapterBookmarkButton
          slug={chapter.slug}
          title={chapter.title}
          order={chapter.order}
          excerpt={chapter.excerpt}
        />
      </div>

      <NovelReader
        chapterSlug={chapter.slug}
        chapterTitle={chapter.title}
        chapterOrder={chapter.order}
        paragraphs={chapter.content}
        previousChapter={
          previousChapter
            ? {
                slug: previousChapter.slug,
                title: previousChapter.title,
                order: previousChapter.order,
              }
            : undefined
        }
        nextChapter={
          nextChapter
            ? {
                slug: nextChapter.slug,
                title: nextChapter.title,
                order: nextChapter.order,
              }
            : undefined
        }
        allChapters={navigationChapters}
      />
    </main>
  );
}

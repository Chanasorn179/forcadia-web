import Link from "next/link";
import { notFound } from "next/navigation";
import { NovelReader } from "@/components/novel-reader";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { parseChapterContent } from "@/lib/public-content";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ChapterPreviewPage({
  params,
}: Props) {
  await requireAdmin();

  const { id } = await params;

  const chapter = await prisma.chapter.findUnique({
    where: {
      id,
    },
    include: {
      book: {
        select: {
          title: true,
        },
      },
    },
  });

  if (!chapter) {
    notFound();
  }

  const paragraphs = parseChapterContent(chapter.content);

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link
            href={`/admin/chapters/${chapter.id}`}
            className="text-sm text-amber-200 transition hover:text-amber-100"
          >
            ← กลับไปแก้ไข
          </Link>

          <p className="mt-3 text-sm text-slate-500">
            Preview · {chapter.book.title}
          </p>
        </div>

        <span
          className={[
            "rounded-full border px-4 py-2 text-sm",
            chapter.published
              ? "border-emerald-300/20 bg-emerald-300/5 text-emerald-200"
              : "border-slate-300/15 bg-white/5 text-slate-400",
          ].join(" ")}
        >
          {chapter.published ? "เผยแพร่แล้ว" : "ฉบับร่าง"}
        </span>
      </div>

      <NovelReader
        chapterSlug={`preview-${chapter.slug}`}
        chapterTitle={chapter.title}
        chapterOrder={chapter.orderText}
        paragraphs={paragraphs}
        allChapters={[
          {
            slug: chapter.slug,
            title: chapter.title,
            order: chapter.orderText,
          },
        ]}
      />
    </>
  );
}

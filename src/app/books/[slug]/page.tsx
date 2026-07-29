import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublicBookBySlug } from "@/lib/public-content";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const statusLabels = {
  DRAFT: "ฉบับร่าง",
  ONGOING: "กำลังเผยแพร่",
  COMPLETED: "จบแล้ว",
} as const;

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const book = await getPublicBookBySlug(slug);

  if (!book) {
    return { title: "ไม่พบหนังสือ" };
  }

  return {
    title: book.title,
    description: book.description,
  };
}

export default async function BookDetailPage({
  params,
}: Props) {
  const { slug } = await params;
  const book = await getPublicBookBySlug(slug);

  if (!book) {
    notFound();
  }

  const firstChapter = book.chapters[0];

  return (
    <main className="container-page py-16 md:py-24">
      <Link
        href="/books"
        className="inline-flex items-center gap-2 text-sm text-amber-200 transition hover:text-amber-100"
      >
        <span aria-hidden="true">←</span>
        กลับไปห้องสมุด
      </Link>

      <section className="mt-8 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="glass-panel grid min-h-120 place-items-center rounded-3xl border border-amber-200/15 bg-[radial-gradient(circle_at_center,rgba(217,184,108,0.22),rgba(7,9,18,0.98)_70%)] p-8">
          <div className="w-full max-w-sm rounded-3xl border border-amber-200/20 bg-black/30 p-10 text-center shadow-2xl">
            <p className="text-xs uppercase tracking-[0.28em] text-amber-200">
              {book.subtitle}
            </p>
            <h1 className="gold-text mt-6 text-4xl font-semibold md:text-5xl">
              {book.title}
            </h1>
            <p className="mt-4 text-slate-400">
              {book.thaiTitle}
            </p>
          </div>
        </div>

        <article className="glass-panel rounded-3xl p-7 md:p-10">
          <p className="section-kicker">
            Book {String(book.order).padStart(2, "0")}
          </p>
          <h2 className="gold-text mt-4 text-4xl font-semibold md:text-6xl">
            {book.title}
          </h2>
          <p className="mt-3 text-xl text-slate-300">
            {book.thaiTitle}
          </p>
          <p className="mt-6 text-lg leading-8 text-slate-400">
            {book.description}
          </p>

          <div className="crack-line my-8" />

          <div className="flex flex-wrap gap-3">
            <span className="rounded-full border border-amber-200/20 bg-amber-200/5 px-4 py-2 text-sm text-amber-100">
              {statusLabels[book.status]}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
              {book.chapters.length} ตอนที่เผยแพร่
            </span>
          </div>

          {firstChapter && (
            <Link
              href={`/read/${firstChapter.slug}`}
              className="mt-8 inline-flex rounded-full border border-amber-200/30 bg-amber-200/10 px-6 py-3 font-semibold text-amber-100 transition hover:bg-amber-200/20"
            >
              เริ่มอ่านเล่มนี้
            </Link>
          )}
        </article>
      </section>

      <section className="mt-12">
        <p className="section-kicker">Chapter Archive</p>
        <h2 className="mt-3 text-2xl font-semibold md:text-4xl">
          สารบัญ
        </h2>

        <div className="mt-6 space-y-4">
          {book.chapters.map((chapter, index) => (
            <Link
              key={chapter.id}
              href={`/read/${chapter.slug}`}
              className="glass-panel card-hover group flex flex-col gap-4 rounded-3xl p-6 md:flex-row md:items-center md:justify-between"
            >
              <div className="flex gap-5">
                <span className="text-sm text-slate-500">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                    {chapter.orderText}
                  </p>
                  <h3 className="mt-2 text-xl text-amber-100">
                    {chapter.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-7 text-slate-400">
                    {chapter.excerpt}
                  </p>
                </div>
              </div>

              <span className="shrink-0 text-sm text-amber-200 transition group-hover:translate-x-1">
                อ่านตอนนี้ →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { lore } from "@/data/forcadia";
import {
  getPublicLoreBySlug,
  getPublicLoreEntries,
} from "@/lib/public-content";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return lore.map((entry) => ({
    slug: entry.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getPublicLoreBySlug(slug);

  if (!entry) {
    return {
      title: "ไม่พบข้อมูล",
    };
  }

  return {
    title: entry.term,
    description: entry.meaning,
  };
}

export default async function LoreDetailPage({ params }: Props) {
  const { slug } = await params;
  const [entry, loreEntries] = await Promise.all([
    getPublicLoreBySlug(slug),
    getPublicLoreEntries(),
  ]);

  if (!entry) {
    notFound();
  }

  const relatedEntries = entry.related.flatMap((relatedItem) => {
    const match = loreEntries.find((item) => item.term === relatedItem);
    return match ? [match] : [];
  });

  return (
    <main className="container-page py-16 md:py-24">
      <Link
        href="/lore"
        className="inline-flex items-center gap-2 text-sm text-amber-200 transition hover:text-amber-100"
      >
        <span aria-hidden="true">←</span>
        กลับไปคลังตำนาน
      </Link>

      <article className="glass-panel mx-auto mt-8 max-w-5xl rounded-3xl p-7 md:p-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start">
          <div className="grid h-28 w-28 shrink-0 place-items-center rounded-3xl border border-amber-200/25 bg-amber-200/5 text-5xl text-amber-200">
            {entry.symbol}
          </div>

          <div>
            <p className="section-kicker">{entry.category}</p>

            <h1 className="gold-text mt-4 text-4xl font-semibold md:text-6xl">
              {entry.term}
            </h1>

            <p className="mt-3 text-xl text-slate-300">{entry.thaiName}</p>

            <p className="mt-6 text-xl leading-8 text-amber-100">
              {entry.meaning}
            </p>
          </div>
        </div>

        <div className="crack-line my-10" />

        <div className="grid gap-8 md:grid-cols-2">
          <section>
            <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
              รายละเอียด
            </p>
            <p className="mt-4 leading-8 text-slate-300">{entry.description}</p>
          </section>

          <section>
            <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
              ต้นกำเนิด
            </p>
            <p className="mt-4 leading-8 text-slate-300">{entry.origin}</p>
          </section>
        </div>

        <section className="mt-8 rounded-2xl border border-amber-200/15 bg-amber-200/5 p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-amber-200">
            ความสำคัญต่อจักรวรรดิ
          </p>

          <p className="mt-4 leading-8 text-slate-300">{entry.significance}</p>
        </section>

        <section className="mt-8">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
            ข้อมูลที่เกี่ยวข้อง
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            {entry.related.map((relatedItem) => {
              const relatedEntry = relatedEntries.find(
                (item) => item.term === relatedItem,
              );

              return relatedEntry ? (
                <Link
                  key={relatedItem}
                  href={`/lore/${relatedEntry.slug}`}
                  className="rounded-full border border-amber-200/20 bg-amber-200/5 px-4 py-2 text-sm text-amber-100 transition hover:bg-amber-200/10"
                >
                  {relatedItem} →
                </Link>
              ) : (
                <span
                  key={relatedItem}
                  className="rounded-full border border-white/10 bg-white/3 px-4 py-2 text-sm text-slate-300"
                >
                  {relatedItem}
                </span>
              );
            })}
          </div>
        </section>

        {entry.slug === "sovereign-key" && (
          <section className="mt-8 rounded-2xl border border-amber-200/20 bg-amber-200/5 p-6">
            <p className="section-kicker">The Eight Fragments</p>
            <h2 className="mt-3 text-2xl text-amber-100">กุญแจราชันย์ทั้งแปด</h2>
            <p className="mt-3 leading-7 text-slate-300">
              เปิดสารบบเพื่อดูชื่อกุญแจ ผู้ถือครอง ตระกูล และอำนาจที่เชื่อมโยงกัน
            </p>
            <Link
              href="/sovereign-keys"
              className="mt-5 inline-flex rounded-full border border-amber-200/30 px-5 py-2.5 text-sm font-semibold text-amber-100 transition hover:bg-amber-200/10"
            >
              เปิดสารบบกุญแจราชันย์ →
            </Link>
          </section>
        )}
      </article>
    </main>
  );
}

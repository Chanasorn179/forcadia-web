import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { eras } from "@/data/forcadia";
import { getPublicEraBySlug } from "@/lib/public-content";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return eras.map((era) => ({
    slug: era.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const era = await getPublicEraBySlug(slug);

  if (!era) {
    return {
      title: "ไม่พบศักราช",
    };
  }

  return {
    title: era.name,
    description: era.description,
  };
}

export default async function EraDetailPage({ params }: Props) {
  const { slug } = await params;
  const era = await getPublicEraBySlug(slug);

  if (!era) {
    notFound();
  }

  return (
    <main className="container-page py-16 md:py-24">
      <Link
        href="/timeline"
        className="inline-flex items-center gap-2 text-sm text-amber-200 transition hover:text-amber-100"
      >
        <span aria-hidden="true">←</span>
        กลับไปเส้นเวลา
      </Link>

      <section className="mt-8 grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
        <div
          className="glass-panel relative grid min-h-105 place-items-center overflow-hidden rounded-3xl border"
          style={{
            borderColor: `${era.accent}55`,
            background: `radial-gradient(circle, ${era.accent}28, rgba(7,9,18,0.82) 62%)`,
          }}
        >
          <span
            className="text-8xl"
            style={{
              color: era.accent,
              filter: `drop-shadow(0 0 28px ${era.accent}66)`,
            }}
          >
            {era.symbol}
          </span>

          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-7 text-center">
            <p className="text-sm text-slate-400">{era.ruler}</p>
            <p className="mt-1 text-xl text-amber-100">{era.duration}</p>
          </div>
        </div>

        <article className="glass-panel rounded-3xl p-7 md:p-10">
          <p className="section-kicker">Chronicle Entry</p>

          <h1 className="gold-text mt-4 text-4xl font-semibold md:text-6xl">
            {era.name}
          </h1>

          <p className="mt-3 text-xl text-slate-300">{era.thaiName}</p>

          <p className="mt-6 text-2xl" style={{ color: era.accent }}>
            {era.detail}
          </p>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            {era.description}
          </p>

          <div className="crack-line my-8" />

          <div className="grid gap-7 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                ผู้ปกครอง
              </p>
              <p className="mt-2 text-lg text-amber-100">{era.ruler}</p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                ระยะเวลา
              </p>
              <p className="mt-2 text-lg text-amber-100">{era.duration}</p>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
              เหตุการณ์สำคัญ
            </p>

            <ul className="mt-4 space-y-3">
              {era.events.map((event) => (
                <li
                  key={event}
                  className="flex gap-3 rounded-2xl border border-white/10 bg-white/3 p-4 text-slate-300"
                >
                  <span style={{ color: era.accent }}>✦</span>
                  <span>{event}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 rounded-2xl border border-amber-200/15 bg-amber-200/5 p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-amber-200">
              มรดกของศักราช
            </p>

            <p className="mt-3 leading-8 text-slate-300">{era.legacy}</p>
          </div>
        </article>
      </section>
    </main>
  );
}

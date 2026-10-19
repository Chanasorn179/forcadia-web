import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { eras } from "@/data/forcadia";
import { getPublicEraBySlug } from "@/lib/public-content";
import { ArrowIcon, SuitIcon, SymbolIcon } from "@/components/icons";

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
        <ArrowIcon className="h-4 w-4 rotate-180" />
        กลับไปเส้นเวลา
      </Link>

      <section className="mt-8 grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
        <div
          className="always-dark glass-panel relative grid min-h-105 place-items-center overflow-hidden rounded-3xl border"
          style={{
            borderColor: `${era.accent}55`,
            background: `radial-gradient(circle at 50% 42%, ${era.accent}30, #1d0915 64%)`,
          }}
        >
          <span className="era-seal" style={{ color: era.accent }}>
            <SymbolIcon symbol={era.symbol} className="h-24 w-24 md:h-32 md:w-32" strokeWidth={1.1} />
          </span>

          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-7 text-center">
            <p className="text-sm text-slate-400">{era.ruler}</p>
            <p className="mt-1 text-xl text-amber-100">{era.duration}</p>
          </div>
        </div>

        <article className="glass-panel rounded-3xl p-7 md:p-10">
          <h1 className="gold-text mt-4 text-4xl font-semibold md:text-6xl">
            {era.name}
          </h1>

          <p className="mt-3 text-xl text-slate-300">{era.thaiName}</p>

          <p className="mt-6 text-2xl" data-accent-ink style={{ color: era.accent }}>
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
                  <SuitIcon className="h-3 w-3" data-accent-ink style={{ color: era.accent }} />
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

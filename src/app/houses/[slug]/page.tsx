import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HouseEmblem } from "@/components/house-emblem";
import { RelationCard } from "@/components/relation-card";
import { houses } from "@/data/houses";
import { getPublicHouseBySlug } from "@/lib/public-content";
import {
  getCharacterByHouseSlug,
  getCityByHouseSlug,
} from "@/lib/forcadia-relations";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return houses.map((house) => ({
    slug: house.slug,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const house = await getPublicHouseBySlug(slug);

  if (!house) {
    return {
      title: "ไม่พบตระกูล",
    };
  }

  return {
    title: house.name,
    description: house.description,
  };
}

export default async function HouseDetailPage({ params }: Props) {
  const { slug } = await params;
  const house = await getPublicHouseBySlug(slug);

  if (!house) {
    notFound();
  }

  const ruler = getCharacterByHouseSlug(house.slug);
  const city = getCityByHouseSlug(house.slug);

  return (
    <main className="container-page py-16 md:py-24">
      <Link
        href="/houses"
        className="inline-flex items-center gap-2 text-sm text-amber-200 transition hover:text-amber-100"
      >
        <span aria-hidden="true">←</span>
        กลับไปหน้าตระกูล
      </Link>

      <section className="mt-8 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <HouseEmblem
          src={house.emblem}
          alt={`ตรา ${house.name}`}
          accent={house.accent}
          size="lg"
        />

        <article className="glass-panel rounded-3xl p-7 md:p-10">
          <p className="section-kicker">{house.emblemName}</p>

          <h1 className="gold-text mt-4 text-4xl font-semibold md:text-6xl">
            {house.name}
          </h1>

          <p className="mt-3 text-xl text-slate-300">{house.thaiName}</p>

          <blockquote
            className="mt-6 border-l-2 pl-5 text-xl italic"
            style={{
              borderColor: house.accent,
              color: house.accent,
            }}
          >
            “{house.motto}”
          </blockquote>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            {house.description}
          </p>

          <div className="crack-line my-8" />

          <dl className="grid gap-6 md:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-[0.22em] text-slate-500">
                ผู้ปกครอง
              </dt>
              <dd className="mt-2 text-lg text-amber-100">{house.ruler}</dd>
            </div>

            <div>
              <dt className="text-xs uppercase tracking-[0.22em] text-slate-500">
                นครประจำตระกูล
              </dt>
              <dd className="mt-2 text-lg text-amber-100">{house.city}</dd>
            </div>

            <div>
              <dt className="text-xs uppercase tracking-[0.22em] text-slate-500">
                กุญแจราชันย์
              </dt>
              <dd className="mt-2 text-lg text-amber-100">{house.key}</dd>
            </div>

            <div>
              <dt className="text-xs uppercase tracking-[0.22em] text-slate-500">
                เขตแดนอาคม
              </dt>
              <dd className="mt-2 text-lg text-amber-100">{house.domain}</dd>
            </div>
          </dl>
        </article>
      </section>

      {(ruler || city) && (
        <section className="mt-10">
          <p className="section-kicker">House Connections</p>

          <h2 className="mt-3 text-2xl font-semibold md:text-4xl">
            ผู้ปกครองและดินแดน
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {ruler && (
              <RelationCard
                href={`/characters/${ruler.slug}`}
                eyebrow="House Ruler"
                title={ruler.name}
                description={`${ruler.thaiName} · ${ruler.title}`}
              />
            )}

            {city && (
              <RelationCard
                href={`/world/${city.slug}`}
                eyebrow="House Capital"
                title={city.name}
                description={`${city.thaiName} · ${city.title}`}
              />
            )}
          </div>
        </section>
      )}
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RelationCard } from "@/components/relation-card";
import { characters } from "@/data/forcadia";
import {
  getCityByCharacterSlug,
  getHouseByCharacterSlug,
} from "@/lib/forcadia-relations";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return characters.map((character) => ({
    slug: character.slug,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const character = characters.find((item) => item.slug === slug);

  return {
    title: character?.name ?? "ไม่พบตัวละคร",
    description: character?.summary,
  };
}

export default async function CharacterDetailPage({ params }: Props) {
  const { slug } = await params;
  const character = characters.find((item) => item.slug === slug);

  if (!character) {
    notFound();
  }

  const house = getHouseByCharacterSlug(character.slug);
  const city = getCityByCharacterSlug(character.slug);

  return (
    <main className="container-page py-16 md:py-24">
      <Link
        href="/characters"
        className="inline-flex items-center gap-2 text-sm text-amber-200 transition hover:text-amber-100"
      >
        <span aria-hidden="true">←</span>
        กลับไปหน้าตัวละคร
      </Link>

      <section className="mt-8 grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
        <div
          className="glass-panel grid min-h-105 place-items-center rounded-3xl border text-8xl"
          style={{
            color: character.accent,
            borderColor: `${character.accent}55`,
            background: `radial-gradient(circle, ${character.accent}28, rgba(7, 9, 18, 0.75) 60%)`,
          }}
        >
          {character.symbol}
        </div>

        <article className="glass-panel rounded-3xl p-7 md:p-10">
          <p className="section-kicker">{character.house}</p>

          <h1 className="gold-text mt-4 text-4xl font-semibold md:text-6xl">
            {character.name}
          </h1>

          <p className="mt-3 text-lg text-slate-300">
            {character.thaiName}
          </p>

          <p className="mt-6 text-2xl text-amber-100">
            {character.title}
          </p>

          <p className="mt-5 max-w-3xl leading-8 text-slate-400">
            {character.summary}
          </p>

          <div className="crack-line my-8" />

          <dl className="grid gap-5 md:grid-cols-2">
            {[
              ["นคร", character.city],
              ["กุญแจราชันย์", character.key],
              ["เนตรราชันย์", character.eye],
              ["เขตแดนอาคม", character.domain],
              ["กองทัพ", character.army],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs uppercase tracking-[0.22em] text-slate-500">
                  {label}
                </dt>
                <dd className="mt-2 text-amber-100">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
              เวทและพลังเด่น
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {character.powers.map((power) => (
                <span
                  key={power}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300"
                >
                  {power}
                </span>
              ))}
            </div>
          </div>
        </article>
      </section>

      {(house || city) && (
        <section className="mt-10">
          <p className="section-kicker">Related Records</p>

          <h2 className="mt-3 text-2xl font-semibold md:text-4xl">
            บันทึกที่เกี่ยวข้อง
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {house && (
              <RelationCard
                href={`/houses/${house.slug}`}
                eyebrow="Imperial House"
                title={house.name}
                description={`${house.thaiName} · ${house.emblemName}`}
              />
            )}

            {city && (
              <RelationCard
                href={`/world/${city.slug}`}
                eyebrow="Capital City"
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

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCharacterArtwork } from "@/data/media";
import { HouseEmblem } from "@/components/house-emblem";
import { RelationCard } from "@/components/relation-card";
import {
  getCityByCharacterSlug,
  getHouseByCharacterSlug,
} from "@/lib/forcadia-relations";
import { getPublicCharacterBySlug } from "@/lib/public-content";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const character = await getPublicCharacterBySlug(slug);

  if (!character) {
    return { title: "ไม่พบตัวละคร" };
  }

  return {
    title: character.name,
    description: character.summary,
  };
}

export default async function CharacterDetailPage({
  params,
}: Props) {
  const { slug } = await params;

  const character = await getPublicCharacterBySlug(slug);

  if (!character) {
    notFound();
  }

  const powers = Array.isArray(character.powers)
    ? character.powers.filter(
        (item): item is string => typeof item === "string",
      )
    : [];
  const house = getHouseByCharacterSlug(character.slug);
  const city = getCityByCharacterSlug(character.slug);

  return (
    <main className="container-page py-16 md:py-24">
      <Link
        href="/characters"
        className="text-sm text-amber-200 transition hover:text-amber-100"
      >
        ← กลับไปหน้าตัวละคร
      </Link>

      <section className="mt-8 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div
          className="glass-panel relative min-h-120 overflow-hidden rounded-3xl"
          style={{
            background:
              `radial-gradient(circle at center, ${character.accent}22, rgba(7,9,18,0.98) 70%)`,
          }}
        >
          <Image
            src={getCharacterArtwork(character.slug)}
            alt={character.thaiName}
            fill
            priority
            className="object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#070912] via-transparent to-black/10" />
          <div className="absolute inset-x-0 bottom-0 p-7 text-center">
            <p className="text-sm uppercase tracking-[0.22em] text-slate-300">
              {character.keyName}
            </p>
          </div>
        </div>

        <article className="glass-panel rounded-3xl p-7 md:p-10">
          <p className="section-kicker">Imperial Sovereign</p>

          <h1 className="gold-text mt-4 text-4xl font-semibold md:text-6xl">
            {character.name}
          </h1>

          <p className="mt-3 text-xl text-slate-300">
            {character.thaiName}
          </p>

          <p className="mt-4 text-lg text-amber-200">
            {character.title}
          </p>

          <p className="mt-6 leading-8 text-slate-400">
            {character.summary}
          </p>

          <div className="crack-line my-8" />

          <dl className="grid gap-5 sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-[0.18em] text-slate-500">
                Royal Eye
              </dt>
              <dd className="mt-2 text-amber-100">
                {character.eye}
              </dd>
            </div>

            <div>
              <dt className="text-xs uppercase tracking-[0.18em] text-slate-500">
                Domain
              </dt>
              <dd className="mt-2 text-amber-100">
                {character.domain}
              </dd>
            </div>

            <div>
              <dt className="text-xs uppercase tracking-[0.18em] text-slate-500">
                Army
              </dt>
              <dd className="mt-2 text-amber-100">
                {character.army}
              </dd>
            </div>

            <div>
              <dt className="text-xs uppercase tracking-[0.18em] text-slate-500">
                Sovereign Key
              </dt>
              <dd className="mt-2 text-amber-100">
                {character.keyName}
              </dd>
            </div>
          </dl>

          {character.house && (
            <Link
              href={`/houses/${character.house.slug}`}
              className="mt-8 inline-flex rounded-full border border-amber-200/30 bg-amber-200/10 px-5 py-3 text-sm font-semibold text-amber-100 transition hover:bg-amber-200/20"
            >
              เปิดบันทึก {character.house.name}
            </Link>
          )}
        </article>
      </section>

      <section className="mt-12">
        <p className="section-kicker">Abilities</p>

        <h2 className="mt-3 text-3xl font-semibold">
          พลังเด่น
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {powers.map((power, index) => (
            <article
              key={power}
              className="glass-panel flex items-center gap-4 rounded-2xl p-5 text-slate-300"
            >
              <span
                aria-hidden="true"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border text-sm font-semibold"
                style={{ borderColor: `${character.accent}66`, color: character.accent }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                  Sovereign Ability
                </p>
                <h3 className="mt-1 text-lg text-amber-100">{power}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      {(house || city) && (
        <section className="mt-16">
          <p className="section-kicker">Realm &amp; Allegiance</p>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
            สายอำนาจและดินแดน
          </h2>
          <p className="mt-4 max-w-3xl leading-8 text-slate-400">
            อำนาจของผู้ครองบัลลังก์เชื่อมโยงกับตระกูล คำปฏิญาณ
            และนครที่อยู่ภายใต้การพิทักษ์
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {house && (
              <article className="glass-panel rounded-3xl p-6 md:p-8">
                <div className="grid gap-6 sm:grid-cols-[7rem_1fr] sm:items-center">
                  <HouseEmblem
                    src={house.emblem}
                    alt={`ตรา ${house.name}`}
                    accent={house.accent}
                    size="md"
                  />
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                      Imperial House
                    </p>
                    <h3 className="mt-2 text-2xl text-amber-100">{house.name}</h3>
                    <p className="mt-1 text-sm text-slate-400">{house.thaiName}</p>
                  </div>
                </div>

                <blockquote
                  className="mt-6 border-l-2 pl-5 text-lg italic leading-8"
                  style={{ borderColor: house.accent, color: house.accent }}
                >
                  “{house.motto}”
                </blockquote>
                <p className="mt-5 leading-8 text-slate-400">{house.description}</p>

                <Link
                  href={`/houses/${house.slug}`}
                  className="mt-6 inline-flex text-sm font-semibold text-amber-200 transition hover:translate-x-1"
                >
                  เปิดบันทึกตระกูล →
                </Link>
              </article>
            )}

            {city && (
              <article className="glass-panel rounded-3xl p-6 md:p-8">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                  Sovereign Capital
                </p>
                <div className="mt-3 flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-full border text-xl"
                    style={{ borderColor: `${city.accent}66`, color: city.accent }}
                  >
                    {city.symbol}
                  </span>
                  <div>
                    <h3 className="text-2xl text-amber-100">{city.name}</h3>
                    <p className="mt-1 text-sm text-slate-400">
                      {city.thaiName} · {city.title}
                    </p>
                  </div>
                </div>

                <p className="mt-5 leading-8 text-slate-400">{city.description}</p>
                <dl className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs uppercase tracking-[0.18em] text-slate-500">บรรยากาศ</dt>
                    <dd className="mt-2 text-sm leading-7 text-slate-300">{city.atmosphere}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.18em] text-slate-500">สถาปัตยกรรม</dt>
                    <dd className="mt-2 text-sm leading-7 text-slate-300">{city.architecture}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-xs uppercase tracking-[0.18em] text-slate-500">สถานที่สำคัญ</dt>
                    <dd className="mt-2 text-amber-100">{city.landmark}</dd>
                  </div>
                </dl>

                <Link
                  href={`/world/${city.slug}`}
                  className="mt-6 inline-flex text-sm font-semibold text-amber-200 transition hover:translate-x-1"
                >
                  สำรวจนครแห่งนี้ →
                </Link>
              </article>
            )}
          </div>

          {house && city && (
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <RelationCard
                href={`/houses/${house.slug}`}
                eyebrow="House Archive"
                title={house.emblemName}
                description={`${house.key} · ${house.domain}`}
              />
              <RelationCard
                href={`/world/${city.slug}`}
                eyebrow="Capital Archive"
                title={city.landmark}
                description={city.title}
              />
            </div>
          )}
        </section>
      )}
    </main>
  );
}

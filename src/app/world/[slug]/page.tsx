import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RelationCard } from "@/components/relation-card";
import { cities } from "@/data/forcadia";
import { empire } from "@/data/empire";
import {
  getCharacterByCitySlug,
  getHouseByCitySlug,
} from "@/lib/forcadia-relations";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return cities.map((city) => ({
    slug: city.slug,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const city = cities.find((item) => item.slug === slug);

  if (!city) {
    return {
      title: "ไม่พบสถานที่",
    };
  }

  return {
    title: city.name,
    description: city.description,
  };
}

export default async function CityDetailPage({ params }: Props) {
  const { slug } = await params;
  const city = cities.find((item) => item.slug === slug);

  if (!city) {
    notFound();
  }

  const isCentralCapital = city.slug === "fourcadir-central-capital";
  const house = getHouseByCitySlug(city.slug);
  const ruler = getCharacterByCitySlug(city.slug);

  const crestImage = isCentralCapital
    ? empire.crest
    : house?.emblem;

  const crestTitle = isCentralCapital
    ? empire.name
    : house?.name ?? city.faction;

  const crestSubtitle = isCentralCapital
    ? "Imperial Crest"
    : house?.emblemName ?? "House Emblem";

  return (
    <main className="container-page py-16 md:py-24">
      <Link
        href="/world"
        className="inline-flex items-center gap-2 text-sm text-amber-200 transition hover:text-amber-100"
      >
        <span aria-hidden="true">←</span>
        กลับไปแผนที่จักรวรรดิ
      </Link>

      <section className="mt-8 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div
          className="glass-panel relative min-h-120 overflow-hidden rounded-3xl border"
          style={{
            borderColor: `${city.accent}55`,
            background: `radial-gradient(circle at center, ${city.accent}18, rgba(7, 9, 18, 0.92) 68%)`,
          }}
        >
          {crestImage ? (
            <Image
              src={crestImage}
              alt={crestTitle}
              fill
              priority
              className="object-contain p-8 md:p-12"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
          ) : (
            <div
              className="grid h-full min-h-120 place-items-center text-8xl"
              style={{ color: city.accent }}
            >
              {city.symbol}
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 via-black/60 to-transparent px-7 pb-7 pt-24 text-center">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
              {crestSubtitle}
            </p>

            <p className="mt-2 text-xl text-amber-100">
              {crestTitle}
            </p>
          </div>
        </div>

        <article className="glass-panel rounded-3xl p-7 md:p-10">
          <p className="section-kicker">{city.faction}</p>

          <h1 className="gold-text mt-4 text-4xl font-semibold md:text-6xl">
            {city.name}
          </h1>

          <p className="mt-3 text-xl text-slate-300">
            {city.thaiName}
          </p>

          <p className="mt-6 text-2xl" style={{ color: city.accent }}>
            {city.title}
          </p>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
            {city.description}
          </p>

          <div className="crack-line my-8" />

          <dl className="grid gap-6 md:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-[0.22em] text-slate-500">
                ผู้ปกครอง
              </dt>
              <dd className="mt-2 text-lg text-amber-100">{city.ruler}</dd>
            </div>

            <div>
              <dt className="text-xs uppercase tracking-[0.22em] text-slate-500">
                อำนาจปกครอง
              </dt>
              <dd className="mt-2 text-lg text-amber-100">{city.faction}</dd>
            </div>

            <div>
              <dt className="text-xs uppercase tracking-[0.22em] text-slate-500">
                สถานที่สำคัญ
              </dt>
              <dd className="mt-2 text-lg text-amber-100">{city.landmark}</dd>
            </div>

            <div>
              <dt className="text-xs uppercase tracking-[0.22em] text-slate-500">
                บรรยากาศ
              </dt>
              <dd className="mt-2 leading-7 text-slate-300">
                {city.atmosphere}
              </dd>
            </div>
          </dl>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/3 p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
              สถาปัตยกรรม
            </p>

            <p className="mt-3 leading-8 text-slate-300">
              {city.architecture}
            </p>
          </div>
        </article>
      </section>

      <section className="mt-10">
        <p className="section-kicker">Connected Records</p>

        <h2 className="mt-3 text-2xl font-semibold md:text-4xl">
          บันทึกที่เชื่อมโยง
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {isCentralCapital ? (
            <RelationCard
              href="/houses"
              eyebrow="The Eight Imperial Houses"
              title="แปดตระกูลจักรพรรดิ"
              description="ผู้ครอบครองกุญแจราชันย์และผู้ค้ำจุน Unity Crown"
            />
          ) : (
            house && (
              <RelationCard
                href={`/houses/${house.slug}`}
                eyebrow="Ruling House"
                title={house.name}
                description={`${house.thaiName} · ${house.emblemName}`}
              />
            )
          )}

          {ruler && (
            <RelationCard
              href={`/characters/${ruler.slug}`}
              eyebrow="Sovereign"
              title={ruler.name}
              description={`${ruler.thaiName} · ${ruler.title}`}
            />
          )}
        </div>
      </section>
    </main>
  );
}

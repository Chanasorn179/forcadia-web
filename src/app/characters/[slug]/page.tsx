import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const character = await prisma.character.findUnique({
    where: { slug },
    select: {
      name: true,
      summary: true,
    },
  });

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

  const character = await prisma.character.findUnique({
    where: { slug },
    include: {
      house: {
        select: {
          slug: true,
          name: true,
          thaiName: true,
          motto: true,
          emblem: true,
        },
      },
    },
  });

  if (!character) {
    notFound();
  }

  const powers = Array.isArray(character.powers)
    ? character.powers.filter(
        (item): item is string => typeof item === "string",
      )
    : [];

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
          className="glass-panel grid min-h-120 place-items-center rounded-3xl p-8"
          style={{
            background:
              `radial-gradient(circle at center, ${character.accent}22, rgba(7,9,18,0.98) 70%)`,
          }}
        >
          <div className="text-center">
            <span
              className="mx-auto grid h-32 w-32 place-items-center rounded-full border text-6xl"
              style={{
                color: character.accent,
                borderColor: `${character.accent}66`,
                backgroundColor: `${character.accent}14`,
              }}
            >
              {character.symbol}
            </span>

            <p className="mt-8 text-sm uppercase tracking-[0.22em] text-slate-500">
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
          {powers.map((power) => (
            <article
              key={power}
              className="glass-panel rounded-2xl p-5 text-slate-300"
            >
              {power}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

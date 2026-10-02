import { PageHeader } from "@/components/page-header";
import type { Metadata } from "next";
import Link from "next/link";
import { HouseEmblem } from "@/components/house-emblem";
import {
  getPublicCharacters,
  getPublicHouses,
} from "@/lib/public-content";

export const metadata: Metadata = {
  title: "กุญแจราชันย์ทั้งแปด",
  description: "สารบบกุญแจราชันย์ ผู้ถือครอง และตระกูลแห่ง Forcadia",
};

export const dynamic = "force-dynamic";

export default async function SovereignKeysPage() {
  const [characters, houses] = await Promise.all([
    getPublicCharacters(),
    getPublicHouses(),
  ]);
  return (
    <main className="container-page pb-16 md:pb-24">
      <Link href="/lore/sovereign-key" className="mt-10 inline-flex text-sm text-[var(--gold)] transition hover:text-[var(--gold-soft)]">
        ← กลับไปตำนานกุญแจราชันย์
      </Link>

      <PageHeader
        kicker="The Eight Sovereign Keys"
        title={<>กุญแจราชันย์ทั้งแปด</>}
        lede={<>เศษอำนาจของปฐมจักรพรรดิที่ผูกพันกับผู้ถือครองทั้งแปด แต่ละดอกควบคุมหลักการและเขตแดนอาคมที่แตกต่างกัน</>}
      />

      <div className="grid gap-6 md:grid-cols-2">
        {houses.map((house, index) => {
          const holder = characters.find((item) => item.slug === house.rulerSlug);

          return (
            <article key={house.slug} className="glass-panel rounded-xl p-6 md:p-8">
              <div className="grid gap-6 sm:grid-cols-[7rem_1fr] sm:items-center">
                <HouseEmblem src={house.emblem} alt={`ตรา ${house.name}`} accent={house.accent} size="md" />
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Key {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-2 text-2xl text-[var(--gold-soft)]">{house.key}</h2>
                  <p className="mt-2 text-sm text-slate-400">{house.name} · {house.thaiName}</p>
                </div>
              </div>

              <dl className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <dt className="text-xs uppercase tracking-[0.18em] text-slate-500">ผู้ถือครอง</dt>
                  <dd className="mt-2 text-[var(--gold-soft)]">{holder?.name ?? house.ruler}</dd>
                  {holder && <dd className="mt-1 text-sm text-slate-400">{holder.thaiName}</dd>}
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.18em] text-slate-500">Domain</dt>
                  <dd className="mt-2 text-[var(--gold-soft)]">{house.domain}</dd>
                </div>
                {holder && (
                  <>
                    <div>
                      <dt className="text-xs uppercase tracking-[0.18em] text-slate-500">Royal Eye</dt>
                      <dd className="mt-2 text-slate-300">{holder.eye}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-[0.18em] text-slate-500">Army</dt>
                      <dd className="mt-2 text-slate-300">{holder.army}</dd>
                    </div>
                  </>
                )}
              </dl>

              <div className="mt-6 flex flex-wrap gap-3">
                {holder && (
                  <Link href={`/characters/${holder.slug}`} className="rounded-full border border-amber-200/25 px-4 py-2 text-sm text-[var(--gold-soft)] transition hover:bg-amber-200/10">
                    ผู้ถือครอง →
                  </Link>
                )}
                <Link href={`/houses/${house.slug}`} className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/5">
                  ตระกูล →
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}

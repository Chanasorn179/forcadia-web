import type { Metadata } from "next";
import Link from "next/link";
import { HouseEmblem } from "@/components/house-emblem";
import { characters } from "@/data/forcadia";
import { houses } from "@/data/houses";

export const metadata: Metadata = {
  title: "กุญแจราชันย์ทั้งแปด",
  description: "สารบบกุญแจราชันย์ ผู้ถือครอง และตระกูลแห่ง Forcadia",
};

export default function SovereignKeysPage() {
  return (
    <main className="container-page py-16 md:py-24">
      <Link href="/lore/sovereign-key" className="text-sm text-amber-200 transition hover:text-amber-100">
        ← กลับไปตำนานกุญแจราชันย์
      </Link>

      <p className="section-kicker mt-8">The Eight Sovereign Keys</p>
      <h1 className="mt-4 text-4xl font-semibold md:text-6xl">กุญแจราชันย์ทั้งแปด</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
        เศษอำนาจของปฐมจักรพรรดิที่ผูกพันกับผู้ถือครองทั้งแปด
        แต่ละดอกควบคุมหลักการและเขตแดนอาคมที่แตกต่างกัน
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {houses.map((house, index) => {
          const holder = characters.find((item) => item.slug === house.rulerSlug);

          return (
            <article key={house.slug} className="glass-panel rounded-3xl p-6 md:p-8">
              <div className="grid gap-6 sm:grid-cols-[7rem_1fr] sm:items-center">
                <HouseEmblem src={house.emblem} alt={`ตรา ${house.name}`} accent={house.accent} size="md" />
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Key {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-2 text-2xl text-amber-100">{house.key}</h2>
                  <p className="mt-2 text-sm text-slate-400">{house.name} · {house.thaiName}</p>
                </div>
              </div>

              <dl className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <dt className="text-xs uppercase tracking-[0.18em] text-slate-500">ผู้ถือครอง</dt>
                  <dd className="mt-2 text-amber-100">{holder?.name ?? house.ruler}</dd>
                  {holder && <dd className="mt-1 text-sm text-slate-400">{holder.thaiName}</dd>}
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.18em] text-slate-500">Domain</dt>
                  <dd className="mt-2 text-amber-100">{house.domain}</dd>
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
                  <Link href={`/characters/${holder.slug}`} className="rounded-full border border-amber-200/25 px-4 py-2 text-sm text-amber-100 transition hover:bg-amber-200/10">
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

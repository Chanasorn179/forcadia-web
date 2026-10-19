import type { Metadata } from "next";
import Link from "next/link";
import { getPublicEras } from "@/lib/public-content";
import { SymbolIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "เส้นเวลา",
};

export const dynamic = "force-dynamic";

export default async function TimelinePage() {
  const eras = await getPublicEras();
  return (
    <main className="container-page py-16 md:py-24">
      <h1 className="mt-4 text-4xl font-semibold md:text-6xl">
        ศักราชแห่งจักรวรรดิ
      </h1>

      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
        ทุกสองร้อยห้าสิบปี อำนาจจะคืนสู่ Unity Crown
        และศักราชใหม่จะถือกำเนิดจากผู้ครอบครองบัลลังก์
      </p>

      <div className="relative mt-14 space-y-7 before:absolute before:bottom-5 before:left-5 before:top-5 before:w-px before:bg-amber-200/20 md:before:left-1/2">
        {eras.map((era, index) => (
          <article
            key={era.slug}
            className={`relative grid gap-6 md:grid-cols-2 ${
              index % 2 === 0 ? "md:text-right" : ""
            }`}
          >
            <div className={index % 2 === 1 ? "md:col-start-2" : ""}>
              <Link
                href={`/timeline/${era.slug}`}
                className="glass-panel card-hover group block rounded-3xl p-6"
              >

                <div
                  className={`mt-3 flex items-center gap-4 ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full border"
                    data-accent-ink style={{
                      color: era.accent,
                      borderColor: `${era.accent}55`,
                      backgroundColor: `${era.accent}12`,
                    }}
                  >
                    <SymbolIcon symbol={era.symbol} className="h-6 w-6" />
                  </span>

                  <h2 className="text-2xl">{era.name}</h2>
                </div>

                <p className="mt-4 leading-7 text-slate-400">{era.detail}</p>

                <span className="mt-5 inline-flex text-sm text-amber-200 transition group-hover:translate-x-1">
                  เปิดบันทึกศักราช
                </span>
              </Link>
            </div>

            <span className="absolute left-5 top-8 h-3 w-3 -translate-x-1/2 rounded-full border border-amber-100 bg-[#0a0d16] md:left-1/2" />
          </article>
        ))}
      </div>
    </main>
  );
}

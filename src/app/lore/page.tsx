import type { Metadata } from "next";
import Link from "next/link";
import { lore } from "@/data/forcadia";

export const metadata: Metadata = {
  title: "คลังตำนาน",
};

export default function LorePage() {
  const categories = [...new Set(lore.map((item) => item.category))];

  return (
    <main className="container-page py-16 md:py-24">
      <p className="section-kicker">Imperial Codex</p>

      <h1 className="mt-4 text-4xl font-semibold md:text-6xl">
        คลังตำนานจักรวรรดิ
      </h1>

      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
        บันทึกสิ่งประดิษฐ์ กฎ สถาบัน เวทชั้นสูง และปริศนา
        ที่กำหนดโครงสร้างของโลก Forcadia
      </p>

      <section className="mt-10 grid gap-5 md:grid-cols-2">
        <Link
          href="/glossary"
          className="glass-panel card-hover group rounded-3xl p-7"
        >
          <p className="section-kicker">Glossary Index</p>
          <h2 className="mt-3 text-2xl text-amber-100">ดัชนีคำศัพท์</h2>
          <p className="mt-3 leading-7 text-slate-400">
            ค้นความหมาย ชื่อภาษาไทย ประเภท ต้นกำเนิด และคำที่เกี่ยวข้อง
          </p>
          <span className="mt-5 inline-flex text-sm text-amber-200 transition group-hover:translate-x-1">
            เปิดดัชนีคำศัพท์ →
          </span>
        </Link>

        <Link
          href="/sovereign-keys"
          className="glass-panel card-hover group rounded-3xl p-7"
        >
          <p className="section-kicker">The Eight Keys</p>
          <h2 className="mt-3 text-2xl text-amber-100">สารบบกุญแจราชันย์</h2>
          <p className="mt-3 leading-7 text-slate-400">
            สำรวจกุญแจทั้งแปด ผู้ถือครอง ตระกูล และเขตแดนอาคม
          </p>
          <span className="mt-5 inline-flex text-sm text-amber-200 transition group-hover:translate-x-1">
            เปิดสารบบกุญแจ →
          </span>
        </Link>
      </section>

      <div className="mt-10 flex flex-wrap gap-2" aria-label="หมวดคลังตำนาน">
        {categories.map((category) => (
          <span
            key={category}
            className="rounded-full border border-amber-200/15 bg-amber-200/5 px-4 py-2 text-xs uppercase tracking-[0.16em] text-amber-100"
          >
            {category}
          </span>
        ))}
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {lore.map((item, index) => (
          <Link
            key={item.slug}
            href={`/lore/${item.slug}`}
            className="glass-panel card-hover group rounded-3xl p-7"
          >
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                  Codex Entry {String(index + 1).padStart(2, "0")}
                </p>

                <h2 className="mt-3 text-2xl text-amber-100">{item.term}</h2>
                <p className="mt-1 text-sm text-slate-400">{item.thaiName}</p>
              </div>

              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-amber-200/25 bg-amber-200/5 text-xl text-amber-200">
                {item.symbol}
              </span>
            </div>

            <p className="mt-4 leading-8 text-slate-400">{item.meaning}</p>

            <span className="mt-5 inline-flex text-sm text-amber-200 transition group-hover:translate-x-1">
              เปิดข้อมูลฉบับเต็ม →
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { lore } from "@/data/forcadia";

export const metadata: Metadata = {
  title: "คลังตำนาน",
};

export default function LorePage() {
  return (
    <main className="container-page py-16 md:py-24">
      <p className="section-kicker">Imperial Codex</p>

      <h1 className="mt-4 text-4xl font-semibold md:text-6xl">
        คลังตำนานและคำศัพท์
      </h1>

      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
        บันทึกแนวคิด กฎ และสิ่งสำคัญที่กำหนดโครงสร้างของโลก Forcadia
      </p>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
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

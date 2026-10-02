import { PageHeader } from "@/components/page-header";
import type { Metadata } from "next";
import Link from "next/link";
import { getPublicLoreEntries } from "@/lib/public-content";

export const metadata: Metadata = {
  title: "คำศัพท์แห่ง Forcadia",
  description: "ดัชนีคำศัพท์ ตำนาน กฎ สิ่งประดิษฐ์ และเวทแห่ง Forcadia",
};

export const dynamic = "force-dynamic";

export default async function GlossaryPage() {
  const entries = await getPublicLoreEntries();

  return (
    <main className="container-page pb-16 md:pb-24">
      <Link href="/lore" className="mt-10 inline-flex text-sm text-[var(--gold)] transition hover:text-[var(--gold-soft)]">
        ← กลับไปคลังตำนาน
      </Link>

      <PageHeader
        kicker="Imperial Glossary"
        title={<>คำศัพท์แห่ง Forcadia</>}
        lede={<>ดัชนีชื่อและแนวคิดสำคัญ พร้อมคำแปล ประเภท และความหมายโดยย่อ</>}
      />

      <div className="mt-10 overflow-hidden rounded-xl border border-[var(--plate-edge)]">
        {entries.map((entry, index) => (
          <Link
            key={entry.slug}
            href={`/lore/${entry.slug}`}
            className="group grid gap-4 border-b border-white/8 p-6 transition last:border-b-0 hover:bg-amber-200/5 md:grid-cols-[3rem_1fr_1fr_auto] md:items-center"
          >
            <span className="text-sm text-slate-500">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h2 className="text-xl text-[var(--gold-soft)]">{entry.term}</h2>
              <p className="mt-1 text-sm text-slate-400">{entry.thaiName}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{entry.category}</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">{entry.meaning}</p>
            </div>
            <span className="text-sm text-[var(--gold)] transition group-hover:translate-x-1">เปิดคำศัพท์ →</span>
          </Link>
        ))}
      </div>
    </main>
  );
}

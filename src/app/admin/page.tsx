import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

export default async function AdminDashboardPage() {
  await requireAdmin();

  const [
    books,
    chapters,
    publishedChapters,
    characters,
    houses,
    cities,
    loreEntries,
  ] = await Promise.all([
    prisma.book.count(),
    prisma.chapter.count(),
    prisma.chapter.count({ where: { published: true } }),
    prisma.character.count(),
    prisma.house.count(),
    prisma.city.count(),
    prisma.loreEntry.count(),
  ]);

  const stats = [
    ["หนังสือ", books],
    ["ตอนทั้งหมด", chapters],
    ["ตอนเผยแพร่", publishedChapters],
    ["ตัวละคร", characters],
    ["ตระกูล", houses],
    ["เมือง", cities],
    ["คลังตำนาน", loreEntries],
  ];

  return (
    <>
      <p className="section-kicker">Phase 10</p>

      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-semibold md:text-5xl">
            Admin Dashboard
          </h1>

          <p className="mt-3 text-slate-400">
            จัดการข้อมูลจาก PostgreSQL ผ่าน Prisma
          </p>
        </div>

        <Link
          href="/admin/chapters"
          className="rounded-full border border-amber-200/30 bg-amber-200/10 px-5 py-3 text-sm font-semibold text-amber-100 transition hover:bg-amber-200/20"
        >
          จัดการตอนนิยาย
        </Link>
      </div>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(([label, value]) => (
          <article
            key={label}
            className="glass-panel rounded-3xl p-6"
          >
            <p className="text-sm text-slate-500">{label}</p>
            <p className="mt-3 text-4xl text-amber-100">{value}</p>
          </article>
        ))}
      </section>

      <section className="glass-panel mt-8 rounded-3xl p-6 md:p-8">
        <p className="section-kicker">Current Scope</p>

        <h2 className="mt-3 text-2xl font-semibold">
          ระบบจัดการตอนนิยาย
        </h2>

        <p className="mt-3 max-w-3xl leading-8 text-slate-400">
          Phase 10 ชุดแรกเปิดให้แก้ไขชื่อ ลำดับ POV บทคัดย่อ
          เนื้อหา และสถานะเผยแพร่ของแต่ละตอน
        </p>
      </section>
    </>
  );
}

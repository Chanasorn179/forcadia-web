import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

type Props = {
  searchParams: Promise<{
    created?: string;
    updated?: string;
    deleted?: string;
    error?: string;
  }>;
};

const statusLabels = {
  DRAFT: "ฉบับร่าง",
  ONGOING: "กำลังเผยแพร่",
  COMPLETED: "จบแล้ว",
} as const;

export default async function AdminBooksPage({
  searchParams,
}: Props) {
  await requireAdmin();

  const query = await searchParams;

  const books = await prisma.book.findMany({
    orderBy: {
      order: "asc",
    },
    include: {
      _count: {
        select: {
          chapters: true,
        },
      },
    },
  });

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="section-kicker">Book Management</p>

          <h1 className="mt-3 text-4xl font-semibold">
            จัดการหนังสือ
          </h1>

          <p className="mt-3 text-slate-400">
            เพิ่ม แก้ไขสถานะ เรียงลำดับ และจัดการข้อมูลหนังสือ
          </p>
        </div>

        <Link
          href="/admin/books/new"
          className="rounded-full border border-amber-200/30 bg-amber-200/10 px-5 py-3 text-sm font-semibold text-amber-100 transition hover:bg-amber-200/20"
        >
          + เพิ่มหนังสือ
        </Link>
      </div>

      {(query.created || query.updated || query.deleted) && (
        <div className="mt-6 rounded-2xl border border-emerald-300/20 bg-emerald-300/5 p-4 text-emerald-200">
          บันทึกข้อมูลเรียบร้อยแล้ว
        </div>
      )}

      {query.error && (
        <div className="mt-6 rounded-2xl border border-rose-300/20 bg-rose-300/5 p-4 text-rose-200">
          ไม่สามารถทำรายการได้
        </div>
      )}

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {books.map((book) => (
          <article
            key={book.id}
            className="glass-panel rounded-3xl p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                  Book {String(book.order).padStart(2, "0")}
                </p>

                <h2 className="mt-3 text-2xl text-amber-100">
                  {book.title}
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  {book.thaiTitle}
                </p>
              </div>

              <span className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300">
                {statusLabels[book.status]}
              </span>
            </div>

            <p className="mt-4 line-clamp-3 leading-7 text-slate-400">
              {book.description}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <span className="text-sm text-slate-500">
                {book._count.chapters} ตอน
              </span>

              <Link
                href={`/admin/books/${book.id}`}
                className="text-sm text-amber-200 transition hover:text-amber-100"
              >
                แก้ไข →
              </Link>
            </div>
          </article>
        ))}
      </div>

      {books.length === 0 && (
        <div className="mt-8 rounded-3xl border border-dashed border-white/10 p-10 text-center text-slate-500">
          ยังไม่มีหนังสือในฐานข้อมูล
        </div>
      )}
    </>
  );
}

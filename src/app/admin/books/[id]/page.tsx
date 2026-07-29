import Link from "next/link";
import { notFound } from "next/navigation";
import { DeleteBookForm } from "@/components/admin/delete-book-form";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    saved?: string;
    error?: string;
  }>;
};

export default async function EditBookPage({
  params,
  searchParams,
}: Props) {
  await requireAdmin();

  const { id } = await params;
  const query = await searchParams;

  const book = await prisma.book.findUnique({
    where: {
      id,
    },
    include: {
      _count: {
        select: {
          chapters: true,
        },
      },
    },
  });

  if (!book) {
    notFound();
  }

  return (
    <>
      <Link
        href="/admin/books"
        className="text-sm text-amber-200 transition hover:text-amber-100"
      >
        ← กลับไปรายการหนังสือ
      </Link>

      <p className="section-kicker mt-8">Edit Book</p>

      <h1 className="mt-3 text-4xl font-semibold">
        {book.title}
      </h1>

      {query.saved && (
        <div className="mt-6 rounded-2xl border border-emerald-300/20 bg-emerald-300/5 p-4 text-emerald-200">
          บันทึกข้อมูลเรียบร้อยแล้ว
        </div>
      )}

      {query.error && (
        <div className="mt-6 rounded-2xl border border-rose-300/20 bg-rose-300/5 p-4 text-rose-200">
          ไม่สามารถบันทึกข้อมูลได้
        </div>
      )}

      <form
        action={`/admin/api/books/${book.id}`}
        method="post"
        className="glass-panel mt-8 grid gap-6 rounded-3xl p-6 md:p-8"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm text-slate-400">
              ชื่อภาษาอังกฤษ
            </span>
            <input
              name="title"
              defaultValue={book.title}
              required
              className="min-h-12 rounded-2xl border border-white/10 bg-black/20 px-4 text-slate-100 outline-none focus:border-amber-200/40"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm text-slate-400">
              ชื่อภาษาไทย
            </span>
            <input
              name="thaiTitle"
              defaultValue={book.thaiTitle}
              required
              className="min-h-12 rounded-2xl border border-white/10 bg-black/20 px-4 text-slate-100 outline-none focus:border-amber-200/40"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm text-slate-400">
              Subtitle
            </span>
            <input
              name="subtitle"
              defaultValue={book.subtitle}
              required
              className="min-h-12 rounded-2xl border border-white/10 bg-black/20 px-4 text-slate-100 outline-none focus:border-amber-200/40"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm text-slate-400">Slug</span>
            <input
              name="slug"
              defaultValue={book.slug}
              required
              className="min-h-12 rounded-2xl border border-white/10 bg-black/20 px-4 text-slate-100 outline-none focus:border-amber-200/40"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm text-slate-400">ลำดับเล่ม</span>
            <input
              name="order"
              type="number"
              min="1"
              defaultValue={book.order}
              required
              className="min-h-12 rounded-2xl border border-white/10 bg-black/20 px-4 text-slate-100 outline-none focus:border-amber-200/40"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm text-slate-400">สถานะ</span>
            <select
              name="status"
              defaultValue={book.status}
              className="min-h-12 rounded-2xl border border-white/10 bg-[#0d101b] px-4 text-slate-100 outline-none focus:border-amber-200/40"
            >
              <option value="DRAFT">ฉบับร่าง</option>
              <option value="ONGOING">กำลังเผยแพร่</option>
              <option value="COMPLETED">จบแล้ว</option>
            </select>
          </label>
        </div>

        <label className="grid gap-2">
          <span className="text-sm text-slate-400">
            พาธภาพปก
          </span>
          <input
            name="cover"
            defaultValue={book.cover ?? ""}
            className="min-h-12 rounded-2xl border border-white/10 bg-black/20 px-4 text-slate-100 outline-none focus:border-amber-200/40"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm text-slate-400">คำอธิบาย</span>
          <textarea
            name="description"
            rows={7}
            defaultValue={book.description}
            required
            className="rounded-2xl border border-white/10 bg-black/20 p-4 leading-7 text-slate-100 outline-none focus:border-amber-200/40"
          />
        </label>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            className="rounded-full border border-amber-200/30 bg-amber-200/10 px-6 py-3 font-semibold text-amber-100 transition hover:bg-amber-200/20"
          >
            บันทึกการแก้ไข
          </button>

          <Link
            href={`/books/${book.slug}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/10 px-6 py-3 text-slate-300 transition hover:bg-white/5"
          >
            เปิดหน้าหนังสือ
          </Link>
        </div>
      </form>

      <DeleteBookForm
        bookId={book.id}
        bookTitle={book.title}
        chapterCount={book._count.chapters}
      />
    </>
  );
}

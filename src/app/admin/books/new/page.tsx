import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

type Props = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function NewBookPage({
  searchParams,
}: Props) {
  await requireAdmin();

  const query = await searchParams;

  const lastBook = await prisma.book.findFirst({
    orderBy: {
      order: "desc",
    },
    select: {
      order: true,
    },
  });

  const suggestedOrder = (lastBook?.order ?? 0) + 1;

  return (
    <>
      <Link
        href="/admin/books"
        className="text-sm text-amber-200 transition hover:text-amber-100"
      >
        ← กลับไปรายการหนังสือ
      </Link>

      <p className="section-kicker mt-8">Create Book</p>

      <h1 className="mt-3 text-4xl font-semibold">
        เพิ่มหนังสือใหม่
      </h1>

      {query.error && (
        <div className="mt-6 rounded-2xl border border-rose-300/20 bg-rose-300/5 p-4 text-rose-200">
          ข้อมูลไม่ถูกต้อง หรือ slug ถูกใช้งานแล้ว
        </div>
      )}

      <form
        action="/admin/api/books"
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
              required
              placeholder="Book II: ..."
              className="min-h-12 rounded-2xl border border-white/10 bg-black/20 px-4 text-slate-100 outline-none focus:border-amber-200/40"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm text-slate-400">
              ชื่อภาษาไทย
            </span>
            <input
              name="thaiTitle"
              required
              placeholder="เล่มที่ 2 ..."
              className="min-h-12 rounded-2xl border border-white/10 bg-black/20 px-4 text-slate-100 outline-none focus:border-amber-200/40"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm text-slate-400">
              Subtitle
            </span>
            <input
              name="subtitle"
              required
              defaultValue="Forcadia: The Shattered Ring"
              className="min-h-12 rounded-2xl border border-white/10 bg-black/20 px-4 text-slate-100 outline-none focus:border-amber-200/40"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm text-slate-400">Slug</span>
            <input
              name="slug"
              placeholder="เว้นว่างเพื่อสร้างจากชื่อ"
              className="min-h-12 rounded-2xl border border-white/10 bg-black/20 px-4 text-slate-100 outline-none focus:border-amber-200/40"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm text-slate-400">ลำดับเล่ม</span>
            <input
              name="order"
              type="number"
              min="1"
              defaultValue={suggestedOrder}
              required
              className="min-h-12 rounded-2xl border border-white/10 bg-black/20 px-4 text-slate-100 outline-none focus:border-amber-200/40"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm text-slate-400">สถานะ</span>
            <select
              name="status"
              defaultValue="DRAFT"
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
            placeholder="/images/books/book-2.webp"
            className="min-h-12 rounded-2xl border border-white/10 bg-black/20 px-4 text-slate-100 outline-none focus:border-amber-200/40"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm text-slate-400">คำอธิบาย</span>
          <textarea
            name="description"
            rows={7}
            required
            className="rounded-2xl border border-white/10 bg-black/20 p-4 leading-7 text-slate-100 outline-none focus:border-amber-200/40"
          />
        </label>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            className="rounded-full border border-amber-200/30 bg-amber-200/10 px-6 py-3 font-semibold text-amber-100 transition hover:bg-amber-200/20"
          >
            สร้างหนังสือ
          </button>

          <Link
            href="/admin/books"
            className="rounded-full border border-white/10 px-6 py-3 text-slate-300 transition hover:bg-white/5"
          >
            ยกเลิก
          </Link>
        </div>
      </form>
    </>
  );
}

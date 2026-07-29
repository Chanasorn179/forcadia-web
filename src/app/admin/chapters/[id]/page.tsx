import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { DeleteChapterForm } from "@/components/admin/delete-chapter-form";

type Props = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    saved?: string;
    error?: string;
  }>;
};

export default async function EditChapterPage({
  params,
  searchParams,
}: Props) {
  await requireAdmin();

  const { id } = await params;
  const query = await searchParams;

  const chapter = await prisma.chapter.findUnique({
    where: { id },
    include: {
      book: {
        select: {
          title: true,
        },
      },
    },
  });

  if (!chapter) {
    notFound();
  }

  const content = Array.isArray(chapter.content)
    ? chapter.content.filter(
        (item): item is string => typeof item === "string",
      )
    : [];

  return (
    <>
      <Link
        href="/admin/chapters"
        className="text-sm text-amber-200 transition hover:text-amber-100"
      >
        ← กลับไปรายการตอน
      </Link>

      <p className="section-kicker mt-8">Edit Chapter</p>

      <h1 className="mt-3 text-4xl font-semibold">{chapter.title}</h1>

      <p className="mt-2 text-slate-500">{chapter.book.title}</p>

      {query.saved && (
        <div className="mt-6 rounded-2xl border border-emerald-300/20 bg-emerald-300/5 p-4 text-emerald-200">
          บันทึกข้อมูลเรียบร้อยแล้ว
        </div>
      )}

      {query.error && (
        <div className="mt-6 rounded-2xl border border-rose-300/20 bg-rose-300/5 p-4 text-rose-200">
          ไม่สามารถบันทึกข้อมูลได้ กรุณาตรวจข้อมูลอีกครั้ง
        </div>
      )}

      <form
        action={`/admin/api/chapters/${chapter.id}`}
        method="post"
        className="glass-panel mt-8 grid gap-6 rounded-3xl p-6 md:p-8"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm text-slate-400">ชื่อตอน</span>
            <input
              name="title"
              defaultValue={chapter.title}
              required
              className="min-h-12 rounded-2xl border border-white/10 bg-black/20 px-4 text-slate-100 outline-none focus:border-amber-200/40"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm text-slate-400">Order text</span>
            <input
              name="orderText"
              defaultValue={chapter.orderText}
              required
              className="min-h-12 rounded-2xl border border-white/10 bg-black/20 px-4 text-slate-100 outline-none focus:border-amber-200/40"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm text-slate-400">POV</span>
            <input
              name="pov"
              defaultValue={chapter.pov}
              required
              className="min-h-12 rounded-2xl border border-white/10 bg-black/20 px-4 text-slate-100 outline-none focus:border-amber-200/40"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm text-slate-400">ลำดับตัวเลข</span>
            <input
              name="sortOrder"
              type="number"
              min="1"
              defaultValue={chapter.sortOrder}
              required
              className="min-h-12 rounded-2xl border border-white/10 bg-black/20 px-4 text-slate-100 outline-none focus:border-amber-200/40"
            />
          </label>
        </div>

        <label className="grid gap-2">
          <span className="text-sm text-slate-400">บทคัดย่อ</span>
          <textarea
            name="excerpt"
            defaultValue={chapter.excerpt}
            rows={4}
            required
            className="rounded-2xl border border-white/10 bg-black/20 p-4 leading-7 text-slate-100 outline-none focus:border-amber-200/40"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm text-slate-400">
            เนื้อหา — คั่นแต่ละย่อหน้าด้วยบรรทัดว่าง
          </span>
          <textarea
            name="content"
            defaultValue={content.join("\n\n")}
            rows={22}
            required
            className="rounded-2xl border border-white/10 bg-black/20 p-4 font-serif leading-8 text-slate-100 outline-none focus:border-amber-200/40"
          />
        </label>

        <label className="flex items-center gap-3 rounded-2xl border border-white/10 p-4">
          <input
            name="published"
            type="checkbox"
            defaultChecked={chapter.published}
            className="h-5 w-5 accent-amber-300"
          />

          <span className="text-slate-300">เผยแพร่ตอนนี้</span>
        </label>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            className="rounded-full border border-amber-200/30 bg-amber-200/10 px-6 py-3 font-semibold text-amber-100 transition hover:bg-amber-200/20"
          >
            บันทึกการแก้ไข
          </button>

          <Link
            href={`/read/${chapter.slug}`}
            target="_blank"
            className="rounded-full border border-white/10 px-6 py-3 text-slate-300 transition hover:bg-white/5"
          >
            เปิดหน้าตอน
          </Link>

          <Link
            href={`/admin/chapters/${chapter.id}/preview`}
            className="rounded-full border border-white/10 px-6 py-3 text-slate-300 transition hover:bg-white/5"
          >
            Preview
          </Link>
        </div>
      </form>

      <DeleteChapterForm chapterId={chapter.id} chapterTitle={chapter.title} />
    </>
  );
}

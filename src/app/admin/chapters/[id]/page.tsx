import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { DeleteChapterForm } from "@/components/admin/delete-chapter-form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FlashToast } from "@/components/admin/flash-toast";

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
        กลับไปรายการตอน
      </Link>

      <h1 className="mt-3 text-4xl font-semibold">{chapter.title}</h1>

      <p className="mt-2 text-slate-500">{chapter.book.title}</p>

      {query.saved && (
        <FlashToast message="บันทึกข้อมูลเรียบร้อยแล้ว" />
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
            <Input
              name="title"
              defaultValue={chapter.title}
              required
              
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm text-slate-400">Order text</span>
            <Input
              name="orderText"
              defaultValue={chapter.orderText}
              required
              
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm text-slate-400">POV</span>
            <Input
              name="pov"
              defaultValue={chapter.pov}
              required
              
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm text-slate-400">ลำดับตัวเลข</span>
            <Input
              name="sortOrder"
              type="number"
              min="1"
              defaultValue={chapter.sortOrder}
              required
              
            />
          </label>
        </div>

        <label className="grid gap-2">
          <span className="text-sm text-slate-400">บทคัดย่อ</span>
          <Textarea
            name="excerpt"
            defaultValue={chapter.excerpt}
            rows={4}
            required
            
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm text-slate-400">
            เนื้อหา — คั่นแต่ละย่อหน้าด้วยบรรทัดว่าง
          </span>
          <Textarea
            name="content"
            defaultValue={content.join("\n\n")}
            rows={22}
            required
            className="font-serif leading-8"
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
          <Button
            type="submit"
            
          >
            บันทึกการแก้ไข
          </Button>

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

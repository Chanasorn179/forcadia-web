import Link from "next/link";
import { notFound } from "next/navigation";
import { DeleteBookForm } from "@/components/admin/delete-book-form";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
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
        กลับไปรายการหนังสือ
      </Link>

      <h1 className="mt-3 text-4xl font-semibold">
        {book.title}
      </h1>

      {query.saved && (
        <FlashToast message="บันทึกข้อมูลเรียบร้อยแล้ว" />
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
            <Input
              name="title"
              defaultValue={book.title}
              required
              
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm text-slate-400">
              ชื่อภาษาไทย
            </span>
            <Input
              name="thaiTitle"
              defaultValue={book.thaiTitle}
              required
              
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm text-slate-400">
              Subtitle
            </span>
            <Input
              name="subtitle"
              defaultValue={book.subtitle}
              required
              
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm text-slate-400">Slug</span>
            <Input
              name="slug"
              defaultValue={book.slug}
              required
              
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm text-slate-400">ลำดับเล่ม</span>
            <Input
              name="order"
              type="number"
              min="1"
              defaultValue={book.order}
              required
              
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm text-slate-400">สถานะ</span>
            <select
              name="status"
              defaultValue={book.status}
              className="native-select"
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
          <Input
            name="cover"
            defaultValue={book.cover ?? ""}
            
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm text-slate-400">คำอธิบาย</span>
          <Textarea
            name="description"
            rows={7}
            defaultValue={book.description}
            required
            
          />
        </label>

        <div className="flex flex-wrap gap-3">
          <Button
            type="submit"
            
          >
            บันทึกการแก้ไข
          </Button>

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

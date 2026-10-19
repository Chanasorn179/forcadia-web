import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
        กลับไปรายการหนังสือ
      </Link>

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
            <Input
              name="title"
              required
              placeholder="Book II: ..."
              
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm text-slate-400">
              ชื่อภาษาไทย
            </span>
            <Input
              name="thaiTitle"
              required
              placeholder="เล่มที่ 2 ..."
              
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm text-slate-400">
              Subtitle
            </span>
            <Input
              name="subtitle"
              required
              defaultValue="Forcadia: The Shattered Ring"
              
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm text-slate-400">Slug</span>
            <Input
              name="slug"
              placeholder="เว้นว่างเพื่อสร้างจากชื่อ"
              
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm text-slate-400">ลำดับเล่ม</span>
            <Input
              name="order"
              type="number"
              min="1"
              defaultValue={suggestedOrder}
              required
              
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm text-slate-400">สถานะ</span>
            <select
              name="status"
              defaultValue="DRAFT"
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
            placeholder="/images/books/book-2.webp"
            
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm text-slate-400">คำอธิบาย</span>
          <Textarea
            name="description"
            rows={7}
            required
            
          />
        </label>

        <div className="flex flex-wrap gap-3">
          <Button
            type="submit"
            
          >
            สร้างหนังสือ
          </Button>

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

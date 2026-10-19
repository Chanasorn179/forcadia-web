import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function NewChapterPage({
  searchParams,
}: Props) {
  await requireAdmin();

  const query = await searchParams;

  const books = await prisma.book.findMany({
    orderBy: {
      order: "asc",
    },
    select: {
      id: true,
      title: true,
      thaiTitle: true,
    },
  });

  const lastChapter = await prisma.chapter.findFirst({
    orderBy: {
      sortOrder: "desc",
    },
    select: {
      sortOrder: true,
    },
  });

  const suggestedOrder = (lastChapter?.sortOrder ?? 0) + 1;

  return (
    <>
      <Link
        href="/admin/chapters"
        className="text-sm text-amber-200 transition hover:text-amber-100"
      >
        กลับไปรายการตอน
      </Link>

      <h1 className="mt-3 text-4xl font-semibold">
        เพิ่มตอนใหม่
      </h1>

      <p className="mt-3 text-slate-400">
        ระบบจะสร้างตอนเป็นฉบับร่าง เว้นแต่เลือกเผยแพร่ทันที
      </p>

      {query.error && (
        <div className="mt-6 rounded-2xl border border-rose-300/20 bg-rose-300/5 p-4 text-rose-200">
          ข้อมูลไม่ถูกต้อง หรือ slug ถูกใช้งานแล้ว
        </div>
      )}

      {books.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-dashed border-white/10 p-10 text-center">
          <p className="text-slate-300">
            ยังไม่มีหนังสือในฐานข้อมูล
          </p>
          <p className="mt-2 text-sm text-slate-500">
            ต้องเพิ่มหนังสือก่อนจึงจะเพิ่มตอนใหม่ได้
          </p>
        </div>
      ) : (
        <form
          action="/admin/api/chapters"
          method="post"
          className="glass-panel mt-8 grid gap-6 rounded-3xl p-6 md:p-8"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm text-slate-400">หนังสือ</span>
              <select
                name="bookId"
                required
                className="native-select"
              >
                {books.map((book) => (
                  <option key={book.id} value={book.id}>
                    {book.title} — {book.thaiTitle}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2">
              <span className="text-sm text-slate-400">ลำดับตัวเลข</span>
              <Input
                name="sortOrder"
                type="number"
                min="1"
                defaultValue={suggestedOrder}
                required
                
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm text-slate-400">ชื่อตอน</span>
              <Input
                name="title"
                required
                placeholder="The Crown Beyond Silence"
                
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm text-slate-400">
                Slug
              </span>
              <Input
                name="slug"
                placeholder="เว้นว่างเพื่อสร้างจากชื่อตอน"
                
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm text-slate-400">Order text</span>
              <Input
                name="orderText"
                required
                placeholder="Chapter IV"
                
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm text-slate-400">POV</span>
              <Input
                name="pov"
                required
                placeholder="Astraea ParadiseSwan"
                
              />
            </label>
          </div>

          <label className="grid gap-2">
            <span className="text-sm text-slate-400">บทคัดย่อ</span>
            <Textarea
              name="excerpt"
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
              rows={22}
              required
              className="font-serif leading-8"
            />
          </label>

          <label className="flex items-center gap-3 rounded-2xl border border-white/10 p-4">
            <input
              name="published"
              type="checkbox"
              className="h-5 w-5 accent-amber-300"
            />

            <span className="text-slate-300">
              เผยแพร่ทันที
            </span>
          </label>

          <div className="flex flex-wrap gap-3">
            <Button
              type="submit"
              
            >
              สร้างตอนใหม่
            </Button>

            <Link
              href="/admin/chapters"
              className="rounded-full border border-white/10 px-6 py-3 text-slate-300 transition hover:bg-white/5"
            >
              ยกเลิก
            </Link>
          </div>
        </form>
      )}
    </>
  );
}

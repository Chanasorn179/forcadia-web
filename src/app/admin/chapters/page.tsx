import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

export default async function AdminChaptersPage() {
  await requireAdmin();

  const chapters = await prisma.chapter.findMany({
    orderBy: [
      { book: { order: "asc" } },
      { sortOrder: "asc" },
    ],
    include: {
      book: {
        select: {
          title: true,
        },
      },
    },
  });

  return (
    <>
      <p className="section-kicker">Content Management</p>

      <h1 className="mt-3 text-4xl font-semibold">
        จัดการตอนนิยาย
      </h1>

      <p className="mt-3 text-slate-400">
        แก้ไขข้อมูลและสถานะเผยแพร่ของตอนในฐานข้อมูล
      </p>

      <div className="mt-8 overflow-hidden rounded-3xl border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead className="bg-white/5 text-xs uppercase tracking-[0.16em] text-slate-500">
              <tr>
                <th className="px-5 py-4">ลำดับ</th>
                <th className="px-5 py-4">ชื่อตอน</th>
                <th className="px-5 py-4">หนังสือ</th>
                <th className="px-5 py-4">POV</th>
                <th className="px-5 py-4">สถานะ</th>
                <th className="px-5 py-4 text-right">จัดการ</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/10">
              {chapters.map((chapter) => (
                <tr key={chapter.id} className="bg-black/10">
                  <td className="px-5 py-4 text-slate-400">
                    {chapter.orderText}
                  </td>

                  <td className="px-5 py-4 text-amber-100">
                    {chapter.title}
                  </td>

                  <td className="px-5 py-4 text-slate-400">
                    {chapter.book.title}
                  </td>

                  <td className="px-5 py-4 text-slate-400">
                    {chapter.pov}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={[
                        "rounded-full border px-3 py-1 text-xs",
                        chapter.published
                          ? "border-emerald-300/20 bg-emerald-300/5 text-emerald-200"
                          : "border-slate-300/15 bg-white/5 text-slate-400",
                      ].join(" ")}
                    >
                      {chapter.published ? "เผยแพร่" : "ฉบับร่าง"}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/admin/chapters/${chapter.id}`}
                      className="text-sm text-amber-200 transition hover:text-amber-100"
                    >
                      แก้ไข →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {chapters.length === 0 && (
          <div className="p-10 text-center text-slate-500">
            ยังไม่มีตอนในฐานข้อมูล ให้รัน Prisma seed ก่อน
          </div>
        )}
      </div>
    </>
  );
}

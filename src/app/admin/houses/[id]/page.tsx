import Link from "next/link";
import { notFound } from "next/navigation";
import { DeleteHouseForm } from "@/components/admin/delete-house-form";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    saved?: string;
    error?: string;
  }>;
};

export default async function EditHousePage({
  params,
  searchParams,
}: Props) {
  await requireAdmin();

  const { id } = await params;
  const query = await searchParams;

  const house = await prisma.house.findUnique({
    where: { id },
    include: {
      ruler: true,
      city: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!house) {
    notFound();
  }

  const availableRulers = await prisma.character.findMany({
    where: {
      OR: [
        { id: house.rulerId },
        { house: null },
      ],
    },
    orderBy: {
      name: "asc",
    },
    select: {
      id: true,
      name: true,
      thaiName: true,
    },
  });

  return (
    <>
      <Link
        href="/admin/houses"
        className="text-sm text-amber-200 transition hover:text-amber-100"
      >
        ← กลับไปรายการตระกูล
      </Link>

      <p className="section-kicker mt-8">Edit House</p>
      <h1 className="mt-3 text-4xl font-semibold">
        {house.name}
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
        action={`/admin/api/houses/${house.id}`}
        method="post"
        className="glass-panel mt-8 grid gap-6 rounded-3xl p-6 md:p-8"
      >
        <div className="grid gap-5 md:grid-cols-2">
          {[
            ["name", "ชื่อภาษาอังกฤษ", house.name],
            ["thaiName", "ชื่อภาษาไทย", house.thaiName],
            ["slug", "Slug", house.slug],
            ["emblem", "พาธตราตระกูล", house.emblem],
            ["emblemName", "ชื่อตรา", house.emblemName],
            ["motto", "คำขวัญ", house.motto],
            ["keyName", "Sovereign Key", house.keyName],
            ["domain", "Domain", house.domain],
            ["accent", "Accent สี HEX", house.accent],
          ].map(([name, label, value]) => (
            <label key={name} className="grid gap-2">
              <span className="text-sm text-slate-400">{label}</span>
              <input
                name={name}
                defaultValue={value}
                required
                className="min-h-12 rounded-2xl border border-white/10 bg-black/20 px-4 text-slate-100 outline-none focus:border-amber-200/40"
              />
            </label>
          ))}

          <label className="grid gap-2">
            <span className="text-sm text-slate-400">ผู้ปกครอง</span>
            <select
              name="rulerId"
              defaultValue={house.rulerId}
              required
              className="min-h-12 rounded-2xl border border-white/10 bg-[#0d101b] px-4 text-slate-100 outline-none focus:border-amber-200/40"
            >
              {availableRulers.map((ruler) => (
                <option key={ruler.id} value={ruler.id}>
                  {ruler.name} — {ruler.thaiName}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="grid gap-2">
          <span className="text-sm text-slate-400">คำอธิบาย</span>
          <textarea
            name="description"
            rows={7}
            defaultValue={house.description}
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
            href={`/houses/${house.slug}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/10 px-6 py-3 text-slate-300 transition hover:bg-white/5"
          >
            เปิดหน้าตระกูล
          </Link>
        </div>
      </form>

      <DeleteHouseForm
        houseId={house.id}
        houseName={house.name}
        cityName={house.city?.name}
      />
    </>
  );
}

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

type FieldProps = {
  name: string;
  label: string;
  defaultValue?: string | number | null;
  required?: boolean;
  multiline?: boolean;
};

function Field({ name, label, defaultValue, required, multiline }: FieldProps) {
  const className = "min-h-12 rounded-2xl border border-white/10 bg-black/20 px-4 text-slate-100 outline-none focus:border-amber-200/40";

  return (
    <label className="grid gap-2 text-sm text-slate-400">
      {label}
      {multiline ? (
        <textarea name={name} defaultValue={String(defaultValue ?? "")} required={required} rows={4} className={`${className} p-4`} />
      ) : (
        <input name={name} defaultValue={String(defaultValue ?? "")} required={required} className={className} />
      )}
    </label>
  );
}

function SubmitRow({ isExisting = false }: { isExisting?: boolean }) {
  return (
    <div className="flex flex-wrap gap-3">
      <button className="min-h-11 rounded-full border border-amber-200/30 bg-amber-200/10 px-5 text-sm font-semibold text-amber-100">
        {isExisting ? "บันทึกการแก้ไข" : "สร้างรายการ"}
      </button>
      {isExisting && (
        <button name="_action" value="delete" className="min-h-11 rounded-full border border-rose-300/25 px-5 text-sm text-rose-200">
          ลบรายการ
        </button>
      )}
    </div>
  );
}

export default async function AdminContentPage() {
  await requireAdmin();
  const [cities, eras, loreEntries, houses] = await Promise.all([
    prisma.city.findMany({ orderBy: { name: "asc" } }),
    prisma.era.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.loreEntry.findMany({ orderBy: { term: "asc" } }),
    prisma.house.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
  ]);

  return (
    <>
      <p className="section-kicker">World Content</p>
      <h1 className="mt-3 text-4xl font-semibold md:text-5xl">เมือง ศักราช และคลังตำนาน</h1>
      <p className="mt-3 text-slate-400">ข้อมูลที่บันทึกที่นี่จะแสดงในหน้า public และระบบค้นหาทันที</p>

      <div className="mt-8 space-y-10">
        <section className="glass-panel rounded-3xl p-6">
          <h2 className="text-2xl">เมือง ({cities.length})</h2>
          <details className="mt-5 rounded-2xl border border-amber-200/20 p-5">
            <summary className="cursor-pointer text-amber-100">เพิ่มเมืองใหม่</summary>
            <form action="/admin/api/content/city" method="post" className="mt-5 grid gap-4 md:grid-cols-2">
              <Field name="slug" label="Slug" required /><Field name="name" label="ชื่ออังกฤษ" required />
              <Field name="thaiName" label="ชื่อไทย" required /><Field name="title" label="ฉายา" required />
              <Field name="accent" label="Accent HEX" defaultValue="#d9b86c" required /><Field name="symbol" label="สัญลักษณ์" defaultValue="✦" required />
              <Field name="landmark" label="สถานที่สำคัญ" required /><Field name="emblem" label="พาธรูปตรา" />
              <label className="grid gap-2 text-sm text-slate-400">ตระกูล<select name="houseId" className="min-h-12 rounded-2xl border border-white/10 bg-[#0d101b] px-4"><option value="">ไม่ระบุ</option>{houses.map((house) => <option key={house.id} value={house.id}>{house.name}</option>)}</select></label>
              <div />
              <Field name="description" label="คำอธิบาย" required multiline /><Field name="atmosphere" label="บรรยากาศ" required multiline />
              <Field name="architecture" label="สถาปัตยกรรม" required multiline /><div className="self-end"><SubmitRow /></div>
            </form>
          </details>
          <div className="mt-5 space-y-3">{cities.map((city) => (
            <details key={city.id} className="rounded-2xl border border-white/10 p-5">
              <summary className="cursor-pointer text-amber-100">{city.name} · {city.thaiName}</summary>
              <form action={`/admin/api/content/city/${city.id}`} method="post" className="mt-5 grid gap-4 md:grid-cols-2">
                <Field name="slug" label="Slug" defaultValue={city.slug} required /><Field name="name" label="ชื่ออังกฤษ" defaultValue={city.name} required />
                <Field name="thaiName" label="ชื่อไทย" defaultValue={city.thaiName} required /><Field name="title" label="ฉายา" defaultValue={city.title} required />
                <Field name="accent" label="Accent HEX" defaultValue={city.accent} required /><Field name="symbol" label="สัญลักษณ์" defaultValue={city.symbol} required />
                <Field name="landmark" label="สถานที่สำคัญ" defaultValue={city.landmark} required /><Field name="emblem" label="พาธรูปตรา" defaultValue={city.emblem} />
                <Field name="description" label="คำอธิบาย" defaultValue={city.description} required multiline /><Field name="atmosphere" label="บรรยากาศ" defaultValue={city.atmosphere} required multiline />
                <Field name="architecture" label="สถาปัตยกรรม" defaultValue={city.architecture} required multiline /><div className="self-end"><SubmitRow isExisting /></div>
              </form>
            </details>
          ))}</div>
        </section>

        <section className="glass-panel rounded-3xl p-6">
          <h2 className="text-2xl">ศักราช ({eras.length})</h2>
          {[{ id: "new", slug: "", name: "", thaiName: "", ruler: "", detail: "", description: "", legacy: "", sortOrder: eras.length + 1 }, ...eras].map((era) => {
            const isExisting = era.id !== "new";
            return <details key={era.id} className="mt-4 rounded-2xl border border-white/10 p-5"><summary className="cursor-pointer text-amber-100">{isExisting ? era.name : "เพิ่มศักราชใหม่"}</summary><form action={isExisting ? `/admin/api/content/era/${era.id}` : "/admin/api/content/era"} method="post" className="mt-5 grid gap-4 md:grid-cols-2"><Field name="slug" label="Slug" defaultValue={era.slug} required /><Field name="name" label="ชื่อ" defaultValue={era.name} required /><Field name="thaiName" label="ชื่อไทย" defaultValue={era.thaiName} /><Field name="ruler" label="ผู้ปกครอง" defaultValue={era.ruler} /><Field name="sortOrder" label="ลำดับ" defaultValue={era.sortOrder} required /><div /><Field name="detail" label="ข้อความย่อ" defaultValue={era.detail} required multiline /><Field name="description" label="คำอธิบาย" defaultValue={era.description} multiline /><Field name="legacy" label="มรดก" defaultValue={era.legacy} multiline /><div className="self-end"><SubmitRow isExisting={isExisting} /></div></form></details>;
          })}
        </section>

        <section className="glass-panel rounded-3xl p-6">
          <h2 className="text-2xl">คลังตำนาน ({loreEntries.length})</h2>
          {[{ id: "new", slug: "", term: "", thaiName: "", category: "", meaning: "", description: "", origin: "", significance: "" }, ...loreEntries].map((entry) => {
            const isExisting = entry.id !== "new";
            return <details key={entry.id} className="mt-4 rounded-2xl border border-white/10 p-5"><summary className="cursor-pointer text-amber-100">{isExisting ? entry.term : "เพิ่มตำนานใหม่"}</summary><form action={isExisting ? `/admin/api/content/lore/${entry.id}` : "/admin/api/content/lore"} method="post" className="mt-5 grid gap-4 md:grid-cols-2"><Field name="slug" label="Slug" defaultValue={entry.slug} required /><Field name="term" label="คำศัพท์" defaultValue={entry.term} required /><Field name="thaiName" label="ชื่อไทย" defaultValue={entry.thaiName} /><Field name="category" label="หมวดหมู่" defaultValue={entry.category} /><Field name="meaning" label="ความหมาย" defaultValue={entry.meaning} required multiline /><Field name="description" label="รายละเอียด" defaultValue={entry.description} multiline /><Field name="origin" label="ต้นกำเนิด" defaultValue={entry.origin} multiline /><Field name="significance" label="ความสำคัญ" defaultValue={entry.significance} multiline /><div className="md:col-span-2"><SubmitRow isExisting={isExisting} /></div></form></details>;
          })}
        </section>
      </div>
      <Link href="/admin" className="mt-8 inline-flex min-h-11 items-center text-amber-200">← กลับ Dashboard</Link>
    </>
  );
}

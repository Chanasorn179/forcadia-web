import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";

type Props = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function NewCharacterPage({
  searchParams,
}: Props) {
  await requireAdmin();
  const query = await searchParams;

  return (
    <>
      <Link
        href="/admin/characters"
        className="text-sm text-amber-200 transition hover:text-amber-100"
      >
        ← กลับไปรายการตัวละคร
      </Link>

      <p className="section-kicker mt-8">Create Character</p>
      <h1 className="mt-3 text-4xl font-semibold">
        เพิ่มตัวละครใหม่
      </h1>

      {query.error && (
        <div className="mt-6 rounded-2xl border border-rose-300/20 bg-rose-300/5 p-4 text-rose-200">
          ข้อมูลไม่ถูกต้อง หรือ slug ถูกใช้งานแล้ว
        </div>
      )}

      <CharacterForm action="/admin/api/characters" />
    </>
  );
}

function CharacterForm({ action }: { action: string }) {
  return (
    <form
      action={action}
      method="post"
      className="glass-panel mt-8 grid gap-6 rounded-3xl p-6 md:p-8"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field name="name" label="ชื่อภาษาอังกฤษ" required />
        <Field name="thaiName" label="ชื่อภาษาไทย" required />
        <Field
          name="slug"
          label="Slug"
          placeholder="เว้นว่างเพื่อสร้างจากชื่อ"
        />
        <Field name="title" label="ฉายา" required />
        <Field name="keyName" label="Sovereign Key" required />
        <Field name="eye" label="Royal Eye" required />
        <Field name="domain" label="Domain" required />
        <Field name="army" label="กองทัพ" required />
        <Field
          name="accent"
          label="Accent สี HEX"
          defaultValue="#e7c66f"
          required
        />
        <label className="grid gap-2">
          <span className="text-sm text-slate-400">สัญลักษณ์</span>

          <select
            name="symbol"
            defaultValue="✦"
            required
            className="min-h-12 rounded-2xl border border-white/10 bg-[#0d101b] px-4 text-lg text-slate-100 outline-none focus:border-amber-200/40"
          >
            <option value="✦">✦ ดาวจักรวรรดิ</option>
            <option value="⚔">⚔ ดาบไขว้ — Saint-Cross</option>
            <option value="🦢">🦢 หงส์ — ParadiseSwan</option>
            <option value="🐍">🐍 อสรพิษ — Venom-Veil</option>
            <option value="⌛">⌛ นาฬิกาทราย — Void-Requiem</option>
            <option value="🌊">🌊 คลื่นทะเล — Azure-Song</option>
            <option value="🎲">🎲 ลูกเต๋า — Royal-Flush</option>
            <option value="🐺">🐺 หมาป่าเหล็ก — Iron-Bastion</option>
            <option value="🌑">🌑 จันทรคราส — Night-Fall</option>
            <option value="☀">☀ ดวงอาทิตย์</option>
            <option value="★">★ ดวงดาว</option>
            <option value="◆">◆ อัญมณี</option>
          </select>
        </label>
      </div>

      <label className="grid gap-2">
        <span className="text-sm text-slate-400">คำอธิบายตัวละคร</span>
        <textarea
          name="summary"
          rows={6}
          required
          className="rounded-2xl border border-white/10 bg-black/20 p-4 leading-7 text-slate-100 outline-none focus:border-amber-200/40"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm text-slate-400">
          พลังเด่น — หนึ่งรายการต่อหนึ่งบรรทัด
        </span>
        <textarea
          name="powers"
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
          สร้างตัวละคร
        </button>

        <Link
          href="/admin/characters"
          className="rounded-full border border-white/10 px-6 py-3 text-slate-300 transition hover:bg-white/5"
        >
          ยกเลิก
        </Link>
      </div>
    </form>
  );
}

function Field({
  name,
  label,
  required,
  placeholder,
  defaultValue,
}: {
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm text-slate-400">{label}</span>
      <input
        name={name}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="min-h-12 rounded-2xl border border-white/10 bg-black/20 px-4 text-slate-100 outline-none focus:border-amber-200/40"
      />
    </label>
  );
}

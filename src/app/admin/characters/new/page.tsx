import Link from "next/link";
import { CharacterLoreFields } from "@/components/admin/character-lore-fields";
import { requireAdmin } from "@/lib/admin-auth";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
        กลับไปรายการตัวละคร
      </Link>

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
            className="native-select text-lg"
          >
            <option value="✦">✦ ดาวจักรวรรดิ</option>
            <option value="☀">☀ ดวงอาทิตย์</option>
            <option value="⌛">⌛ นาฬิกาทราย</option>
            <option value="≋">≋ คลื่น</option>
            <option value="♛">♛ มงกุฎ</option>
            <option value="♜">♜ หอคอย</option>
            <option value="⚿">⚿ กุญแจ</option>
            <option value="⬢">⬢ หกเหลี่ยม</option>
            <option value="◉">◉ เนตร</option>
            <option value="◯">◯ วงแหวน</option>
            <option value="◆">◆ อัญมณี</option>
            <option value="◇">◇ อัญมณีโปร่ง</option>
            <option value="♢">♢ ข้าวหลามตัด</option>
          </select>
        </label>
      </div>

      <label className="grid gap-2">
        <span className="text-sm text-slate-400">คำอธิบายตัวละคร</span>
        <Textarea
          name="summary"
          rows={6}
          required
          
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm text-slate-400">
          พลังเด่น — หนึ่งรายการต่อหนึ่งบรรทัด
        </span>
        <Textarea
          name="powers"
          rows={7}
          required
          
        />
      </label>

      <CharacterLoreFields />

      <div className="flex flex-wrap gap-3">
        <Button
          type="submit"
          
        >
          สร้างตัวละคร
        </Button>

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
      <Input
        name={name}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        
      />
    </label>
  );
}

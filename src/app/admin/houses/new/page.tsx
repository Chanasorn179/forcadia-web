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

export default async function NewHousePage({
  searchParams,
}: Props) {
  await requireAdmin();
  const query = await searchParams;

  const rulers = await prisma.character.findMany({
    where: {
      house: null,
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
        กลับไปรายการตระกูล
      </Link>

      <h1 className="mt-3 text-4xl font-semibold">
        เพิ่มตระกูลใหม่
      </h1>

      {query.error && (
        <div className="mt-6 rounded-2xl border border-rose-300/20 bg-rose-300/5 p-4 text-rose-200">
          ข้อมูลไม่ถูกต้อง, slug ซ้ำ หรือผู้ปกครองถูกใช้งานแล้ว
        </div>
      )}

      {rulers.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-dashed border-white/10 p-10 text-center text-slate-500">
          ไม่มีตัวละครว่างสำหรับตั้งเป็นผู้ปกครอง
        </div>
      ) : (
        <HouseForm rulers={rulers} />
      )}
    </>
  );
}

function HouseForm({
  rulers,
}: {
  rulers: Array<{
    id: string;
    name: string;
    thaiName: string;
  }>;
}) {
  return (
    <form
      action="/admin/api/houses"
      method="post"
      className="glass-panel mt-8 grid gap-6 rounded-3xl p-6 md:p-8"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field name="name" label="ชื่อภาษาอังกฤษ" required />
        <Field name="thaiName" label="ชื่อภาษาไทย" required />
        <Field name="slug" label="Slug" placeholder="เว้นว่างเพื่อสร้างจากชื่อ" />
        <Field name="emblem" label="พาธตราตระกูล" placeholder="/images/crests-transparent/example.png" required />
        <Field name="emblemName" label="ชื่อตรา" required />
        <Field name="motto" label="คำขวัญ" required />
        <Field name="keyName" label="Sovereign Key" required />
        <Field name="domain" label="Domain" required />
        <Field name="accent" label="Accent สี HEX" defaultValue="#e7c66f" required />

        <label className="grid gap-2">
          <span className="text-sm text-slate-400">ผู้ปกครอง</span>
          <select
            name="rulerId"
            required
            className="native-select"
          >
            {rulers.map((ruler) => (
              <option key={ruler.id} value={ruler.id}>
                {ruler.name} — {ruler.thaiName}
              </option>
            ))}
          </select>
        </label>
      </div>

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
          สร้างตระกูล
        </Button>

        <Link
          href="/admin/houses"
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

import Link from "next/link";
import { notFound } from "next/navigation";
import { DeleteHouseForm } from "@/components/admin/delete-house-form";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FlashToast } from "@/components/admin/flash-toast";

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
        กลับไปรายการตระกูล
      </Link>

      <h1 className="mt-3 text-4xl font-semibold">
        {house.name}
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
              <Input
                name={name}
                defaultValue={value}
                required
                
              />
            </label>
          ))}

          <label className="grid gap-2">
            <span className="text-sm text-slate-400">ผู้ปกครอง</span>
            <select
              name="rulerId"
              defaultValue={house.rulerId}
              required
              className="native-select"
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
          <Textarea
            name="description"
            rows={7}
            defaultValue={house.description}
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

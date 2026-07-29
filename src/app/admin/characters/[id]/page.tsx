import Link from "next/link";
import { notFound } from "next/navigation";
import { DeleteCharacterForm } from "@/components/admin/delete-character-form";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    saved?: string;
    error?: string;
  }>;
};

export default async function EditCharacterPage({
  params,
  searchParams,
}: Props) {
  await requireAdmin();

  const { id } = await params;
  const query = await searchParams;

  const character = await prisma.character.findUnique({
    where: { id },
    include: {
      house: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!character) {
    notFound();
  }

  const powers = Array.isArray(character.powers)
    ? character.powers.filter(
        (item): item is string => typeof item === "string",
      )
    : [];

  return (
    <>
      <Link
        href="/admin/characters"
        className="text-sm text-amber-200 transition hover:text-amber-100"
      >
        ← กลับไปรายการตัวละคร
      </Link>

      <p className="section-kicker mt-8">Edit Character</p>
      <h1 className="mt-3 text-4xl font-semibold">{character.name}</h1>

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
        action={`/admin/api/characters/${character.id}`}
        method="post"
        className="glass-panel mt-8 grid gap-6 rounded-3xl p-6 md:p-8"
      >
        <div className="grid gap-5 md:grid-cols-2">
          {[
            ["name", "ชื่อภาษาอังกฤษ", character.name],
            ["thaiName", "ชื่อภาษาไทย", character.thaiName],
            ["slug", "Slug", character.slug],
            ["title", "ฉายา", character.title],
            ["keyName", "Sovereign Key", character.keyName],
            ["eye", "Royal Eye", character.eye],
            ["domain", "Domain", character.domain],
            ["army", "กองทัพ", character.army],
            ["accent", "Accent สี HEX", character.accent],
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
            <span className="text-sm text-slate-400">สัญลักษณ์</span>

            <select
              name="symbol"
              defaultValue={character.symbol}
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
            defaultValue={character.summary}
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
            defaultValue={powers.join("\n")}
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
            href={`/characters/${character.slug}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/10 px-6 py-3 text-slate-300 transition hover:bg-white/5"
          >
            เปิดหน้าตัวละคร
          </Link>
        </div>
      </form>

      <DeleteCharacterForm
        characterId={character.id}
        characterName={character.name}
        houseName={character.house?.name}
      />
    </>
  );
}

import Link from "next/link";
import { CharacterLoreFields } from "@/components/admin/character-lore-fields";
import { notFound } from "next/navigation";
import { DeleteCharacterForm } from "@/components/admin/delete-character-form";
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
        กลับไปรายการตัวละคร
      </Link>

      <h1 className="mt-3 text-4xl font-semibold">{character.name}</h1>

      {query.saved && (
        <FlashToast message="บันทึกข้อมูลเรียบร้อยแล้ว" />
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

              <Input
                name={name}
                defaultValue={value}
                required
                
              />
            </label>
          ))}

          <label className="grid gap-2">
            <span className="text-sm text-slate-400">สัญลักษณ์</span>

            <select
              name="symbol"
              defaultValue={character.symbol}
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
            defaultValue={character.summary}
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
            defaultValue={powers.join("\n")}
            required
            
          />
        </label>

        <CharacterLoreFields values={character} />

        <div className="flex flex-wrap gap-3">
          <Button
            type="submit"
            
          >
            บันทึกการแก้ไข
          </Button>

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

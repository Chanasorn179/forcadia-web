import Image from "next/image";
import type { CharacterLoreField } from "@/data/character-lore";

type Lore = Partial<Record<CharacterLoreField, string | null>>;

type Props = {
  lore: Lore;
  keyName: string;
  eye: string;
  domain: string;
  army: string;
  houseSlug?: string;
};

const numerals = ["I", "II", "III", "IV", "V"];

export function CharacterLoreSection({ lore, keyName, eye, domain, army, houseSlug }: Props) {
  const hasLore = Boolean(lore.history || lore.personality || lore.magicName);

  if (!hasLore) {
    return (
      <section aria-labelledby="lore-heading" className="lore-sealed mt-16">
        <div className="lore-sealed-card" aria-hidden="true">
          <Image src="/images/logos/unity-crown-webmark-gold.svg" alt="" width={44} height={44} />
        </div>
        <div>
          <h2 id="lore-heading" className="text-3xl md:text-4xl">บันทึกที่ยังถูกผนึก</h2>
          <p className="mt-4 max-w-xl leading-8 text-slate-300">
            ไพ่ใบนี้ยังคว่ำอยู่ ประวัติและพลังของผู้ครองบัลลังก์นี้ยังไม่ถูกเปิดเผยในคลังจักรวรรดิ
          </p>
        </div>
      </section>
    );
  }

  const arcana = [
    { label: "กุญแจราชันย์", name: keyName, thai: lore.keyThai, detail: lore.keyDetail },
    { label: "เนตรราชันย์", name: eye, thai: lore.eyeThai, detail: lore.eyeDetail },
    { label: "เวทมนตร์ประจำตัว", name: lore.magicName, detail: lore.magicDetail },
    { label: "Unique Creation", name: lore.creationName, detail: lore.creationDetail },
    {
      label: "เขตแดนอาคม",
      name: lore.domainThai ? `${domain} — ${lore.domainThai}` : domain,
      detail: lore.domainDetail,
    },
  ].filter((item): item is typeof item & { name: string } => Boolean(item.name));

  const facts = [
    { label: "พลังครึ่งเทพ", value: lore.demigodPowers },
    { label: "บัลลังก์", value: lore.throne, detail: lore.throneDetail },
    { label: "กองทัพ", value: army, detail: lore.armyDetail },
    { label: "ผู้ติดตาม", value: lore.followers },
  ].filter((item): item is { label: string; value: string; detail?: string | null } => Boolean(item.value));

  return (
    <section aria-labelledby="lore-heading" className="mt-16">
      <h2 id="lore-heading" className="text-3xl md:text-4xl">ตำนานของผู้ครองบัลลังก์</h2>

      <div className="lore-spread mt-8">
        {lore.history && (
          <article className="lore-history">
            <h3 className="lore-card-heading">ประวัติ</h3>
            <p>{lore.history}</p>
          </article>
        )}
        <div className="lore-traits">
          {lore.personality && (
            <article className="glass-panel rounded-2xl p-6">
              <h3 className="lore-card-heading text-amber-100">บุคลิก</h3>
              <p className="mt-3 leading-8 text-slate-300">{lore.personality}</p>
            </article>
          )}
          {lore.weakness && (
            <article className="glass-panel rounded-2xl p-6">
              <h3 className="lore-card-heading text-amber-100">จุดอ่อน</h3>
              <p className="mt-3 leading-8 text-slate-300">{lore.weakness}</p>
            </article>
          )}
        </div>
      </div>

      <h3 className="mt-14 text-2xl md:text-3xl">ห้าอาร์คานาแห่งอำนาจ</h3>
      <ol className="power-arcana mt-6">
        {arcana.map((item, index) => (
          <li key={item.label} className="power-arcanum" data-house={houseSlug}>
            <span className="arcana-index power-arcanum-index" aria-hidden="true">
              {numerals[index]}
            </span>
            <h4 className="power-arcanum-name">{item.name}</h4>
            {"thai" in item && item.thai && <p className="power-arcanum-thai">{item.thai}</p>}
            {item.detail && <p className="power-arcanum-text">{item.detail}</p>}
            <span className="power-arcanum-band">{item.label}</span>
          </li>
        ))}
      </ol>

      {facts.length > 0 && (
        <dl className="lore-facts mt-10">
          {facts.map((fact) => (
            <div key={fact.label} className="flex flex-col-reverse">
              <dt className="mt-1 text-sm text-slate-400">{fact.label}</dt>
              <dd className="text-lg text-amber-100">
                {fact.value}
                {fact.detail && (
                  <span className="mt-1 block text-sm leading-6 text-slate-300">{fact.detail}</span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}

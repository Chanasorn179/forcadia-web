import Image from "next/image";
import Link from "next/link";
import { CharacterCard } from "@/components/character-card";
import { ContinueReadingCard } from "@/components/continue-reading-card";
import { ArrowIcon } from "@/components/icons";
import { characters as staticCharacters } from "@/data/forcadia";
import {
  getPublicCharacters,
  getPublicEras,
  getPublicHouses,
  getPublishedChapters,
  parseChapterContent,
} from "@/lib/public-content";

export const dynamic = "force-dynamic";

const numerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

export default async function HomePage() {
  const [databaseCharacters, chapters, eras, houses] = await Promise.all([
    getPublicCharacters(),
    getPublishedChapters(),
    getPublicEras(),
    getPublicHouses(),
  ]);
  const characters = databaseCharacters.map((character) => {
    const presentation = staticCharacters.find((item) => item.slug === character.slug);

    return presentation
      ? {
          ...presentation,
          name: character.name,
          thaiName: character.thaiName,
          title: character.title,
          summary: character.summary,
          key: character.keyName,
          eye: character.eye,
          domain: character.domain,
          army: character.army,
          powers: Array.isArray(character.powers)
            ? character.powers.filter((power): power is string => typeof power === "string")
            : presentation.powers,
          accent: character.accent,
          symbol: character.symbol,
        }
      : null;
  }).filter((character): character is (typeof staticCharacters)[number] => Boolean(character));

  const prologue = chapters[0];
  const openingLines = prologue ? parseChapterContent(prologue.content).slice(0, 2) : [];
  const arcanumName = prologue?.book.title.replace(/^Book [IVXLC]+:\s*/, "") ?? "The Empty Throne";

  return (
    <main>
      <section aria-labelledby="prologue-title" className="deck-table">
        <div className="container-page deck-spread">
          {prologue ? (
            <article className="lead-card">
              <span className="lead-card-corner arcana-index" aria-hidden="true">0</span>
              <span className="lead-card-corner lead-card-corner-end arcana-index" aria-hidden="true">0</span>
              <h1 id="prologue-title" className="lead-card-title">
                {prologue.title}
              </h1>
              <div className="lead-card-text">
                {openingLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              <Link href={`/read/${prologue.slug}`} className="lead-card-action btn-action">
                พลิกไพ่ · อ่านต่อ
                <ArrowIcon />
              </Link>
              <p className="lead-card-band arcana-index">
                0 · {arcanumName}
              </p>
            </article>
          ) : (
            <article className="lead-card">
              <h1 id="prologue-title" className="lead-card-title">Forcadia: The Shattered Ring</h1>
              <div className="lead-card-text">
                <p>ไพ่ใบแรกยังคว่ำอยู่ ตอนแรกของเรื่องกำลังจะเผยแพร่เร็ว ๆ นี้</p>
              </div>
              <Link href="/books" className="lead-card-action btn-action">
                ดูหนังสือ
                <ArrowIcon />
              </Link>
            </article>
          )}

          <nav aria-label="แปดตระกูลจักรพรรดิ" className="arcana-fan">
            <ul>
              {houses.map((house, index) => (
                <li
                  key={house.slug}
                  style={{ "--i": index, "--n": houses.length } as React.CSSProperties}
                >
                  <Link
                    href={`/houses/${house.slug}`}
                    className="arcana-card"
                    data-house={house.slug}
                  >
                    <span className="arcana-back" aria-hidden="true">
                      <Image
                        src="/images/logos/unity-crown-webmark-gold.svg"
                        alt=""
                        width={40}
                        height={40}
                      />
                    </span>
                    <span className="arcana-face">
                      <span className="arcana-index arcana-face-index" aria-hidden="true">
                        {numerals[index]}
                      </span>
                      <span className="arcana-face-crest" aria-hidden="true">
                        <Image src={house.emblem} alt="" fill sizes="120px" className="object-contain" />
                      </span>
                      <span className="arcana-face-name">{house.name.replace("House ", "")}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="arcana-fan-caption">
              แปดตระกูล หนึ่งบัลลังก์ว่างเปล่า เลือกไพ่เพื่อเปิดบันทึกตระกูล
            </p>
          </nav>
        </div>
      </section>

      <div className="pt-12">
        <ContinueReadingCard />
      </div>

      <section aria-labelledby="characters-heading" className="container-page py-20 md:py-28">
        <div className="spread-head">
          <h2 id="characters-heading" className="text-3xl md:text-5xl">
            ผู้ถือไพ่แห่งวงแหวน
          </h2>
          <p className="spread-lede">
            ผู้ครองอำนาจแต่ละคนถือกุญแจหนึ่งดอกและตระกูลหนึ่งตระกูล ไพ่ของพวกเขาคือเส้นทางเข้าสู่เรื่อง
          </p>
          <Link href="/characters" className="link-arrow text-sm text-amber-200">
            ดูตัวละครทั้งหมด
          </Link>
        </div>

        <div className="character-spread mt-12">
          {characters.slice(0, 4).map((character) => (
            <CharacterCard key={character.slug} character={character} />
          ))}
        </div>
      </section>

      <section aria-labelledby="chapters-heading" className="chapter-row-section">
        <div className="container-page">
          <div className="spread-head">
            <h2 id="chapters-heading" className="text-3xl md:text-5xl">ไพ่ที่เปิดแล้ว</h2>
            <p className="spread-lede">
              ทุกตอนที่เผยแพร่เรียงตามลำดับ ตอนล่าสุดมีกรอบทองล้อมไว้
            </p>
          </div>

          {chapters.length > 0 ? (
            <ol className="chapter-row">
              {chapters.map((chapter, index) => (
                <li key={chapter.slug}>
                  <Link
                    href={`/read/${chapter.slug}`}
                    className="chapter-card card-hover"
                    data-latest={index === chapters.length - 1 ? "" : undefined}
                  >
                    <h3 className="chapter-card-title">{chapter.title}</h3>
                    <p className="chapter-card-text">{chapter.excerpt}</p>
                    <span className="chapter-card-band arcana-index">{chapter.orderText}</span>
                  </Link>
                </li>
              ))}
            </ol>
          ) : (
            <p className="mt-8 text-slate-400">ยังไม่มีตอนที่เผยแพร่ในขณะนี้</p>
          )}
        </div>
      </section>

      <section aria-labelledby="eras-heading" className="container-page era-spread py-20 md:py-28">
        <div>
          <h2 id="eras-heading" className="text-3xl md:text-5xl">วัฏจักรแห่งศักราช</h2>
          <p className="spread-lede mt-5">
            ทุกสองร้อยห้าสิบปี อำนาจเปลี่ยนมือ ศักราชล่าสุดคือยุคที่วงแหวนแตกร้าว
          </p>
          <Link href="/timeline" className="link-arrow mt-6 inline-flex text-sm text-amber-200">
            เปิดเส้นเวลาทั้งหมด
          </Link>
        </div>

        <ol className="era-list">
          {eras.slice(-4).map((era, index) => (
            <li key={era.name}>
              <span className="arcana-index era-index" aria-hidden="true">
                {numerals[eras.length - Math.min(4, eras.length) + index]}
              </span>
              <div>
                <h3 className="text-xl text-amber-100">{era.name}</h3>
                <p className="mt-1 text-sm leading-7 text-slate-400">{era.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="close-heading" className="container-page closing-spread pb-8">
        <div className="closing-copy">
          <h2 id="close-heading" className="text-3xl leading-snug md:text-5xl md:leading-tight">
            บัลลังก์ยังว่างเปล่า
          </h2>
          <p className="mt-4 max-w-md text-slate-300">
            เรื่องราวเริ่มที่ไพ่ใบแรก โลกทั้งใบรออยู่หลังจากนั้น
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href={prologue ? `/read/${prologue.slug}` : "/read"}
              className="btn-action inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-8 font-bold"
            >
              เปิดไพ่ใบแรก
              <ArrowIcon />
            </Link>
            <Link
              href="/lore"
              className="btn-quiet inline-flex min-h-12 items-center justify-center rounded-full px-7 font-semibold"
            >
              อ่านคลังตำนาน
            </Link>
          </div>
        </div>
        <Link
          href={prologue ? `/read/${prologue.slug}` : "/read"}
          className="closing-back card-hover"
          aria-label="เปิดไพ่ใบแรก"
        >
          <Image src="/images/logos/unity-crown-webmark-gold.svg" alt="" width={56} height={56} />
        </Link>
      </section>
    </main>
  );
}

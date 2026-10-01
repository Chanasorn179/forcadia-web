import Image from "next/image";
import Link from "next/link";
import { CharacterCard } from "@/components/character-card";
import { ContinueReadingCard } from "@/components/continue-reading-card";
import { ImperialRing } from "@/components/imperial-ring";
import { SectionHeading } from "@/components/page-header";
import { characters as staticCharacters } from "@/data/forcadia";
import {
  getPublicCharacters,
  getPublicEras,
  getPublicHouses,
  getPublishedChapters,
} from "@/lib/public-content";

export const dynamic = "force-dynamic";

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

  const firstChapter = chapters[0];
  const latestEra = eras.at(-1);

  return (
    <main>
      {/* Hero — the Shattered Ring */}
      <section className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <Image
            src="/images/portraits/group.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-top hero-backdrop opacity-[0.1] [mask-image:radial-gradient(ellipse_60%_45%_at_72%_18%,black,transparent_80%)]"
          />
        </div>

        <div className="container-page grid items-center gap-10 pb-12 pt-12 md:pt-20 lg:min-h-[86vh] lg:grid-cols-[1fr_1.05fr] lg:gap-8 lg:pb-24">
          <div className="max-w-xl">
            <p className="section-kicker">Book I: The Empty Throne</p>

            <h1 className="mt-5">
              <span className="gold-text block text-[4.2rem] leading-[0.95] font-semibold sm:text-[5.6rem] xl:text-[6.6rem]">
                Forcadia
              </span>
              <span className="mt-3 block text-[1.7rem] font-medium italic leading-tight text-[var(--foreground)] sm:text-[2.2rem]">
                The Shattered Ring
              </span>
            </h1>

            <div className="mt-8 h-px w-24 bg-linear-to-r from-[var(--gold)] to-transparent" />

            <p className="mt-8 font-[family-name:var(--font-display)] text-lg leading-9 text-slate-300 md:text-xl md:leading-10">
              เมื่อวัฏจักรสองร้อยห้าสิบปีสิ้นสุดลง แต่รัตติกาลปฏิเสธที่จะลาลับ
              บัลลังก์หนึ่งจึงว่างเปล่า และจักรวรรดิทั้งมวลเริ่มแตกร้าว
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/read" className="btn-seal">
                เริ่มอ่าน Book I
              </Link>
              <Link href="/houses" className="btn-ghost">
                รู้จักแปดตระกูล
              </Link>
            </div>

            {firstChapter && (
              <p className="mt-8 text-sm text-slate-500">
                เผยแพร่แล้ว {chapters.length} ตอน · เริ่มที่{" "}
                <Link
                  href={`/read/${firstChapter.slug}`}
                  className="text-[var(--gold)] underline decoration-[var(--plate-edge)] underline-offset-4 hover:decoration-[var(--gold)]"
                >
                  {firstChapter.title}
                </Link>
              </p>
            )}
          </div>

          <div className="relative lg:py-6">
            <ImperialRing houses={houses} />
          </div>
        </div>
      </section>

      <ContinueReadingCard />

      {/* Sovereigns */}
      <section className="container-page py-20 md:py-24">
        <SectionHeading
          kicker="Dramatis Personae"
          title="ผู้ครองอำนาจทั้งแปด"
          aside={
            <Link href="/characters" className="link-arrow text-sm text-[var(--gold)]">
              ดูบันทึกตัวละครทั้งหมด
            </Link>
          }
        />

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {characters.map((character, index) => (
            <CharacterCard
              key={character.slug}
              character={character}
              showSummary={false}
              priority={index < 4}
            />
          ))}
        </div>
      </section>

      {/* Chapters + cycle */}
      <section className="relative py-20 md:py-24">
        <div aria-hidden="true" className="crack-line absolute inset-x-0 top-0" />
        <div className="container-page grid gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <SectionHeading kicker="Latest Chapters" title="บันทึกแห่งวงแหวน" />

            <ol className="mt-8 divide-y divide-[var(--plate-edge)] border-y border-[var(--plate-edge)]">
              {chapters.slice(0, 5).map((chapter) => (
                <li key={chapter.slug}>
                  <Link
                    href={`/read/${chapter.slug}`}
                    className="group grid gap-x-6 gap-y-1 py-6 sm:grid-cols-[8rem_1fr]"
                  >
                    <span className="font-[family-name:var(--font-display)] text-base italic text-[var(--gold)]">
                      {chapter.orderText}
                    </span>
                    <span>
                      <span className="block font-[family-name:var(--font-display)] text-2xl text-[var(--foreground)] transition group-hover:text-[var(--gold-soft)]">
                        {chapter.title}
                      </span>
                      <span className="mt-1 block text-sm leading-7 text-slate-400">
                        {chapter.excerpt}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>

          <aside className="glass-panel self-start rounded-xl p-7 md:p-9">
            <p className="section-kicker">The Imperial Cycle</p>
            <h2 className="mt-2 text-3xl">วัฏจักรแห่งศักราช</h2>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              แปดยุค ยุคละสองร้อยห้าสิบปี วนครบสองพันปีหนึ่งรอบ
            </p>

            <ol className="relative mt-7 space-y-5 border-l border-[var(--plate-edge)] pl-6">
              {eras.slice(-4).map((era, index, list) => {
                const number = eras.length - list.length + index + 1;
                const current = era === latestEra;

                return (
                  <li key={era.name} className="relative">
                    <span
                      aria-hidden="true"
                      className={[
                        "absolute -left-[1.85rem] top-2 h-2.5 w-2.5 rotate-45 border",
                        current
                          ? "border-[var(--gold)] bg-[var(--gold)]"
                          : "border-[var(--gold)] bg-[var(--plate)]",
                      ].join(" ")}
                    />
                    <h3 className="font-[family-name:var(--font-display)] text-xl text-[var(--foreground)]">
                      <span className="mr-2 text-[var(--gold)]">{number}.</span>
                      {era.name}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-400">{era.detail}</p>
                  </li>
                );
              })}
            </ol>

            <Link href="/timeline" className="link-arrow mt-8 inline-flex text-sm text-[var(--gold)]">
              เปิดเส้นเวลาทั้งหมด
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}

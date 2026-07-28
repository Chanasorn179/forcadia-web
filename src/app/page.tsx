import Link from "next/link";
import { CharacterCard } from "@/components/character-card";
import { ContinueReadingCard } from "@/components/continue-reading-card";
import { chapters, characters, eras } from "@/data/forcadia";

export default function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-amber-200/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(121,133,220,0.20),transparent_28%),radial-gradient(circle_at_50%_70%,rgba(217,184,108,0.10),transparent_34%)]" />

        <div className="container-page relative flex min-h-[72vh] items-center py-20">
          <div className="max-w-4xl">
            <p className="section-kicker">Book I · The Empty Throne</p>

            <h1 className="gold-text mt-6 text-5xl font-semibold leading-tight md:text-7xl lg:text-8xl">
              Forcadia:
              <br />
              The Shattered Ring
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
              เมื่อวัฏจักรสองร้อยห้าสิบปีสิ้นสุดลง แต่รัตติกาลปฏิเสธที่จะลาลับ
              บัลลังก์หนึ่งจึงว่างเปล่า และจักรวรรดิทั้งมวลเริ่มแตกร้าว
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/read"
                className="inline-flex items-center justify-center rounded-full border border-amber-300 bg-slate-950 px-9 py-4 text-base font-bold text-amber-300 shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-all duration-200 hover:-translate-y-1 hover:bg-amber-300 hover:text-slate-950"
              >
                เริ่มอ่าน Book I
              </Link>

              <Link
                href="/world"
                className="rounded-full border border-white/20 px-7 py-3 font-semibold text-slate-100 transition hover:bg-white/10"
              >
                สำรวจจักรวรรดิ
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ContinueReadingCard />

      <section className="container-page pb-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-kicker">Dramatis Personae</p>
            <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
              ผู้ครองอำนาจทั้งแปด
            </h2>
          </div>

          <Link href="/characters" className="text-sm text-amber-200">
            ดูตัวละครทั้งหมด →
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {characters.slice(0, 4).map((character) => (
            <CharacterCard key={character.slug} character={character} />
          ))}
        </div>
      </section>

      <section className="border-y border-amber-200/10 bg-black/20 py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="section-kicker">Latest Chapters</p>
            <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
              บันทึกแห่งวงแหวน
            </h2>

            <div className="mt-8 space-y-4">
              {chapters.slice(0, 3).map((chapter) => (
                <Link
                  key={chapter.slug}
                  href={`/read/${chapter.slug}`}
                  className="glass-panel card-hover block rounded-2xl p-5"
                >
                  <p className="text-xs uppercase tracking-[0.22em] text-amber-200">
                    {chapter.order}
                  </p>

                  <h3 className="mt-2 text-xl">{chapter.title}</h3>

                  <p className="mt-2 text-sm leading-7 text-slate-400">
                    {chapter.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-7 md:p-10">
            <p className="section-kicker">The Imperial Cycle</p>
            <h2 className="mt-3 text-3xl font-semibold">วัฏจักรแห่งศักราช</h2>

            <div className="mt-7 space-y-5">
              {eras.slice(-4).map((era, index) => (
                <div key={era.name} className="flex gap-4">
                  <div className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-amber-200/30 text-xs text-amber-200">
                    {index + 5}
                  </div>

                  <div>
                    <h3 className="text-amber-100">{era.name}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {era.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/timeline"
              className="mt-8 inline-flex text-sm text-amber-200"
            >
              เปิดเส้นเวลาทั้งหมด →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

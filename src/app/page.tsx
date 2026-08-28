import Image from "next/image";
import Link from "next/link";
import { CharacterCard } from "@/components/character-card";
import { ContinueReadingCard } from "@/components/continue-reading-card";
import { chapters, characters, eras } from "@/data/forcadia";

export default function HomePage() {
  return (
    <main>
      <section className="relative isolate overflow-hidden border-b border-amber-200/10">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_35%,rgba(121,133,220,0.20),transparent_27%),radial-gradient(circle_at_25%_70%,rgba(217,184,108,0.11),transparent_34%)]" />
        <div className="hero-grid absolute inset-0 -z-10 opacity-35" />

        <div className="container-page relative grid min-h-[78vh] items-center gap-12 py-20 lg:grid-cols-[1.08fr_0.92fr] lg:py-24">
          <div className="max-w-4xl">
            <p className="section-kicker">Book I · The Empty Throne</p>

            <h1 className="gold-text mt-6 text-5xl font-semibold leading-[1.04] md:text-7xl xl:text-[5.6rem]">
              <span className="block">Forcadia:</span>
              <span className="block">The Shattered</span>
              <span className="block">Ring</span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 md:text-xl md:leading-9">
              เมื่อวัฏจักรสองร้อยห้าสิบปีสิ้นสุดลง แต่รัตติกาลปฏิเสธที่จะลาลับ
              บัลลังก์หนึ่งจึงว่างเปล่า และจักรวรรดิทั้งมวลเริ่มแตกร้าว
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/read"
                className="group inline-flex min-h-13 items-center justify-center gap-3 rounded-full border border-amber-300 bg-amber-300 px-8 py-3.5 text-base font-bold text-slate-950 shadow-[0_12px_40px_rgba(217,184,108,0.16)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-200"
              >
                เริ่มอ่าน Book I <span className="transition group-hover:translate-x-1">→</span>
              </Link>

              <Link
                href="/world"
                className="inline-flex min-h-13 items-center rounded-full border border-white/15 bg-white/3 px-7 py-3 font-semibold text-slate-100 transition hover:border-white/30 hover:bg-white/8"
              >
                สำรวจจักรวรรดิ
              </Link>
            </div>

            <dl className="mt-10 grid max-w-xl grid-cols-3 gap-3 border-t border-white/10 pt-6">
              {[
                ["8", "ตระกูลจักรพรรดิ"],
                ["250", "ปีต่อวัฏจักร"],
                ["1", "บัลลังก์ว่างเปล่า"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="font-serif text-2xl text-amber-100 md:text-3xl">{value}</dt>
                  <dd className="mt-1 text-xs leading-5 text-slate-500">{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative hidden min-h-120 place-items-center lg:grid">
            <div className="group relative aspect-4/5 w-full max-w-105 overflow-hidden rounded-[2rem] border border-amber-200/20 bg-[#090b14] shadow-[0_35px_100px_rgba(0,0,0,0.48)]">
              <Image
                src="/images/portraits/group.png"
                alt="ผู้ครองอำนาจแห่งจักรวรรดิ Forcadia"
                fill
                priority
                className="object-cover object-top transition duration-1000 group-hover:scale-[1.018]"
                sizes="(max-width: 1024px) 0px, 420px"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#070912] via-transparent to-black/10" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="section-kicker">The Imperial Circle</p>
                <p className="mt-2 font-serif text-xl text-amber-100">
                  เจ็ดผู้ครองบัลลังก์ · หนึ่งผู้สาบสูญ
                </p>
              </div>
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

          <Link href="/characters" className="link-arrow text-sm text-amber-200">
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
              className="link-arrow mt-8 inline-flex text-sm text-amber-200"
            >
              เปิดเส้นเวลาทั้งหมด →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

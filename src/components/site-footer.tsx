import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="relative mt-24 bg-[color-mix(in_srgb,var(--ink)_55%,transparent)]">
      <div aria-hidden="true" className="crack-line" />
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.2fr_0.8fr] md:items-end">
        <div className="flex items-start gap-4">
          <span aria-hidden="true" className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full border border-amber-200/25">
            <Image
              src="/images/logos/unity-crown-webmark-gold.svg"
              alt=""
              fill
              className="object-contain p-1.5"
              sizes="44px"
            />
          </span>
          <div>
            <p className="gold-text font-[family-name:var(--font-display)] text-2xl font-semibold">Codex of Fourcadir</p>
            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400">
              สารานุกรมจักรวรรดิและพื้นที่อ่านนิยาย Forcadia: The Shattered Ring
            </p>
          </div>
        </div>
        <nav aria-label="เมนูส่วนท้าย" className="flex flex-wrap items-start gap-x-6 gap-y-3 text-sm text-slate-400 md:justify-end">
          <Link className="inline-flex min-h-11 items-center transition hover:text-[var(--gold-soft)]" href="/read">อ่านนิยาย</Link>
          <Link className="inline-flex min-h-11 items-center transition hover:text-[var(--gold-soft)]" href="/characters">ตัวละคร</Link>
          <Link className="inline-flex min-h-11 items-center transition hover:text-[var(--gold-soft)]" href="/world">แผนที่โลก</Link>
          <Link className="inline-flex min-h-11 items-center transition hover:text-[var(--gold-soft)]" href="/lore">คลังตำนาน</Link>
        </nav>
      </div>
    </footer>
  );
}

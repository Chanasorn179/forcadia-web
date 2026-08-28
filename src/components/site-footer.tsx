import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-amber-200/10 bg-[radial-gradient(circle_at_20%_0%,rgba(217,184,108,0.07),transparent_28%),rgba(0,0,0,0.24)]">
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
            <p className="gold-text font-serif text-xl font-semibold">Codex of Fourcadir</p>
            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400">
              สารานุกรมจักรวรรดิและพื้นที่อ่านนิยาย Forcadia: The Shattered Ring
            </p>
          </div>
        </div>
        <nav aria-label="เมนูส่วนท้าย" className="flex flex-wrap items-start gap-x-6 gap-y-3 text-sm text-slate-400 md:justify-end">
          <Link className="transition hover:text-amber-100" href="/read">อ่านนิยาย</Link>
          <Link className="transition hover:text-amber-100" href="/characters">ตัวละคร</Link>
          <Link className="transition hover:text-amber-100" href="/world">แผนที่โลก</Link>
          <Link className="transition hover:text-amber-100" href="/lore">คลังตำนาน</Link>
        </nav>
      </div>
    </footer>
  );
}

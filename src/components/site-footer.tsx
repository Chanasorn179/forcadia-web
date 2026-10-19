import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer mt-24 border-t">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.2fr_0.8fr] md:items-end">
        <div className="flex items-start gap-4">
          <span aria-hidden="true" className="relative grid h-11 w-11 shrink-0 place-items-center">
            <Image
              src="/images/logos/unity-crown-webmark-gold.svg"
              alt=""
              fill
              className="object-contain p-1.5"
              sizes="44px"
            />
          </span>
          <div>
            <p className="card-title text-xl text-amber-100">Codex of Fourcadir</p>
            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400">
              สารานุกรมจักรวรรดิและพื้นที่อ่านนิยาย Forcadia: The Shattered Ring
            </p>
          </div>
        </div>
        <nav aria-label="เมนูส่วนท้าย" className="flex flex-wrap items-start gap-x-6 gap-y-3 text-sm text-slate-400 md:justify-end">
          <Link className="inline-flex min-h-11 items-center transition hover:text-amber-200" href="/read">อ่านนิยาย</Link>
          <Link className="inline-flex min-h-11 items-center transition hover:text-amber-200" href="/characters">ตัวละคร</Link>
          <Link className="inline-flex min-h-11 items-center transition hover:text-amber-200" href="/world">แผนที่โลก</Link>
          <Link className="inline-flex min-h-11 items-center transition hover:text-amber-200" href="/lore">คลังตำนาน</Link>
        </nav>
      </div>
    </footer>
  );
}

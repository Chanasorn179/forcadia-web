import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-amber-200/10 bg-black/20">
      <div className="container-page grid gap-8 py-10 md:grid-cols-2">
        <div>
          <p className="gold-text text-xl font-semibold">Codex of Fourcadir</p>
          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400">
            สารานุกรมจักรวรรดิและพื้นที่อ่านนิยาย Forcadia: The Shattered Ring
          </p>
        </div>
        <div className="flex flex-wrap items-start gap-5 text-sm text-slate-400 md:justify-end">
          <Link href="/read">อ่านนิยาย</Link>
          <Link href="/characters">ตัวละคร</Link>
          <Link href="/world">แผนที่โลก</Link>
          <Link href="/lore">คลังตำนาน</Link>
        </div>
      </div>
    </footer>
  );
}

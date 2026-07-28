import Link from "next/link";

export function SearchLink() {
  return (
    <Link
      href="/search"
      aria-label="ค้นหาในเว็บไซต์"
      title="ค้นหา"
      className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 text-lg text-slate-300 transition hover:border-amber-200/30 hover:bg-amber-200/10 hover:text-amber-100"
    >
      <span aria-hidden="true">⌕</span>
    </Link>
  );
}

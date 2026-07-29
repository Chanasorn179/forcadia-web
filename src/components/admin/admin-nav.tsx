import Link from "next/link";

export function AdminNav() {
  return (
    <aside className="glass-panel h-fit rounded-3xl p-5 lg:sticky lg:top-24">
      <p className="section-kicker">Admin Console</p>

      <nav className="mt-5 grid gap-2" aria-label="เมนูผู้ดูแล">
        <Link
          href="/admin"
          className="rounded-xl border border-white/10 px-4 py-3 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
        >
          ภาพรวม
        </Link>

        <Link
          href="/admin/books"
          className="rounded-xl border border-white/10 px-4 py-3 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
        >
          จัดการหนังสือ
        </Link>

        <Link
          href="/admin/chapters"
          className="rounded-xl border border-white/10 px-4 py-3 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
        >
          จัดการตอนนิยาย
        </Link>

        <Link
          href="/admin/chapters/new"
          className="rounded-xl border border-amber-200/20 bg-amber-200/5 px-4 py-3 text-sm text-amber-100 transition hover:bg-amber-200/10"
        >
          เพิ่มตอนใหม่
        </Link>

        <Link
          href="/"
          className="rounded-xl border border-white/10 px-4 py-3 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
        >
          กลับหน้าเว็บไซต์
        </Link>
      </nav>

      <form action="/admin/api/logout" method="post" className="mt-5">
        <button
          type="submit"
          className="w-full rounded-xl border border-rose-300/20 px-4 py-3 text-sm text-rose-200 transition hover:bg-rose-300/10"
        >
          ออกจากระบบ
        </button>
      </form>
    </aside>
  );
}

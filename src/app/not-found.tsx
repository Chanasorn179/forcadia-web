import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container-page grid min-h-[65vh] place-items-center py-20 text-center">
      <div>
        <p className="section-kicker">Lost Beyond the Ring</p>
        <h1 className="gold-text mt-5 text-6xl font-semibold">404</h1>
        <p className="mt-5 text-slate-400">ไม่พบบันทึกที่คุณกำลังค้นหา</p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full border border-amber-200/30 px-6 py-3 text-amber-100"
        >
          กลับหน้าหลัก
        </Link>
      </div>
    </main>
  );
}

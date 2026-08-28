"use client";

import Link from "next/link";
import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="container-page grid min-h-[65vh] place-items-center py-20">
      <section className="glass-panel w-full max-w-2xl rounded-3xl p-8 text-center md:p-12">
        <p className="section-kicker">Archive Interrupted</p>
        <h1 className="mt-4 text-3xl font-semibold text-amber-100 md:text-5xl">
          เปิดบันทึกนี้ไม่สำเร็จ
        </h1>
        <p className="mx-auto mt-5 max-w-lg leading-8 text-slate-400">
          ระบบพบข้อผิดพลาดชั่วคราว กรุณาลองเปิดหน้านี้อีกครั้ง
          หรือกลับไปยังหน้าหลัก
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-full border border-amber-200/30 bg-amber-200/10 px-6 py-3 font-semibold text-amber-100 transition hover:bg-amber-200/20"
          >
            ลองอีกครั้ง
          </button>
          <Link
            href="/"
            className="rounded-full border border-white/10 px-6 py-3 font-semibold text-slate-300 transition hover:bg-white/10"
          >
            กลับหน้าแรก
          </Link>
        </div>
      </section>
    </main>
  );
}

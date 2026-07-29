"use client";

import { useState } from "react";

type Props = {
  bookId: string;
  bookTitle: string;
  chapterCount: number;
};

export function DeleteBookForm({
  bookId,
  bookTitle,
  chapterCount,
}: Props) {
  const [confirmation, setConfirmation] = useState("");
  const matches = confirmation === bookTitle;
  const blocked = chapterCount > 0;

  return (
    <section className="mt-8 rounded-3xl border border-rose-300/20 bg-rose-300/5 p-6">
      <p className="text-xs uppercase tracking-[0.22em] text-rose-300">
        Danger Zone
      </p>

      <h2 className="mt-3 text-2xl font-semibold text-rose-100">
        ลบหนังสือถาวร
      </h2>

      {blocked ? (
        <p className="mt-3 leading-7 text-rose-100/70">
          หนังสือเล่มนี้ยังมี {chapterCount} ตอนอยู่ในระบบ
          จึงยังไม่สามารถลบได้ กรุณาย้ายหรือลบตอนทั้งหมดก่อน
        </p>
      ) : (
        <>
          <p className="mt-3 max-w-3xl leading-7 text-rose-100/70">
            กรุณาพิมพ์ชื่อหนังสือให้ตรงทุกตัวอักษรเพื่อยืนยัน
          </p>

          <p className="mt-4 rounded-xl border border-rose-300/15 bg-black/20 px-4 py-3 font-mono text-sm text-rose-100">
            {bookTitle}
          </p>

          <form
            action={`/admin/api/books/${bookId}/delete`}
            method="post"
            className="mt-5"
          >
            <label className="grid gap-2">
              <span className="text-sm text-rose-100/70">
                พิมพ์ชื่อหนังสือเพื่อยืนยัน
              </span>

              <input
                name="confirmation"
                value={confirmation}
                onChange={(event) =>
                  setConfirmation(event.target.value)
                }
                autoComplete="off"
                className="min-h-12 rounded-2xl border border-rose-300/20 bg-black/20 px-4 text-rose-100 outline-none focus:border-rose-300/50"
              />
            </label>

            <button
              type="submit"
              disabled={!matches}
              className="mt-4 rounded-full border border-rose-300/30 bg-rose-300/10 px-6 py-3 font-semibold text-rose-100 transition hover:bg-rose-300/20 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ลบหนังสือถาวร
            </button>
          </form>
        </>
      )}
    </section>
  );
}

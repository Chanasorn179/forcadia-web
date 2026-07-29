"use client";

import { useState } from "react";

type Props = {
  characterId: string;
  characterName: string;
  houseName?: string;
};

export function DeleteCharacterForm({
  characterId,
  characterName,
  houseName,
}: Props) {
  const [confirmation, setConfirmation] = useState("");
  const matches = confirmation === characterName;
  const blocked = Boolean(houseName);

  return (
    <section className="mt-8 rounded-3xl border border-rose-300/20 bg-rose-300/5 p-6">
      <p className="text-xs uppercase tracking-[0.22em] text-rose-300">
        Danger Zone
      </p>

      <h2 className="mt-3 text-2xl font-semibold text-rose-100">
        ลบตัวละครถาวร
      </h2>

      {blocked ? (
        <p className="mt-3 leading-7 text-rose-100/70">
          ตัวละครนี้ยังเป็นผู้ปกครองของ {houseName}
          จึงไม่สามารถลบได้ กรุณาเปลี่ยนผู้ปกครองของตระกูลก่อน
        </p>
      ) : (
        <>
          <p className="mt-3 max-w-3xl leading-7 text-rose-100/70">
            กรุณาพิมพ์ชื่อตัวละครให้ตรงทุกตัวอักษรเพื่อยืนยัน
          </p>

          <p className="mt-4 rounded-xl border border-rose-300/15 bg-black/20 px-4 py-3 font-mono text-sm text-rose-100">
            {characterName}
          </p>

          <form
            action={`/admin/api/characters/${characterId}/delete`}
            method="post"
            className="mt-5"
          >
            <label className="grid gap-2">
              <span className="text-sm text-rose-100/70">
                พิมพ์ชื่อตัวละครเพื่อยืนยัน
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
              ลบตัวละครถาวร
            </button>
          </form>
        </>
      )}
    </section>
  );
}

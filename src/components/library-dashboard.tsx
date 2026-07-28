"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  clearBookmarks,
  getBookmarks,
  getLastRead,
  removeBookmark,
  type BookmarkRecord,
  type LastReadRecord,
} from "@/lib/library-storage";

export function LibraryDashboard() {
  const [lastRead, setLastRead] = useState<LastReadRecord | null>(null);
  const [bookmarks, setBookmarks] = useState<BookmarkRecord[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setLastRead(getLastRead());
      setBookmarks(getBookmarks());
      setReady(true);
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  function deleteBookmark(slug: string) {
    removeBookmark(slug);
    setBookmarks((current) =>
      current.filter((item) => item.slug !== slug),
    );
  }

  function deleteAllBookmarks() {
    clearBookmarks();
    setBookmarks([]);
  }

  if (!ready) {
    return (
      <div className="mt-10 rounded-3xl border border-white/10 p-8 text-slate-500">
        กำลังเปิดบันทึกส่วนตัว...
      </div>
    );
  }

  return (
    <>
      <section className="mt-10">
        <p className="section-kicker">Continue Reading</p>

        <h2 className="mt-3 text-2xl font-semibold md:text-4xl">
          อ่านต่อจากครั้งล่าสุด
        </h2>

        {lastRead ? (
          <Link
            href={`/read/${lastRead.slug}`}
            className="glass-panel card-hover group mt-6 block rounded-3xl p-6 md:p-8"
          >
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                  {lastRead.order}
                </p>

                <h3 className="mt-2 text-2xl text-amber-100">
                  {lastRead.title}
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  อ่านไปแล้วประมาณ {Math.round(lastRead.progress)}%
                </p>
              </div>

              <span className="shrink-0 text-sm text-amber-200 transition group-hover:translate-x-1">
                อ่านต่อ →
              </span>
            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-amber-300"
                style={{
                  width: `${Math.min(
                    100,
                    Math.max(0, lastRead.progress),
                  )}%`,
                }}
              />
            </div>
          </Link>
        ) : (
          <div className="mt-6 rounded-3xl border border-dashed border-white/10 p-8 text-center">
            <p className="text-slate-300">ยังไม่มีประวัติการอ่าน</p>

            <Link
              href="/books"
              className="mt-4 inline-flex text-sm text-amber-200 hover:underline"
            >
              เปิดห้องสมุด →
            </Link>
          </div>
        )}
      </section>

      <section className="mt-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-kicker">Saved Chapters</p>

            <h2 className="mt-3 text-2xl font-semibold md:text-4xl">
              ตอนที่บันทึกไว้
            </h2>
          </div>

          {bookmarks.length > 0 && (
            <button
              type="button"
              onClick={deleteAllBookmarks}
              className="text-sm text-slate-500 transition hover:text-rose-300"
            >
              ลบบันทึกทั้งหมด
            </button>
          )}
        </div>

        {bookmarks.length === 0 ? (
          <div className="mt-6 rounded-3xl border border-dashed border-white/10 p-8 text-center">
            <p className="text-slate-300">ยังไม่ได้บันทึกตอนใดไว้</p>
            <p className="mt-2 text-sm text-slate-500">
              เปิดตอนนิยายแล้วกด “บันทึกตอนนี้”
            </p>
          </div>
        ) : (
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {bookmarks.map((bookmark) => (
              <article
                key={bookmark.slug}
                className="glass-panel rounded-3xl p-6"
              >
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                  {bookmark.order}
                </p>

                <h3 className="mt-2 text-xl text-amber-100">
                  {bookmark.title}
                </h3>

                <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-400">
                  {bookmark.excerpt}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href={`/read/${bookmark.slug}`}
                    className="rounded-full border border-amber-200/30 px-4 py-2 text-sm text-amber-100 transition hover:bg-amber-200/10"
                  >
                    เปิดอ่าน
                  </Link>

                  <button
                    type="button"
                    onClick={() => deleteBookmark(bookmark.slug)}
                    className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-400 transition hover:border-rose-300/25 hover:text-rose-300"
                  >
                    ลบบันทึก
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

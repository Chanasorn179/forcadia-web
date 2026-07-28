"use client";

import { useEffect, useState } from "react";
import {
  addBookmark,
  isBookmarked,
  removeBookmark,
} from "@/lib/library-storage";

type Props = {
  slug: string;
  title: string;
  order: string;
  excerpt: string;
};

export function ChapterBookmarkButton({
  slug,
  title,
  order,
  excerpt,
}: Props) {
  const [bookmarked, setBookmarked] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setBookmarked(isBookmarked(slug));
      setReady(true);
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [slug]);

  function toggleBookmark() {
    if (bookmarked) {
      removeBookmark(slug);
      setBookmarked(false);
      return;
    }

    addBookmark({
      slug,
      title,
      order,
      excerpt,
      savedAt: new Date().toISOString(),
    });

    setBookmarked(true);
  }

  return (
    <button
      type="button"
      onClick={toggleBookmark}
      disabled={!ready}
      aria-pressed={bookmarked}
      className={[
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition disabled:cursor-wait disabled:opacity-60",
        bookmarked
          ? "border-amber-200/40 bg-amber-200/10 text-amber-100"
          : "border-white/10 text-slate-300 hover:border-amber-200/25 hover:bg-white/5",
      ].join(" ")}
    >
      <span aria-hidden="true">{bookmarked ? "★" : "☆"}</span>
      {bookmarked ? "บันทึกแล้ว" : "บันทึกตอนนี้"}
    </button>
  );
}

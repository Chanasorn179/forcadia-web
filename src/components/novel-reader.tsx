"use client";

import Link from "next/link";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";

type ChapterNav = {
  slug: string;
  title: string;
  order: string;
};

type Props = {
  chapterSlug: string;
  chapterTitle: string;
  chapterOrder: string;
  paragraphs: string[];
  previousChapter?: ChapterNav;
  nextChapter?: ChapterNav;
  allChapters: ChapterNav[];
  initialSettings?: ReaderSettings;
};

export type ReaderTheme = "night" | "paper" | "black";
export type ReaderWidth = "narrow" | "medium" | "wide";

export type ReaderSettings = {
  fontSize: number;
  lineHeight: number;
  theme: ReaderTheme;
  width: ReaderWidth;
};

export const defaultReaderSettings: ReaderSettings = {
  fontSize: 18,
  lineHeight: 1.95,
  theme: "night",
  width: "medium",
};

const themeClasses: Record<ReaderTheme, string> = {
  night:
    "bg-[#10131d] text-[#e6dfd1] border-white/10",
  paper:
    "bg-[#eee5d2] text-[#2a2119] border-[#5d4933]/20",
  black:
    "bg-black text-[#d9d9d9] border-white/10",
};

const widthClasses: Record<ReaderWidth, string> = {
  narrow: "max-w-[640px]",
  medium: "max-w-[760px]",
  wide: "max-w-[900px]",
};

function storageKey(chapterSlug: string) {
  return `forcadia:reader:${chapterSlug}`;
}

function settingsKey() {
  return "forcadia:reader-settings";
}

function lastReadKey() {
  return "forcadia:last-read";
}

export function NovelReader({
  chapterSlug,
  chapterTitle,
  chapterOrder,
  paragraphs,
  previousChapter,
  nextChapter,
  allChapters,
  initialSettings = defaultReaderSettings,
}: Props) {
  const articleRef = useRef<HTMLDivElement>(null);
  const contentsButtonRef = useRef<HTMLButtonElement>(null);

  const [settings, setSettings] =
    useState<ReaderSettings>(initialSettings);
  const [progress, setProgress] = useState(0);
  const [showContents, setShowContents] = useState(false);
  const [showToolbar, setShowToolbar] = useState(false);
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    const savedProgress = localStorage.getItem(storageKey(chapterSlug));

    if (savedProgress) {
      const value = Number(savedProgress);

      if (Number.isFinite(value) && value > 0) {
        const maxScroll =
          document.documentElement.scrollHeight - window.innerHeight;

        requestAnimationFrame(() => {
          window.scrollTo({
            top: Math.round((value / 100) * maxScroll),
            behavior: "auto",
          });
          setRestored(true);
        });
      }
    }
  }, [chapterSlug]);
  useEffect(() => {
    localStorage.setItem(settingsKey(), JSON.stringify(settings));
    document.cookie = `forcadia_reader_settings=${encodeURIComponent(JSON.stringify(settings))}; Path=/; Max-Age=31536000; SameSite=Lax`;
  }, [settings]);

  useEffect(() => {
    if (!showContents) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const contentsButton = contentsButtonRef.current;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setShowContents(false);
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      contentsButton?.focus();
    };
  }, [showContents]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;

      requestAnimationFrame(() => {
        const maxScroll =
          document.documentElement.scrollHeight - window.innerHeight;

        const currentProgress =
          maxScroll <= 0
            ? 100
            : Math.min(
                100,
                Math.max(0, (window.scrollY / maxScroll) * 100),
              );

        setProgress(currentProgress);

        localStorage.setItem(
          storageKey(chapterSlug),
          currentProgress.toFixed(2),
        );

        localStorage.setItem(
          lastReadKey(),
          JSON.stringify({
            slug: chapterSlug,
            title: chapterTitle,
            order: chapterOrder,
            progress: currentProgress,
            savedAt: new Date().toISOString(),
          }),
        );

        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [chapterOrder, chapterSlug, chapterTitle]);

  const readerStyle = useMemo<CSSProperties>(
    () => ({
      fontSize: `${settings.fontSize}px`,
      lineHeight: settings.lineHeight,
    }),
    [settings.fontSize, settings.lineHeight],
  );

  function changeFontSize(amount: number) {
    setSettings((current) => ({
      ...current,
      fontSize: Math.min(26, Math.max(15, current.fontSize + amount)),
    }));
  }

  function changeLineHeight(amount: number) {
    setSettings((current) => ({
      ...current,
      lineHeight: Math.min(
        2.35,
        Math.max(1.6, Number((current.lineHeight + amount).toFixed(2))),
      ),
    }));
  }

  function resetSettings() {
    setSettings(defaultReaderSettings);
  }

  function goToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <>
      <div
        className="fixed inset-x-0 top-0 z-70 h-1 bg-white/5"
        aria-hidden="true"
      >
        <div
          className="h-full bg-amber-300 transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mx-auto mb-8 max-w-5xl px-3">
        <div className="glass-panel rounded-2xl p-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowToolbar((current) => !current)}
                aria-expanded={showToolbar}
                aria-controls="reader-settings"
                className="min-h-10 rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-300 transition hover:border-white/20 hover:bg-white/5"
              >
                ตั้งค่าการอ่าน
              </button>

              <button
                ref={contentsButtonRef}
                type="button"
                onClick={() => setShowContents(true)}
                aria-haspopup="dialog"
                aria-expanded={showContents}
                aria-controls="reader-contents"
                className="min-h-10 rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-300 transition hover:border-white/20 hover:bg-white/5"
              >
                สารบัญ
              </button>
            </div>

            <div className="text-sm text-slate-400">
              อ่านแล้ว {Math.round(progress)}%
              {restored && (
                <span className="ml-2 text-amber-200">
                  · คืนตำแหน่งเดิมแล้ว
                </span>
              )}
            </div>
          </div>

          {showToolbar && (
            <div
              id="reader-settings"
              className="mt-3 grid gap-3 border-t border-white/10 pt-3 md:grid-cols-4"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                  ขนาดตัวอักษร
                </p>

                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => changeFontSize(-1)}
                    className="rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-300 hover:bg-white/5"
                  >
                    A−
                  </button>

                  <button
                    type="button"
                    onClick={() => changeFontSize(1)}
                    className="rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-300 hover:bg-white/5"
                  >
                    A+
                  </button>

                  <span className="self-center text-xs text-slate-500">
                    {settings.fontSize}px
                  </span>
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                  ระยะบรรทัด
                </p>

                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => changeLineHeight(-0.1)}
                    className="rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-300 hover:bg-white/5"
                  >
                    −
                  </button>

                  <button
                    type="button"
                    onClick={() => changeLineHeight(0.1)}
                    className="rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-300 hover:bg-white/5"
                  >
                    +
                  </button>

                  <span className="self-center text-xs text-slate-500">
                    {settings.lineHeight.toFixed(2)}
                  </span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="reader-width"
                  className="text-xs uppercase tracking-[0.18em] text-slate-500"
                >
                  ความกว้าง
                </label>

                <select
                  id="reader-width"
                  value={settings.width}
                  onChange={(event) =>
                    setSettings((current) => ({
                      ...current,
                      width: event.target.value as ReaderWidth,
                    }))
                  }
                  className="mt-2 w-full rounded-lg border border-white/10 bg-[#0d101b] px-3 py-2 text-sm text-slate-300"
                >
                  <option value="narrow">แคบ</option>
                  <option value="medium">มาตรฐาน</option>
                  <option value="wide">กว้าง</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="reader-theme"
                  className="text-xs uppercase tracking-[0.18em] text-slate-500"
                >
                  ธีม
                </label>

                <div className="mt-2 flex gap-2">
                  {(
                    [
                      ["night", "กลางคืน"],
                      ["paper", "กระดาษ"],
                      ["black", "ดำ"],
                    ] as const
                  ).map(([theme, label]) => (
                    <button
                      key={theme}
                      type="button"
                      onClick={() =>
                        setSettings((current) => ({
                          ...current,
                          theme,
                        }))
                      }
                      className={[
                        "rounded-lg border px-3 py-2 text-xs transition",
                        settings.theme === theme
                          ? "border-amber-200/40 bg-amber-200/10 text-amber-100"
                          : "border-white/10 text-slate-400 hover:bg-white/5",
                      ].join(" ")}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={resetSettings}
                  className="mt-2 text-xs text-slate-500 underline-offset-4 hover:text-slate-300 hover:underline"
                >
                  คืนค่าเริ่มต้น
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <article
        className={[
          "mx-auto mt-4 mb-24 rounded-3xl border px-6 py-12 shadow-2xl transition-colors md:mb-0 md:px-14 md:py-16",
          themeClasses[settings.theme],
          widthClasses[settings.width],
        ].join(" ")}
      >
        <header className="text-center">
          <p className="section-kicker">{chapterOrder}</p>

          <h1 className="gold-text mt-5 text-4xl font-semibold md:text-6xl">
            {chapterTitle}
          </h1>
        </header>

        <div className="crack-line my-10" />

        <div ref={articleRef} className="prose-novel" style={readerStyle}>
          {paragraphs.map((paragraph, index) => {
            const isDialogue = paragraph.startsWith("“");

            return (
              <p
                key={`${chapterSlug}-${index}`}
                className={isDialogue ? "dialogue" : undefined}
              >
                {paragraph}
              </p>
            );
          })}
        </div>

        <div className="crack-line my-10" />

        <nav className="grid gap-4 sm:grid-cols-2">
          {previousChapter ? (
            <Link
              href={`/read/${previousChapter.slug}`}
              className="rounded-2xl border border-current/10 p-4 transition hover:bg-white/5"
            >
              <span className="text-xs opacity-60">ตอนก่อนหน้า</span>
              <p className="mt-1 text-amber-300">← {previousChapter.title}</p>
            </Link>
          ) : (
            <div />
          )}

          {nextChapter && (
            <Link
              href={`/read/${nextChapter.slug}`}
              className="rounded-2xl border border-current/10 p-4 text-right transition hover:bg-white/5"
            >
              <span className="text-xs opacity-60">ตอนถัดไป</span>
              <p className="mt-1 text-amber-300">{nextChapter.title} →</p>
            </Link>
          )}
        </nav>
      </article>

      <div className="fixed bottom-21 right-4 z-50 flex flex-col gap-3 md:bottom-5 md:right-5">
        <button
          type="button"
          onClick={goToTop}
          aria-label="กลับขึ้นด้านบน"
          className="grid h-12 w-12 place-items-center rounded-full border border-amber-200/30 bg-[#0b0e17]/95 text-amber-100 shadow-xl backdrop-blur transition hover:-translate-y-1 hover:bg-amber-200/10"
        >
          ↑
        </button>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#080a11]/95 px-3 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-10px_35px_rgba(0,0,0,0.3)] backdrop-blur-xl md:hidden">
        <div className="mx-auto grid max-w-xl grid-cols-2 gap-3">
          {previousChapter ? (
            <Link
              href={`/read/${previousChapter.slug}`}
              className="truncate rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-300"
            >
              ← {previousChapter.title}
            </Link>
          ) : (
            <span />
          )}

          {nextChapter && (
            <Link
              href={`/read/${nextChapter.slug}`}
              className="truncate rounded-xl border border-white/10 px-3 py-2 text-right text-sm text-amber-200"
            >
              {nextChapter.title} →
            </Link>
          )}
        </div>
      </div>

      {showContents && (
        <div
          id="reader-contents"
          className="fixed inset-0 z-80 bg-black/70 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="สารบัญนิยาย"
        >
          <button
            type="button"
            aria-label="ปิดสารบัญ"
            onClick={() => setShowContents(false)}
            className="absolute inset-0"
          />

          <aside className="absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto border-l border-white/10 bg-[#0a0d16] p-6 shadow-2xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="section-kicker">Book I</p>
                <h2 className="mt-2 text-2xl font-semibold text-amber-100">
                  สารบัญ
                </h2>
              </div>

              <button
                type="button"
                autoFocus
                aria-label="ปิดสารบัญ"
                onClick={() => setShowContents(false)}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-slate-300 hover:bg-white/5"
              >
                ×
              </button>
            </div>

            <div className="mt-8 space-y-3">
              {allChapters.map((chapter) => {
                const active = chapter.slug === chapterSlug;

                return (
                  <Link
                    key={chapter.slug}
                    href={`/read/${chapter.slug}`}
                    onClick={() => setShowContents(false)}
                    className={[
                      "block rounded-2xl border p-4 transition",
                      active
                        ? "border-amber-200/40 bg-amber-200/10"
                        : "border-white/10 hover:bg-white/5",
                    ].join(" ")}
                  >
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      {chapter.order}
                    </p>
                    <p className="mt-1 text-amber-100">{chapter.title}</p>
                  </Link>
                );
              })}
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

"use client";

import Link from "next/link";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { ArrowIcon } from "@/components/icons";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

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
    "bg-[#1d0f19] text-[#ecdfe6] border-[#4a2639]",
  paper:
    "bg-[#f4ebe2] text-[#24141d] border-[#d7c2b4]",
  black:
    "bg-black text-[#ddd3d8] border-[#2a1f25]",
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
          className="h-full bg-[var(--foil)] transition-[width] duration-150"
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
                  className="mt-2 w-full rounded-lg border border-white/10 bg-[var(--cloth-deep)] px-3 py-2 text-sm text-slate-300"
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
          "reader-card mx-auto mt-4 mb-24 rounded-3xl border px-6 py-12 transition-colors md:mb-0 md:px-14 md:py-16",
          themeClasses[settings.theme],
          widthClasses[settings.width],
        ].join(" ")}
        data-reader-theme={settings.theme}
      >
        <header className="text-center">
          <h1 className="reader-title text-4xl md:text-6xl">
            {chapterTitle}
          </h1>
          <p className="arcana-index mt-4 text-sm uppercase text-amber-200">{chapterOrder}</p>
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
              <p className="mt-1 text-amber-300">{previousChapter.title}</p>
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
              <p className="mt-1 text-amber-300">{nextChapter.title}</p>
            </Link>
          )}
        </nav>
      </article>

      <div className="fixed bottom-21 right-4 z-50 flex flex-col gap-3 md:bottom-5 md:right-5">
        <button
          type="button"
          onClick={goToTop}
          aria-label="กลับขึ้นด้านบน"
          className="grid h-12 w-12 place-items-center rounded-full border border-amber-200/30 bg-[var(--cloth-deep)] text-amber-100 shadow-xl transition hover:-translate-y-1"
        >
          <ArrowIcon className="h-5 w-5 -rotate-90" />
        </button>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[var(--cloth-deep)] px-3 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-10px_35px_rgba(0,0,0,0.3)] backdrop-blur-xl md:hidden">
        <div className="mx-auto grid max-w-xl grid-cols-2 gap-3">
          {previousChapter ? (
            <Link
              href={`/read/${previousChapter.slug}`}
              className="truncate rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-300"
            >
              {previousChapter.title}
            </Link>
          ) : (
            <span />
          )}

          {nextChapter && (
            <Link
              href={`/read/${nextChapter.slug}`}
              className="truncate rounded-xl border border-white/10 px-3 py-2 text-right text-sm text-amber-200"
            >
              {nextChapter.title}
            </Link>
          )}
        </div>
      </div>

      <Sheet open={showContents} onOpenChange={setShowContents}>
        <SheetContent id="reader-contents" side="right" className="deck-sheet w-full overflow-y-auto sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="text-2xl font-normal text-amber-100">สารบัญ</SheetTitle>
            <SheetDescription className="text-slate-400">เลือกตอนที่ต้องการอ่าน</SheetDescription>
          </SheetHeader>

          <div className="space-y-3 px-4 pb-6">
            {allChapters.map((chapter) => {
              const active = chapter.slug === chapterSlug;

              return (
                <SheetClose key={chapter.slug} asChild>
                  <Link
                    href={`/read/${chapter.slug}`}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "block rounded-2xl border p-4 transition",
                      active
                        ? "border-amber-200/40 bg-amber-200/10"
                        : "border-white/10 hover:bg-white/5",
                    ].join(" ")}
                  >
                    <p className="text-amber-100">{chapter.title}</p>
                    <p className="arcana-index mt-1 text-xs uppercase text-slate-400">
                      {chapter.order}
                    </p>
                  </Link>
                </SheetClose>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

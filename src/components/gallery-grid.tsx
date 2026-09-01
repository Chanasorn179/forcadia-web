"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { GalleryItem } from "@/data/gallery";

type Props = {
  items: GalleryItem[];
};

const categoryLabels = {
  all: "ทั้งหมด",
  imperial: "ตราจักรวรรดิ",
  house: "ตราตระกูล",
} as const;

type Category = keyof typeof categoryLabels;

export function GalleryGrid({ items }: Props) {
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const [category, setCategory] = useState<Category>("all");
  const [selectedItem, setSelectedItem] =
    useState<GalleryItem | null>(null);

  const filteredItems =
    category === "all"
      ? items
      : items.filter((item) => item.category === category);

  useEffect(() => {
    if (!selectedItem) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const opener = openerRef.current;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedItem(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      opener?.focus();
    };
  }, [selectedItem]);

  return (
    <>
      <div className="mt-8 flex flex-wrap gap-3">
        {(Object.keys(categoryLabels) as Category[]).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            aria-pressed={category === item}
            className={[
              "min-h-11 rounded-full border px-5 py-2 text-sm transition",
              category === item
                ? "border-amber-200/40 bg-amber-200/10 text-amber-100"
                : "border-white/10 text-slate-400 hover:border-white/20 hover:bg-white/5 hover:text-slate-200",
            ].join(" ")}
          >
            {categoryLabels[item]}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item, index) => (
          <article
            key={item.id}
            className="glass-panel card-hover group overflow-hidden rounded-3xl"
          >
            <button
              type="button"
              onClick={(event) => {
                openerRef.current = event.currentTarget;
                setSelectedItem(item);
              }}
              className="block w-full text-left"
              aria-label={`เปิดภาพ ${item.title}`}
              aria-haspopup="dialog"
            >
              <div
                className="relative aspect-square overflow-hidden border-b border-white/10"
                style={{
                  background: `radial-gradient(circle at center, ${item.accent}1f, rgba(5, 7, 14, 0.96) 68%)`,
                }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  loading={index === 0 ? "eager" : "lazy"}
                  className="object-contain p-7 transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />

                <span className="absolute bottom-4 right-4 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs text-slate-200 opacity-0 backdrop-blur transition group-hover:opacity-100">
                  ขยายภาพ
                </span>
              </div>

              <div className="p-6">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                  {categoryLabels[item.category]}
                </p>

                <h2 className="mt-3 text-2xl text-amber-100">
                  {item.title}
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  {item.subtitle}
                </p>

                <p className="mt-4 line-clamp-2 text-sm leading-7 text-slate-500">
                  {item.description}
                </p>
              </div>
            </button>

            <div className="border-t border-white/10 px-6 py-4">
              <Link
                href={item.href}
                className="inline-flex min-h-11 items-center text-sm text-amber-200 transition hover:translate-x-1"
              >
                เปิดบันทึกที่เกี่ยวข้อง →
              </Link>
            </div>
          </article>
        ))}
      </div>

      {selectedItem && (
        <div
          className="fixed inset-0 z-80 grid place-items-center bg-black/85 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={`ภาพ ${selectedItem.title}`}
        >
          <button
            type="button"
            aria-label="ปิดภาพ"
            onClick={() => setSelectedItem(null)}
            className="absolute inset-0"
          />

          <div className="glass-panel relative z-10 w-full max-w-5xl overflow-hidden rounded-3xl">
            <div
              className="relative h-[65vh] min-h-80"
              style={{
                background: `radial-gradient(circle at center, ${selectedItem.accent}24, rgba(4, 6, 12, 0.98) 70%)`,
              }}
            >
              <Image
                src={selectedItem.image}
                alt={selectedItem.title}
                fill
                priority
                className="object-contain p-5 md:p-10"
                sizes="100vw"
              />
            </div>

            <div className="flex flex-col gap-4 border-t border-white/10 p-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                  {categoryLabels[selectedItem.category]}
                </p>

                <h2 className="mt-2 text-2xl text-amber-100">
                  {selectedItem.title}
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  {selectedItem.subtitle}
                </p>
              </div>

              <div className="flex gap-3">
                <Link
                  href={selectedItem.href}
                  className="rounded-full border border-amber-200/30 px-5 py-3 text-sm text-amber-100 transition hover:bg-amber-200/10"
                >
                  เปิดบันทึก
                </Link>

                <button
                  type="button"
                  autoFocus
                  onClick={() => setSelectedItem(null)}
                  className="rounded-full border border-white/10 px-5 py-3 text-sm text-slate-300 transition hover:bg-white/5"
                >
                  ปิด
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

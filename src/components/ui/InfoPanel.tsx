"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { CSSProperties } from "react";
import { allArchiveEntries } from "@/data/archive";
import { useArchiveStore } from "@/store/archiveStore";

export function InfoPanel() {
  const selectedId = useArchiveStore((state) => state.selectedObject);
  const open = useArchiveStore((state) => state.panelOpen);
  const close = useArchiveStore((state) => state.closePanel);
  const select = useArchiveStore((state) => state.selectObject);
  const selected = allArchiveEntries.find((entry) => entry.id === selectedId);
  const related = selected ? allArchiveEntries.filter((entry) => entry.location === selected.location) : [];
  const index = selected ? related.findIndex((entry) => entry.id === selected.id) : -1;

  function move(direction: number) {
    if (!related.length) return;
    select(related[(index + direction + related.length) % related.length].id);
  }

  return (
    <AnimatePresence>
      {open && selected ? (
        <motion.aside
          className="archive-info"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 80 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          aria-label={`${selected.title} information`}
        >
          <button className="archive-close" type="button" onClick={close} aria-label="Close information panel">×</button>
          <p className="archive-kicker">{selected.category}</p>
          <div className="archive-info__index">{String(index + 1).padStart(2, "0")} <span>/ {String(related.length).padStart(2, "0")}</span></div>
          {selected.image ? (
            <div className="archive-info__image" style={{ "--entry-accent": selected.accent ?? "#c8a56a" } as CSSProperties}>
              <Image src={selected.image} alt="" fill sizes="360px" className="object-contain" />
            </div>
          ) : (
            <div className="archive-info__image archive-info__map" aria-hidden="true"><span>✦</span><i /><b /></div>
          )}
          <p className="archive-info__subtitle">{selected.subtitle}</p>
          <h2>{selected.title}</h2>
          <div className="archive-info__rule"><span /></div>
          <p className="archive-info__description">{selected.description}</p>
          <p className="archive-info__meta">{selected.meta}</p>
          {selected.href ? <Link className="archive-record-link" href={selected.href}>อ่านเรื่องราวฉบับเต็ม ↗</Link> : null}
          <div className="archive-info__controls">
            <button type="button" onClick={() => move(-1)} aria-label="Previous record">← <span>Previous</span></button>
            <button type="button" onClick={() => move(1)} aria-label="Next record"><span>Next</span> →</button>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}

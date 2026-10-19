"use client";

import { motion } from "framer-motion";

export function LoadingScreen({ progress, visible }: { progress: number; visible: boolean }) {
  return (
    <motion.div
      className="archive-loading"
      initial={false}
      animate={{ opacity: visible ? 1 : 0, visibility: visible ? "visible" : "hidden" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{ pointerEvents: visible ? "auto" : "none" }}
      aria-live="polite"
      aria-hidden={!visible}
    >
      <div className="archive-loading__sigil" aria-hidden="true"><span>✦</span></div>
      <p className="archive-kicker">The crown remembers</p>
      <h1>FORCADIA</h1>
      <p className="archive-loading__title">Imperial Archive</p>
      <div className="archive-loading__progress" aria-label={`Loading ${progress}%`}>
        <motion.span animate={{ width: `${progress}%` }} transition={{ ease: "easeOut", duration: 0.2 }} />
      </div>
      <p className="archive-loading__status">Opening the archive… <strong>{progress}</strong></p>
    </motion.div>
  );
}

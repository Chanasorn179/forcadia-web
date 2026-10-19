"use client";

import { motion } from "framer-motion";
import { archiveLocations } from "@/data/archive";
import { useArchiveStore } from "@/store/archiveStore";

export function ArchiveNavigation() {
  const current = useArchiveStore((state) => state.currentLocation);
  const setLocation = useArchiveStore((state) => state.setLocation);
  return (
    <motion.nav className="archive-bottom-nav" aria-label="Camera locations" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.6 }}>
      {archiveLocations.map((location) => (
        <button
          key={location.id}
          type="button"
          className={current === location.id ? "active" : ""}
          aria-current={current === location.id ? "true" : undefined}
          onClick={() => setLocation(location.id)}
        >
          <span>{location.eyebrow}</span>
          <strong>{location.label}</strong>
          <small>{location.shortLabel}</small>
        </button>
      ))}
    </motion.nav>
  );
}

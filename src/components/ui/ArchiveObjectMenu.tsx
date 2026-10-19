"use client";

import { allArchiveEntries } from "@/data/archive";
import { useArchiveStore } from "@/store/archiveStore";

export function ArchiveObjectMenu() {
  const location = useArchiveStore((state) => state.currentLocation);
  const panelOpen = useArchiveStore((state) => state.panelOpen);
  const select = useArchiveStore((state) => state.selectObject);
  const entries = allArchiveEntries.filter((entry) => entry.location === location);
  if (!entries.length || panelOpen) return null;

  return (
    <nav className="archive-object-menu" aria-label="Nearby interactive records">
      <p>Nearby records</p>
      {entries.map((entry, index) => (
        <button key={entry.id} type="button" onClick={() => select(entry.id)} aria-label={`Inspect ${entry.title}`}>
          <i>{String(index + 1).padStart(2, "0")}</i><span>{entry.title}</span>
        </button>
      ))}
    </nav>
  );
}

"use client";

import { useArchiveStore } from "@/store/archiveStore";

export function PhotoMode() {
  const photoMode = useArchiveStore((state) => state.photoMode);
  const setPhotoMode = useArchiveStore((state) => state.setPhotoMode);
  return photoMode ? (
    <div className="archive-photo-exit"><p>PHOTO MODE <span>Drag to look · Scroll to zoom</span></p><button type="button" onClick={() => setPhotoMode(false)}>Exit Photo Mode</button></div>
  ) : (
    <button className="archive-icon-button archive-photo-button" type="button" onClick={() => setPhotoMode(true)} aria-label="Enter photo mode">⌾ <span>Photo mode</span></button>
  );
}

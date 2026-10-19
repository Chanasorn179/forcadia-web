"use client";

import { useArchiveStore } from "@/store/archiveStore";

export function AudioControls() {
  const ambient = useArchiveStore((state) => state.ambientSound);
  const music = useArchiveStore((state) => state.music);
  const volume = useArchiveStore((state) => state.volume);
  const setOption = useArchiveStore((state) => state.setOption);
  const setVolume = useArchiveStore((state) => state.setVolume);
  return (
    <div className="archive-audio" aria-label="Audio controls">
      <button type="button" onClick={() => setOption("music", !music)} aria-pressed={music} aria-label={`Turn music ${music ? "off" : "on"}`}><span>♫</span> Music <i>{music ? "On" : "Off"}</i></button>
      <button type="button" onClick={() => setOption("ambientSound", !ambient)} aria-pressed={ambient} aria-label={`Turn ambience ${ambient ? "off" : "on"}`}><span>≈</span> Ambience <i>{ambient ? "On" : "Off"}</i></button>
      <label><span className="sr-only">Volume</span><input type="range" min="0" max="1" step="0.05" value={volume} onChange={(event) => setVolume(Number(event.target.value))} aria-label="Volume" /></label>
    </div>
  );
}

"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { RenderingQuality } from "@/store/archiveStore";
import { useArchiveStore } from "@/store/archiveStore";

const options = [
  ["filmGrain", "Film grain"], ["bloom", "Soft bloom"], ["particles", "Dust particles"],
  ["ambientSound", "Ambient sound"], ["music", "Music"], ["reduceMotion", "Reduce motion"], ["hideUi", "Hide interface"],
] as const;

export function SettingsPanel() {
  const state = useArchiveStore();
  const { settingsOpen: open, toggleSettings: toggle, quality, setQuality, setOption } = state;

  async function toggleFullscreen() {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
    else await document.exitFullscreen();
  }

  return (
    <>
      <button className="archive-icon-button archive-settings-button" type="button" onClick={toggle} aria-expanded={open} aria-label="Open rendering settings">⚙</button>
      <AnimatePresence>
        {open ? (
          <motion.aside className="archive-settings" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            <div className="archive-settings__head"><div><p className="archive-kicker">System</p><h2>Archive Settings</h2></div><button type="button" onClick={toggle} aria-label="Close settings">×</button></div>
            <fieldset><legend>Rendering quality</legend><div className="archive-quality">
              {(["low", "medium", "high"] as RenderingQuality[]).map((item) => <button key={item} type="button" className={quality === item ? "active" : ""} onClick={() => setQuality(item)} aria-pressed={quality === item}>{item}</button>)}
            </div></fieldset>
            <div className="archive-setting-list">
              {options.map(([key, label]) => <label key={key}><span>{label}</span><input type="checkbox" checked={state[key]} onChange={(event) => setOption(key, event.target.checked)} /><i /></label>)}
            </div>
            <button type="button" className="archive-fullscreen" onClick={toggleFullscreen}>⛶ Toggle fullscreen</button>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </>
  );
}

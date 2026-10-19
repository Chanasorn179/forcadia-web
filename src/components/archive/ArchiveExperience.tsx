"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ArchiveNavigation } from "@/components/ui/ArchiveNavigation";
import { ArchiveObjectMenu } from "@/components/ui/ArchiveObjectMenu";
import { AudioControls } from "@/components/ui/AudioControls";
import { HeroOverlay } from "@/components/ui/HeroOverlay";
import { InfoPanel } from "@/components/ui/InfoPanel";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { PhotoMode } from "@/components/ui/PhotoMode";
import { SettingsPanel } from "@/components/ui/SettingsPanel";
import { archiveLocations } from "@/data/archive";
import { useAudio } from "@/hooks/useAudio";
import { useArchiveStore } from "@/store/archiveStore";

const ArchiveScene = dynamic(() => import("./ArchiveScene"), { ssr: false });

export function ArchiveExperience() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const entered = useArchiveStore((state) => state.enteredArchive);
  const photoMode = useArchiveStore((state) => state.photoMode);
  const hideUi = useArchiveStore((state) => state.hideUi);
  const filmGrain = useArchiveStore((state) => state.filmGrain);
  const setLocation = useArchiveStore((state) => state.setLocation);
  const closePanel = useArchiveStore((state) => state.closePanel);
  const toggleSettings = useArchiveStore((state) => state.toggleSettings);
  const setOption = useArchiveStore((state) => state.setOption);
  useAudio();

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 700px)").matches;
    setOption("reduceMotion", prefersReduced);
    if (mobile) useArchiveStore.getState().setQuality("low");
    let value = 0;
    const timer = window.setInterval(() => {
      value = Math.min(100, value + (value < 70 ? 9 : 4));
      setProgress(value);
      if (value === 100) {
        window.clearInterval(timer);
        window.setTimeout(() => setLoading(false), 380);
      }
    }, 85);
    return () => window.clearInterval(timer);
  }, [setOption]);

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closePanel();
        if (useArchiveStore.getState().settingsOpen) toggleSettings();
        if (useArchiveStore.getState().photoMode) useArchiveStore.getState().setPhotoMode(false);
        if (useArchiveStore.getState().hideUi) setOption("hideUi", false);
      }
      const number = Number(event.key);
      if (entered && number >= 1 && number <= 5) setLocation(archiveLocations[number - 1].id);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [closePanel, entered, setLocation, setOption, toggleSettings]);

  const uiHidden = photoMode || hideUi;
  return (
    <main className={`archive-experience ${filmGrain ? "has-grain" : ""}`}>
      <ArchiveScene />
      <div className="archive-vignette" aria-hidden="true" />
      <LoadingScreen progress={progress} visible={loading} />
      {!loading ? <HeroOverlay /> : null}
      {entered && !uiHidden ? (
        <div className="archive-interface">
          <div className="archive-mode-label"><span>✦</span><p>Imperial Archive<small>Interactive mode</small></p></div>
          <div className="archive-utility"><AudioControls /><SettingsPanel /><PhotoMode /></div>
          <InfoPanel />
          <ArchiveObjectMenu />
          <ArchiveNavigation />
          <p className="archive-key-hint"><kbd>1—5</kbd> Change view <kbd>ESC</kbd> Close</p>
        </div>
      ) : null}
      {entered && uiHidden ? (
        photoMode ? <PhotoMode /> : (
          <div className="archive-photo-exit"><p>INTERFACE HIDDEN <span>Press Escape to restore</span></p><button type="button" onClick={() => setOption("hideUi", false)}>Show Interface</button></div>
        )
      ) : null}
    </main>
  );
}

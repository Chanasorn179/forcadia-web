import { create } from "zustand";
import type { ArchiveLocationId } from "@/data/archive";

export type RenderingQuality = "low" | "medium" | "high";

type ArchiveState = {
  enteredArchive: boolean;
  currentLocation: ArchiveLocationId;
  selectedObject: string | null;
  hoveredObject: string | null;
  panelOpen: boolean;
  settingsOpen: boolean;
  photoMode: boolean;
  hideUi: boolean;
  quality: RenderingQuality;
  filmGrain: boolean;
  bloom: boolean;
  particles: boolean;
  ambientSound: boolean;
  music: boolean;
  volume: number;
  reduceMotion: boolean;
  enterArchive: () => void;
  setLocation: (location: ArchiveLocationId) => void;
  selectObject: (id: string | null) => void;
  setHoveredObject: (id: string | null) => void;
  closePanel: () => void;
  toggleSettings: () => void;
  setPhotoMode: (active: boolean) => void;
  setQuality: (quality: RenderingQuality) => void;
  setOption: (key: "filmGrain" | "bloom" | "particles" | "ambientSound" | "music" | "reduceMotion" | "hideUi", value: boolean) => void;
  setVolume: (volume: number) => void;
};

export const useArchiveStore = create<ArchiveState>((set) => ({
  enteredArchive: false,
  currentLocation: "grand-table",
  selectedObject: null,
  hoveredObject: null,
  panelOpen: false,
  settingsOpen: false,
  photoMode: false,
  hideUi: false,
  quality: "high",
  filmGrain: false,
  bloom: true,
  particles: true,
  ambientSound: false,
  music: false,
  volume: 0.45,
  reduceMotion: false,
  enterArchive: () => set({ enteredArchive: true, currentLocation: "grand-table" }),
  setLocation: (currentLocation) => set({ currentLocation, selectedObject: null, panelOpen: false }),
  selectObject: (selectedObject) => set({ selectedObject, panelOpen: Boolean(selectedObject) }),
  setHoveredObject: (hoveredObject) => set({ hoveredObject }),
  closePanel: () => set({ panelOpen: false, selectedObject: null }),
  toggleSettings: () => set((state) => ({ settingsOpen: !state.settingsOpen })),
  setPhotoMode: (photoMode) => set({ photoMode, settingsOpen: false, hoveredObject: null }),
  setQuality: (quality) => set({
    quality,
    bloom: quality !== "low",
    particles: quality !== "low",
  }),
  setOption: (key, value) => set({ [key]: value }),
  setVolume: (volume) => set({ volume }),
}));

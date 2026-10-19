"use client";

import { Sparkles } from "@react-three/drei";
import { useArchiveStore } from "@/store/archiveStore";

export function ParticleSystem() {
  const enabled = useArchiveStore((state) => state.particles);
  const quality = useArchiveStore((state) => state.quality);
  if (!enabled) return null;

  return (
    <Sparkles
      count={quality === "high" ? 90 : 42}
      scale={[18, 8, 15]}
      size={quality === "high" ? 1.2 : 0.8}
      speed={0.12}
      opacity={0.32}
      color="#d8c69f"
    />
  );
}

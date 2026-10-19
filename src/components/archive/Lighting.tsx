"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { PointLight } from "three";
import { useArchiveStore } from "@/store/archiveStore";

export function Lighting() {
  const candle = useRef<PointLight>(null);
  const quality = useArchiveStore((state) => state.quality);
  const shadowSize = quality === "high" ? 2048 : quality === "medium" ? 1024 : 512;

  useFrame(({ clock }) => {
    if (!candle.current) return;
    candle.current.intensity = 24 + Math.sin(clock.elapsedTime * 7) * 0.6 + Math.sin(clock.elapsedTime * 13) * 0.25;
  });

  return (
    <>
      <hemisphereLight intensity={0.85} color="#b7cbe9" groundColor="#473226" />
      <ambientLight intensity={0.22} color="#c2c9d9" />
      <directionalLight
        position={[0, 10, -8]}
        intensity={3.2}
        color="#9bbdec"
        castShadow={quality !== "low"}
        shadow-mapSize={[shadowSize, shadowSize]}
        shadow-camera-left={-13}
        shadow-camera-right={13}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-camera-far={40}
        shadow-normalBias={0.035}
        shadow-bias={-0.0001}
        shadow-radius={2}
      />
      <directionalLight position={[2, 6, 8]} intensity={1.35} color="#ffe0ac" />
      <pointLight ref={candle} position={[0, 3.4, 1]} intensity={24} distance={13} decay={2} color="#f2b65d" />
      <pointLight position={[-7, 4, 1]} intensity={22} distance={10} color="#e8c58c" />
      <pointLight position={[7, 3.5, -1]} intensity={16} distance={9} color="#b293db" />
      <pointLight position={[4.3, 3, -5]} intensity={10} distance={6} color="#9fcaff" />
    </>
  );
}

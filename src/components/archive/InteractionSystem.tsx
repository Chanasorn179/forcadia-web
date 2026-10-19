"use client";

import { Html, RoundedBox } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";
import type { ReactNode } from "react";
import { useArchiveStore } from "@/store/archiveStore";

type InteractableProps = {
  id: string;
  label: string;
  children: ReactNode;
  location?: "grand-table" | "world-map" | "eight-houses" | "restricted-archive" | "observatory";
};

export function Interactable({ id, label, children, location }: InteractableProps) {
  const hovered = useArchiveStore((state) => state.hoveredObject === id);
  const setHovered = useArchiveStore((state) => state.setHoveredObject);
  const select = useArchiveStore((state) => state.selectObject);
  const setLocation = useArchiveStore((state) => state.setLocation);
  const photoMode = useArchiveStore((state) => state.photoMode);

  function handleOver(event: ThreeEvent<PointerEvent>) {
    event.stopPropagation();
    if (photoMode) return;
    setHovered(id);
    document.body.style.cursor = "pointer";
  }

  function handleOut() {
    setHovered(null);
    document.body.style.cursor = "default";
  }

  function handleClick(event: ThreeEvent<MouseEvent>) {
    event.stopPropagation();
    if (photoMode) return;
    if (location) setLocation(location);
    window.setTimeout(() => select(id), 80);
  }

  return (
    <group onPointerOver={handleOver} onPointerOut={handleOut} onClick={handleClick}>
      {children}
      {hovered ? (
        <Html center position={[0, 0.8, 0]} distanceFactor={8} style={{ pointerEvents: "none" }}>
          <div className="archive-tooltip"><span>✦</span>{label}<small>Click to inspect</small></div>
        </Html>
      ) : null}
    </group>
  );
}

export function Hotspot({ id, label, position }: { id: string; label: string; position: [number, number, number] }) {
  return (
    <group position={position}>
      <Interactable id={id} label={label} location="world-map">
        <RoundedBox args={[0.16, 0.08, 0.16]} radius={0.04} smoothness={3}>
          <meshStandardMaterial color="#e4c58b" emissive="#c8a56a" emissiveIntensity={2} />
        </RoundedBox>
      </Interactable>
    </group>
  );
}

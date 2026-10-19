"use client";

import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import { useRef } from "react";
import { Vector3 } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import type { ArchiveLocationId } from "@/data/archive";
import { useArchiveStore } from "@/store/archiveStore";

const cameraPresets: Record<ArchiveLocationId, { position: [number, number, number]; target: [number, number, number] }> = {
  "grand-table": { position: [0, 6.4, 16.5], target: [0, 2.8, -1] },
  "world-map": { position: [0, 5.7, 2.8], target: [0, 0.85, 0] },
  "eight-houses": { position: [-7.4, 3.6, 6.8], target: [-7.4, 2.25, -1.6] },
  "restricted-archive": { position: [8.4, 2.8, 5.6], target: [7.5, 1.8, -2.7] },
  observatory: { position: [4.8, 3.8, 0.5], target: [4.3, 2.5, -5.5] },
};

const targetVector = new Vector3();
const positionVector = new Vector3();

export function CameraController() {
  const { camera, size } = useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const location = useArchiveStore((state) => state.currentLocation);
  const entered = useArchiveStore((state) => state.enteredArchive);
  const photoMode = useArchiveStore((state) => state.photoMode);
  const reduceMotion = useArchiveStore((state) => state.reduceMotion);

  useFrame((_, delta) => {
    if (photoMode) return;
    const preset = entered
      ? cameraPresets[location]
      : { position: [0, 5.3, 15.8] as [number, number, number], target: [0, 2.2, -1] as [number, number, number] };
    const duration = reduceMotion ? 0.12 : 0.72;
    targetVector.set(...preset.target);
    // Preserve the full exhibit on portrait screens instead of cropping its sides.
    const framing = Math.max(1, Math.min(2.3, 1.25 / (size.width / size.height)));
    positionVector.set(...preset.position).sub(targetVector).multiplyScalar(framing).add(targetVector);
    easing.damp3(camera.position, positionVector, duration, delta);
    if (controlsRef.current) {
      easing.damp3(controlsRef.current.target, targetVector, duration, delta);
      controlsRef.current.update();
    } else {
      camera.lookAt(targetVector);
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enabled={photoMode}
      enablePan={false}
      minDistance={4}
      maxDistance={17}
      minPolarAngle={0.55}
      maxPolarAngle={1.55}
      rotateSpeed={0.35}
      dampingFactor={0.08}
      enableDamping
    />
  );
}

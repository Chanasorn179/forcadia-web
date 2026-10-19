"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Stars } from "@react-three/drei";
import { ACESFilmicToneMapping, PCFShadowMap } from "three";
import { ArchiveArchitecture, Artwork, GiltFrame, WalnutMaterial } from "./ArchiveArchitecture";
import { memo, Suspense, useMemo, useRef } from "react";
import type { Group, Mesh } from "three";
import { CameraController } from "./CameraController";
import { Hotspot, Interactable } from "./InteractionSystem";
import { Lighting } from "./Lighting";
import { ParticleSystem } from "./ParticleSystem";
import { houseArchive } from "@/data/archive";
import { useArchiveStore } from "@/store/archiveStore";

function Bookshelf({ position, rotation = [0, 0, 0] }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  const quality = useArchiveStore((state) => state.quality);
  const shelves = useMemo(() => Array.from({ length: 6 }), []);
  const books = useMemo(() => Array.from({ length: 30 }), []);
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[3.2, 6.4, 0.55]} />
        <meshStandardMaterial color="#130e0c" roughness={0.8} />
      </mesh>
      <GiltFrame width={3.15} height={6.3} position={[0, 0, 0.37]} />
      {shelves.map((_, row) => (
        <mesh key={row} position={[0, -2.55 + row * 1.02, 0.36]} castShadow>
          <boxGeometry args={[3, 0.09, 0.72]} />
          <meshStandardMaterial color="#4a2d19" roughness={0.72} />
        </mesh>
      ))}
      {books.map((_, index) => {
        const row = Math.floor(index / 5);
        const column = index % 5;
        return (
          <group key={index} position={[-1.15 + column * 0.57, -2.15 + row * 1.02, 0.53]} rotation={[0, 0, (index % 5 === 0 ? -0.06 : 0)]}>
          <mesh castShadow>
            <boxGeometry args={[0.38 + (index % 3) * 0.035, 0.67 + (index % 2) * 0.15, 0.32]} />
            <meshStandardMaterial color={["#683640", "#304663", "#655031", "#335447"][index % 4]} roughness={0.7} />
          </mesh>
          {quality !== "low" ? [-0.24, 0.24].map((y) => <mesh key={y} position={[0, y, 0.165]}><boxGeometry args={[0.34, 0.026, 0.012]} /><meshStandardMaterial color="#c2a26d" metalness={0.5} roughness={0.4} /></mesh>) : null}
          <mesh position={[0, 0, 0.167]}><planeGeometry args={[0.08, 0.2]} /><meshStandardMaterial color="#bfa67a" metalness={0.35} roughness={0.4} /></mesh>
          </group>
        );
      })}
    </group>
  );
}

function GothicWindow() {
  return (
    <group position={[0, 4.2, -7.3]}>
      <mesh>
        <planeGeometry args={[7.2, 7]} />
        <meshBasicMaterial color="#071528" />
      </mesh>
      <Stars radius={15} depth={7} count={260} factor={1.6} saturation={0.2} fade speed={0.2} />
      <mesh position={[2, 1.3, 0.05]}>
        <circleGeometry args={[0.72, 48]} />
        <meshBasicMaterial color="#d8e3ed" toneMapped={false} />
      </mesh>
      {[-3.1, -1.55, 0, 1.55, 3.1].map((x) => (
        <mesh key={x} position={[x, 0, 0.1]}>
          <boxGeometry args={[0.12, 7.1, 0.18]} />
          <meshStandardMaterial color="#17191e" />
        </mesh>
      ))}
      <mesh position={[0, -0.1, 0.1]}>
        <boxGeometry args={[7.2, 0.12, 0.18]} />
        <meshStandardMaterial color="#17191e" />
      </mesh>
    </group>
  );
}

function Candle({ position }: { position: [number, number, number] }) {
  const flame = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (!flame.current) return;
    const pulse = 1 + Math.sin(clock.elapsedTime * 9 + position[0]) * 0.09;
    flame.current.scale.set(pulse, 1 + (pulse - 1) * 2, pulse);
  });
  return (
    <group position={position}>
      <mesh position={[0, -0.3, 0]} castShadow><cylinderGeometry args={[0.17, 0.21, 0.08, 24]} /><meshStandardMaterial color="#be9655" metalness={0.7} roughness={0.25} /></mesh>
      <mesh position={[0, -0.18, 0]}><cylinderGeometry args={[0.1, 0.14, 0.17, 24]} /><meshStandardMaterial color="#be9655" metalness={0.7} roughness={0.25} /></mesh>
      <mesh castShadow><cylinderGeometry args={[0.07, 0.09, 0.55, 12]} /><meshStandardMaterial color="#d5c6a8" /></mesh>
      <mesh ref={flame} position={[0, 0.38, 0]}><sphereGeometry args={[0.045, 16, 12]} /><meshBasicMaterial color="#ffdf9c" toneMapped={false} /></mesh>
    </group>
  );
}

function GrandTable() {
  return (
    <group position={[0, 0, 0]}>
      <RoundedBox args={[6.2, 0.38, 3.4]} radius={0.16} smoothness={4} position={[0, 1, 0]} castShadow receiveShadow>
        <WalnutMaterial />
      </RoundedBox>
      <group position={[0, 1.195, 0]} rotation={[-Math.PI / 2, 0, 0]}><GiltFrame width={5.95} height={3.15} /></group>
      <mesh position={[0, 0.65, 0]} castShadow><boxGeometry args={[5.65, 0.28, 2.95]} /><meshStandardMaterial color="#2c1d19" roughness={0.5} /></mesh>
      {[[-2.5, -1.2], [2.5, -1.2], [-2.5, 1.2], [2.5, 1.2]].map(([x, z]) => (
        <mesh key={`${x}-${z}`} position={[x, -0.05, z]} castShadow><cylinderGeometry args={[0.14, 0.2, 2.1, 12]} /><meshStandardMaterial color="#20130d" /></mesh>
      ))}
      <group position={[0, 1.23, 0]} rotation={[-Math.PI / 2, 0, -0.08]}>
        <Interactable id="shattered-ring-map" label="Survey the imperial map" location="world-map">
          <RoundedBox args={[3.75, 2.25, 0.06]} radius={0.07} smoothness={4}>
            <meshStandardMaterial color="#8e774c" roughness={1} emissive="#493a21" emissiveIntensity={0.22} />
          </RoundedBox>
          <GiltFrame width={3.55} height={2.05} position={[0, 0, 0.04]} />
          {[0.38, 0.7, 0.92].map((r) => <mesh key={r} position={[0, 0, 0.039]}><ringGeometry args={[r, r + 0.012, 96]} /><meshBasicMaterial color="#59422c" /></mesh>)}
          {houseArchive.map((house, i) => {
            const angle = i * Math.PI / 4;
            return <group key={house.id} position={[Math.cos(angle) * 1.32, Math.sin(angle) * 0.76, 0.045]}>
              <mesh><circleGeometry args={[0.22, 32]} /><meshBasicMaterial color="#3e3026" /></mesh>
              <Artwork url={house.image!} position={[0, 0, 0.006]} scale={[0.3, 0.36]} />
            </group>;
          })}
          <Artwork url="/images/crests-transparent/unity-crown.png" position={[0, 0, 0.05]} scale={[0.46, 0.58]} />
        </Interactable>
      </group>
      <group position={[-2.1, 1.35, 0.25]} rotation={[0, 0.25, 0]}>
        <Interactable id="imperial-codex" label="Open the Imperial Codex" location="grand-table">
          <RoundedBox args={[0.92, 0.22, 1.35]} radius={0.04} smoothness={3} castShadow><meshStandardMaterial color="#672c36" roughness={0.52} /></RoundedBox>
          <mesh position={[0.025, 0, 0.015]}><boxGeometry args={[0.88, 0.13, 1.27]} /><meshStandardMaterial color="#d9c9a2" roughness={0.9} /></mesh>
          <group position={[0, 0.12, 0]} rotation={[-Math.PI / 2, 0, 0]}><GiltFrame width={0.81} height={1.22} /></group>
          <Artwork url="/images/crests-transparent/unity-crown.png" position={[0, 0.125, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[0.65, 0.95]} />
        </Interactable>
      </group>
      <group position={[2.15, 1.35, 0.55]} rotation={[0, -0.3, 0]}>
        <Interactable id="sealed-timeline" label="Unroll the sealed timeline" location="grand-table">
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow><cylinderGeometry args={[0.14, 0.14, 1.25, 24]} /><meshStandardMaterial color="#cfb586" roughness={0.95} /></mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.145, 0.145, 0.1, 24]} /><meshStandardMaterial color="#6f2b32" roughness={0.65} /></mesh>
        </Interactable>
      </group>
      <Candle position={[-2.65, 1.52, -1.1]} />
      <Candle position={[2.65, 1.52, -1.1]} />
      <Candle position={[0, 1.52, 1.22]} />
      <Hotspot id="shattered-ring-map" label="Northern dominion" position={[-1.1, 1.31, -0.45]} />
    </group>
  );
}

function HouseGallery() {
  return (
    <group position={[-7.45, 2.15, -1.6]}>
      <RoundedBox args={[6.5, 4.8, 0.3]} radius={0.1} position={[-0.02, 0.08, -0.25]} receiveShadow><meshStandardMaterial color="#1d2531" roughness={0.6} /></RoundedBox>
      <GiltFrame width={6.35} height={4.65} position={[-0.02, 0.08, -0.075]} />
      {houseArchive.map((house, index) => {
        const column = index % 4;
        const row = Math.floor(index / 4);
        return (
          <group key={house.id} position={[-2.3 + column * 1.52, 1.18 - row * 2.2, 0]}>
            <Interactable id={house.id} label={`Inspect House ${house.title}`} location="eight-houses">
              <RoundedBox args={[1.12, 1.75, 0.12]} radius={0.08} smoothness={3} castShadow>
                <meshStandardMaterial color="#10141d" emissive={house.accent} emissiveIntensity={0.09} roughness={0.74} />
              </RoundedBox>
              <GiltFrame width={1.06} height={1.69} position={[0, 0, 0.085]} />
              <Artwork url={house.image!} position={[0, 0.12, 0.12]} scale={[0.92, 1.2]} />
              <mesh position={[0, -0.64, 0.1]}><boxGeometry args={[0.62, 0.025, 0.03]} /><meshBasicMaterial color={house.accent} /></mesh>
            </Interactable>
          </group>
        );
      })}
    </group>
  );
}

function RestrictedArchive() {
  return (
    <group position={[7.3, 0, -2.8]}>
      <Bookshelf position={[0, 2.2, 0]} rotation={[0, -0.28, 0]} />
      <mesh position={[-0.3, 0.08, 0.75]} castShadow receiveShadow><boxGeometry args={[1.5, 2.35, 1.6]} /><meshStandardMaterial color="#292331" roughness={0.4} metalness={0.18} /></mesh>
      <group position={[-0.3, 1.3, 0.75]} rotation={[0, -0.2, 0]}>
        <Interactable id="nightfall-ledger" label="Attempt to open the locked book" location="restricted-archive">
          <RoundedBox args={[0.95, 0.24, 1.3]} radius={0.06} smoothness={3}><meshStandardMaterial color="#131018" emissive="#63468b" emissiveIntensity={0.28} /></RoundedBox>
          <Artwork url="/images/crests-transparent/night-fall.png" position={[0, 0.135, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[0.72, 1.08]} />
        </Interactable>
      </group>
    </group>
  );
}

function Observatory() {
  const sphere = useRef<Group>(null);
  useFrame((_, delta) => {
    if (sphere.current) sphere.current.rotation.y += delta * 0.08;
  });
  return (
    <group position={[4.3, 2.5, -5.5]}>
      <Float speed={0.6} rotationIntensity={0.08} floatIntensity={0.08}>
        <group ref={sphere}>
          {[0, Math.PI / 2, Math.PI / 4].map((rotation, index) => (
            <mesh key={rotation} rotation={[rotation, rotation / 2, 0]}><torusGeometry args={[1.05 - index * 0.17, 0.026, 10, 64]} /><meshStandardMaterial color="#b58d4b" metalness={0.85} roughness={0.24} /></mesh>
          ))}
          <Interactable id="celestial-engine" label="Read the celestial engine" location="observatory">
            <mesh><sphereGeometry args={[0.18, 24, 16]} /><meshBasicMaterial color="#aac8ff" toneMapped={false} /></mesh>
          </Interactable>
        </group>
      </Float>
      <mesh position={[0, -1.75, 0]}><cylinderGeometry args={[0.15, 0.35, 2.5, 16]} /><meshStandardMaterial color="#45331f" metalness={0.45} /></mesh>
    </group>
  );
}

const SceneContent = memo(function SceneContent() {
  const quality = useArchiveStore((state) => state.quality);
  return (
    <>
      <color attach="background" args={["#05070b"]} />
      <fog attach="fog" args={["#0c1320", 22, 48]} />
      <Lighting />
      <CameraController />
      <ParticleSystem />
      <ArchiveArchitecture />
      <GothicWindow />
      <GrandTable />
      <HouseGallery />
      <RestrictedArchive />
      <Observatory />
      {quality !== "low" ? <Bookshelf position={[-7.7, 2.2, -5]} rotation={[0, Math.PI / 2, 0]} /> : null}
      {quality !== "low" ? <Bookshelf position={[7.7, 2.2, -5.7]} rotation={[0, -Math.PI / 2, 0]} /> : null}
      <Bookshelf position={[-5.5, 2.2, -7.2]} />
      <Bookshelf position={[6.2, 2.2, -7.2]} />
    </>
  );
});

export default function ArchiveScene() {
  const quality = useArchiveStore((state) => state.quality);
  const bloom = useArchiveStore((state) => state.bloom);
  return (
    <div className={`archive-canvas ${bloom ? "has-bloom" : ""}`} role="img" aria-label="Interactive three-dimensional Imperial Archive scene">
      <Canvas
        shadows={quality !== "low" ? { type: PCFShadowMap } : false}
        dpr={quality === "high" ? [1.5, 2] : quality === "medium" ? [1, 1.5] : 1}
        camera={{ position: [0, 5.3, 15.8], fov: 42, near: 0.1, far: 55 }}
        gl={{ antialias: true, powerPreference: "high-performance", alpha: false, toneMapping: ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
        performance={{ min: 0.55 }}
        fallback={<div className="archive-webgl-fallback"><span>✦</span><p>The illustrated archive is open.<small>3D rendering is unavailable on this device.</small></p></div>}
      >
        <Suspense fallback={null}><SceneContent /></Suspense>
      </Canvas>
    </div>
  );
}

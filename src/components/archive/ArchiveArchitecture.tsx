"use client";

import { useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import { CanvasTexture, RepeatWrapping, SRGBColorSpace } from "three";
import { useArchiveStore } from "@/store/archiveStore";

type Vec3 = [number, number, number];

export function WalnutMaterial() {
  const gl = useThree((state) => state.gl);
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 256;
    const context = canvas.getContext("2d")!;
    const pixels = context.createImageData(512, 256);
    for (let y = 0; y < 256; y++) {
      for (let x = 0; x < 512; x++) {
        const wave = y + Math.sin(x * 0.014) * 5 + Math.sin(x * 0.034 + y * 0.03) * 2;
        const grain = Math.sin(wave * 1.8) * 9 + Math.sin(wave * 0.27) * 13;
        const fleck = Math.sin(x * 127.1 + y * 311.7) * 3;
        const offset = (y * 512 + x) * 4;
        pixels.data[offset] = 92 + grain + fleck;
        pixels.data[offset + 1] = 53 + grain * 0.6 + fleck;
        pixels.data[offset + 2] = 32 + grain * 0.35;
        pixels.data[offset + 3] = 255;
      }
    }
    context.putImageData(pixels, 0, 0);
    const map = new CanvasTexture(canvas);
    map.colorSpace = SRGBColorSpace;
    map.wrapS = map.wrapT = RepeatWrapping;
    map.anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy());
    return map;
  }, [gl]);
  useEffect(() => () => texture.dispose(), [texture]);
  return <meshStandardMaterial map={texture} roughness={0.42} metalness={0.08} />;
}

export function Artwork({ url, position = [0, 0, 0], rotation = [0, 0, 0], scale }: {
  url: string; position?: Vec3; rotation?: Vec3; scale: [number, number];
}) {
  const original = useTexture(url);
  const gl = useThree((state) => state.gl);
  const quality = useArchiveStore((state) => state.quality);
  const texture = useMemo(() => {
    const copy = original.clone();
    copy.colorSpace = SRGBColorSpace;
    copy.anisotropy = Math.min(gl.capabilities.getMaxAnisotropy(), quality === "high" ? 16 : quality === "medium" ? 8 : 2);
    copy.needsUpdate = true;
    return copy;
  }, [original, gl, quality]);
  useEffect(() => () => texture.dispose(), [texture]);
  return <mesh position={position} rotation={rotation}>
    <planeGeometry args={scale} />
    <meshBasicMaterial map={texture} transparent alphaTest={0.02} toneMapped={false} />
  </mesh>;
}

export function GiltFrame({ width, height, position = [0, 0, 0] }: { width: number; height: number; position?: Vec3 }) {
  return <group position={position}>
    {[-1, 1].map((side) => <group key={side}>
      <mesh position={[side * width / 2, 0, 0]} castShadow><boxGeometry args={[0.045, height + 0.045, 0.065]} /><meshStandardMaterial color="#cba56b" metalness={0.65} roughness={0.3} /></mesh>
      <mesh position={[0, side * height / 2, 0]} castShadow><boxGeometry args={[width, 0.045, 0.065]} /><meshStandardMaterial color="#cba56b" metalness={0.65} roughness={0.3} /></mesh>
    </group>)}
  </group>;
}

export function ArchiveArchitecture() {
  return <group>
    <mesh position={[0, -1.1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[32, 28]} /><meshStandardMaterial color="#252b35" roughness={0.32} metalness={0.18} />
    </mesh>
    {Array.from({ length: 15 }, (_, i) => (i - 7) * 2).map((offset) => <group key={offset}>
      <mesh position={[offset, -1.09, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[0.018, 28]} /><meshStandardMaterial color="#6d7076" roughness={0.5} /></mesh>
      <mesh position={[0, -1.088, offset]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[32, 0.018]} /><meshStandardMaterial color="#6d7076" roughness={0.5} /></mesh>
    </group>)}
    <group position={[0, -1.055, 0.8]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh receiveShadow><planeGeometry args={[8, 9]} /><meshStandardMaterial color="#39242c" roughness={1} /></mesh>
      <GiltFrame width={7.65} height={8.65} />
      <GiltFrame width={7.35} height={8.35} />
      <mesh position={[0, 0, 0.005]} rotation={[0, 0, Math.PI / 4]}><ringGeometry args={[1.95, 1.98, 4]} /><meshStandardMaterial color="#b8955b" /></mesh>
    </group>
    {[-10.9, 10.9].map((x) => <mesh key={x} position={[x, 3.5, -3.5]} receiveShadow><boxGeometry args={[0.4, 9.2, 10]} /><meshStandardMaterial color="#202631" roughness={0.8} /></mesh>)}
    {[-9.5, -3.85, 3.85, 9.5].map((x) => <group key={x} position={[x, 0, -7.65]}>
      <mesh position={[0, 3.35, 0]} castShadow><cylinderGeometry args={[0.2, 0.26, 8.8, 24]} /><meshStandardMaterial color="#49505b" roughness={0.55} metalness={0.12} /></mesh>
      {[-0.85, -0.55, 6.9, 7.3].map((y) => <mesh key={y} position={[0, y, 0]}><cylinderGeometry args={[0.35, 0.35, 0.16, 24]} /><meshStandardMaterial color="#af8b54" roughness={0.34} metalness={0.65} /></mesh>)}
    </group>)}
    {[0, -0.22].map((z, i) => <mesh key={z} position={[0, 4.2, -7.5 + z]}>
      <torusGeometry args={[3.75 + i * 0.16, 0.075, 12, 80, Math.PI]} /><meshStandardMaterial color={i ? "#455263" : "#bf9b62"} metalness={0.55} roughness={0.32} />
    </mesh>)}
    <mesh position={[0, 7.85, -7.5]}><octahedronGeometry args={[0.2]} /><meshStandardMaterial color="#d9bb7c" metalness={0.6} roughness={0.24} /></mesh>
    <Artwork url="/images/crests-transparent/unity-crown.png" position={[0, 5.8, -7.08]} scale={[1.05, 1.45]} />
  </group>;
}

import { useMemo, type ReactNode } from "react";
import * as THREE from "three";
import { L, S, type FaceKind } from "@/lib/catalog";
import { useSanctum } from "@/lib/store";
import { useMats } from "./materials";

export function triFaceGeometry() {
  const geo = new THREE.BufferGeometry();
  geo.setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array([-S, 0, 0, S, 0, 0, 0, L, 0]), 3),
  );
  geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array([0, 0, 1, 0, 0.5, 1]), 2));
  geo.setIndex([0, 1, 2]);
  geo.computeVertexNormals();
  return geo;
}

function Comet({ x, y, dir }: { x: number; y: number; dir: number }) {
  const mats = useMats();
  return (
    <group position={[x, y, 0.02]} rotation={[0, 0, dir]}>
      <mesh material={mats.brass} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.012, 0.022, 0.22, 8]} />
      </mesh>
      {[0.08, 0.16, 0.24].map((d, i) => (
        <mesh key={i} position={[0.018 + i * 0.01, d, 0]} material={mats.copper}>
          <boxGeometry args={[0.006, 0.14 - i * 0.02, 0.004]} />
        </mesh>
      ))}
    </group>
  );
}

export function OuterSkin({ onToggle }: { onToggle?: () => void }) {
  const mats = useMats();
  const geo = useMemo(() => triFaceGeometry(), []);
  return (
    <group>
      <mesh
        geometry={geo}
        material={mats.outer}
        castShadow
        receiveShadow
        onClick={(e) => {
          e.stopPropagation();
          if (useSanctum.getState().held) return;
          onToggle?.();
        }}
      />
      <mesh geometry={geo} position={[0, 0, -0.012]}>
        <meshStandardMaterial color="#1a7d7a" roughness={0.46} metalness={0.12} side={THREE.BackSide} />
      </mesh>
      <Comet x={-0.28} y={1.35} dir={0.35} />
      <Comet x={0.28} y={1.35} dir={-0.35} />
      <mesh position={[-0.32, 0.14, 0.018]} rotation={[Math.PI / 2, 0, 0]} material={mats.copper}>
        <cylinderGeometry args={[0.048, 0.048, 0.016, 20]} />
      </mesh>
      <mesh position={[0.32, 0.14, 0.018]} rotation={[Math.PI / 2, 0, 0]} material={mats.copper}>
        <cylinderGeometry args={[0.048, 0.048, 0.016, 20]} />
      </mesh>
    </group>
  );
}

function PegBits() {
  const mats = useMats();
  const pegs = useMemo(() => {
    const a: [number, number][] = [];
    for (let i = 0; i < 9; i++) a.push([-0.04, 0.72 + i * 0.14], [0.04, 0.72 + i * 0.14]);
    return a;
  }, []);
  return (
    <group>
      {pegs.map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.04]} rotation={[Math.PI / 2, 0, 0]} material={mats.wood} castShadow>
          <cylinderGeometry args={[0.022, 0.022, 0.07, 8]} />
        </mesh>
      ))}
    </group>
  );
}

function ShelfBits() {
  const mats = useMats();
  return (
    <group>
      {[0.38, 0.78, 1.18, 1.55].map((y) => {
        const w = Math.max(S * 2 * (1 - y / L) - 0.2, 0.2);
        return (
          <mesh key={y} position={[0, y, 0.035]} material={mats.wood} castShadow>
            <boxGeometry args={[w, 0.03, 0.07]} />
          </mesh>
        );
      })}
    </group>
  );
}

function VialBits() {
  const mats = useMats();
  return (
    <group>
      {[0.72, 0.94, 1.16, 1.36].map((y, i) => (
        <mesh key={i} position={[0, y, 0.04]} rotation={[0, 0, Math.PI / 2]} material={mats.glass} castShadow>
          <cylinderGeometry args={[0.048, 0.048, 0.62 - i * 0.04, 16]} />
        </mesh>
      ))}
    </group>
  );
}

const BITS: Record<FaceKind, () => ReactNode> = {
  pegs: () => <PegBits />,
  coils: () => null,
  shelves: () => <ShelfBits />,
  vials: () => <VialBits />,
};

export function InnerPanel({
  kind,
  children,
}: {
  kind: FaceKind;
  children?: ReactNode;
}) {
  const mats = useMats();
  const geo = useMemo(() => triFaceGeometry(), []);
  return (
    <group>
      <mesh geometry={geo} material={mats.inner[kind]} receiveShadow />
      <mesh geometry={geo} position={[0, 0, -0.01]}>
        <meshStandardMaterial color="#1a7d7a" roughness={0.46} metalness={0.12} side={THREE.BackSide} />
      </mesh>
      <mesh position={[0, 0.12, 0.02]} material={mats.copper}>
        <boxGeometry args={[S * 1.7, 0.008, 0.008]} />
      </mesh>
      {BITS[kind]()}
      {children}
    </group>
  );
}

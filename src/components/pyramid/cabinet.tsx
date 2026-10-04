import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useCursor } from "@react-three/drei";
import * as THREE from "three";
import { CLOSED, FACES, H, OPEN_SWING, S, SLOTS, type FaceId } from "@/lib/catalog";
import { useSanctum } from "@/lib/store";
import { InnerPanel, OuterSkin } from "./faces";
import { JewelryMesh } from "./jewelry-mesh";
import { useMats } from "./materials";
import { InnerShrine } from "./shrine";

function SlotPad({
  id,
  position,
  scale,
  visible,
}: {
  id: string;
  position: [number, number, number];
  scale: number;
  visible: boolean;
}) {
  const held = useSanctum((s) => s.held);
  const occupied = useSanctum((s) => s.placed[id]);
  const place = useSanctum((s) => s.place);
  const [hot, setHot] = useState(false);
  useCursor(hot && visible);
  const active = Boolean(held) && !occupied && visible;
  const mat = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (!mat.current) return;
    mat.current.emissiveIntensity = active ? 0.55 + Math.sin(state.clock.elapsedTime * 4) * 0.4 : occupied ? 0.15 : 0;
    mat.current.opacity = visible ? (active || occupied || held ? 0.95 : 0.35) : 0;
  });

  if (!visible && !occupied) return null;

  return (
    <group position={position}>
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          if (visible) setHot(true);
        }}
        onPointerOut={() => setHot(false)}
        onClick={(e) => {
          e.stopPropagation();
          if (visible) place(id);
        }}
      >
        <circleGeometry args={[0.16 * scale, 22]} />
        <meshStandardMaterial
          ref={mat}
          color={occupied ? "#1c8a86" : active ? "#e8e0d4" : "#6a6258"}
          emissive={active ? "#1c8a86" : occupied ? "#1c8a86" : "#000000"}
          roughness={0.35}
          metalness={0.25}
          transparent
          opacity={0.85}
          depthWrite={false}
        />
      </mesh>
      <mesh>
        <ringGeometry args={[0.1 * scale, 0.135 * scale, 24]} />
        <meshStandardMaterial
          color={occupied ? "#c9a24a" : active ? "#e8e0d4" : "#8a8278"}
          roughness={0.3}
          metalness={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>
      {occupied && (
        <group position={[0, 0, 0.09]}>
          <JewelryMesh id={occupied} scale={scale} />
        </group>
      )}
    </group>
  );
}

function FaceAssembly({
  face,
  outerAmt,
  innerAmt,
}: {
  face: FaceId;
  outerAmt: { current: number };
  innerAmt: { current: number };
}) {
  const kind = FACES[face].kind;
  const outer = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  const toggleFace = useSanctum((s) => s.toggleFace);
  const slots = SLOTS.filter((s) => s.face === face);

  useFrame((_, dt) => {
    const d = Math.min(dt, 0.1);
    const o = useSanctum.getState().open[face];
    const c = useSanctum.getState().core;
    outerAmt.current += (o - outerAmt.current) * (1 - Math.exp(-8 * d));
    innerAmt.current += (c - innerAmt.current) * (1 - Math.exp(-7 * d));
    if (outer.current) outer.current.rotation.x = outerAmt.current * OPEN_SWING;
    if (inner.current) inner.current.rotation.x = innerAmt.current * OPEN_SWING;
  });

  const showSlots = useSanctum((s) => s.open[face] > 0.5 && s.core < 0.5);

  return (
    <group rotation={[0, (face * Math.PI) / 2, 0]}>
      <group position={[0, 0, S]} rotation={[CLOSED, 0, 0]}>
        <group ref={inner}>
          <InnerPanel kind={kind}>
            {slots.map((s) => (
              <SlotPad key={s.id} id={s.id} position={s.pos} scale={s.scale} visible={showSlots} />
            ))}
          </InnerPanel>
        </group>
        <group ref={outer} position={[0, 0, 0.01]}>
          <OuterSkin onToggle={() => toggleFace(face)} />
        </group>
      </group>
    </group>
  );
}

function Stand() {
  const mats = useMats();
  const angs = [0, (Math.PI * 2) / 3, (Math.PI * 4) / 3];
  return (
    <group>
      <mesh position={[0, -0.04, 0]} material={mats.wood} receiveShadow castShadow>
        <boxGeometry args={[2.28, 0.07, 2.28]} />
      </mesh>
      {Array.from({ length: 28 }, (_, i) => {
        const t = (i / 28) * Math.PI * 2;
        const r = 1.12;
        return (
          <mesh key={i} position={[Math.sin(t) * r, -0.005, Math.cos(t) * r]} material={mats.silver}>
            <boxGeometry args={[0.09, 0.025, 0.09]} />
          </mesh>
        );
      })}
      {angs.map((a, i) => {
        const x = Math.sin(a) * 0.7;
        const z = Math.cos(a) * 0.7;
        return (
          <group key={i} position={[x, -0.88, z]} rotation={[0.16, a, 0]}>
            <mesh material={mats.black} castShadow>
              <boxGeometry args={[0.12, 1.68, 0.065]} />
            </mesh>
            <mesh position={[0, 0, 0.038]} material={mats.copper}>
              <boxGeometry args={[0.035, 1.68, 0.012]} />
            </mesh>
            <mesh position={[0, 0.12, 0]} rotation={[0, 0, Math.PI / 4]} material={mats.black}>
              <boxGeometry args={[0.15, 0.15, 0.08]} />
            </mesh>
            <mesh position={[0, -0.82, 0.04]} rotation={[Math.PI / 2, 0, 0]} material={mats.black}>
              <cylinderGeometry args={[0.035, 0.035, 0.12, 10]} />
            </mesh>
          </group>
        );
      })}
      <mesh position={[0, -1.58, 0]} material={mats.woodDark} castShadow>
        <sphereGeometry args={[0.17, 16, 12]} />
      </mesh>
    </group>
  );
}

function Cap() {
  const mats = useMats();
  return (
    <group position={[0, H + 0.06, 0]}>
      <mesh material={mats.gold} castShadow rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[0.1, 0.16, 4]} />
      </mesh>
      <mesh position={[0, 0.1, 0]} material={mats.tealLite}>
        <boxGeometry args={[0.055, 0.07, 0.055]} />
      </mesh>
    </group>
  );
}

function Cat() {
  const mats = useMats();
  return (
    <group position={[0.15, -1.15, 0.35]} rotation={[0, 0.4, 0]}>
      <mesh position={[0, 0.12, 0]} scale={[1.35, 0.7, 0.95]} material={mats.fur} castShadow>
        <sphereGeometry args={[0.22, 14, 10]} />
      </mesh>
      <mesh position={[0.05, 0.28, 0.16]} material={mats.fur} castShadow>
        <sphereGeometry args={[0.12, 12, 10]} />
      </mesh>
      <mesh position={[0.0, 0.38, 0.18]} rotation={[0.3, 0, -0.4]} material={mats.furDark}>
        <coneGeometry args={[0.038, 0.08, 3]} />
      </mesh>
      <mesh position={[0.1, 0.38, 0.16]} rotation={[0.3, 0, 0.35]} material={mats.furDark}>
        <coneGeometry args={[0.038, 0.08, 3]} />
      </mesh>
      {[-0.18, -0.1, -0.02, 0.06].map((t, i) => (
        <mesh
          key={i}
          position={[-0.22 - i * 0.06, 0.1 + Math.sin(t * 2) * 0.04, -0.06 - i * 0.03]}
          material={mats.fur}
        >
          <sphereGeometry args={[0.055 - i * 0.006, 8, 6]} />
        </mesh>
      ))}
    </group>
  );
}

export function Cabinet() {
  const outers = useMemo(() => [{ current: 0 }, { current: 0 }, { current: 0 }, { current: 0 }], []);
  const inners = useMemo(() => [{ current: 0 }, { current: 0 }, { current: 0 }, { current: 0 }], []);
  const shrineSlots = SLOTS.filter((s) => s.face === "shrine");
  const shrineVisible = useSanctum((s) => s.core > 0.4 || s.open.some((v) => v > 0.5));

  return (
    <group>
      <Stand />
      <Cap />
      <Cat />
      <InnerShrine />
      {([0, 1, 2, 3] as FaceId[]).map((i) => (
        <FaceAssembly key={i} face={i} outerAmt={outers[i]} innerAmt={inners[i]} />
      ))}
      <group>
        {shrineSlots.map((s) => (
          <SlotPad key={s.id} id={s.id} position={s.pos} scale={s.scale} visible={shrineVisible} />
        ))}
      </group>
    </group>
  );
}

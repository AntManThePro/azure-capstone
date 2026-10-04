import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import type { FaceKind } from "@/lib/catalog";

export type Mats = {
  teal: THREE.MeshStandardMaterial;
  tealLite: THREE.MeshStandardMaterial;
  copper: THREE.MeshStandardMaterial;
  brass: THREE.MeshStandardMaterial;
  silver: THREE.MeshStandardMaterial;
  wood: THREE.MeshStandardMaterial;
  woodDark: THREE.MeshStandardMaterial;
  frost: THREE.MeshStandardMaterial;
  glass: THREE.MeshStandardMaterial;
  black: THREE.MeshStandardMaterial;
  gold: THREE.MeshStandardMaterial;
  ground: THREE.MeshStandardMaterial;
  fur: THREE.MeshStandardMaterial;
  furDark: THREE.MeshStandardMaterial;
  outer: THREE.MeshStandardMaterial;
  inner: Record<FaceKind, THREE.MeshStandardMaterial>;
  mosaic: THREE.MeshStandardMaterial[];
};

const Ctx = createContext<Mats | null>(null);

function std(
  color: string,
  extra: ConstructorParameters<typeof THREE.MeshStandardMaterial>[0] = {},
) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.5, metalness: 0.08, ...extra });
}

export function MaterialsProvider({ children }: { children: ReactNode }) {
  const maps = useTexture({
    outer: "/cabinet/outer-face.jpg",
    pegs: "/cabinet/inner-pegs.jpg",
    coils: "/cabinet/inner-coils.jpg",
    shelves: "/cabinet/inner-shelves.jpg",
    vials: "/cabinet/inner-vials.jpg",
    wood: "/cabinet/wood.jpg",
    mosaic: "/cabinet/mosaic.jpg",
  });

  useEffect(() => {
    for (const t of Object.values(maps)) {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 4;
    }
    maps.wood.wrapS = maps.wood.wrapT = THREE.RepeatWrapping;
    maps.wood.repeat.set(2, 2);
    maps.mosaic.wrapS = maps.mosaic.wrapT = THREE.RepeatWrapping;
    maps.mosaic.repeat.set(2, 2);
  }, [maps]);

  const mats = useMemo<Mats>(() => {
    const innerOf = (map: THREE.Texture) =>
      std("#d8e0dc", { map, roughness: 0.55, metalness: 0.06, side: THREE.FrontSide });
    return {
      teal: std("#1a7d7a", { roughness: 0.46, metalness: 0.12, side: THREE.DoubleSide }),
      tealLite: std("#3aa8a2", { roughness: 0.4, metalness: 0.15 }),
      copper: std("#b56b32", { roughness: 0.28, metalness: 0.92 }),
      brass: std("#c9a24a", { roughness: 0.26, metalness: 0.9 }),
      silver: std("#c5c9ce", { roughness: 0.25, metalness: 0.86 }),
      wood: std("#c4a574", { roughness: 0.74, metalness: 0.04, map: maps.wood }),
      woodDark: std("#4a3426", { roughness: 0.68, metalness: 0.08 }),
      frost: std("#dce6e8", { roughness: 0.18, metalness: 0.12, transparent: true, opacity: 0.48 }),
      glass: std("#b9d4d8", { roughness: 0.08, metalness: 0.2, transparent: true, opacity: 0.32 }),
      black: std("#161412", { roughness: 0.48, metalness: 0.22 }),
      gold: std("#d4af6a", { roughness: 0.24, metalness: 0.92 }),
      ground: std("#171410", { roughness: 0.92, metalness: 0.04 }),
      fur: std("#3a2a22", { roughness: 0.92, metalness: 0 }),
      furDark: std("#1a1410", { roughness: 0.9, metalness: 0 }),
      outer: std("#1a7d7a", {
        map: maps.outer,
        roughness: 0.48,
        metalness: 0.14,
        side: THREE.FrontSide,
      }),
      inner: {
        pegs: innerOf(maps.pegs),
        coils: innerOf(maps.coils),
        shelves: innerOf(maps.shelves),
        vials: innerOf(maps.vials),
      },
      mosaic: ["#1a8a86", "#5ec4c0", "#d8ecec", "#7eb8b0", "#2a6f6c", "#c5e8e0"].map((c) =>
        std(c, { roughness: 0.32, metalness: 0.18, map: maps.mosaic }),
      ),
    };
  }, [maps]);

  useEffect(
    () => () => {
      for (const v of Object.values(mats)) {
        if (Array.isArray(v)) v.forEach((m) => m.dispose());
        else if (v && typeof v === "object" && "dispose" in v) (v as THREE.Material).dispose();
        else if (v && typeof v === "object") {
          for (const m of Object.values(v)) (m as THREE.Material).dispose?.();
        }
      }
    },
    [mats],
  );

  return <Ctx.Provider value={mats}>{children}</Ctx.Provider>;
}

export function useMats() {
  const m = useContext(Ctx);
  if (!m) throw new Error("MaterialsProvider missing");
  return m;
}

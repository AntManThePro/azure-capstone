import { useMemo } from "react";
import * as THREE from "three";
import { useMats } from "./materials";

function diamond(r: number) {
  const s = new THREE.Shape();
  const pts = [
    [0, r],
    [r * 0.72, 0],
    [0, -r],
    [-r * 0.72, 0],
  ];
  pts.forEach(([x, y], i) => (i ? s.lineTo(x, y) : s.moveTo(x, y)));
  s.closePath();
  return s;
}

function Terrace({ r, y, thick = 0.05 }: { r: number; y: number; thick?: number }) {
  const mats = useMats();
  const geo = useMemo(() => {
    const g = new THREE.ExtrudeGeometry(diamond(r), { depth: thick, bevelEnabled: false });
    g.rotateX(-Math.PI / 2);
    g.computeVertexNormals();
    return g;
  }, [r, thick]);
  const tiles = useMemo(() => {
    const a: [number, number][] = [];
    for (let i = 0; i < 4; i++) {
      const ang = (i / 4) * Math.PI * 2 + Math.PI / 4;
      a.push([Math.cos(ang) * (r * 0.62), Math.sin(ang) * (r * 0.62)]);
    }
    return a;
  }, [r]);

  return (
    <group position={[0, y, 0]}>
      <mesh geometry={geo} material={mats.frost} castShadow receiveShadow />
      {tiles.map(([x, z], i) => (
        <mesh key={i} position={[x, thick + 0.008, z]} material={mats.mosaic[i % mats.mosaic.length]}>
          <boxGeometry args={[0.07, 0.016, 0.07]} />
        </mesh>
      ))}
    </group>
  );
}

export function InnerShrine() {
  const mats = useMats();
  const rods: [number, number, number][] = [
    [0.18, 0.48, 0.14],
    [-0.16, 0.48, 0.12],
    [0.14, 0.82, -0.12],
    [-0.12, 0.82, -0.1],
  ];
  return (
    <group>
      <mesh position={[0, 0.03, 0]} material={mats.frost} receiveShadow>
        <boxGeometry args={[1.02, 0.05, 1.02]} />
      </mesh>
      <Terrace r={0.55} y={0.06} />
      <Terrace r={0.4} y={0.38} />
      <Terrace r={0.28} y={0.7} />
      <Terrace r={0.16} y={0.98} thick={0.04} />
      {rods.map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} material={mats.brass}>
          <cylinderGeometry args={[0.01, 0.01, 0.38, 8]} />
        </mesh>
      ))}
      <mesh position={[0.42, 0.1, 0.42]} material={mats.mosaic[0]}>
        <boxGeometry args={[0.06, 0.06, 0.016]} />
      </mesh>
      <mesh position={[-0.42, 0.1, 0.42]} material={mats.mosaic[1]}>
        <boxGeometry args={[0.06, 0.06, 0.016]} />
      </mesh>
      <mesh position={[0, 1.14, 0]} material={mats.gold} castShadow>
        <octahedronGeometry args={[0.06, 0]} />
      </mesh>
      <pointLight position={[0, 0.58, 0]} color="#ffd9a0" intensity={3.2} distance={2.8} />
      <pointLight position={[0, 1.05, 0]} color="#9fe8e2" intensity={0.9} distance={1.5} />
    </group>
  );
}

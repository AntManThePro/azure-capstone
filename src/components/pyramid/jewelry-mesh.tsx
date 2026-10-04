import { JEWELS } from "@/lib/catalog";

export function JewelryMesh({
  id,
  scale = 1,
}: {
  id: string;
  scale?: number;
}) {
  const j = JEWELS.find((x) => x.id === id);
  const metal = j?.metal ?? "#c0c6ce";
  const stone = j?.stone ?? "#1c8a86";

  if (id.startsWith("ring-")) {
    return (
      <group scale={scale * 1.15}>
        <mesh castShadow>
          <torusGeometry args={[0.08, 0.018, 12, 28]} />
          <meshStandardMaterial color={metal} metalness={0.85} roughness={0.28} />
        </mesh>
        <mesh position={[0.08, 0.02, 0.01]} castShadow>
          <octahedronGeometry args={[0.032, 0]} />
          <meshStandardMaterial color={stone} metalness={0.3} roughness={0.2} />
        </mesh>
      </group>
    );
  }
  if (id === "pearl-drop") {
    return (
      <group scale={scale * 1.1}>
        {[-0.06, 0.06].map((x) => (
          <group key={x} position={[x, 0, 0]}>
            <mesh position={[0, 0.06, 0]}>
              <sphereGeometry args={[0.016, 10, 8]} />
              <meshStandardMaterial color={metal} metalness={0.9} roughness={0.25} />
            </mesh>
            <mesh position={[0, 0.02, 0]} castShadow>
              <sphereGeometry args={[0.026, 12, 10]} />
              <meshStandardMaterial color={stone} roughness={0.32} metalness={0.08} />
            </mesh>
            <mesh position={[0, -0.025, 0]} castShadow>
              <sphereGeometry args={[0.034, 12, 10]} />
              <meshStandardMaterial color={stone} roughness={0.32} metalness={0.08} />
            </mesh>
          </group>
        ))}
      </group>
    );
  }
  if (id === "gold-chain") {
    return (
      <group scale={scale}>
        {[-0.1, -0.05, 0, 0.05, 0.1].map((x, i) => (
          <mesh key={x} position={[x, Math.sin(i) * 0.014, 0]} rotation={[0, 0, 0.4]} castShadow>
            <torusGeometry args={[0.022, 0.006, 8, 12]} />
            <meshStandardMaterial color={metal} metalness={0.9} roughness={0.24} />
          </mesh>
        ))}
      </group>
    );
  }
  if (id === "gold-discs") {
    return (
      <group scale={scale}>
        {[-0.06, 0.06].map((x) => (
          <mesh key={x} position={[x, 0, 0]} castShadow>
            <cylinderGeometry args={[0.05, 0.05, 0.01, 24]} />
            <meshStandardMaterial color={metal} metalness={0.92} roughness={0.22} />
          </mesh>
        ))}
      </group>
    );
  }
  if (id === "teal-pendant") {
    return (
      <group scale={scale * 1.15}>
        <mesh>
          <torusGeometry args={[0.018, 0.006, 8, 16]} />
          <meshStandardMaterial color={metal} metalness={0.9} roughness={0.3} />
        </mesh>
        <mesh position={[0, -0.08, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
          <octahedronGeometry args={[0.05, 0]} />
          <meshStandardMaterial color={stone} metalness={0.25} roughness={0.22} />
        </mesh>
      </group>
    );
  }
  if (id === "bead-strand") {
    return (
      <group scale={scale}>
        {Array.from({ length: 9 }, (_, i) => {
          const a = (i / 8) * Math.PI - Math.PI / 2;
          return (
            <mesh key={i} position={[Math.sin(a) * 0.1, -Math.cos(a) * 0.055, 0]} castShadow>
              <sphereGeometry args={[0.018, 10, 8]} />
              <meshStandardMaterial
                color={i % 2 ? stone : metal}
                metalness={i % 2 ? 0.15 : 0.85}
                roughness={0.3}
              />
            </mesh>
          );
        })}
      </group>
    );
  }
  if (id === "cuff") {
    return (
      <group scale={scale}>
        <mesh castShadow>
          <torusGeometry args={[0.095, 0.018, 10, 28, Math.PI * 1.6]} />
          <meshStandardMaterial color={metal} metalness={0.88} roughness={0.28} />
        </mesh>
      </group>
    );
  }
  if (id === "quartz") {
    return (
      <group scale={scale}>
        <mesh rotation={[0.4, 0.2, 0]} castShadow>
          <coneGeometry args={[0.048, 0.17, 5]} />
          <meshStandardMaterial color={stone} roughness={0.12} metalness={0.15} transparent opacity={0.85} />
        </mesh>
      </group>
    );
  }
  if (id === "studs") {
    return (
      <group scale={scale}>
        <mesh position={[-0.05, 0, 0]} castShadow>
          <sphereGeometry args={[0.036, 16, 12]} />
          <meshStandardMaterial color={stone} roughness={0.35} metalness={0.1} />
        </mesh>
        <mesh position={[0.05, 0, 0]} castShadow>
          <sphereGeometry args={[0.036, 16, 12]} />
          <meshStandardMaterial color={stone} roughness={0.35} metalness={0.1} />
        </mesh>
      </group>
    );
  }
  if (id === "locket") {
    return (
      <group scale={scale}>
        <mesh castShadow>
          <cylinderGeometry args={[0.06, 0.06, 0.018, 24]} />
          <meshStandardMaterial color={metal} metalness={0.88} roughness={0.32} />
        </mesh>
        <mesh position={[0, 0.012, 0.008]}>
          <torusGeometry args={[0.03, 0.006, 8, 16]} />
          <meshStandardMaterial color="#d4af6a" metalness={0.9} roughness={0.25} />
        </mesh>
      </group>
    );
  }
  return (
    <mesh scale={scale} castShadow>
      <cylinderGeometry args={[0.055, 0.055, 0.012, 24]} />
      <meshStandardMaterial color={metal} metalness={0.9} roughness={0.3} />
    </mesh>
  );
}

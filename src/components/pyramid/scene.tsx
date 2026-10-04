import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import { Cabinet } from "./cabinet";
import { MaterialsProvider, useMats } from "./materials";
import { Suspense } from "react";

function Lights() {
  const mats = useMats();
  return (
    <>
      <color attach="background" args={["#12100e"]} />
      <fog attach="fog" args={["#12100e", 12, 26]} />
      <hemisphereLight args={["#c8ddd8", "#2a2118", 0.5]} />
      <ambientLight intensity={0.26} />
      <directionalLight
        position={[4.2, 7.2, 5]}
        intensity={1.4}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={18}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />
      <directionalLight position={[-3.2, 2.2, -4]} intensity={0.38} color="#8eccc8" />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.78, 0]} material={mats.ground} receiveShadow>
        <circleGeometry args={[8, 48]} />
      </mesh>
      <ContactShadows position={[0, -1.77, 0]} opacity={0.48} scale={11} blur={2.4} far={4.5} />
    </>
  );
}

function World() {
  return (
    <MaterialsProvider>
      <Lights />
      <Cabinet />
    </MaterialsProvider>
  );
}

export function PyramidScene() {
  const [spin, setSpin] = useState(true);
  return (
    <Canvas
      className="h-full w-full touch-none"
      shadows
      dpr={[1, 2]}
      camera={{ position: [5.2, 2.9, 5.8], fov: 34, near: 0.1, far: 40 }}
      gl={{ antialias: true }}
    >
      <Suspense fallback={null}>
        <World />
      </Suspense>
      <OrbitControls
        makeDefault
        enablePan={false}
        minDistance={4.2}
        maxDistance={12}
        minPolarAngle={0.32}
        maxPolarAngle={Math.PI / 2.05}
        target={[0, 0.7, 0]}
        enableDamping
        dampingFactor={0.06}
        autoRotate={spin}
        autoRotateSpeed={0.35}
        onStart={() => setSpin(false)}
      />
    </Canvas>
  );
}

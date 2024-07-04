"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useProgress, Html } from "@react-three/drei";
import Model from "./Model";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <p className="w-full text-white text-sm">{progress.toFixed(1)}% loaded</p>
    </Html>
  );
}
// interface SceneProps {
//   isLoading: boolean;
// }

const Scene = () => {
  return (
    <Canvas
      gl={{ antialias: true }}
      dpr={[1, 1.5]}
      className="relative h-screen">
      <directionalLight position={[-5, -5, -5]} intensity={4} />
      <Suspense fallback={<Loader />}>
        <Model />
      </Suspense>
      {/* {isLoading && (
        <Html center>
          <p className="w-full text-white text-sm">Loading model...</p>
        </Html>
      )} */}
    </Canvas>
  );
};

export default Scene;

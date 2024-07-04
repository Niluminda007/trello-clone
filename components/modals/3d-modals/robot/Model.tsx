import { Sphere, Text, useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Group, Mesh, MeshStandardMaterial } from "three";

useGLTF.preload("/threeD-models/robot_playground.glb");

export default function Model() {
  const group = useRef<Group>(null);
  const textRef = useRef<Mesh>(null);
  const sphereOneRef = useRef<Mesh>(null);
  const sphereTwoRef = useRef<Mesh>(null);

  const { nodes, materials, animations, scene } = useGLTF(
    "/threeD-models/robot_playground.glb"
  );

  const { actions, clips } = useAnimations(animations, scene);
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    //@ts-ignore
    actions["Experiment"].play().paused = true;
  }, []);

  useFrame((state, delta) => {
    setAnimationProgress((prevProgress) => {
      const newProgress = prevProgress + delta * 1.5;
      //@ts-ignore
      const duration = actions["Experiment"].getClip().duration;
      //@ts-ignore
      actions["Experiment"].time = newProgress % duration;

      // Update sphere one animation
      if (sphereOneRef.current) {
        sphereOneRef.current.position.y =
          Math.abs(Math.sin(newProgress * 4)) * 0.7 - 1;
        sphereOneRef.current.rotation.x = newProgress * 2;
        sphereOneRef.current.rotation.y = newProgress * 2;
        (sphereOneRef.current.material as MeshStandardMaterial).emissive.setHSL(
          (newProgress * 0.1) % 1,
          1,
          0.5
        );
      }

      // Update sphere two animation
      if (sphereTwoRef.current) {
        sphereTwoRef.current.position.y =
          Math.abs(Math.sin((newProgress + 1) * 3)) * 0.5 - 1;
        sphereTwoRef.current.rotation.x = newProgress * 2;
        sphereTwoRef.current.rotation.y = newProgress * 2;
        (sphereTwoRef.current.material as MeshStandardMaterial).emissive.setHSL(
          ((newProgress + 0.5) * 0.1) % 1,
          1,
          0.5
        );
      }

      // Update text animation
      if (textRef.current) {
        const scale = 1 + Math.sin(newProgress * 2) * 0.05;
        textRef.current.scale.set(scale, scale, scale);
      }

      return newProgress;
    });
  });

  return (
    <group ref={group}>
      <primitive object={scene} />
      <Text
        ref={textRef}
        position={[0, -1, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle">
        Validating Invitation
      </Text>
      <Sphere ref={sphereOneRef} args={[0.1, 32, 32]} position={[-1.6, -1, 0]}>
        <meshStandardMaterial
          attach="material"
          emissive="red"
          emissiveIntensity={1}
        />
      </Sphere>
      <Sphere ref={sphereTwoRef} args={[0.1, 32, 32]} position={[1.6, -1, 0]}>
        <meshStandardMaterial
          attach="material"
          emissive="red"
          emissiveIntensity={1}
        />
      </Sphere>
    </group>
  );
}

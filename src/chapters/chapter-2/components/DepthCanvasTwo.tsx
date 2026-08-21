"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface DepthCanvasTwoProps {
  sceneParamsRef: React.RefObject<{
    cameraZ: number;
    lightIntensity: number;
    gridOpacity: number;
  }>;
}

function SceneController({ sceneParamsRef }: DepthCanvasTwoProps) {
  const lightRef = useRef<THREE.SpotLight>(null);
  const gridRef = useRef<THREE.GridHelper>(null);
  const prefersReduced = useReducedMotion();

  useFrame((state) => {
    if (sceneParamsRef.current) {
      const { camera, pointer } = state;
      
      if (prefersReduced) {
        // Accessibility static coordinates
        camera.position.set(0, 0, sceneParamsRef.current.cameraZ);
        camera.lookAt(0, 0, 0);
        
        if (lightRef.current) {
          lightRef.current.intensity = sceneParamsRef.current.lightIntensity * 6;
          lightRef.current.position.set(0, 0, 5);
        }
        
        if (gridRef.current) {
          const material = gridRef.current.material as THREE.LineBasicMaterial;
          material.transparent = true;
          material.opacity = 0;
        }
        return;
      }

      // 1. Slow, infinite cinematic drift
      const time = state.clock.getElapsedTime();
      const driftX = Math.sin(time * 0.15) * 0.12;
      const driftY = Math.cos(time * 0.2) * 0.08;

      // 2. Subtle mouse parallax
      const targetX = pointer.x * 0.25 + driftX;
      const targetY = pointer.y * 0.2 + driftY;

      camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.03);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.03);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, sceneParamsRef.current.cameraZ, 0.05);
      
      camera.lookAt(0, 0, 0);

      // 3. Spotlight tracking and intensity shifts
      if (lightRef.current) {
        lightRef.current.intensity = sceneParamsRef.current.lightIntensity * 6;
        lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, pointer.x * 1.2, 0.03);
        lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, pointer.y * 1.2, 0.03);
      }

      // 4. Floor grid opacity
      if (gridRef.current) {
        const material = gridRef.current.material as THREE.LineBasicMaterial;
        material.transparent = true;
        material.opacity = sceneParamsRef.current.gridOpacity;
        material.depthWrite = false;
      }
    }
  });

  return (
    <>
      <ambientLight intensity={0.002} />

      <spotLight
        ref={lightRef}
        position={[0, 0, 5]}
        angle={1.1}
        penumbra={1.0}
        color="#ffffff"
        intensity={0}
        distance={22}
      />

      {/* Symmetrical dark background matte wall */}
      <mesh position={[0, 0, -5]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial
          color="#020202"
          roughness={0.99}
          metalness={0.01}
        />
      </mesh>

      {/* Floor grid helper for spatial depth */}
      <gridHelper
        ref={gridRef}
        args={[60, 60, "#222222", "#111111"]}
        position={[0, -2.5, 0]}
      />
    </>
  );
}

export default function DepthCanvasTwo({ sceneParamsRef }: DepthCanvasTwoProps) {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 bg-black pointer-events-none">
      <Canvas
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={["#000000", 3, 14]} />
        <PerspectiveCamera makeDefault position={[0, 0, 11]} fov={45} />
        <SceneController sceneParamsRef={sceneParamsRef} />
      </Canvas>
    </div>
  );
}

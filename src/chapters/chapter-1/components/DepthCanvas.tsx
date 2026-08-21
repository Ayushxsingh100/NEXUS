"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface DepthCanvasProps {
  sceneParamsRef: React.RefObject<{
    cameraZ: number;
    lightIntensity: number;
    gridOpacity: number;
  }>;
}

function SceneController({ sceneParamsRef }: DepthCanvasProps) {
  const lightRef = useRef<THREE.SpotLight>(null);
  const gridRef = useRef<THREE.GridHelper>(null);
  const prefersReduced = useReducedMotion();

  useFrame((state) => {
    if (sceneParamsRef.current) {
      const { camera, pointer } = state;
      
      if (prefersReduced) {
        // Accessibility fallback: absolute static coordinates
        camera.position.set(0, 0, sceneParamsRef.current.cameraZ);
        camera.lookAt(0, 0, 0);
        
        if (lightRef.current) {
          lightRef.current.intensity = sceneParamsRef.current.lightIntensity * 7.5;
          lightRef.current.position.set(0, 0, 6);
        }
        
        if (gridRef.current) {
          const material = gridRef.current.material as THREE.LineBasicMaterial;
          material.transparent = true;
          material.opacity = 0;
        }
        return;
      }

      // 1. Cinematic slow drift (floating sensation)
      const time = state.clock.getElapsedTime();
      const driftX = Math.sin(time * 0.15) * 0.12;
      const driftY = Math.cos(time * 0.2) * 0.08;

      // 2. Subtle mouse parallax within restricted boundary
      const targetX = pointer.x * 0.25 + driftX;
      const targetY = pointer.y * 0.2 + driftY;

      // Smooth interpolation for camera position
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.03);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.03);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, sceneParamsRef.current.cameraZ, 0.05);
      
      camera.lookAt(0, 0, 0);

      // 3. Dynamic spotlight shifts
      if (lightRef.current) {
        lightRef.current.intensity = sceneParamsRef.current.lightIntensity * 7.5;
        lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, pointer.x * 1.2, 0.03);
        lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, pointer.y * 1.2, 0.03);
      }

      // 4. Floor grid opacity animation
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
      <ambientLight intensity={0.003} />

      <spotLight
        ref={lightRef}
        position={[0, 0, 6]}
        angle={1.05}
        penumbra={1.0}
        color="#ffffff"
        intensity={0}
        distance={25}
      />

      {/* Cinematic perspective floor grid */}
      <gridHelper
        ref={gridRef}
        args={[60, 60, "#222222", "#111111"]}
        position={[0, -2.5, 0]}
      />

      <mesh position={[0, 0, -4.5]}>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial
          color="#020202"
          roughness={0.98}
          metalness={0.02}
        />
      </mesh>
    </>
  );
}

export default function DepthCanvas({ sceneParamsRef }: DepthCanvasProps) {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 bg-black pointer-events-none">
      <Canvas
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={["#000000", 3, 15]} />
        <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={45} />
        <SceneController sceneParamsRef={sceneParamsRef} />
      </Canvas>
    </div>
  );
}

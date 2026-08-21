import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CameraParams {
  cameraX?: number;
  cameraY?: number;
  cameraZ: number;
}

/**
 * React Three Fiber (R3F) hook that smoothly interpolates the active camera position
 * toward ref-provided coordinate targets and applies a slow, cinematic idle drift.
 */
export function useCameraMotion(
  paramsRef: React.RefObject<CameraParams | null>,
  driftScale = 0.08,
  easeFactor = 0.05
) {
  useFrame((state) => {
    if (!paramsRef.current) return;
    const { camera } = state;
    const targetX = paramsRef.current.cameraX ?? 0;
    const targetY = paramsRef.current.cameraY ?? 0;
    const targetZ = paramsRef.current.cameraZ;

    // Slow, confidence-inspiring orbit drift
    const time = state.clock.getElapsedTime();
    const driftX = Math.sin(time * 0.4) * driftScale;
    const driftY = Math.cos(time * 0.4) * driftScale;

    // Smoothly lerp towards target coordinates
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX + driftX, easeFactor);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY + driftY, easeFactor);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, easeFactor);
  });
}

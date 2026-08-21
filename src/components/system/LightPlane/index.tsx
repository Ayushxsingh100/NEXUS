import React from "react";
import { colors } from "@/design/colors";
import { environment } from "@/design/environment";

export interface LightPlaneProps {
  /** Position coordinates as percentage strings. Defaults to environment lightSourcePosition. */
  position?: { x: string; y: string };
  /** Intensity multiplier (0.0 to 1.0). Clamped at 1.0. Defaults to 1.0. */
  intensity?: number;
  /** CSS size value (e.g. "50vw", "600px"). Defaults to "55vw" (lightSpread). */
  size?: string;
  /** Explicit opacity override (0.0 to 1.0). If provided, bypasses intensity multiplier calculation. */
  opacity?: number;
  /** Rotation angle in degrees. Defaults to 0. */
  rotation?: number;
  /** Optional className. */
  className?: string;
}

/**
 * LightPlane
 *
 * An upgraded, highly configurable architectural directional light plane.
 * Simulates an overhead light source illuminating structural planes or content sections.
 *
 * Features:
 *   - Configurable size, coordinates, opacity, intensity, and rotation angles.
 *   - Pure CSS gradients — GPU-composited, zero layout recalculations.
 *   - Uses rotation transforms to skew/angle the lighting plane organically.
 *
 * Rules:
 *   - Opacity should generally remain low (≤ 10%) to preserve the premium, quiet design tone.
 *   - Use pointer-events-none and aria-hidden always.
 *
 * @example
 * <LightPlane intensity={0.8} rotation={15} />
 * <LightPlane position={{ x: "30%", y: "5%" }} size="65vw" />
 */
export function LightPlane({
  position = environment.lightSourcePosition,
  intensity = 1.0,
  size = environment.lightSpread,
  opacity,
  rotation = 0,
  className = "",
}: LightPlaneProps) {
  // Compute opacity based on intensity scale if explicit opacity is not provided
  const clampedIntensity = Math.max(0, Math.min(intensity, 1.0));
  const finalOpacity = opacity !== undefined 
    ? opacity 
    : environment.lightOpacity * clampedIntensity;

  // Use rotate transform for angle alignments (GPU-friendly)
  const transform = rotation !== 0 ? `rotate(${rotation}deg)` : undefined;

  return (
    <div
      aria-hidden="true"
      className={`absolute pointer-events-none select-none ${className}`}
      style={{
        top: 0,
        left: 0,
        right: 0,
        height: size,
        background: `radial-gradient(ellipse at ${position.x} ${position.y}, ${colors.lightSource} 0%, transparent 70%)`,
        filter: "blur(90px)",
        opacity: finalOpacity,
        transform,
        willChange: "transform, opacity",
      }}
    />
  );
}

LightPlane.displayName = "LightPlane";

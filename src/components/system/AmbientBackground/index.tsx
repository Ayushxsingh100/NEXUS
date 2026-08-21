"use client";

import React from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { colors } from "@/design/colors";
import { zIndex } from "@/design/zIndex";

export interface SystemAmbientBackgroundProps {
  /**
   * Controls which atmospheric elements are rendered.
   * "full" renders the primary light bloom and floor gradient.
   * "minimal" renders only the vignette (no light bloom, ideal for focused chapters).
   * "none" renders only the base canvas color.
   */
  variant?: "full" | "minimal" | "none";
  /** Show the edge vignette. Default: true. */
  showVignette?: boolean;
  /** Optional className. */
  className?: string;
}

/**
 * SystemAmbientBackground
 *
 * System-level ambient background primitive.
 * This component is intentionally separate from `components/core/AmbientBackground`
 * to allow migration without breaking existing chapter code.
 *
 * Key differences from the legacy AmbientBackground:
 *   - Uses design tokens (no magic values)
 *   - Single architectural light source (upper-left), not cyan+violet spotlights
 *   - Respects prefers-reduced-motion (static fallback)
 *   - Uses zIndex tokens
 *   - Variants for different chapter moods
 *
 * Intended to replace `core/AmbientBackground` in Sprint 02.
 *
 * @example
 * <SystemAmbientBackground variant="full" />
 * <SystemAmbientBackground variant="minimal" showVignette />
 */
export function SystemAmbientBackground({
  variant = "full",
  showVignette = true,
  className = "",
}: SystemAmbientBackgroundProps) {
  const prefersReduced = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden ${className}`}
      style={{
        zIndex: zIndex.environment,
        background: colors.canvas,
      }}
    >
      {/* Primary light bloom — upper-left directional source */}
      {variant === "full" && (
        <div
          style={{
            position: "absolute",
            top: "-5%",
            left: "-10%",
            width: "60vw",
            height: "60vw",
            maxWidth: "650px",
            maxHeight: "650px",
            background: `radial-gradient(ellipse at 25% 25%, ${colors.lightSource} 0%, transparent 60%)`,
            filter: "blur(90px)",
            opacity: 0.8,
            // Drift animation driven by CSS — disabled when reduced motion preferred
            animation: prefersReduced ? "none" : "nexus-drift 28s ease-in-out infinite alternate",
            willChange: "transform",
          }}
        />
      )}

      {/* Floor darkening — architectural ground plane */}
      {(variant === "full" || variant === "minimal") && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "45%",
            background: `linear-gradient(to top, ${colors.canvas} 0%, transparent 100%)`,
          }}
        />
      )}

      {/* Edge vignette — frames the scene, focuses attention */}
      {showVignette && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse at 50% 45%, transparent 28%, ${colors.vignette} 100%)`,
            opacity: 0.85,
          }}
        />
      )}
    </div>
  );
}

SystemAmbientBackground.displayName = "SystemAmbientBackground";

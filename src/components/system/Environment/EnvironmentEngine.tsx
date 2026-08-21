"use client";

import React from "react";
import { zIndex } from "@/design/zIndex";
import { environment } from "@/design/environment";
import { colors } from "@/design/colors";
import { EnvironmentProvider, useEnvironment } from "./EnvironmentProvider";
import { ArchitecturalCanvas } from "./ArchitecturalCanvas";
import { AtmosphereLayer } from "./AtmosphereLayer";
import { DepthOverlay } from "./DepthOverlay";
import { FocusPlane } from "./FocusPlane";

// ─────────────────────────────────────────────────────────────
// INNER ENGINE (reads from context)
// ─────────────────────────────────────────────────────────────

function EnvironmentEngineInner() {
  const { lightDirection, lightIntensity, atmosphereVisible, prefersReduced } =
    useEnvironment();

  const finalLightOpacity = environment.lightOpacity * lightIntensity;

  return (
    <>
      {/* ── LAYER 01: ARCHITECTURAL CANVAS ─────────────────────────
          The base layer. Visible 3-stop charcoal gradient that immediately
          replaces flat black with architectural depth. Static, single paint.
      ──────────────────────────────────────────────────────────── */}
      <ArchitecturalCanvas />

      {/* ── LAYER 02: ATMOSPHERIC VOLUME ───────────────────────────
          Three independent haze blobs at 5–10% effective opacity each.
          Each uses two-div architecture: outer animates (transform only),
          inner holds blur + gradient (never repainted during animation).
          Total atmospheric contribution: 15–25% cumulative soft haze.
      ──────────────────────────────────────────────────────────── */}
      {atmosphereVisible &&
        environment.atmosphericLayers.map((layer) => (
          <AtmosphereLayer
            key={layer.id}
            id={layer.id}
            color={layer.color}
            opacity={layer.opacity}
            width={layer.width}
            height={layer.height}
            maxWidth={layer.maxWidth}
            maxHeight={layer.maxHeight}
            position={layer.position}
            blur={layer.blur}
            animationName={layer.animationName}
            duration={layer.duration}
            prefersReduced={prefersReduced}
          />
        ))}

      {/* ── LAYER 03: ARCHITECTURAL LIGHT ──────────────────────────
          Single wide ceiling light from upper-left at 16% opacity.
          Uses radial gradient + heavy blur to simulate a real light source.
          No animation — light sources don't drift.
          willChange: opacity so GPU can composite this layer independently.
      ──────────────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: lightDirection.y,
          left: lightDirection.x,
          width: environment.lightSpread,
          height: environment.lightSpread,
          maxWidth: "800px",
          maxHeight: "800px",
          background: `radial-gradient(circle at 35% 35%, ${colors.lightSource} 0%, transparent 65%)`,
          filter: "blur(120px)",
          opacity: finalLightOpacity,
          transform: "translate(-28%, -28%)",
          pointerEvents: "none",
          willChange: "opacity",
        }}
      />

      {/* ── LAYER 04: DEPTH OVERLAY ─────────────────────────────────
          Floor gradient + vignette. Static. Frames the scene from outside.
      ──────────────────────────────────────────────────────────── */}
      <DepthOverlay />

      {/* ── LAYER 05: FOCUS PLANE ───────────────────────────────────
          Subtle centre brightening. Counter-frames the vignette.
          Creates natural visual gravity toward content region.
      ──────────────────────────────────────────────────────────── */}
      <FocusPlane />
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// ENGINE PROPS
// ─────────────────────────────────────────────────────────────

export interface EnvironmentEngineProps {
  /** Optional className on the fixed root container. Use sparingly. */
  className?: string;
}

// ─────────────────────────────────────────────────────────────
// ENGINE (root, provides context)
// ─────────────────────────────────────────────────────────────

/**
 * EnvironmentEngine
 *
 * The complete 5-layer architectural environment system for Project Nexus.
 * Mount once — in RootLayout — and every chapter inherits it automatically.
 *
 * Layer Stack (back to front):
 *   01  ArchitecturalCanvas   — visible charcoal gradient base
 *   02  AtmosphereLayer ×3    — calibrated haze at 5–10% each, 45/70/90s drift
 *   03  Architectural Light   — single upper-left ceiling source at 16%
 *   04  DepthOverlay          — floor + vignette framing
 *   05  FocusPlane            — centre brightness for natural visual gravity
 *
 * Performance:
 *   - `contain: strict` isolates this subtree from document layout
 *   - Animated layers: transform only (no blur on animating elements)
 *   - Static layers: single paint, never repainted
 *   - `will-change: transform` on atmosphere outer wrappers
 *   - `will-change: opacity` on light plane
 *   - All animations deactivated on prefers-reduced-motion
 *
 * @example
 * // In RootLayout:
 * <body>
 *   <EnvironmentEngine />
 *   {children}
 * </body>
 */
export function EnvironmentEngine({ className = "" }: EnvironmentEngineProps) {
  return (
    <EnvironmentProvider>
      <div
        aria-hidden="true"
        className={`fixed inset-0 w-full h-full pointer-events-none select-none overflow-hidden ${className}`}
        style={{
          zIndex: zIndex.environment,
          contain: "strict",
        }}
      >
        <EnvironmentEngineInner />
      </div>
    </EnvironmentProvider>
  );
}

EnvironmentEngine.displayName = "EnvironmentEngine";

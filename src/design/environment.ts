/**
 * PROJECT NEXUS — Environment Constants
 *
 * Defines the visual properties of the architectural environment.
 * These are not component-level values — they govern the global
 * atmospheric rendering of the entire experience.
 *
 * Philosophy:
 *   The environment should feel alive even if all UI components are removed.
 *   It is a museum pavilion, not a game world or galaxy.
 *
 * Light:
 *   - One global light source
 *   - Upper-left position
 *   - Soft, wide, natural
 *   - Never random, never colored (except the architectural blue-white tint)
 *
 * Motion:
 *   - Extremely slow ambient drift
 *   - No looping that draws attention
 *   - imperceptible unless you look for it
 */

import { colors } from "./colors";

// ─────────────────────────────────────────────────────────────
// LIGHT SOURCE
// ─────────────────────────────────────────────────────────────

/** Position of the global light source as a percentage of the viewport. */
export const lightSourcePosition = {
  /** Horizontal position from left. Upper-left quadrant. */
  x: "18%",
  /** Vertical position from top. Ceiling-level. */
  y: "12%",
} as const;

/** Spread radius of the primary light bloom, as a percentage of viewport width. */
export const lightSpread = "55vw" as const;

/** Maximum opacity of the directional light plane. Calibrated to 16% so the ceiling registers. */
export const lightOpacity = 0.16 as const;

/** Light color (architectural blue-white). */
export const lightColor = colors.lightSource;

// ─────────────────────────────────────────────────────────────
// ENVIRONMENT GRADIENTS & STRENGTHS
// ─────────────────────────────────────────────────────────────

/** Edge vignette fade strength limit (0 to 1). Upgraded from 0.9 to 0.92. */
export const vignetteStrength = 0.92 as const;

/**
 * Architectural base canvas gradient — three visible tonal stops.
 * Top: warm dark blue-charcoal (#0A1628)
 * Mid: deep cool (#06090F)
 * Bottom: near-black (#040508)
 * These three stops create the architectural depth impression immediately.
 */
export const canvasGradient =
  `linear-gradient(175deg, #0A1628 0%, #06090F 55%, #040508 100%)` as const;

/**
 * Architectural ground plane gradient.
 * Darkens toward the bottom to ground content surfaces.
 */
export const floorGradient =
  `linear-gradient(to top, ${colors.canvas} 0%, rgba(5, 6, 8, 0.85) 28%, transparent 100%)` as const;

/**
 * Focus plane radial highlight — calibrated to 4% so it registers as centre warmth.
 * Creates natural visual gravity toward the content area without being visible as a glow.
 */
export const focusPlane =
  "radial-gradient(ellipse at 50% 48%, rgba(255, 255, 255, 0.04) 0%, transparent 52%)" as const;

// ─────────────────────────────────────────────────────────────
// ATMOSPHERIC LAYERS
// ─────────────────────────────────────────────────────────────

/**
 * Atmospheric haze layers — calibrated for visibility.
 * Effective opacity targets: A=8-10%, B=5-7%, C=5-6%
 * All use transform-only animations for GPU compositing.
 * Blur filters are on static elements only — animated wrappers are blur-free.
 */
export const atmosphericLayers = [
  {
    id: "atmosphere-a",
    // Upper-left: primary light haze. ~9% effective opacity. The most visible layer.
    position: { top: "-20%", left: "-15%" } as const,
    width: "65vw",
    height: "65vw",
    maxWidth: "780px",
    maxHeight: "780px",
    color: colors.atmosphericA,          // rgba(123,215,255,0.09)
    opacity: 0.95,                        // effective: ~8.5%
    blur: 80,                             // px — on the static blur wrapper
    animationName: "nexus-atmosphere-a",
    duration: 45,
  },
  {
    id: "atmosphere-b",
    // Right-center: secondary neutral fill. ~5% effective opacity.
    position: { top: "10%", right: "-15%" } as const,
    width: "70vw",
    height: "70vw",
    maxWidth: "820px",
    maxHeight: "820px",
    color: colors.atmosphericB,          // rgba(200,220,255,0.07)
    opacity: 0.80,                        // effective: ~5.6%
    blur: 100,
    animationName: "nexus-atmosphere-b",
    duration: 70,
  },
  {
    id: "atmosphere-c",
    // Lower-left: fill for the floor region. ~5.5% effective.
    position: { bottom: "-10%", left: "10%" } as const,
    width: "60vw",
    height: "60vw",
    maxWidth: "700px",
    maxHeight: "700px",
    color: colors.atmosphericA,          // rgba(123,215,255,0.09)
    opacity: 0.65,                        // effective: ~5.85%
    blur: 90,
    animationName: "nexus-atmosphere-c",
    duration: 90,
  },
] as const;

// ─────────────────────────────────────────────────────────────
// DEPTH LAYERS (Deprecated in favor of granular layers, kept for compatibility)
// ─────────────────────────────────────────────────────────────

export const depthLayers = [
  {
    id: "deep-field",
    style: {
      position: "absolute" as const,
      top: "-10%",
      left: "-15%",
      width: "70%",
      height: "70%",
      background: `radial-gradient(ellipse at center, ${colors.lightSource} 0%, transparent 65%)`,
      opacity: 0.8,
      filter: "blur(80px)",
      willChange: "transform",
    },
  },
  {
    id: "floor",
    style: {
      position: "absolute" as const,
      bottom: 0,
      left: 0,
      right: 0,
      height: "50%",
      background: `linear-gradient(to top, ${colors.canvas} 0%, transparent 100%)`,
      opacity: 1,
    },
  },
  {
    id: "vignette",
    style: {
      position: "absolute" as const,
      inset: 0,
      background: `radial-gradient(ellipse at 50% 45%, transparent 30%, ${colors.vignette} 100%)`,
      opacity: 0.9,
    },
  },
  {
    id: "drift",
    style: {
      position: "absolute" as const,
      top: "5%",
      left: "20%",
      width: "45vw",
      height: "45vw",
      maxWidth: "600px",
      maxHeight: "600px",
      background: `radial-gradient(circle at center, ${colors.accentGlow} 0%, transparent 60%)`,
      opacity: 0.7,
      filter: "blur(60px)",
      willChange: "transform",
    },
  },
] as const;

export const ambientDrift = {
  duration: 28000,
  driftX: 18,
  driftY: 12,
  animation: "nexus-drift 28s ease-in-out infinite alternate",
} as const;

/**
 * Applied as the background of the root Environment container.
 */
export const baseGradient =
  `radial-gradient(ellipse at 20% 15%, rgba(10, 20, 35, 0.6) 0%, ${colors.canvas} 60%)` as const;

// ─────────────────────────────────────────────────────────────
// UNIFIED EXPORT
// ─────────────────────────────────────────────────────────────

export const environment = {
  lightSourcePosition,
  lightSpread,
  lightOpacity,
  lightColor,
  depthLayers,
  ambientDrift,
  baseGradient,
  vignetteStrength,
  canvasGradient,
  floorGradient,
  focusPlane,
  atmosphericLayers,
} as const;

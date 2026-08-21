/**
 * PROJECT NEXUS — Shadow System
 *
 * Extends src/design/shadows.ts with architectural shadow compositions
 * that incorporate light-source direction into their construction.
 *
 * Global light source: upper-left.
 * Shadows fall to the lower-right.
 * Inset highlights appear on the top and left edges of surfaces.
 *
 * These are re-exports and composites — the source of truth for individual
 * values remains in src/design/shadows.ts.
 */

import { shadows } from "@/design/shadows";

// ─────────────────────────────────────────────────────────────
// SURFACE SHADOW COMPOSITIONS
// ─────────────────────────────────────────────────────────────

/**
 * Glass panel: elevated above the scene, catches upper-left light.
 * Combines ambient drop shadow with a directional inset light edge.
 */
export const glassPanelShadow =
  `${shadows.panel}, ${shadows.light}` as const;

/**
 * Deep panel: strongly grounded, for content overlaying the environment.
 * Maximum depth without drama.
 */
export const deepPanelShadow =
  `${shadows.scene}, ${shadows.light}` as const;

/**
 * Card shadow: medium content surface.
 */
export const cardShadow =
  `${shadows.md}, ${shadows.light}` as const;

/**
 * Subtle chip: smallest interactive element.
 */
export const chipShadow =
  `${shadows.xs}, inset 0 1px 0 rgba(255, 255, 255, 0.04)` as const;

// ─────────────────────────────────────────────────────────────
// DIRECTIONAL SHADOW HELPERS
// ─────────────────────────────────────────────────────────────

/**
 * Returns a box-shadow value adjusted for a given depth level.
 * Depth is 0–4 (0=flush, 4=floating).
 */
export function depthShadow(depth: 0 | 1 | 2 | 3 | 4): string {
  const map = {
    0: shadows.none,
    1: shadows.xs,
    2: shadows.sm,
    3: shadows.md,
    4: shadows.elevated,
  } as const;
  return map[depth];
}

/**
 * Combines a depth shadow with the directional light inset.
 * Use on any surface that should respond to the global light source.
 */
export function architecturalShadow(depth: 0 | 1 | 2 | 3 | 4): string {
  const base = depthShadow(depth);
  if (depth === 0) return shadows.none;
  return `${base}, ${shadows.light}`;
}

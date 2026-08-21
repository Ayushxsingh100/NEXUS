/**
 * PROJECT NEXUS — Shadow System
 *
 * Architectural shadows: subtle, directional, never glowing.
 * One global light source — upper-left — defines all shadow direction.
 *
 * Rules:
 *   - No colored shadows (no cyan/violet glow on surfaces)
 *   - Shadow direction: consistent upper-left light source
 *   - Opacity always low — shadow enhances depth, not drama
 *   - Never use drop shadows on text
 */

import { colors } from "./colors";

// ─────────────────────────────────────────────────────────────
// CSS box-shadow values
// ─────────────────────────────────────────────────────────────

/** No shadow. Flat, matte surface. */
export const shadowNone = "none" as const;

/** Barely-there depth marker. Icon chips, inline badges. */
export const shadowXs = "0 1px 2px rgba(0, 0, 0, 0.4)" as const;

/** Standard subtle elevation. Default interactive elements. */
export const shadowSm = "0 2px 8px rgba(0, 0, 0, 0.45)" as const;

/** Medium depth. Cards, panels resting on surfaces. */
export const shadowMd = "0 4px 16px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.4)" as const;

/** Strong depth. Elevated containers, overlaying content. */
export const shadowLg = "0 8px 32px rgba(0, 0, 0, 0.55), 0 2px 8px rgba(0, 0, 0, 0.4)" as const;

/** Modal-level depth. Overlays that separate from the scene entirely. */
export const shadowXl = "0 16px 64px rgba(0, 0, 0, 0.65), 0 4px 16px rgba(0, 0, 0, 0.5)" as const;

/**
 * Environment panel shadow — subtle directional light edge from upper-left.
 * Used on glass surfaces to simulate physical material.
 */
export const shadowPanel =
  `0 4px 24px rgba(0, 0, 0, 0.5), inset 0 1px 0 ${colors.borderSubtle}` as const;

/**
 * Elevated surface shadow — for surfaces that float above the canvas.
 */
export const shadowElevated =
  "0 12px 40px rgba(0, 0, 0, 0.6), 0 2px 8px rgba(0, 0, 0, 0.45)" as const;

// ─────────────────────────────────────────────────────────────
// UNIFIED EXPORT
// ─────────────────────────────────────────────────────────────

/**
 * Architectural light-catching inset — for surfaces facing the upper-left light.
 * Simulates material response to the global directional light source.
 * Use on top/left edges of glass panels.
 */
export const shadowLight =
  `inset 0 1px 0 rgba(123, 215, 255, 0.08), inset 1px 0 0 rgba(255, 255, 255, 0.04)` as const;

/**
 * Scene ambient shadow — for chapter backdrop containers.
 * Creates the sense that content panels are embedded in the environment,
 * not floating above it.
 */
export const shadowScene =
  "0 32px 80px rgba(0, 0, 0, 0.7), 0 8px 32px rgba(0, 0, 0, 0.55)" as const;

export const shadows = {
  none: shadowNone,
  xs: shadowXs,
  sm: shadowSm,
  md: shadowMd,
  lg: shadowLg,
  xl: shadowXl,
  panel: shadowPanel,
  elevated: shadowElevated,
  light: shadowLight,
  scene: shadowScene,
} as const;

export type ShadowScale = typeof shadows;
export type ShadowKey = keyof ShadowScale;
export type ShadowValue = ShadowScale[ShadowKey];

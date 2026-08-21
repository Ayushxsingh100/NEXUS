/**
 * PROJECT NEXUS — Border Radius System
 *
 * Architectural aesthetic: minimal, deliberate, never decorative.
 * No oversized rounded corners. No pill containers.
 *
 * Rules:
 *   - Default interactive elements: `sm` or `md`
 *   - Panels and surfaces: `md` or `none`
 *   - Circular indicators only: `full`
 *   - Never use `xl` on a container larger than 40px
 */

export const radius = {
  /** 0px — Sharp architectural edge. Default for large surfaces. */
  none: 0,
  /** 2px — Barely perceptible curve. Icon buttons, small chips. */
  xs: 2,
  /** 4px — Minimal rounding. Standard interactive elements. */
  sm: 4,
  /** 6px — Gentle curve. Panels, cards. */
  md: 6,
  /** 8px — Noticeable round. Only for contained interactive regions. */
  lg: 8,
  /** 12px — Maximum for any UI element. Use rarely. */
  xl: 12,
  /** 9999px — Perfect circle. Status indicators, avatars only. */
  full: 9999,
} as const;

/**
 * Converts a radius value to a CSS pixel string.
 *
 * @example
 * radiusPx(radius.md)   // → "6px"
 * radiusPx(radius.none) // → "0px"
 */
export function radiusPx(value: number): string {
  return value === 9999 ? "9999px" : `${value}px`;
}

export type RadiusScale = typeof radius;
export type RadiusKey = keyof RadiusScale;
export type RadiusValue = RadiusScale[RadiusKey];

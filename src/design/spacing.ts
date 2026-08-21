/**
 * PROJECT NEXUS — Spacing System
 *
 * Based on an 8-point grid. Every layout decision derives from this scale.
 * No raw pixel values should appear in components — use these tokens.
 *
 * Usage:
 *   import { spacing, px } from "@/design/spacing";
 *   style={{ padding: px(spacing[4]) }} // → "16px"
 *   style={{ gap: px(spacing[6]) }}     // → "24px"
 */

/**
 * The base spacing unit in pixels (8px).
 * All scale values are multiples of this base.
 */
export const BASE_UNIT = 8 as const;

/**
 * 8-point spacing scale.
 * Keys represent the multiplier; values are pixel amounts.
 */
export const spacing = {
  /** 0px — No space. */
  0: 0,
  /** 2px — Hair-thin gap, icon nudges. */
  px: 1,
  /** 4px — Micro gap, tight inline elements. */
  0.5: 4,
  /** 8px — Small — icon/label pairing, list items. */
  1: 8,
  /** 12px — Compact — tight component internals. */
  1.5: 12,
  /** 16px — Default — standard component padding. */
  2: 16,
  /** 20px — Comfortable — form fields, card padding. */
  2.5: 20,
  /** 24px — Relaxed — section insets, panel spacing. */
  3: 24,
  /** 32px — Spacious — between logical groups. */
  4: 32,
  /** 40px — Open — between major content blocks. */
  5: 40,
  /** 48px — Generous — between sections. */
  6: 48,
  /** 64px — Wide — vertical rhythm between chapters. */
  8: 64,
  /** 80px — Expansive — hero-level vertical breathing room. */
  10: 80,
  /** 96px — Architectural — large-scale section separation. */
  12: 96,
  /** 128px — Cinematic — full-screen section separation. */
  16: 128,
  /** 160px — Grand — hero padding, cinematic margins. */
  20: 160,
  /** 192px — Vast — full-screen architectural breathing room. */
  24: 192,
  /** 256px — Maximum — extreme vertical centering. */
  32: 256,
} as const;

/**
 * Converts a spacing value to a CSS pixel string.
 *
 * @example
 * px(spacing[4])  // → "32px"
 * px(spacing[1.5]) // → "12px"
 */
export function px(value: number): string {
  return `${value}px`;
}

/**
 * Converts a spacing value to a rem string (1rem = 16px).
 *
 * @example
 * rem(spacing[2])  // → "1rem"
 * rem(spacing[4])  // → "2rem"
 */
export function rem(value: number): string {
  return `${value / 16}rem`;
}

export type SpacingScale = typeof spacing;
export type SpacingKey = keyof SpacingScale;
export type SpacingValue = SpacingScale[SpacingKey];

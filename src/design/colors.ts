/**
 * PROJECT NEXUS — Color System
 *
 * Single source of truth for every color value in the application.
 * All values are `as const` — TypeScript will infer exact string literal types.
 *
 * Hierarchy:
 *   Canvas (deepest) → Surface → Elevated → Glass (interaction layer)
 *   Text: Primary → Secondary → Muted
 *   Accent → Highlight
 */

// ─────────────────────────────────────────────────────────────
// BACKGROUNDS
// ─────────────────────────────────────────────────────────────

/** The infinite architectural backdrop. Absolute darkness. */
export const canvas = "#050608" as const;

/** Default content surface — dark, grounded. */
export const surface = "#0B1118" as const;

/** Raised/elevated surface — one level above surface. */
export const elevated = "#131C26" as const;

// ─────────────────────────────────────────────────────────────
// GLASS — Interaction Layer Only
// ─────────────────────────────────────────────────────────────

/** Glass panel background. Use only for interactive containers. */
export const glass = "rgba(255, 255, 255, 0.05)" as const;

/** Glass panel border. Thin, minimal, no glow. */
export const glassBorder = "rgba(255, 255, 255, 0.10)" as const;

/** Glass border on hover state. */
export const glassBorderHover = "rgba(255, 255, 255, 0.16)" as const;

// ─────────────────────────────────────────────────────────────
// TEXT
// ─────────────────────────────────────────────────────────────

/** Primary text — full white, maximum contrast. */
export const textPrimary = "#FFFFFF" as const;

/** Secondary text — slightly dimmed, supporting information. */
export const textSecondary = "rgba(255, 255, 255, 0.72)" as const;

/** Muted text — metadata, captions, decorative labels. */
export const textMuted = "rgba(255, 255, 255, 0.45)" as const;

/** Disabled / faded — lowest text presence. */
export const textDisabled = "rgba(255, 255, 255, 0.25)" as const;

// ─────────────────────────────────────────────────────────────
// ACCENT
// ─────────────────────────────────────────────────────────────

/** Primary accent — architectural blue, directional light source color. */
export const accent = "#7BD7FF" as const;

/** Highlight — near-white accent, for emphasis and selection states. */
export const highlight = "#DDF6FF" as const;

/** Accent at very low opacity — ambient glow on surfaces. */
export const accentGlow = "rgba(123, 215, 255, 0.08)" as const;

// ─────────────────────────────────────────────────────────────
// SEMANTIC
// ─────────────────────────────────────────────────────────────

/** Error / destructive state. */
export const error = "#FF5A5A" as const;

/** Success / confirmation state. */
export const success = "#2ED573" as const;

/** Warning / caution state. */
export const warning = "#FFC857" as const;

// ─────────────────────────────────────────────────────────────
// BORDER / DIVIDER
// ─────────────────────────────────────────────────────────────

/** Architectural divider — barely visible rule. */
export const borderSubtle = "rgba(255, 255, 255, 0.06)" as const;

/** Standard border — light structural separation. */
export const borderDefault = "rgba(255, 255, 255, 0.10)" as const;

/** Strong border — deliberate separation. */
export const borderStrong = "rgba(255, 255, 255, 0.18)" as const;

// ─────────────────────────────────────────────────────────────
// ENVIRONMENT — Light Source
// ─────────────────────────────────────────────────────────────

/**
 * Global directional light tint.
 * Single source, upper-left, soft and wide.
 * Calibrated to 14% so the ceiling light registers without being neon.
 * Used only in the Environment layer.
 */
export const lightSource = "rgba(123, 215, 255, 0.14)" as const;

/** Deep vignette color — edges of the viewport. */
export const vignette = "rgba(0, 0, 0, 0.85)" as const;

/**
 * Primary atmospheric haze color — cool blue-white.
 * Used by AtmosphereLayer at 5–10% effective opacity.
 * Calibrated to be visible but not chromatic.
 */
export const atmosphericA = "rgba(123, 215, 255, 0.09)" as const;

/**
 * Secondary atmospheric fill — cooler, wider volume.
 * Fills the ambient space with soft neutral light.
 */
export const atmosphericB = "rgba(200, 220, 255, 0.07)" as const;

// ─────────────────────────────────────────────────────────────
// UNIFIED EXPORT
// ─────────────────────────────────────────────────────────────

/**
 * Full Nexus color palette.
 * Prefer importing individual named exports for tree-shaking.
 * Use this object only when you need the full palette (e.g. theming, docs).
 */
export const colors = {
  // Backgrounds
  canvas,
  surface,
  elevated,

  // Glass
  glass,
  glassBorder,
  glassBorderHover,

  // Text
  textPrimary,
  textSecondary,
  textMuted,
  textDisabled,

  // Accent
  accent,
  highlight,
  accentGlow,

  // Semantic
  error,
  success,
  warning,

  // Border
  borderSubtle,
  borderDefault,
  borderStrong,

  // Environment
  lightSource,
  vignette,
  atmosphericA,
  atmosphericB,
} as const;

export type ColorToken = keyof typeof colors;
export type ColorValue = (typeof colors)[ColorToken];

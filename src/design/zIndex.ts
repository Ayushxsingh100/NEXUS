/**
 * PROJECT NEXUS — Z-Index System
 *
 * Semantic stacking order for the layered architectural environment.
 * Never use a raw z-index integer in a component — always reference this token.
 *
 * Layer architecture (bottom to top):
 *
 *   canvas        → 3D WebGL scenes, infinite backdrop
 *   environment   → Ambient background, atmospheric gradients
 *   base          → Default document flow
 *   surface       → Elevated content surfaces
 *   overlay       → Floating panels, side drawers
 *   panel         → Modal-like containers
 *   modal         → Full-screen overlays, chapter transitions
 *   tooltip       → Tooltips, popovers (always on top)
 *   cursor        → Custom cursor (topmost layer)
 */

export const zIndex = {
  /** 3D canvas / WebGL scenes. Behind everything. */
  canvas: -20,
  /** Atmospheric environment layer (ambient bg, light planes). */
  environment: -10,
  /** Default document flow. */
  base: 0,
  /** Elevated surface content. */
  surface: 10,
  /** Floating / side panels. */
  overlay: 20,
  /** Modal-like glass panels. */
  panel: 30,
  /** Full-screen overlays, chapter transition layers. */
  modal: 40,
  /** Tooltips and popovers. */
  tooltip: 50,
  /** Custom cursor. Always topmost. */
  cursor: 60,

  // ─────────────────────────────────────────────────────────────
  // SPRINT 02 DEPTH SYSTEM ALIASES
  // ─────────────────────────────────────────────────────────────
  /** Deepest backdrop layer (alias for canvas). */
  background: -20,
  /** Stacking level for user triggers and glass elements (alias for panel). */
  interaction: 30,
} as const;

export type ZIndexScale = typeof zIndex;
export type ZIndexKey = keyof ZIndexScale;
export type ZIndexValue = ZIndexScale[ZIndexKey];

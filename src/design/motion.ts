/**
 * PROJECT NEXUS — Motion System
 *
 * Every animation uses these tokens. No hardcoded durations or easing strings.
 *
 * Philosophy:
 *   - Motion guides attention, never distracts
 *   - Everything has weight — settles naturally, no bounce, no elastic
 *   - Slow is intentional; fast is efficient
 *   - All animations must respect prefers-reduced-motion
 *
 * Timing Reference (from Project Bible):
 *   Hover:           150–200ms
 *   Button:          180ms
 *   Panel:           300–450ms
 *   Chapter Reveal:  800–1500ms
 *   Scene Transition: 1500–2500ms
 */

// ─────────────────────────────────────────────────────────────
// DURATION (milliseconds)
// ─────────────────────────────────────────────────────────────

export const duration = {
  /** 100ms — Instantaneous feedback. Icon state changes. */
  instant: 100,
  /** 150ms — Fastest perceptible motion. Hover micro-feedback. */
  fast: 150,
  /** 200ms — Hover states, button presses. */
  hover: 200,
  /** 300ms — Standard UI transitions. Panels, dropdowns. */
  normal: 300,
  /** 450ms — Comfortable transitions. Card reveals, focus shifts. */
  comfortable: 450,
  /** 600ms — Slow. Section-level reveals. */
  slow: 600,
  /** 900ms — Deliberate. Content layer entrances. */
  deliberate: 900,
  /** 1200ms — Chapter reveal entry. */
  reveal: 1200,
  /** 1800ms — Cinematic. Title sequences, hero elements. */
  cinematic: 1800,
  /** 2500ms — Scene transitions between chapters. */
  scene: 2500,
  /** 15000ms — Ambient environment drift. Nearly imperceptible. */
  ambient: 15000,
} as const;

/**
 * Duration values in seconds (for use with CSS `transition-duration`).
 * Derived automatically from the millisecond values.
 */
export const durationS = Object.fromEntries(
  Object.entries(duration).map(([k, v]) => [k, `${v / 1000}s`])
) as { [K in keyof typeof duration]: string };

// ─────────────────────────────────────────────────────────────
// EASING — CSS cubic-bezier strings
// ─────────────────────────────────────────────────────────────

export const easing = {
  /**
   * Standard — smooth in/out. General UI transitions.
   * Material: cubic-bezier(0.4, 0, 0.2, 1)
   */
  standard: "cubic-bezier(0.4, 0, 0.2, 1)" as const,

  /**
   * Enter — quick start, gradual settle. Panels sliding in.
   * Feels weighted as elements arrive.
   */
  enter: "cubic-bezier(0.0, 0, 0.2, 1)" as const,

  /**
   * Exit — immediate departure, quick fade. Elements leaving.
   */
  exit: "cubic-bezier(0.4, 0, 1, 1)" as const,

  /**
   * Cinematic — expressive deceleration for hero elements.
   * Expo-style: snappy start, long elegant settle.
   */
  cinematic: "cubic-bezier(0.16, 1, 0.3, 1)" as const,

  /**
   * Emphasized — fast, expressive sweep with a very slow, weight-settled deceleration.
   * Standard Material/Premium curve.
   */
  emphasized: "cubic-bezier(0.2, 0, 0, 1)" as const,

  /**
   * Architectural — ultra-smooth, near-linear deceleration.
   * For environmental elements: ambient drift, light planes.
   */
  architectural: "cubic-bezier(0.25, 0.1, 0.25, 1)" as const,

  /**
   * Linear — constant velocity. Progress indicators, loading states.
   */
  linear: "linear" as const,
} as const;

// ─────────────────────────────────────────────────────────────
// GSAP-COMPATIBLE EASING
// ─────────────────────────────────────────────────────────────

/**
 * GSAP easing string equivalents for use in GSAP animations.
 * These correspond to the CSS easing tokens above.
 */
export const gsapEasing = {
  /** General UI transitions. */
  standard: "power2.inOut" as const,
  /** Panels entering the scene. */
  enter: "power3.out" as const,
  /** Elements departing. */
  exit: "power2.in" as const,
  /** Emphasized transitions. */
  emphasized: "power4.out" as const,
  /** Hero and title elements. Slow, confident reveal. */
  cinematic: "power3.out" as const,
  /** Background/ambient elements. Ultra-smooth. */
  architectural: "sine.inOut" as const,
  /** Loops — ambient drift. */
  ambient: "sine.inOut" as const,
} as const;

// ─────────────────────────────────────────────────────────────
// MOTION RULES (CSS property strings)
// ─────────────────────────────────────────────────────────────

/**
 * Pre-built CSS `transition` strings for common component patterns.
 * Use these in `style={{ transition: motion.transition.interactive }}`.
 */
export const transition = {
  /** Hover interactions: opacity, color, border. */
  interactive: `all ${durationS.hover} ${easing.standard}` as const,
  /** Panel/card reveals. */
  panel: `all ${durationS.normal} ${easing.enter}` as const,
  /** Emphasized panel/card entrance. */
  emphasizedPanel: `all ${durationS.comfortable} ${easing.emphasized}` as const,
  /** Fade-only transitions (opacity). GPU-friendly. */
  fade: `opacity ${durationS.comfortable} ${easing.standard}` as const,
  /** Transform-only transitions. GPU-friendly. */
  transform: `transform ${durationS.normal} ${easing.cinematic}` as const,
  /** Combined opacity + transform. Most content reveals. */
  reveal: `opacity ${durationS.reveal} ${easing.cinematic}, transform ${durationS.reveal} ${easing.cinematic}` as const,
} as const;

// ─────────────────────────────────────────────────────────────
// REDUCED MOTION OVERRIDES
// ─────────────────────────────────────────────────────────────

/**
 * Duration values to use when `prefers-reduced-motion: reduce` is active.
 * Disables all ambient and cinematic motion; retains minimal UI feedback.
 */
export const reducedDuration = {
  instant: 0,
  fast: 0,
  hover: 0,
  normal: 0,
  comfortable: 0,
  slow: 0,
  deliberate: 0,
  reveal: 0,
  cinematic: 0,
  scene: 0,
  ambient: 0,
} as const;

// ─────────────────────────────────────────────────────────────
// UNIFIED EXPORT
// ─────────────────────────────────────────────────────────────

export const motion = {
  duration,
  durationS,
  easing,
  gsapEasing,
  transition,
  reducedDuration,
} as const;

export type DurationKey = keyof typeof duration;
export type EasingKey = keyof typeof easing;
export type GsapEasingKey = keyof typeof gsapEasing;
export type TransitionKey = keyof typeof transition;

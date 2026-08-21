/**
 * PROJECT NEXUS — Breakpoint System
 *
 * Matches Tailwind CSS v4 defaults for consistency.
 * Use these tokens when breakpoints are needed in JS/TS logic
 * (e.g. useMediaQuery hooks, conditional rendering).
 * In CSS/Tailwind, use the standard responsive prefix (`sm:`, `md:`, etc.).
 */

/** Breakpoint values in pixels (min-width semantics). */
export const breakpoints = {
  /** 640px — Small devices (landscape phones). */
  sm: 640,
  /** 768px — Medium devices (tablets). */
  md: 768,
  /** 1024px — Large devices (laptops). */
  lg: 1024,
  /** 1280px — Extra-large devices (desktops). */
  xl: 1280,
  /** 1400px — Maximum content width as specified in the Project Bible. */
  "2xl": 1400,
} as const;

/**
 * Returns a CSS `min-width` media query string for a breakpoint.
 *
 * @example
 * mediaQuery("md")  // → "@media (min-width: 768px)"
 */
export function mediaQuery(key: BreakpointKey): string {
  return `@media (min-width: ${breakpoints[key]}px)`;
}

/**
 * Returns true if the current viewport is at least as wide as the given breakpoint.
 * Intended for runtime JS checks — prefer CSS media queries for styling.
 *
 * NOTE: Returns `false` on the server (SSR-safe).
 */
export function matchesBreakpoint(key: BreakpointKey): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(`(min-width: ${breakpoints[key]}px)`).matches;
}

export type BreakpointScale = typeof breakpoints;
export type BreakpointKey = keyof BreakpointScale;
export type BreakpointValue = BreakpointScale[BreakpointKey];

/**
 * PROJECT NEXUS — Typography System
 *
 * Complete type scale for all text variants in the experience.
 * Every heading, body, and label derives from this file.
 *
 * Variants (from spec):
 *   hero        — Full-screen cinematic title (Chapter titles, Genesis)
 *   statement   — Large declarative statement (key ideas, intro lines)
 *   chapter     — Chapter headings with generous tracking
 *   section     — Section subheadings within chapters
 *   reflection  — Thoughtful body copy, philosophy, introspective text
 *   navigation  — UI navigation labels (small, tracked, uppercase)
 *   caption     — Annotation, UI labels, helper text
 *   metadata    — System/diagnostic mono text, timestamps, indices
 *
 * Font stack (from Project Bible):
 *   Primary: Inter
 *   Secondary: Geist Sans (loaded in layout.tsx)
 *   Mono: system-ui monospace for metadata
 */

import type { CSSProperties } from "react";

export interface TypographyDefinition {
  /** Font size in rem. */
  fontSize: string;
  /** Responsive font size for sm+ breakpoint. */
  fontSizeSm?: string;
  /** Font weight. */
  fontWeight: CSSProperties["fontWeight"];
  /** Letter spacing (tracking). */
  letterSpacing: string;
  /** Line height. */
  lineHeight: CSSProperties["lineHeight"];
  /** Text transform. */
  textTransform?: CSSProperties["textTransform"];
  /** Font family override. Defaults to --font-geist-sans / Inter. */
  fontFamily?: string;
  /** Default HTML element for this variant. */
  defaultElement: keyof React.JSX.IntrinsicElements;
}

export const typeScale: Record<TypographyVariant, TypographyDefinition> = {
  /**
   * HERO XXL — Giant display title.
   * Used for major highlights, signature epilogue pages.
   */
  heroXXL: {
    fontSize: "4rem",        // 64px
    fontSizeSm: "6rem",      // 96px — sm+
    fontWeight: 300,
    letterSpacing: "0.5em",
    lineHeight: 1.05,
    textTransform: "uppercase",
    defaultElement: "h1",
  },

  /**
   * HERO XL — Full-screen cinematic statement.
   * Used for Genesis name sequence, chapter transitions.
   */
  heroXL: {
    fontSize: "3rem",        // 48px
    fontSizeSm: "4.5rem",    // 72px — sm+
    fontWeight: 300,
    letterSpacing: "0.45em",
    lineHeight: 1.1,
    textTransform: "uppercase",
    defaultElement: "h1",
  },

  /**
   * HERO LARGE — Medium-large display title.
   */
  heroLarge: {
    fontSize: "2rem",        // 32px
    fontSizeSm: "3rem",      // 48px — sm+
    fontWeight: 300,
    letterSpacing: "0.4em",
    lineHeight: 1.15,
    textTransform: "uppercase",
    defaultElement: "h1",
  },

  /**
   * Legacy HERO mapping.
   */
  hero: {
    fontSize: "3rem",        // 48px
    fontSizeSm: "4.5rem",    // 72px — sm+
    fontWeight: 300,
    letterSpacing: "0.45em",
    lineHeight: 1.1,
    textTransform: "uppercase",
    defaultElement: "h1",
  },

  /**
   * STATEMENT — Large declarative text.
   * Core ideas, manifesto-style lines, intro paragraphs.
   */
  statement: {
    fontSize: "1.75rem",     // 28px
    fontSizeSm: "2.25rem",   // 36px — sm+
    fontWeight: 300,
    letterSpacing: "0.15em",
    lineHeight: 1.15,
    defaultElement: "h2",
  },

  /**
   * CHAPTER — Chapter section heading.
   * Identifies the chapter title within the chapter UI.
   */
  chapter: {
    fontSize: "1.5rem",      // 24px
    fontSizeSm: "2rem",      // 32px — sm+
    fontWeight: 300,
    letterSpacing: "0.4em",
    lineHeight: 1.2,
    textTransform: "uppercase",
    defaultElement: "h2",
  },

  /**
   * SECTION — Within-chapter section title.
   * Divides content areas within a chapter (e.g., "PROJECTS", "SKILLS").
   */
  section: {
    fontSize: "1rem",        // 16px
    fontSizeSm: "1.25rem",   // 20px — sm+
    fontWeight: 300,
    letterSpacing: "0.25em",
    lineHeight: 1.3,
    textTransform: "uppercase",
    defaultElement: "h3",
  },

  /**
   * BODY LARGE — High-contrast body text.
   */
  bodyLarge: {
    fontSize: "1.125rem",    // 18px
    fontSizeSm: "1.25rem",   // 20px — sm+
    fontWeight: 300,
    letterSpacing: "0.04em",
    lineHeight: 1.7,
    defaultElement: "p",
  },

  /**
   * BODY — Standard readable copy.
   */
  body: {
    fontSize: "0.9375rem",   // 15px
    fontSizeSm: "1rem",      // 16px — sm+
    fontWeight: 300,
    letterSpacing: "0.04em",
    lineHeight: 1.75,
    defaultElement: "p",
  },

  /**
   * Legacy REFLECTION mapping.
   */
  reflection: {
    fontSize: "0.9375rem",   // 15px
    fontSizeSm: "1rem",      // 16px — sm+
    fontWeight: 300,
    letterSpacing: "0.04em",
    lineHeight: 1.75,
    defaultElement: "p",
  },

  /**
   * BODY SMALL — Compact body notes.
   */
  bodySmall: {
    fontSize: "0.8125rem",   // 13px
    fontSizeSm: "0.875rem",  // 14px — sm+
    fontWeight: 300,
    letterSpacing: "0.04em",
    lineHeight: 1.65,
    defaultElement: "p",
  },

  /**
   * NAVIGATION — UI nav labels.
   * Chapter selectors, menu items, interactive labels.
   */
  navigation: {
    fontSize: "0.625rem",    // 10px
    fontSizeSm: "0.6875rem", // 11px — sm+
    fontWeight: 400,
    letterSpacing: "0.25em",
    lineHeight: 1.4,
    textTransform: "uppercase",
    defaultElement: "span",
  },

  /**
   * CAPTION — Annotation, hints, helper copy.
   * Subtitle labels, instructional hints, index markers.
   */
  caption: {
    fontSize: "0.625rem",    // 10px
    fontSizeSm: "0.6875rem", // 11px — sm+
    fontWeight: 300,
    letterSpacing: "0.2em",
    lineHeight: 1.5,
    textTransform: "uppercase",
    defaultElement: "span",
  },

  /**
   * METADATA — System / diagnostic mono text.
   * Version numbers, timestamps, coordinate readouts.
   * Monospaced font family.
   */
  metadata: {
    fontSize: "0.5625rem",   // 9px
    fontSizeSm: "0.625rem",  // 10px — sm+
    fontWeight: 400,
    letterSpacing: "0.12em",
    lineHeight: 1.4,
    textTransform: "uppercase",
    defaultElement: "span",
  },
};

export type TypographyVariant =
  | "heroXXL"
  | "heroXL"
  | "heroLarge"
  | "hero"
  | "statement"
  | "chapter"
  | "section"
  | "bodyLarge"
  | "body"
  | "reflection"
  | "bodySmall"
  | "navigation"
  | "caption"
  | "metadata";

/**
 * Returns the CSS style properties for a given typography variant.
 * Note: Font size responsiveness should be applied via CSS (sm: prefix)
 * or via the HeroText component which handles responsive sizing.
 *
 * @example
 * const style = getTypeStyle("chapter");
 * <h2 style={style}>CREATION</h2>
 */
export function getTypeStyle(variant: TypographyVariant): CSSProperties {
  const def = typeScale[variant];
  return {
    fontSize: def.fontSize,
    fontWeight: def.fontWeight,
    letterSpacing: def.letterSpacing,
    lineHeight: def.lineHeight,
    ...(def.textTransform ? { textTransform: def.textTransform } : {}),
    ...(def.fontFamily ? { fontFamily: def.fontFamily } : {}),
  };
}

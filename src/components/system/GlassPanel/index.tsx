import React, { forwardRef } from "react";
import { colors } from "@/design/colors";
import { radius, radiusPx } from "@/design/radius";
import { shadows } from "@/design/shadows";
import { motion } from "@/design/motion";
import type { RadiusKey } from "@/design/radius";

export interface SystemGlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /**
   * Enable hover state (subtle background brightening, border lift).
   * Only enable on interactive containers — not decorative panels.
   *
   * Per the Project Bible: "Glass exists ONLY for interaction."
   */
  interactive?: boolean;
  /**
   * Border-radius key. Defaults to "md" (6px) — minimal rounding.
   */
  borderRadius?: RadiusKey;
  /**
   * Blur strength. Defaults to "subtle" (8px).
   * "none" removes backdrop-filter entirely.
   * Prefer "subtle" — heavy blur is a performance and aesthetic anti-pattern.
   */
  blur?: "none" | "subtle" | "moderate";
  className?: string;
}

/**
 * SystemGlassPanel
 *
 * System-level glass container. Exists ONLY for interactive regions.
 *
 * Design contract (Project Bible):
 *   - Very subtle blur — not a dominant visual effect
 *   - Thin border — rgba(255,255,255,0.10) at rest
 *   - Minimal reflection (low background opacity)
 *   - NO glowing borders
 *   - NO flashy transparency
 *
 * This is intentionally separate from `core/GlassPanel` to allow
 * Sprint 02 migration without breaking existing chapter code.
 *
 * Usage:
 *   Only wrap truly interactive elements (buttons, form fields, cards
 *   that respond to user interaction). For structural surfaces,
 *   use the Surface component instead.
 *
 * @example
 * <SystemGlassPanel interactive>
 *   <button>Contact</button>
 * </SystemGlassPanel>
 */
export const SystemGlassPanel = forwardRef<HTMLDivElement, SystemGlassPanelProps>(
  (
    {
      children,
      interactive = false,
      borderRadius = "md",
      blur = "subtle",
      className = "",
      style,
      ...props
    },
    ref
  ) => {
    const blurMap: Record<"none" | "subtle" | "moderate", string> = {
      none: "none",
      subtle: "blur(8px)",
      moderate: "blur(14px)",
    };

    const backdropFilter = blurMap[blur];
    const glassShadow = interactive ? shadows.panel : `${shadows.panel}, ${shadows.light}`;

    return (
      <div
        ref={ref}
        className={className}
        style={{
          position: "relative",
          backgroundColor: colors.glass,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: colors.glassBorder,
          borderRadius: radiusPx(radius[borderRadius]),
          backdropFilter,
          WebkitBackdropFilter: backdropFilter,
          boxShadow: glassShadow,
          transition: interactive
            ? `background-color ${motion.durationS.hover} ${motion.easing.standard}, border-color ${motion.durationS.hover} ${motion.easing.standard}, box-shadow ${motion.durationS.normal} ${motion.easing.standard}`
            : "none",
          ...style,
        }}
        onMouseEnter={
          interactive
            ? (e) => {
                const el = e.currentTarget;
                el.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
                el.style.borderColor = colors.glassBorderHover;
                el.style.boxShadow = `${shadows.lg}, ${shadows.light}`;
              }
            : undefined
        }
        onMouseLeave={
          interactive
            ? (e) => {
                const el = e.currentTarget;
                el.style.backgroundColor = colors.glass;
                el.style.borderColor = colors.glassBorder;
                el.style.boxShadow = glassShadow;
              }
            : undefined
        }
        {...props}
      >
        {children}
      </div>
    );
  }
);

SystemGlassPanel.displayName = "SystemGlassPanel";

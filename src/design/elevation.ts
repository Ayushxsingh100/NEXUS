/**
 * PROJECT NEXUS — Elevation System
 *
 * Elevation combines surface color, shadow, and border to create a
 * convincing sense of depth without relying on blur or glow.
 *
 * Inspired by material surfaces in architectural spaces — each layer
 * feels physically heavier as it rises from the canvas.
 *
 * Elevation Levels:
 *   0 → Canvas (the infinite backdrop)
 *   1 → Ground (base content layer)
 *   2 → Raised (cards, panels)
 *   3 → Floating (overlays, glass panels)
 */

import { colors } from "./colors";
import { shadows } from "./shadows";
import type { CSSProperties } from "react";

export interface ElevationStyle {
  backgroundColor: string;
  boxShadow: string;
  borderColor: string;
}

/**
 * Returns CSS style properties for a given elevation level.
 *
 * @example
 * const el1 = elevation(1);
 * // → { backgroundColor: "#0B1118", boxShadow: "...", borderColor: "..." }
 *
 * <div style={elevation(2)}>...</div>
 */
export function elevation(level: 0 | 1 | 2 | 3): ElevationStyle & CSSProperties {
  switch (level) {
    case 0:
      return {
        backgroundColor: colors.canvas,
        boxShadow: shadows.none,
        borderColor: "transparent",
      };
    case 1:
      return {
        backgroundColor: colors.surface,
        boxShadow: shadows.sm,
        borderColor: colors.borderSubtle,
      };
    case 2:
      return {
        backgroundColor: colors.elevated,
        boxShadow: shadows.md,
        borderColor: colors.borderDefault,
      };
    case 3:
      return {
        backgroundColor: colors.elevated,
        boxShadow: shadows.panel,
        borderColor: colors.borderStrong,
      };
  }
}

/**
 * All four elevation levels as static objects.
 * Use `elevation(n)` for dynamic access.
 */
export const elevationLevels = {
  0: elevation(0),
  1: elevation(1),
  2: elevation(2),
  3: elevation(3),
} as const;

export type ElevationLevel = 0 | 1 | 2 | 3;

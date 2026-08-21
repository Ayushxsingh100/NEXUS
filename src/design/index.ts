/**
 * PROJECT NEXUS — Design System
 *
 * Unified barrel export for all design tokens.
 *
 * Usage patterns:
 *
 *   // Named imports (preferred — tree-shakable):
 *   import { colors, motion, spacing } from "@/design";
 *   import { accent, canvas } from "@/design/colors";
 *
 *   // Namespace access (useful for exhaustive references):
 *   import { design } from "@/design";
 *   design.colors.accent
 *   design.motion.duration.cinematic
 */

// Token modules
export * from "./colors";
export * from "./spacing";
export * from "./radius";
export * from "./motion";
export * from "./typography";
export * from "./breakpoints";
export * from "./zIndex";
export * from "./shadows";
export * from "./elevation";
export * from "./environment";

// Re-export the grouped token objects for namespace access
import { colors } from "./colors";
import { spacing } from "./spacing";
import { radius } from "./radius";
import { motion } from "./motion";
import { typeScale, getTypeStyle } from "./typography";
import { breakpoints } from "./breakpoints";
import { zIndex } from "./zIndex";
import { shadows } from "./shadows";
import { elevationLevels, elevation } from "./elevation";
import { environment } from "./environment";

/**
 * Full design namespace.
 * Prefer individual named imports for production code.
 * Use this object for design tooling, documentation, or exhaustive access.
 */
export const design = {
  colors,
  spacing,
  radius,
  motion,
  typography: {
    scale: typeScale,
    getStyle: getTypeStyle,
  },
  breakpoints,
  zIndex,
  shadows,
  elevation: {
    levels: elevationLevels,
    get: elevation,
  },
  environment,
} as const;

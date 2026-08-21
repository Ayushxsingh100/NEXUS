import React from "react";
import { colors } from "@/design/colors";

export interface SystemDividerProps {
  /** Layout orientation. Defaults to "horizontal". */
  orientation?: "horizontal" | "vertical";
  /**
   * Visual strength of the divider.
   * "subtle" — barely-visible structural rule
   * "standard" — clear section separator
   */
  strength?: "subtle" | "standard";
  /** Optional className. */
  className?: string;
  /** Accessible label for screen readers. Defaults to role="separator". */
  "aria-label"?: string;
}

/**
 * SystemDivider
 *
 * Architectural rule line. Micro-thin, faded endpoints.
 * Purely structural — carries no visual weight beyond separation.
 *
 * Rules (from Project Bible):
 *   - No glow
 *   - No color (uses borderSubtle or borderDefault only)
 *   - Always fade at both ends (gradient from transparent)
 *   - Should be nearly invisible — dividers guide, not decorate
 *
 * This replaces `core/Divider` in Sprint 02.
 *
 * @example
 * <SystemDivider />
 * <SystemDivider orientation="vertical" />
 * <SystemDivider strength="standard" />
 */
export function SystemDivider({
  orientation = "horizontal",
  strength = "subtle",
  className = "",
  "aria-label": ariaLabel,
}: SystemDividerProps) {
  const borderColor =
    strength === "subtle" ? colors.borderSubtle : colors.borderDefault;

  if (orientation === "vertical") {
    return (
      <div
        role="separator"
        aria-label={ariaLabel}
        aria-orientation="vertical"
        className={className}
        style={{
          width: "1px",
          height: "100%",
          background: `linear-gradient(to bottom, transparent 0%, ${borderColor} 30%, ${borderColor} 70%, transparent 100%)`,
          flexShrink: 0,
        }}
      />
    );
  }

  return (
    <div
      role="separator"
      aria-label={ariaLabel}
      aria-orientation="horizontal"
      className={className}
      style={{
        width: "100%",
        height: "1px",
        background: `linear-gradient(to right, transparent 0%, ${borderColor} 20%, ${borderColor} 80%, transparent 100%)`,
        flexShrink: 0,
      }}
    />
  );
}

SystemDivider.displayName = "SystemDivider";

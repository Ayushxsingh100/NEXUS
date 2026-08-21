import React from "react";
import { HeroText } from "@/components/system/HeroText";
import { colors } from "@/design/colors";
import { spacing, px } from "@/design/spacing";

export interface SystemSectionTitleProps {
  /** The primary section title. */
  title: string;
  /**
   * Optional eyebrow label displayed above the title.
   * Rendered in the `caption` variant — small, tracked, muted.
   */
  eyebrow?: string;
  /** Text alignment. Defaults to "left". */
  align?: "left" | "center" | "right";
  /** Variant for the main title. Defaults to "section". */
  titleVariant?: "section" | "chapter" | "statement";
  /** Optional className applied to the wrapper. */
  className?: string;
}

/**
 * SystemSectionTitle
 *
 * System-level section title block.
 * Replaces `core/SectionTitle` in Sprint 02.
 *
 * Key improvements over the legacy version:
 *   - All styles via design tokens (no magic Tailwind values)
 *   - Uses HeroText for the title — ensuring single typography definition
 *   - Eyebrow replaces "subtitle" for clearer naming
 *   - Title variant is configurable for different chapter contexts
 *
 * @example
 * <SystemSectionTitle
 *   eyebrow="Chapter IV"
 *   title="Creation"
 *   align="center"
 * />
 *
 * <SystemSectionTitle
 *   eyebrow="Skills"
 *   title="Technical Architecture"
 *   titleVariant="chapter"
 * />
 */
export function SystemSectionTitle({
  title,
  eyebrow,
  align = "left",
  titleVariant = "section",
  className = "",
}: SystemSectionTitleProps) {
  const alignStyle: Record<typeof align, React.CSSProperties> = {
    left: { textAlign: "left", alignItems: "flex-start" },
    center: { textAlign: "center", alignItems: "center" },
    right: { textAlign: "right", alignItems: "flex-end" },
  };

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: px(spacing[1]),
        ...alignStyle[align],
      }}
    >
      {eyebrow && (
        <HeroText
          variant="caption"
          style={{
            color: colors.accent,
            display: "block",
          }}
        >
          {eyebrow}
        </HeroText>
      )}
      <HeroText variant={titleVariant}>{title}</HeroText>
    </div>
  );
}

SystemSectionTitle.displayName = "SystemSectionTitle";

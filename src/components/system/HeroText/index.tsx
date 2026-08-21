import React, { forwardRef } from "react";
import { typeScale, getTypeStyle, type TypographyVariant } from "@/design/typography";
import { colors } from "@/design/colors";

// Maps each variant to its semantic default color
const variantColorMap: Record<TypographyVariant, string> = {
  heroXXL: colors.textPrimary,
  heroXL: colors.textPrimary,
  heroLarge: colors.textPrimary,
  hero: colors.textPrimary,
  statement: colors.textPrimary,
  chapter: colors.textPrimary,
  section: colors.textPrimary,
  bodyLarge: colors.textSecondary,
  body: colors.textSecondary,
  reflection: colors.textSecondary,
  bodySmall: colors.textSecondary,
  navigation: colors.textMuted,
  caption: colors.textMuted,
  metadata: colors.textDisabled,
};

// Maps each variant to its default HTML element for semantic HTML
const variantElementMap: Record<TypographyVariant, keyof React.JSX.IntrinsicElements> = {
  heroXXL: "h1",
  heroXL: "h1",
  heroLarge: "h1",
  hero: "h1",
  statement: "h2",
  chapter: "h2",
  section: "h3",
  bodyLarge: "p",
  body: "p",
  reflection: "p",
  bodySmall: "p",
  navigation: "span",
  caption: "span",
  metadata: "span",
};

export interface HeroTextProps {
  /**
   * The typographic variant to render.
   *
   * | Variant      | Element | Size     | Use case                              |
   * |---|---|---|---|
   * | `hero`       | h1      | 56–80px  | Chapter titles, Genesis               |
   * | `statement`  | h2      | 32–48px  | Core ideas, intro statements          |
   * | `chapter`    | h2      | 24–32px  | Chapter headings                      |
   * | `section`    | h3      | 16–20px  | Section titles within chapters        |
   * | `reflection` | p       | 15–16px  | Body copy, philosophy, about text     |
   * | `navigation` | span    | 10–11px  | Nav labels, menu items                |
   * | `caption`    | span    | 10–11px  | Annotations, hints, subtitles         |
   * | `metadata`   | span    | 9–10px   | Mono system text, timestamps          |
   */
  variant: TypographyVariant;
  /**
   * Override the default semantic element.
   * Use when the visual style doesn't match the structural role.
   * Example: Use `as="h1"` for a statement-styled element that is
   * semantically the page heading.
   */
  as?: keyof React.JSX.IntrinsicElements;
  /**
   * Override the default color for this variant.
   * Prefer the token defaults — only override for accent or semantic cases.
   */
  color?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  "aria-label"?: string;
}

/**
 * HeroText
 *
 * The unified typography primitive for Project Nexus.
 * A single component replacing all ad-hoc heading classes across chapters.
 *
 * Design principles:
 *   - All type styles derive from `design/typography.ts` tokens
 *   - No duplicated Tailwind classes — no `text-5xl sm:text-7xl` elsewhere
 *   - Polymorphic via `as` prop with semantic defaults per variant
 *   - Default colors mapped to design token text values
 *   - The `hero` variant includes responsive font scaling via CSS
 *
 * Responsive sizing:
 *   The component applies the base font size via inline style.
 *   Responsive overrides (sm breakpoint) are applied via a className
 *   using CSS custom property `--font-size-sm` injected at mount.
 *   This avoids Tailwind magic values while maintaining responsiveness.
 *
 * @example
 * <HeroText variant="hero">GENESIS</HeroText>
 * <HeroText variant="chapter">Creation</HeroText>
 * <HeroText variant="reflection">
 *   This engineer genuinely cares about craftsmanship.
 * </HeroText>
 * <HeroText variant="metadata" as="time">2026 — present</HeroText>
 */
export const HeroText = forwardRef<HTMLElement, HeroTextProps>(
  (
    {
      variant,
      as,
      color,
      children,
      className = "",
      style,
      ...props
    },
    ref
  ) => {
    const def = typeScale[variant];
    const Tag = (as ?? variantElementMap[variant]) as unknown as React.ForwardRefExoticComponent<{ children?: React.ReactNode; className?: string; style?: React.CSSProperties; id?: string; "aria-label"?: string; "data-variant"?: string } & React.RefAttributes<HTMLElement>>;
    const baseStyle = getTypeStyle(variant);
    const defaultColor = variantColorMap[variant];

    // Combine standard styles with optional custom overrides
    const combinedStyle: React.CSSProperties = {
      ...baseStyle,
      color: color ?? defaultColor,
      transition: "color 0.3s ease",
      ...(def.fontSizeSm
        ? ({
            "--font-size-sm": def.fontSizeSm,
          } as React.CSSProperties)
        : {}),
      ...style,
    };

    return (
      <Tag
        ref={ref}
        className={`nexus-text-${variant} tracking-normal ${className}`}
        style={combinedStyle}
        data-variant={variant}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);

HeroText.displayName = "HeroText";

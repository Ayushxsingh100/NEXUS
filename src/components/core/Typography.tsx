import React from "react";
import { HeroText } from "@/components/system/HeroText";

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

export function HeroTitle({ children, className = "", style, ...props }: TypographyProps) {
  return (
    <HeroText
      variant="hero"
      className={className}
      style={{ selectNone: "none", ...style } as React.CSSProperties}
      {...props}
    >
      {children}
    </HeroText>
  );
}

export function ChapterHeading({ children, className = "", ...props }: TypographyProps) {
  return (
    <HeroText variant="chapter" className={className} {...props}>
      {children}
    </HeroText>
  );
}

export function SectionHeading({ children, className = "", style, ...props }: TypographyProps) {
  return (
    <HeroText
      variant="section"
      color="var(--color-accent, #7dd3fc)"
      className={className}
      style={{ fontWeight: 600, ...style }}
      {...props}
    >
      {children}
    </HeroText>
  );
}

export function Paragraph({ children, className = "", style, ...props }: TypographyProps) {
  return (
    <HeroText
      variant="reflection"
      color="var(--muted-text, #a1a1aa)"
      className={className}
      style={{ ...style }}
      {...props}
    >
      {children}
    </HeroText>
  );
}

export function Quote({ children, className = "", style, ...props }: TypographyProps) {
  // Legacy Quote: inline, small (11px-12px), text-white/50, italic
  return (
    <HeroText
      variant="caption"
      as="span"
      color="rgba(255, 255, 255, 0.5)"
      className={className}
      style={{
        fontStyle: "italic",
        textTransform: "none",
        letterSpacing: "0.2em",
        paddingLeft: "0.2em",
        ...style
      }}
      {...props}
    >
      {children}
    </HeroText>
  );
}

export function Caption({ children, className = "", style, ...props }: TypographyProps) {
  return (
    <HeroText
      variant="caption"
      color="rgba(255, 255, 255, 0.45)"
      className={className}
      style={{ ...style }}
      {...props}
    >
      {children}
    </HeroText>
  );
}

export function Label({ children, className = "", style, ...props }: TypographyProps) {
  // Legacy Label: text-sky-400 (or custom), 9px-10px, 0.45em tracking
  return (
    <HeroText
      variant="caption"
      color="var(--color-accent, #7dd3fc)"
      className={className}
      style={{
        letterSpacing: "0.45em",
        paddingLeft: "0.45em",
        ...style
      }}
      {...props}
    >
      {children}
    </HeroText>
  );
}

export function Metadata({ children, className = "", style, ...props }: TypographyProps) {
  return (
    <HeroText
      variant="metadata"
      color="rgba(255, 255, 255, 0.25)"
      className={className}
      style={{ selectNone: "none", ...style } as React.CSSProperties}
      {...props}
    >
      {children}
    </HeroText>
  );
}

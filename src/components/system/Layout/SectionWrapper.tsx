import React from "react";
import { Container } from "./Container";
import { spacing, px } from "@/design/spacing";

export interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  containerSize?: "sm" | "md" | "lg" | "xl" | "full";
}

/**
 * SectionWrapper
 *
 * Section block manager regulating margins and layouts.
 */
export function SectionWrapper({ children, containerSize = "lg", className = "", style, ...props }: SectionWrapperProps) {
  return (
    <section
      className={`w-full relative ${className}`}
      style={{
        paddingTop: px(spacing[8]),
        paddingBottom: px(spacing[8]),
        ...style,
      }}
      {...props}
    >
      <Container size={containerSize}>
        {children}
      </Container>
    </section>
  );
}

SectionWrapper.displayName = "SectionWrapper";

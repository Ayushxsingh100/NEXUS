import React from "react";

export interface FadeMaskProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "top" | "bottom" | "left" | "right";
  color?: string;
  intensity?: number;
}

/**
 * FadeMask
 *
 * Volumetric gradient mask utility to smoothly blend content layers or block edges.
 */
export function FadeMask({
  direction = "bottom",
  color = "#050608",
  intensity = 1.0,
  className = "",
  style,
  ...props
}: FadeMaskProps) {
  const gradients = {
    top: `linear-gradient(to top, transparent, ${color})`,
    bottom: `linear-gradient(to bottom, transparent, ${color})`,
    left: `linear-gradient(to left, transparent, ${color})`,
    right: `linear-gradient(to right, transparent, ${color})`,
  };

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none select-none ${className}`}
      style={{
        background: gradients[direction],
        opacity: intensity,
        zIndex: 10,
        ...style,
      }}
      {...props}
    />
  );
}

FadeMask.displayName = "FadeMask";

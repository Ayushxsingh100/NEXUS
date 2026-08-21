import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  glowColor?: "cyan" | "violet" | "none";
  size?: "sm" | "md";
}

/**
 * Reusable layout badge tag for indicators and tags with subtle active glow options.
 */
export function Badge({
  children,
  glowColor = "none",
  size = "md",
  className = "",
  ...props
}: BadgeProps) {
  const sizeClass = {
    sm: "px-2 py-0.5 text-[8px] tracking-[0.18em] pl-[0.18em]",
    md: "px-3 py-1 text-[9px] tracking-[0.22em] pl-[0.22em]",
  }[size];

  const glowStyles = {
    cyan: "bg-sky-500/10 text-sky-300 border-sky-500/35 shadow-[0_0_12px_rgba(125,211,252,0.12)]",
    violet: "bg-purple-500/10 text-purple-300 border-purple-500/35 shadow-[0_0_12px_rgba(192,132,252,0.12)]",
    none: "bg-zinc-900 text-zinc-400 border-glass-border",
  }[glowColor];

  return (
    <span
      className={`
        inline-flex items-center justify-center font-sans font-light uppercase border rounded-full select-none
        ${sizeClass}
        ${glowStyles}
        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  );
}

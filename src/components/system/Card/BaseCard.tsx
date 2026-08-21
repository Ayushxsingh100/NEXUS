"use client";

import React, { forwardRef, useRef } from "react";
import { shadows } from "@/design/shadows";

export interface BaseCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  interactive?: boolean;
  glowColor?: "cyan" | "violet" | "none";
  className?: string;
}

/**
 * BaseCard
 *
 * Foundational architectural card primitive with mouse-position spotlight backdrop glows.
 */
export const BaseCard = forwardRef<HTMLDivElement, BaseCardProps>(
  ({ children, interactive = true, glowColor = "none", className = "", style, ...props }, ref) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!interactive) return;
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty("--mouse-x", `${x}px`);
      el.style.setProperty("--mouse-y", `${y}px`);
    };

    const shadowClass = {
      cyan: "hover:shadow-[0_20px_45px_rgba(0,0,0,0.7),0_0_25px_rgba(125,211,252,0.08),inset_0_1px_2px_rgba(255,255,255,0.15)] hover:border-sky-400/30",
      violet: "hover:shadow-[0_20px_45px_rgba(0,0,0,0.7),0_0_25px_rgba(139,92,246,0.08),inset_0_1px_2px_rgba(255,255,255,0.15)] hover:border-violet-400/30",
      none: "hover:border-zinc-700/50 hover:bg-zinc-950/20",
    }[glowColor];

    const radialGlowBg = {
      cyan: "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(125, 211, 252, 0.04) 0%, transparent 65%)",
      violet: "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(139, 92, 246, 0.04) 0%, transparent 65%)",
      none: "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.015) 0%, transparent 60%)",
    }[glowColor];

    return (
      <div
        ref={(node) => {
          // Set internal ref for mouse tracking
          if (cardRef) {
            (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }
          // Forward ref
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }
        }}
        onMouseMove={handleMouseMove}
        className={`
          group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl border backdrop-blur-xl
          bg-glass-bg border-glass-border select-none
          transition-all duration-comfortable ease-standard
          ${interactive ? `cursor-pointer hover:-translate-y-1 ${shadowClass}` : ""}
          ${className}
        `}
        style={{
          boxShadow: shadows.panel,
          ...style,
        }}
        {...props}
      >
        {/* Dynamic Hover Spotlight Background */}
        {interactive && (
          <div
            className="absolute inset-0 -z-10 rounded-2xl transition-opacity duration-comfortable opacity-0 group-hover:opacity-100 pointer-events-none"
            style={{
              background: radialGlowBg,
            }}
          />
        )}
        {children}
      </div>
    );
  }
);

BaseCard.displayName = "BaseCard";

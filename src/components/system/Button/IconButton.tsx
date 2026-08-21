"use client";

import React, { forwardRef } from "react";
import { colors } from "@/design/colors";
import { shadows } from "@/design/shadows";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

/**
 * IconButton
 *
 * Clean, square structural icon trigger button with subtle borders and lighting.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`
          relative flex items-center justify-center w-10 h-10 rounded-md
          bg-glass-bg border border-glass-border cursor-pointer select-none
          transition-all duration-300 outline-none active:scale-95
          ${className}
        `}
        style={{
          boxShadow: shadows.panel,
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
          el.style.borderColor = colors.glassBorderHover;
          el.style.boxShadow = `${shadows.sm}, ${shadows.light}`;
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.backgroundColor = "";
          el.style.borderColor = colors.glassBorder;
          el.style.boxShadow = shadows.panel;
        }}
        {...props}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";

"use client";

import React, { forwardRef } from "react";
import { colors } from "@/design/colors";
import { shadows } from "@/design/shadows";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline" | "text" | "danger";
  size?: "sm" | "md" | "lg";
  active?: boolean;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

/**
 * Button
 *
 * System button styled to feel architectural, quiet, and premium.
 * Supports loading states, custom icons, and standard variants.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = "",
      variant = "secondary",
      size = "md",
      active = false,
      loading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      style,
      ...props
    },
    ref
  ) => {
    // Custom style presets mapped to layout tokens
    const styles = {
      primary: {
        bg: colors.highlight,
        border: colors.textPrimary,
        text: colors.canvas,
        shadow: `${shadows.sm}, ${shadows.light}`,
        hoverBg: "#ffffff",
        hoverBorder: "#ffffff",
        hoverText: colors.canvas,
      },
      secondary: {
        bg: colors.glass,
        border: colors.glassBorder,
        text: colors.textSecondary,
        shadow: shadows.panel,
        hoverBg: "rgba(255, 255, 255, 0.08)",
        hoverBorder: colors.glassBorderHover,
        hoverText: colors.textPrimary,
      },
      ghost: {
        bg: "transparent",
        border: "transparent",
        text: colors.textSecondary,
        shadow: shadows.none,
        hoverBg: "rgba(255, 255, 255, 0.05)",
        hoverBorder: "transparent",
        hoverText: colors.textPrimary,
      },
      outline: {
        bg: "transparent",
        border: colors.glassBorder,
        text: colors.textSecondary,
        shadow: shadows.none,
        hoverBg: "rgba(255, 255, 255, 0.03)",
        hoverBorder: colors.glassBorderHover,
        hoverText: colors.textPrimary,
      },
      text: {
        bg: "transparent",
        border: "transparent",
        text: colors.textMuted,
        shadow: shadows.none,
        hoverBg: "transparent",
        hoverBorder: "transparent",
        hoverText: colors.textPrimary,
      },
      danger: {
        bg: "rgba(239, 68, 68, 0.15)",
        border: "rgba(239, 68, 68, 0.4)",
        text: "#f87171",
        shadow: shadows.none,
        hoverBg: "rgba(239, 68, 68, 0.25)",
        hoverBorder: "rgba(239, 68, 68, 0.6)",
        hoverText: "#fca5a5",
      },
    }[variant];

    const sizeClass = {
      sm: "px-3.5 py-1.5 text-[9px] tracking-[0.2em]",
      md: "px-5 py-2.5 text-[10px] sm:text-xs tracking-[0.25em]",
      lg: "px-7 py-3 text-xs sm:text-sm tracking-[0.3em]",
    }[size];

    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={`
          relative font-sans font-normal uppercase select-none outline-none border rounded-md
          transition-all duration-hover ease-standard active:scale-98
          ${isDisabled ? "opacity-45 cursor-not-allowed" : "cursor-pointer"}
          ${sizeClass}
          ${className}
        `}
        style={{
          backgroundColor: active && variant === "secondary" ? "rgba(123, 215, 255, 0.08)" : styles.bg,
          borderColor: active && variant === "secondary" ? colors.accent : styles.border,
          color: active ? colors.textPrimary : styles.text,
          boxShadow: styles.shadow,
          ...style,
        }}
        onMouseEnter={(e) => {
          if (isDisabled) return;
          const el = e.currentTarget;
          if (!active) {
            el.style.backgroundColor = styles.hoverBg;
            el.style.borderColor = styles.hoverBorder;
            el.style.color = styles.hoverText;
          }
        }}
        onMouseLeave={(e) => {
          if (isDisabled) return;
          const el = e.currentTarget;
          if (!active) {
            el.style.backgroundColor = styles.bg;
            el.style.borderColor = styles.border;
            el.style.color = styles.text;
          }
        }}
        {...props}
      >
        <span className="relative z-10 flex items-center justify-center gap-2 pl-[0.25em]">
          {loading && (
            <svg
              className="animate-spin -ml-1 mr-1 h-3.5 w-3.5 text-current shrink-0"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}
          {!loading && leftIcon && (
            <span className="inline-flex items-center justify-center shrink-0 w-3.5 h-3.5">
              {leftIcon}
            </span>
          )}
          <span>{children}</span>
          {!loading && rightIcon && (
            <span className="inline-flex items-center justify-center shrink-0 w-3.5 h-3.5">
              {rightIcon}
            </span>
          )}
        </span>
      </button>
    );
  }
);

Button.displayName = "Button";

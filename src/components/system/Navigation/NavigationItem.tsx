"use client";

import React from "react";
import { colors } from "@/design/colors";
import { HeroText } from "@/components/system/HeroText";

export interface NavigationItemProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  children: React.ReactNode;
}

/**
 * NavigationItem
 *
 * Tracked uppercase navigation trigger with active underline indicator.
 */
export function NavigationItem({ active = false, children, className = "", ...props }: NavigationItemProps) {
  return (
    <div
      className={`relative py-2 px-1 cursor-pointer group select-none ${className}`}
      {...props}
    >
      <HeroText
        variant="navigation"
        style={{
          color: active ? colors.textPrimary : colors.textMuted,
          transition: "color var(--transition-duration-hover, 200ms) var(--transition-timing-function-standard, ease)",
        }}
        className="group-hover:text-white"
      >
        {children}
      </HeroText>
      
      {/* Active Underline Indicator */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px] transition-transform duration-hover ease-standard origin-left"
        style={{
          backgroundColor: colors.accent,
          transform: active ? "scaleX(1)" : "scaleX(0)",
        }}
      />
    </div>
  );
}

NavigationItem.displayName = "NavigationItem";

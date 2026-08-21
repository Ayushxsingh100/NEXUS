"use client";

import React, { forwardRef } from "react";
import { HeroText } from "../HeroText";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

/**
 * Input
 *
 * System input primitive with visual focus animation rings and standardized Poppins label weights.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full text-left font-sans">
        <HeroText
          variant="metadata"
          className="text-zinc-500 font-mono tracking-[0.2em] uppercase pl-[0.1em]"
        >
          {label}
        </HeroText>
        <input
          ref={ref}
          className={`
            w-full bg-glass-bg border border-glass-border rounded px-4 py-2.5 text-xs sm:text-sm font-light text-white outline-none backdrop-blur-xl
            focus:border-sky-400/40 focus:bg-black/40 focus:shadow-[0_0_15px_rgba(125,211,252,0.05),inset_0_1px_1px_rgba(255,255,255,0.05)]
            transition-all duration-comfortable ease-standard ${className}
          `}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

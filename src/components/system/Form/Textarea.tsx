"use client";

import React, { forwardRef } from "react";
import { HeroText } from "../HeroText";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

/**
 * Textarea
 *
 * System multi-line text input area with standard border glow properties.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full text-left font-sans">
        <HeroText
          variant="metadata"
          className="text-zinc-500 font-mono tracking-[0.2em] uppercase pl-[0.1em]"
        >
          {label}
        </HeroText>
        <textarea
          ref={ref}
          className={`
            w-full bg-glass-bg border border-glass-border rounded px-4 py-2.5 text-xs sm:text-sm font-light text-white outline-none backdrop-blur-xl
            focus:border-sky-400/40 focus:bg-black/40 focus:shadow-[0_0_15px_rgba(125,211,252,0.05),inset_0_1px_1px_rgba(255,255,255,0.05)]
            transition-all duration-comfortable ease-standard resize-none min-h-[120px] ${className}
          `}
          {...props}
        />
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

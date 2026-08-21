"use client";

import React, { useRef } from "react";
import { useFadeTransition } from "@/hooks/useFadeTransition";
import { Label, Paragraph, Caption } from "@/components/core/Typography";
import { GlassButton } from "@/components/core/GlassButton";

interface FutureSectionProps {
  onReturn: () => void;
}

export default function FutureSection({ onReturn }: FutureSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useFadeTransition(containerRef, true, 0.2, 1.5);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-10 opacity-0 px-6 min-h-[60vh] text-center select-none"
    >
      <div className="flex flex-col items-center gap-2">
        <Label className="text-[10px] tracking-[0.45em] text-sky-400 font-light uppercase pl-[0.45em]">
          Ambition Horizon
        </Label>
        <h2 className="text-xl sm:text-2xl font-light tracking-[0.2em] text-white uppercase mt-1 pl-[0.2em]">
          Looking Ahead
        </h2>
      </div>

      <div className="flex flex-col gap-5 sm:gap-6 w-full max-w-md">
        <div className="p-4 rounded-lg border border-glass-border/40 bg-glass-bg backdrop-blur-xl hover:border-sky-500/20 hover:bg-white/2 transition-colors duration-500">
          <Paragraph className="text-xs sm:text-sm text-zinc-300 font-light tracking-wide">
            Build software tools and system architectures used by millions.
          </Paragraph>
        </div>

        <div className="p-4 rounded-lg border border-glass-border/40 bg-glass-bg backdrop-blur-xl hover:border-sky-500/20 hover:bg-white/2 transition-colors duration-500">
          <Paragraph className="text-xs sm:text-sm text-zinc-300 font-light tracking-wide">
            Resolve deep architectural problems in distributed transactional scaling.
          </Paragraph>
        </div>

        <div className="p-4 rounded-lg border border-glass-border/40 bg-glass-bg backdrop-blur-xl hover:border-sky-500/20 hover:bg-white/2 transition-colors duration-500">
          <Paragraph className="text-xs sm:text-sm text-zinc-300 font-light tracking-wide">
            Never compromise curiosity. Keep learning, keep building, keep shipping.
          </Paragraph>
        </div>
      </div>

      {/* Closing focus statement */}
      <div className="flex flex-col items-center gap-2 mt-4 select-none">
        <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-[0.3em] pl-[0.3em] animate-pulse">
          Active Status: Initializing
        </span>
        <h1 className="text-2xl sm:text-3xl font-light tracking-[0.4em] text-white uppercase pl-[0.4em] mt-2">
          I'm only getting started.
        </h1>
      </div>

      <div className="mt-6">
        <GlassButton onClick={onReturn} className="hover:shadow-[0_0_20px_rgba(125,211,252,0.12)]">
          Return to Hub
        </GlassButton>
      </div>
    </div>
  );
}

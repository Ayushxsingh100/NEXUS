"use client";

import React, { useRef } from "react";
import { useFadeTransition } from "@/hooks/useFadeTransition";
import { Label, Paragraph, Caption } from "@/components/core/Typography";

export default function IdentitySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  useFadeTransition(containerRef, true, 0.2, 1.2);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-2xl mx-auto flex flex-col gap-8 opacity-0 px-6 justify-center min-h-[50vh]"
    >
      <div className="flex flex-col gap-2 border-b border-glass-border/40 pb-6">
        <Label className="text-[10px] tracking-[0.45em] text-sky-400 font-light uppercase pl-[0.45em]">
          Identity Card
        </Label>
        <h2 className="text-3xl sm:text-4xl font-light tracking-[0.1em] text-white uppercase mt-2">
          Ayush Singh
        </h2>
        <Caption className="text-xs text-zinc-400 tracking-[0.15em] font-mono mt-1">
          Systems & Backend Engineer
        </Caption>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="flex flex-col gap-2">
          <Label className="text-[9px] text-zinc-500 font-mono tracking-[0.2em]">
            Current Mission
          </Label>
          <Paragraph className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed tracking-wide pl-0.5">
            Architecting high-throughput event ledgers, distributed transactional storage systems, and zero-latency caching pipelines.
          </Paragraph>
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-[9px] text-zinc-500 font-mono tracking-[0.2em]">
            Current Focus
          </Label>
          <Paragraph className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed tracking-wide pl-0.5">
            Distributed consensus mechanisms, performance benchmarking, compiler theory, and lock-free concurrency paradigms.
          </Paragraph>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-4 bg-white/2 border border-glass-border/40 p-6 rounded-lg backdrop-blur-xl">
        <Label className="text-[9px] text-sky-300 font-mono tracking-[0.25em] uppercase mb-1">
          Philosophy of Action
        </Label>
        <Paragraph className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light pl-0.5">
          &ldquo;I build systems that value speed, correctness, and transparency. I believe that true software engineering sits at the intersection of deep mechanical understanding and structured logical architecture. Every line of code should contribute directly to system longevity.&rdquo;
        </Paragraph>
      </div>
    </div>
  );
}

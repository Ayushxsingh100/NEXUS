"use client";

import React, { useState, useRef } from "react";
import { useFadeTransition } from "@/hooks/useFadeTransition";
import { Label, Paragraph, Caption } from "@/components/core/Typography";

interface ValueItem {
  id: string;
  title: string;
  desc: string;
}

const VALUES_DATA: ValueItem[] = [
  {
    id: "curiosity",
    title: "Curiosity",
    desc: "The fundamental driver to explore how software interfaces with hardware. It is what keeps us studying CPU instruction registers, kernel system calls, and database write queues."
  },
  {
    id: "craftsmanship",
    title: "Craftsmanship",
    desc: "Viewing code not just as functional instructions, but as structured architecture. Committing to elegant patterns, self-documenting parameters, and robust API endpoints."
  },
  {
    id: "ownership",
    title: "Ownership",
    desc: "Taking total accountability for the lifecycle of code in production. Running validation diagnostics, setting telemetry monitors, and proactively fixing system bottlenecks."
  },
  {
    id: "excellence",
    title: "Engineering Excellence",
    desc: "Striving for optimal efficiency. Designing for 10x scale, avoiding premature optimization while building benchmark suites, and keeping memory utilization flat."
  },
  {
    id: "consistency",
    title: "Consistency",
    desc: "The regular, disciplined application of sound design principles over time. Committing to continuous refactoring, thorough unit tests, and daily engineering growth."
  },
  {
    id: "problem-solving",
    title: "Problem Solving",
    desc: "Navigating deep runtime allocations and configuration errors systematically. Breaking down bugs from first-principles rather than relying on quick-fix search queries."
  }
];

export default function ValuesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedId, setExpandedId] = useState<string | null>("curiosity");

  useFadeTransition(containerRef, true, 0.2, 1.2);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div
      ref={containerRef}
      className="w-full max-w-3xl mx-auto flex flex-col gap-6 opacity-0 px-6 justify-center min-h-[50vh] select-none"
    >
      <div className="flex flex-col gap-1 border-b border-glass-border/40 pb-4 mb-2">
        <Label className="text-[10px] tracking-[0.45em] text-sky-400 font-light uppercase pl-[0.45em]">
          Core Values
        </Label>
        <h2 className="text-xl sm:text-2xl font-light tracking-[0.2em] text-white uppercase mt-1 pl-[0.2em]">
          Engineering Conviction
        </h2>
        <Caption className="text-[9px] text-zinc-500 font-mono tracking-wider mt-1.5 uppercase">
          [ Click panels to expand core beliefs ]
        </Caption>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {VALUES_DATA.map((value) => {
          const isExpanded = expandedId === value.id;
          return (
            <div
              key={value.id}
              onClick={() => toggleExpand(value.id)}
              className={`
                p-5 rounded-xl border bg-glass-bg backdrop-blur-xl cursor-pointer select-none
                transition-all duration-[600ms] cubic-bezier(0.16, 1, 0.3, 1) flex flex-col gap-2
                ${isExpanded
                  ? "border-sky-400/40 shadow-[0_12px_30px_rgba(0,0,0,0.65),0_0_20px_rgba(125,211,252,0.06),inset_0_1px_1px_rgba(255,255,255,0.12)] bg-sky-400/3 scale-[1.01]"
                  : "border-glass-border hover:border-glass-border-hover hover:bg-white/3"
                }
              `}
            >
              <div className="flex items-center justify-between">
                <h4 className={`text-xs sm:text-sm font-light tracking-[0.15em] uppercase transition-colors duration-500 ${isExpanded ? "text-sky-300" : "text-zinc-300"}`}>
                  {value.title}
                </h4>
                {/* Accordion indicator */}
                <span className={`text-[10px] font-mono transition-transform duration-500 ${isExpanded ? "text-sky-300 rotate-180" : "text-zinc-600"}`}>
                  {isExpanded ? "▲" : "▼"}
                </span>
              </div>

              <div
                className="overflow-hidden transition-all duration-[600ms] ease-in-out"
                style={{
                  maxHeight: isExpanded ? "120px" : "0px",
                  opacity: isExpanded ? 1 : 0,
                  marginTop: isExpanded ? "4px" : "0px",
                }}
              >
                <Paragraph className="text-[11px] sm:text-xs text-zinc-400 leading-relaxed font-light tracking-wide pl-0.5 border-l border-sky-400/20">
                  {value.desc}
                </Paragraph>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

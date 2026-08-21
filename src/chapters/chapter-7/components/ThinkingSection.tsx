"use client";

import React, { useState, useRef } from "react";
import { useFadeTransition } from "@/hooks/useFadeTransition";
import { Label, Paragraph, Caption } from "@/components/core/Typography";

interface PhilosophyItem {
  quote: string;
  detail: string;
}

const PHILOSOPHY_DATA: PhilosophyItem[] = [
  {
    quote: "Build for people first.",
    detail: "Technology is only a medium. Every gateway, compiler, or ledger we design exists solely to solve human problems and empower individuals."
  },
  {
    quote: "Simple systems scale better.",
    detail: "Complexity is the enemy of reliability. Prefer flat, straightforward, and readable code blocks over clever, convoluted design patterns."
  },
  {
    quote: "Every bug teaches something.",
    detail: "Failures are core diagnostics. A production crash is an invitation to explore runtime limits, cache edge-states, and boundary behaviors."
  },
  {
    quote: "Code is communication.",
    detail: "Source files are read by humans far more often than they are compiled by machines. Treat clean variables and comments as active communication."
  },
  {
    quote: "Learning never stops.",
    detail: "Modern software infrastructure changes at a rapid pace. Embrace humility, accept feedback, and keep reading technical specification papers."
  }
];

export default function ThinkingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useFadeTransition(containerRef, true, 0.2, 1.2);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-2xl mx-auto flex flex-col gap-6 opacity-0 px-6 justify-center min-h-[50vh] select-none"
    >
      <div className="flex flex-col gap-1 border-b border-glass-border/40 pb-4 mb-2">
        <Label className="text-[10px] tracking-[0.45em] text-sky-400 font-light uppercase pl-[0.45em]">
          Philosophy
        </Label>
        <h2 className="text-xl sm:text-2xl font-light tracking-[0.2em] text-white uppercase mt-1 pl-[0.2em]">
          How I Think
        </h2>
        <Caption className="text-[9px] text-zinc-500 font-mono tracking-wider mt-1.5 uppercase">
          [ Click entry to focus engineering logic ]
        </Caption>
      </div>

      <div className="flex flex-col gap-5 sm:gap-6 mt-4">
        {PHILOSOPHY_DATA.map((item, idx) => {
          const isActive = idx === activeIndex;
          return (
            <div
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className="group flex gap-4 items-start cursor-pointer transition-all duration-500"
            >
              {/* Floating diagnostic selector bullet */}
              <div className="flex flex-col items-center pt-2">
                <div
                  className={`
                    w-2 h-2 rounded-full border transition-all duration-700
                    ${isActive
                      ? "bg-sky-400 border-sky-400 shadow-[0_0_10px_rgba(125,211,252,0.8)] scale-110"
                      : "bg-transparent border-zinc-700 group-hover:border-zinc-500"
                    }
                  `}
                />
              </div>

              {/* Quote & details */}
              <div className="flex flex-col gap-1.5 flex-1">
                <h3
                  className={`
                    text-base sm:text-lg font-light tracking-wide transition-all duration-700
                    ${isActive
                      ? "text-white scale-[1.01] translate-x-1"
                      : "text-zinc-500 group-hover:text-zinc-300 blur-[0.4px]"
                    }
                  `}
                >
                  {item.quote}
                </h3>

                <div
                  className="overflow-hidden transition-all duration-[700ms] ease-in-out"
                  style={{
                    maxHeight: isActive ? "80px" : "0px",
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? "translateY(0)" : "translateY(-4px)",
                  }}
                >
                  <Paragraph className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light tracking-wide pl-0.5 mt-1 border-l border-sky-400/10">
                    {item.detail}
                  </Paragraph>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

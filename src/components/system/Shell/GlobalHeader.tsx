"use client";

import React, { useState, useEffect } from "react";

export interface GlobalHeaderProps {
  activeChapter: string;
  isOpen: boolean;
  onToggleMenu: () => void;
}

const CHAPTER_LABELS: Record<string, { num: string; title: string }> = {
  "chapter-1": { num: "01", title: "Genesis" },
  "chapter-3": { num: "02", title: "Thought Hub" },
  "chapter-4": { num: "03", title: "Systems Topology" },
  "chapter-5": { num: "04", title: "Interactive Timeline" },
  "chapter-6": { num: "05", title: "Knowledge Library" },
  "chapter-7": { num: "06", title: "Beyond The Code" },
  "chapter-8": { num: "07", title: "Communication Hub" },
  epilogue: { num: "08", title: "The Signature" },
};

export function GlobalHeader({ activeChapter, isOpen, onToggleMenu }: GlobalHeaderProps) {
  const [prefersReduced, setPrefersReduced] = useState(false);
  const currentChapter = CHAPTER_LABELS[activeChapter] || { num: "--", title: "System" };

  // Track motion preference
  useEffect(() => {
    const checkMotion = () => {
      const override = localStorage.getItem("prefers-reduced-motion");
      if (override !== null) {
        setPrefersReduced(override === "true");
      } else {
        setPrefersReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
      }
    };
    checkMotion();
    window.addEventListener("motion-preference-changed", checkMotion);
    return () => window.removeEventListener("motion-preference-changed", checkMotion);
  }, []);

  const handleToggleMotion = () => {
    const nextVal = !prefersReduced;
    localStorage.setItem("prefers-reduced-motion", String(nextVal));
    setPrefersReduced(nextVal);
    // Dispatch custom event to notify all useReducedMotion hook listeners
    window.dispatchEvent(new Event("motion-preference-changed"));
  };

  return (
    <header className="fixed top-0 left-0 w-full z-[40] px-6 py-5 flex items-center justify-between pointer-events-none select-none">
      {/* Skip Link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only fixed top-4 left-4 z-50 bg-black/85 border border-glass-border px-4 py-2 text-[10px] tracking-widest text-sky-400 uppercase rounded-md focus:outline-none pointer-events-auto"
      >
        Skip to content
      </a>

      {/* Left section: System status diagnostics */}
      <div className="flex items-center gap-4 pointer-events-auto font-sans">
        <span className="text-[9px] tracking-[0.3em] text-zinc-500 uppercase">
          NEXUS // <span className="text-sky-500 animate-pulse">SYS_OK</span>
        </span>
        <div className="h-3 w-[1px] bg-zinc-800" />
        <span className="text-[9px] tracking-[0.3em] text-zinc-400">
          CH.{currentChapter.num}
        </span>
      </div>

      {/* Center: Dropdown toggle button */}
      <div className="pointer-events-auto font-sans">
        <button
          onClick={onToggleMenu}
          aria-haspopup="true"
          aria-expanded={isOpen}
          aria-label="Toggle chapter navigation menu"
          className="group px-5 py-2.5 rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(10,10,10,0.45)] backdrop-blur-md hover:border-sky-400/40 hover:bg-black/60 hover:shadow-[0_0_15px_rgba(125,211,252,0.12)] transition-all duration-300 ease-out cursor-pointer outline-none flex items-center gap-3"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
          <span className="text-[10px] tracking-[0.25em] font-light uppercase text-zinc-200 pl-0.5">
            {isOpen ? "CLOSE INDEX" : currentChapter.title.toUpperCase()}
          </span>
          <svg
            className={`w-3 h-3 text-zinc-400 group-hover:text-white transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
      </div>

      {/* Right: Motion/Accessibility toggle */}
      <div className="pointer-events-auto font-sans">
        <button
          onClick={handleToggleMotion}
          title="Toggle interface animations"
          aria-label={`Switch animations ${prefersReduced ? "on" : "off"}`}
          className="px-4 py-2 rounded-md border border-zinc-800 bg-transparent text-[8px] sm:text-[9px] tracking-[0.2em] font-sans text-zinc-500 uppercase hover:border-zinc-700 hover:text-zinc-200 transition-all duration-300 cursor-pointer outline-none"
        >
          MOTION // {prefersReduced ? "OFF" : "ON"}
        </button>
      </div>
    </header>
  );
}

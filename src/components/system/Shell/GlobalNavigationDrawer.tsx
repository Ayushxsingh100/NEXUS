"use client";

import React, { useEffect, useRef } from "react";

export interface GlobalNavigationDrawerProps {
  isOpen: boolean;
  activeChapter: string;
  onClose: () => void;
  onNavigate: (chapter: string) => void;
}

const CHAPTERS_LIST = [
  { id: "chapter-1", num: "01", title: "Genesis", desc: "Foundational Cinematic Entry" },
  { id: "chapter-3", num: "02", title: "Thought Hub", desc: "Interactive System Directory" },
  { id: "chapter-4", num: "03", title: "Systems Topology", desc: "Engineering Project Case Studies" },
  { id: "chapter-5", num: "04", title: "Interactive Timeline", desc: "Career & Project Milestones" },
  { id: "chapter-6", num: "05", title: "Knowledge Library", desc: "Technical Research & Notebooks" },
  { id: "chapter-7", num: "06", title: "Beyond The Code", desc: "Personal Values & Perspectives" },
  { id: "chapter-8", num: "07", title: "Communication Hub", desc: "Direct Messaging Interface" },
  { id: "epilogue", num: "08", title: "The Signature", desc: "Epilogue Summary" },
];

export function GlobalNavigationDrawer({
  isOpen,
  activeChapter,
  onClose,
  onNavigate,
}: GlobalNavigationDrawerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on ESC key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Focus trap for accessibility
  useEffect(() => {
    if (!isOpen || !containerRef.current) return;
    const focusable = containerRef.current.querySelectorAll("button, a, [tabIndex='0']");
    if (focusable.length === 0) return;
    const first = focusable[0] as HTMLElement;
    const last = focusable[focusable.length - 1] as HTMLElement;

    // Set initial focus to active chapter item or first item
    const activeItem = containerRef.current.querySelector('[data-active="true"]') as HTMLElement;
    if (activeItem) {
      activeItem.focus();
    } else {
      first.focus();
    }

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          last.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener("keydown", handleTab);
    return () => window.removeEventListener("keydown", handleTab);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Nexus Navigation Drawer"
      className="fixed inset-0 w-full h-full z-[35] bg-black/90 backdrop-blur-2xl flex flex-col items-center justify-center select-none"
      style={{
        transition: "opacity 0.50s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Background radial lights */}
      <div
        className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] rounded-full pointer-events-none opacity-[0.03]"
        style={{
          background: "radial-gradient(circle, rgba(125,211,252,0.6) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] rounded-full pointer-events-none opacity-[0.02]"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      <div className="w-full max-w-3xl px-6 py-12 flex flex-col z-10">
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-glass-border/30 pb-6 mb-8 font-sans">
          <span className="text-[9px] tracking-[0.45em] text-zinc-500 uppercase">
            NEXUS SYSTEM // INDEX
          </span>
          <button
            onClick={onClose}
            className="
              text-[9px] tracking-[0.3em] font-sans text-zinc-500 hover:text-white uppercase bg-transparent border-none outline-none cursor-pointer p-2
              transition-colors duration-300 focus:text-white focus:outline-none
            "
          >
            [ ESC // CLOSE ]
          </button>
        </div>

        {/* Chapters list */}
        <nav className="flex flex-col gap-1 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
          {CHAPTERS_LIST.map((chap) => {
            const isActive = activeChapter === chap.id;
            return (
              <button
                key={chap.id}
                onClick={() => onNavigate(chap.id)}
                data-active={isActive}
                className={`
                  group w-full flex items-center justify-between p-4 rounded-xl border text-left outline-none cursor-pointer transition-all duration-300
                  ${
                    isActive
                      ? "border-sky-400/30 bg-white/[0.04] shadow-[0_0_15px_rgba(125,211,252,0.05)]"
                      : "border-transparent bg-transparent hover:bg-white/[0.02] hover:border-zinc-800"
                  }
                `}
              >
                <div className="flex items-center gap-6">
                  {/* Chapter number indicator */}
                  <span
                    className={`
                      font-sans text-[10px] tracking-wider transition-colors duration-300
                      ${isActive ? "text-sky-400" : "text-zinc-600 group-hover:text-zinc-400"}
                    `}
                  >
                    {chap.num}
                  </span>

                  {/* Title and description */}
                  <div className="flex flex-col gap-1">
                    <span
                      className={`
                        text-xs tracking-[0.2em] uppercase transition-all duration-300
                        ${isActive ? "text-white font-normal" : "text-zinc-400 group-hover:text-zinc-200 font-light"}
                      `}
                    >
                      {chap.title}
                    </span>
                    <span className="text-[9px] tracking-[0.05em] text-zinc-600 font-light hidden sm:inline font-sans">
                      {chap.desc}
                    </span>
                  </div>
                </div>

                {/* Right chevron or label */}
                <div className="flex items-center gap-3">
                  {isActive && (
                    <span className="text-[8px] font-sans text-sky-400 tracking-[0.2em] uppercase">
                      ACTIVE LAYER
                    </span>
                  )}
                  <svg
                    className={`w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-300 transition-all duration-300 transform group-hover:translate-x-0.5 ${
                      isActive ? "text-sky-400/80" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

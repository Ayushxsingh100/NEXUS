"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { HeroText } from "@/components/system/HeroText";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ChapterTransitionProps {
  activeNode: string | null;
  onReturn: () => void;
}

const CHAPTER_DETAILS: Record<string, { title: string; subtitle: string }> = {
  ABOUT: { title: "CHAPTER VII — IDENTITY", subtitle: "The Person Behind The Code" },
  PROJECTS: { title: "CHAPTER IV — CREATION", subtitle: "Systems Built From Scratch" },
  BLOGS: { title: "CHAPTER VI — KNOWLEDGE", subtitle: "Ideas Worth Sharing" },
  EXPERIENCE: { title: "CHAPTER V — LESSONS", subtitle: "Real-World Architecture" },
  CONTACT: { title: "CHAPTER VIII — SYSTEM ENTRY", subtitle: "Connect & Collaborate" },
};

export default function ChapterTransition({ activeNode }: ChapterTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useGSAP(
    () => {
      if (!activeNode) return;

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      if (prefersReduced) {
        tl.to("#transition-overlay", { opacity: 1, duration: 0.1 })
          .to(["#transition-title", "#transition-subtitle"], { opacity: 1, y: 0, duration: 0.1 });
        return;
      }

      // Slow cinematic fade matching camera fly-through duration
      tl.to("#transition-overlay", { opacity: 1, duration: 1.8, delay: 0.4 })
        .to("#transition-title", { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, "-=0.6")
        .to("#transition-subtitle", { opacity: 0.6, y: 0, duration: 1.2, ease: "power3.out" }, "-=0.8");
    },
    { scope: containerRef, dependencies: [activeNode, prefersReduced] }
  );

  if (!activeNode) return null;

  const details = CHAPTER_DETAILS[activeNode] || { title: activeNode, subtitle: "Loading System Module" };

  return (
    <div ref={containerRef} className="fixed inset-0 z-40 select-none pointer-events-none">
      <div
        id="transition-overlay"
        className="fixed inset-0 bg-black opacity-0 flex flex-col items-center justify-center p-8 text-center"
      >
        <div className="flex flex-col items-center max-w-xl gap-4">
          <HeroText
            id="transition-title"
            variant="chapter"
            as="h2"
            className="opacity-0 transform translate-y-3"
            style={{
              letterSpacing: "0.35em",
              paddingLeft: "0.35em",
              color: "var(--color-text-primary, #ffffff)",
              fontWeight: 300,
            }}
          >
            {details.title}
          </HeroText>
          
          <HeroText
            id="transition-subtitle"
            variant="reflection"
            as="p"
            className="opacity-0 transform translate-y-3"
            style={{
              letterSpacing: "0.15em",
              paddingLeft: "0.15em",
              color: "var(--color-text-secondary, rgba(255,255,255,0.72))",
              fontWeight: 300,
            }}
          >
            {details.subtitle}
          </HeroText>
        </div>
      </div>
    </div>
  );
}

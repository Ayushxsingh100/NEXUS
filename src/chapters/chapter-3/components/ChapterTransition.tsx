"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ChapterTransitionProps {
  activeNode: string | null;
  onReturn: () => void;
}

export default function ChapterTransition({ activeNode }: ChapterTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useGSAP(
    () => {
      if (!activeNode) return;

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // Cinematic black fade — no chapter text overlay
      tl.to("#transition-overlay", {
        opacity: 1,
        duration: prefersReduced ? 0.1 : 1.8,
        delay: prefersReduced ? 0 : 0.4,
      });
    },
    { scope: containerRef, dependencies: [activeNode, prefersReduced] }
  );

  if (!activeNode) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-40 select-none pointer-events-none">
      <div
        id="transition-overlay"
        className="fixed inset-0 bg-black opacity-0"
      />
    </div>
  );
}

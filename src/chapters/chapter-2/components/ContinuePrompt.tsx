"use client";

import React, { useEffect } from "react";
import { HeroText } from "@/components/system/HeroText";

interface ContinuePromptProps {
  onTransition: () => void;
  isActive: boolean;
}

export default function ContinuePrompt({ onTransition, isActive }: ContinuePromptProps) {
  useEffect(() => {
    if (!isActive) return;

    const handleTrigger = () => {
      onTransition();
    };

    // Attach global click and keydown listeners to window
    window.addEventListener("click", handleTrigger);
    window.addEventListener("keydown", handleTrigger);

    return () => {
      window.removeEventListener("click", handleTrigger);
      window.removeEventListener("keydown", handleTrigger);
    };
  }, [isActive, onTransition]);

  return (
    <div className="fixed bottom-12 left-0 right-0 flex items-center justify-center pointer-events-none z-20 select-none px-6">
      <span
        onClick={onTransition}
        className="cursor-pointer pointer-events-auto"
      >
        <HeroText
          id="chapter-2-continue"
          variant="navigation"
          as="span"
          className="opacity-0 text-center pointer-events-none"
          style={{
            letterSpacing: "0.3em",
            paddingLeft: "0.3em",
            color: "var(--color-text-muted, rgba(255, 255, 255, 0.45))",
            fontWeight: 400,
          }}
        >
          Scroll or click to continue
        </HeroText>
      </span>
    </div>
  );
}

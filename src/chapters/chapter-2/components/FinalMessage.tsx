"use client";

import React from "react";
import { HeroText } from "@/components/system/HeroText";

export default function FinalMessage() {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-10 select-none px-6">
      {/* Scene 3 Sentence */}
      <HeroText
        id="chapter-2-curiosity"
        variant="statement"
        as="h3"
        className="absolute text-center max-w-4xl select-none opacity-0"
        style={{
          letterSpacing: "0.22em",
          paddingLeft: "0.22em",
          color: "var(--color-text-primary, #ffffff)",
          fontWeight: 300,
        }}
      >
        Curiosity is where engineering begins.
      </HeroText>

      {/* Scene 4 Sentence */}
      <HeroText
        id="chapter-2-answers"
        variant="statement"
        as="h3"
        className="absolute text-center max-w-4xl select-none opacity-0"
        style={{
          letterSpacing: "0.22em",
          paddingLeft: "0.22em",
          color: "var(--color-text-primary, #ffffff)",
          fontWeight: 300,
        }}
      >
        Every answer creates another question.
      </HeroText>
    </div>
  );
}

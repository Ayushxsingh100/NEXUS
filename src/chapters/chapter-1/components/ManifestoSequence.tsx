"use client";

import React from "react";
import { HeroText } from "@/components/system/HeroText";

const SENTENCES = [
  "Every engineer begins with a thought.",
  "Some thoughts disappear.",
  "Some become systems.",
  "The rarest become a legacy.",
];

export default function ManifestoSequence() {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-10 px-6 sm:px-12">
      {SENTENCES.map((sentence, index) => (
        <HeroText
          key={index}
          variant="statement"
          as="p"
          className={`manifesto-line manifesto-line-${index + 1} absolute text-center max-w-3xl select-none opacity-0`}
          style={{
            letterSpacing: "0.25em",
            paddingLeft: "0.25em",
            color: "var(--color-text-secondary, rgba(255, 255, 255, 0.72))",
            fontWeight: 300,
          }}
        >
          {sentence}
        </HeroText>
      ))}
    </div>
  );
}

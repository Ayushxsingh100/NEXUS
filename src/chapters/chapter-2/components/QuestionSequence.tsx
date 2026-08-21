"use client";

import React from "react";
import { HeroText } from "@/components/system/HeroText";

const QUESTIONS = [
  "Why?",
  "What if?",
  "Can it be better?",
  "Why does it work?",
  "What happens if it fails?",
  "What can I learn?",
];

export default function QuestionSequence() {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-10 select-none px-6">
      {QUESTIONS.map((question, index) => (
        <HeroText
          key={index}
          variant="statement"
          as="h2"
          className={`chapter-2-q chapter-2-q-${index + 1} absolute text-center max-w-4xl select-none opacity-0`}
          style={{
            letterSpacing: "0.25em",
            paddingLeft: "0.25em",
            color: "var(--color-text-primary, #ffffff)",
            fontWeight: 300,
          }}
        >
          {question}
        </HeroText>
      ))}
    </div>
  );
}

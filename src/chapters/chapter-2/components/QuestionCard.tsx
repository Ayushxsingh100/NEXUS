"use client";

import React from "react";
import { HeroText } from "@/components/system/HeroText";

export default function QuestionCard() {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-10 select-none px-6">
      <HeroText
        id="question-card-why"
        variant="heroXXL"
        as="h1"
        className="opacity-0 text-center select-none"
        style={{
          fontWeight: 300,
          letterSpacing: "0.45em",
          paddingLeft: "0.45em",
          color: "var(--color-text-primary, #ffffff)",
        }}
      >
        WHY?
      </HeroText>
    </div>
  );
}

"use client";

import React from "react";
import { HeroTitle } from "@/components/core/Typography";

interface FinalTitleProps {
  opacityRef: React.RefObject<HTMLDivElement | null>;
}

export default function FinalTitle({ opacityRef }: FinalTitleProps) {
  return (
    <div
      ref={opacityRef}
      className="flex flex-col items-center justify-center opacity-0 filter blur-[8px] translate-y-4"
    >
      <HeroTitle className="text-4xl sm:text-6xl md:text-7xl font-extralight tracking-[0.6em] text-white pl-[0.6em] select-none text-center">
        Project Nexus
      </HeroTitle>
    </div>
  );
}

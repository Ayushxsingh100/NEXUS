"use client";

import React from "react";
import { Caption } from "@/components/core/Typography";

interface SignatureProps {
  opacityRef: React.RefObject<HTMLDivElement | null>;
}

export default function Signature({ opacityRef }: SignatureProps) {
  return (
    <div
      ref={opacityRef}
      className="flex flex-col items-center opacity-0 filter blur-[4px] mt-6"
    >
      <Caption className="text-zinc-500 font-mono text-[10px] sm:text-xs tracking-[0.35em] pl-[0.35em] uppercase">
        — Ayush Singh
      </Caption>
    </div>
  );
}

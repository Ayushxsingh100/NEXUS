import React from "react";

export interface TechChipProps {
  tech: string;
  className?: string;
}

/**
 * Monospace code label display chip for indicating stack items.
 */
export function TechChip({ tech, className = "" }: TechChipProps) {
  return (
    <span
      className={`
        inline-flex items-center text-[10px] font-mono font-light text-zinc-400
        bg-white/3 border border-glass-border px-2.5 py-1 rounded select-none
        hover:text-sky-300 hover:border-sky-500/30 hover:bg-sky-500/5
        transition-all duration-300
        ${className}
      `}
    >
      {tech}
    </span>
  );
}

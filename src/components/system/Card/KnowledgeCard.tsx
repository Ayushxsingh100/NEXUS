"use client";

import React, { forwardRef } from "react";
import { BaseCard } from "./BaseCard";
import { Badge } from "@/components/core/Badge";
import { HeroText } from "../HeroText";

export interface KnowledgeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  category: string;
  title: string;
  summary: string;
  readingTime: string;
  publishedDate: string;
  glowColor?: "cyan" | "violet" | "none";
}

/**
 * KnowledgeCard
 *
 * Standardized articles/documentation display card primitive.
 */
export const KnowledgeCard = forwardRef<HTMLDivElement, KnowledgeCardProps>(
  ({ category, title, summary, readingTime, publishedDate, glowColor = "cyan", className = "", ...props }, ref) => {
    return (
      <BaseCard
        ref={ref}
        glowColor={glowColor}
        className={`w-full max-w-sm sm:max-w-md h-[180px] ${className}`}
        {...props}
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Badge glowColor={glowColor} size="sm">
              {category}
            </Badge>
            <HeroText variant="metadata" className="text-zinc-500 font-mono tracking-wider">
              {readingTime}
            </HeroText>
          </div>

          <HeroText variant="section" className="text-zinc-200 group-hover:text-white leading-snug transition-colors duration-hover line-clamp-2">
            {title}
          </HeroText>
        </div>

        <div className="flex items-end justify-between border-t border-glass-border/30 pt-3.5 mt-2">
          <HeroText variant="reflection" className="text-[11px] text-zinc-400 group-hover:text-zinc-300 font-light truncate max-w-[200px] tracking-wide">
            {summary}
          </HeroText>
          <HeroText variant="metadata" className="text-zinc-600 font-mono tracking-wider">
            {publishedDate}
          </HeroText>
        </div>
      </BaseCard>
    );
  }
);

KnowledgeCard.displayName = "KnowledgeCard";

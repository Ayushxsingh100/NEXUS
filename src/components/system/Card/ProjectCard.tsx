"use client";

import React, { forwardRef } from "react";
import { BaseCard } from "./BaseCard";
import { HeroText } from "../HeroText";
import { Badge } from "@/components/core/Badge";

export interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  tech: string[];
  status?: string;
  glowColor?: "cyan" | "violet" | "none";
  active?: boolean;
}

/**
 * ProjectCard
 *
 * Premium structured project exhibition card component inheriting design system tokens.
 */
export const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ title, description, tech, status, glowColor = "none", className = "", ...props }, ref) => {
    return (
      <BaseCard
        ref={ref}
        glowColor={glowColor}
        className={`w-full max-w-sm sm:max-w-md min-h-[190px] ${className}`}
        {...props}
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <HeroText variant="metadata" className="text-zinc-500 font-mono tracking-widest">
              PROJECT EXHIBIT
            </HeroText>
            {status && (
              <Badge glowColor={glowColor === "none" ? "cyan" : glowColor} size="sm">
                {status}
              </Badge>
            )}
          </div>

          <HeroText variant="section" className="text-zinc-200 group-hover:text-white leading-snug transition-colors duration-hover">
            {title}
          </HeroText>

          <HeroText variant="reflection" className="text-zinc-400 group-hover:text-zinc-300 transition-colors duration-hover leading-relaxed line-clamp-2">
            {description}
          </HeroText>
        </div>

        {/* Tech list tag chips */}
        <div className="flex flex-wrap gap-1.5 border-t border-glass-border/30 pt-4 mt-4">
          {tech.map((t, idx) => (
            <span
              key={idx}
              className="text-[9px] font-mono tracking-wider text-zinc-500 bg-zinc-950/40 border border-glass-border/40 rounded px-1.5 py-0.5"
            >
              {t}
            </span>
          ))}
        </div>
      </BaseCard>
    );
  }
);

ProjectCard.displayName = "ProjectCard";

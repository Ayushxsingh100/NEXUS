"use client";

import React, { useRef } from "react";
import { useFadeTransition } from "@/hooks/useFadeTransition";
import { Label, Caption, Paragraph } from "@/components/core/Typography";

interface RoadmapItem {
  name: string;
  percent: number;
  stage: string;
  focus: string;
}

const ROADMAP_DATA: RoadmapItem[] = [
  {
    name: "Backend Systems",
    percent: 95,
    stage: "Core Mastery",
    focus: "Rust API Proxies, Go Kafka pipelines, memory profiles"
  },
  {
    name: "System Design",
    percent: 90,
    stage: "High Scale",
    focus: "LSM structures, write buffers, sharding policies"
  },
  {
    name: "Cloud Systems",
    percent: 85,
    stage: "Kubernetes/GitOps",
    focus: "Declarative CI/CD, canary releases, service mesh limiters"
  },
  {
    name: "Distributed Systems",
    percent: 80,
    stage: "Consensus Algorithms",
    focus: "Raft node coordination, replication safety, clock drifts"
  },
  {
    name: "Artificial Intelligence",
    percent: 70,
    stage: "Inference Pipelines",
    focus: "Model quantizations, KV cache optimizations, vector stores"
  }
];

export default function RoadmapSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  useFadeTransition(containerRef, true, 0.2, 1.2);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-3xl mx-auto flex flex-col gap-6 opacity-0 px-6 justify-center min-h-[50vh] select-none"
    >
      <div className="flex flex-col gap-1 border-b border-glass-border/40 pb-4 mb-4">
        <Label className="text-[10px] tracking-[0.45em] text-sky-400 font-light uppercase pl-[0.45em]">
          Evolution Path
        </Label>
        <h2 className="text-xl sm:text-2xl font-light tracking-[0.2em] text-white uppercase mt-1 pl-[0.2em]">
          Current Roadmap
        </h2>
        <Caption className="text-[9px] text-zinc-500 font-mono tracking-wider mt-1.5 uppercase">
          [ Glowing radial nodes map technical trajectory ]
        </Caption>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {ROADMAP_DATA.map((item, idx) => (
          <div
            key={idx}
            className="
              flex flex-col items-center justify-between p-5 rounded-xl border border-glass-border bg-glass-bg backdrop-blur-xl h-[200px] text-center
              hover:border-sky-400/20 hover:bg-white/3 hover:shadow-[0_8px_20px_rgba(0,0,0,0.5)] transition-all duration-500
            "
          >
            {/* SVG Circular Dial (Elegant Progress Path) */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                {/* Background Ring */}
                <path
                  className="text-zinc-800"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="transparent"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {/* Progress Ring */}
                <path
                  className="text-sky-400 transition-all duration-1000 ease-out"
                  strokeWidth="2.2"
                  strokeDasharray={`${item.percent}, 100`}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  style={{
                    filter: "drop-shadow(0 0 3px rgba(125, 211, 252, 0.4))",
                  }}
                />
              </svg>
              {/* Inner numerical text */}
              <span className="absolute text-[10px] font-mono text-zinc-300 font-light mt-0.5">
                {item.percent}%
              </span>
            </div>

            <div className="flex flex-col gap-1 mt-2">
              <h4 className="text-xs font-light tracking-[0.1em] text-white uppercase truncate max-w-[160px]">
                {item.name}
              </h4>
              <span className="text-[9px] font-mono text-sky-400/70 tracking-widest uppercase">
                {item.stage}
              </span>
            </div>

            <Paragraph className="text-[10px] text-zinc-500 font-light mt-1.5 leading-snug line-clamp-2 max-w-[180px] tracking-wide">
              {item.focus}
            </Paragraph>
          </div>
        ))}
      </div>
    </div>
  );
}

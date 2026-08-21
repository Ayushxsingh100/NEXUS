"use client";

import React from "react";
import { TopProjectCard, FeaturedProjectCard, type ProjectData } from "./ProjectCard";

const PROJECTS: ProjectData[] = [
  // ── Top row: 3 equal cards ──────────────────────────────────────────────────
  {
    number: "01",
    name: "VeyloPrep",
    description:
      "A cross-platform career and placement management app built to organize preparation, track opportunities, manage deadlines, and keep the entire placement journey in one place.",
    tech: ["Next.js", "TypeScript", "Capacitor"],
    status: "SHIPPED",
    secondaryStatus: "Production",
    accentColor: "#22d3ee",
    accentBorder: "rgba(34, 211, 238, 0.32)",
    accentBorderHover: "rgba(34, 211, 238, 0.75)",
    accentGlow: "rgba(34, 211, 238, 0.22)",
    artSrc: "/media/projects/VeyloPrep-removebg-preview.png",
    liveUrl: "#",
    githubUrl: "#",
    logoWidth: "150px",
    logoHeight: "150px",
  },
  {
    number: "02",
    name: "SplitSync",
    description:
      "A modern expense-sharing application for managing shared expenses, simplifying settlements, and keeping group finances organized across web and mobile.",
    tech: ["Next.js", "TypeScript", "Capacitor"],
    status: "SHIPPED",
    secondaryStatus: "Production",
    accentColor: "#8ab4a6",
    accentBorder: "rgba(138, 180, 166, 0.32)",
    accentBorderHover: "rgba(138, 180, 166, 0.75)",
    accentGlow: "rgba(138, 180, 166, 0.22)",
    artSrc: "/media/projects/SplitSync-removebg-preview.png",
    liveUrl: "#",
    githubUrl: "#",
    logoWidth: "220px",
    logoHeight: "110px",
  },
  {
    number: "03",
    name: "Engineered.dev",
    description:
      "A developer-focused technical publication where I document what I learn and write about cloud computing, backend engineering, system design, and software architecture.",
    tech: ["Cloud", "Backend", "System Design"],
    status: "LIVE",
    secondaryStatus: "Open Source",
    accentColor: "#8fa3b5",
    accentBorder: "rgba(143, 163, 181, 0.32)",
    accentBorderHover: "rgba(143, 163, 181, 0.75)",
    accentGlow: "rgba(143, 163, 181, 0.22)",
    artSrc: "/media/projects/engineered-removebg-preview.png",
    liveUrl: "#",
    githubUrl: "#",
    logoWidth: "300px",
    logoHeight: "195px",
  },

  // ── Bottom row: 2 wider featured cards (Converted to Open-Source Teasers) ───
  {
    number: "04",
    name: "Open source contribution cooking !",
    smallLabel: "OPEN SOURCE",
    description:
      "Currently exploring codebases, fixing things, learning in public, and preparing meaningful contributions.",
    tech: [],
    status: "COOKING RN...",
    accentColor: "#3b82f6",
    accentBorder: "rgba(59, 130, 246, 0.32)",
    accentBorderHover: "rgba(59, 130, 246, 0.75)",
    accentGlow: "rgba(59, 130, 246, 0.22)",
    artSrc: "/media/projects/opensource.png",
    liveUrl: "#",
    githubUrl: "#",
    isTeaser: true,
    teaserType: "cooking",
  },
  {
    number: "05",
    name: "Something is cooking...",
    smallLabel: "WHAT'S NEXT?",
    description:
      "More open-source work, experiments, and contributions are on the way.",
    tech: [],
    status: "IN PROGRESS",
    accentColor: "#f472b6",
    accentBorder: "rgba(244, 114, 182, 0.32)",
    accentBorderHover: "rgba(244, 114, 182, 0.75)",
    accentGlow: "rgba(244, 114, 182, 0.22)",
    artSrc: "/media/projects/opensource.png",
    liveUrl: "#",
    githubUrl: "#",
    isTeaser: true,
    teaserType: "next",
  },
];

export default function ProjectsGrid() {
  return (
    <div
      className="projects-grid-container"
      style={{
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateRows: "1.18fr 0.82fr auto", // exact single-page height budgeting
        gap: "10px",
        fontFamily: "'Poppins', sans-serif",
        paddingRight: "4px",
      }}
    >
      {/* Row 1: 3 equal cards */}
      <div
        className="projects-row-top"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
          height: "100%",
        }}
      >
        {PROJECTS.slice(0, 3).map((p) => (
          <TopProjectCard key={p.number} project={p} />
        ))}
      </div>

      {/* Row 2: 2 wider featured cards */}
      <div
        className="projects-row-bottom"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "10px",
          height: "100%",
        }}
      >
        {PROJECTS.slice(3).map((p) => (
          <FeaturedProjectCard key={p.number} project={p} />
        ))}
      </div>

      {/* Subtle footer detail line */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px 0 4px 0",
          marginTop: "6px",
          borderTop: "1px solid rgba(255, 255, 255, 0.05)",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "11px",
            color: "rgba(255,255,255,0.48)",
            letterSpacing: "0.08em",
            textAlign: "center",
          }}
        >
          More projects. More ideas. More{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #22d3ee, #3b82f6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontWeight: 600,
            }}
          >
            impact.
          </span>{" "}
          🚀
        </span>
      </div>

      {/* Responsive & Scrollbar Overrides */}
      <style dangerouslySetInnerHTML={{
        __html: `
          /* Hide scrollbar on desktop & prevent vertical scroll overflow */
          @media (min-width: 901px) {
            .projects-grid-container::-webkit-scrollbar {
              display: none !important;
              width: 0 !important;
              height: 0 !important;
            }
            .projects-grid-container {
              -ms-overflow-style: none !important;
              scrollbar-width: none !important;
              overflow-y: hidden !important;
            }
          }
          
          /* Tablet: 2 cols top row, 1 col bottom */
          @media (max-width: 1100px) and (min-width: 640px) {
            .projects-row-top {
              grid-template-columns: repeat(2, 1fr) !important;
            }
            .projects-row-bottom {
              grid-template-columns: 1fr !important;
            }
          }
          /* Mobile: single column all */
          @media (max-width: 639px) {
            .projects-row-top {
              grid-template-columns: 1fr !important;
            }
            .projects-row-bottom {
              grid-template-columns: 1fr !important;
            }
          }
        `
      }} />
    </div>
  );
}

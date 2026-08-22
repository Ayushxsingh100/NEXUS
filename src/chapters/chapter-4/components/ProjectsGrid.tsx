"use client";

import React from "react";
import { TopProjectCard, FeaturedProjectCard, type ProjectData } from "./ProjectCard";

const PROJECTS: ProjectData[] = [
  // ── Top row: 3 equal cards ─────────────────────────────────────────────────
  {
    number: "01",
    name: "VeyloPrep",
    description:
      "A cross-platform career and placement management app built to organize preparation, track opportunities, manage deadlines, and keep the entire placement journey in one place.",
    tech: ["Next.js", "TypeScript", "Capacitor"],
    status: "Shipped",
    secondaryStatus: "Production",
    accentColor: "#22d3ee",
    accentBorder: "rgba(34,211,238,0.32)",
    accentBorderHover: "rgba(34,211,238,0.75)",
    accentGlow: "rgba(34,211,238,0.22)",
    artSrc: "/media/projects/VeyloPrep-removebg-preview.png?v=2",
    liveUrl: "#",
    githubUrl: "#",
    logoWidth: "100px",
    logoHeight: "100px",
  },
  {
    number: "02",
    name: "SplitSync",
    description:
      "A modern expense-sharing application for managing shared expenses, simplifying settlements, and keeping group finances organized across web and mobile.",
    tech: ["Next.js", "TypeScript", "Capacitor"],
    status: "Shipped",
    secondaryStatus: "Production",
    accentColor: "#8ab4a6",
    accentBorder: "rgba(138,180,166,0.32)",
    accentBorderHover: "rgba(138,180,166,0.75)",
    accentGlow: "rgba(138,180,166,0.22)",
    artSrc: "/media/projects/SplitSync-removebg-preview.png",
    liveUrl: "#",
    githubUrl: "#",
    logoWidth: "140px",
    logoHeight: "70px",
  },
  {
    number: "03",
    name: "Engineered.dev",
    description:
      "A developer-focused technical publication where I document what I learn and write about cloud computing, backend engineering, system design, and software architecture.",
    tech: ["Cloud", "Backend", "System Design"],
    status: "Live",
    secondaryStatus: "Open Source",
    accentColor: "#8fa3b5",
    accentBorder: "rgba(143,163,181,0.32)",
    accentBorderHover: "rgba(143,163,181,0.75)",
    accentGlow: "rgba(143,163,181,0.22)",
    artSrc: "/media/projects/engineered-removebg-preview.png",
    liveUrl: "#",
    githubUrl: "#",
    logoWidth: "150px",
    logoHeight: "90px",
  },

  // ── Bottom row: 2 wider featured / teaser cards ────────────────────────────
  {
    number: "04",
    name: "Open source contribution cooking!",
    smallLabel: "OPEN SOURCE",
    description: "Contributing to codebases and learning in public.",
    tech: [],
    status: "COOKING RN...",
    accentColor: "#3b82f6",
    accentBorder: "rgba(59,130,246,0.32)",
    accentBorderHover: "rgba(59,130,246,0.75)",
    accentGlow: "rgba(59,130,246,0.22)",
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
    description: "Developing new experiments and utilities.",
    tech: [],
    status: "IN PROGRESS",
    accentColor: "#f472b6",
    accentBorder: "rgba(244,114,182,0.32)",
    accentBorderHover: "rgba(244,114,182,0.75)",
    accentGlow: "rgba(244,114,182,0.22)",
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
      className="pgrid"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        fontFamily: "'Poppins', sans-serif",
        /* Allow the grid to scroll on desktop only if viewport is too short */
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* ── Top row: 3 equal columns ── */}
      <div
        className="pgrid-top"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "12px",
          /* Top row: slightly larger, projects are the main story */
          flex: "1.2 1 0",
          minHeight: 0,
        }}
      >
        {PROJECTS.slice(0, 3).map((p) => (
          <TopProjectCard key={p.number} project={p} />
        ))}
      </div>

      {/* ── Bottom row: 2 equal columns ── */}
      <div
        className="pgrid-bottom"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "12px",
          flex: "1 1 0",
          minHeight: 0,
        }}
      >
        {PROJECTS.slice(3).map((p) => (
          <FeaturedProjectCard key={p.number} project={p} />
        ))}
      </div>

      {/* ── Footer ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "10px",
          paddingBottom: "4px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "12.5px",
            color: "#6E6E73",
            letterSpacing: "0.02em",
          }}
        >
          More projects. More ideas. More{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #5ac8fa, #5e5ce6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontWeight: 500,
            }}
          >
            impact.
          </span>
        </span>
      </div>

      {/* ── Responsive overrides ── */}
      <style dangerouslySetInnerHTML={{
        __html: `
          /* Desktop: hide scrollbar */
          @media (min-width: 1025px) {
            .pgrid { overflow: hidden !important; }
          }

          /* Narrow desktop / large tablet: 2+1 layout */
          @media (max-width: 1200px) and (min-width: 769px) {
            .pgrid { overflow-y: auto !important; height: auto !important; }
            .pgrid-top { grid-template-columns: repeat(2, 1fr) !important; }
            .pgrid-bottom { grid-template-columns: 1fr !important; }
          }

          /* Tablet portrait */
          @media (max-width: 768px) {
            .pgrid { overflow-y: auto !important; height: auto !important; }
            .pgrid-top { grid-template-columns: 1fr !important; }
            .pgrid-bottom { grid-template-columns: 1fr !important; }
          }
        `
      }} />
    </div>
  );
}

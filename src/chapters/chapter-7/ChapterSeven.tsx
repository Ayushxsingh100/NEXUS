"use client";

import React from "react";
import HeroSection from "./components/HeroSection";
import StorySection from "./components/StorySection";
import TimelineSection from "./components/TimelineSection";
import MetricsSection from "./components/MetricsSection";
import ClosingSection from "./components/ClosingSection";

interface ChapterSevenProps {
  onReturn: () => void;
  onContact?: () => void;
}

/** ─── Segment Section Divider ─────────────────────────────────────── */
function SectionDivider() {
  return (
    <div
      aria-hidden="true"
      style={{
        width: "100%",
        maxWidth: "1400px",
        marginInline: "auto",
        paddingInline: "40px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.06) 80%, transparent 100%)",
        }}
      />
    </div>
  );
}

/** ─── Chapter VII: About (Director's Cut) ─────────────────────────── */
export default function ChapterSeven({ onReturn, onContact }: ChapterSevenProps) {
  return (
    <div
      id="chapter-seven-root"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        background: "#020814",
        overflowX: "hidden",
        fontFamily: "'Poppins', sans-serif",
        color: "#ffffff",
      }}
    >
      {/* Immersive environmental ambient highlights */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: "10%",
          left: "-10%",
          width: "70vw",
          height: "70vw",
          maxWidth: "900px",
          maxHeight: "900px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(9,42,72,0.85) 0%, rgba(4,20,38,0.4) 45%, transparent 75%)",
          filter: "blur(80px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          bottom: "10%",
          right: "-5%",
          width: "55vw",
          height: "55vw",
          maxWidth: "700px",
          maxHeight: "700px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(192,132,252,0.06) 0%, transparent 65%)",
          filter: "blur(90px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <main
        style={{
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* S01: Immersive Hero Scanner Portrait */}
        <HeroSection onReturn={onReturn} />

        <SectionDivider />

        {/* S02: My Story (Reveal Lines) */}
        <StorySection />

        <SectionDivider />

        {/* S03: Engineering Timeline (Screen-width feature) */}
        <TimelineSection />

        <SectionDivider />

        {/* S06: Engineering Metrics (Interactive Counters) */}
        <MetricsSection />

        {/* S07: Closing Fade-to-Black Epilogue */}
        <ClosingSection onReturn={onReturn} onContact={onContact} />
      </main>
    </div>
  );
}

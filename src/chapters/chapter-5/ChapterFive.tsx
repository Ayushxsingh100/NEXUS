"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import BlackScreen from "../chapter-1/components/BlackScreen";
import EngineeringStory from "./components/EngineeringStory";

interface ChapterFiveProps {
  onReturn: () => void;
}

export default function ChapterFive({ onReturn: _onReturn }: ChapterFiveProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  /* ── Entrance: fade in from black ── */
  useGSAP(() => {
    gsap.to("#black-screen", { opacity: 0, duration: 1.5, ease: "power2.out" });
  }, { scope: containerRef, dependencies: [] });

  return (
    <div
      ref={containerRef}
      id="chapter-five-root"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        background: "#16223f",
        overflowX: "hidden",
        fontFamily: "'Poppins', sans-serif",
        color: "#ffffff",
      }}
    >
      {/* ── Ambient background — identical to Chapter 7 ── */}
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

      {/* ── Scrollable main — id used by TimelineSection's IntersectionObserver ── */}
      <main
        id="main-content"
        style={{
          position: "relative",
          zIndex: 1,
          overflowY: "auto",
          maxHeight: "100vh",
        }}
      >
        {/* Chapter 5 — The Evolution of an Engineer */}
        <EngineeringStory />
      </main>

      {/* ── Shutter Blackout Overlay ── */}
      <BlackScreen />
    </div>
  );
}

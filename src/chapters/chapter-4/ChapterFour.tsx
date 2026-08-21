"use client";

import React from "react";
import ProjectsSidebar from "./components/ProjectsSidebar";
import ProjectsGrid from "./components/ProjectsGrid";

interface ChapterFourProps {
  onReturn: () => void;
}

export default function ChapterFour({ onReturn }: ChapterFourProps) {
  return (
    <div
      id="chapter-four-root"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100svh",
        overflow: "hidden",
        fontFamily: "'Poppins', sans-serif",
        color: "#ffffff",
        background: "#020814",
      }}
    >
      {/* ── Ambient Background Illumination (Visibly Illuminated) ── */}
      {/* Primary radial — centre-left soft blue pool */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "10%",
          left: "-5%",
          width: "70vw",
          height: "70vw",
          maxWidth: "850px",
          maxHeight: "850px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(9, 42, 72, 0.98) 0%, rgba(4, 20, 38, 0.6) 45%, transparent 75%)",
          filter: "blur(80px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {/* Secondary radial — top-right cyan tint */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-10%",
          right: "5%",
          width: "55vw",
          height: "55vw",
          maxWidth: "650px",
          maxHeight: "650px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(34, 211, 238, 0.08) 0%, transparent 65%)",
          filter: "blur(90px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {/* Tertiary radial — bottom-right violet tint */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-5%",
          right: "10%",
          width: "50vw",
          height: "50vw",
          maxWidth: "600px",
          maxHeight: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(192, 132, 252, 0.07) 0%, transparent 65%)",
          filter: "blur(90px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── Page Content ── */}
      <div
        className="ch4-page-wrapper"
        style={{
          position: "relative",
          zIndex: 1,
          width: "calc(100% - 80px)",
          maxWidth: "1560px",
          marginInline: "auto",
          height: "100svh",
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          paddingTop: "72px",
          paddingBottom: "40px",
          gap: "0",
          boxSizing: "border-box",
        }}
      >
        {/* LEFT: Sidebar ≈ 18% */}
        <div
          className="ch4-sidebar"
          style={{
            flexShrink: 0,
            width: "18%",
            minWidth: "180px",
            maxWidth: "240px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingRight: "0",
          }}
        >
          <ProjectsSidebar onReturn={onReturn} />
        </div>

        {/* Vertical divider */}
        <div
          aria-hidden="true"
          style={{
            width: "1px",
            alignSelf: "stretch",
            background: "rgba(255,255,255,0.06)",
            marginInline: "32px",
            flexShrink: 0,
          }}
        />

        {/* RIGHT: Project grid ≈ 78% */}
        <div
          className="ch4-grid-area"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            paddingLeft: "0",
          }}
        >
          <ProjectsGrid />
        </div>
      </div>

      {/* ── Responsive Overrides ── */}
      <style dangerouslySetInnerHTML={{
        __html: `
          /* Tablet: sidebar stacks above grid */
          @media (max-width: 900px) {
            .ch4-page-wrapper {
              flex-direction: column !important;
              height: auto !important;
              min-height: 100svh !important;
              overflow-y: auto !important;
              padding-top: 76px !important;
              padding-bottom: 56px !important;
              width: calc(100% - 48px) !important;
            }
            .ch4-sidebar {
              width: 100% !important;
              max-width: 100% !important;
              min-width: unset !important;
              padding-right: 0 !important;
            }
            .ch4-sidebar > div {
              padding-right: 0 !important;
            }
            .ch4-page-wrapper > [aria-hidden="true"] {
              display: none !important;
            }
            .ch4-grid-area {
              overflow: visible !important;
            }
          }
          /* Mobile: tighter padding */
          @media (max-width: 480px) {
            .ch4-page-wrapper {
              width: calc(100% - 32px) !important;
              padding-top: 68px !important;
            }
          }
        `
      }} />
    </div>
  );
}

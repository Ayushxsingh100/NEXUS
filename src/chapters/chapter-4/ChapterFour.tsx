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
        color: "#F5F5F7",
        background: "#000000",
      }}
    >
      <div
        className="ch4-page-wrapper"
        style={{
          position: "relative",
          zIndex: 1,
          /* Wider container, sidebar is no longer tiny */
          width: "calc(100% - 64px)",
          maxWidth: "1600px",
          marginInline: "auto",
          height: "100svh",
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          paddingTop: "64px",
          paddingBottom: "32px",
          boxSizing: "border-box",
        }}
      >
        {/* LEFT: Sidebar — 300px fixed, feels editorial */}
        <div
          className="ch4-sidebar"
          style={{
            flexShrink: 0,
            width: "300px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
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
            background: "rgba(255,255,255,0.07)",
            marginInline: "40px",
            flexShrink: 0,
          }}
        />

        {/* RIGHT: Project grid — fills remaining space */}
        <div
          className="ch4-grid-area"
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <ProjectsGrid />
        </div>
      </div>

      {/* ── Responsive ── */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @media (max-width: 1024px) {
            .ch4-page-wrapper {
              flex-direction: column !important;
              height: auto !important;
              min-height: 100svh !important;
              overflow-y: auto !important;
              padding-top: 72px !important;
              padding-bottom: 48px !important;
              width: calc(100% - 48px) !important;
            }
            .ch4-sidebar {
              width: 100% !important;
              justify-content: flex-start !important;
              padding-bottom: 0 !important;
            }
            .ch4-page-wrapper > [aria-hidden="true"] {
              display: none !important;
            }
            .ch4-grid-area {
              overflow: visible !important;
            }
          }
          @media (max-width: 480px) {
            .ch4-page-wrapper {
              width: calc(100% - 32px) !important;
              padding-top: 64px !important;
            }
          }
        `
      }} />
    </div>
  );
}

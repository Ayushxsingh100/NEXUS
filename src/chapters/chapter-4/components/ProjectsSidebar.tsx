"use client";

import React from "react";

interface StatItem {
  value: string;
  label: string;
}

const STATS: StatItem[] = [
  { value: "03", label: "Shipped Projects" },
  { value: "02", label: "Brewing Next" },
  { value: "∞", label: "Learning & Building" },
  { value: "100%", label: "Learning. Shipping. Iterating." },
];

interface ProjectsSidebarProps {
  onReturn: () => void;
}

export default function ProjectsSidebar({ onReturn }: ProjectsSidebarProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        paddingLeft: "32px",
        paddingRight: "16px",
        fontFamily: "'Poppins', sans-serif",
        alignItems: "flex-start",
      }}
    >
      {/* Return to Hub */}
      <button
        onClick={onReturn}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          fontSize: "10px",
          letterSpacing: "0.2em",
          fontWeight: 400,
          color: "rgba(255,255,255,0.42)",
          background: "transparent",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "999px",
          padding: "6px 14px",
          marginBottom: "28px",
          alignSelf: "flex-start",
          cursor: "pointer",
          transition: "color 0.25s ease, border-color 0.25s ease",
          fontFamily: "'Poppins', sans-serif",
          textTransform: "uppercase",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.85)";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.22)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.42)";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)";
        }}
      >
        ← Hub
      </button>

      {/* PROJECTS small label */}
      <span
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.22em",
          color: "#22d3ee",
          textTransform: "uppercase",
          marginBottom: "14px",
          alignSelf: "flex-start",
        }}
      >
        PROJECTS
      </span>

      {/* Main heading */}
      <h1
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "clamp(32px, 2.8vw, 50px)",
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: "-0.03em",
          color: "#ffffff",
          margin: 0,
          marginBottom: "14px",
          alignSelf: "flex-start",
        }}
      >
        Ideas
        <br />
        Shipped.
        <br />
        <span
          style={{
            background: "linear-gradient(90deg, #22d3ee 0%, #3b82f6 50%, #c084fc 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Impact
          <br />
          Created.
        </span>
      </h1>

      {/* Gradient accent line */}
      <div
        style={{
          width: "80px",
          height: "3px",
          borderRadius: "99px",
          background: "linear-gradient(90deg, #22d3ee, #3b82f6, #c084fc)",
          marginBottom: "14px",
          opacity: 0.85,
          alignSelf: "flex-start",
        }}
      />

      {/* Description */}
      <p
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "13px",
          fontWeight: 400,
          lineHeight: 1.6,
          color: "rgba(255,255,255,0.62)",
          margin: 0,
          marginBottom: "22px",
          maxWidth: "260px",
          alignSelf: "flex-start",
        }}
      >
        A collection of meaningful projects
        <br />
        where code meets purpose.{" "}
        <span role="img" aria-label="blue heart">
          💙
        </span>
      </p>

      {/* Stats Card (compact version with cohesive brightness) */}
      <div
        style={{
          background: "linear-gradient(165deg, rgba(22, 38, 70, 0.94) 0%, rgba(12, 22, 46, 0.98) 100%)",
          border: "1.5px solid rgba(34, 211, 238, 0.22)",
          borderRadius: "16px",
          padding: "16px 20px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.45), inset 0 1px 1px rgba(255,255,255,0.06)",
          width: "100%",
          maxWidth: "260px",
          alignSelf: "flex-start",
        }}
      >
        {STATS.map((stat) => (
          <div
            key={stat.value}
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "10px",
            }}
          >
            <span
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: stat.value === "100%" ? "14px" : "16px",
                fontWeight: 700,
                color: "#22d3ee",
                letterSpacing: "-0.02em",
                lineHeight: 1,
                minWidth: "34px",
                flexShrink: 0,
              }}
            >
              {stat.value}
            </span>
            <span
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "11px",
                fontWeight: 400,
                color: "rgba(255,255,255,0.52)",
                lineHeight: 1.4,
              }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

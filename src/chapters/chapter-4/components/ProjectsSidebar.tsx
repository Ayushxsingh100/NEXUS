"use client";

import React from "react";

interface StatItem { value: string; label: string; }

const STATS: StatItem[] = [
  { value: "03",   label: "Shipped Projects" },
  { value: "02",   label: "Brewing Next" },
  { value: "∞",    label: "Learning & Building" },
  { value: "100%", label: "Learning. Shipping. Iterating." },
];

const SOCIALS = [
  {
    label: "GitHub",
    href: "#",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "#",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
];

interface ProjectsSidebarProps { onReturn: () => void; }

export default function ProjectsSidebar({ onReturn }: ProjectsSidebarProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "0 24px 0 4px",
        fontFamily: "'Poppins', sans-serif",
        justifyContent: "center",
        gap: 0,
      }}
    >
      {/* ── Hub button ── */}
      <button
        onClick={onReturn}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          fontSize: "11px",
          letterSpacing: "0.12em",
          fontWeight: 400,
          color: "rgba(255,255,255,0.38)",
          background: "transparent",
          border: "1px solid rgba(255,255,255,0.09)",
          borderRadius: "999px",
          padding: "6px 16px",
          marginBottom: "32px",
          alignSelf: "flex-start",
          cursor: "pointer",
          transition: "color 0.22s, border-color 0.22s",
          fontFamily: "'Poppins', sans-serif",
          textTransform: "uppercase",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.72)";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.18)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.38)";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.09)";
        }}
      >
        ← Hub
      </button>

      {/* ── Section label ── */}
      <span
        style={{
          fontSize: "10px",
          fontWeight: 500,
          letterSpacing: "0.22em",
          color: "#6E6E73",
          textTransform: "uppercase",
          marginBottom: "16px",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        PROJECTS
      </span>

      {/* ── Heading — dominant element ── */}
      <h1
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "clamp(44px, 3.8vw, 68px)",
          fontWeight: 700,
          lineHeight: 0.96,
          letterSpacing: "-0.04em",
          color: "#F5F5F7",
          margin: 0,
          marginBottom: "20px",
        }}
      >
        Ideas.
        <br />
        Shipped.
        <br />
        <span
          style={{
            background: "linear-gradient(135deg, #5ac8fa 0%, #5e5ce6 50%, #bf5af2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Impact.
          <br />
          Created.
        </span>
      </h1>

      {/* ── Accent rule ── */}
      <div
        style={{
          width: "48px",
          height: "1.5px",
          background: "linear-gradient(90deg, #5ac8fa 0%, #5e5ce6 80%, transparent 100%)",
          marginBottom: "20px",
          opacity: 0.7,
        }}
      />

      {/* ── Description ── */}
      <p
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "15px",
          fontWeight: 400,
          lineHeight: 1.6,
          color: "#A1A1A6",
          margin: 0,
          marginBottom: "28px",
          maxWidth: "260px",
        }}
      >
        A collection of meaningful projects where code meets purpose.
      </p>

      {/* ── Statistics card ── */}
      <div
        style={{
          background: "#050505",
          border: "1px solid rgba(255,255,255,0.10)",
          borderRadius: "16px",
          overflow: "hidden",
          marginBottom: "28px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.45)",
        }}
      >
        {STATS.map((stat, i) => (
          <div key={stat.value}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "14px 20px",
              }}
            >
              <span
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: stat.value === "100%" ? "14px" : "16px",
                  fontWeight: 600,
                  color: "#F5F5F7",
                  letterSpacing: "-0.02em",
                  minWidth: "40px",
                  flexShrink: 0,
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "12px",
                  fontWeight: 400,
                  color: "#6E6E73",
                  lineHeight: 1.4,
                }}
              >
                {stat.label}
              </span>
            </div>
            {i < STATS.length - 1 && (
              <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", marginInline: "20px" }} />
            )}
          </div>
        ))}
      </div>

      {/* ── Social icons ── */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {SOCIALS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            title={s.label}
            style={{
              color: "rgba(255,255,255,0.30)",
              textDecoration: "none",
              transition: "color 0.2s ease",
              display: "flex",
              alignItems: "center",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.72)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.30)")}
          >
            {s.icon}
          </a>
        ))}
      </div>
    </div>
  );
}

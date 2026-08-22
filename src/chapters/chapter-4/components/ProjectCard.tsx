"use client";

import React, { useState } from "react";
import Image from "next/image";

/* ─── Design tokens ─────────────────────────────────────────────────────────
   Elevation: page bg → card #050505 → elevated #0B0B0B → terminal #030303
────────────────────────────────────────────────────────────────────────────── */
const T = {
  card:        "#050505",
  cardHover:   "#080808",
  elevated:    "#0B0B0B",
  terminal:    "#030303",
  terminalBar: "#060606",
  border:      "rgba(255,255,255,0.10)",
  borderHover: "rgba(255,255,255,0.18)",
  divider:     "rgba(255,255,255,0.07)",
  text:        "#F5F5F7",
  textSec:     "#A1A1A6",
  textMuted:   "#6E6E73",
  radius:      "18px",
  shadow:      "0 4px 20px rgba(0,0,0,0.50), 0 1px 0px rgba(255,255,255,0.03) inset",
  shadowHover: "0 16px 40px rgba(0,0,0,0.65)",
  ease:        "0.26s cubic-bezier(0.16, 1, 0.3, 1)",
};

export interface ProjectData {
  number: string;
  name: string;
  description: string;
  tech: string[];
  status: string;
  secondaryStatus?: string;
  accentColor: string;
  accentBorder: string;
  accentBorderHover: string;
  accentGlow: string;
  artSrc: string;
  liveUrl: string;
  githubUrl: string;
  isTeaser?: boolean;
  teaserType?: "cooking" | "next";
  smallLabel?: string;
  highlightedText?: string;
  logoWidth?: string;
  logoHeight?: string;
  blendMode?: string;
}

/* ─── Status chip ── */
function Status({ secondary, primary }: { secondary?: string; primary: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
      {secondary && (
        <>
          <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "10px", color: T.textMuted }}>{secondary}</span>
          <span style={{ color: T.textMuted, fontSize: "10px" }}>·</span>
        </>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#30D158", flexShrink: 0 }} />
        <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "10px", color: T.textMuted }}>{primary}</span>
      </div>
    </div>
  );
}


/* ─── macOS terminal ── */
function Terminal({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <div style={{
      width: "100%", height: "100%",
      background: T.terminal,
      border: `1px solid ${T.border}`,
      borderRadius: "12px",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Traffic lights */}
      <div style={{
        height: "32px", background: T.terminalBar,
        borderBottom: `1px solid ${T.divider}`,
        display: "flex", alignItems: "center",
        paddingLeft: "12px", gap: "7px", flexShrink: 0,
      }}>
        <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FF5F57" }} />
        <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FFBD2E" }} />
        <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#28C840" }} />
      </div>
      {/* Body */}
      <div style={{
        flex: 1, padding: "16px 18px",
        display: "flex", flexDirection: "column",
        justifyContent: "center", gap: "7px",
        fontFamily: "'SF Mono','Fira Mono','Consolas','Courier New',monospace",
        fontSize: "11.5px", color: T.textSec, lineHeight: 1.55,
      }}>
        {children}
      </div>
    </div>
  );
}

/* ─── Icons ── */
const ExternalIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const GithubIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

/* ═══════════════════════════════════════════════════════════
   TOP PROJECT CARD — 3 per row
   Layout: number/status → fixed-height logo zone → title → desc → tags → hr → links
═══════════════════════════════════════════════════════════ */
export function TopProjectCard({ project }: { project: ProjectData }) {
  const [hov, setHov] = useState(false);
  const [liveHov, setLiveHov] = useState(false);
  const [ghHov, setGhHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        borderRadius: T.radius,
        padding: "20px 20px 18px 20px",
        background: hov ? T.cardHover : T.card,
        border: `1px solid ${hov ? T.borderHover : T.border}`,
        boxShadow: hov ? T.shadowHover : T.shadow,
        transform: hov ? "translateY(-3px)" : "translateY(0)",
        transition: `background ${T.ease}, border-color ${T.ease}, box-shadow ${T.ease}, transform ${T.ease}`,
        fontFamily: "'Poppins', sans-serif",
        cursor: "default",
        overflow: "hidden",
        boxSizing: "border-box",
        height: "100%",
      }}
    >
      {/* ── Number + Status ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
        <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "11px", fontWeight: 500, color: T.textMuted, letterSpacing: "0.06em" }}>
          {project.number}
        </span>
        <Status secondary={project.secondaryStatus} primary={project.status} />
      </div>

      {/* ── Logo zone — fixed height, always centred ── */}
      <div
        style={{
          height: "110px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginBottom: "12px",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "relative",
            width: project.logoWidth ?? "130px",
            height: project.logoHeight ?? "90px",
            transform: hov ? "scale(1.06)" : "scale(1)",
            transition: `transform ${T.ease}`,
            flexShrink: 0,
            borderRadius: "18px",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            background: (project.number === "01" || project.number === "03") ? "#ffffff" : "transparent",
          }}
        >
          <Image
            src={project.artSrc}
            alt={project.name}
            fill
            unoptimized={true}
            sizes={project.logoWidth ?? "130px"}
            style={{
              objectFit: "contain",
              objectPosition: "center",
              borderRadius: "inherit",
              filter: hov
                ? `drop-shadow(0 8px 20px ${project.accentColor}55)`
                : `drop-shadow(0 4px 12px ${project.accentColor}38)`,
              transition: `filter ${T.ease}`,
            }}
            priority
          />
        </div>
      </div>

      {/* ── Title ── */}
      <h3
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "20px",
          fontWeight: 650,
          color: T.text,
          margin: "0 0 6px 0",
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
        }}
      >
        {project.name}
      </h3>

      {/* ── Description ── */}
      <p
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "13.5px",
          fontWeight: 400,
          color: T.textSec,
          lineHeight: 1.6,
          margin: "0 0 12px 0",
          /* Grows to push tags + footer to bottom */
          flexGrow: 1,
        }}
      >
        {project.description}
      </p>

      {/* ── Divider ── */}
      <div style={{ height: "1px", background: T.divider, marginBottom: "10px", flexShrink: 0 }} />

      {/* ── Links ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setLiveHov(true)}
          onMouseLeave={() => setLiveHov(false)}
          onClick={(e) => e.stopPropagation()}
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "12px",
            fontWeight: 500,
            color: liveHov ? "#5ac8fa" : "#D2D2D7",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            transition: `color 0.18s, transform 0.18s`,
            transform: liveHov ? "translateX(2px)" : "translateX(0)",
          }}
        >
          Live Demo <ExternalIcon />
        </a>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setGhHov(true)}
          onMouseLeave={() => setGhHov(false)}
          onClick={(e) => e.stopPropagation()}
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "12px",
            fontWeight: 400,
            color: ghHov ? "#F5F5F7" : "#6E6E73",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            transition: "color 0.18s",
          }}
        >
          GitHub <GithubIcon />
        </a>
      </div>
    </div>
  );
}

/* ─── Teaser status indicator ── */
function TeaserStatus({ type }: { type: "cooking" | "next" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
      <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: type === "cooking" ? "#FF9F0A" : "#5ac8fa", flexShrink: 0 }} />
      <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "10px", color: T.textMuted }}>
        {type === "cooking" ? "Cooking RN" : "In Progress"}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   FEATURED BOTTOM CARD — 2 per row
   Layout: 38% left content / 62% terminal panel
═══════════════════════════════════════════════════════════ */
export function FeaturedProjectCard({ project }: { project: ProjectData }) {
  const [hov, setHov] = useState(false);

  if (project.isTeaser) {
    const accent = project.teaserType === "cooking" ? "#5ac8fa" : "#5e5ce6";

    return (
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "38% 62%",
          borderRadius: T.radius,
          background: hov ? T.cardHover : T.card,
          border: `1px solid ${hov ? T.borderHover : T.border}`,
          boxShadow: hov ? T.shadowHover : T.shadow,
          transform: hov ? "translateY(-3px)" : "translateY(0)",
          transition: `background ${T.ease}, border-color ${T.ease}, box-shadow ${T.ease}, transform ${T.ease}`,
          fontFamily: "'Poppins', sans-serif",
          cursor: "default",
          overflow: "hidden",
          height: "100%",
        }}
      >
        {/* LEFT: project info */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          padding: "20px 18px 20px 22px",
          borderRight: `1px solid ${T.divider}`,
          overflow: "hidden",
        }}>
          {/* Number + status */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "11px", fontWeight: 500, color: T.textMuted, letterSpacing: "0.06em" }}>
              {project.number}
            </span>
            <TeaserStatus type={project.teaserType!} />
          </div>

          {/* Icon in bordered container */}
          <div
            style={{
              width: "52px", height: "52px",
              background: "#ffffff",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: "18px", flexShrink: 0,
              position: "relative",
              transform: hov ? "scale(1.04)" : "scale(1)",
              transition: `transform ${T.ease}`,
              overflow: "hidden",
            }}
          >
            <Image src={project.artSrc} alt={project.name} fill sizes="52px"
              unoptimized={true}
              style={{ objectFit: "contain", padding: "10px", borderRadius: "inherit" }} priority />
          </div>

          {/* Category label */}
          <span style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "9.5px", fontWeight: 500,
            color: accent,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            marginBottom: "7px",
          }}>
            {project.smallLabel ?? "OPEN SOURCE"}
          </span>

          {/* Title */}
          <h3 style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "17px", fontWeight: 650,
            color: T.text,
            margin: "0 0 10px 0",
            lineHeight: 1.2, letterSpacing: "-0.02em",
          }}>
            {project.name}
          </h3>

          {/* Description */}
          <p style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "13px",
            fontWeight: 500,
            color: T.text,
            lineHeight: 1.5,
            margin: 0,
            flexGrow: 1,
          }}>
            {project.description}
          </p>
        </div>

        {/* RIGHT: terminal */}
        <div style={{ padding: "16px 16px 16px 14px", boxSizing: "border-box" }}>
          <Terminal accent={accent}>
            {project.teaserType === "cooking" ? (
              <>
                <div style={{ animation: "cl1 10s infinite ease-in-out" }}><span style={{ color: accent }}>›</span> exploring repositories...</div>
                <div style={{ animation: "cl2 10s infinite ease-in-out" }}><span style={{ color: accent }}>›</span> reading code...</div>
                <div style={{ animation: "cl3 10s infinite ease-in-out" }}><span style={{ color: accent }}>›</span> understanding context...</div>
                <div style={{ animation: "cl4 10s infinite ease-in-out" }}><span style={{ color: accent }}>›</span> fixing issues...</div>
                <div style={{ animation: "cl5 10s infinite ease-in-out" }}><span style={{ color: accent }}>›</span> writing better code...</div>
                <div style={{ animation: "cl6 10s infinite ease-in-out" }}><span style={{ color: accent }}>›</span> preparing PR...</div>
                <div style={{ animation: "cl7 10s infinite ease-in-out", color: T.text }}>
                  <span style={{ color: accent }}>›</span> impact loading <span style={{ animation: "blink 1s infinite", color: accent }}>█</span>
                </div>
              </>
            ) : (
              <>
                <div style={{ animation: "nl1 10s infinite ease-in-out" }}><span style={{ color: accent }}>›</span> finding interesting problems...</div>
                <div style={{ animation: "nl2 10s infinite ease-in-out" }}><span style={{ color: accent }}>›</span> reading code...</div>
                <div style={{ animation: "nl3 10s infinite ease-in-out" }}><span style={{ color: accent }}>›</span> understanding systems...</div>
                <div style={{ animation: "nl4 10s infinite ease-in-out" }}><span style={{ color: accent }}>›</span> experimenting...</div>
                <div style={{ animation: "nl5 10s infinite ease-in-out" }}><span style={{ color: accent }}>›</span> building...</div>
                <div style={{ animation: "nl6 10s infinite ease-in-out" }}>
                  <span style={{ color: accent }}>›</span> contribution loading... <span style={{ animation: "blink 1s infinite", color: accent }}>_</span>
                </div>
              </>
            )}
          </Terminal>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes cl1{0%,5%{opacity:0;transform:translateY(4px)}10%,90%{opacity:1;transform:translateY(0)}95%,100%{opacity:0}}
          @keyframes cl2{0%,15%{opacity:0;transform:translateY(4px)}20%,90%{opacity:1;transform:translateY(0)}95%,100%{opacity:0}}
          @keyframes cl3{0%,25%{opacity:0;transform:translateY(4px)}30%,90%{opacity:1;transform:translateY(0)}95%,100%{opacity:0}}
          @keyframes cl4{0%,35%{opacity:0;transform:translateY(4px)}40%,90%{opacity:1;transform:translateY(0)}95%,100%{opacity:0}}
          @keyframes cl5{0%,47%{opacity:0;transform:translateY(4px)}52%,90%{opacity:1;transform:translateY(0)}95%,100%{opacity:0}}
          @keyframes cl6{0%,59%{opacity:0;transform:translateY(4px)}64%,90%{opacity:1;transform:translateY(0)}95%,100%{opacity:0}}
          @keyframes cl7{0%,71%{opacity:0;transform:translateY(4px)}76%,90%{opacity:1;transform:translateY(0)}95%,100%{opacity:0}}
          @keyframes nl1{0%,6%{opacity:0;transform:translateY(4px)}11%,90%{opacity:1;transform:translateY(0)}95%,100%{opacity:0}}
          @keyframes nl2{0%,18%{opacity:0;transform:translateY(4px)}23%,90%{opacity:1;transform:translateY(0)}95%,100%{opacity:0}}
          @keyframes nl3{0%,30%{opacity:0;transform:translateY(4px)}35%,90%{opacity:1;transform:translateY(0)}95%,100%{opacity:0}}
          @keyframes nl4{0%,42%{opacity:0;transform:translateY(4px)}47%,90%{opacity:1;transform:translateY(0)}95%,100%{opacity:0}}
          @keyframes nl5{0%,54%{opacity:0;transform:translateY(4px)}59%,90%{opacity:1;transform:translateY(0)}95%,100%{opacity:0}}
          @keyframes nl6{0%,66%{opacity:0;transform:translateY(4px)}71%,90%{opacity:1;transform:translateY(0)}95%,100%{opacity:0}}
          @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        `}} />
      </div>
    );
  }

  /* Non-teaser fallback */
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "42% 58%",
        gridTemplateRows: "1fr auto",
        borderRadius: T.radius,
        background: hov ? T.cardHover : T.card,
        border: `1px solid ${hov ? T.borderHover : T.border}`,
        boxShadow: hov ? T.shadowHover : T.shadow,
        transform: hov ? "translateY(-3px)" : "translateY(0)",
        transition: `all ${T.ease}`,
        fontFamily: "'Poppins', sans-serif",
        cursor: "default",
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", padding: "20px 18px 16px 22px", borderRight: `1px solid ${T.divider}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "14px" }}>
          <span style={{ fontSize: "11px", fontWeight: 500, color: T.textMuted }}>{project.number}</span>
          <Status secondary={project.secondaryStatus} primary={project.status} />
        </div>
        <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "18px", fontWeight: 650, color: T.text, margin: "0 0 8px 0", letterSpacing: "-0.02em" }}>
          {project.name}
        </h3>
        <p style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "13px",
          fontWeight: 500,
          color: T.text,
          lineHeight: 1.5,
          margin: "0 0 12px 0",
          flexGrow: 1,
        }}>
          {project.description}
        </p>
      </div>
      <div style={{ padding: "16px 18px", gridColumn: "2", gridRow: "1" }}>
        <div style={{ width: "100%", height: "100%", background: T.terminal, border: `1px solid ${T.border}`, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: "11px", color: T.textMuted }}>Preview</span>
        </div>
      </div>
    </div>
  );
}

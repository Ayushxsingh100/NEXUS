"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ═══════════════════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════════════════ */
interface FloatItem {
  emoji: string;
  x: string;
  y: string;
  size: string;
  delay: string;
  dur: string;
  anim: "float" | "spin" | "pop";
}
interface ChipDef { emoji: string; label: string }
interface HighlightDef { emoji?: string; image?: string; svgIcon?: "puzzle" | "bolt" | "trophy" | "search" | "rocket" | "tools" | "mobile" | "globe" | "target" | "scale" | "book" | "ship"; text: string }
interface YearDef {
  year: string;
  chapter: string;
  theme: string;
  accent: string;
  accentB: string;
  glow: string;
  quote: string;
  subQuote: string;
  highlights: HighlightDef[];
  chips: ChipDef[];
  scene: FloatItem[];
  codeSnippet: string;
  transitionQuote: string;
}

const YEARS: YearDef[] = [
  {
    year: "2024",
    chapter: "I",
    theme: "Foundation",
    accent: "#38bdf8",
    accentB: "#818cf8",
    glow: "rgba(56,189,248,0.4)",
    quote: "The year curiosity became obsession.",
    subQuote: "A new campus, a new language, and a thousand unanswered questions.",
    highlights: [
      { image: "/media/2024/UPES LOGO.png", text: "Joined UPES Dehradun — B.Tech Computer Science (AI/ML)" },
      { image: "/media/2024/java.png", text: "Fell in love with Java and Object-Oriented thinking" },
      { image: "/media/2024/dsa.png", text: "Wrestled with Data Structures & Algorithms daily" },
      { image: "/media/2024/Degree (1).png", text: "Realised this was more than a degree — it was a calling" },
    ],
    chips: [
      { emoji: "☕", label: "Java" },
      { emoji: "🔧", label: "OOP" },
      { emoji: "🧠", label: "DSA" },
      { emoji: "🎯", label: "Problem Solving" },
    ],
    scene: [
      { emoji: "📚", x: "8%", y: "10%", size: "3.5rem", delay: "0s", dur: "4.2s", anim: "float" },
      { emoji: "☕", x: "66%", y: "6%", size: "4.2rem", delay: "0.5s", dur: "3.8s", anim: "float" },
      { emoji: "💻", x: "50%", y: "48%", size: "4.5rem", delay: "1s", dur: "5.0s", anim: "float" },
      { emoji: "🎓", x: "12%", y: "60%", size: "3.2rem", delay: "1.5s", dur: "4.5s", anim: "pop" },
      { emoji: "🔢", x: "78%", y: "62%", size: "2.8rem", delay: "0.8s", dur: "3.5s", anim: "float" },
      { emoji: "📝", x: "38%", y: "18%", size: "3.0rem", delay: "1.8s", dur: "4.8s", anim: "spin" },
    ],
    codeSnippet: 'class Student {\n  String lang = "Java";\n  boolean obsessed = true;\n}',
    transitionQuote: "Every problem solved unlocked a bigger one.",
  },
  {
    year: "2025",
    chapter: "II",
    theme: "Growth",
    accent: "#c084fc",
    accentB: "#f472b6",
    glow: "rgba(192,132,252,0.4)",
    quote: "Discipline turned into a superpower.",
    subQuote: "Consistent practice. Logical breakthroughs. One algorithm at a time.",
    highlights: [
      { image: "/media/2025/dsa_puzzle_icon.png", text: "Practiced DSA consistently — hundreds of problems solved" },
      { image: "/media/2025/logic_lightning_icon.png", text: "Sharpened logical thinking and debugging instincts" },
      { image: "/media/2025/trophy_icon.png", text: "Built competitive programming discipline that changed everything" },
      { image: "/media/2025/code_search_icon.png", text: "Learned to read code like a story, not a manual" },
    ],
    chips: [
      { emoji: "☕", label: "Java" },
      { emoji: "⚡", label: "C++" },
      { emoji: "🧠", label: "DSA" },
      { emoji: "🏆", label: "Competitive Prog" },
      { emoji: "🔢", label: "Algorithms" },
    ],
    scene: [
      { emoji: "🧩", x: "8%", y: "10%", size: "3.5rem", delay: "0s", dur: "4.0s", anim: "spin" },
      { emoji: "🏆", x: "68%", y: "4%", size: "4.0rem", delay: "0.6s", dur: "3.8s", anim: "pop" },
      { emoji: "💡", x: "48%", y: "45%", size: "4.5rem", delay: "1.2s", dur: "5.2s", anim: "float" },
      { emoji: "⚡", x: "15%", y: "62%", size: "3.2rem", delay: "0.9s", dur: "3.5s", anim: "float" },
      { emoji: "🔍", x: "78%", y: "60%", size: "3.0rem", delay: "1.6s", dur: "4.2s", anim: "pop" },
      { emoji: "🧠", x: "36%", y: "15%", size: "3.2rem", delay: "2.0s", dur: "4.8s", anim: "spin" },
    ],
    codeSnippet: "// solve until it clicks\nwhile (!solved) {\n  think();\n  debug();\n}",
    transitionQuote: "Ideas without execution are just dreams.",
  },
  {
    year: "2026",
    chapter: "III",
    theme: "Builder",
    accent: "#4ade80",
    accentB: "#2dd4bf",
    glow: "rgba(74,222,128,0.4)",
    quote: "From learner to maker.",
    subQuote: "Real products. Real users. Real impact on real lives.",
    highlights: [
      { image: "/media/2026/rocket_icon.png", text: "Built meaningful products from first line to deployment" },
      { image: "/media/2026/tools_icon.png", text: "Mastered production software development workflows" },
      { image: "/media/2026/mobile_icon.png", text: "Solved real-world problems with elegant, scalable solutions" },
      { image: "/media/2026/globe_icon.png", text: "Focused on creating lasting impact through every commit" },
    ],
    chips: [
      { emoji: "▲", label: "Next.js" },
      { emoji: "🟢", label: "Node.js" },
      { emoji: "🐘", label: "PostgreSQL" },
      { emoji: "📘", label: "TypeScript" },
      { emoji: "☁️", label: "Cloud" },
      { emoji: "🐳", label: "Docker" },
    ],
    scene: [
      { emoji: "🚀", x: "10%", y: "6%", size: "4.2rem", delay: "0s", dur: "4.5s", anim: "float" },
      { emoji: "💻", x: "64%", y: "8%", size: "3.8rem", delay: "0.7s", dur: "4.0s", anim: "float" },
      { emoji: "☁️", x: "78%", y: "52%", size: "3.6rem", delay: "1.1s", dur: "5.5s", anim: "float" },
      { emoji: "📱", x: "15%", y: "60%", size: "3.4rem", delay: "1.5s", dur: "3.8s", anim: "pop" },
      { emoji: "🗄️", x: "48%", y: "44%", size: "3.2rem", delay: "0.4s", dur: "4.2s", anim: "spin" },
      { emoji: "⚙️", x: "40%", y: "70%", size: "3.0rem", delay: "1.9s", dur: "3.5s", anim: "spin" },
    ],
    codeSnippet: 'git commit -m "shipped 🚀"\n// users: 0 → production\n// impact: measured in smiles',
    transitionQuote: "The best chapter is always the one being written.",
  },
  {
    year: "2027",
    chapter: "IV",
    theme: "Mission",
    accent: "#f97316",
    accentB: "#facc15",
    glow: "rgba(249,115,22,0.4)",
    quote: "The Internship season starts now !",
    subQuote: "Big Tech. Big dreams. Building every single day.",
    highlights: [
      { image: "/media/2027/target_icon.png", text: "AMBITION: Top-Tier Software Engineering Roles at Big Tech" },
      { image: "/media/2027/scale_icon.png", text: "ARCHITECT: Building scalable, distributed system solutions" },
      { image: "/media/2027/book_icon.png", text: "PREPARATION: Mastering system design and complex algorithms" },
      { image: "/media/2027/ship_icon.png", text: "EXECUTION: Deploying reliable, high-value code regularly" },
    ],
    chips: [
      { emoji: "🏢", label: "Internships" },
      { emoji: "🏗️", label: "System Design" },
      { emoji: "🌐", label: "Open Source" },
      { emoji: "👑", label: "Leadership" },
      { emoji: "🌍", label: "Impact" },
    ],
    scene: [
      { emoji: "🥭", x: "8%", y: "8%", size: "4.8rem", delay: "0s", dur: "4.0s", anim: "pop" },
      { emoji: "🎯", x: "68%", y: "6%", size: "4.2rem", delay: "0.8s", dur: "4.5s", anim: "float" },
      { emoji: "🌟", x: "48%", y: "46%", size: "4.0rem", delay: "1.3s", dur: "3.8s", anim: "pop" },
      { emoji: "🚀", x: "15%", y: "62%", size: "3.6rem", delay: "0.5s", dur: "5.0s", anim: "float" },
      { emoji: "🌍", x: "78%", y: "58%", size: "3.4rem", delay: "1.8s", dur: "4.2s", anim: "spin" },
      { emoji: "⭐", x: "36%", y: "16%", size: "3.0rem", delay: "1.0s", dur: "3.5s", anim: "pop" },
    ],
    codeSnippet: "const goal = 'BigTech';\n// status: INCOMING\nwhile (true) { grind(); }",
    transitionQuote: "",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   CHIP
═══════════════════════════════════════════════════════════════════════════ */
function Chip({ emoji, label, accent }: { emoji: string; label: string; accent: string }) {
  return (
    <span
      className="jt-chip-elegant"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "8px 16px 8px 12px",
        borderRadius: "100px",
        fontSize: "12.5px",
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 500,
        color: "#f8fafc",
        background: `linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))`,
        border: `1px solid rgba(255,255,255,0.08)`,
        boxShadow: `0 4px 12px rgba(0,0,0,0.15)`,
        transition: "all 350ms cubic-bezier(0.16, 1, 0.3, 1)",
        cursor: "default",
        whiteSpace: "nowrap",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className="jt-chip-glow"
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(135deg, ${accent}40, transparent)`,
          opacity: 0,
          transition: "opacity 350ms ease",
          zIndex: 0,
        }}
      />
      <span style={{ fontSize: "15px", lineHeight: 1, zIndex: 1, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }}>{emoji}</span>
      <span style={{ zIndex: 1 }}>{label}</span>
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CODE SNIPPET BADGE
═══════════════════════════════════════════════════════════════════════════ */
function CodeBadge({ code, accent }: { code: string; accent: string }) {
  return (
    <div style={{
      position: "absolute",
      bottom: "20px",
      left: "20px",
      right: "20px",
      background: "rgba(10, 10, 15, 0.8)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      border: `1px solid rgba(255,255,255,0.06)`,
      borderTop: `1px solid ${accent}40`,
      borderRadius: "16px",
      padding: "16px",
      fontFamily: "'Courier New', monospace",
      fontSize: "11px",
      fontWeight: 500,
      lineHeight: 1.7,
      color: "#cbd5e1",
      whiteSpace: "pre",
      letterSpacing: "0.02em",
      overflow: "hidden",
      zIndex: 2,
      boxShadow: `0 12px 32px rgba(0,0,0,0.4)`,
    }}>
      {/* Traffic lights */}
      <div style={{ display: "flex", gap: "6px", marginBottom: "12px" }}>
        {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
          <div key={i} style={{ width: "9px", height: "9px", borderRadius: "50%", background: c, opacity: 0.9 }} />
        ))}
      </div>
      <span style={{ color: "#f1f5f9" }}>{code}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SCENE (illustration area)
═══════════════════════════════════════════════════════════════════════════ */
function Scene({ items, accent, glow, year, code }: {
  items: FloatItem[];
  accent: string;
  glow: string;
  year: string;
  code: string;
}) {
  return (
    <div
      className="jt3-scene"
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "1 / 1",
        maxWidth: "420px",
        marginInline: "auto",
        borderRadius: "40px",
        // Soft, elegant dark gradient for the scene
        background: `linear-gradient(160deg, rgba(20,20,25,0.6) 0%, rgba(10,10,15,0.9) 100%)`,
        border: `1px solid rgba(255,255,255,0.06)`,
        boxShadow: `inset 0 1px 1px rgba(255,255,255,0.1), 0 16px 40px rgba(0,0,0,0.3)`,
        overflow: "hidden",
      }}
    >
      {/* Subtle top-left light leak */}
      <div aria-hidden="true" style={{
        position: "absolute", top: "-50px", left: "-50px",
        width: "250px", height: "250px", borderRadius: "50%",
        background: `radial-gradient(circle, ${glow} 0%, transparent 70%)`,
        opacity: 0.3,
        filter: "blur(40px)",
        pointerEvents: "none",
      }} />

      {/* Grid texture for depth */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
        backgroundSize: "24px 24px",
        pointerEvents: "none",
      }} />

      {/* Year watermark - subtle */}
      <div aria-hidden="true" style={{
        position: "absolute", bottom: "120px", right: "20px",
        fontSize: "90px", fontWeight: 900,
        fontFamily: "'Poppins', sans-serif",
        color: "white", opacity: 0.03,
        lineHeight: 1, letterSpacing: "-0.04em",
        pointerEvents: "none", userSelect: "none",
      }}>
        {year}
      </div>

      {/* Floating emoji items */}
      {items.map((item, i) => (
        <div key={i} aria-hidden="true" style={{
          position: "absolute",
          left: item.x, top: item.y,
          fontSize: item.size, lineHeight: 1,
          animation: `${item.anim === "float" ? "jt3Float" : item.anim === "spin" ? "jt3SpinSlow" : "jt3PopPulse"} ${item.dur} ease-in-out infinite`,
          animationDelay: item.delay,
          filter: `drop-shadow(0 8px 16px rgba(0,0,0,0.4))`, // reduced glow, more natural shadow
          willChange: "transform",
          zIndex: 1,
        }}>
          {item.emoji}
        </div>
      ))}

      {/* Code badge */}
      <CodeBadge code={code} accent={accent} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   QUOTE STRIP (between cards)
═══════════════════════════════════════════════════════════════════════════ */
function QuoteStrip({ text, fromColor, toColor }: { text: string; fromColor: string; toColor: string }) {
  return (
    <div style={{
      width: "100%", maxWidth: "1400px", marginInline: "auto",
      padding: "clamp(32px, 5vh, 60px) clamp(16px, 4vw, 60px)",
      display: "flex", alignItems: "center", gap: "32px",
    }}>
      <div style={{ flex: 1, height: "1px", background: `linear-gradient(90deg, transparent, ${fromColor}40)` }} />
      <p style={{
        flex: "0 1 600px", textAlign: "center",
        fontSize: "clamp(14px, 1.5vw, 16px)",
        fontFamily: "'Poppins', sans-serif",
        fontStyle: "italic", fontWeight: 400,
        color: "#94a3b8",
        lineHeight: 1.6, letterSpacing: "0.01em",
      }}>
        &ldquo;{text}&rdquo;
      </p>
      <div style={{ flex: 1, height: "1px", background: `linear-gradient(90deg, ${toColor}40, transparent)` }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   YEAR CARD
═══════════════════════════════════════════════════════════════════════════ */
function YearCard({ data, isActive, isEven }: { data: YearDef; isActive: boolean; isEven: boolean }) {
  /* Text column */
  const textCol = (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* Chapter label */}
      <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
        <div style={{
          width: "6px", height: "6px", borderRadius: "50%",
          background: data.accent,
          boxShadow: `0 0 10px ${data.glow}`,
        }} />
        <span style={{
          fontSize: "11px", fontWeight: 700,
          fontFamily: "'Poppins', sans-serif",
          letterSpacing: "0.2em", textTransform: "uppercase",
          color: data.accent,
        }}>
          {data.theme}
        </span>
      </div>

      {/* YEAR — massive */}
      <div style={{
        fontSize: "clamp(80px, 11vw, 130px)",
        fontWeight: 900,
        fontFamily: "'Poppins', sans-serif",
        letterSpacing: "-0.05em",
        lineHeight: 0.85,
        marginBottom: "20px",
        background: `linear-gradient(135deg, ${data.accent} 0%, ${data.accentB} 100%)`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        opacity: isActive ? 1 : 0.6,
        filter: isActive ? "none" : "saturate(0.5)",
        transition: "all 600ms ease",
      }}>
        {data.year}
      </div>

      <p style={{
        fontSize: "clamp(24px, 3vw, 36px)",
        fontWeight: 800,
        fontFamily: "'Poppins', sans-serif",
        color: isActive ? "#ffffff" : "rgba(255,255,255,0.5)",
        lineHeight: 1.2,
        marginBottom: "12px",
        transition: "color 550ms ease",
        letterSpacing: "-0.02em",
      }}>
        &ldquo;{data.quote}&rdquo;
      </p>
      <p style={{
        fontSize: "clamp(14px, 1.4vw, 15px)",
        color: isActive ? "#cbd5e1" : "rgba(255,255,255,0.3)",
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 400,
        lineHeight: 1.6, marginBottom: "32px",
        transition: "color 550ms ease",
      }}>
        {data.subQuote}
      </p>

      {/* Separator */}
      <div style={{
        width: "50px", height: "3px",
        background: `linear-gradient(90deg, ${data.accent}, ${data.accentB})`,
        borderRadius: "3px",
        marginBottom: "32px",
        opacity: isActive ? 1 : 0.3,
        transition: "opacity 550ms ease",
      }} />

      {/* Highlights */}
      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 36px 0", display: "flex", flexDirection: "column", gap: "20px", position: "relative" }}>
        {data.year === "2027" && (
          <div style={{
            position: "absolute",
            left: "20px",
            top: "20px",
            bottom: "20px",
            width: "2.5px",
            background: "linear-gradient(to bottom, #f97316, #facc15)",
            opacity: isActive ? 0.35 : 0.1,
            transition: "opacity 550ms ease",
            zIndex: 0
          }} />
        )}
        {data.highlights.map((h, i) => (
          <li key={i} style={{
            display: "flex", alignItems: "flex-start", gap: "16px",
            opacity: isActive ? 1 : 0.3,
            transition: `all ${450 + i * 80}ms ease`,
            transform: isActive ? "translateX(0)" : "translateX(-8px)",
            position: "relative",
            zIndex: 1,
          }}>
            <span
              style={{
                width: "42px",
                height: "42px",
                flexShrink: 0,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                background: (h.image || h.svgIcon) ? (data.year === "2024" ? "#ffffff" : "rgba(30, 41, 59, 0.65)") : "transparent",
                borderRadius: (h.image || h.svgIcon) ? "12px" : "50%",
                border: (h.image || h.svgIcon) ? (data.year === "2024" ? "1px solid rgba(0, 0, 0, 0.06)" : "1px solid rgba(255, 255, 255, 0.08)") : "none",
                boxShadow: (h.image || h.svgIcon) ? (data.year === "2024" ? "0 2px 8px rgba(0, 0, 0, 0.12)" : "0 4px 12px rgba(0, 0, 0, 0.3)") : "none",
                padding: (h.image || h.svgIcon) ? (data.year === "2024" ? "4px" : "0px") : "0",
                boxSizing: "border-box",
                overflow: "hidden",
                transition: "transform 300ms cubic-bezier(0.16, 1, 0.3, 1), filter 300ms ease, box-shadow 300ms ease",
              }}
              className="jt3-bullet-icon"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.08)";
                if (h.image || h.svgIcon) {
                  e.currentTarget.style.boxShadow = `0 8px 20px ${data.accent}55, 0 0 0 1px ${data.accent}30`;
                } else {
                  e.currentTarget.style.filter = `drop-shadow(0 0 8px ${data.accent}cc)`;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.filter = "none";
                e.currentTarget.style.boxShadow = (h.image || h.svgIcon) ? "0 2px 8px rgba(0,0,0,0.12)" : "none";
              }}
            >
              {h.image ? (
                <div style={{ width: "100%", height: "100%", position: "relative" }}>
                  <Image
                    src={h.image}
                    alt={h.text}
                    fill
                    priority
                    sizes="42px"
                    style={{
                      objectFit: "contain",
                    }}
                  />
                </div>
              ) : h.svgIcon ? (
                <div style={{ color: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
                  {h.svgIcon === "puzzle" && (
                    <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2v3a2 2 0 0 0 2 2h3a2 2 0 0 1 2 2v3a2 2 0 0 0-2 2h-1.5a1.5 1.5 0 0 0 0 3H19a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2v-1.5a1.5 1.5 0 0 0-3 0V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h1.5a1.5 1.5 0 0 0 0-3H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3a2 2 0 0 0 2-2V5a2 2 0 0 1 2-2z" />
                    </svg>
                  )}
                  {h.svgIcon === "bolt" && (
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  )}
                  {h.svgIcon === "trophy" && (
                    <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                      <path d="M4 22h16" />
                      <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
                      <path d="M12 2a6 6 0 0 1 6 6v4a6 6 0 0 1-6 6 6 6 0 0 1-6-6V8a6 6 0 0 1 6-6z" />
                    </svg>
                  )}
                  {h.svgIcon === "search" && (
                    <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  )}
                  {h.svgIcon === "rocket" && (
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2s3 3 3 8-1 4-3 5-3-2-3-5 3-8 3-8z" />
                      <path d="M9 15c-1.5.5-2.5 1.5-2.5 3.5v1.5h2.5" />
                      <path d="M15 15c1.5.5 2.5 1.5 2.5 3.5v1.5h-2.5" />
                      <path d="M12 17v4" />
                    </svg>
                  )}
                  {h.svgIcon === "tools" && (
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                    </svg>
                  )}
                  {h.svgIcon === "mobile" && (
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                      <line x1="12" y1="18" x2="12.01" y2="18" />
                    </svg>
                  )}
                  {h.svgIcon === "globe" && (
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      <path d="M2 12h20" />
                    </svg>
                  )}
                  {h.svgIcon === "target" && (
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="6" />
                      <circle cx="12" cy="12" r="2" />
                    </svg>
                  )}
                  {h.svgIcon === "scale" && (
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                      <polyline points="16 7 22 7 22 13" />
                    </svg>
                  )}
                  {h.svgIcon === "book" && (
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5v-15z" />
                    </svg>
                  )}
                  {h.svgIcon === "ship" && (
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                      <line x1="12" y1="22.08" x2="12" y2="12" />
                    </svg>
                  )}
                </div>
              ) : (
                <span style={{ fontSize: "18px", lineHeight: 1 }}>{h.emoji}</span>
              )}
            </span>
            <span style={{
              fontSize: "clamp(13.5px, 1.3vw, 15px)",
              color: "#e2e8f0",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              lineHeight: 1.5,
              alignSelf: "center",
            }}>
              {data.year === "2027" ? (
                <>
                  <span style={{ display: "block", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", color: data.accent, textTransform: "uppercase", marginBottom: "3px" }}>
                    {h.text.split(": ")[0]}
                  </span>
                  <span style={{ color: "#cbd5e1", fontWeight: 400, fontSize: "13.5px" }}>
                    {h.text.split(": ")[1]}
                  </span>
                </>
              ) : h.text}
            </span>
          </li>
        ))}
      </ul>
      {/* Chips */}
      {data.year !== "2024" && data.year !== "2025" && data.year !== "2026" && data.year !== "2027" && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {data.chips.map((chip, i) => (
            <Chip key={i} emoji={chip.emoji} label={chip.label} accent={data.accent} />
          ))}
        </div>
      )}
    </div>
  );

  const isYear2024 = data.year === "2024";
  const isYear2025 = data.year === "2025";
  const isYear2026 = data.year === "2026";
  const isYear2027 = data.year === "2027";

  /* Scene column */
  const sceneCol = (
    <div style={{ position: "relative" }}>
      {/* Reduced outer glow for the scene */}
      <div style={{
        position: "absolute", inset: "0px",
        borderRadius: "50%",
        background: `radial-gradient(ellipse at center, ${data.glow} 0%, transparent 60%)`,
        opacity: isActive ? 0.3 : 0.1,
        transition: "opacity 600ms ease",
        filter: "blur(30px)",
        pointerEvents: "none",
      }} />
      {isYear2024 || isYear2025 || isYear2026 || isYear2027 ? (
        <div
          className={isYear2026 || isYear2027 ? "jt3-scene jt3-scene-gentle" : "jt3-scene"}
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: isYear2024 ? "4 / 3" : isYear2025 ? "3 / 4" : isYear2026 ? "3 / 2" : "1 / 1",
            maxWidth: isYear2026 || isYear2027 ? "480px" : "420px",
            marginInline: "auto",
            borderRadius: "32px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: isYear2026
              ? `inset 0 1px 1px rgba(255,255,255,0.15), 0 16px 40px rgba(0,0,0,0.3), 0 0 20px rgba(74, 222, 128, 0.15)`
              : isYear2027
                ? `inset 0 1px 1px rgba(255,255,255,0.15), 0 16px 40px rgba(0,0,0,0.3), 0 0 20px rgba(251, 146, 60, 0.15)`
                : `inset 0 1px 1px rgba(255,255,255,0.15), 0 16px 40px rgba(0,0,0,0.3)`,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(10,10,15,0.4)",
            animation: "jt3Float 6s ease-in-out infinite",
          }}
        >
          {/* Soft colored glow behind the image inside the panel */}
          <div aria-hidden="true" style={{
            position: "absolute",
            width: "80%",
            height: "80%",
            borderRadius: "50%",
            background: isYear2024
              ? "rgba(56, 189, 248, 0.25)"
              : isYear2025
                ? "rgba(192, 132, 252, 0.25)"
                : isYear2026
                  ? "rgba(74, 222, 128, 0.20)" // green accent color glow
                  : "rgba(251, 146, 60, 0.20)", // orange glow for 2027
            filter: "blur(40px)",
            zIndex: 0,
            pointerEvents: "none",
          }} />

          {/* Image container occupying around 88% for 2027, 96% for 2026, 90% for others */}
          <div style={{
            width: isYear2027 ? "88%" : isYear2026 ? "96%" : "90%",
            height: isYear2027 ? "88%" : isYear2026 ? "96%" : "90%",
            position: "relative",
            borderRadius: "28px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            overflow: "hidden",
            zIndex: 1,
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
          }}>
            <Image
              src={
                isYear2024
                  ? "/media/2024/main picture.jpg"
                  : isYear2025
                    ? "/media/2025/main.jpeg"
                    : isYear2026
                      ? "/media/Card 3 main image.png"
                      : "/media/CARD 4.png"
              }
              alt={`Engineering Journey ${data.year}`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 380px"
              style={{
                objectFit: isYear2026 || isYear2027 ? "contain" : "cover",
              }}
            />
          </div>
        </div>
      ) : (
        <Scene
          items={data.scene}
          accent={data.accent}
          glow={data.glow}
          year={data.year}
          code={data.codeSnippet}
        />
      )}
    </div>
  );

  return (
    <div
      data-milestone-year={data.year}
      className={`jt3-card-wrapper ${isActive ? "jt3-active" : ""}`}
      style={{
        width: "100%",
        borderRadius: "32px",
        background: "rgba(255,255,255,0.015)",
        border: `1px solid rgba(255,255,255,0.05)`,
        borderTop: isActive ? `1px solid rgba(255,255,255,0.15)` : `1px solid rgba(255,255,255,0.05)`,
        boxShadow: isActive
          ? `0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)`
          : "0 8px 32px rgba(0,0,0,0.2)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        padding: "clamp(40px, 6vw, 70px)",
        boxSizing: "border-box",
        transition: "all 700ms cubic-bezier(0.16, 1, 0.3, 1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Smoothly fading gradient background layer */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(150deg, rgba(255,255,255,0.04) 0%, rgba(10,10,15,0.6) 40%, ${data.accent}0a 100%)`,
        opacity: isActive ? 1 : 0,
        transition: "opacity 800ms cubic-bezier(0.2, 0.8, 0.2, 1)",
        zIndex: 0,
        pointerEvents: "none",
      }} />

      {/* Subtle top accent bar */}
      <div style={{
        position: "absolute", top: 0, left: "10%", right: "10%", height: "2px",
        background: `linear-gradient(90deg, transparent, ${data.accent}, ${data.accentB}, transparent)`,
        opacity: isActive ? 0.8 : 0,
        transition: "opacity 650ms ease",
        borderRadius: "2px",
        zIndex: 1,
      }} />

      {/* Content Grid */}
      <div
        className={`jt3-grid${isEven ? " jt3-grid-rev" : ""}`}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(40px, 6vw, 80px)",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {textCol}
        {sceneCol}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   NAV DOTS
═══════════════════════════════════════════════════════════════════════════ */
function NavDots({ activeYear }: { activeYear: string | null }) {
  const connectors = ["#38bdf8", "#c084fc", "#4ade80", "#f97316"];
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0 }}>
      {YEARS.map((y, i) => {
        const isDone = activeYear !== null && parseInt(y.year) <= parseInt(activeYear);
        const isCurrent = activeYear === y.year;
        return (
          <React.Fragment key={y.year}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", position: "relative", zIndex: 1 }}>
              <div style={{
                width: isCurrent ? "20px" : "12px",
                height: isCurrent ? "20px" : "12px",
                borderRadius: "50%",
                background: isDone ? y.accent : "rgba(255,255,255,0.1)",
                border: isCurrent ? `3px solid ${y.accent}` : "none",
                boxShadow: isCurrent
                  ? `0 0 0 4px ${y.glow}, 0 0 20px ${y.glow}`
                  : isDone ? `0 0 10px ${y.glow}` : "none",
                transition: "all 450ms cubic-bezier(0.16, 1, 0.3, 1)",
              }} />
              <span style={{
                fontSize: "12px",
                fontWeight: isCurrent ? 700 : 500,
                fontFamily: "'Poppins', sans-serif",
                color: isCurrent ? y.accent : isDone ? y.accent + "aa" : "rgba(255,255,255,0.3)",
                letterSpacing: "0.05em",
                transition: "all 450ms ease",
              }}>
                {y.year}
              </span>
            </div>
            {i < YEARS.length - 1 && (
              <div style={{
                flex: "1 1 80px", maxWidth: "160px", height: "2px",
                background: `linear-gradient(90deg, ${connectors[i]}, ${connectors[i + 1]})`,
                opacity: activeYear !== null && parseInt(YEARS[i + 1].year) <= parseInt(activeYear) ? 0.8 : 0.15,
                transition: "opacity 550ms ease",
                marginBottom: "23px", borderRadius: "2px",
              }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN — TimelineSection
═══════════════════════════════════════════════════════════════════════════ */
interface TimelineSectionProps {
  heading?: string;
  subheading?: string;
}

export default function TimelineSection({
  heading = "The Evolution of an Engineer",
  subheading = "Four chapters. One relentless mission to build, grow and ship.",
}: TimelineSectionProps = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeYear, setActiveYear] = useState<string | null>(null);

  /* Active year observer */
  useEffect(() => {
    if (!sectionRef.current) return;
    const root = document.getElementById("main-content") || null;
    const observers: IntersectionObserver[] = [];

    YEARS.forEach((y) => {
      const el = sectionRef.current!.querySelector(`[data-milestone-year="${y.year}"]`) as HTMLElement | null;
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveYear(y.year); },
        { root, threshold: 0.35, rootMargin: "-12% 0px -12% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* Entrance animation */
  useEffect(() => {
    if (!sectionRef.current) return;
    const root = document.getElementById("main-content") || null;
    const wrappers = Array.from(sectionRef.current.querySelectorAll(".jt3-card-wrapper")) as HTMLElement[];

    wrappers.forEach((el, i) => {
      el.style.opacity = "0";
      // Smoother drift upward
      el.style.transform = "translateY(60px) scale(0.98)";
      el.style.transition = `opacity 900ms cubic-bezier(0.2, 0.8, 0.2, 1) ${i * 150}ms, transform 900ms cubic-bezier(0.2, 0.8, 0.2, 1) ${i * 150}ms`;
    });

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "translateY(0) scale(1)";
            obs.unobserve(el);
          }
        });
      },
      { root, threshold: 0.05, rootMargin: "0px 0px -4% 0px" }
    );

    wrappers.forEach((w) => obs.observe(w));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="engineering-journey"
      style={{
        width: "100%",
        boxSizing: "border-box",
        padding: "clamp(100px, 12vh, 180px) clamp(20px, 5vw, 80px)",
        position: "relative",
        background: "transparent",
      }}
    >
      {/* ── Section Header ─────────────────────────────── */}
      <div style={{
        maxWidth: "1400px", marginInline: "auto",
        marginBottom: "clamp(70px, 9vh, 120px)",
        textAlign: "center",
      }}>
        {/* Eyebrow */}

        {/* Main heading */}
        <h2 style={{
          fontSize: "clamp(36px, 5.5vw, 72px)",
          fontWeight: 900,
          fontFamily: "'Poppins', sans-serif",
          letterSpacing: "-0.03em",
          margin: "0 0 16px 0",
          lineHeight: 1.1,
          background: "linear-gradient(135deg, #ffffff 40%, #94a3b8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          {heading}
        </h2>
        <p style={{
          fontSize: "clamp(14px, 1.5vw, 18px)",
          color: "#94a3b8",
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 400, lineHeight: 1.7,
          margin: "0 auto 56px",
          maxWidth: "540px",
        }}>
          {subheading}
        </p>

        <NavDots activeYear={activeYear} />
      </div>

      {/* ── Cards + Quote Strips ────────────────────────── */}
      <div style={{
        maxWidth: "1400px", marginInline: "auto",
        display: "flex", flexDirection: "column", gap: "0",
      }}>
        {YEARS.map((y, i) => {
          const nextYear = YEARS[i + 1];
          return (
            <React.Fragment key={y.year}>
              <YearCard
                data={y}
                isActive={activeYear === y.year}
                isEven={i % 2 === 1}
              />
              {y.transitionQuote && nextYear && (
                <QuoteStrip
                  text={y.transitionQuote}
                  fromColor={y.accent}
                  toColor={nextYear.accent}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* ── Embedded CSS ────────────────────────────────── */}
      <style dangerouslySetInnerHTML={{
        __html: `
        /* Smoother Animations */
        @keyframes jt3Float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-12px) rotate(2deg); }
        }
        @keyframes jt3FloatGentle {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-4px); }
        }
        @keyframes jt3GlowPulse {
          0%, 100% { box-shadow: inset 0 1px 1px rgba(255,255,255,0.15), 0 16px 40px rgba(0,0,0,0.3), 0 0 15px var(--pulse-glow-color, rgba(251, 146, 60, 0.15)); }
          50%       { box-shadow: inset 0 1px 1px rgba(255,255,255,0.15), 0 16px 40px rgba(0,0,0,0.3), 0 0 25px var(--pulse-glow-color, rgba(251, 146, 60, 0.25)); }
        }
        @keyframes jt3SpinSlow {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes jt3PopPulse {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.1); }
        }
        @keyframes jt3RoadmapFlow {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -100; }
        }

        /* Hover interactions */
        .jt-chip-elegant:hover .jt-chip-glow {
          opacity: 1 !important;
        }
        .jt-chip-elegant:hover {
          transform: translateY(-2px) scale(1.02) !important;
          border-color: rgba(255,255,255,0.2) !important;
          box-shadow: 0 8px 24px rgba(0,0,0,0.3) !important;
        }

        /* Card active state */
        .jt3-card-wrapper.jt3-active {
          transform: translateY(0) scale(1.01) !important;
        }

        /* Scene hover */
        .jt3-scene {
          transition: transform 600ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 600ms ease;
        }
        .jt3-scene:hover {
          transform: scale(1.03);
          box-shadow: inset 0 1px 1px rgba(255,255,255,0.15), 0 24px 50px rgba(0,0,0,0.4);
        }
        .jt3-scene-gentle {
          transition: transform 600ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 600ms ease !important;
        }
        .jt3-scene-gentle:hover {
          transform: scale(1.02) !important;
          box-shadow: inset 0 1px 1px rgba(255,255,255,0.15), 0 24px 50px rgba(0,0,0,0.4), 0 0 30px var(--hover-glow-color, rgba(74, 222, 128, 0.35)) !important;
        }

        /* Radar rings styling */
        .jt3-radar-ring {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          border: 1.5px solid rgba(251, 146, 60, 0.12);
          border-radius: 50%;
          opacity: 0;
          transform: scale(0.2);
          animation: jt3RadarPulse 4.5s cubic-bezier(0.1, 0.8, 0.3, 1) infinite;
        }
        @keyframes jt3RadarPulse {
          0% { transform: scale(0.2); opacity: 0; }
          15% { opacity: 0.65; }
          100% { transform: scale(1.2); opacity: 0; }
        }

        /* Responsive */
        @media (max-width: 960px) {
          .jt3-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .jt3-grid-rev > *:first-child { order: 1 !important; }
          .jt3-grid-rev > *:last-child  { order: 2 !important; }
        }

        .jt3-grid-rev > *:first-child { order: 2; }
        .jt3-grid-rev > *:last-child  { order: 1; }
      ` }} />
    </section>
  );
}

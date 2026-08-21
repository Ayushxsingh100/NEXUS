"use client";

import React, { useEffect, useRef, useState } from "react";

interface TechModule {
  id: string;
  name: string;
  category: "backend" | "cloud" | "design" | "frontend" | "database";
  accent: string;
  status: "ACTIVE" | "CONNECTED" | "ROUTING";
}

const TECHS: TechModule[] = [
  { id: "java", name: "Java Core & Spring", category: "backend", accent: "#fb923c", status: "ACTIVE" },
  { id: "nextjs", name: "Next.js & React", category: "frontend", accent: "#22d3ee", status: "CONNECTED" },
  { id: "aws", name: "AWS Services", category: "cloud", accent: "#fb923c", status: "ACTIVE" },
  { id: "postgres", name: "PostgreSQL", category: "database", accent: "#4ade80", status: "ACTIVE" },
  { id: "docker", name: "Docker & K8s", category: "cloud", accent: "#3b82f6", status: "ROUTING" },
  { id: "sysdesign", name: "System Design", category: "design", accent: "#c084fc", status: "ACTIVE" },
];

export default function DashboardSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        width: "100%",
        maxWidth: "1400px",
        marginInline: "auto",
        padding: "100px 40px",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      {/* Category header */}
      <div
        style={{
          marginBottom: "56px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
          <div style={{ width: "24px", height: "1px", background: "#22d3ee" }} />
          <span
            style={{
              fontSize: "9px",
              fontWeight: 600,
              letterSpacing: "0.18em",
              color: "#22d3ee",
              textTransform: "uppercase",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Section 04 — Core Skills
          </span>
        </div>
        <h2
          style={{
            fontSize: "clamp(24px, 2.8vw, 36px)",
            fontWeight: 800,
            color: "#ffffff",
            margin: 0,
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: "-0.02em",
          }}
        >
          Engineering Dashboard
        </h2>
        <p
          style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.48)",
            marginTop: "8px",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Interactive technology stack mapping backend logic, databases, and deployment.
        </p>
      </div>

      {/* Grid wrapper containing cards and animated connecting vectors */}
      <div
        style={{
          position: "relative",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px",
          zIndex: 1,
        }}
        className="ch7-dashboard-grid"
      >
        {/* Connection flow lines SVG (desktop only) */}
        <svg
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 0,
          }}
          className="ch7-flow-vectors"
        >
          {/* Path 1: Next.js -> Java */}
          <path
            d="M 280 80 Q 420 50 560 80"
            fill="none"
            stroke="rgba(34, 211, 238, 0.08)"
            strokeWidth="1.5"
          />
          <path
            d="M 280 80 Q 420 50 560 80"
            fill="none"
            stroke="rgba(34, 211, 238, 0.35)"
            strokeWidth="1.5"
            strokeDasharray="6 12"
            style={{
              animation: "ch7DashFlow 4s linear infinite",
              opacity: hoveredNode === "nextjs" || hoveredNode === "java" ? 1 : 0.25,
              transition: "opacity 300ms ease",
            }}
          />

          {/* Path 2: Java -> Postgres */}
          <path
            d="M 680 180 V 240"
            fill="none"
            stroke="rgba(74, 222, 128, 0.08)"
            strokeWidth="1.5"
          />
          <path
            d="M 680 180 V 240"
            fill="none"
            stroke="rgba(74, 222, 128, 0.35)"
            strokeWidth="1.5"
            strokeDasharray="6 12"
            style={{
              animation: "ch7DashFlow 3s linear infinite reverse",
              opacity: hoveredNode === "java" || hoveredNode === "postgres" ? 1 : 0.25,
              transition: "opacity 300ms ease",
            }}
          />

          {/* Path 3: Java -> AWS */}
          <path
            d="M 720 120 Q 860 80 1000 120"
            fill="none"
            stroke="rgba(251, 146, 60, 0.08)"
            strokeWidth="1.5"
          />
          <path
            d="M 720 120 Q 860 80 1000 120"
            fill="none"
            stroke="rgba(251, 146, 60, 0.35)"
            strokeWidth="1.5"
            strokeDasharray="6 12"
            style={{
              animation: "ch7DashFlow 5s linear infinite",
              opacity: hoveredNode === "java" || hoveredNode === "aws" ? 1 : 0.25,
              transition: "opacity 300ms ease",
            }}
          />

          {/* Path 4: AWS -> Docker */}
          <path
            d="M 1120 180 V 240"
            fill="none"
            stroke="rgba(59, 130, 246, 0.08)"
            strokeWidth="1.5"
          />
          <path
            d="M 1120 180 V 240"
            fill="none"
            stroke="rgba(59, 130, 246, 0.35)"
            strokeWidth="1.5"
            strokeDasharray="6 12"
            style={{
              animation: "ch7DashFlow 4s linear infinite",
              opacity: hoveredNode === "aws" || hoveredNode === "docker" ? 1 : 0.25,
              transition: "opacity 300ms ease",
            }}
          />
        </svg>

        {TECHS.map((tech, idx) => {
          const isHov = hoveredNode === tech.id;
          return (
            <div
              key={tech.id}
              onMouseEnter={() => setHoveredNode(tech.id)}
              onMouseLeave={() => setHoveredNode(null)}
              style={{
                position: "relative",
                padding: "24px",
                borderRadius: "14px",
                background: isHov
                  ? `linear-gradient(135deg, #0e162d 0%, #060b18 100%) padding-box, linear-gradient(to bottom, ${tech.accent}45 0%, rgba(255,255,255,0.03) 100%) border-box`
                  : "linear-gradient(135deg, #0a1020 0%, #040815 100%) padding-box, linear-gradient(to bottom, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%) border-box",
                border: "1px solid transparent",
                boxShadow: isHov
                  ? `0 10px 24px rgba(0,0,0,0.40), 0 0 16px ${tech.accent}14`
                  : "0 4px 14px rgba(0,0,0,0.20)",
                transform: isHov ? "translateY(-3px)" : "translateY(0)",
                transition: "all 300ms cubic-bezier(0.16, 1, 0.3, 1)",
                cursor: "default",
                opacity: visible ? 1 : 0,
                transformStyle: "preserve-3d",
                ...(visible
                  ? { transition: `opacity 0.5s ease ${0.1 + idx * 0.08}s, transform 0.5s ease ${0.1 + idx * 0.08}s, background 300ms ease, box-shadow 300ms ease` }
                  : {}),
              }}
            >
              {/* Internal coordinate grid texture (Blueprint feel) */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `
                    linear-gradient(rgba(255, 255, 255, 0.015) 0.5px, transparent 0.5px),
                    linear-gradient(90deg, rgba(255, 255, 255, 0.015) 0.5px, transparent 0.5px)
                  `,
                  backgroundSize: "10px 10px",
                  borderRadius: "14px",
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              />

              <div style={{ position: "relative", zIndex: 1 }}>
                {/* Header status bar */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                  <span
                    style={{
                      fontSize: "8px",
                      fontWeight: 700,
                      color: "rgba(255,255,255,0.30)",
                      fontFamily: "monospace",
                      letterSpacing: "0.1em",
                    }}
                  >
                    MODULE // 0{idx + 1}
                  </span>

                  {/* Active Indicator dot */}
                  <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <div
                      style={{
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        background: tech.accent,
                        boxShadow: `0 0 6px ${tech.accent}`,
                        animation: "ch7StatusBlink 1.8s ease infinite",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "7.5px",
                        fontWeight: 700,
                        color: "rgba(255,255,255,0.50)",
                        fontFamily: "monospace",
                      }}
                    >
                      {tech.status}
                    </span>
                  </div>
                </div>

                {/* Tech Title */}
                <h3
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#ffffff",
                    fontFamily: "'Poppins', sans-serif",
                    margin: "0 0 8px 0",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {tech.name}
                </h3>

                {/* Short categorisation */}
                <span
                  style={{
                    fontSize: "8.5px",
                    fontWeight: 650,
                    letterSpacing: "0.10em",
                    color: tech.accent,
                    fontFamily: "'Poppins', sans-serif",
                    textTransform: "uppercase",
                  }}
                >
                  {tech.category}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes ch7StatusBlink {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes ch7DashFlow {
          to {
            stroke-dashoffset: -120;
          }
        }
        @media (max-width: 900px) {
          .ch7-dashboard-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .ch7-flow-vectors {
            display: none !important;
          }
        }
        @media (max-width: 600px) {
          .ch7-dashboard-grid {
            grid-template-columns: 1fr !important;
          }
        }
      ` }} />
    </section>
  );
}

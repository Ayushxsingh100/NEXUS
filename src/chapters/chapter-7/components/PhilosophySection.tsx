"use client";

import React, { useEffect, useState, useRef } from "react";

interface Pillar {
  number: string;
  title: string;
  desc: string;
  accent: string;
}

const PILLARS: Pillar[] = [
  {
    number: "01",
    title: "Code Quality & Refined Architectures",
    desc: "Simplicity is the ultimate sophistication. I believe backends should be silent, performant, and highly readable, while user interfaces should maintain absolute structural clarity.",
    accent: "#22d3ee",
  },
  {
    number: "02",
    title: "Product-Led Engineering",
    desc: "Code is a vehicle for product value. I build tools with close empathy for end-user latency, delight, and utility, crafting systems that solve real human challenges.",
    accent: "#3b82f6",
  },
  {
    number: "03",
    title: "Open Development & Growth",
    desc: "Learning is a collaborative public loop. I publish insights, share code repositories, contribute to open-source systems, and constantly grill my own technical limits.",
    accent: "#c084fc",
  },
];

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        width: "100%",
        maxWidth: "1200px",
        marginInline: "auto",
        padding: "160px 40px",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      {/* Editorial Header */}
      <div
        style={{
          marginBottom: "80px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        <span
          style={{
            fontSize: "12px",
            fontWeight: 700,
            color: "#22d3ee",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontFamily: "'Poppins', sans-serif",
            marginBottom: "16px",
            display: "block",
          }}
        >
          Mindset
        </span>
        <h2
          style={{
            fontSize: "clamp(24px, 3.2vw, 44px)",
            fontWeight: 800,
            color: "#ffffff",
            fontFamily: "'Poppins', sans-serif",
            margin: 0,
            letterSpacing: "-0.03em",
          }}
        >
          Engineering Philosophy
        </h2>
      </div>

      {/* Pillars Flex Blocks */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "36px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {PILLARS.map((p, idx) => {
          const isHovered = hoveredIdx === idx;
          return (
            <div
              key={p.number}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                padding: "40px 36px",
                borderRadius: "20px",
                background: isHovered ? "rgba(255, 255, 255, 0.03)" : "rgba(255, 255, 255, 0.01)",
                border: `1.5px solid ${isHovered ? p.accent : "rgba(255,255,255,0.05)"}30`,
                boxShadow: isHovered ? `0 16px 40px rgba(0,0,0,0.5), 0 0 20px ${p.accent}05` : "none",
                transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                transition: "all 400ms cubic-bezier(0.16, 1, 0.3, 1)",
                opacity: visible ? 1 : 0,
                transformStyle: "preserve-3d",
                ...(visible
                  ? { transition: `opacity 0.8s ease ${idx * 0.12}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${idx * 0.12}s, background 300ms ease, border-color 300ms ease, box-shadow 300ms ease` }
                  : {}),
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "28px",
                }}
                className="philosophy-pillar-layout"
              >
                {/* Index Number */}
                <span
                  style={{
                    fontSize: "36px",
                    fontWeight: 900,
                    color: isHovered ? p.accent : "rgba(255,255,255,0.06)",
                    fontFamily: "'Poppins', sans-serif",
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                    transition: "color 300ms ease",
                  }}
                >
                  {p.number}
                </span>

                {/* Text Block */}
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: 750,
                      color: "#ffffff",
                      fontFamily: "'Poppins', sans-serif",
                      margin: "0 0 12px 0",
                      letterSpacing: "-0.015em",
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "14.5px",
                      color: "rgba(255,255,255,0.55)",
                      lineHeight: 1.6,
                      fontFamily: "'Poppins', sans-serif",
                      margin: 0,
                      maxWidth: "800px",
                    }}
                  >
                    {p.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 600px) {
          .philosophy-pillar-layout {
            flex-direction: column !important;
            gap: 16px !important;
          }
        }
      ` }} />
    </section>
  );
}

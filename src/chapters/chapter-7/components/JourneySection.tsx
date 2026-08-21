"use client";

import React, { useEffect, useRef, useState } from "react";

interface MilestoneData {
  year: string;
  badge: string;
  badgeColor: string;
  title: string;
  details: string[];
  techTags: string[];
}

const MILESTONES: MilestoneData[] = [
  {
    year: "2024",
    badge: "UPES Dehradun",
    badgeColor: "#22d3ee",
    title: "Computer Science Foundation",
    details: [
      "Initiated B.Tech Computer Science (AI/ML) track.",
      "Mastered OOP principles and Java systems development.",
      "Immersed in Data Structures and Algorithm analysis."
    ],
    techTags: ["Java", "DSA", "SQL", "OOP Architecture"]
  },
  {
    year: "2025",
    badge: "SplitSync & Engineered.dev",
    badgeColor: "#3b82f6",
    title: "Full-Stack & Production Systems",
    details: [
      "Completed hands-on Software Engineering internship.",
      "Engineered SplitSync debt settlement graph calculator.",
      "Launched Engineered.dev developer hub to document systems."
    ],
    techTags: ["React", "Next.js", "Node.js", "Express", "REST APIs"]
  },
  {
    year: "2026",
    badge: "VeyloPrep Platform",
    badgeColor: "#c084fc",
    title: "Orchestration & Scale Operations",
    details: [
      "Currently building VeyloPrep career and placement readiness manager.",
      "Learning AWS infrastructure and containerized Kubernetes clusters.",
      "Exploring distributed caches, routing logic, and system scale."
    ],
    techTags: ["Docker", "Kubernetes", "AWS Cloud", "NoSQL", "Redis"]
  }
];

export default function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeYear, setActiveYear] = useState("2026");

  // Animate the line drawing based on viewport scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const totalHeight = rect.height;
      const scrolled = windowHeight / 2 - rect.top;
      const progress = Math.max(0, Math.min(100, (scrolled / totalHeight) * 100));
      setScrollProgress(progress);
    };

    const container = document.getElementById("chapter-seven-root");
    if (container) {
      container.addEventListener("scroll", handleScroll);
      handleScroll();
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  // Monitor active scrolled year card
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const cards = el.querySelectorAll(".journey-item-wrapper");
    const observers: IntersectionObserver[] = [];

    cards.forEach((card) => {
      const yr = card.getAttribute("data-year");
      if (!yr) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveYear(yr);
        },
        {
          threshold: 0.5,
          root: document.getElementById("chapter-seven-root"),
          rootMargin: "-15% 0px -15% 0px"
        }
      );
      observer.observe(card);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        width: "100%",
        maxWidth: "1000px",
        marginInline: "auto",
        padding: "160px 40px",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      {/* Editorial Header */}
      <div style={{ marginBottom: "88px" }}>
        <span
          style={{
            fontSize: "12px",
            fontWeight: 700,
            color: "#c084fc",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontFamily: "'Poppins', sans-serif",
            marginBottom: "16px",
            display: "block",
          }}
        >
          Trajectory
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
          Engineering Journey
        </h2>
      </div>

      {/* Progress Timeline Road */}
      <div
        ref={timelineRef}
        style={{
          position: "relative",
          width: "100%",
          paddingLeft: "56px",
        }}
      >
        {/* Draw Line base track */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "18px",
            top: "8px",
            bottom: "8px",
            width: "2px",
            background: "rgba(255, 255, 255, 0.05)",
            zIndex: 0,
          }}
        />

        {/* Scroll Glowing Line */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "18px",
            top: "8px",
            height: `${scrollProgress}%`,
            width: "2px",
            background: "linear-gradient(to bottom, #22d3ee 0%, #3b82f6 50%, #c084fc 100%)",
            boxShadow: "0 0 10px rgba(34, 211, 238, 0.35)",
            zIndex: 0,
            transition: "height 150ms ease-out",
          }}
        />

        {/* Milestones Loop */}
        {MILESTONES.map((m) => {
          const isActive = activeYear === m.year;
          return (
            <div
              key={m.year}
              data-year={m.year}
              className="journey-item-wrapper"
              style={{
                position: "relative",
                marginBottom: "80px",
                opacity: isActive ? 1 : 0.25,
                transform: isActive ? "translateY(0)" : "translateY(8px)",
                transition: "opacity 500ms ease, transform 500ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {/* Timeline active node point */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "-47px",
                  top: "6px",
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  background: isActive ? m.badgeColor : "#020814",
                  border: `2px solid ${m.badgeColor}`,
                  boxShadow: isActive ? `0 0 14px ${m.badgeColor}` : "none",
                  zIndex: 2,
                  transition: "all 300ms ease",
                }}
              />

              {/* Editorial Card layout (Spacious and borderless check style) */}
              <div style={{ paddingLeft: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px", flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontSize: "32px",
                      fontWeight: 900,
                      color: m.badgeColor,
                      fontFamily: "'Poppins', sans-serif",
                      letterSpacing: "-0.04em",
                      lineHeight: 1,
                    }}
                  >
                    {m.year}
                  </span>

                  {/* Custom branded chip */}
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      color: m.badgeColor,
                      background: `${m.badgeColor}12`,
                      border: `1px solid ${m.badgeColor}30`,
                      borderRadius: "20px",
                      padding: "4px 14px",
                      letterSpacing: "0.03em",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    {m.badge}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#ffffff",
                    fontFamily: "'Poppins', sans-serif",
                    margin: "0 0 16px 0",
                    letterSpacing: "-0.015em",
                  }}
                >
                  {m.title}
                </h3>

                {/* Sub-details loops */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
                  {m.details.map((det, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                      <span style={{ color: m.badgeColor, fontSize: "11px", marginTop: "3px" }}>—</span>
                      <p
                        style={{
                          fontSize: "14px",
                          color: "rgba(255,255,255,0.60)",
                          lineHeight: 1.5,
                          margin: 0,
                          fontFamily: "'Poppins', sans-serif",
                        }}
                      >
                        {det}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Tech chips wrapper */}
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {m.techTags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: "11px",
                        color: "rgba(255,255,255,0.40)",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.05)",
                        padding: "4px 12px",
                        borderRadius: "20px",
                        fontFamily: "'Poppins', sans-serif",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}

        {/* ── Future Milestone 2027? ── */}
        <div
          style={{
            position: "relative",
            opacity: 0.25,
            paddingLeft: "12px",
          }}
        >
          {/* Node point */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "-47px",
              top: "6px",
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              background: "#ef4444",
              border: "2px solid rgba(239,68,68,0.2)",
              zIndex: 2,
            }}
          />

          <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
            <span
              style={{
                fontSize: "32px",
                fontWeight: 900,
                color: "#ef4444",
                fontFamily: "'Poppins', sans-serif",
                letterSpacing: "-0.04em",
                lineHeight: 1,
              }}
            >
              2027?
            </span>

            <span
              style={{
                fontSize: "13px",
                color: "#ffffff",
                fontFamily: "monospace",
              }}
            >
              Loading next milestone
              <span
                style={{
                  display: "inline-block",
                  width: "6px",
                  height: "12px",
                  background: "#ef4444",
                  marginLeft: "4px",
                  verticalAlign: "middle",
                  animation: "ch7BlinkCursor 1s steps(2, start) infinite",
                }}
              />
            </span>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes ch7BlinkCursor {
          to { visibility: hidden; }
        }
      ` }} />
    </section>
  );
}
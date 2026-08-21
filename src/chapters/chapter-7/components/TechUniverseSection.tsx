"use client";

import React, { useEffect, useState, useRef } from "react";

interface SkillItem {
  name: string;
  color: string;
}

interface SkillCategory {
  title: string;
  items: SkillItem[];
}

const CATEGORIES: SkillCategory[] = [
  {
    title: "Backend & Systems",
    items: [
      { name: "Java Core", color: "#fb923c" },
      { name: "Spring Boot", color: "#4ade80" },
      { name: "Node.js", color: "#22d3ee" },
      { name: "REST APIs", color: "#3b82f6" },
      { name: "Data Structures", color: "#c084fc" },
      { name: "Algorithms", color: "#ef4444" },
    ],
  },
  {
    title: "Frontend & Clients",
    items: [
      { name: "React", color: "#22d3ee" },
      { name: "Next.js", color: "#ffffff" },
      { name: "TypeScript", color: "#3b82f6" },
      { name: "Tailwind CSS", color: "#38bdf8" },
      { name: "High-Fidelity UI", color: "#f472b6" },
    ],
  },
  {
    title: "Cloud & Databases",
    items: [
      { name: "PostgreSQL", color: "#4ade80" },
      { name: "Docker", color: "#3b82f6" },
      { name: "AWS Cloud", color: "#fb923c" },
      { name: "Git & GitHub", color: "#ffffff" },
      { name: "Distributed Storage", color: "#c084fc" },
    ],
  },
];

export default function TechUniverseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<string | null>(null);

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
      {/* Background radial soft blue highlight */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "30%",
          right: "10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34, 211, 238, 0.03) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Spacious, editorial header */}
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
          Tech Stack
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
          Technology Universe
        </h2>
        <p
          style={{
            fontSize: "15px",
            color: "rgba(255,255,255,0.45)",
            fontFamily: "'Poppins', sans-serif",
            marginTop: "12px",
            maxWidth: "600px",
            lineHeight: 1.5,
          }}
        >
          Visual mapping of languages, engines, frameworks, and deployment structures I build with daily.
        </p>
      </div>

      {/* Clean Category Groupings */}
      <div
        className="tech-universe-grid"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "56px",
          zIndex: 1,
          position: "relative",
        }}
      >
        {CATEGORIES.map((cat, groupIdx) => (
          <div
            key={cat.title}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: `opacity 0.8s ease ${groupIdx * 0.15}s, transform 0.8s ease ${groupIdx * 0.15}s`,
            }}
          >
            {/* Category title */}
            <h3
              style={{
                fontSize: "14px",
                fontWeight: 700,
                color: "rgba(255,255,255,0.30)",
                fontFamily: "'Poppins', sans-serif",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                marginBottom: "24px",
              }}
            >
              {cat.title}
            </h3>

            {/* Chips Cloud */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
              }}
            >
              {cat.items.map((skill) => {
                const uniqueKey = `${cat.title}-${skill.name}`;
                const isHovered = hoveredIdx === uniqueKey;

                return (
                  <div
                    key={skill.name}
                    onMouseEnter={() => setHoveredIdx(uniqueKey)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    style={{
                      background: isHovered ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.02)",
                      border: isHovered 
                        ? `1.5px solid ${skill.color}50` 
                        : "1.5px solid rgba(255, 255, 255, 0.06)",
                      borderRadius: "30px",
                      padding: "10px 24px",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: isHovered ? "#ffffff" : "rgba(255,255,255,0.70)",
                      fontFamily: "'Poppins', sans-serif",
                      cursor: "default",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      transform: isHovered ? "scale(1.05) translateY(-2px)" : "scale(1) translateY(0)",
                      boxShadow: isHovered 
                        ? `0 12px 24px rgba(0,0,0,0.3), 0 0 16px ${skill.color}15` 
                        : "none",
                      transition: "all 300ms cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    {/* Tiny glowing dot badge */}
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: skill.color,
                        boxShadow: `0 0 8px ${skill.color}`,
                      }}
                    />
                    {skill.name}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

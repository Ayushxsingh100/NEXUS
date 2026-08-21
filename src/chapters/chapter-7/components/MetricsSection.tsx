"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface CounterStat {
  id: string;
  label: string;
  target: number;
  suffix: string;
  accent: string;
  image: string;
  desc: string;
}

const STATS: CounterStat[] = [
  { 
    id: "projects", 
    label: "Projects Built", 
    target: 3, 
    suffix: "+", 
    accent: "#22d3ee",
    image: "/media/metrics/projects_v3.png",
    desc: "Full-scale web applications designed and shipped."
  },
  { 
    id: "internships", 
    label: "Internships", 
    target: 1, 
    suffix: "", 
    accent: "#3b82f6",
    image: "/media/metrics/internships_v3.png",
    desc: "Hands-on commercial engineering experience."
  },
  { 
    id: "tech", 
    label: "Technologies Used", 
    target: 15, 
    suffix: "+", 
    accent: "#c084fc",
    image: "/media/metrics/tech_v3.png",
    desc: "Full-stack languages, libraries, and DevOps tools."
  },
  { 
    id: "blogs", 
    label: "Blog Articles", 
    target: 8, 
    suffix: "", 
    accent: "#f472b6",
    image: "/media/metrics/blogs_v3.png",
    desc: "Technical articles on architecture and learnings."
  },
  { 
    id: "github", 
    label: "GitHub Contributions", 
    target: 450, 
    suffix: "+", 
    accent: "#4ade80",
    image: "/media/metrics/github_v3.png",
    desc: "Commits, reviews, and open-source contributions."
  },
  { 
    id: "dsa", 
    label: "DSA Problems Solved", 
    target: 600, 
    suffix: "+", 
    accent: "#fb923c",
    image: "/media/metrics/dsa_v3.png",
    desc: "Algorithmic challenges solved across platforms."
  },
];

function MetricCard({ s, count, visible, i }: { s: CounterStat; count: number; visible: boolean; i: number }) {
  const [hovered, setHovered] = useState(false);
  const [localMouse, setLocalMouse] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setLocalMouse({ x, y });
  };

  // Handcrafted compositions for each card (positioning, rotation, and scale overrides)
  const composition = [
    { transform: "rotate(-3deg) translateY(12px) scale(1.08)" },
    { transform: "rotate(2deg) translateY(8px) scale(1.04)" },
    { transform: "rotate(-1deg) translateY(14px) scale(1.06)" },
    { transform: "rotate(3deg) translateY(6px) scale(1.05)" },
    { transform: "rotate(-2deg) translateY(10px) scale(1.09)" },
    { transform: "rotate(1deg) translateY(12px) scale(1.07)" },
  ][i];

  return (
    <div
      className="ch7-metric-card-border"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setLocalMouse({ x: 50, y: 50 });
      }}
      onMouseMove={handleMouseMove}
      style={{
        background: `linear-gradient(135deg, ${s.accent}${hovered ? "44" : "15"}, transparent 80%)`,
        borderRadius: "24px",
        padding: "1px",
        boxShadow: hovered 
          ? `0 30px 60px rgba(0,0,0,0.6), 0 0 35px ${s.accent}20, inset 0 1px 2px rgba(255,255,255,0.08)`
          : `0 8px 32px rgba(0,0,0,0.3), 0 0 20px ${s.accent}02, inset 0 1px 1px rgba(255,255,255,0.03)`,
        opacity: visible ? 1 : 0,
        transform: visible 
          ? hovered ? "translateY(-6px)" : "translateY(0)"
          : "translateY(24px)",
        transition: `
          opacity 0.6s ease ${0.1 + i * 0.08}s,
          transform 450ms cubic-bezier(0.16, 1, 0.3, 1),
          box-shadow 450ms cubic-bezier(0.16, 1, 0.3, 1),
          background 450ms ease
        `,
      }}
    >
      <div
        className="ch7-metric-card-inner"
        style={{
          background: "rgba(10, 15, 30, 0.45)",
          backdropFilter: "blur(20px)",
          borderRadius: "23px",
          position: "relative",
          overflow: "hidden",
          textAlign: "left",
          height: "100%",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Spotlighting Follow-Cursor effect (soft lighting shift) */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: hovered 
              ? `radial-gradient(circle 120px at ${localMouse.x}% ${localMouse.y}%, ${s.accent}18, transparent)`
              : `radial-gradient(circle 120px at 50% 50%, ${s.accent}05, transparent)`,
            transition: hovered ? "none" : "background 400ms ease",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* Ambient background pulsing glow (breathing glow behind the illustration) */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "240px",
            height: "240px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${s.accent}${hovered ? "18" : "0c"} 0%, transparent 70%)`,
            filter: "blur(20px)",
            animation: `ch7BreathingGlow 4s ease-in-out infinite`,
            pointerEvents: "none",
            zIndex: 1,
            transition: "background 400ms ease",
          }}
        />

        {/* Faint noise texture overlay */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.015'/%3E%3C/svg%3E")`,
            opacity: 0.7,
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* Subtle engineering grid blueprint background */}
        <div 
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "linear-gradient(rgba(255,255,255,0.005) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.005) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* Floating Ambient Particles (3 per card) */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 1 }}>
          <div style={{ position: "absolute", top: "25%", left: "15%", width: "3px", height: "3px", borderRadius: "50%", background: s.accent, opacity: 0.25, animation: "ch7ParticleDriftSlow 12s ease-in-out infinite" }} />
          <div style={{ position: "absolute", bottom: "35%", right: "25%", width: "2px", height: "2px", borderRadius: "50%", background: s.accent, opacity: 0.18, animation: "ch7ParticleDriftSlow 15s ease-in-out infinite", animationDelay: "-2s" }} />
          <div style={{ position: "absolute", top: "65%", left: "70%", width: "3px", height: "3px", borderRadius: "50%", background: s.accent, opacity: 0.2, animation: "ch7ParticleDriftSlow 10s ease-in-out infinite", animationDelay: "-5s" }} />
        </div>

        {/* TOP ILLUSTRATION AREA (Enlarged 3D Illustration) */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "250px", // Increased height to 250px
            overflow: "hidden",
            borderRadius: "22px 22px 0 0",
            zIndex: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px 8px 0", // Reduced side padding to let illustration expand
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              animation: `ch7IconIdleFloat 6s ease-in-out infinite`,
              animationDelay: `${i * -0.7}s`,
              /* Overlap custom composition configurations and hover effects */
              transform: hovered 
                ? `${composition.transform} translateY(-8px) scale(1.06)` 
                : `${composition.transform}`,
              transition: "transform 800ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <img
              src={s.image}
              alt={s.label}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>
        </div>

        {/* BOTTOM CARD BODY AREA */}
        <div
          style={{
            padding: "12px 32px 36px", // Increased padding and adjusted spacing to breathe
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <div>
            {/* Number counter (Hero Element) */}
            <div
              style={{
                fontSize: "clamp(48px, 5vw, 62px)", // Enlarged hero number
                fontWeight: 900,
                color: "#ffffff",
                fontFamily: "'Poppins', sans-serif",
                lineHeight: 1,
                letterSpacing: "-0.04em",
                marginBottom: "16px",
                display: "inline-flex",
                alignItems: "baseline",
                transform: hovered ? "scale(1.05)" : "scale(1)",
                transition: "transform 350ms cubic-bezier(0.16, 1, 0.3, 1)",
                textShadow: hovered ? `0 0 15px ${s.accent}40` : "none",
              }}
            >
              <span style={{ color: s.accent }}>{count}</span>
              <span style={{ fontSize: "22px", fontWeight: 800, color: s.accent, marginLeft: "1.5px" }}>{s.suffix}</span>
            </div>

            {/* Title */}
            <h2
              style={{
                fontSize: "clamp(22px, 2.5vw, 28px)",
                fontWeight: 800,
                color: "#ffffff",
                fontFamily: "'Poppins', sans-serif",
                letterSpacing: "-0.01em",
                marginBottom: "10px",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              {s.label}
            </h2>

            {/* Description */}
            <p
              style={{
                fontSize: "14px",
                color: "rgba(255, 255, 255, 0.7)",
                lineHeight: 1.6,
                margin: 0,
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {s.desc}
            </p>
          </div>

          {/* Bottom detail stack (line and engineering detail text) */}
          <div>
            {/* Animated colored accent line growing from left to right */}
            <div
              style={{
                position: "relative",
                width: visible ? "120px" : "0px",
                height: "4px",
                background: `linear-gradient(90deg, ${s.accent}, transparent)`,
                borderRadius: "2px",
                marginTop: "24px",
                transition: "width 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.5s",
                overflow: "hidden",
              }}
            />

          </div>
        </div>
      </div>
    </div>
  );
}

export default function MetricsSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Trigger count-up animation when visible
  useEffect(() => {
    if (!visible) return;

    const duration = 1600; // 1.6s animation
    const steps = 60;
    const stepTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;

      const nextCounts: Record<string, number> = {};
      STATS.forEach((s) => {
        // Easing out function (Quartic)
        const easedProgress = 1 - Math.pow(1 - progress, 4);
        nextCounts[s.id] = Math.floor(easedProgress * s.target);
      });

      setCounts(nextCounts);

      if (step >= steps) {
        clearInterval(timer);
        const finalCounts: Record<string, number> = {};
        STATS.forEach((s) => {
          finalCounts[s.id] = s.target;
        });
        setCounts(finalCounts);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [visible]);

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
          marginBottom: "64px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(32px, 4.5vw, 48px)",
            fontWeight: 900,
            color: "#ffffff",
            margin: 0,
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: "-0.03em",
          }}
        >
          Performance Terminal
        </h2>
        <p
          style={{
            fontSize: "16px",
            color: "rgba(255,255,255,0.7)",
            marginTop: "12px",
            fontFamily: "'Poppins', sans-serif",
            lineHeight: 1.6,
          }}
        >
          Real-time metrics tracking built systems, code checkins, and algorithmic milestones.
        </p>
      </div>

      {/* Stats counter cards in a 3-column, 2-row layout */}
      <div
        className="ch7-counters-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px",
        }}
      >
        {STATS.map((s, i) => {
          const currentCount = counts[s.id] || 0;
          return (
            <MetricCard
              key={s.id}
              s={s}
              count={currentCount}
              visible={visible}
              i={i}
            />
          );
        })}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        /* Drift background particles very slowly */
        @keyframes ch7ParticleDriftSlow {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.15; }
          50%       { transform: translateY(-10px) translateX(8px); opacity: 0.35; }
        }

        /* 3D Icon gentle float when idle (with slight tilt) */
        @keyframes ch7IconIdleFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-6px) rotate(0.5deg); }
        }

        /* Breathing opacity pulse for card colored backdrops */
        @keyframes ch7BreathingGlow {
          0%, 100% { opacity: 0.7; }
          50%       { opacity: 1.0; }
        }

        /* Hover sweep sheen reflection */
        .ch7-metric-card-inner::after {
          content: '';
          position: absolute;
          top: 0;
          left: -150%;
          width: 80%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
          transform: skewX(-25deg);
          pointer-events: none;
          z-index: 3;
        }
        .ch7-metric-card-border:hover .ch7-metric-card-inner::after {
          left: 150%;
          transition: left 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Responsive Breakpoints */
        @media (max-width: 960px) {
          .ch7-counters-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
          }
        }
        @media (max-width: 600px) {
          .ch7-counters-grid {
            grid-template-columns: 1fr !important;
          }
        }
      ` }} />
    </section>
  );
}

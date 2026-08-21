"use client";

import React, { useEffect, useState, useRef } from "react";

interface FocusItem {
  id: string;
  title: string;
  desc: string;
  status: string;
  color: string;
}

const ITEMS: FocusItem[] = [
  {
    id: "veylo",
    title: "VeyloPrep Platform Orchestration",
    desc: "Refining the placement automation pipelines and mock assessment engines to deliver low-latency student placement services.",
    status: "BUILDING",
    color: "#c084fc",
  },
  {
    id: "cloud",
    title: "Containerization & Cloud Services",
    desc: "Studying AWS resources, Docker orchestration patterns, and Kubernetes clusters for resilient backend deployment pipelines.",
    status: "LEARNING",
    color: "#22d3ee",
  },
  {
    id: "distributed",
    title: "Distributed Backend Architectures",
    desc: "Mastering caching techniques, messaging broker configurations (RabbitMQ/Kafka), and load balancers to scale Java frameworks.",
    status: "MASTERING",
    color: "#3b82f6",
  },
];

export default function MissionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
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
      <div
        className="mission-split-layout"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          gap: "80px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Left Column: Focus Statement */}
        <div
          style={{
            flex: "1 1 45%",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              fontWeight: 700,
              color: "#3b82f6",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontFamily: "'Poppins', sans-serif",
              marginBottom: "16px",
              display: "block",
            }}
          >
            Current Mission
          </span>
          <h2
            style={{
              fontSize: "clamp(24px, 3.2vw, 44px)",
              fontWeight: 800,
              color: "#ffffff",
              fontFamily: "'Poppins', sans-serif",
              lineHeight: 1.2,
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            What I am engineering today.
          </h2>
          <p
            style={{
              fontSize: "15px",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.6,
              marginTop: "20px",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            My current efforts focus on scaling web architectures, implementing clean modular backends, and refining platform readiness tools to bridge the gap between education and industry placements.
          </p>
        </div>

        {/* Right Column: Active Targets */}
        <div
          style={{
            flex: "1 1 55%",
            display: "flex",
            flexDirection: "column",
            gap: "40px",
          }}
        >
          {ITEMS.map((item, idx) => (
            <div
              key={item.id}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.8s ease ${0.2 + idx * 0.12}s, transform 0.8s ease ${0.2 + idx * 0.12}s`,
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                paddingBottom: "24px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: 750,
                    color: "#ffffff",
                    fontFamily: "'Poppins', sans-serif",
                    margin: 0,
                    letterSpacing: "-0.015em",
                  }}
                >
                  {item.title}
                </h3>

                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: item.color,
                      boxShadow: `0 0 8px ${item.color}`,
                    }}
                  />
                  <span
                    style={{
                      fontSize: "9px",
                      fontWeight: 700,
                      color: "rgba(255,255,255,0.4)",
                      fontFamily: "monospace",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {item.status}
                  </span>
                </div>
              </div>

              <p
                style={{
                  fontSize: "13.5px",
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.55,
                  margin: 0,
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 900px) {
          .mission-split-layout {
            flex-direction: column !important;
            gap: 48px !important;
          }
        }
      ` }} />
    </section>
  );
}

"use client";

import React, { useEffect, useRef, useState } from "react";

const BLOCKS = [
  "I am a software engineer dedicated to crafting clean, high-performance applications.",
  "From complex backend services in Java to fluid interface systems in Next.js.",
  "I design products with robust architectures and absolute attention to detail.",
  "Always exploring, shipping code in public, and building with purpose.",
];

export default function WhoIAmSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState<boolean[]>(new Array(BLOCKS.length).fill(false));

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const items = el.querySelectorAll(".whoiam-text-block");
    const observers: IntersectionObserver[] = [];

    items.forEach((item, idx) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setRevealed((prev) => {
              const updated = [...prev];
              updated[idx] = true;
              return updated;
            });
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
      );
      observer.observe(item);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        boxSizing: "border-box",
        padding: "160px 40px",
        position: "relative",
      }}
    >
      {/* Soft ambient violet backdrop highlight */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "40%",
          left: "8%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(192, 132, 252, 0.03) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: "1000px",
          marginInline: "auto",
          zIndex: 1,
        }}
      >
        {/* Spacious, bold identity statement segments */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "56px",
          }}
        >
          {BLOCKS.map((text, idx) => {
            const isVis = revealed[idx];
            return (
              <p
                key={idx}
                className="whoiam-text-block"
                style={{
                  fontSize: "clamp(22px, 3.5vw, 44px)",
                  fontWeight: 700,
                  color: isVis ? "#ffffff" : "rgba(255,255,255,0.06)",
                  lineHeight: 1.35,
                  letterSpacing: "-0.025em",
                  fontFamily: "'Poppins', sans-serif",
                  margin: 0,
                  transition: "all 900ms cubic-bezier(0.16, 1, 0.3, 1)",
                  transform: isVis ? "translateY(0)" : "translateY(16px)",
                  filter: isVis ? "blur(0px)" : "blur(4px)",
                }}
              >
                {text}
              </p>
            );
          })}
        </div>
      </div>
    </section>
  );
}

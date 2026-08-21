"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

interface HeroSectionProps {
  onReturn: () => void;
}

const TECH_LABELS = [
  { name: "Java", color: "#3b82f6", top: "12%", left: "10%" },
  { name: "Next.js", color: "#ffffff", top: "18%", right: "8%" },
  { name: "TypeScript", color: "#22d3ee", bottom: "25%", left: "6%" },
  { name: "AWS", color: "#fb923c", bottom: "22%", right: "12%" },
  { name: "Cloud", color: "#3b82f6", top: "48%", left: "-2%" },
  { name: "PostgreSQL", color: "#4ade80", bottom: "45%", right: "-4%" },
];

export default function HeroSection({ onReturn }: HeroSectionProps) {
  const [mounted, setMounted] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return; // Disable parallax on mobile
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / 28;
      const y = (e.clientY - innerHeight / 2) / 28;
      setMouseOffset({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        boxSizing: "border-box",
        padding: "80px 24px",
        overflow: "hidden",
      }}
    >
      {/* Background blueprint grid */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          backgroundPosition: "center",
          maskImage: "radial-gradient(circle 600px at center, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(circle 600px at center, black 40%, transparent 100%)",
          pointerEvents: "none",
          transform: `translate(${mouseOffset.x * -0.3}px, ${mouseOffset.y * -0.3}px)`,
          transition: "transform 250ms ease-out",
          zIndex: 0,
        }}
      />

      {/* Floating particles */}
      <div
        aria-hidden="true"
        className="ch7-hero-particles"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: `${Math.random() * 3 + 2}px`,
              height: `${Math.random() * 3 + 2}px`,
              borderRadius: "50%",
              background: i % 2 === 0 ? "#22d3ee" : "#3b82f6",
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
              opacity: Math.random() * 0.4 + 0.1,
              animation: `ch7FloatParticle ${Math.random() * 8 + 6}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Ambient center glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "480px",
          height: "480px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34, 211, 238, 0.16) 0%, rgba(59, 130, 246, 0.05) 55%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Main portrait wrapper with parallax */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "460px",
          aspectRatio: "1/1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `translate(${mouseOffset.x}px, ${mouseOffset.y}px)`,
          transition: "transform 250ms ease-out",
          zIndex: 1,
          opacity: mounted ? 1 : 0,
          scale: mounted ? "1" : "0.95",
          transitionProperty: "opacity, scale, transform",
          transitionDuration: "1s, 1s, 250ms",
        }}
      >
        {/* Rotating orbit rings */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            width: "116%",
            height: "116%",
            borderRadius: "50%",
            border: "1px dashed rgba(34, 211, 238, 0.18)",
            animation: "ch7Spin 40s linear infinite",
            transform: `translate(${mouseOffset.x * 0.2}px, ${mouseOffset.y * 0.2}px)`,
            transition: "transform 250ms ease-out",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            width: "108%",
            height: "108%",
            borderRadius: "50%",
            border: "1px dashed rgba(59, 130, 246, 0.12)",
            animation: "ch7SpinCounter 30s linear infinite",
            transform: `translate(${mouseOffset.x * -0.15}px, ${mouseOffset.y * -0.15}px)`,
            transition: "transform 250ms ease-out",
          }}
        />

        {/* Blueprint construction ticks & circles */}
        <svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          style={{
            position: "absolute",
            inset: "-10%",
            width: "120%",
            height: "120%",
            opacity: 0.22,
            pointerEvents: "none",
          }}
        >
          {/* Corner brackets */}
          <path d="M 5 5 H 12 M 5 5 V 12" stroke="#22d3ee" strokeWidth="0.5" />
          <path d="M 95 5 H 88 M 95 5 V 12" stroke="#22d3ee" strokeWidth="0.5" />
          <path d="M 5 95 H 12 M 5 95 V 88" stroke="#22d3ee" strokeWidth="0.5" />
          <path d="M 95 95 H 88 M 95 95 V 88" stroke="#22d3ee" strokeWidth="0.5" />
          {/* Crosshairs */}
          <line x1="50" y1="2" x2="50" y2="8" stroke="#22d3ee" strokeWidth="0.4" />
          <line x1="50" y1="92" x2="50" y2="98" stroke="#22d3ee" strokeWidth="0.4" />
          <line x1="2" y1="50" x2="8" y2="50" stroke="#22d3ee" strokeWidth="0.4" />
          <line x1="92" y1="50" x2="98" y2="50" stroke="#22d3ee" strokeWidth="0.4" />
          {/* Degree ticks */}
          <circle cx="50" cy="50" r="42" stroke="rgba(34, 211, 238, 0.12)" strokeWidth="0.3" strokeDasharray="1 3" />
        </svg>

        {/* Floating tech labels with parallax offsets */}
        {TECH_LABELS.map((label, index) => (
          <div
            key={label.name}
            style={{
              position: "absolute",
              top: label.top,
              bottom: label.bottom,
              left: label.left,
              right: label.right,
              fontSize: "9px",
              fontFamily: "monospace",
              color: label.color,
              background: "rgba(2, 8, 20, 0.90)",
              border: `1px solid ${label.color}25`,
              borderRadius: "4px",
              padding: "3px 8px",
              letterSpacing: "0.08em",
              zIndex: 3,
              boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
              transform: `translate(${mouseOffset.x * (0.3 + index * 0.1)}px, ${mouseOffset.y * (0.3 + index * 0.1)}px)`,
              transition: "transform 250ms ease-out",
            }}
          >
            {label.name}
          </div>
        ))}

        {/* Circular portrait container */}
        <div
          style={{
            position: "relative",
            width: "82%",
            height: "82%",
            borderRadius: "50%",
            overflow: "hidden",
            border: "2px solid rgba(34, 211, 238, 0.35)",
            background: "#030814",
            boxShadow: "0 0 0 10px rgba(34, 211, 238, 0.05), 0 0 50px rgba(34, 211, 238, 0.20), 0 20px 48px rgba(0,0,0,0.65)",
            zIndex: 2,
          }}
        >
          {/* Scanner Grid Lines behind image */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `
                linear-gradient(rgba(34, 211, 238, 0.05) 0.5px, transparent 0.5px),
                linear-gradient(90deg, rgba(34, 211, 238, 0.05) 0.5px, transparent 0.5px)
              `,
              backgroundSize: "16px 16px",
              backgroundPosition: "center",
              zIndex: 0,
            }}
          />

          {/* Sweeping scan light */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              height: "3px",
              background: "linear-gradient(90deg, transparent, #22d3ee, transparent)",
              boxShadow: "0 0 12px #22d3ee",
              animation: "ch7ScanLine 4s linear infinite",
              zIndex: 0,
            }}
          />

          <Image
            src="/media/ayush_image.png"
            alt="Ayush Singh"
            fill
            sizes="(max-width: 768px) 300px, 450px"
            style={{
              objectFit: "contain",
              objectPosition: "center",
              zIndex: 1,
            }}
            priority
          />
        </div>
      </div>

      {/* Name and role overlay */}
      <div
        style={{
          marginTop: "32px",
          textAlign: "center",
          zIndex: 2,
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(16px)",
          transition: "all 1s ease 0.4s",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            fontWeight: 800,
            color: "#ffffff",
            fontFamily: "'Poppins', sans-serif",
            margin: "0 0 6px 0",
            letterSpacing: "-0.01em",
          }}
        >
          Ayush Singh
        </h2>
        <p
          style={{
            fontSize: "12px",
            fontWeight: 600,
            color: "#22d3ee",
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          Software Engineer
        </p>

        {/* Scroll to know about me Button */}
        <button
          onClick={() => {
            const container = document.getElementById("chapter-seven-root");
            if (container) {
              container.scrollTo({
                top: window.innerHeight,
                behavior: "smooth",
              });
            }
          }}
          style={{
            marginTop: "28px",
            background: "transparent",
            border: "none",
            color: "rgba(34, 211, 238, 0.70)",
            fontSize: "9.5px",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            cursor: "pointer",
            fontFamily: "'Poppins', sans-serif",
            transition: "all 250ms ease",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.color = "#22d3ee";
            el.style.transform = "translateY(2px)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.color = "rgba(34, 211, 238, 0.70)";
            el.style.transform = "translateY(0)";
          }}
        >
          SCROLL TO know about me
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ animation: "ch7ScrollBounce 1.5s infinite" }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>

      {/* Embedded CSS Animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes ch7Spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes ch7SpinCounter {
            0% { transform: rotate(360deg); }
            100% { transform: rotate(0deg); }
          }
          @keyframes ch7ScanLine {
            0% { top: -5%; opacity: 0; }
            10% { opacity: 0.8; }
            90% { opacity: 0.8; }
            100% { top: 105%; opacity: 0; }
          }
          @keyframes ch7FloatParticle {
            0%, 100% { transform: translateY(0) scale(1); opacity: 0.2; }
            50% { transform: translateY(-30px) scale(1.15); opacity: 0.5; }
          }
          @keyframes ch7ScrollBounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(3px); }
          }
        `
      }} />
    </section>
  );
}

"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

interface HeroSectionProps {
  onReturn: () => void;
}

const STATIC_PARTICLES = [
  { width: "3.5px", height: "3.5px", top: "12%", left: "45%", opacity: 0.35, animation: "ch7FloatParticle 11s infinite ease-in-out", animationDelay: "1.2s", background: "#22d3ee" },
  { width: "2.2px", height: "2.2px", top: "25%", left: "75%", opacity: 0.15, animation: "ch7FloatParticle 7.5s infinite ease-in-out", animationDelay: "0.5s", background: "#3b82f6" },
  { width: "4.1px", height: "4.1px", top: "68%", left: "15%", opacity: 0.42, animation: "ch7FloatParticle 13s infinite ease-in-out", animationDelay: "3.1s", background: "#22d3ee" },
  { width: "2.8px", height: "2.8px", top: "50%", left: "82%", opacity: 0.28, animation: "ch7FloatParticle 9.2s infinite ease-in-out", animationDelay: "2.0s", background: "#3b82f6" },
  { width: "3.0px", height: "3.0px", top: "85%", left: "38%", opacity: 0.30, animation: "ch7FloatParticle 10.4s infinite ease-in-out", animationDelay: "4.3s", background: "#22d3ee" },
  { width: "2.5px", height: "2.5px", top: "33%", left: "22%", opacity: 0.21, animation: "ch7FloatParticle 8.1s infinite ease-in-out", animationDelay: "1.8s", background: "#3b82f6" },
  { width: "3.9px", height: "3.9px", top: "18%", left: "62%", opacity: 0.38, animation: "ch7FloatParticle 12.2s infinite ease-in-out", animationDelay: "0.2s", background: "#22d3ee" },
  { width: "2.1px", height: "2.1px", top: "72%", left: "55%", opacity: 0.12, animation: "ch7FloatParticle 6.8s infinite ease-in-out", animationDelay: "2.7s", background: "#3b82f6" },
  { width: "4.5px", height: "4.5px", top: "42%", left: "88%", opacity: 0.48, animation: "ch7FloatParticle 14.5s infinite ease-in-out", animationDelay: "3.9s", background: "#22d3ee" },
  { width: "2.7px", height: "2.7px", top: "60%", left: "67%", opacity: 0.25, animation: "ch7FloatParticle 8.7s infinite ease-in-out", animationDelay: "1.1s", background: "#3b82f6" },
  { width: "3.2px", height: "3.2px", top: "80%", left: "78%", opacity: 0.33, animation: "ch7FloatParticle 11.8s infinite ease-in-out", animationDelay: "4.9s", background: "#22d3ee" },
  { width: "2.4px", height: "2.4px", top: "30%", left: "92%", opacity: 0.18, animation: "ch7FloatParticle 7.1s infinite ease-in-out", animationDelay: "2.4s", background: "#3b82f6" }
];

export default function HeroSection({ onReturn }: HeroSectionProps) {
  const [mounted, setMounted] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 50);

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return; // Disable parallax on mobile
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / 28;
      const y = (e.clientY - innerHeight / 2) / 28;
      setMouseOffset({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", handleMouseMove);
    };
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
        {STATIC_PARTICLES.map((p, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              borderRadius: "50%",
              ...p,
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
            src="/media/Ayush_image.png"
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
            marginTop: "36px",
            background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "999px",
            color: "rgba(34, 211, 238, 0.85)",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            padding: "10px 24px",
            cursor: "pointer",
            fontFamily: "'Poppins', sans-serif",
            transition: "all 300ms cubic-bezier(0.16, 1, 0.3, 1)",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.borderColor = "rgba(34, 211, 238, 0.40)";
            el.style.background = "rgba(34, 211, 238, 0.06)";
            el.style.color = "#ffffff";
            el.style.boxShadow = "0 8px 30px rgba(34, 211, 238, 0.25)";
            el.style.transform = "translateY(2px) scale(1.03)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.borderColor = "rgba(255, 255, 255, 0.08)";
            el.style.background = "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))";
            el.style.color = "rgba(34, 211, 238, 0.85)";
            el.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
            el.style.transform = "translateY(0) scale(1)";
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

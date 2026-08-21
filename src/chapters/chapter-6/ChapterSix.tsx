"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import BlackScreen from "../chapter-1/components/BlackScreen";

interface ChapterSixProps {
  onReturn: () => void;
}

// Design tokens — 8px base scale
const SPACE = {
  xs:  "8px",
  sm:  "16px",
  md:  "24px",
  lg:  "32px",
  xl:  "48px",
  xxl: "64px",
  xxxl:"80px",
};

export default function ChapterSix({ onReturn }: ChapterSixProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef  = useRef<HTMLDivElement>(null);
  const logoRef     = useRef<HTMLDivElement>(null);

  /* ── Entrance choreography ── */
  useGSAP(() => {
    const ease = "power3.out";
    const tl = gsap.timeline({ defaults: { ease } });

    tl.to("#black-screen", { opacity: 0, duration: 1.5 })
      .fromTo(contentRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.0 },
        "-=0.5"
      )
      .fromTo(logoRef.current,
        { opacity: 0, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 2.2, ease: "power2.out" },
        "-=0.8"
      )
      .fromTo(".hero-headline",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 1.3 },
        "-=1.2"
      )
      .fromTo(".hero-support",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 1.1 },
        "-=0.8"
      )
      .fromTo(".hero-cta",
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 1.0 },
        "-=0.8"
      );
  }, { scope: containerRef, dependencies: [] });

  const handleReturnToHub = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 1.2,
      ease: "power2.inOut",
      onComplete: onReturn,
    });
  };

  /* ────────────────────────── render ────────────────────────────────────── */
  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden select-none flex flex-col items-center"
      style={{ fontFamily: "'Poppins', sans-serif", background: "#05060f", color: "#ffffff" }}
    >
      <style>{`
        /* Scroll */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.06); border-radius: 4px; }

        /* Float */
        @keyframes logoFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }
        .logo-float { animation: logoFloat 9s ease-in-out infinite; }

        /* CTA hover & shimmer styling */
        @keyframes shimmerSweep {
          0% { transform: translateX(-150%) skewX(-25deg); }
          100% { transform: translateX(150%) skewX(-25deg); }
        }
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .btn-cta {
          font-family: 'Poppins', sans-serif;
          position: relative;
          background: rgba(12, 12, 22, 0.7) !important;
          backdrop-filter: blur(12px);
          border: none !important;
          border-radius: 12px !important;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 1;
        }
        /* Custom gradient border using CSS masks */
        .btn-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 12px;
          padding: 1.5px;
          background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 35%, #2563eb 70%, #06b6d4 100%);
          background-size: 200% 200%;
          animation: gradientMove 6s ease infinite;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          z-index: -1;
          transition: all 0.4s ease;
        }
        .shimmer-sweep {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
          animation: shimmerSweep 4.5s infinite ease-in-out;
          pointer-events: none;
        }
        .btn-cta:hover {
          background: linear-gradient(135deg, rgba(124, 58, 237, 0.22) 0%, rgba(79, 70, 229, 0.22) 50%, rgba(37, 99, 235, 0.22) 100%) !important;
          transform: scale(1.05) translateY(-3px);
          box-shadow: 
            0 12px 28px rgba(124, 58, 237, 0.15),
            0 6px 16px rgba(0, 0, 0, 0.4);
        }
        .btn-cta:hover::before {
          opacity: 1;
        }
        .btn-cta:active {
          transform: scale(0.97) translateY(0px);
        }
        .cta-glow {
          background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 35%, #2563eb 70%, #06b6d4 100%) !important;
          background-size: 200% 200% !important;
          animation: gradientMove 6s ease infinite;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
          border-radius: 12px !important;
        }
        .group:hover .cta-glow {
          opacity: 0.45 !important;
          filter: blur(16px) !important;
          transform: scale(1.06);
        }
        .cta-arrow-svg {
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .btn-cta:hover .cta-arrow-svg {
          transform: translateX(5px);
        }

        /* Ensure Poppins everywhere */
        * { font-family: 'Poppins', sans-serif; }
        button, span, p, h1, h2, h3, div, nav {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>

      {/* ── Fixed ambient background ────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden>
        <div className="absolute inset-0" style={{ background: "#05060f" }} />
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 65% 55% at 50% 38%, rgba(88,44,196,0.055) 0%, transparent 70%)"
        }} />
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 52%, rgba(5,6,15,0.6) 100%)"
        }} />
      </div>

      {/* ── Top nav ──────────────────────────────────────────────────────── */}
      <nav
        className="w-full sticky top-0 z-20 flex items-center justify-end"
        style={{ padding: `${SPACE.sm} ${SPACE.xl}` }}
      >
        <button
          onClick={handleReturnToHub}
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "9px",
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.22)",
            background: "none",
            border: "none",
            cursor: "pointer",
            transition: "color 0.25s ease",
            padding: "0",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.22)")}
        >
          Return to Portfolio ↗
        </button>
      </nav>

      {/* ── Hero content ──────────────────────────────────────────────────── */}
      <div
        ref={contentRef}
        className="flex-1 w-full flex flex-col items-center justify-center text-center z-10 opacity-0"
        style={{ padding: `0 ${SPACE.lg} ${SPACE.lg}` }}
      >

        {/* 1 ── Logo */}
        <div
          ref={logoRef}
          className="logo-float relative flex-shrink-0 flex items-center justify-center"
          style={{
            width:     "clamp(420px, 62vw, 840px)",
            height:    "clamp(260px, 38vh, 440px)",
            marginBottom: SPACE.md,
            marginTop:    "0px",
          }}
        >
          {/* Ambient glow behind logo */}
          <div
            className="absolute pointer-events-none"
            style={{
              inset: "-30%",
              background: "radial-gradient(ellipse at center, rgba(110,62,230,0.13) 0%, transparent 60%)",
              filter: "blur(32px)",
              zIndex: 0,
            }}
          />

          {/* Logo image — blends directly with page background.
               WebkitMaskImage fades the edges to 0% opacity, completely removing any background rectangle border. */}
          <img
            src="/media/engineered_dev_logo.png"
            alt="Engineered.dev logo"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
            style={{
              mixBlendMode: "screen",
              filter: "contrast(1.15) brightness(1.05)",
              display: "block",
              zIndex: 1,
              maskImage: "radial-gradient(ellipse 85% 75% at 50% 50%, black 50%, transparent 95%)",
              WebkitMaskImage: "radial-gradient(ellipse 85% 75% at 50% 50%, black 50%, transparent 95%)",
            }}
            draggable={false}
          />
        </div>

        {/* Text column — wider max-width for long-line title and readable copy */}
        <div
          className="flex flex-col items-center w-full"
          style={{ maxWidth: "800px" }}
        >

          {/* 2 ── Headline (One line on desktop, responsive wrapping on mobile, larger size) */}
          <h1
            className="hero-headline"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(24px, 4vw, 56px)",
              fontWeight: 900,
              lineHeight: 1.15,
              letterSpacing: "-0.025em",
              color: "#ffffff",
              margin: 0,
              marginBottom: SPACE.md,
            }}
          >
            <span className="inline-block lg:whitespace-nowrap">
              Do portfolio websites really need{" "}
              <span style={{
                background: "linear-gradient(90deg, #f3e8ff 0%, #c084fc 40%, #6366f1 75%, #38bdf8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                blogs?
              </span>
            </span>
          </h1>

          {/* 3 ── Supporting Text (Premium quote block, bright & bold highlights) */}
          <div
            className="hero-support"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(16px, 2.2vw, 24px)",
              lineHeight: 1.6,
              margin: 0,
              marginBottom: SPACE.md,
              maxWidth: "800px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ position: "relative", padding: "0 40px" }}>
              {/* Left Quote */}
              <span style={{
                position: "absolute",
                left: "8px",
                top: "-12px",
                fontSize: "clamp(36px, 4.5vw, 56px)",
                fontWeight: 900,
                color: "rgba(167, 139, 250, 0.7)",
                fontFamily: "Georgia, serif",
                lineHeight: 1,
                userSelect: "none",
              }}>
                &ldquo;
              </span>
              
              <span style={{
                color: "#ffffff", // maximum bright white
                fontWeight: 500, // bolder base text weight
                letterSpacing: "-0.01em",
              }}>
                This publication shares{" "}
                <span style={{
                  background: "linear-gradient(135deg, #c4b5fd 0%, #a78bfa 50%, #818cf8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontWeight: 800, // extra bold highlight
                }}>
                  engineering decisions
                </span>
                ,{" "}
                <span style={{ color: "#ffffff", fontWeight: 700 }}>
                  architecture
                </span>
                ,{" "}
                <span style={{ color: "#ffffff", fontWeight: 700 }}>
                  failures
                </span>
                , and{" "}
                <span style={{
                  background: "linear-gradient(135deg, #818cf8 0%, #60a5fa 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontWeight: 800, // extra bold highlight
                }}>
                  production lessons
                </span>{" "}
                behind everything I build.
              </span>

              {/* Right Quote */}
              <span style={{
                position: "absolute",
                right: "12px",
                bottom: "-32px",
                fontSize: "clamp(36px, 4.5vw, 56px)",
                fontWeight: 900,
                color: "rgba(167, 139, 250, 0.7)",
                fontFamily: "Georgia, serif",
                lineHeight: 1,
                userSelect: "none",
              }}>
                &rdquo;
              </span>
            </div>
          </div>

          {/* 4 ── CTA Button (Vibrant premium callout with animated ambient glow) */}
          <div className="hero-cta relative group" style={{ display: "inline-block" }}>
            <div 
              style={{
                position: "absolute",
                inset: "-4px",
                background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 35%, #2563eb 70%, #06b6d4 100%)",
                borderRadius: "12px",
                filter: "blur(12px)",
                opacity: 0.35,
                transition: "opacity 0.3s ease",
              }}
              className="cta-glow"
            />
             <button
              className="btn-cta font-bold"
              style={{
                fontFamily: "'Poppins', sans-serif",
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "16px 40px",
                borderRadius: "12px",
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "0.06em",
                cursor: "pointer",
              }}
            >
              {/* Premium swipe shimmer reflection */}
              <div className="shimmer-sweep" />
              
              <span style={{ position: "relative", zIndex: 1 }}>
                Explore Engineered.dev
              </span>
              
              {/* Custom Sharp SVG arrow */}
              <svg 
                className="cta-arrow-svg"
                width="15" 
                height="15" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                style={{ color: "#ffffff", position: "relative", zIndex: 1 }}
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>

        </div>
      </div>

      <BlackScreen />
    </div>
  );
}

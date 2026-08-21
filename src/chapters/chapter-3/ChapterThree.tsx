"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ThoughtHubCards } from "./components/ThoughtHubCards";
import ChapterTransition from "./components/ChapterTransition";
import BlackScreen from "../chapter-1/components/BlackScreen";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function ChapterThree() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const prefersReduced = useReducedMotion();

  // Entrance and exit animations using GSAP
  useGSAP(
    () => {
      if (!containerRef.current) return;

      const masterTl = gsap.timeline({
        defaults: { ease: "power2.out" },
      });

      if (prefersReduced) {
        // Reduced motion entry: simple opacity swap
        masterTl
          .to("#black-screen", { opacity: 0, duration: 0.2 })
          .to(".hub-animate-all", { opacity: 1, duration: 0.3 });
        return;
      }

      // ── Entry Timeline ──
      masterTl
        // 1. Fade out black screen overlay
        .to("#black-screen", { opacity: 0, duration: 1.2, ease: "power2.inOut" })
        // 2. Stagger text elements up
        .fromTo(
          ".hub-heading, .hub-subtitle",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 1.0, stagger: 0.18 },
          "-=0.6"
        )
        // 3. Stagger cards up
        .fromTo(
          ".thought-card",
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power2.out" },
          "-=0.5"
        );
    },
    { scope: containerRef, dependencies: [prefersReduced] }
  );

  // Exit timeline when activeNode is set
  useGSAP(
    () => {
      if (!activeNode) return;

      if (prefersReduced) {
        gsap.to(".hub-animate-all", { opacity: 0, duration: 0.2 });
        return;
      }

      // Cinematic fade out of all elements when user navigates
      gsap.to(".hub-animate-all", {
        opacity: 0,
        y: -16,
        duration: 1.0,
        stagger: 0.08,
        ease: "power2.inOut",
      });
    },
    { scope: containerRef, dependencies: [activeNode, prefersReduced] }
  );

  const handleCardClick = (label: string) => {
    setActiveNode(label);
  };

  const handleReturnToHub = () => {
    setActiveNode(null);
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100svh",
        overflow: "hidden",
        background: "#030712",
        color: "#ffffff",
        fontFamily: "'Poppins', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* ── Visual Styles & Atmosphere ── */}
      <style dangerouslySetInnerHTML={{
        __html: `
        /* Central subtle navy/blue atmosphere */
        .hub-atmo {
          position: absolute;
          width: 100vw;
          height: 100vh;
          top: 0;
          left: 0;
          background: 
            radial-gradient(
  circle at 50% 42%,
  rgba(8, 35, 58, 0.85) 0%,
  rgba(7, 24, 42, 0.55) 32%,
  rgba(3, 10, 22, 0.25) 58%,
  transparent 78%
);

filter: blur(110px);
          pointer-events: none;
          z-index: 0;
        }

        /* Tiny background decorative dots */
        .hub-deco-dot-1 {
          position: absolute;
          top: 25%;
          left: 15%;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(34, 211, 238, 0.35);
          pointer-events: none;
        }
        .hub-deco-dot-2 {
          position: absolute;
          bottom: 30%;
          right: 18%;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(192, 132, 252, 0.35);
          pointer-events: none;
        }
        .hub-deco-dot-3 {
          position: absolute;
          bottom: 20%;
          left: 22%;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(59, 130, 246, 0.3);
          pointer-events: none;
        }

        /* Mobile styles override */
        @media (max-width: 767px) {
          .hub-wrapper {
            padding-top: 75px !important;
            padding-bottom: 90px !important;
            justify-content: flex-start !important;
          }
          .hub-heading {
            text-align: center !important;
            margin-bottom: 12px !important;
          }
          .hub-subtitle {
            margin-inline: auto !important;
            margin-bottom: 24px !important;
          }
        }
      `}} />

      {/* Decorative Atmosphere */}
      <div className="hub-atmo" />

      <div
        className="hub-wrapper flex flex-col justify-center items-center w-full z-10"
        style={{
          width: "calc(100% - 96px)",
          maxWidth: "1440px",
          height: "100%",
          marginInline: "auto",
          paddingTop: "60px",
          paddingBottom: "40px",
        }}
      >
        {/* Header statements */}
        <div
          className="hub-animate-all flex flex-col items-center text-center"
          style={{ marginBottom: "36px" }}
        >
          {/* Main Heading */}
          <h1
            className="hub-heading"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(44px, 4.5vw, 64px)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.045em",
              margin: 0,
              padding: 0,
              color: "#ffffff",
              marginBottom: "14px",
              opacity: 0,
            }}
          >
            Ideas into{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #22d3ee 0%, #3b82f6 50%, #c084fc 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Impact.
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="hub-subtitle"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "18px",
              fontWeight: 500,
              lineHeight: 1.3,
              color: "rgba(255, 255, 255, 0.70)",
              maxWidth: "900px",
              margin: 0,
              opacity: 0,
            }}
          >
            Turning complex problems into
            <br />
            scalable digital solutions.
          </p>
        </div>

        {/* Five Navigation Cards Container */}
        <div className="hub-animate-all w-full flex justify-center opacity-100">
          <ThoughtHubCards
            onCardClick={handleCardClick}
            activeNode={activeNode}
          />
        </div>
      </div>

      {/* ── NEXUS mark — ONE instance, bottom-left ── */}
      <div
        style={{
          position: "fixed",
          left: "24px",
          bottom: "24px",
          zIndex: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          userSelect: "none",
        }}
      >
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            padding: "1.5px",
            background: "linear-gradient(135deg, #22d3ee, #3b82f6, #9333ea)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 12px rgba(34,211,238,0.12)",
            transition: "transform 0.3s ease",
            cursor: "default",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              background: "#050608",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "'Poppins', sans-serif",
                color: "#ffffff",
                fontWeight: 600,
                fontSize: "11px",
                letterSpacing: "0.02em",
              }}
            >
              N
            </span>
          </div>
        </div>
      </div>

      {/* Cinematic Transition Overlay */}
      <ChapterTransition
        activeNode={activeNode}
        onReturn={handleReturnToHub}
      />

      {/* Shutter Blackout Overlay */}
      <BlackScreen />
    </div>
  );
}

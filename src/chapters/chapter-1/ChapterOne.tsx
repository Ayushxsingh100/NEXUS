"use client";

import React, { useRef, useState, useEffect } from "react";
import BlackScreen from "./components/BlackScreen";
import BreathingDot from "./components/BreathingDot";
import ManifestoSequence from "./components/ManifestoSequence";
import HeroLeftContent from "./components/HeroLeftContent";
import HeroRightContent from "./components/HeroRightContent";
import HeroBottomContent from "./components/HeroBottomContent";
import DepthCanvas from "./components/DepthCanvas";
import ChapterTimeline from "./ChapterTimeline";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import gsap from "gsap";

interface ChapterOneProps {
  onComplete?: () => void;
}

export default function ChapterOne({ onComplete }: ChapterOneProps) {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [timelineDone, setTimelineDone] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();

  const sceneParamsRef = useRef({
    cameraZ: 12,
    lightIntensity: 0,
    gridOpacity: 0,
  });

  const handleTimelineComplete = () => {
    setTimelineDone(true);
  };

  // ── Mouse parallax (zero-rerender: CSS custom properties) ──────────────────
  useEffect(() => {
    if (prefersReduced) {
      const c = containerRef.current;
      if (c) {
        c.style.setProperty("--mouse-x", "0");
        c.style.setProperty("--mouse-y", "0");
      }
      return;
    }

    const c = containerRef.current;
    if (!c) return;

    let targetX = 0, targetY = 0, currentX = 0, currentY = 0, rafId = 0;

    const onMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      c.style.setProperty("--mouse-x", currentX.toFixed(4));
      c.style.setProperty("--mouse-y", currentY.toFixed(4));
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, [prefersReduced]);

  // ── Chapter exit transition ────────────────────────────────────────────────
  const triggerExitTransition = React.useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const tl = gsap.timeline({ onComplete: () => { if (onComplete) onComplete(); } });

    tl.to(["#hero-left-content", "#hero-right-content", "#hero-bottom-content"], {
      opacity: 0,
      duration: 1.0,
      ease: "power2.inOut",
    }, 0)
      .to(sceneParamsRef.current, {
        lightIntensity: 0,
        gridOpacity: 0,
        cameraZ: 6.5,
        duration: 1.2,
        ease: "power2.inOut",
      }, 0)
      .to("#black-screen", {
        opacity: 1,
        duration: 1.2,
        ease: "power2.inOut",
      }, 0.2);
  }, [isTransitioning, onComplete]);

  // ── Scroll / touch / keyboard triggers ────────────────────────────────────
  useEffect(() => {
    if (!timelineDone || !container || isTransitioning) return;

    let touchStartY = 0;

    const onWheel = (e: WheelEvent) => { if (e.deltaY > 10) triggerExitTransition(); };
    const onTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const onTouchMove = (e: TouchEvent) => {
      if (touchStartY - e.touches[0].clientY > 30) triggerExitTransition();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") triggerExitTransition();
    };

    window.addEventListener("wheel", onWheel);
    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("keydown", onKeyDown);

    const fallback = setTimeout(triggerExitTransition, 20000);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
      clearTimeout(fallback);
    };
  }, [timelineDone, container, isTransitioning, triggerExitTransition]);

  return (
    <div
      ref={(node) => { setContainer(node); containerRef.current = node; }}
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100svh",
        overflow: "hidden",
        background: "#030507",
        color: "#ffffff",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Cinematic 3D backdrop */}
      <DepthCanvas sceneParamsRef={sceneParamsRef} />

      {/* Intro sequence elements */}
      <BreathingDot />
      <ManifestoSequence />

      {/* ── ONE Hero Frame ─────────────────────────────────────────────────── */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* ── Mobile layout ── */
        @media (max-width: 767px) {
          .genesis-hero-main {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            gap: 0 !important;
            padding-top: 80px;
            padding-bottom: 100px;
          }
          .genesis-left-col {
            width: 100% !important;
            align-items: center !important;
            text-align: center !important;
          }
          .genesis-left-col h1 {
            font-size: clamp(54px, 17vw, 76px) !important;
            text-align: center !important;
          }
          .genesis-left-col p {
            text-align: center !important;
            max-width: 360px !important;
          }
          .genesis-right-col {
            width: 100% !important;
            max-width: 520px !important;
          }
          .visual-stage-wrapper {
            height: min(440px, 60vw) !important;
          }
          /* Mobile cards: stacked below */
          .genesis-mobile-cards {
            display: flex !important;
          }
        }
        /* Tablet */
        @media (max-width: 1100px) and (min-width: 768px) {
          .genesis-hero-main {
            grid-template-columns: 0.75fr 1.25fr !important;
          }
          .genesis-left-col h1 {
            font-size: clamp(64px, 6.5vw, 88px) !important;
          }
        }
      `}} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        {/* Centred max-width wrapper */}
        <div
          style={{
            width: "calc(100% - 96px)",
            maxWidth: "1440px",
            height: "100%",
            margin: "0 auto",
            position: "relative",
          }}
        >
          {/* ── Main grid: left text / right visual ── */}
          <div
            className="genesis-hero-main"
            style={{
              display: "grid",
              /* 0.65fr left (≈35%) / 1.35fr right (≈65%) — matches screenshot proportions */
              gridTemplateColumns: "0.65fr 1.35fr",
              alignItems: "stretch",
              gap: "32px",
              position: "absolute",
              top: "55px",
              bottom: "70px",
              left: 0,
              right: 0,
            }}
          >
            {/* LEFT: text content — vertically centred within stretched row */}
            <div
              className="genesis-left-col"
              style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}
            >
              <HeroLeftContent />
            </div>

            {/* RIGHT: full visual stage — stretch fills entire grid row height */}
            <div
              className="genesis-right-col"
              style={{
                display: "flex",
                alignItems: "stretch",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <HeroRightContent />
            </div>
          </div>

          {/* ── Mobile card strip (hidden on desktop) ── */}
          <div
            className="genesis-mobile-cards"
            style={{
              display: "none",
              position: "absolute",
              bottom: "110px",
              left: 0,
              right: 0,
              gap: "10px",
              justifyContent: "center",
              flexWrap: "wrap",
              zIndex: 4,
              pointerEvents: "auto",
            }}
          />
        </div>
      </div>

      {/* ── ENTER THE WORLD — absolute center-bottom ── */}
      <div
        id="hero-bottom-content"
        style={{
          position: "absolute",
          left: "50%",
          bottom: "42px",
          transform: "translateX(-50%)",
          zIndex: 30,
          opacity: 0,
        }}
      >
        <HeroBottomContent onTransition={triggerExitTransition} />
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

      {/* Fade overlay */}
      <BlackScreen />

      {/* Animation conductor */}
      {container && (
        <ChapterTimeline
          container={container}
          sceneParamsRef={sceneParamsRef}
          onTimelineComplete={handleTimelineComplete}
        />
      )}
    </div>
  );
}

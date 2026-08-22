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

      {/* ── Responsive layout styles ─────────────────────────────────────────── */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* ── Hero outer frame: full viewport, flex-centred ── */
        .genesis-hero-frame {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          z-index: 20;
          padding: clamp(56px, 6vh, 80px) clamp(20px, 3vw, 48px) clamp(72px, 9vh, 100px);
          box-sizing: border-box;
        }

        /* ── Centred max-width container ── */
        .genesis-hero-container {
          width: 100%;
          max-width: 1360px;
          display: grid;
          grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
          align-items: center;
          gap: clamp(16px, 2.5vw, 40px);
        }

        /* ── Left column ── */
        .genesis-left-col {
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }

        /* ── Right column ── */
        .genesis-right-col {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 0;
        }

        /* Large desktop (1440+): slightly bigger right column */
        @media (min-width: 1440px) {
          .genesis-hero-container {
            grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr);
          }
        }

        /* Laptop / standard desktop (1024–1366) */
        @media (max-width: 1366px) {
          .genesis-hero-container {
            grid-template-columns: minmax(0, 0.88fr) minmax(0, 1.12fr);
            gap: clamp(12px, 2vw, 28px);
          }
        }

        /* Tablet landscape (768–1024) */
        @media (max-width: 1024px) and (min-width: 768px) {
          .genesis-hero-container {
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
            gap: 16px;
          }
        }

        /* Tablet portrait / large mobile (600–767) */
        @media (max-width: 767px) {
          .genesis-hero-frame {
            justify-content: flex-start;
            padding-top: clamp(72px, 10vh, 96px);
            padding-bottom: clamp(80px, 11vh, 110px);
          }
          .genesis-hero-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0;
          }
          .genesis-left-col {
            width: 100%;
            align-items: center;
            text-align: center;
          }
          .genesis-right-col {
            width: 100%;
            max-width: 420px;
          }
          .visual-stage-wrapper {
            height: min(380px, 56vw) !important;
          }
          .genesis-desktop-cards { display: none !important; }
          .genesis-desktop-orbit { display: none !important; }
        }

        /* Small mobile */
        @media (max-width: 430px) {
          .visual-stage-wrapper {
            height: min(300px, 72vw) !important;
          }
        }
      `}} />

      {/* ── ONE Hero Frame ─────────────────────────────────────────────────── */}
      <div className="genesis-hero-frame">
        <div className="genesis-hero-container">
          {/* LEFT: text content */}
          <div className="genesis-left-col">
            <HeroLeftContent />
          </div>

          {/* RIGHT: visual stage */}
          <div className="genesis-right-col">
            <HeroRightContent />
          </div>
        </div>
      </div>

      {/* ── ENTER THE WORLD — absolute center-bottom ── */}
      <div
        id="hero-bottom-content"
        style={{
          position: "absolute",
          left: "50%",
          bottom: "clamp(20px, 3.5vh, 44px)",
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

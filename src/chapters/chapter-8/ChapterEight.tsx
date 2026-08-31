"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ContactStage from "./components/ContactStage";
import BlackScreen from "../chapter-1/components/BlackScreen";

interface ChapterEightProps {
  onReturn: () => void;
  onCompleteJourney?: () => void;
}

export default function ChapterEight({ onReturn, onCompleteJourney }: ChapterEightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hubWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to("#black-screen", { opacity: 0, duration: 1.5 });

      gsap.fromTo(
        hubWrapperRef.current,
        { opacity: 0, filter: "blur(10px)", y: 24 },
        { opacity: 1, filter: "blur(0px)", y: 0, duration: 1.6, delay: 0.2, ease: "power2.out" }
      );
    },
    { scope: containerRef, dependencies: [] }
  );

  const handleReturnToHub = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 1.2,
      ease: "power2.inOut",
      onComplete: onReturn,
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden text-white font-sans flex items-center justify-center select-none"
    >
      {/* Layered scene background for Chapter VIII */}
      <div className="absolute inset-0 -z-20 pointer-events-none overflow-hidden">
        {/* Base canvas */}
        <div className="absolute inset-0" style={{ background: "#050608" }} />

        {/* Primary violet bloom — top right */}
        <div className="absolute" style={{
          top: "-15%", right: "-10%",
          width: "70vw", height: "70vw", maxWidth: "700px", maxHeight: "700px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 35%, transparent 70%)",
          filter: "blur(80px)",
        }} />

        {/* Warm rose-violet — bottom left */}
        <div className="absolute" style={{
          bottom: "-20%", left: "-10%",
          width: "60vw", height: "60vw", maxWidth: "600px", maxHeight: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 40%, transparent 70%)",
          filter: "blur(100px)",
        }} />

        {/* Faint cool mid accent */}
        <div className="absolute" style={{
          top: "60%", left: "30%",
          width: "400px", height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.01) 0%, transparent 70%)",
          filter: "blur(70px)",
        }} />

        {/* Radial vignette overlay */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.72) 100%)",
        }} />
      </div>

      {/* Contact Stage */}
      <div
        ref={hubWrapperRef}
        className="w-full h-full overflow-y-auto flex flex-col items-center justify-center opacity-0 relative z-10"
      >
        <ContactStage onComplete={onCompleteJourney} />

        {/* Return trigger */}
        <button
          onClick={handleReturnToHub}
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "10.5px",
            fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255, 255, 255, 0.85)",
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "100px",
            padding: "12px 32px",
            cursor: "pointer",
            transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            marginTop: "24px",
            marginBottom: "36px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#ffffff";
            e.currentTarget.style.background = "linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)";
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.35)";
            e.currentTarget.style.boxShadow = "0 0 30px rgba(255, 255, 255, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.15)";
            e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
            const arrow = e.currentTarget.querySelector(".btn-arrow");
            if (arrow) {
              (arrow as HTMLElement).style.transform = "translateX(4px)";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "rgba(255, 255, 255, 0.85)";
            e.currentTarget.style.background = "linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)";
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)";
            e.currentTarget.style.transform = "translateY(0px) scale(1)";
            const arrow = e.currentTarget.querySelector(".btn-arrow");
            if (arrow) {
              (arrow as HTMLElement).style.transform = "translateX(0px)";
            }
          }}
        >
          <span>Return to Thought Hub</span>
          <svg
            className="btn-arrow"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              color: "rgba(255, 255, 255, 0.5)",
            }}
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>

      <BlackScreen />
    </div>
  );
}

"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ContactStage from "./components/ContactStage";
import { Label, HeroTitle } from "@/components/core/Typography";
import BlackScreen from "../chapter-1/components/BlackScreen";

interface ChapterEightProps {
  onReturn: () => void;
  onCompleteJourney?: () => void;
}

export default function ChapterEight({ onReturn, onCompleteJourney }: ChapterEightProps) {
  const [phase, setPhase] = useState<"transition" | "intro" | "hub">("transition");

  const containerRef = useRef<HTMLDivElement>(null);
  const transitionRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const hubWrapperRef = useRef<HTMLDivElement>(null);

  // Scene 1: Chapter VIII reveal
  useGSAP(
    () => {
      const masterTl = gsap.timeline({ defaults: { ease: "power2.out" } });

      masterTl
        .to("#black-screen", { opacity: 0, duration: 1.5 })
        .fromTo(
          transitionRef.current,
          { opacity: 0, y: 20, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.8 },
          "-=0.5"
        )
        .to(transitionRef.current, {
          opacity: 0,
          y: -20,
          filter: "blur(8px)",
          duration: 1.2,
          delay: 1.8,
          onComplete: () => setPhase("intro"),
        });
    },
    { scope: containerRef, dependencies: [] }
  );

  // Scene 2: Intro quote
  useGSAP(
    () => {
      if (phase !== "intro") return;

      const introTl = gsap.timeline({ defaults: { ease: "power2.out" } });
      introTl
        .fromTo(
          introRef.current,
          { opacity: 0, y: 15, filter: "blur(6px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.5 }
        )
        .to(introRef.current, {
          opacity: 0,
          y: -15,
          filter: "blur(6px)",
          duration: 1.2,
          delay: 2.2,
          onComplete: () => setPhase("hub"),
        });
    },
    { scope: containerRef, dependencies: [phase] }
  );

  // Scene 3: Fade in the Contact Stage
  useGSAP(
    () => {
      if (phase !== "hub" || !hubWrapperRef.current) return;

      gsap.fromTo(
        hubWrapperRef.current,
        { opacity: 0, filter: "blur(10px)", y: 24 },
        { opacity: 1, filter: "blur(0px)", y: 0, duration: 1.6, ease: "power2.out" }
      );
    },
    { scope: containerRef, dependencies: [phase] }
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
          background: "radial-gradient(circle, rgba(109,40,217,0.22) 0%, rgba(139,92,246,0.1) 35%, transparent 70%)",
          filter: "blur(80px)",
        }} />

        {/* Warm rose-violet — bottom left */}
        <div className="absolute" style={{
          bottom: "-20%", left: "-10%",
          width: "60vw", height: "60vw", maxWidth: "600px", maxHeight: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(168,85,247,0.12) 0%, rgba(217,70,239,0.06) 40%, transparent 70%)",
          filter: "blur(100px)",
        }} />

        {/* Faint cool mid accent */}
        <div className="absolute" style={{
          top: "60%", left: "30%",
          width: "400px", height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)",
          filter: "blur(70px)",
        }} />

        {/* Radial vignette overlay */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.72) 100%)",
        }} />
      </div>

      {/* Scene 1: Chapter VIII Title */}
      {phase === "transition" && (
        <div
          ref={transitionRef}
          className="absolute flex flex-col items-center text-center px-6 opacity-0 pointer-events-none"
        >
          <Label className="text-[10px] tracking-[0.45em] text-violet-400 font-light uppercase pl-[0.45em]">
            Chapter VIII
          </Label>
          <HeroTitle className="mt-4">Legacy</HeroTitle>
        </div>
      )}

      {/* Scene 2: Intro Quote */}
      {phase === "intro" && (
        <div
          ref={introRef}
          className="absolute flex flex-col items-center text-center px-6 opacity-0 pointer-events-none max-w-xl"
        >
          <h2 className="text-xl sm:text-2xl font-light tracking-[0.2em] leading-relaxed text-zinc-100">
            {"We build systems not to boast,"}
          </h2>
          <h2 className="text-xl sm:text-2xl font-light tracking-[0.2em] leading-relaxed text-violet-300 mt-2">
            {"but to sustain."}
          </h2>
        </div>
      )}

      {/* Scene 3: Contact Stage */}
      {phase === "hub" && (
        <div
          ref={hubWrapperRef}
          className="w-full h-full overflow-y-auto flex flex-col items-center justify-center opacity-0 relative z-10"
        >
          <ContactStage onComplete={onCompleteJourney} />

          {/* Return trigger */}
          <button
            onClick={handleReturnToHub}
            className="text-zinc-600 hover:text-white/60 text-[9px] sm:text-[10px] tracking-[0.25em] font-mono pl-[0.25em] transition-colors duration-300 mt-2 mb-8 bg-transparent border-none outline-none cursor-pointer"
          >
            [ RETURN TO THOUGHT HUB ]
          </button>
        </div>
      )}

      <BlackScreen />
    </div>
  );
}

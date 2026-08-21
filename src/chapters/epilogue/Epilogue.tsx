"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import LegacySequence from "./components/LegacySequence";
import FadeToBlack from "./components/FadeToBlack";

export default function Epilogue() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Very slow backward movement (simulating backward camera drift)
    gsap.fromTo(
      stageRef.current,
      { scale: 1.03, opacity: 0 },
      {
        scale: 0.97,
        opacity: 1,
        duration: 25.0,
        ease: "sine.out",
      }
    );
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white font-sans flex items-center justify-center select-none">
      {/* Stage Wrapper tracking the slow camera scale pull back */}
      <div
        ref={stageRef}
        className="w-full h-full flex items-center justify-center"
        style={{ transformStyle: "preserve-3d" }}
      >
        <LegacySequence />
      </div>

      {/* Solid Black overlay shutter handling entry silence */}
      <FadeToBlack />
    </div>
  );
}

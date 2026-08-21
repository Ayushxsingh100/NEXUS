"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

export default function FadeToBlack() {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Start solid black, then stay black for 2 seconds of silence, then keep transparent/semi-dark
    gsap.fromTo(
      overlayRef.current,
      { opacity: 1 },
      { opacity: 0, duration: 2.0, delay: 2.0, ease: "power2.inOut" }
    );
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black z-50 pointer-events-none select-none"
    />
  );
}

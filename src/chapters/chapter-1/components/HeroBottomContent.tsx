"use client";

import React, { useRef, useState, useEffect } from "react";

interface HeroBottomContentProps {
  onTransition: () => void;
}

export default function HeroBottomContent({ onTransition }: HeroBottomContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAttracted, setIsAttracted] = useState(false);
  const [pullFactor, setPullFactor] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const maxDistance = 220; // Proximity threshold in pixels
      if (distance < maxDistance) {
        const pull = 1 - distance / maxDistance; // 0 (far) to 1 (close)
        const strength = 0.22;
        const moveX = dx * strength * pull;
        const moveY = dy * strength * pull;

        container.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
        setIsAttracted(true);
        setPullFactor(pull);
      } else {
        container.style.transform = "translate3d(0px, 0px, 0px)";
        setIsAttracted(false);
        setPullFactor(0);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={onTransition}
      className="flex flex-col items-center justify-center cursor-pointer pointer-events-auto select-none gap-2"
      style={{
        transition: isAttracted ? "none" : "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
      }}
    >
      {/* Scroll wheel & Chevron Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll-wheel-dot {
          0% { opacity: 0; transform: translateY(-4px); }
          20% { opacity: 1; }
          80% { opacity: 0.8; }
          100% { opacity: 0; transform: translateY(5px); }
        }
        @keyframes chevron-breathing {
          0%, 100% { transform: translateY(0px); opacity: 0.4; }
          50% { transform: translateY(4px); opacity: 0.95; }
        }
        .anim-wheel-dot {
          animation: scroll-wheel-dot 2.2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
        }
        .anim-chevron-breath {
          animation: chevron-breathing 2.0s ease-in-out infinite;
        }
      `}} />

      {/* SVG Mouse Icon with Linear Gradient border */}
      <svg 
        width="26" 
        height="42" 
        viewBox="0 0 26 42" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="transition-all duration-300"
        style={{
          filter: isAttracted 
            ? `drop-shadow(0 0 ${8 + pullFactor * 12}px rgba(34, 211, 238, ${pullFactor * 0.55}))` 
            : "none"
        }}
      >
        <rect 
          x="1" 
          y="1" 
          width="24" 
          height="40" 
          rx="12" 
          stroke="url(#mouse-border-gradient)" 
          strokeWidth="1.8"
          fill="rgba(10, 15, 22, 0.45)"
        />
        {/* Scroll Wheel Track */}
        <line 
          x1="13" 
          y1="8" 
          x2="13" 
          y2="15" 
          stroke="url(#mouse-border-gradient)" 
          strokeWidth="1.2" 
          strokeLinecap="round" 
          opacity="0.3"
        />
        {/* Pulsing wheel dot */}
        <circle 
          cx="13" 
          cy="9" 
          r="1.8" 
          fill="#22d3ee" 
          className="anim-wheel-dot"
        />
        <defs>
          <linearGradient id="mouse-border-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>

      {/* ENTER THE WORLD label */}
      <span 
        className="mt-1 text-[10.5px] sm:text-xs font-semibold tracking-[0.35em] pl-[0.35em] font-sans transition-all duration-300 uppercase"
        style={{
          background: "linear-gradient(to right, #22d3ee 0%, #a855f7 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          opacity: isAttracted ? 1.0 : 0.85,
          textShadow: isAttracted 
            ? `0 0 15px rgba(34, 211, 238, ${pullFactor * 0.4})` 
            : "none",
        }}
      >
        ENTER THE WORLD
      </span>

      {/* Downward Chevron */}
      <svg
        className="w-4.5 h-4.5 anim-chevron-breath transition-colors duration-300"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
        style={{
          color: isAttracted ? "#a855f7" : "rgba(255, 255, 255, 0.4)"
        }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    </div>
  );
}

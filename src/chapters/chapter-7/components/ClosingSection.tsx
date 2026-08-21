"use client";

import React, { useEffect, useState, useRef } from "react";

interface ClosingSectionProps {
  onReturn: () => void;
  onContact?: () => void;
}

export default function ClosingSection({ onReturn, onContact }: ClosingSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [visible, setVisible] = useState(false);
  const [isContactHovered, setIsContactHovered] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  // Intersection observer to trigger entrance transitions
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Handle magnetic cursor coordinates calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = buttonRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    // Subtle magnetic strength scale (max translation ~14px)
    setCoords({ x: x * 0.28, y: y * 0.28 });
  };

  const handleMouseEnter = () => {
    setIsContactHovered(true);
  };

  const handleMouseLeave = () => {
    setIsContactHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  return (
    <section
      ref={sectionRef}
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        padding: "120px 24px",
        position: "relative",
        background: visible ? "#000000" : "transparent",
        transition: "background 1.2s ease-out",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes shine-sweep {
          0% { left: -120%; }
          100% { left: 220%; }
        }
      `}</style>

      {/* Soft exit ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "360px",
          height: "360px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(192, 132, 252, 0.05) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
          zIndex: 0,
          opacity: visible ? 1 : 0,
          transition: "opacity 1.5s ease",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          maxWidth: "800px",
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontSize: "12px",
            fontWeight: 700,
            color: "#22d3ee",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontFamily: "'Poppins', sans-serif",
            marginBottom: "32px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 1s ease 0.2s, transform 1s ease 0.2s",
            display: "block",
          }}
        >
          Let's Build Something
        </span>

        {/* Large Statement Quote */}
        <h2
          style={{
            fontSize: "clamp(32px, 5.5vw, 64px)",
            fontWeight: 850,
            color: "#ffffff",
            fontFamily: "'Poppins', sans-serif",
            lineHeight: 1.15,
            letterSpacing: "-0.035em",
            margin: "0 0 16px 0",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1s ease 0.4s, transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s",
          }}
        >
          Still building. Still learning.{" "}
          <span style={{ color: "#c084fc" }}>Still shipping.</span>
        </h2>

        {/* Tagline */}
        <p
          style={{
            fontSize: "clamp(16px, 2.5vw, 22px)",
            fontWeight: 400,
            color: "rgba(255, 255, 255, 0.6)",
            fontFamily: "'Poppins', sans-serif",
            lineHeight: 1.5,
            letterSpacing: "0.02em",
            maxWidth: "600px",
            margin: "0 auto 56px auto",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 1s ease 0.5s, transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s",
          }}
        >
          Let's build something insane together!
        </p>

        {/* Action Button Container */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 1s ease 0.6s, transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s",
          }}
        >
          <button
            ref={buttonRef}
            onClick={onContact}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              background: isContactHovered
                ? "linear-gradient(135deg, #a855f7 0%, #d946ef 50%, #22d3ee 100%)"
                : "linear-gradient(135deg, #22d3ee 0%, #8b5cf6 50%, #d946ef 100%)",
              border: "none",
              borderRadius: "44px",
              padding: "20px 68px",
              fontSize: "14px",
              fontWeight: 900,
              color: "#020617",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              cursor: "pointer",
              fontFamily: "'Poppins', sans-serif",
              position: "relative",
              overflow: "hidden",
              boxShadow: isContactHovered
                ? "0 0 35px rgba(34, 211, 238, 0.7), 0 0 55px rgba(217, 70, 239, 0.55), 0 16px 36px rgba(0,0,0,0.6)"
                : "0 0 15px rgba(34, 211, 238, 0.25), 0 8px 24px rgba(0,0,0,0.5)",
              transform: isContactHovered
                ? `translate3d(${coords.x}px, ${coords.y}px, 0) scale(1.05)`
                : "translate3d(0, 0, 0) scale(1)",
              transition: isContactHovered
                ? "transform 100ms ease-out, box-shadow 300ms ease, background 350ms ease"
                : "transform 350ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 350ms ease, background 350ms ease",
              outline: "none",
            }}
          >
            {/* Shifting light beam overlay */}
            <span
              style={{
                position: "absolute",
                top: 0,
                left: "-120%",
                width: "60%",
                height: "100%",
                background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
                transform: "skewX(-30deg)",
                animation: isContactHovered ? "shine-sweep 1.4s infinite ease-in-out" : "none",
                pointerEvents: "none",
              }}
            />
            {/* Button text wrapped in absolute safety span */}
            <span style={{ position: "relative", zIndex: 2 }}>
              Contact Me
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

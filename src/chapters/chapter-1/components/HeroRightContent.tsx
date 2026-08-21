"use client";

import React from "react";
import Image from "next/image";

/* ─────────────────────────────────────────────
   Floating Card
───────────────────────────────────────────── */
interface FloatingCardProps {
  title: string;
  line1: string;
  line2: string;
  icon: React.ReactNode;
  accentColor: "cyan" | "teal" | "purple";
  floatClass: string;
  parallaxClass: string;
  style?: React.CSSProperties;
}

function FloatingCard({
  title,
  line1,
  line2,
  icon,
  accentColor,
  floatClass,
  parallaxClass,
  style,
}: FloatingCardProps) {
  const palette = {
    cyan: {
      iconBg: "rgba(34, 211, 238, 0.12)",
      iconBorder: "rgba(34, 211, 238, 0.25)",
      iconColor: "#22d3ee",
      glow: "rgba(34, 211, 238, 0.20)",
    },
    teal: {
      iconBg: "rgba(20, 184, 166, 0.12)",
      iconBorder: "rgba(20, 184, 166, 0.25)",
      iconColor: "#14b8a6",
      glow: "rgba(20, 184, 166, 0.20)",
    },
    purple: {
      iconBg: "rgba(168, 85, 247, 0.12)",
      iconBorder: "rgba(168, 85, 247, 0.25)",
      iconColor: "#a855f7",
      glow: "rgba(168, 85, 247, 0.20)",
    },
  }[accentColor];

  return (
    <div
      className={`genesis-card ${floatClass} ${parallaxClass}`}
      style={{
        position: "absolute",
        width: "210px",
        padding: "12px 14px",
        borderRadius: "14px",
        background: "rgba(10,15,22,0.82)",
        border: "1px solid rgba(255,255,255,0.09)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        pointerEvents: "auto",
        cursor: "default",
        boxShadow: "0 8px 32px rgba(0,0,0,0.45)",
        ...style,
      }}
    >
      {/* Icon box */}
      <div
        style={{
          width: "38px",
          height: "38px",
          minWidth: "38px",
          borderRadius: "10px",
          background: palette.iconBg,
          border: `1px solid ${palette.iconBorder}`,
          color: palette.iconColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 0 10px ${palette.glow}`,
          marginTop: "2px",
        }}
      >
        {icon}
      </div>

      {/* Text */}
      <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
        <span
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "13px",
            fontWeight: 600,
            color: "#ffffff",
            lineHeight: 1.3,
          }}
        >
          {title}
        </span>
        <span
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "11px",
            fontWeight: 400,
            lineHeight: 1.5,
            color: "rgba(255,255,255,0.50)",
            marginTop: "4px",
          }}
        >
          {line1}
          <br />
          {line2}
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SVG Icons
───────────────────────────────────────────── */
const CodeIcon = (
  <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
    <line x1="14" y1="4" x2="10" y2="20" />
  </svg>
);

const BulbIcon = (
  <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5.5 5.5 0 0 0 7 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5" />
    <line x1="9" y1="18" x2="15" y2="18" />
    <line x1="10" y1="22" x2="14" y2="22" />
  </svg>
);

const RocketIcon = (
  <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M4.5 16.5c-1.5 1.25-2.5 3.5-2.5 3.5s2.25-1 3.5-2.5M12 12l-7.5 7.5" />
    <path d="M10 2c-.5 2 1 4 3 4.5C18.5 7.5 22 12 22 12s-4.5 3.5-5.5 9c-.5-2-2.5-3.5-4.5-3M10 2S6.5 5.5 1 6c2 .5 3.5 2.5 3 4.5" />
  </svg>
);

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export default function HeroRightContent() {
  return (
    <div
      id="hero-right-content"
      className="visual-stage-wrapper"
      style={{
        position: "relative",
        width: "100%",
        /* Fill the full available column height */
        height: "100%",
        minHeight: "400px",
        opacity: 0,
        overflow: "visible",
      }}
    >
      {/* ── Animation keyframes ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes genesis-float-1 {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-4px); }
        }
        @keyframes genesis-float-2 {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-4px); }
        }
        @keyframes genesis-float-3 {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-4px); }
        }

        .genesis-float-1 { animation: genesis-float-1 5s ease-in-out infinite; }
        .genesis-float-2 { animation: genesis-float-2 6.8s ease-in-out infinite; }
        .genesis-float-3 { animation: genesis-float-3 4.3s ease-in-out infinite; }

        /* Parallax via CSS custom props */
        .genesis-parallax-art {
          transform: translate3d(
            calc(var(--mouse-x, 0) * 4px),
            calc(var(--mouse-y, 0) * 4px),
            0
          );
          transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
          will-change: transform;
        }
        .genesis-parallax-card-1 {
          transform: translate3d(
            calc(var(--mouse-x, 0) * -6px),
            calc(var(--mouse-y, 0) * -6px),
            0
          );
          transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
          will-change: transform;
          animation: genesis-float-1 5s ease-in-out infinite;
        }
        .genesis-parallax-card-2 {
          transform: translate3d(
            calc(var(--mouse-x, 0) * 6px),
            calc(var(--mouse-y, 0) * 6px),
            0
          );
          transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
          will-change: transform;
          animation: genesis-float-2 6.8s ease-in-out infinite;
        }
        .genesis-parallax-card-3 {
          transform: translate3d(
            calc(var(--mouse-x, 0) * -5px),
            calc(var(--mouse-y, 0) * -5px),
            0
          );
          transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
          will-change: transform;
          animation: genesis-float-3 4.3s ease-in-out infinite;
        }
        .genesis-parallax-orbit {
          transform: translate3d(
            calc(var(--mouse-x, 0) * 2px),
            calc(var(--mouse-y, 0) * 2px),
            0
          );
          transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
          will-change: transform;
        }

        /* Responsive tablet */
        @media (max-width: 1100px) {
          .genesis-card { width: 190px !important; }
        }

        /* Mobile: hide desktop cards/orbit */
        @media (max-width: 767px) {
          .genesis-desktop-cards { display: none !important; }
          .genesis-desktop-orbit { display: none !important; }
        }
      `}} />

      {/* ── Background atmosphere — visible blue/cyan glow ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 65% at 68% 52%, rgba(30,100,200,0.22) 0%, rgba(34,211,238,0.08) 45%, transparent 72%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── Artwork — fills the full visual stage ── */}
      <div
        className="genesis-parallax-art"
        style={{
          position: "absolute",
          /* Shift artwork right but not too far: left:5% keeps character
             close to the cards without pushing it out of frame */
          top: "-10%",
          right: "-3%",
          bottom: "-5%",
          left: "0",
          zIndex: 2,
          pointerEvents: "none",
        }}
      >
        <Image
          src="/media/ChatGPT Image Jul 27, 2026, 11_00_25 AM.png"
          alt="Developer with laptop"
          fill
          priority
          sizes="(max-width: 767px) 100vw, (max-width: 1100px) 60vw, 50vw"
          className="select-none"
          style={{
            objectFit: "contain",
            /* Right-bias: character shows prominently on the right */
            objectPosition: "80% bottom",
            /* Gentle radial fade centred on the character's right-of-centre position */
            maskImage:
              "radial-gradient(ellipse 90% 88% at 65% 56%, black 48%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 90% 88% at 65% 56%, black 48%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Orbital SVG — connects cards to character ── */}
      <svg
        className="genesis-parallax-orbit genesis-desktop-orbit"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 3,
          overflow: "visible",
        }}
        viewBox="0 0 700 700"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="orbit-grad" x1="0" y1="1" x2="0.6" y2="0">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="45%" stopColor="#14b8a6" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        {/* Single arc from Always Learning (bottom) to Clean Code (top) */}
        <path
          d="M 155 490 Q 90 320 215 115"
          stroke="url(#orbit-grad)"
          strokeWidth="1.4"
          strokeDasharray="5 9"
          fill="none"
          opacity="0.20"
        />
        {/* Decorative dots at key positions */}
        <circle cx="155" cy="490" r="3.5" fill="#a855f7" opacity="0.55" />
        <circle cx="118" cy="380" r="2.5" fill="#14b8a6" opacity="0.45" />
        <circle cx="108" cy="265" r="2"   fill="#22d3ee" opacity="0.38" />
        <circle cx="170" cy="145" r="3"   fill="#22d3ee" opacity="0.50" />
        <circle cx="215" cy="115" r="2"   fill="#a855f7" opacity="0.35" />
      </svg>

      {/* ── Desktop Floating Cards ── */}
      <div
        className="genesis-desktop-cards"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 4,
          pointerEvents: "none",
          overflow: "visible",
        }}
      >
        {/*
         * Cards sit on the LEFT of the visual stage, close to where the
         * character's left side is. This creates the diagonal stack seen
         * in the reference screenshot.
         *
         * "top" is % of stage height; "left" is % of stage width.
         * The character image is right-aligned, so its visible body
         * starts approximately at 30-35% from the stage left edge.
         * Cards at left: 2-20% sit just to the LEFT of the character body.
         */}

        {/* Clean Code — upper area, near character head/shoulder zone */}
        <FloatingCard
          title="Clean Code"
          line1="Simple. Readable."
          line2="Maintainable."
          accentColor="cyan"
          floatClass=""
          parallaxClass="genesis-parallax-card-1"
          style={{ top: "10%", left: "42%" }}
          icon={CodeIcon}
        />

        {/* Problem Solver — middle, furthest left */}
        <FloatingCard
          title="Problem Solver"
          line1="Break it down."
          line2="Build it up."
          accentColor="teal"
          floatClass=""
          parallaxClass="genesis-parallax-card-2"
          style={{ top: "40%", left: "20%" }}
          icon={BulbIcon}
        />

        {/* Always Learning — lower, between the two horizontally */}
        <FloatingCard
          title="Always Learning"
          line1="Curious mind."
          line2="Infinite loop."
          accentColor="purple"
          floatClass=""
          parallaxClass="genesis-parallax-card-3"
          style={{ top: "64%", left: "30%" }}
          icon={RocketIcon}
        />
      </div>
    </div>
  );
}

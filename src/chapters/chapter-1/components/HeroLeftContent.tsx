"use client";

import React from "react";

export default function HeroLeftContent() {
  return (
    <div
      id="hero-left-content"
      className="flex flex-col justify-center text-left z-20 pointer-events-none select-none opacity-0"
      style={{ fontFamily: "'Poppins', sans-serif", width: "100%" }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        /* ── Gradient animations ── */
        @keyframes ayush-gradient {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes singh-gradient {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes badge-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.6; transform: scale(0.85); }
        }
        @keyframes line-grow {
          from { transform: scaleX(0); opacity: 0; }
          to   { transform: scaleX(1); opacity: 1; }
        }
        @keyframes hero-chip-shine {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .name-ayush {
          display: block;
          background: linear-gradient(
            90deg,
            #ffffff 0%,
            #cffafe 25%,
            #ffffff 50%,
            #e0f7ff 75%,
            #ffffff 100%
          );
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: ayush-gradient 5s ease-in-out infinite;
          /* Extra bottom space so gradient-clip doesn't cut descenders */
          padding-bottom: 0.08em;
        }

        .name-singh {
          display: block;
          background: linear-gradient(
            90deg,
            #00d2ff 0%,
            #3b82f6 20%,
            #9333ea 40%,
            #22d3ee 60%,
            #3b82f6 80%,
            #9333ea 100%
          );
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: singh-gradient 4s ease-in-out infinite;
          /* Critical fix: padding-bottom prevents bottom clipping of gradient text */
          padding-bottom: 0.18em;
        }

        .hero-status-dot {
          animation: badge-pulse 2.4s ease-in-out infinite;
        }

        .hero-accent-line {
          transform-origin: left;
          animation: line-grow 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
        }

        .hero-skill-chip {
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%);
          background-size: 200% auto;
          transition: background-position 0.6s ease, border-color 0.3s ease;
        }
        .hero-skill-chip:hover {
          background-position: right center;
          border-color: rgba(255,255,255,0.18) !important;
        }

        /* Mobile */
        @media (max-width: 767px) {
          #hero-left-content {
            align-items: center;
            text-align: center;
          }
          #hero-left-content h1 {
            font-size: clamp(52px, 15vw, 72px) !important;
          }
          #hero-left-content p {
            text-align: center;
            max-width: 320px;
          }
          .hero-accent-line { display: none; }
          .hero-chips-row { justify-content: center; }
        }

        /* Laptop */
        @media (max-width: 1280px) and (min-width: 768px) {
          #hero-left-content h1 {
            font-size: clamp(52px, 5.2vw, 82px) !important;
          }
        }
      `}} />


      <span
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "clamp(14px, 1.05vw, 17px)",
          fontWeight: 400,
          letterSpacing: "0.04em",
          color: "rgba(255,255,255,0.55)",
          marginBottom: "clamp(8px, 1vh, 14px)",
          display: "block",
        }}
      >
        Hey there! 👋
      </span>

      {/* ── Name heading ── */}
      <h1
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "clamp(60px, 6vw, 100px)",
          fontWeight: 700,
          /* lineHeight > 1 avoids any bottom-clip on background-clip:text */
          lineHeight: 1.0,
          letterSpacing: "-0.048em",
          margin: 0,
          padding: 0,
          overflow: "visible",
        }}
      >
        <span className="name-ayush">Ayush</span>
        <span className="name-singh">Singh</span>
      </h1>

      {/* ── Accent rule under name ── */}
      <div
        className="hero-accent-line"
        style={{
          height: "1.5px",
          width: "clamp(80px, 8vw, 120px)",
          background: "linear-gradient(90deg, #22d3ee, #9333ea, transparent)",
          borderRadius: "2px",
          marginTop: "clamp(10px, 1.2vh, 16px)",
          marginBottom: 0,
        }}
      />

      {/* ── Description ── */}
      <p
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "clamp(13.5px, 1.05vw, 16.5px)",
          lineHeight: 1.75,
          fontWeight: 400,
          color: "rgba(255,255,255,0.52)",
          maxWidth: "370px",
          marginTop: "clamp(14px, 1.8vh, 24px)",
          marginBottom: 0,
        }}
      >
        I build scalable software systems and love turning
        complex problems into simple, elegant solutions.
      </p>


    </div>
  );
}

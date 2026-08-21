"use client";

import React from "react";

export default function HeroLeftContent() {
  return (
    <div
      id="hero-left-content"
      className="flex flex-col justify-center text-left z-20 pointer-events-none select-none opacity-0"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Animated gradient keyframes */}
      <style dangerouslySetInnerHTML={{ __html: `
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

        .name-ayush {
          display: block;
          /* Wide gradient so the shift is visually smooth — mostly white/ice tones */
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
        }

        .name-singh {
          display: block;
          /* Cyan → blue → violet → back — cycling live */
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
        }
      `}} />

      {/* Greeting */}
      <span
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "18px",
          fontWeight: 400,
          letterSpacing: "0.04em",
          color: "rgba(255,255,255,0.65)",
          marginBottom: "16px",
          display: "block",
        }}
      >
        Hey there! 👋
      </span>

      {/* Name */}
      <h1
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "clamp(76px, 7vw, 108px)",
          fontWeight: 700,
          lineHeight: 0.95,
          letterSpacing: "-0.055em",
          margin: 0,
          padding: 0,
          paddingBottom: "0.18em",
          overflow: "visible",
        }}
      >
        <span className="name-ayush" style={{ display: "block" }}>Ayush</span>
        <span className="name-singh" style={{ display: "block" }}>Singh</span>
      </h1>

      {/* Description */}
      <p
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "17px",
          lineHeight: 1.7,
          fontWeight: 400,
          color: "rgba(255,255,255,0.58)",
          maxWidth: "400px",
          marginTop: "28px",
          marginBottom: 0,
        }}
      >
        I build scalable software systems and love turning
        complex problems into simple, elegant solutions.
      </p>
    </div>
  );
}

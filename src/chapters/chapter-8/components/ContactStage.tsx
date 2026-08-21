"use client";

import React from "react";
import AvailabilityPill from "./AvailabilityPill";
import ContactLink from "./ContactLink";
import ResumeButton from "./ResumeButton";
import ContactForm from "./ContactForm";

interface ContactStageProps {
  onComplete?: () => void;
}

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" />
  </svg>
);

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function ContactStage({ onComplete }: ContactStageProps) {
  return (
    <div
      className="c8-stage"
      style={{
        width: "100%",
        maxWidth: "1080px",
        marginInline: "auto",
        padding: "clamp(24px, 4vw, 52px) clamp(20px, 4vw, 56px)",
        boxSizing: "border-box",
        position: "relative",
        zIndex: 10,
      }}
    >
      {/* ── Deep scene lighting ── */}

      {/* Primary violet bloom — behind the card */}
      <div aria-hidden style={{
        position: "absolute", top: "30%", right: "-2%", transform: "translateY(-50%)",
        width: "560px", height: "560px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(139, 92, 246, 0.18) 0%, rgba(167, 105, 244, 0.08) 40%, transparent 70%)",
        filter: "blur(90px)", pointerEvents: "none", zIndex: 0,
      }} />

      {/* Secondary warm purple orb — upper right */}
      <div aria-hidden style={{
        position: "absolute", top: "-10%", right: "20%",
        width: "280px", height: "280px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(192, 132, 252, 0.1) 0%, transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none", zIndex: 0,
      }} />

      {/* Cool blue-violet bloom — left mid */}
      <div aria-hidden style={{
        position: "absolute", bottom: "10%", left: "-8%",
        width: "350px", height: "350px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)",
        filter: "blur(70px)", pointerEvents: "none", zIndex: 0,
      }} />

      {/* ── Main grid ── */}
      <div
        className="c8-layout"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.15fr",
          gap: "clamp(36px, 5vw, 72px)",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* ────── LEFT COLUMN ────── */}
        <div style={{ display: "flex", flexDirection: "column" }}>

          {/* Chapter eyebrow */}
          <p style={{
            fontSize: "9.5px",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 600,
            letterSpacing: "0.22em",
            color: "rgba(167, 139, 250, 0.65)",
            textTransform: "uppercase",
            margin: "0 0 16px 0",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}>
            <span style={{ width: "18px", height: "1px", background: "rgba(167,139,250,0.4)", display: "inline-block", borderRadius: "2px" }} />
            Chapter VIII — Legacy
          </p>

          {/* Availability pill */}
          <div style={{ marginBottom: "26px" }}>
            <AvailabilityPill />
          </div>

          {/* Hero heading */}
          <h2 style={{
            fontSize: "clamp(40px, 5vw, 64px)",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1.06,
            color: "#ffffff",
            margin: "0 0 4px 0",
          }}>
            Let&apos;s work
          </h2>
          <h2 style={{
            fontSize: "clamp(40px, 5vw, 64px)",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1.06,
            margin: "0 0 20px 0",
            background: "linear-gradient(125deg, #e9d5ff 0%, #c084fc 35%, #a855f7 65%, #7c3aed 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            together.
          </h2>

          {/* Subline */}
          <p style={{
            fontSize: "clamp(13.5px, 1.25vw, 15px)",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 400,
            color: "rgba(255, 255, 255, 0.45)",
            lineHeight: 1.72,
            margin: "0 0 32px 0",
            maxWidth: "290px",
          }}>
            Building software that matters<br />starts with one conversation.
          </p>

          {/* Gradient divider */}
          <div style={{
            width: "36px", height: "1.5px",
            background: "linear-gradient(90deg, rgba(192,132,252,0.6), rgba(139,92,246,0.15))",
            borderRadius: "2px", marginBottom: "20px",
          }} />

          {/* Contact links — with subtle row separators */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {[
              { href: "mailto:singh.ayush679@gmail.com", label: "singh.ayush679@gmail.com", sublabel: "Email", icon: <EmailIcon />, external: false },
              { href: "https://linkedin.com/in/ayushxsingh100", label: "Ayush Singh", sublabel: "LinkedIn", icon: <LinkedInIcon /> },
              { href: "https://github.com/Ayushxsingh100", label: "Ayushxsingh100", sublabel: "GitHub", icon: <GitHubIcon /> },
            ].map((link, i) => (
              <div key={i}>
                {i > 0 && (
                  <div style={{ height: "1px", background: "rgba(255,255,255,0.04)", marginInline: "0" }} />
                )}
                <ContactLink {...link} />
              </div>
            ))}
          </div>

          {/* Resume */}
          <div style={{ marginTop: "8px", paddingTop: "8px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <ResumeButton />
          </div>
        </div>

        {/* ────── RIGHT COLUMN — Form card ────── */}
        <div
          className="c8-form-card"
          style={{
            position: "relative",
            borderRadius: "28px",
            overflow: "hidden",
            /* Multi-layer box shadow for strong depth */
            boxShadow: [
              "0 2px 0 rgba(255,255,255,0.06) inset",           /* top shine */
              "0 -1px 0 rgba(0,0,0,0.4) inset",                  /* bottom shadow */
              "0 1px 0 rgba(255,255,255,0.04) inset",
              "0 24px 60px rgba(0,0,0,0.6)",
              "0 8px 24px rgba(0,0,0,0.4)",
              "0 0 80px rgba(139,92,246,0.08)",
            ].join(", "),
            transition: "transform 500ms cubic-bezier(0.16,1,0.3,1), box-shadow 500ms cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {/* Layered glass background */}
          <div style={{
            position: "absolute", inset: 0,
            background: [
              "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 50%, rgba(139,92,246,0.04) 100%)",
            ].join(", "),
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
            borderRadius: "28px",
            border: "1px solid rgba(255,255,255,0.09)",
            zIndex: 0,
          }} />

          {/* Inner purple glow at top-right */}
          <div aria-hidden style={{
            position: "absolute", top: "-30px", right: "-30px",
            width: "180px", height: "180px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)",
            filter: "blur(30px)", pointerEvents: "none", zIndex: 1,
          }} />

          {/* Card content */}
          <div style={{ position: "relative", zIndex: 2 }}>
            {/* macOS window header */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 24px",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}>
              {/* Traffic lights */}
              <div style={{ display: "flex", gap: "7px", alignItems: "center" }}>
                {[
                  { bg: "#FF5F57", shadow: "#FF5F57" },
                  { bg: "#FEBC2E", shadow: "#FEBC2E" },
                  { bg: "#28C840", shadow: "#28C840" },
                ].map(({ bg, shadow }, i) => (
                  <span key={i} style={{
                    width: "11px", height: "11px", borderRadius: "50%",
                    background: bg,
                    boxShadow: `0 0 8px ${shadow}66`,
                    display: "block", flexShrink: 0,
                  }} />
                ))}
              </div>

              {/* Title */}
              <p style={{
                fontSize: "10.5px",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
                color: "rgba(255,255,255,0.22)",
                letterSpacing: "0.08em",
                margin: 0,
              }}>
                new-enquiry.msg
              </p>

              {/* Right spacer (mirrors traffic lights) */}
              <div style={{ width: "44px" }} />
            </div>

            {/* Top gradient accent */}
            <div style={{
              height: "1px",
              background: "linear-gradient(90deg, transparent 5%, rgba(167,139,250,0.45) 30%, rgba(196,181,253,0.45) 70%, transparent 95%)",
            }} />

            {/* Form */}
            <ContactForm />
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 840px) {
          .c8-layout {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
        .c8-form-card:hover {
          transform: translateY(-3px) !important;
          box-shadow:
            0 2px 0 rgba(255,255,255,0.07) inset,
            0 -1px 0 rgba(0,0,0,0.4) inset,
            0 1px 0 rgba(255,255,255,0.05) inset,
            0 32px 80px rgba(0,0,0,0.7),
            0 12px 32px rgba(0,0,0,0.45),
            0 0 100px rgba(139,92,246,0.13) !important;
        }
      ` }} />
    </div>
  );
}

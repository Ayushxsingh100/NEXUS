"use client";

import React, { useEffect, useRef } from "react";

export default function SentConfirmation() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(16px) scale(0.98)";
    el.style.filter = "blur(6px)";
    requestAnimationFrame(() => {
      el.style.transition =
        "opacity 900ms cubic-bezier(0.16, 1, 0.3, 1), transform 900ms cubic-bezier(0.16, 1, 0.3, 1), filter 900ms cubic-bezier(0.16, 1, 0.3, 1)";
      el.style.opacity = "1";
      el.style.transform = "translateY(0) scale(1)";
      el.style.filter = "blur(0px)";
    });
  }, []);

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "52px 32px",
        minHeight: "340px",
        gap: "0",
      }}
    >
      {/* Outer glow ring */}
      <div style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "28px",
      }}>
        <div style={{
          position: "absolute",
          width: "80px", height: "80px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(192,132,252,0.15) 0%, transparent 70%)",
          filter: "blur(16px)",
        }} />
        <div style={{
          width: "56px", height: "56px", borderRadius: "50%",
          border: "1px solid rgba(192, 132, 252, 0.2)",
          background: "rgba(192, 132, 252, 0.07)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 24px rgba(192,132,252,0.12), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke="rgba(192,132,252,0.9)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>

      {/* Status eyebrow */}
      <p style={{
        fontSize: "10px",
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 600,
        letterSpacing: "0.16em",
        color: "rgba(192, 132, 252, 0.65)",
        textTransform: "uppercase",
        margin: "0 0 12px 0",
      }}>
        Sent successfully
      </p>

      {/* Main heading */}
      <h3 style={{
        fontSize: "clamp(22px, 2.8vw, 28px)",
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 700,
        letterSpacing: "-0.03em",
        color: "#ffffff",
        margin: "0 0 12px 0",
        lineHeight: 1.15,
      }}>
        Message received.
      </h3>

      {/* Subtext */}
      <p style={{
        fontSize: "14px",
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 400,
        color: "rgba(255, 255, 255, 0.38)",
        margin: "0 0 32px 0",
        lineHeight: 1.6,
        maxWidth: "220px",
      }}>
        I&apos;ll review your message and be in touch soon.
      </p>

      {/* Thin purple divider */}
      <div style={{
        width: "32px", height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(192,132,252,0.4), transparent)",
        borderRadius: "2px",
      }} />
    </div>
  );
}

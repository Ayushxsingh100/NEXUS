"use client";

import React from "react";

export default function AvailabilityPill() {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "9px",
        padding: "7px 16px 7px 10px",
        borderRadius: "100px",
        border: "1px solid rgba(74, 222, 128, 0.22)",
        background: "linear-gradient(135deg, rgba(74,222,128,0.06) 0%, rgba(34,197,94,0.03) 100%)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        boxShadow: "0 0 20px rgba(74,222,128,0.05), inset 0 1px 0 rgba(74,222,128,0.08)",
      }}
    >
      {/* Pulsing dot */}
      <span style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: "10px", height: "10px", flexShrink: 0 }}>
        <span style={{
          position: "absolute",
          width: "18px", height: "18px",
          borderRadius: "50%",
          background: "rgba(74, 222, 128, 0.2)",
          animation: "c8-pulse-ring 2.6s cubic-bezier(0.4,0,0.6,1) infinite",
        }} />
        <span style={{
          width: "8px", height: "8px", borderRadius: "50%",
          background: "radial-gradient(circle at 35% 35%, #86efac, #22c55e)",
          boxShadow: "0 0 8px rgba(74,222,128,0.6)",
          flexShrink: 0,
        }} />
      </span>

      <span style={{
        fontSize: "11.5px",
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 500,
        color: "rgba(255, 255, 255, 0.62)",
        letterSpacing: "0.02em",
        whiteSpace: "nowrap",
      }}>
        Open to internships
        <span style={{ color: "rgba(255,255,255,0.25)", margin: "0 6px" }}>·</span>
        Summer / Fall 2027
      </span>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes c8-pulse-ring {
          0%   { transform: scale(0.5); opacity: 0.9; }
          75%  { transform: scale(2.0); opacity: 0;   }
          100% { transform: scale(0.5); opacity: 0;   }
        }
      ` }} />
    </div>
  );
}

"use client";

import React from "react";

export default function ResumeButton() {
  return (
    <a
      href="/resume.pdf"
      download
      className="c8-resume-btn"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "9px",
        padding: "9px 14px 9px 0",
        textDecoration: "none",
        cursor: "pointer",
        transition: "all 280ms cubic-bezier(0.16, 1, 0.3, 1)",
        borderRadius: "10px",
      }}
    >
      {/* Icon */}
      <span
        className="c8-resume-icon-wrap"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "32px",
          height: "32px",
          borderRadius: "9px",
          border: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(255,255,255,0.03)",
          color: "rgba(255,255,255,0.35)",
          flexShrink: 0,
          transition: "all 280ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="c8-resume-arrow-icon">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      </span>

      {/* Labels */}
      <div>
        <p style={{
          fontSize: "9px",
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 600,
          letterSpacing: "0.1em",
          color: "rgba(255,255,255,0.25)",
          textTransform: "uppercase",
          margin: "0 0 1px 0",
        }}>
          Résumé
        </p>
        <p
          className="c8-resume-label"
          style={{
            fontSize: "12.5px",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 500,
            color: "rgba(255, 255, 255, 0.45)",
            letterSpacing: "0.01em",
            margin: 0,
            transition: "color 280ms ease",
          }}
        >
          Download PDF
        </p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .c8-resume-btn:hover .c8-resume-icon-wrap {
          border-color: rgba(255,255,255,0.25) !important;
          background: rgba(255,255,255,0.07) !important;
          color: rgba(255,255,255,0.8) !important;
        }
        .c8-resume-btn:hover .c8-resume-arrow-icon {
          transform: translateY(2px);
        }
        .c8-resume-btn:hover .c8-resume-label {
          color: rgba(255,255,255,0.7) !important;
        }
        .c8-resume-arrow-icon {
          transition: transform 280ms cubic-bezier(0.16,1,0.3,1);
        }
      ` }} />
    </a>
  );
}

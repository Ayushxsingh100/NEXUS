"use client";

import React from "react";

interface ContactLinkProps {
  href: string;
  label: string;
  sublabel?: string;
  icon: React.ReactNode;
  external?: boolean;
}

export default function ContactLink({ href, label, sublabel, icon, external = true }: ContactLinkProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="c8-contact-link"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "9px 12px 9px 0",
        textDecoration: "none",
        cursor: "pointer",
        borderRadius: "12px",
        transition: "all 280ms cubic-bezier(0.16, 1, 0.3, 1)",
        position: "relative",
      }}
    >
      {/* Icon wrapper */}
      <span
        className="c8-contact-icon"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "38px",
          height: "38px",
          borderRadius: "11px",
          border: "1px solid rgba(255, 255, 255, 0.07)",
          background: "rgba(255, 255, 255, 0.04)",
          color: "rgba(255, 255, 255, 0.4)",
          flexShrink: 0,
          transition: "all 280ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {icon}
      </span>

      {/* Labels */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {sublabel && (
          <p style={{
            fontSize: "10px",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 600,
            letterSpacing: "0.09em",
            color: "rgba(255, 255, 255, 0.28)",
            margin: "0 0 1px 0",
            textTransform: "uppercase",
          }}>
            {sublabel}
          </p>
        )}
        <p
          className="c8-contact-label"
          style={{
            fontSize: "13px",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 500,
            color: "rgba(255, 255, 255, 0.72)",
            margin: 0,
            lineHeight: 1.3,
            transition: "color 280ms ease",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </p>
      </div>

      {/* Arrow */}
      <svg
        className="c8-contact-arrow"
        xmlns="http://www.w3.org/2000/svg"
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          color: "rgba(255, 255, 255, 0.15)",
          flexShrink: 0,
          transition: "all 280ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>

      <style dangerouslySetInnerHTML={{ __html: `
        .c8-contact-link:hover {
          background: rgba(255, 255, 255, 0.04) !important;
          padding-left: 8px !important;
        }
        .c8-contact-link:hover .c8-contact-icon {
          border-color: rgba(255, 255, 255, 0.25) !important;
          background: rgba(255, 255, 255, 0.08) !important;
          color: rgba(255, 255, 255, 0.9) !important;
          box-shadow: 0 0 12px rgba(255, 255, 255, 0.08) !important;
        }
        .c8-contact-link:hover .c8-contact-label {
          color: rgba(255, 255, 255, 1) !important;
        }
        .c8-contact-link:hover .c8-contact-arrow {
          color: rgba(255, 255, 255, 0.5) !important;
          transform: translateX(4px) !important;
        }
      ` }} />
    </a>
  );
}

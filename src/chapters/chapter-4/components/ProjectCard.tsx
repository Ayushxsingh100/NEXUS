"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export interface ProjectData {
  number: string;
  name: string;
  description: string;
  tech: string[];
  status: string;
  secondaryStatus?: string;
  accentColor: string;
  accentBorder: string;
  accentBorderHover: string;
  accentGlow: string;
  artSrc: string;
  liveUrl: string;
  githubUrl: string;
  isTeaser?: boolean;
  teaserType?: "cooking" | "next";
  smallLabel?: string;
  highlightedText?: string;
  logoWidth?: string;
  logoHeight?: string;
  blendMode?: string;
}

interface TopProjectCardProps {
  project: ProjectData;
}

interface FeaturedProjectCardProps {
  project: ProjectData;
}

// ─── Browser Frame Placeholder for Missing Assets ───────────────────────────
function BrowserFramePlaceholder({ projectName, accentColor }: { projectName: string; accentColor: string }) {
  const screenshotFileName = projectName.toLowerCase().replace(/\s+/g, "_") + "_screenshot.png";
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#060a14",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        borderRadius: "12px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: `inset 0 0 10px rgba(0, 0, 0, 0.6), 0 0 15px ${accentColor}10`,
      }}
    >
      {/* Browser Header Bar */}
      <div
        style={{
          height: "18px",
          background: "rgba(255, 255, 255, 0.03)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          display: "flex",
          alignItems: "center",
          paddingLeft: "8px",
          gap: "4px",
        }}
      >
        <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
        <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
        <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
      </div>
      
      {/* Content area showing the missing asset message */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "12px",
          backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.01) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      >
        <span
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "9px",
            color: "rgba(255, 255, 255, 0.22)",
            textAlign: "center",
            letterSpacing: "0.05em",
          }}
        >
          [{screenshotFileName} missing]
        </span>
      </div>
    </div>
  );
}

// ─── Top row card (3 equal cards) ────────────────────────────────────────────
export function TopProjectCard({ project }: TopProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const [liveHovered, setLiveHovered] = useState(false);
  const [githubHovered, setGithubHovered] = useState(false);

  // Mouse-tracking spotlight variables
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMouseInside, setIsMouseInside] = useState(false);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCanHover(window.matchMedia("(hover: hover)").matches);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canHover) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      onMouseEnter={() => {
        setHovered(true);
        setIsMouseInside(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
        setIsMouseInside(false);
      }}
      onMouseMove={handleMouseMove}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        height: "100%", // let card stretch to fill row height
        borderRadius: "16px",
        padding: "12px 16px", // compact padding
        // Premium top-weighted border gradient using double background clip technique
        background: hovered
          ? `linear-gradient(165deg, #111f3d 0%, #080f25 100%) padding-box, linear-gradient(to bottom, ${project.accentColor}60 0%, rgba(255, 255, 255, 0.06) 100%) border-box`
          : "linear-gradient(165deg, #0d172e 0%, #060b18 100%) padding-box, linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.04) 100%) border-box",
        border: "1px solid transparent",
        // Subtle top inner highlight (inset) + outer soft shadow
        boxShadow: hovered
          ? `0 12px 30px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 15px ${project.accentGlow}`
          : "0 4px 16px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.04)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)", // hover interaction: translateY(-4px)
        transition: "transform 300ms cubic-bezier(0.16, 1, 0.3, 1), background 300ms ease, box-shadow 300ms ease",
        fontFamily: "'Poppins', sans-serif",
        cursor: "default",
        overflow: "hidden",
      }}
    >


      {/* Cursor-following radial spotlight (Desktop only, touch/mobile disabled) */}
      {canHover && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: isMouseInside ? 1 : 0,
            background: `radial-gradient(circle 90px at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.035) 0%, transparent 100%)`,
            transition: "opacity 350ms ease",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      )}

      {/* Top row: number */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0px", zIndex: 2 }}>
        <span
          style={{
            fontSize: "11px",
            fontWeight: 700,
            color: project.accentColor,
            letterSpacing: "0.02em",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          {project.number}
        </span>
      </div>

      {/* Subtle top-right aligned status & secondary status */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px", position: "absolute", top: "12px", right: "16px", zIndex: 2 }}>
        {project.secondaryStatus && (
          <span
            style={{
              fontSize: "8px",
              fontWeight: 600,
              color: "rgba(255,255,255,0.4)",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "4px",
              padding: "0px 4px",
              letterSpacing: "0.05em",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            {project.secondaryStatus}
          </span>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <div
            style={{
              width: "4px",
              height: "4px",
              borderRadius: "50%",
              background: "#2ed573",
              boxShadow: "0 0 4px rgba(46,213,115,0.7)",
            }}
          />
          <span
            style={{
              fontSize: "8px",
              fontWeight: 600,
              color: "rgba(255,255,255,0.45)",
              letterSpacing: "0.1em",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            {project.status}
          </span>
        </div>
      </div>

      {/* Logo display region */}
      <div
        style={{
          position: "relative",
          height: "130px", // consistent fixed height
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "2px", // tighten vertical layout
          marginBottom: "2px",
          overflow: "visible",
          pointerEvents: "none",
          zIndex: 2,
          // Subtle showcase zone background effect on hover
          background: hovered
            ? "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.02) 0%, transparent 70%)"
            : "none",
          transition: "background 300ms ease",
          borderRadius: "8px",
        }}
      >
        {/* Soft radial ambient glow behind the logo */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "85px",
            height: "85px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${project.accentColor}25 0%, ${project.accentColor}06 70%, transparent 100%)`,
            filter: "blur(18px)",
            opacity: hovered ? 0.50 : 0.25,
            transition: "opacity 300ms ease",
            pointerEvents: "none",
          }}
        />



        {/* Animated transparent logo container */}
        <div
          style={{
            position: "relative",
            width: project.logoWidth || "140px",
            height: project.logoHeight || "90px",
            transform: hovered ? "scale(1.03) translateY(-3px)" : "scale(1) translateY(0)", // logo moves up 3px and scales to 1.03
            transition: "transform 300ms cubic-bezier(0.16, 1, 0.3, 1)",
            pointerEvents: "none",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          <Image
            src={project.artSrc}
            alt={project.name}
            fill
            sizes={project.logoWidth || "140px"}
            style={{
              objectFit: "contain",
              objectPosition: "center",
              filter: hovered
                ? `drop-shadow(0 0 10px ${project.accentColor}b0) drop-shadow(0 0 22px ${project.accentColor}55)`
                : `drop-shadow(0 0 6px ${project.accentColor}80) drop-shadow(0 0 14px ${project.accentColor}35)`,
              transition: "filter 300ms ease",
            }}
            priority
          />
        </div>
      </div>

      {/* Project name */}
      <h3
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "14px",
          fontWeight: 800,
          color: "#ffffff",
          margin: "0 0 6px 0",
          lineHeight: 1.2,
          letterSpacing: "-0.01em",
          zIndex: 2,
        }}
      >
        {project.name}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "11px",
          fontWeight: 400,
          color: "rgba(255,255,255,0.75)",
          lineHeight: 1.35,
          margin: "0 0 6px 0",
          flexGrow: 1,
          zIndex: 2,
        }}
      >
        {project.description}
      </p>

      {/* Tech chips (Translucent tinted backgrounds) */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "6px", zIndex: 2 }}>
        {project.tech.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "8.5px",
              fontWeight: 500,
              color: project.accentColor,
              background: `${project.accentColor}18`, // translucent tint
              border: `1px solid ${project.accentColor}30`, // subtle border tint
              borderRadius: "4px",
              padding: "1px 5px",
              letterSpacing: "0.02em",
              backdropFilter: "blur(2px)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Divider */}
      <div
        style={{
          width: "100%",
          height: "1px",
          background: "rgba(255,255,255,0.10)",
          marginBottom: "6px",
          zIndex: 2,
        }}
      />

      {/* Action row (Clearer action links with subtle hover pills) */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", zIndex: 2 }}>
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setLiveHovered(true)}
          onMouseLeave={() => setLiveHovered(false)}
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "10.5px",
            fontWeight: 600,
            color: project.accentColor,
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            opacity: liveHovered ? 1 : hovered ? 0.95 : 0.78, // brighter on hover
            textShadow: liveHovered ? `0 0 8px ${project.accentColor}60` : "none",
            transition: "all 200ms ease",
            padding: "2px 6px",
            borderRadius: "4px",
            background: liveHovered ? `${project.accentColor}0f` : "transparent",
            transform: liveHovered ? "translateX(1px)" : "none",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          Live Demo{" "}
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setGithubHovered(true)}
          onMouseLeave={() => setGithubHovered(false)}
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "10.5px",
            fontWeight: 500,
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            color: githubHovered ? "#ffffff" : "rgba(255,255,255,0.72)", // brighter on hover
            transition: "all 200ms ease",
            padding: "2px 6px",
            borderRadius: "4px",
            background: githubHovered ? "rgba(255,255,255,0.06)" : "transparent",
            transform: githubHovered ? "translateY(-0.5px)" : "none",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          GitHub
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
      </div>
    </div>
  );
}

// ─── Featured bottom card (2 wider cards) ────────────────────────────────────
export function FeaturedProjectCard({ project }: FeaturedProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const [liveHovered, setLiveHovered] = useState(false);
  const [githubHovered, setGithubHovered] = useState(false);

  // Mouse-tracking spotlight variables
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMouseInside, setIsMouseInside] = useState(false);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCanHover(window.matchMedia("(hover: hover)").matches);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canHover) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // If this is one of our "coming soon" or open source teasers, handle custom styling
  if (project.isTeaser) {
    return (
      <div
        onMouseEnter={() => {
          setHovered(true);
          setIsMouseInside(true);
        }}
        onMouseLeave={() => {
          setHovered(false);
          setIsMouseInside(false);
        }}
        onMouseMove={handleMouseMove}
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "40% 60%",
          gridTemplateRows: "1fr",
          gap: "0",
          borderRadius: "16px",
          // Muted border gradient to visually differentiate WIP teasers
          background: hovered
            ? `linear-gradient(165deg, #111f3d 0%, #080f25 100%) padding-box, linear-gradient(to bottom, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 100%) border-box`
            : "linear-gradient(165deg, #0d172e 0%, #060b18 100%) padding-box, linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.04) 100%) border-box",
          border: "1px solid transparent",
          // Subtle top inner highlight + soft outer shadow
          boxShadow: hovered
            ? `0 12px 30px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 20px ${project.accentGlow}`
            : "0 4px 16px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.04)",
          transform: hovered ? "translateY(-4px)" : "translateY(0)", // hover interaction: translateY(-4px)
          transition: "transform 300ms cubic-bezier(0.16, 1, 0.3, 1), background 300ms ease, box-shadow 300ms ease",
          fontFamily: "'Poppins', sans-serif",
          cursor: "default",
          overflow: "hidden",
        }}
      >


        {/* Cursor-following radial spotlight (Desktop only, touch/mobile disabled) */}
        {canHover && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: isMouseInside ? 1 : 0,
              background: `radial-gradient(circle 90px at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.03) 0%, transparent 100%)`,
              transition: "opacity 350ms ease",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />
        )}

        {/* LEFT: teaser info (40% width column) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "12px 14px 14px 14px", // compact padding
            gridColumn: "1",
            borderRight: "1px solid rgba(255,255,255,0.06)",
            zIndex: 2,
          }}
        >
          {/* Number */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0px" }}>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: project.accentColor,
                letterSpacing: "0.02em",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {project.number}
            </span>
          </div>

          {/* Status Badge top right */}
          <div style={{ display: "flex", alignItems: "center", gap: "5px", position: "absolute", top: "12px", right: "16px" }}>
            <div
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: project.teaserType === "cooking" ? "#f59e0b" : "#22d3ee",
                boxShadow: `0 0 6px ${project.teaserType === "cooking" ? "rgba(245,158,11,0.8)" : "rgba(34,211,238,0.8)"}`,
                animation: "statusPulse 2s infinite ease-in-out",
              }}
            />
            <span
              style={{
                fontSize: "8px",
                fontWeight: 600,
                color: "rgba(255,255,255,0.72)",
                letterSpacing: "0.1em",
                fontFamily: "'Poppins', sans-serif",
                textTransform: "uppercase",
              }}
            >
              {project.status}
            </span>
          </div>

          {/* Art image centered with accent glow + edge dissolution */}
          <div
            style={{
              position: "relative",
              height: "125px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "4px",
              overflow: "visible",
              pointerEvents: "none",
            }}
          >
            {/* Soft ambient glow blob behind the image */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "145px",
                height: "145px",
                borderRadius: "50%",
                background: project.teaserType === "cooking"
                  ? "radial-gradient(circle, rgba(34, 211, 238, 0.28) 0%, rgba(59, 130, 246, 0.12) 60%, transparent 100%)"
                  : "radial-gradient(circle, rgba(244, 114, 182, 0.28) 0%, rgba(192, 132, 252, 0.12) 60%, transparent 100%)",
                filter: "blur(18px)",
                opacity: hovered ? 0.90 : 0.65,
                transition: "opacity 300ms ease",
                pointerEvents: "none",
              }}
            />
            {/* Image wrapper */}
            <div
              style={{
                position: "relative",
                width: "135px",
                height: "135px",
                transform: hovered ? "scale(1.05) translateY(-2px)" : "scale(1) translateY(0)",
                transition: "transform 300ms cubic-bezier(0.16, 1, 0.3, 1), filter 300ms ease",
                pointerEvents: "none",
                flexShrink: 0,
                // Dissolve edges into dark background
                maskImage: "radial-gradient(ellipse 85% 85% at 50% 50%, black 55%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(ellipse 85% 85% at 50% 50%, black 55%, transparent 100%)",
              }}
            >
              <Image
                src={project.artSrc}
                alt={project.name}
                fill
                sizes="135px"
                style={{
                  objectFit: "contain",
                  objectPosition: "center",
                  // Per-card drop-shadow glow matching accent colour
                  filter: project.teaserType === "cooking"
                    ? hovered
                      ? "drop-shadow(0 0 12px rgba(59,130,246,0.80)) drop-shadow(0 0 24px rgba(34,211,238,0.40))"
                      : "drop-shadow(0 0 8px rgba(59,130,246,0.55)) drop-shadow(0 0 16px rgba(34,211,238,0.25))"
                    : hovered
                      ? "drop-shadow(0 0 12px rgba(244,114,182,0.80)) drop-shadow(0 0 24px rgba(232,121,249,0.40))"
                      : "drop-shadow(0 0 8px rgba(244,114,182,0.55)) drop-shadow(0 0 16px rgba(232,121,249,0.25))",
                  transition: "filter 300ms ease",
                }}
                priority
              />
            </div>
          </div>

          {/* Teaser label / category info */}
          {project.teaserType === "cooking" ? (
            <>
              <span
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "8.5px",
                  fontWeight: 600,
                  color: project.accentColor,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "1px",
                }}
              >
                {project.smallLabel || "OPEN SOURCE"}
              </span>
              <h3
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "13px",
                  fontWeight: 800,
                  background: "linear-gradient(90deg, #22d3ee, #3b82f6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  margin: "0 0 2px 0",
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                  display: "inline-block",
                }}
              >
                {project.name}
              </h3>
            </>
          ) : (
            <>
              <span
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "8.5px",
                  fontWeight: 600,
                  color: project.accentColor,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "1px",
                }}
              >
                {project.smallLabel}
              </span>
              <h3
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#ffffff",
                  margin: "0 0 2px 0",
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                }}
              >
                {project.name}
              </h3>
            </>
          )}

          {/* Supporting description text */}
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "11px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.35,
              margin: "0",
            }}
          >
            {project.description}
          </p>
        </div>

        {/* RIGHT: Animated developer visual inside browser preview frame */}
        <div
          style={{
            gridColumn: "2",
            position: "relative",
            padding: "12px 14px 12px 14px", // compact padding
            display: "flex",
            flexDirection: "column",
            height: "100%",
            boxSizing: "border-box",
            zIndex: 2,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "#0d1527",
              border: "1px solid rgba(255, 255, 255, 0.14)",
              borderRadius: "12px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              // Soft command line inner glow + grid texture
              boxShadow: `inset 0 0 18px rgba(0, 0, 0, 0.75), inset 0 0 12px ${project.accentColor}35, 0 2px 8px rgba(0, 0, 0, 0.4)`,
              position: "relative",
            }}
          >
            {/* Browser Header Bar */}
            <div
              style={{
                height: "18px",
                background: "rgba(255, 255, 255, 0.03)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                display: "flex",
                alignItems: "center",
                paddingLeft: "8px",
                gap: "4px",
              }}
            >
              <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
              <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
              <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
            </div>

            {/* Animation Content Panel */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                padding: "12px",
                backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.012) 1px, transparent 1px)",
                backgroundSize: "12px 12px",
                justifyContent: "center",
              }}
            >
              {project.teaserType === "cooking" ? (
                /* Card 04: Sequenced Terminal Typewriter with Cyan cursor */
                <div
                  style={{
                    fontFamily: "monospace",
                    fontSize: "8.5px",
                    color: "rgba(255, 255, 255, 0.70)", // slightly brighter command text
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    textAlign: "left",
                    lineHeight: "1.35",
                  }}
                >
                  <div style={{ animation: "cookLine1 10s infinite ease-in-out" }}>
                    <span style={{ color: project.accentColor }}>&gt;</span> exploring repositories...
                  </div>
                  <div style={{ animation: "cookLine2 10s infinite ease-in-out" }}>
                    <span style={{ color: project.accentColor }}>&gt;</span> reading code...
                  </div>
                  <div style={{ animation: "cookLine3 10s infinite ease-in-out" }}>
                    <span style={{ color: project.accentColor }}>&gt;</span> understanding context...
                  </div>
                  <div style={{ animation: "cookLine4 10s infinite ease-in-out" }}>
                    <span style={{ color: project.accentColor }}>&gt;</span> fixing issues...
                  </div>
                  <div style={{ animation: "cookLine5 10s infinite ease-in-out" }}>
                    <span style={{ color: project.accentColor }}>&gt;</span> writing better code...
                  </div>
                  <div style={{ animation: "cookLine6 10s infinite ease-in-out" }}>
                    <span style={{ color: project.accentColor }}>&gt;</span> preparing PR...
                  </div>
                  <div style={{ animation: "cookLine7 10s infinite ease-in-out", color: "#ffffff", fontWeight: "bold" }}>
                    <span style={{ color: project.accentColor }}>&gt;</span> impact loading <span style={{ animation: "cursorBlink 1s infinite", color: "#22d3ee" }}>█</span>
                  </div>
                </div>
              ) : (
                /* Card 05: Sequenced Terminal Typewriter with Pink cursor */
                <div
                  style={{
                    fontFamily: "monospace",
                    fontSize: "8.5px",
                    color: "rgba(255, 255, 255, 0.70)", // slightly brighter command text
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    textAlign: "left",
                    lineHeight: "1.35",
                  }}
                >
                  <div style={{ animation: "nextLine1 10s infinite ease-in-out" }}>
                    <span style={{ color: project.accentColor }}>&gt;</span> finding interesting problems...
                  </div>
                  <div style={{ animation: "nextLine2 10s infinite ease-in-out" }}>
                    <span style={{ color: project.accentColor }}>&gt;</span> reading code...
                  </div>
                  <div style={{ animation: "nextLine3 10s infinite ease-in-out" }}>
                    <span style={{ color: project.accentColor }}>&gt;</span> understanding systems...
                  </div>
                  <div style={{ animation: "nextLine4 10s infinite ease-in-out" }}>
                    <span style={{ color: project.accentColor }}>&gt;</span> experimenting...
                  </div>
                  <div style={{ animation: "nextLine5 10s infinite ease-in-out" }}>
                    <span style={{ color: project.accentColor }}>&gt;</span> building...
                  </div>
                  <div style={{ animation: "nextLine6 10s infinite ease-in-out", color: "#ffffff", fontWeight: "bold" }}>
                    <span style={{ color: project.accentColor }}>&gt;</span> contribution loading... <span style={{ animation: "cursorBlink 1s infinite", color: project.accentColor }}>_</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Local component styles for animations */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Card 04 Terminal Animations */
            @keyframes cookLine1 {
              0%, 5% { opacity: 0; transform: translateY(2px); }
              8%, 90% { opacity: 1; transform: translateY(0); }
              93%, 100% { opacity: 0; }
            }
            @keyframes cookLine2 {
              0%, 15% { opacity: 0; transform: translateY(2px); }
              18%, 90% { opacity: 1; transform: translateY(0); }
              93%, 100% { opacity: 0; }
            }
            @keyframes cookLine3 {
              0%, 25% { opacity: 0; transform: translateY(2px); }
              28%, 90% { opacity: 1; transform: translateY(0); }
              93%, 100% { opacity: 0; }
            }
            @keyframes cookLine4 {
              0%, 35% { opacity: 0; transform: translateY(2px); }
              38%, 90% { opacity: 1; transform: translateY(0); }
              93%, 100% { opacity: 0; }
            }
            @keyframes cookLine5 {
              0%, 47% { opacity: 0; transform: translateY(2px); }
              50%, 90% { opacity: 1; transform: translateY(0); }
              93%, 100% { opacity: 0; }
            }
            @keyframes cookLine6 {
              0%, 59% { opacity: 0; transform: translateY(2px); }
              62%, 90% { opacity: 1; transform: translateY(0); }
              93%, 100% { opacity: 0; }
            }
            @keyframes cookLine7 {
              0%, 71% { opacity: 0; transform: translateY(2px); }
              74%, 90% { opacity: 1; transform: translateY(0); }
              93%, 100% { opacity: 0; }
            }

            /* Card 05 Terminal Animations */
            @keyframes nextLine1 {
              0%, 6% { opacity: 0; transform: translateY(2px); }
              10%, 90% { opacity: 1; transform: translateY(0); }
              93%, 100% { opacity: 0; }
            }
            @keyframes nextLine2 {
              0%, 18% { opacity: 0; transform: translateY(2px); }
              22%, 90% { opacity: 1; transform: translateY(0); }
              93%, 100% { opacity: 0; }
            }
            @keyframes nextLine3 {
              0%, 30% { opacity: 0; transform: translateY(2px); }
              34%, 90% { opacity: 1; transform: translateY(0); }
              93%, 100% { opacity: 0; }
            }
            @keyframes nextLine4 {
              0%, 42% { opacity: 0; transform: translateY(2px); }
              46%, 90% { opacity: 1; transform: translateY(0); }
              93%, 100% { opacity: 0; }
            }
            @keyframes nextLine5 {
              0%, 54% { opacity: 0; transform: translateY(2px); }
              58%, 90% { opacity: 1; transform: translateY(0); }
              93%, 100% { opacity: 0; }
            }
            @keyframes nextLine6 {
              0%, 66% { opacity: 0; transform: translateY(2px); }
              70%, 90% { opacity: 1; transform: translateY(0); }
              93%, 100% { opacity: 0; }
            }

            /* Blinking cursor */
            @keyframes cursorBlink {
              0%, 100% { opacity: 1; }
              50% { opacity: 0; }
            }

            /* Gentle status pulse animation */
            @keyframes statusPulse {
              0%, 100% { opacity: 0.65; transform: scale(1); }
              50% { opacity: 1; transform: scale(1.25); }
            }
          `
        }} />
      </div>
    );
  }

  // Fallback: standard full FeaturedProjectCard for non-teaser projects
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "42% 58%",
        gridTemplateRows: "1fr auto",
        gap: "0",
        borderRadius: "20px",
        background: "linear-gradient(165deg, rgba(28, 46, 82, 0.96) 0%, rgba(16, 28, 56, 0.98) 100%)",
        border: `1.5px solid ${hovered ? project.accentBorderHover : project.accentBorder}`,
        boxShadow: hovered
          ? `0 10px 30px rgba(0,0,0,0.6), 0 0 20px ${project.accentGlow}`
          : "0 4px 16px rgba(0,0,0,0.45), inset 0 1px 1px rgba(255,255,255,0.06)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "transform 250ms cubic-bezier(0.16, 1, 0.3, 1), border-color 250ms ease, box-shadow 250ms ease",
        fontFamily: "'Poppins', sans-serif",
        cursor: "default",
        overflow: "hidden",
      }}
    >
      {/* LEFT: project info (42% width column) */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "16px 20px 0 20px",
          gridColumn: "1",
          gridRow: "1",
          borderRight: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Number */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2px" }}>
          <span
            style={{
              fontSize: "12px",
              fontWeight: 700,
              color: project.accentColor,
              letterSpacing: "0.02em",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            {project.number}
          </span>
        </div>

        {/* Subtle top-right aligned status & secondary status */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", position: "absolute", top: "16px", right: "20px" }}>
          {project.secondaryStatus && (
            <span
              style={{
                fontSize: "8px",
                fontWeight: 600,
                color: "rgba(255,255,255,0.4)",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "4px",
                padding: "1px 5px",
                letterSpacing: "0.05em",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {project.secondaryStatus}
            </span>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <div
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "#2ed573",
                boxShadow: "0 0 5px rgba(46,213,115,0.7)",
              }}
            />
            <span
              style={{
                fontSize: "8px",
                fontWeight: 600,
                color: "rgba(255,255,255,0.45)",
                letterSpacing: "0.1em",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {project.status}
            </span>
          </div>
        </div>

        {/* Art image */}
        <div
          style={{
            position: "relative",
            height: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "4px",
            overflow: "visible",
            pointerEvents: "none",
          }}
        >
          {/* Soft color-matched glow behind art */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "105px",
              height: "105px",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${project.accentColor}35 0%, ${project.accentColor}06 60%, transparent 80%)`,
              filter: "blur(14px)",
              opacity: hovered ? 1.0 : 0.75,
              transition: "opacity 250ms ease",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "relative",
              width: "100px",
              height: "100px",
              transform: hovered ? "scale(1.04)" : "scale(1)",
              transition: "transform 250ms cubic-bezier(0.16, 1, 0.3, 1)",
              pointerEvents: "none",
              flexShrink: 0,
            }}
          >
            <Image
              src={project.artSrc}
              alt={project.name}
              fill
              sizes="100px"
              style={{ objectFit: "contain", objectPosition: "center" }}
              priority
            />
          </div>
        </div>

        {/* Project name */}
        <h3
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "14px",
            fontWeight: 700,
            color: "#ffffff",
            margin: "0 0 3px 0",
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
          }}
        >
          {project.name}
        </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "11.5px",
            fontWeight: 400,
            color: "rgba(255,255,255,0.60)",
            lineHeight: 1.45,
            margin: "0 0 8px 0",
            flexGrow: 1,
          }}
        >
          {project.description}
        </p>

        {/* Tech chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "12px" }}>
          {project.tech.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "9px",
                fontWeight: 500,
                color: project.accentColor,
                background: `${project.accentColor}10`,
                border: `1px solid ${project.accentColor}25`,
                borderRadius: "5px",
                padding: "1px 6px",
                letterSpacing: "0.02em",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* RIGHT: Screenshot Panel (58% width column) inside browser frame */}
      <div
        style={{
          gridColumn: "2",
          gridRow: "1",
          position: "relative",
          padding: "16px 18px 0 18px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <BrowserFramePlaceholder projectName={project.name} accentColor={project.accentColor} />
      </div>

      {/* BOTTOM: action row spanning full width */}
      <div
        style={{
          gridColumn: "1 / -1",
          gridRow: "2",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 20px 12px 20px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setLiveHovered(true)}
          onMouseLeave={() => setLiveHovered(false)}
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "11px",
            fontWeight: 600,
            color: project.accentColor,
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            opacity: liveHovered ? 1 : 0.82,
            textShadow: liveHovered ? `0 0 8px ${project.accentColor}60` : "none",
            transition: "opacity 0.2s ease, text-shadow 0.2s ease",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          Live Demo{" "}
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setGithubHovered(true)}
          onMouseLeave={() => setGithubHovered(false)}
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "11px",
            fontWeight: 500,
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            color: githubHovered ? "#ffffff" : "rgba(255,255,255,0.55)",
            transition: "opacity 0.2s ease, color 0.2s ease",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          GitHub
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
      </div>
    </div>
  );
}

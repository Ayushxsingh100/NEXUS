"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ═══════════════════════════════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════════════════════════════ */
interface MilestoneDef {
  text: string;
}

interface ChapterDef {
  year: string;
  phase: string;
  milestoneLabel: string;
  title: string;
  subtitle?: string;
  paragraph: string;
  milestones: MilestoneDef[];
  skills?: string[];
  accent: string;
  accentB: string;
  glow: string;
  image?: string;
  imageFit: "cover" | "contain" | "fill";
  imageAspect: string;
  imageCaption?: string;
  location?: string;
  duration?: string;
  role?: string;
  transitionQuote: string;
  isEpilogue?: boolean;
  companyKey?: string;
}

/* ═══════════════════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════════════════ */
const CHAPTERS: ChapterDef[] = [
  {
    year: "2024",
    phase: "Chapter I  ·  August 2024 – Present",
    milestoneLabel: "FOUNDATION",
    title: "Started My Engineering Journey",
    subtitle: "B.Tech Computer Science | UPES",
    paragraph: "",
    milestones: [],
    skills: [
      "Java",
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Git",
      "GitHub",
      "Problem Solving",
    ],
    accent: "#38bdf8",
    accentB: "#818cf8",
    glow: "rgba(56,189,248,0.28)",
    image: "/media/2024/main picture.jpg",
    imageFit: "cover",
    imageAspect: "4 / 3",
    imageCaption: "Beginning my software engineering journey at UPES.",
    location: "UPES",
    duration: "August 2024 – Present",
    role: "B.Tech Computer Science",
    transitionQuote: "Every professional step builds on the foundation.",
  },
  {
    year: "2025",
    phase: "Chapter II  ·  June 2025 – July 2025",
    milestoneLabel: "FIRST PROFESSIONAL INTERNSHIP",
    title: "Website Development Intern",
    subtitle: "AAS Society",
    paragraph: "",
    milestones: [],
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "Responsive Design",
      "Git",
      "Team Collaboration",
    ],
    accent: "#c084fc",
    accentB: "#f472b6",
    glow: "rgba(192,132,252,0.28)",
    image: "/media/Experience/AAS/AAS_v2.png",
    imageFit: "fill",
    imageAspect: "1625 / 968",
    imageCaption: "NGO website delivered during my internship together with my official internship certificate.",
    location: "AAS Society",
    duration: "June 2025 – July 2025",
    role: "Website Development Intern",
    transitionQuote: "From building frontends to scaling production apps.",
    companyKey: "AAS",
  },
  {
    year: "2026",
    phase: "Chapter III  ·  June 2026 – August 2026",
    milestoneLabel: "PRODUCTION SOFTWARE ENGINEERING",
    title: "Software Development Intern",
    subtitle: "Crobstacle Ventures LLP",
    paragraph: "",
    milestones: [],
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Payload CMS",
      "PostgreSQL",
      "Git",
      "REST APIs",
      "Performance Optimization",
      "SEO",
    ],
    accent: "#4ade80",
    accentB: "#2dd4bf",
    glow: "rgba(74,222,128,0.28)",
    image: "/media/experience/Crobstacle/Crobstacle.png",
    imageFit: "fill",
    imageAspect: "3 / 2",
    imageCaption: "Production development workspace together with my internship appreciation certificate.",
    location: "Crobstacle Ventures LLP",
    duration: "June 2026 – August 2026",
    role: "Software Development Intern",
    transitionQuote: "The best chapter is always the one being written.",
    companyKey: "Crobstacle",
  },
  {
    year: "2027",
    phase: "Next Chapter",
    milestoneLabel: "NEXT CHAPTER",
    title: "Software Engineering Internship 2027",
    paragraph:
      "The next chapter of my journey begins with an engineering team that values curiosity, ownership, and continuous learning.\n\nI'm actively seeking a Software Engineering Internship where I can contribute to real products, solve meaningful engineering challenges, and continue growing alongside experienced engineers.",
    milestones: [],
    accent: "#f97316",
    accentB: "#facc15",
    glow: "rgba(249,115,22,0.28)",
    image: undefined,
    imageFit: "cover",
    imageAspect: "1 / 1",
    transitionQuote: "",
    isEpilogue: true,
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   MILESTONE ITEM
═══════════════════════════════════════════════════════════════════════════ */
function MilestoneItem({
  text,
  accent,
  glow,
  index,
  isActive,
}: {
  text: string;
  accent: string;
  glow: string;
  index: number;
  isActive: boolean;
}) {
  return (
    <li
      className={`es5-milestone-item ${isActive ? "active" : "inactive"}`}
      style={{
        transitionDelay: `${index * 80}ms`,
        ["--accent" as any]: accent,
        ["--accent-glow" as any]: glow,
      }}
    >
      <div className="es5-milestone-dot">
        <span className="es5-milestone-inner" />
      </div>
      <span className="es5-milestone-text">
        {text}
      </span>
    </li>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SKILL CHIP
═══════════════════════════════════════════════════════════════════════════ */
function SkillChip({ label, accent }: { label: string; accent: string }) {
  return (
    <span
      className="es5-skill-chip"
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "6px 14px",
        borderRadius: "100px",
        fontSize: "12px",
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 500,
        color: "#cbd5e1",
        background: "rgba(255, 255, 255, 0.02)",
        border: "1px solid rgba(255, 255, 255, 0.06)",
        transition: "all 300ms cubic-bezier(0.16, 1, 0.3, 1)",
        cursor: "default",
        userSelect: "none",
        ["--accent-glow" as any]: `${accent}18`,
        ["--accent" as any]: accent,
      }}
    >
      {label}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PROJECT SNAPSHOT PANEL
   Renders a single high-quality framed image with a caption, metadata, and lightbox trigger.
═══════════════════════════════════════════════════════════════════════════ */
interface ProjectSnapshotPanelProps {
  src: string;
  fit: "cover" | "contain" | "fill";
  aspect: string;
  accent: string;
  glow: string;
  isActive: boolean;
  alt: string;
  caption?: string;
  location?: string;
  duration?: string;
  role?: string;
  onImageClick: () => void;
}

function ProjectSnapshotPanel({
  src,
  fit,
  aspect,
  accent,
  glow,
  isActive,
  alt,
  caption,
  location,
  duration,
  role,
  onImageClick,
}: ProjectSnapshotPanelProps) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "500px", // Increased slightly to balance year typography
        marginInline: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Label above the image */}
      <span
        style={{
          fontSize: "0.75rem",
          fontWeight: 600,
          letterSpacing: "0.12em",
          color: "rgba(255, 255, 255, 0.45)",
          marginBottom: "10px",
          textTransform: "uppercase",
          fontFamily: "'Poppins', sans-serif",
          display: "block",
        }}
      >
        PROJECT SNAPSHOT
      </span>

      {/* Ambient glow behind image */}
      <div
        style={{
          position: "absolute",
          inset: "-20px",
          borderRadius: "50%",
          background: `radial-gradient(ellipse at center, ${glow} 0%, transparent 68%)`,
          opacity: isActive ? 0.75 : 0,
          filter: "blur(40px)",
          transition: "opacity 800ms cubic-bezier(0.16, 1, 0.3, 1)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Frame Container */}
      <div
        onClick={onImageClick}
        className={`es5-image-frame es5-gallery-frame ${isActive ? "active" : "inactive"}`}
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: aspect,
          borderRadius: "24px",
          overflow: "hidden",
          border: `1px solid rgba(255, 255, 255, 0.08)`,
          boxShadow: isActive
            ? `0 32px 70px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 0 24px ${accent}08`
            : `0 12px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)`,
          transition:
            "box-shadow 700ms cubic-bezier(0.16, 1, 0.3, 1), transform 700ms cubic-bezier(0.16, 1, 0.3, 1), border-color 700ms cubic-bezier(0.16, 1, 0.3, 1)",
          transform: isActive ? "scale(1)" : "scale(0.965)",
          zIndex: 1,
          background: "#020814",
          cursor: "zoom-in",
          ["--accent" as any]: accent,
          ["--accent-glow" as any]: glow,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            overflow: "hidden",
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority={isActive}
            loading={isActive ? undefined : "lazy"}
            sizes="(max-width: 768px) 100vw, 500px"
            style={{
              objectFit: fit,
              borderRadius: "inherit",
              filter: isActive ? "none" : "grayscale(0.4) contrast(0.9) opacity(0.65)",
              transition:
                "filter 800ms cubic-bezier(0.16, 1, 0.3, 1), opacity 800ms cubic-bezier(0.16, 1, 0.3, 1), transform 800ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        </div>

        {/* Bottom vignette — depth cue */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, transparent 65%, rgba(2,8,20,0.6) 100%)",
            pointerEvents: "none",
            zIndex: 2,
            borderRadius: "inherit",
          }}
        />
      </div>

      {/* Caption below the image */}
      {caption && (
        <p
          style={{
            fontSize: "0.875rem",
            color: "rgba(255, 255, 255, 0.65)",
            lineHeight: "1.45",
            marginTop: "16px",
            textAlign: "left",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 400,
            paddingRight: "8px",
          }}
        >
          {caption}
        </p>
      )}

      {/* Elegant Metadata Row */}
      {(location || duration || role) && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            alignItems: "center",
            marginTop: "12px",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          {location && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "rgba(255, 255, 255, 0.45)", fontSize: "0.8rem" }}>
              <img src="/media/icons/location.png" alt="" style={{ width: "16px", height: "16px", objectFit: "contain", mixBlendMode: "screen" }} /> {location}
            </span>
          )}
          {location && (duration || role) && <span style={{ color: "rgba(255, 255, 255, 0.15)", fontSize: "0.8rem" }}>·</span>}

          {duration && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "rgba(255, 255, 255, 0.45)", fontSize: "0.8rem" }}>
              <img src="/media/icons/calendar.png" alt="" style={{ width: "16px", height: "16px", objectFit: "contain", mixBlendMode: "screen" }} /> {duration}
            </span>
          )}
          {duration && role && <span style={{ color: "rgba(255, 255, 255, 0.15)", fontSize: "0.8rem" }}>·</span>}

          {role && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "rgba(255, 255, 255, 0.45)", fontSize: "0.8rem" }}>
              <img src="/media/icons/role.png" alt="" style={{ width: "16px", height: "16px", objectFit: "contain", mixBlendMode: "screen" }} /> {role}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FULLSCREEN LIGHTBOX MODAL
═══════════════════════════════════════════════════════════════════════════ */
interface LightboxProps {
  src: string;
  alt: string;
  onClose: () => void;
}

function FullscreenLightbox({ src, alt, onClose }: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    // Disable body scroll when lightbox is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(2, 8, 20, 0.95)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        cursor: "zoom-out",
      }}
    >
      {/* Close button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        style={{
          position: "absolute",
          top: "24px",
          right: "24px",
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          background: "rgba(255, 255, 255, 0.05)",
          color: "rgba(255, 255, 255, 0.8)",
          fontSize: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all 300ms cubic-bezier(0.16, 1, 0.3, 1)",
          outline: "none",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.25)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
        }}
      >
        &times;
      </button>

      {/* Image container */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          maxWidth: "90vw",
          maxHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "default",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "85vw",
            height: "75vh",
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="90vw"
            style={{
              objectFit: "contain",
            }}
          />
        </div>
        {alt && (
          <p
            style={{
              color: "rgba(255, 255, 255, 0.75)",
              fontSize: "0.95rem",
              marginTop: "20px",
              textAlign: "center",
              maxWidth: "600px",
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: "0.01em",
            }}
          >
            {alt}
          </p>
        )}
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════════════════
   QUOTE STRIP
═══════════════════════════════════════════════════════════════════════════ */
function QuoteStrip({
  text,
  from,
  to,
}: {
  text: string;
  from: string;
  to: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1400px",
        marginInline: "auto",
        padding: "clamp(40px, 6vh, 72px) clamp(16px, 4vw, 60px)",
        display: "flex",
        alignItems: "center",
        gap: "32px",
      }}
    >
      <div
        style={{
          flex: 1,
          height: "1px",
          background: `linear-gradient(90deg, transparent, ${from}30)`,
        }}
      />
      <p
        style={{
          flex: "0 1 500px",
          textAlign: "center",
          fontSize: "clamp(13px, 1.25vw, 15px)",
          fontFamily: "'Poppins', sans-serif",
          fontStyle: "italic",
          fontWeight: 400,
          color: "#64748b",
          lineHeight: 1.7,
          letterSpacing: "0.01em",
          margin: 0,
        }}
      >
        &ldquo;{text}&rdquo;
      </p>
      <div
        style={{
          flex: 1,
          height: "1px",
          background: `linear-gradient(90deg, ${to}30, transparent)`,
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   EPILOGUE CARD
═══════════════════════════════════════════════════════════════════════════ */
function EpilogueCard({
  data,
  isActive,
}: {
  data: ChapterDef;
  isActive: boolean;
}) {
  return (
    <div
      data-chapter-year={data.year}
      className={`es5-card es5-epilogue-card ${isActive ? "active" : "inactive"}`}
      style={{
        width: "100%",
        borderRadius: "28px",
        padding: "clamp(48px, 6vw, 80px) clamp(24px, 5vw, 60px)",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
        borderLeft: isActive ? `1px solid rgba(255,255,255,0.08)` : `1px solid rgba(255,255,255,0.04)`,
        borderRight: isActive ? `1px solid rgba(255,255,255,0.08)` : `1px solid rgba(255,255,255,0.04)`,
        borderTop: isActive
          ? `1px solid rgba(255,255,255,0.18)`
          : `1px solid rgba(255,255,255,0.04)`,
        borderBottom: isActive
          ? `1px solid rgba(255,255,255,0.04)`
          : `1px solid rgba(255,255,255,0.04)`,
        boxShadow: isActive
          ? `0 40px 100px rgba(0,0,0,0.65), 0 0 60px ${data.glow}, inset 0 1px 0 rgba(255,255,255,0.05)`
          : `0 8px 32px rgba(0,0,0,0.15)`,
        transition: "all 800ms cubic-bezier(0.16,1,0.3,1)",
        ["--accent" as any]: data.accent,
        ["--accent-b" as any]: data.accentB,
        ["--accent-glow" as any]: data.glow,
      }}
    >
      {/* Immersive Engineering Blueprint Illustration Background */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: isActive ? 0.08 : 0,
          pointerEvents: "none",
          zIndex: 1,
          transition: "opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="epilogue-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <mask id="epilogue-mask">
            <rect width="100%" height="100%" fill="url(#epilogue-glow)" />
          </mask>
        </defs>
        <g mask="url(#epilogue-mask)">
          {/* Sleek Dot Grid instead of heavy lines */}
          <pattern id="dot-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#f97316" opacity="0.4" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#dot-grid)" />
        </g>
      </svg>

      {/* Gentle Floating Particles */}
      {isActive && (
        <>
          <div className="es5-particle" style={{ width: "6px", height: "6px", top: "20%", left: "15%", animation: "es5-float-slow 8s infinite ease-in-out" }} />
          <div className="es5-particle" style={{ width: "8px", height: "8px", top: "75%", left: "25%", animation: "es5-float-slower 11s infinite ease-in-out", background: "#facc15" }} />
          <div className="es5-particle" style={{ width: "5px", height: "5px", top: "35%", right: "18%", animation: "es5-float-slower 9s infinite ease-in-out" }} />
          <div className="es5-particle" style={{ width: "7px", height: "7px", top: "65%", right: "22%", animation: "es5-float-slow 10s infinite ease-in-out", background: "#facc15" }} />
        </>
      )}

      <div
        style={{
          position: "absolute",
          top: 0,
          left: "20%",
          right: "20%",
          height: "1.5px",
          background: `linear-gradient(90deg, transparent, ${data.accent}, ${data.accentB}, transparent)`,
          opacity: isActive ? 0.65 : 0,
          transition: "opacity 650ms ease",
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 55% 55% at 50% 60%, ${data.accent}09, transparent)`,
          opacity: isActive ? 1 : 0,
          transition: "opacity 900ms ease",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      <div
        className="es5-epilogue-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          gap: "clamp(32px, 5vw, 64px)",
          width: "100%",
          alignItems: "center",
          textAlign: "left",
          zIndex: 2,
          position: "relative",
        }}
      >
        {/* Left Column: Heading, Paragraphs, Button */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "9px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: data.accent,
                boxShadow: `0 0 8px ${data.glow}`,
              }}
            />
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                fontFamily: "'Poppins', sans-serif",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: data.accent,
              }}
            >
              {data.milestoneLabel}
            </span>
          </div>

          <h3
            style={{
              fontSize: "clamp(32px, 4.5vw, 52px)",
              fontWeight: 800,
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              color: isActive ? "#ffffff" : "rgba(255,255,255,0.4)",
              margin: "0 0 24px 0",
              transition: "color 600ms ease, transform 800ms cubic-bezier(0.16, 1, 0.3, 1)",
              transform: isActive ? "translateY(0)" : "translateY(12px)",
            }}
          >
            {data.title}
          </h3>

          {data.paragraph && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                maxWidth: "600px",
                marginBottom: "36px",
                transition: "transform 800ms cubic-bezier(0.16, 1, 0.3, 1)",
                transform: isActive ? "translateY(0)" : "translateY(16px)",
              }}
            >
              {data.paragraph.split("\n\n").map((p, idx) => (
                <p
                  key={idx}
                  style={{
                    fontSize: "clamp(14.5px, 1.4vw, 16px)",
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 400,
                    color: isActive ? "#cbd5e1" : "rgba(255,255,255,0.35)",
                    lineHeight: 1.7,
                    letterSpacing: "0.01em",
                    margin: 0,
                    transition: "color 600ms ease",
                  }}
                >
                  {p}
                </p>
              ))}
            </div>
          )}

          {/* Button wrapper with radial glow halo */}
          <div
            style={{
              position: "relative",
              opacity: isActive ? 1 : 0,
              transform: isActive ? "translateY(0)" : "translateY(24px)",
              transition: "all 600ms cubic-bezier(0.16, 1, 0.3, 1) 500ms",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "160px",
                height: "160px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(249,115,22,0.18) 0%, transparent 70%)",
                filter: "blur(24px)",
                pointerEvents: "none",
                zIndex: -1,
              }}
            />

            {/* Premium CTA Button */}
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("nexus-navigate", { detail: "chapter-8" }))}
              className="es5-epilogue-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 32px",
                borderRadius: "100px",
                fontSize: "14px",
                fontWeight: 600,
                fontFamily: "'Poppins', sans-serif",
                color: "#ffffff",
                background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                boxShadow: `0 12px 36px rgba(249, 115, 22, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.25)`,
                cursor: "pointer",
                transition: "all 300ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <span>Let's Connect</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ transition: "transform 300ms cubic-bezier(0.16, 1, 0.3, 1)" }}
                className="cta-arrow"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>

        {/* Right Column: Spec Sheet Card */}
        <div
          className="es5-spec-container"
          style={{
            width: "100%",
            opacity: isActive ? 1 : 0,
            transform: isActive ? "translateY(0)" : "translateY(24px)",
            transition: "all 700ms cubic-bezier(0.16, 1, 0.3, 1) 300ms",
          }}
        >
          <div
            className="es5-spec-card"
            style={{
              background: "rgba(10, 8, 20, 0.45)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "24px",
              boxShadow: "0 24px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.04)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header row with macOS style controls */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "rgba(255, 255, 255, 0.03)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                height: "42px",
                padding: "0 20px",
                position: "relative",
              }}
            >
              {/* macOS Window Controls */}
              <div style={{ display: "flex", gap: "8px" }}>
                <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ff5f56", display: "inline-block" }} />
                <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ffbd2e", display: "inline-block" }} />
                <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#27c93f", display: "inline-block" }} />
              </div>

              {/* Window Title */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: "11px",
                  fontWeight: 500,
                  fontFamily: "monospace",
                  color: "rgba(255, 255, 255, 0.35)",
                  letterSpacing: "0.03em",
                }}
              >
                internship.json
              </div>
            </div>

            {/* List items */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", padding: "26px 30px" }}>
              {/* Item 1 */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <span style={{ fontSize: "10.5px", fontWeight: 600, color: "rgba(255, 255, 255, 0.35)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Target Role</span>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ color: "#2dd4bf", display: "flex", alignItems: "center" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="16 18 22 12 16 6"></polyline>
                      <polyline points="8 6 2 12 8 18"></polyline>
                      <line x1="14" y1="4" x2="10" y2="20"></line>
                    </svg>
                  </span>
                  <span style={{ fontSize: "14.5px", fontWeight: 600, color: "#ffffff" }}>Software Developer Intern</span>
                </div>
              </div>

              {/* Item 2 */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <span style={{ fontSize: "10.5px", fontWeight: 600, color: "rgba(255, 255, 255, 0.35)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Timeline</span>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ color: "#f97316", display: "flex", alignItems: "center" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                  </span>
                  <span style={{ fontSize: "14.5px", fontWeight: 600, color: "#ffffff" }}>Summer / Fall 2027</span>
                </div>
              </div>

              {/* Item 3 */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <span style={{ fontSize: "10.5px", fontWeight: 600, color: "rgba(255, 255, 255, 0.35)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Workplace Mobility</span>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ color: "#c084fc", display: "flex", alignItems: "center" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </span>
                  <span style={{ fontSize: "14.5px", fontWeight: 600, color: "#ffffff" }}>Available for Relocation</span>
                </div>
                <div style={{ display: "flex", gap: "6px", marginTop: "2px" }}>
                  <span style={{ fontSize: "11px", padding: "4px 10px", borderRadius: "8px", background: "rgba(192, 132, 252, 0.08)", border: "1px solid rgba(192, 132, 252, 0.15)", color: "#c084fc", fontWeight: 500 }}>Remote</span>
                  <span style={{ fontSize: "11px", padding: "4px 10px", borderRadius: "8px", background: "rgba(192, 132, 252, 0.08)", border: "1px solid rgba(192, 132, 252, 0.15)", color: "#c084fc", fontWeight: 500 }}>On-site</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CHAPTER CARD
═══════════════════════════════════════════════════════════════════════════ */
function ChapterCard({
  data,
  isActive,
  isEven,
  onImageClick,
}: {
  data: ChapterDef;
  isActive: boolean;
  isEven: boolean;
  onImageClick: (src: string, alt: string) => void;
}) {
  const textCol = (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* Phase label */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "18px",
        }}
      >
        <div
          style={{
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            background: data.accent,
            boxShadow: `0 0 8px ${data.glow}`,
          }}
        />
        <span
          style={{
            fontSize: "11px",
            fontWeight: 700,
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: data.accent,
          }}
        >
          {data.milestoneLabel}
        </span>
      </div>

      {/* Year — massive */}
      <div
        style={{
          fontSize: "clamp(76px, 10.5vw, 124px)",
          fontWeight: 900,
          fontFamily: "'Poppins', sans-serif",
          letterSpacing: "-0.06em",
          lineHeight: 0.85,
          marginBottom: "16px",
          background: `linear-gradient(135deg, ${data.accent} 0%, ${data.accentB} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          opacity: isActive ? 1 : 0.45,
          filter: isActive ? "none" : "saturate(0.35)",
          transition: "opacity 600ms ease, filter 600ms ease",
          userSelect: "none",
        }}
      >
        {data.year}
      </div>

      {/* Chapter title */}
      <h3
        style={{
          fontSize: "clamp(24px, 3vw, 40px)",
          fontWeight: 800,
          fontFamily: "'Poppins', sans-serif",
          letterSpacing: "-0.022em",
          lineHeight: 1.2,
          color: isActive ? "#ffffff" : "rgba(255,255,255,0.4)",
          margin: "0 0 16px 0",
          transition: "color 550ms ease",
        }}
      >
        {data.title}
      </h3>

      {/* Subtitle / Institution */}
      {data.subtitle && (
        <div
          style={{
            fontSize: "14.5px",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 600,
            color: data.accent,
            marginTop: "-8px",
            marginBottom: "16px",
            letterSpacing: "0.02em",
          }}
        >
          {data.subtitle}
        </div>
      )}

      {/* Short paragraph */}
      {data.paragraph && (
        <p
          style={{
            fontSize: "clamp(13.5px, 1.35vw, 15px)",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 400,
            color: isActive ? "#cbd5e1" : "#475569",
            lineHeight: 1.75,
            margin: "0 0 28px 0",
            maxWidth: "420px",
            transition: "color 550ms ease",
          }}
        >
          {data.paragraph}
        </p>
      )}

      {/* Accent separator */}
      <div
        style={{
          width: "48px",
          height: "2px",
          background: `linear-gradient(90deg, ${data.accent}, ${data.accentB})`,
          borderRadius: "2px",
          marginBottom: "28px",
          opacity: isActive ? 1 : 0.2,
          transition: "opacity 550ms ease",
        }}
      />

      {/* Dedicated Milestones Label */}
      {data.milestones.length > 0 && (
        <div
          style={{
            fontSize: "12px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: isActive ? "#cbd5e1" : "#475569",
            marginBottom: "14px",
            transition: "color 550ms ease",
          }}
        >
          What I Learned:
        </div>
      )}

      {/* Milestone list */}
      {data.milestones.length > 0 && (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {data.milestones.map((m, i) => (
            <MilestoneItem
              key={i}
              text={m.text}
              accent={data.accent}
              glow={data.glow}
              index={i}
              isActive={isActive}
            />
          ))}
        </ul>
      )}

      {/* Skills list */}
      {data.skills && data.skills.length > 0 && (
        <div
          style={{
            marginTop: "28px",
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          {data.skills.map((skill) => (
            <SkillChip key={skill} label={skill} accent={data.accent} />
          ))}
        </div>
      )}
    </div>
  );

  const imageCol = data.image ? (
    <ProjectSnapshotPanel
      src={data.image}
      fit={data.imageFit}
      aspect={data.imageAspect}
      accent={data.accent}
      glow={data.glow}
      isActive={isActive}
      alt={data.subtitle || ""}
      caption={data.imageCaption}
      location={data.location}
      duration={data.duration}
      role={data.role}
      onImageClick={() => onImageClick(data.image!, data.subtitle || "")}
    />
  ) : null;

  return (
    <div
      data-chapter-year={data.year}
      className="es5-card"
      style={{
        width: "100%",
        borderRadius: "28px",
        background: isActive
          ? "linear-gradient(135deg, rgba(255,255,255,0.015) 0%, rgba(255,255,255,0.005) 100%)"
          : "rgba(255,255,255,0.005)",
        borderLeft: isActive ? `1px solid rgba(255,255,255,0.1)` : `1px solid rgba(255,255,255,0.04)`,
        borderRight: isActive ? `1px solid rgba(255,255,255,0.1)` : `1px solid rgba(255,255,255,0.04)`,
        borderBottom: isActive ? `1px solid rgba(255,255,255,0.1)` : `1px solid rgba(255,255,255,0.04)`,
        borderTop: isActive
          ? `1px solid rgba(255,255,255,0.15)`
          : `1px solid rgba(255,255,255,0.04)`,
        boxShadow: isActive
          ? `0 40px 100px rgba(0,0,0,0.6), 0 0 40px ${data.glow}, inset 0 1px 0 rgba(255,255,255,0.05)`
          : "0 8px 32px rgba(0,0,0,0.15)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        padding: "clamp(40px, 6vw, 70px)",
        boxSizing: "border-box",
        transition: "all 700ms cubic-bezier(0.16,1,0.3,1)",
        position: "relative",
        overflow: "hidden",
        ["--accent" as any]: data.accent,
        ["--accent-b" as any]: data.accentB,
        ["--accent-glow" as any]: data.glow,
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(148deg, rgba(255,255,255,0.025) 0%, rgba(2,8,20,0.55) 42%, ${data.accent}07 100%)`,
          opacity: isActive ? 1 : 0,
          transition: "opacity 850ms cubic-bezier(0.2,0.8,0.2,1)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: "1.5px",
          background: `linear-gradient(90deg, transparent, ${data.accent}, ${data.accentB}, transparent)`,
          opacity: isActive ? 0.65 : 0,
          transition: "opacity 620ms ease",
          borderRadius: "2px",
        }}
      />

      <div
        className={`es5-grid${isEven ? " es5-grid-rev" : ""}`}
        style={{
          display: "grid",
          gridTemplateColumns: data.image ? "1fr 1fr" : "1fr",
          gap: "clamp(40px, 6vw, 80px)",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {textCol}
        {imageCol}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════════════════════════ */
export default function EngineeringStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeYear, setActiveYear] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState<string>("");

  useEffect(() => {
    if (!sectionRef.current) return;
    const root = document.getElementById("main-content") || null;
    const observers: IntersectionObserver[] = [];

    CHAPTERS.forEach((ch) => {
      const el = sectionRef.current!.querySelector(
        `[data-chapter-year="${ch.year}"]`
      ) as HTMLElement | null;
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveYear(ch.year);
        },
        { root, threshold: 0.28, rootMargin: "-10% 0px -10% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const root = document.getElementById("main-content") || null;
    const cards = Array.from(
      sectionRef.current.querySelectorAll(".es5-card")
    ) as HTMLElement[];

    cards.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(52px)";
      el.style.transition = `opacity 880ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 110}ms,
                              transform 880ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 110}ms`;
    });

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
            obs.unobserve(entry.target);
          }
        });
      },
      { root, threshold: 0.06, rootMargin: "0px 0px -4% 0px" }
    );

    cards.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="engineering-journey"
      style={{
        width: "100%",
        boxSizing: "border-box",
        padding: "clamp(100px, 12vh, 180px) clamp(20px, 5vw, 80px)",
        position: "relative",
        background: "transparent",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          marginInline: "auto",
          marginBottom: "clamp(70px, 9vh, 120px)",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* Large Understated Radial Glow (Blue/Indigo, ~6% opacity, heavily blurred) */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            maxWidth: "900px",
            height: "260px",
            pointerEvents: "none",
            zIndex: 0,
            opacity: 0.06,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "10%",
              left: "15%",
              width: "350px",
              height: "220px",
              borderRadius: "50%",
              background: "radial-gradient(circle, #38bdf8 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "10%",
              right: "15%",
              width: "350px",
              height: "220px",
              borderRadius: "50%",
              background: "radial-gradient(circle, #818cf8 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
        </div>

        <h2
          style={{
            fontSize: "clamp(36px, 5.5vw, 72px)",
            fontWeight: 900,
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: "-0.03em",
            margin: "0 0 16px 0",
            lineHeight: 1.1,
            background: "linear-gradient(135deg, #ffffff 0%, #f3f4f6 50%, #cbd5e1 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            position: "relative",
            zIndex: 1,
          }}
        >
          The Journey So Far
        </h2>
        <p
          style={{
            fontSize: "clamp(14px, 1.5vw, 17px)",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 400,
            lineHeight: 1.75,
            letterSpacing: "0.01em",
            margin: "0 auto",
            maxWidth: "680px",
            background: "linear-gradient(135deg, #94a3b8 0%, #cbd5e1 50%, #94a3b8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            display: "inline-block",
            position: "relative",
            zIndex: 1,
          }}
        >
          From writing my first line of code to contributing to production software—every chapter marks a milestone in my engineering journey.
        </p>
      </div>

      <div
        style={{
          maxWidth: "1400px",
          marginInline: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 0,
        }}
      >
        {CHAPTERS.map((ch, i) => {
          const nextCh = CHAPTERS[i + 1];
          return (
            <React.Fragment key={ch.year}>
              {ch.isEpilogue ? (
                <EpilogueCard data={ch} isActive={activeYear === ch.year} />
              ) : (
                <ChapterCard
                  data={ch}
                  isActive={activeYear === ch.year}
                  isEven={i % 2 === 1}
                  onImageClick={(src, alt) => {
                    setLightboxImage(src);
                    setLightboxAlt(alt);
                  }}
                />
              )}
              {ch.transitionQuote && nextCh && (
                <QuoteStrip
                  text={ch.transitionQuote}
                  from={ch.accent}
                  to={nextCh.accent}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {lightboxImage && (
        <FullscreenLightbox
          src={lightboxImage}
          alt={lightboxAlt}
          onClose={() => setLightboxImage(null)}
        />
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
          /* Responsive: single column below 900px */
          @media (max-width: 900px) {
            .es5-grid {
              grid-template-columns: 1fr !important;
              gap: 44px !important;
            }
            .es5-grid-rev > *:first-child { order: 1 !important; }
            .es5-grid-rev > *:last-child  { order: 2 !important; }
            
            .es5-epilogue-grid {
              grid-template-columns: 1fr !important;
              gap: 44px !important;
            }
          }

          /* Desktop: reversed column order for alternating layout */
          .es5-grid-rev > *:first-child { order: 2; }
          .es5-grid-rev > *:last-child  { order: 1; }

          /* Card hover lift & refine styling */
          .es5-card {
            transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                        box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                        border-color 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                        background 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
          }
          .es5-card:hover {
            transform: translateY(-6px) !important;
            box-shadow: 0 42px 90px rgba(0, 0, 0, 0.75), 
                        0 0 50px var(--accent-glow), 
                        inset 0 1px 0 rgba(255, 255, 255, 0.08) !important;
            border-color: rgba(255, 255, 255, 0.15) !important;
          }

          /* Image Frame lift & inner zoom */
          .es5-image-frame {
            transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                        box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                        border-color 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
          }
          .es5-image-frame:hover {
            transform: translateY(-4px) scale(1.01) !important;
            border-color: rgba(255, 255, 255, 0.22) !important;
            box-shadow: 0 32px 70px rgba(0, 0, 0, 0.65), 
                        0 0 32px var(--accent-glow), 
                        inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
          }
          .es5-image-frame img {
            transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                        filter 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                        opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) !important;
          }
          .es5-image-frame:hover img {
            transform: scale(1.02) !important;
            filter: none !important;
            opacity: 1 !important;
          }


          /* Milestone Items */
          .es5-milestone-item {
            display: flex;
            align-items: flex-start;
            gap: 14px;
            padding: 8px 12px;
            margin-inline: -12px;
            border-radius: 12px;
            background: transparent;
            opacity: 0.25;
            transform: translateX(-8px);
            transition: opacity 800ms cubic-bezier(0.16, 1, 0.3, 1),
                        transform 800ms cubic-bezier(0.16, 1, 0.3, 1),
                        background 300ms ease !important;
          }
          .es5-milestone-item.active {
            opacity: 1;
            transform: translateX(0);
          }
          .es5-milestone-item.active:hover {
            background: rgba(255, 255, 255, 0.02);
            transform: translateX(4px);
          }
          .es5-milestone-dot {
            flex-shrink: 0;
            margin-top: 4px;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            border: 1px solid rgba(255, 255, 255, 0.15);
            background: rgba(255, 255, 255, 0.03);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 300ms ease;
          }
          .es5-milestone-item.active:hover .es5-milestone-dot {
            border-color: var(--accent);
            box-shadow: 0 0 8px var(--accent-glow);
          }
          .es5-milestone-inner {
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.25);
            transition: all 300ms ease;
          }
          .es5-milestone-item.active .es5-milestone-inner {
            background: var(--accent);
            box-shadow: 0 0 6px var(--accent);
          }
          .es5-milestone-text {
            font-size: 14.5px;
            font-family: 'Poppins', sans-serif;
            font-weight: 400;
            color: #cbd5e1;
            line-height: 1.65;
            transition: color 300ms ease;
          }
          .es5-milestone-item.inactive .es5-milestone-text {
            color: #475569;
          }
          .es5-milestone-item.active:hover .es5-milestone-text {
            color: #ffffff;
          }

          /* Epilogue Custom Recruiter Card Styling & Particle Animations */
          .es5-epilogue-card {
            background: linear-gradient(135deg, 
              rgba(12, 10, 24, 0.96) 0%, 
              rgba(26, 21, 44, 0.93) 30%, 
              rgba(2, 8, 20, 0.98) 60%, 
              rgba(43, 20, 10, 0.94) 100%
            ) !important;
            background-size: 200% 200% !important;
            animation: es5-bg-shift 12s infinite alternate ease-in-out !important;
            transition: all 800ms cubic-bezier(0.16, 1, 0.3, 1) !important;
          }
          .es5-epilogue-card::before {
            content: '';
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at 50% 100%, rgba(249,115,22,0.08) 0%, transparent 60%);
            opacity: 0;
            transition: opacity 1000ms ease;
            pointer-events: none;
            z-index: 0;
          }
          .es5-epilogue-card.active::before {
            opacity: 1;
          }
          .es5-epilogue-card.active {
            box-shadow: 0 40px 100px rgba(0,0,0,0.7), 0 0 60px rgba(249,115,22,0.22), inset 0 1px 0 rgba(255,255,255,0.08) !important;
            border-color: rgba(249,115,22,0.2) !important;
          }
          .es5-epilogue-card:hover {
            transform: translateY(-8px) !important;
            border-color: rgba(249,115,22,0.35) !important;
            box-shadow: 0 45px 110px rgba(0,0,0,0.75), 0 0 70px rgba(249,115,22,0.3), inset 0 1px 0 rgba(255,255,255,0.12) !important;
          }
          .es5-epilogue-btn:hover .cta-arrow {
            transform: translateX(5px) !important;
          }
          .es5-epilogue-btn:active {
            transform: scale(0.97) !important;
          }
          .es5-spec-card {
            transition: all 450ms cubic-bezier(0.16, 1, 0.3, 1) !important;
          }
          .es5-spec-card:hover {
            transform: translateY(-4px) !important;
            border-color: rgba(249, 115, 22, 0.25) !important;
            box-shadow: 0 30px 60px rgba(0, 0, 0, 0.45), 0 0 30px rgba(249, 115, 22, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.08) !important;
            background: rgba(14, 11, 28, 0.55) !important;
          }
          @keyframes es5-pulse {
            0%, 100% { opacity: 1; filter: drop-shadow(0 0 2px #4ade80); }
            50% { opacity: 0.5; filter: drop-shadow(0 0 6px #4ade80); }
          }
          
          .es5-particle {
            position: absolute;
            border-radius: 50%;
            pointer-events: none;
            opacity: 0.12;
            background: var(--accent);
            filter: blur(3px);
            z-index: 1;
          }
          @keyframes es5-float-slow {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            50% { transform: translateY(-15px) translateX(8px); }
          }
          @keyframes es5-float-slower {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            50% { transform: translateY(12px) translateX(-10px); }
          }
          @keyframes es5-bg-shift {
            0% { background-position: 0% 0%; }
            50% { background-position: 100% 100%; }
            100% { background-position: 0% 0%; }
          }

          /* Skill Pill Badges */
          .es5-skill-chip {
            will-change: transform, box-shadow, border-color, color;
          }
          .es5-skill-chip:hover {
            background: rgba(255, 255, 255, 0.05) !important;
            border-color: var(--accent) !important;
            color: #ffffff !important;
            box-shadow: 0 4px 12px var(--accent-glow) !important;
            transform: translateY(-2px) !important;
          }

          /* Respect Reduced Motion */
          @media (prefers-reduced-motion: reduce) {
            .es5-card,
            .es5-image-frame,
            .es5-image-frame img,
            .es5-milestone-item,
            .es5-milestone-dot,
            .es5-milestone-inner,
            .es5-milestone-text,
            .es5-skill-chip {
              transform: none !important;
              transition: opacity 300ms ease !important;
              animation: none !important;
            }
            .es5-card:hover {
              transform: none !important;
            }
            .es5-image-frame:hover {
              transform: none !important;
            }
            .es5-image-frame:hover img {
              transform: none !important;
            }
            .es5-milestone-item.active:hover {
              transform: none !important;
            }
            .es5-skill-chip:hover {
              transform: none !important;
            }
          }
        `,
        }}
      />
    </section>
  );
}

"use client";

import React, { useState } from "react";
import Image from "next/image";

interface CardItem {
  number: string;
  title: string;
  description: string;
  accent: "projects" | "about" | "blogs" | "experience" | "contact";
  className: string;
  label: string;
}

const CARDS: CardItem[] = [
  {
    number: "01",
    title: "Projects",
    description: "Things I build\nand ship.",
    accent: "projects",
    className: "node-projects",
    label: "PROJECTS",
  },
  {
    number: "02",
    title: "About",
    description: "Who I am &\nwhat drives me.",
    accent: "about",
    className: "node-about",
    label: "ABOUT",
  },
  {
    number: "03",
    title: "Blogs",
    description: "Ideas, opinions &\nrandom thoughts.",
    accent: "blogs",
    className: "node-blogs",
    label: "BLOGS",
  },
  {
    number: "04",
    title: "Experience",
    description: "My journey through\ncode & impact.",
    accent: "experience",
    className: "node-experience",
    label: "EXPERIENCE",
  },
  {
    number: "05",
    title: "Contact",
    description: "Let's connect and\nbuild something.",
    accent: "contact",
    className: "node-contact",
    label: "CONTACT",
  },
];

const ASSET_MAP = {
  projects: "/media/thoughthub/Projects.png",
  about: "/media/thoughthub/about.png",
  blogs: "/media/thoughthub/blogs.png",
  experience: "/media/thoughthub/experience.png",
  contact: "/media/thoughthub/contact.png",
};

interface ThoughtHubCardsProps {
  onCardClick: (label: string) => void;
  activeNode: string | null;
}

export function ThoughtHubCards({ onCardClick, activeNode }: ThoughtHubCardsProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const colorsMap = {
    projects: {
      text: "#22d3ee",
      border: "rgba(34, 211, 238, 0.28)",
      borderHover: "rgba(34, 211, 238, 0.65)",
      glow: "rgba(34, 211, 238, 0.18)",
    },
    about: {
      text: "#14b8a6",
      border: "rgba(20, 184, 166, 0.28)",
      borderHover: "rgba(20, 184, 166, 0.65)",
      glow: "rgba(20, 184, 166, 0.18)",
    },
    blogs: {
      text: "#c084fc",
      border: "rgba(192, 132, 252, 0.28)",
      borderHover: "rgba(192, 132, 252, 0.65)",
      glow: "rgba(192, 132, 252, 0.18)",
    },
    experience: {
      text: "#3b82f6",
      border: "rgba(59, 130, 246, 0.28)",
      borderHover: "rgba(59, 130, 246, 0.65)",
      glow: "rgba(59, 130, 246, 0.18)",
    },
    contact: {
      text: "#f472b6",
      border: "rgba(244, 114, 182, 0.28)",
      borderHover: "rgba(244, 114, 182, 0.65)",
      glow: "rgba(244, 114, 182, 0.18)",
    },
  };

  return (
    <div
      style={{
        width: "min(1720px, calc(100vw - 120px))",
        marginInline: "auto",
        fontFamily: "'Poppins', sans-serif"
      }}
    >
      <style dangerouslySetInnerHTML={{
        __html: `
        .thought-card {
          position: relative;
          display: flex;
          flex-direction: column;
          height: 360px;
          border-radius: 20px;
          padding: 16px 18px 20px 18px;
          box-sizing: border-box;
          text-align: left;
          cursor: pointer;
          outline: none;
          border: 1.5px solid transparent;
          transition: transform 0.35s cubic-bezier(0.25, 1, 0.5, 1),
                      border-color 0.35s ease,
                      background 0.35s ease,
                      box-shadow 0.35s ease;
        }
        .thought-card:hover {
          transform: translateY(-5px);
          background: linear-gradient(180deg, rgba(22, 38, 70, 0.88), rgba(10, 20, 42, 0.96)) !important;
        }
        .thought-card:focus-visible {
          outline: 2px solid #ffffff;
          outline-offset: 4px;
        }
        .card-number {
          position: absolute;
          top: 14px;
          left: 16px;
          font-family: 'Poppins', sans-serif;
          font-size: 14px;
          font-weight: 600;
          line-height: 1.0;
          z-index: 20;
        }
        .card-image-area {
          height: 140px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: visible;
          margin-top: 49px;
          margin-bottom: 10px;
          position: relative;
          pointer-events: none;
        }
        .card-image-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          transform: scale(2.80);
          transform-origin: center center;
          flex-shrink: 0;
          transition: transform 0.35s cubic-bezier(0.25, 1, 0.5, 1);
          pointer-events: none;
        }
        .thought-card:hover .card-image-wrapper {
          transform: translateY(-5px) scale(2.42);
        }
        /* Bottom text block */
        .card-content-area {
          display: flex;
          flex-direction: column;
          padding-right: 32px;
          box-sizing: border-box;
          z-index: 30;
          margin-top: auto;
        }
        .card-title {
          font-family: 'Poppins', sans-serif;
          font-size: 22px;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 4px 0;
          line-height: 1.2;
        }
        .card-desc {
          font-family: 'Poppins', sans-serif;
          font-size: 13px;
          font-weight: 400;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.65);
          margin: 0;
          white-space: pre-line;
        }
        .card-arrow {
          position: absolute;
          right: 16px;
          bottom: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid transparent;
          transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1),
                      border-color 0.3s ease,
                      opacity 0.3s ease;
          z-index: 20;
        }
        .thought-card:hover .card-arrow {
          transform: translateX(3px);
        }
        /* Desktop grid: 5 in a row */
        .thought-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 18px;
          width: 100%;
        }
        /* Tablet: 3-2 layout */
        @media (max-width: 1200px) and (min-width: 768px) {
          .thought-grid {
            grid-template-columns: repeat(6, 1fr) !important;
            gap: 14px !important;
          }
          .card-item-0, .card-item-1, .card-item-2 { grid-column: span 2 / span 2 !important; }
          .card-item-3, .card-item-4 { grid-column: span 3 / span 3 !important; }
        }
        /* Mobile: single column */
        @media (max-width: 767px) {
          .thought-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 14px !important;
          }
          .thought-card { height: 360px !important; }
        }
      `}} />

      <div className="thought-grid">
        {CARDS.map((card, idx) => {
          const colors = colorsMap[card.accent];
          const isHovered = hoveredCard === idx;
          const isActive = activeNode === card.label;
          const isInactive = activeNode !== null && activeNode !== card.label;

          return (
            <button
              key={card.number}
              onClick={() => onCardClick(card.label)}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
              disabled={isInactive}
              className={`thought-card card-item-${idx} ${card.className}`}
              style={{
                background: "linear-gradient(180deg, rgba(16, 28, 54, 0.85), rgba(8, 16, 32, 0.96))",
                borderColor: (isActive || isHovered) ? colors.borderHover : colors.border,
                boxShadow: (isActive || isHovered)
                  ? `inset 0 1px 0 rgba(255,255,255,0.06), 0 10px 30px rgba(0,0,0,0.6), 0 0 20px ${colors.glow}`
                  : "inset 0 1px 0 rgba(255,255,255,0.03), 0 4px 16px rgba(0,0,0,0.35)",
                pointerEvents: isInactive ? "none" : "auto",
                opacity: isInactive ? 0.12 : 1,
              }}
            >
              {/* Number badge */}
              <div className="card-number" style={{ color: colors.text }}>
                {card.number}
              </div>

              {/* Image Area */}
              <div className="card-image-area">
                {/* Soft accent glow behind each 3D image matching its card color */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${colors.text}24 0%, ${colors.text}06 50%, transparent 70%)`,
                    filter: "blur(14px)",
                    pointerEvents: "none",
                    zIndex: 0,
                    opacity: (isActive || isHovered) ? 1.0 : 0.65,
                    transition: "opacity 0.35s ease",
                  }}
                />

                <div className="card-image-wrapper" style={{ zIndex: 2 }}>
                  <Image
                    src={ASSET_MAP[card.accent]}
                    alt={card.title}
                    fill
                    sizes="600px"
                    priority
                    style={{
                      objectFit: "contain",
                      objectPosition: "center",
                      filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.35))"
                    }}
                  />
                </div>
              </div>

              {/* Bottom content */}
              <div className="card-content-area">
                <h3 className="card-title">{card.title}</h3>
                <p className="card-desc">{card.description}</p>
              </div>

              {/* Arrow button */}
              <div
                className="card-arrow"
                style={{
                  borderColor: (isActive || isHovered) ? `${colors.text}aa` : `${colors.text}50`,
                  borderWidth: "1.5px",
                  borderStyle: "solid",
                  color: colors.text,
                  opacity: (isActive || isHovered) ? 1 : 0.6,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

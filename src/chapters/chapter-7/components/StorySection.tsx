"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const STORY_LINES = [
  "I am a builder at heart.",
  "Writing code to turn abstract concepts into real-world products.",
  "Obsessed with backend architecture, system design, and clean code.",
  "Constantly learning, experimenting in public, and building with impact.",
];

export default function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeLines, setActiveLines] = useState<boolean[]>(new Array(STORY_LINES.length).fill(false));

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const lineElements = el.querySelectorAll(".story-line-item");
    const observers: IntersectionObserver[] = [];

    lineElements.forEach((line, idx) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveLines((prev) => {
              const updated = [...prev];
              updated[idx] = true;
              return updated;
            });
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.25, rootMargin: "0px 0px -5% 0px" }
      );
      observer.observe(line);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        width: "100%",
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        boxSizing: "border-box",
        padding: "100px 40px",
        position: "relative",
      }}
    >
      {/* Background radial highlight */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "30%",
          transform: "translateY(-50%)",
          width: "550px",
          height: "550px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34, 211, 238, 0.04) 0%, transparent 70%)",
          filter: "blur(50px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Two Column Layout */}
      <div
        className="story-two-col-layout"
        style={{
          width: "100%",
          maxWidth: "1280px",
          marginInline: "auto",
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          gap: "56px",
          zIndex: 1,
        }}
      >
        {/* Left Column: 3D Image Graphic */}
        <div
          style={{
            flex: "1 1 45%",
            position: "relative",
            minHeight: "800px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src="/media/my_story_graphic_v2.png"
            alt="My Story 3D Concept Graphic"
            fill
            sizes="(max-width: 900px) 100vw, 550px"
            style={{
              objectFit: "contain",
              objectPosition: "center",
              zIndex: 1,
            }}
            priority
          />
        </div>

        {/* Right Column: Story Text */}
        <div
          style={{
            flex: "1 1 50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* Lines wrapper */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "36px",
            }}
          >
            {STORY_LINES.map((line, idx) => {
              const isActive = activeLines[idx];
              return (
                <div
                  key={idx}
                  className={`story-line-item ${isActive ? "active" : ""}`}
                >
                  {line}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .story-line-item {
            font-size: clamp(22px, 3.2vw, 42px);
            font-weight: 800;
            line-height: 1.35;
            letter-spacing: -0.025em;
            font-family: 'Poppins', sans-serif;
            transition: all 600ms cubic-bezier(0.16, 1, 0.3, 1);
            cursor: default;
            color: rgba(255, 255, 255, 0.08);
            filter: blur(6px);
            transform: translateX(-20px);
          }
          .story-line-item.active {
            filter: blur(0px);
            transform: translateX(0);
            background: linear-gradient(90deg, #ffffff 30%, #a5f3fc 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            color: transparent;
          }
          .story-line-item.active:hover {
            transform: translateX(12px);
            background: linear-gradient(90deg, #ffffff 0%, #22d3ee 50%, #c084fc 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            color: transparent;
          }
          @media (max-width: 900px) {
            .story-two-col-layout {
              flex-direction: column !important;
              align-items: stretch !important;
              gap: 36px !important;
            }
          }
        `
      }} />
    </section>
  );
}


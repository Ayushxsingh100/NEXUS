"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import DepthCanvasTwo from "./components/DepthCanvasTwo";
import QuestionCard from "./components/QuestionCard";
import QuestionSequence from "./components/QuestionSequence";
import FinalMessage from "./components/FinalMessage";
import ContinuePrompt from "./components/ContinuePrompt";
import BlackScreen from "../chapter-1/components/BlackScreen";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ChapterTwoProps {
  onTransition: () => void;
}

export default function ChapterTwo({ onTransition }: ChapterTwoProps) {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [isContinueActive, setIsContinueActive] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const sceneParamsRef = useRef({
    cameraZ: 11,
    lightIntensity: 0,
    gridOpacity: 0,
  });

  const isScrollingRef = useRef(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const prefersReduced = useReducedMotion();

  const triggerExitTransition = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const tl = gsap.timeline({
      onComplete: () => {
        onTransition();
      }
    });

    // Symmetrical fade-out
    tl.to(["#question-card-why", ".chapter-2-q", "#chapter-2-curiosity", "#chapter-2-answers", "#chapter-2-continue"], {
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
    }, 0)
      .to(sceneParamsRef.current, {
        lightIntensity: 0,
        gridOpacity: 0,
        cameraZ: 7.0, // zoom forward subtly into Chapter III
        duration: 1.0,
        ease: "power2.inOut",
      }, 0)
      .to("#black-screen", {
        opacity: 1,
        duration: 1.0,
        ease: "power2.inOut",
      }, 0.2);
  };

  // Scroll/gesture advancement listener
  useEffect(() => {
    if (!container || isTransitioning) return;

    const timeline = timelineRef.current;
    if (!timeline) return;

    let touchStartY = 0;
    const LABELS = ["why", "q1", "q2", "q3", "q4", "q5", "q6", "curiosity", "answers", "continue"];

    const advanceTimeline = () => {
      if (isContinueActive) {
        triggerExitTransition();
        return;
      }

      if (isScrollingRef.current) return;
      isScrollingRef.current = true;

      const currentTime = timeline.time();
      const nextLabel = LABELS.find(
        (label) => timeline.getLabelTime(label) > currentTime + 0.15
      );

      if (nextLabel) {
        const targetTime = timeline.getLabelTime(nextLabel);
        gsap.to(timeline, {
          time: targetTime,
          duration: prefersReduced ? 0.05 : 0.8,
          ease: "power2.out",
          onComplete: () => {
            isScrollingRef.current = false;
          },
        });
      } else {
        isScrollingRef.current = false;
        triggerExitTransition();
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 10) {
        advanceTimeline();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      if (touchStartY - touchY > 30) {
        advanceTimeline();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        advanceTimeline();
      }
    };

    window.addEventListener("wheel", handleWheel);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [container, isContinueActive, isTransitioning, prefersReduced]);

  useGSAP(
    () => {
      if (!container) return;
      if (!sceneParamsRef.current) return;

      const masterTl = gsap.timeline({
        defaults: { ease: "power1.inOut" },
      });

      if (prefersReduced) {
        // --- REDUCED MOTION ACCESS PATH ---
        masterTl
          .to(sceneParamsRef.current, { cameraZ: 9.0, lightIntensity: 1.2, gridOpacity: 0, duration: 0.1 })
          .set(["#question-card-why", ".chapter-2-q", "#chapter-2-curiosity", "#chapter-2-answers", "#chapter-2-continue"], { opacity: 0 })
          .to("#black-screen", { opacity: 0, duration: 0.3 }, 0.2)
          
          .addLabel("start")
          // WHY
          .to("#question-card-why", { opacity: 1, duration: 0.3 }, 0.5)
          .addLabel("why")
          .to("#question-card-why", { opacity: 0, duration: 0.3 }, 1.8)
          
          // Q1
          .fromTo(".chapter-2-q-1", { opacity: 0 }, { opacity: 1, duration: 0.3 }, 2.2)
          .addLabel("q1")
          .to(".chapter-2-q-1", { opacity: 0, duration: 0.3 }, 3.5)
          
          // Q2
          .fromTo(".chapter-2-q-2", { opacity: 0 }, { opacity: 1, duration: 0.3 }, 3.8)
          .addLabel("q2")
          .to(".chapter-2-q-2", { opacity: 0, duration: 0.3 }, 5.1)
          
          // Q3
          .fromTo(".chapter-2-q-3", { opacity: 0 }, { opacity: 1, duration: 0.3 }, 5.4)
          .addLabel("q3")
          .to(".chapter-2-q-3", { opacity: 0, duration: 0.3 }, 6.7)
          
          // Q4
          .fromTo(".chapter-2-q-4", { opacity: 0 }, { opacity: 1, duration: 0.3 }, 7.0)
          .addLabel("q4")
          .to(".chapter-2-q-4", { opacity: 0, duration: 0.3 }, 8.3)
          
          // Q5
          .fromTo(".chapter-2-q-5", { opacity: 0 }, { opacity: 1, duration: 0.3 }, 8.6)
          .addLabel("q5")
          .to(".chapter-2-q-5", { opacity: 0, duration: 0.3 }, 9.9)
          
          // Q6
          .fromTo(".chapter-2-q-6", { opacity: 0 }, { opacity: 1, duration: 0.3 }, 10.2)
          .addLabel("q6")
          .to(".chapter-2-q-6", { opacity: 0, duration: 0.3 }, 11.5)
          
          // Curiosity
          .fromTo("#chapter-2-curiosity", { opacity: 0 }, { opacity: 1, duration: 0.3 }, 11.8)
          .addLabel("curiosity")
          .to("#chapter-2-curiosity", { opacity: 0, duration: 0.3 }, 13.1)
          
          // Answers
          .fromTo("#chapter-2-answers", { opacity: 0 }, { opacity: 1, duration: 0.3 }, 13.4)
          .addLabel("answers")
          .to("#chapter-2-answers", { opacity: 0, duration: 0.3 }, 14.7)
          
          // Continue
          .to("#chapter-2-continue", { opacity: 0.6, duration: 0.3 }, 15.0)
          .addLabel("continue")
          .call(() => setIsContinueActive(true), [], 15.2);
        
        timelineRef.current = masterTl;
        return;
      }

      // --- CINEMATIC MOTION PATH ---
      masterTl
        // Shutter opens
        .to("#black-screen", { opacity: 0, duration: 1.0, ease: "power2.inOut" }, 0.5)
        // Camera moves forward continuously
        .to(sceneParamsRef.current, { cameraZ: 8.5, duration: 22.0, ease: "sine.out" }, 0.5)
        // Spotlight glow grows softly
        .to(sceneParamsRef.current, { lightIntensity: 1.2, duration: 3.5, ease: "power2.out" }, 0.5)
        
        .addLabel("start")
        // WHY?
        .to("#question-card-why", { opacity: 1, scale: 1.02, duration: 1.5, ease: "power2.out" }, 1.0)
        .addLabel("why")
        .to("#question-card-why", { opacity: 0, y: -20, duration: 1.0, ease: "power2.in" }, 3.5)
        
        // Symmetrical slide-ups and floor grid fade-in
        .to(sceneParamsRef.current, { gridOpacity: 0.12, duration: 2.0 }, 4.5)
        
        // Question 1
        .fromTo(".chapter-2-q-1", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" }, 4.5)
        .addLabel("q1")
        .to(".chapter-2-q-1", { opacity: 0, y: -15, duration: 1.0, ease: "power2.in" }, 5.8)
        
        // Question 2
        .fromTo(".chapter-2-q-2", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" }, 6.2)
        .addLabel("q2")
        .to(".chapter-2-q-2", { opacity: 0, y: -15, duration: 1.0, ease: "power2.in" }, 7.5)
        
        // Question 3
        .fromTo(".chapter-2-q-3", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" }, 7.9)
        .addLabel("q3")
        .to(".chapter-2-q-3", { opacity: 0, y: -15, duration: 1.0, ease: "power2.in" }, 9.2)
        
        // Question 4
        .fromTo(".chapter-2-q-4", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" }, 9.6)
        .addLabel("q4")
        .to(".chapter-2-q-4", { opacity: 0, y: -15, duration: 1.0, ease: "power2.in" }, 10.9)
        
        // Question 5
        .fromTo(".chapter-2-q-5", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" }, 11.3)
        .addLabel("q5")
        .to(".chapter-2-q-5", { opacity: 0, y: -15, duration: 1.0, ease: "power2.in" }, 12.6)
        
        // Question 6
        .fromTo(".chapter-2-q-6", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" }, 13.0)
        .addLabel("q6")
        .to(".chapter-2-q-6", { opacity: 0, y: -15, duration: 1.0, ease: "power2.in" }, 14.3)
        
        // Scene 3: Curiosity
        .fromTo("#chapter-2-curiosity", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }, 15.0)
        .addLabel("curiosity")
        .to("#chapter-2-curiosity", { opacity: 0, y: -15, duration: 1.0, ease: "power2.in" }, 17.2)
        
        // Scene 4: Every Answer
        .fromTo("#chapter-2-answers", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }, 18.0)
        .addLabel("answers")
        .to("#chapter-2-answers", { opacity: 0, y: -15, duration: 1.2, ease: "power2.in" }, 20.2)
        
        // Scene 5: Continue Prompt
        .to(sceneParamsRef.current, { lightIntensity: 0, gridOpacity: 0, duration: 1.5, ease: "power2.out" }, 20.5)
        .to("#chapter-2-continue", { opacity: 0.6, duration: 1.5, ease: "power2.out" }, 20.5)
        .addLabel("continue")
        .call(() => setIsContinueActive(true), [], 21.0);

      timelineRef.current = masterTl;
    },
    { scope: container ?? undefined, dependencies: [container, prefersReduced] }
  );

  return (
    <div
      ref={setContainer}
      className="relative w-full h-screen overflow-hidden bg-black text-white font-sans"
    >
      {/* 3D background */}
      <DepthCanvasTwo sceneParamsRef={sceneParamsRef} />

      {/* Subcomponents for each scene */}
      <QuestionCard />
      <QuestionSequence />
      <FinalMessage />
      
      <ContinuePrompt
        onTransition={triggerExitTransition}
        isActive={isContinueActive}
      />

      {/* Fullscreen blackout overlay */}
      <BlackScreen />
    </div>
  );
}

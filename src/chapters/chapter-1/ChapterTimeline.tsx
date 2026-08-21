"use client";

import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ChapterTimelineProps {
  container: HTMLDivElement;
  sceneParamsRef: React.RefObject<{
    cameraZ: number;
    lightIntensity: number;
    gridOpacity: number;
  }>;
  onTimelineComplete: () => void;
}

export default function ChapterTimeline({
  container,
  sceneParamsRef,
  onTimelineComplete,
}: ChapterTimelineProps) {
  const prefersReduced = useReducedMotion();

  useGSAP(
    () => {
      if (!sceneParamsRef.current) return;

      const masterTl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: onTimelineComplete,
      });

      if (prefersReduced) {
        // --- REDUCED MOTION TIMELINE (Comfortable, instant opacity transitions) ---
        masterTl
          // Set initial scene variables instantly
          .to(sceneParamsRef.current, { cameraZ: 8.2, lightIntensity: 1.6, gridOpacity: 0, duration: 0.1 })
          .set(["#hero-left-content", "#hero-right-content", "#hero-bottom-content"], { opacity: 0 })
          
          // Step 1: Open black screen
          .to("#black-screen", { opacity: 0, duration: 0.4 }, 0.5)
          
          // Step 2: Show breathing dot briefly
          .to("#breathing-dot", { opacity: 0.8, duration: 0.3 }, 0.8)
          .to("#breathing-dot", { opacity: 0, duration: 0.3 }, 1.5)
          
          // Step 3: Manifesto lines fade-in/fade-out in center (no vertical displacement)
          .to(".manifesto-line-1", { opacity: 1, duration: 0.4 }, 1.8)
          .to(".manifesto-line-1", { opacity: 0, duration: 0.4 }, 3.0)
          
          .to(".manifesto-line-2", { opacity: 1, duration: 0.4 }, 3.3)
          .to(".manifesto-line-2", { opacity: 0, duration: 0.4 }, 4.5)
          
          .to(".manifesto-line-3", { opacity: 1, duration: 0.4 }, 4.8)
          .to(".manifesto-line-3", { opacity: 0, duration: 0.4 }, 6.0)
          
          .to(".manifesto-line-4", { opacity: 1, duration: 0.4 }, 6.3)
          .to(".manifesto-line-4", { opacity: 0, duration: 0.4 }, 7.5)
          
          // Step 4: Instantly reveal rebuilt components
          .to("#hero-left-content", { opacity: 1, duration: 0.4 }, 8.0)
          .to("#hero-right-content", { opacity: 1, duration: 0.4 }, 8.2)
          .to("#hero-bottom-content", { opacity: 1, duration: 0.4 }, 8.4);

        return;
      }

      // --- CINEMATIC MOTION TIMELINE ---
      
      // --- SCENE 1: The Void (0s - 1.0s) ---
      masterTl.to("#black-screen", { opacity: 0, duration: 0.8 }, 1.0);

      // --- SCENE 2: Meditative Breathing Dot (1.0s - 4.0s) ---
      masterTl
        .to("#breathing-dot", { opacity: 0.6, duration: 0.5 }, 1.0)
        // Single deep, slow inhale (1.2 seconds)
        .to("#breathing-dot", { scale: 1.6, opacity: 0.95, duration: 1.2, ease: "sine.inOut" }, 1.5)
        // Single deep, slow exhale & merge (1.3 seconds)
        .to("#breathing-dot", { scale: 0.4, opacity: 0.0, duration: 1.3, ease: "sine.inOut" }, 2.7);

      // --- SCENE 3: The Manifesto Thought Elevator (3.8s - 10.5s) ---
      masterTl
        // Line 1
        .fromTo(".manifesto-line-1", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" }, 3.8)
        .to(".manifesto-line-1", { opacity: 0, y: -15, duration: 1.0, ease: "power2.in" }, 5.0)
        
        // Line 2
        .fromTo(".manifesto-line-2", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" }, 5.3)
        .to(".manifesto-line-2", { opacity: 0, y: -15, duration: 1.0, ease: "power2.in" }, 6.5)
        
        // Line 3
        .fromTo(".manifesto-line-3", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" }, 6.8)
        .to(".manifesto-line-3", { opacity: 0, y: -15, duration: 1.0, ease: "power2.in" }, 8.0)
        
        // Line 4
        .fromTo(".manifesto-line-4", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" }, 8.3)
        .to(".manifesto-line-4", { opacity: 0, y: -15, duration: 1.0, ease: "power2.in" }, 9.5);

      // --- SCENE 4: Genesis Rebuilt Hero Reveal (10.0s - 14.5s) ---
      masterTl
        // Fade in grid and camera movement
        .to(sceneParamsRef.current, { gridOpacity: 0.12, duration: 3.0, ease: "power2.out" }, 10.0)
        .to(sceneParamsRef.current, { cameraZ: 8.2, duration: 5.2, ease: "sine.inOut" }, 10.0)
        .to(sceneParamsRef.current, { lightIntensity: 1.6, duration: 2.8, ease: "power2.out" }, 10.0)
        
        // Left column content
        .fromTo("#hero-left-content", 
          { opacity: 0, x: -35 }, 
          { opacity: 1, x: 0, duration: 1.6, ease: "power3.out" }, 
          10.2
        )
        
        // Right column artwork & floating cards
        .fromTo("#hero-right-content", 
          { opacity: 0, scale: 0.96 }, 
          { opacity: 1, scale: 1, duration: 2.0, ease: "power3.out" }, 
          10.6
        )
        
        // Bottom interactive mouse indicator
        .fromTo("#hero-bottom-content", 
          { opacity: 0, y: 25 }, 
          { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }, 
          11.8
        );
    },
    { scope: container, dependencies: [prefersReduced] }
  );

  return null;
}

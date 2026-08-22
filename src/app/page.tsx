"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const ChapterOne = dynamic(() => import("@/chapters/chapter-1/ChapterOne"), { ssr: false });
// ChapterTwo import removed
const ChapterThree = dynamic(() => import("@/chapters/chapter-3/ChapterThree"), { ssr: false });
const ChapterFour = dynamic(() => import("@/chapters/chapter-4/ChapterFour"), { ssr: false });
const ChapterFive = dynamic(() => import("@/chapters/chapter-5/ChapterFive"), { ssr: false });
const ChapterSix = dynamic(() => import("@/chapters/chapter-6/ChapterSix"), { ssr: false });
const ChapterSeven = dynamic(() => import("@/chapters/chapter-7/ChapterSeven"), { ssr: false });
const ChapterEight = dynamic(() => import("@/chapters/chapter-8/ChapterEight"), { ssr: false });
const Epilogue = dynamic(() => import("@/chapters/epilogue/Epilogue"), { ssr: false });

import { GlobalHeader } from "@/components/system/Shell/GlobalHeader";
import { GlobalNavigationDrawer } from "@/components/system/Shell/GlobalNavigationDrawer";
import { TransitionLayer, useTransitionLayer } from "@/components/system/TransitionLayer";

export default function Home() {
  type ChapterType = "chapter-1" | "chapter-3" | "chapter-4" | "chapter-5" | "chapter-6" | "chapter-7" | "chapter-8" | "epilogue";

  const [activeChapter, setActiveChapter] = useState<ChapterType>("chapter-1");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const transitionRef = useRef<HTMLDivElement>(null);
  const { transitionTo } = useTransitionLayer(transitionRef);

  const handleGlobalNavigate = (chapterId: string) => {
    setIsMenuOpen(false);
    transitionTo(() => {
      setActiveChapter(chapterId as ChapterType);
    });
  };

  useEffect(() => {
    const handleNavigationEvent = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        handleGlobalNavigate(customEvent.detail);
      }
    };
    window.addEventListener("nexus-navigate", handleNavigationEvent);
    return () => window.removeEventListener("nexus-navigate", handleNavigationEvent);
  }, []);

  // Transitions between chapters are now delegated directly to interactive component callbacks.

  // Intercept click on the PROJECTS node in Chapter III to trigger the transition to Chapter IV
  useEffect(() => {
    if (activeChapter !== "chapter-3") return;

    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.classList.contains("node-projects") || target.closest(".node-projects"))) {
        // PROJECTS was clicked.
        // Wait 2.8s for Chapter III's camera zoom and fade-to-black to complete, then swap components.
        const timer = setTimeout(() => {
          handleGlobalNavigate("chapter-4");
        }, 2800);
        return () => clearTimeout(timer);
      }
    };

    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, [activeChapter]);

  // Intercept click on the EXPERIENCE node in Chapter III to trigger the transition to Chapter V
  useEffect(() => {
    if (activeChapter !== "chapter-3") return;

    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.classList.contains("node-experience") || target.closest(".node-experience"))) {
        // EXPERIENCE was clicked.
        // Wait 2.8s for Chapter III's camera zoom and fade-to-black to complete, then swap components.
        const timer = setTimeout(() => {
          handleGlobalNavigate("chapter-5");
        }, 2800);
        return () => clearTimeout(timer);
      }
    };

    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, [activeChapter]);

  // Intercept click on the BLOGS node in Chapter III to trigger the transition to Chapter VI
  useEffect(() => {
    if (activeChapter !== "chapter-3") return;

    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.classList.contains("node-blogs") || target.closest(".node-blogs"))) {
        // BLOGS was clicked.
        // Wait 2.8s for Chapter III's camera zoom and fade-to-black to complete, then swap components.
        const timer = setTimeout(() => {
          handleGlobalNavigate("chapter-6");
        }, 2800);
        return () => clearTimeout(timer);
      }
    };

    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, [activeChapter]);

  // Intercept click on the ABOUT node in Chapter III to trigger the transition to Chapter VII
  useEffect(() => {
    if (activeChapter !== "chapter-3") return;

    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.classList.contains("node-about") || target.closest(".node-about"))) {
        // ABOUT was clicked.
        // Wait 2.8s for Chapter III's camera zoom and fade-to-black to complete, then swap components.
        const timer = setTimeout(() => {
          handleGlobalNavigate("chapter-7");
        }, 2800);
        return () => clearTimeout(timer);
      }
    };

    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, [activeChapter]);

  // Intercept click on the CONTACT node in Chapter III to trigger the transition to Chapter VIII
  useEffect(() => {
    if (activeChapter !== "chapter-3") return;

    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.classList.contains("node-contact") || target.closest(".node-contact"))) {
        // CONTACT was clicked.
        // Wait 2.8s for Chapter III's camera zoom and fade-to-black to complete, then swap components.
        const timer = setTimeout(() => {
          handleGlobalNavigate("chapter-8");
        }, 2800);
        return () => clearTimeout(timer);
      }
    };

    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, [activeChapter]);

  const handleReturnToChapterThree = () => {
    handleGlobalNavigate("chapter-3");
  };

  const handleCompleteJourney = () => {
    handleGlobalNavigate("epilogue");
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <GlobalHeader
        activeChapter={activeChapter}
        isOpen={isMenuOpen}
        onToggleMenu={toggleMenu}
      />
      
      <GlobalNavigationDrawer
        isOpen={isMenuOpen}
        activeChapter={activeChapter}
        onClose={toggleMenu}
        onNavigate={handleGlobalNavigate}
      />

      <main id="main-content" className={`w-full h-screen bg-black relative ${activeChapter === "chapter-7" ? "overflow-y-auto" : "overflow-hidden"}`}>
        {activeChapter === "chapter-1" && (
          <ChapterOne onComplete={() => handleGlobalNavigate("chapter-3")} />
        )}

        {activeChapter === "chapter-3" && <ChapterThree />}

        {activeChapter === "chapter-4" && (
          <ChapterFour onReturn={handleReturnToChapterThree} />
        )}

        {activeChapter === "chapter-5" && (
          <ChapterFive onReturn={handleReturnToChapterThree} />
        )}

        {activeChapter === "chapter-6" && (
          <ChapterSix onReturn={handleReturnToChapterThree} />
        )}

        {activeChapter === "chapter-7" && (
          <ChapterSeven
            onReturn={handleReturnToChapterThree}
            onContact={() => handleGlobalNavigate("chapter-8")}
          />
        )}

        {activeChapter === "chapter-8" && (
          <ChapterEight
            onReturn={handleReturnToChapterThree}
            onCompleteJourney={handleCompleteJourney}
          />
        )}

        {activeChapter === "epilogue" && <Epilogue />}
      </main>

      <TransitionLayer ref={transitionRef} variant="dissolve" />
    </>
  );
}

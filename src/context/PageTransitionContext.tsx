"use client";

import React, { createContext, useContext, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { TransitionLayer } from "@/components/system/TransitionLayer";

interface PageTransitionContextProps {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  navigateTo: (path: string) => void;
  markPageLoaded: () => void;
}

const PageTransitionContext = createContext<PageTransitionContextProps | undefined>(undefined);

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const transitionRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const navigateTo = useCallback(async (path: string) => {
    setIsMenuOpen(false);
    const el = transitionRef.current;
    if (!el) {
      router.push(path);
      return;
    }

    const { default: gsap } = await import("gsap");
    await gsap.to(el, {
      opacity: 1,
      duration: 0.45,
      ease: "power2.inOut",
    });

    router.push(path);
  }, [router]);

  const markPageLoaded = useCallback(async () => {
    const el = transitionRef.current;
    if (!el) return;

    // Wait a brief frame to allow the component to render
    await new Promise((resolve) => requestAnimationFrame(resolve));

    const { default: gsap } = await import("gsap");
    await gsap.to(el, {
      opacity: 0,
      duration: 0.45,
      ease: "power2.inOut",
    });
  }, []);

  return (
    <PageTransitionContext.Provider value={{ isMenuOpen, setIsMenuOpen, navigateTo, markPageLoaded }}>
      {children}
      <TransitionLayer ref={transitionRef} variant="dissolve" />
    </PageTransitionContext.Provider>
  );
}

export function usePageTransition() {
  const context = useContext(PageTransitionContext);
  if (!context) {
    throw new Error("usePageTransition must be used within a PageTransitionProvider");
  }
  return context;
}

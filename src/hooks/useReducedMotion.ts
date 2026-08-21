"use client";

import { useEffect, useState } from "react";

/**
 * useReducedMotion
 *
 * Returns `true` if the user has requested reduced motion via their OS
 * or browser accessibility settings (`prefers-reduced-motion: reduce`).
 *
 * Use this hook to:
 *   - Disable ambient drift animations in the Environment
 *   - Shorten or skip chapter transition durations
 *   - Provide immediate state changes instead of animated transitions
 *
 * SSR-safe: Returns `false` on the server (no motion assumed present).
 * Reactive: Updates instantly when the user changes their system preference.
 *
 * @example
 * const prefersReduced = useReducedMotion();
 *
 * useEffect(() => {
 *   if (prefersReduced) return; // skip animation
 *   gsap.to(ref.current, { ... });
 * }, [prefersReduced]);
 */
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState<boolean>(() => {
    // SSR guard: window is undefined during server render
    if (typeof window === "undefined") return false;
    const override = localStorage.getItem("prefers-reduced-motion");
    if (override !== null) return override === "true";
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleSystemChange = (e: MediaQueryListEvent) => {
      const override = localStorage.getItem("prefers-reduced-motion");
      if (override === null) {
        setPrefersReduced(e.matches);
      }
    };

    const handleCustomChange = () => {
      const override = localStorage.getItem("prefers-reduced-motion");
      if (override !== null) {
        setPrefersReduced(override === "true");
      } else {
        setPrefersReduced(mq.matches);
      }
    };

    mq.addEventListener("change", handleSystemChange);
    window.addEventListener("motion-preference-changed", handleCustomChange);

    // Initial sync
    handleCustomChange();

    return () => {
      mq.removeEventListener("change", handleSystemChange);
      window.removeEventListener("motion-preference-changed", handleCustomChange);
    };
  }, []);

  return prefersReduced;
}

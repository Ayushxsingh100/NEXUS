"use client";

import React, { forwardRef, useCallback } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { colors } from "@/design/colors";
import { zIndex } from "@/design/zIndex";
import { motion } from "@/design/motion";

export type TransitionVariant = "fade" | "dissolve";

export interface TransitionLayerProps {
  /**
   * Visual variant.
   * "fade"     — simple opacity black overlay (standard chapter transition)
   * "dissolve" — opacity + subtle blur (cinematic chapter-to-chapter)
   */
  variant?: TransitionVariant;
  /**
   * Initial opacity state. Default: 0 (transparent).
   * Set to 1 to render as a black screen (for use as a mount blocker).
   */
  initialOpacity?: 0 | 1;
  /** Optional className. */
  className?: string;
}

/**
 * TransitionLayer
 *
 * Full-screen overlay used for chapter transitions.
 * Exposes a ref for direct GSAP control by the chapter orchestration logic.
 *
 * Usage pattern:
 *   1. Hold a ref to this component
 *   2. Use `animationPresets.chapterTransition(ref.current, ...)` to animate
 *   3. The layer sits above all content at zIndex.modal
 *
 * prefers-reduced-motion:
 *   When active, the layer cannot be faded in via GSAP.
 *   The chapter orchestration should check `useReducedMotion()` and
 *   use an instant swap (opacity: 1 → content change → opacity: 0 at 0ms)
 *   rather than an animated transition.
 *
 * @example
 * const overlayRef = useRef<HTMLDivElement>(null);
 * const prefersReduced = useReducedMotion();
 *
 * // In transition handler:
 * if (prefersReduced) {
 *   overlayRef.current!.style.opacity = "1";
 *   setActiveChapter("chapter-2");
 *   overlayRef.current!.style.opacity = "0";
 * } else {
 *   animationPresets.chapterTransition(overlayRef.current, () => setActiveChapter("chapter-2"));
 * }
 *
 * return (
 *   <>
 *     <TransitionLayer ref={overlayRef} />
 *     {chapter}
 *   </>
 * );
 */
export const TransitionLayer = forwardRef<HTMLDivElement, TransitionLayerProps>(
  (
    { variant = "fade", initialOpacity = 0, className = "" },
    ref
  ) => {
    const prefersReduced = useReducedMotion();

    // Reduced motion: disable pointer events when transparent to prevent
    // blocking interaction on instant-swap transitions
    const pointerEvents = prefersReduced ? "none" : "none";

    const baseStyle: React.CSSProperties = {
      position: "fixed",
      inset: 0,
      zIndex: zIndex.modal,
      backgroundColor: colors.canvas,
      opacity: initialOpacity,
      pointerEvents,
      // Dissolve variant adds a subtle initial blur
      ...(variant === "dissolve"
        ? { backdropFilter: "blur(0px)", WebkitBackdropFilter: "blur(0px)" }
        : {}),
      // Transition only used for CSS-driven opacity (not GSAP)
      // GSAP will override this when animating
      transition: prefersReduced
        ? "none"
        : `opacity ${motion.durationS.scene} ${motion.easing.standard}`,
      willChange: "opacity",
    };

    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={className}
        style={baseStyle}
        data-transition-variant={variant}
      />
    );
  }
);

TransitionLayer.displayName = "TransitionLayer";

/**
 * useTransitionLayer
 *
 * Convenience hook that provides a pre-configured reduced-motion-aware
 * transition callback for use with TransitionLayer + GSAP.
 *
 * @example
 * const { transitionTo } = useTransitionLayer(overlayRef);
 * transitionTo(() => setActiveChapter("chapter-3"));
 */
export function useTransitionLayer(ref: React.RefObject<HTMLDivElement | null>) {
  const prefersReduced = useReducedMotion();

  const transitionTo = useCallback(
    async (onMidpoint: () => void) => {
      const el = ref.current;
      if (!el) {
        onMidpoint();
        return;
      }

      if (prefersReduced) {
        // Instant swap — no animation
        el.style.opacity = "1";
        onMidpoint();
        // Use a microtask to let React re-render before clearing
        await new Promise((r) => setTimeout(r, 50));
        el.style.opacity = "0";
        return;
      }

      // Import GSAP dynamically to avoid SSR issues
      const { default: gsap } = await import("gsap");
      const tl = gsap.timeline();
      tl.to(el, {
        opacity: 1,
        duration: motion.duration.scene / 1000,
        ease: motion.gsapEasing.standard,
      })
        .add(() => onMidpoint())
        .to(el, {
          opacity: 0,
          duration: motion.duration.scene / 1000,
          ease: motion.gsapEasing.standard,
        });
    },
    [ref, prefersReduced]
  );

  return { transitionTo };
}

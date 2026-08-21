"use client";

import React from "react";

export interface AtmosphereLayerProps {
  /**
   * Radial gradient color string. Should be rgba() with low base alpha (e.g., rgba(123,215,255,0.09)).
   * The component wraps this in a radial gradient automatically.
   */
  color: string;

  /**
   * Overall opacity of this layer (0–1).
   * Multiplies with the color's built-in alpha for total effective opacity.
   * Keep total effective opacity between 5–12% for architectural feel.
   */
  opacity: number;

  /** CSS width value (e.g., "65vw", "780px") */
  width: string;

  /** CSS height value (e.g., "65vw", "780px") */
  height: string;

  /** CSS max-width constraint */
  maxWidth?: string;

  /** CSS max-height constraint */
  maxHeight?: string;

  /**
   * Position of the layer within the environment container.
   * Accepts any combination of CSS position properties.
   * The blur filter is applied here on the static element (NOT on the animated wrapper).
   */
  position: Partial<{
    top: string;
    right: string;
    bottom: string;
    left: string;
  }>;

  /**
   * Blur radius in px. Applied to the static gradient element.
   * NEVER animate blur — it causes paint thrashing.
   */
  blur: number;

  /**
   * CSS animation name. Must match a @keyframes rule in globals.css.
   * The animation wrapper uses transform-only transitions.
   */
  animationName?: string;

  /**
   * Animation duration in seconds. Used to construct the animation shorthand.
   */
  duration?: number;

  /** Whether animations are suppressed (prefers-reduced-motion). */
  prefersReduced: boolean;

  /** React key identifier */
  id: string;
}

/**
 * AtmosphereLayer
 *
 * A single configurable atmospheric haze blob.
 * Architecture: Two nested divs for performance.
 *
 * Outer div: handles positioning and transform animation (GPU compositor only)
 * Inner div: static, carries the radial gradient + blur filter (one-time paint)
 *
 * This separation ensures blur is NEVER recomputed during animation.
 * The animated outer layer transforms; the blurred inner layer is composited as-is.
 *
 * Opacity calibration guidance:
 *   color at 9% alpha × opacity 0.95 = ~8.5% effective
 *   color at 7% alpha × opacity 0.80 = ~5.6% effective
 *   Keep total effective opacity 5–12% for architectural atmosphere.
 */
export function AtmosphereLayer({
  color,
  opacity,
  width,
  height,
  maxWidth,
  maxHeight,
  position,
  blur,
  animationName,
  duration = 60,
  prefersReduced,
  id,
}: AtmosphereLayerProps) {
  const animation =
    animationName && !prefersReduced
      ? `${animationName} ${duration}s ease-in-out infinite alternate`
      : "none";

  return (
    // Outer: animated (transform only, no paint, no blur)
    <div
      id={id}
      aria-hidden="true"
      style={{
        position: "absolute",
        ...position,
        width,
        height,
        maxWidth,
        maxHeight,
        willChange: "transform",
        animation,
        // Pointer events never needed on environment layers
        pointerEvents: "none",
      }}
    >
      {/* Inner: static, blurred, gradient — never repainted during animation */}
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)`,
          filter: `blur(${blur}px)`,
          opacity,
        }}
      />
    </div>
  );
}

AtmosphereLayer.displayName = "AtmosphereLayer";

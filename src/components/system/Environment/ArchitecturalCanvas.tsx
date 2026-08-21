"use client";

import React from "react";
import { environment } from "@/design/environment";

/**
 * ArchitecturalCanvas
 *
 * The deepest layer of the environment. Renders the base gradient that replaces
 * the flat black background. Covers the full viewport with a warm dark blue-charcoal
 * gradient with three tonal stops, creating immediate depth impression before
 * any other content renders.
 *
 * This component has NO animation — it is a static paint layer.
 * The gradient itself provides:
 *   - Warm dark charcoal at the top (ceiling light warmth)
 *   - Deep cool blue-black at the mid point
 *   - Near-black at the bottom (floor, grounding)
 *
 * No props. Fully token-driven.
 */
export function ArchitecturalCanvas() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        background: environment.canvasGradient,
      }}
    />
  );
}

ArchitecturalCanvas.displayName = "ArchitecturalCanvas";

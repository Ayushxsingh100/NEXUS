"use client";

import React from "react";
import { environment } from "@/design/environment";

/**
 * FocusPlane
 *
 * Layer 05 of the Environment Engine.
 *
 * Creates natural visual gravity toward the center of the viewport.
 * NOT a glow. NOT a spotlight. A barely-perceptible brightening that
 * guides the eye without any conscious awareness from the viewer.
 *
 * Mechanism:
 *   A wide, soft radial gradient at 4% white opacity, centered slightly
 *   above the viewport midpoint (where most content lives).
 *   The vignette (DepthOverlay) frames from outside; this brightens from inside.
 *   Together they create the classic lens/architectural photography depth-of-field feel.
 *
 * No animation. No blur. Single paint. GPU-composited via opacity.
 */
export function FocusPlane() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        background: environment.focusPlane,
        pointerEvents: "none",
        willChange: "opacity",
      }}
    />
  );
}

FocusPlane.displayName = "FocusPlane";

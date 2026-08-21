"use client";

import React from "react";
import { colors } from "@/design/colors";
import { environment } from "@/design/environment";

/**
 * DepthOverlay
 *
 * Composite depth layer combining floor darkening and edge vignette.
 * Both are static layers — no animation, single paint operations.
 *
 * Floor gradient: darkens the lower viewport to anchor content visually.
 * Vignette: radial edge fade that frames the scene. Creates the sense of
 * looking through a lens rather than at a flat screen.
 *
 * Combined, these two sub-layers produce the "architectural ground plane"
 * effect — content feels placed inside a space, not positioned on a page.
 */
export function DepthOverlay() {
  return (
    <>
      {/* Floor darkening — architectural ground plane */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "48%",
          background: environment.floorGradient,
          pointerEvents: "none",
        }}
      />

      {/* Edge vignette — the world has edges */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 44%, transparent 22%, ${colors.vignette} 100%)`,
          opacity: environment.vignetteStrength,
          pointerEvents: "none",
        }}
      />
    </>
  );
}

DepthOverlay.displayName = "DepthOverlay";

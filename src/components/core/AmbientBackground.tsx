import React from "react";

export interface AmbientBackgroundProps {
  glowColor?: "cyan" | "violet" | "both" | "none";
  className?: string;
  showVignette?: boolean;
}

/**
 * Standard cinematic backdrop overlay containing volumetric spot-lights,
 * deep radial darkness vignettes, and gradient color fields.
 */
export function AmbientBackground({
  glowColor = "both",
  className = "",
  showVignette = true,
}: AmbientBackgroundProps) {
  return (
    <div
      className={`absolute inset-0 w-full h-full -z-20 overflow-hidden pointer-events-none select-none ${className}`}
      style={{
        background: "radial-gradient(circle at 50% 50%, rgba(10, 24, 42, 0.2) 0%, transparent 95%)",
      }}
    >
      {/* Volumetric Cyan Spotlight */}
      {(glowColor === "cyan" || glowColor === "both") && (
        <div
          className="absolute top-[20%] left-[15%] w-[45vw] h-[45vw] max-w-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(125, 211, 252, 0.035) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
      )}

      {/* Volumetric Violet Spotlight */}
      {(glowColor === "violet" || glowColor === "both") && (
        <div
          className="absolute bottom-[20%] right-[15%] w-[50vw] h-[50vw] max-w-[650px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(192, 132, 252, 0.025) 0%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />
      )}

      {/* Subtle vignettes overlay */}
      {showVignette && (
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background: "radial-gradient(circle, transparent 40%, rgba(0, 0, 0, 0.75) 100%)",
          }}
        />
      )}
    </div>
  );
}

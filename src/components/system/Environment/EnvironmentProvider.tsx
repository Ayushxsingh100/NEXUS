"use client";

import React, { createContext, useContext, useMemo } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { environment } from "@/design/environment";

// ─────────────────────────────────────────────────────────────
// CONTEXT TYPES
// ─────────────────────────────────────────────────────────────

export interface EnvironmentContextValue {
  /**
   * Global light source position as percentage strings.
   * Default: upper-left (18%, 12%).
   */
  lightDirection: { x: string; y: string };

  /**
   * Global light intensity (0–1).
   * Scales the light plane opacity proportionally.
   */
  lightIntensity: number;

  /**
   * Vignette strength (0–1).
   * Controls the radial edge fade opacity.
   */
  vignetteStrength: number;

  /**
   * Whether atmospheric layers are rendered.
   * Can be toggled per-chapter if a chapter has its own atmosphere.
   */
  atmosphereVisible: boolean;

  /**
   * Whether the user has enabled prefers-reduced-motion.
   * All environment animations respect this flag.
   */
  prefersReduced: boolean;
}

// ─────────────────────────────────────────────────────────────
// DEFAULTS
// ─────────────────────────────────────────────────────────────

const defaultContext: EnvironmentContextValue = {
  lightDirection: {
    x: environment.lightSourcePosition.x,
    y: environment.lightSourcePosition.y,
  },
  lightIntensity: 1.0,
  vignetteStrength: environment.vignetteStrength,
  atmosphereVisible: true,
  prefersReduced: false,
};

// ─────────────────────────────────────────────────────────────
// CONTEXT
// ─────────────────────────────────────────────────────────────

const EnvironmentContext = createContext<EnvironmentContextValue>(defaultContext);

// ─────────────────────────────────────────────────────────────
// PROVIDER PROPS
// ─────────────────────────────────────────────────────────────

export interface EnvironmentProviderProps {
  children: React.ReactNode;

  /**
   * Override the global light direction. Default: upper-left.
   * Allows chapters to shift the perceived light source subtly.
   */
  lightDirection?: { x: string; y: string };

  /**
   * Override light intensity. 0 = off, 1 = full token value.
   */
  lightIntensity?: number;

  /**
   * Override vignette strength. Default: 0.92.
   */
  vignetteStrength?: number;

  /**
   * Hide atmospheric blobs. Use when chapter has its own atmospheric system.
   * Default: true (visible).
   */
  atmosphereVisible?: boolean;
}

// ─────────────────────────────────────────────────────────────
// PROVIDER
// ─────────────────────────────────────────────────────────────

/**
 * EnvironmentProvider
 *
 * Provides the global environment state to any component in the tree via useEnvironment().
 * Mounted by EnvironmentEngine — no need to add this manually in chapters.
 *
 * In Sprint 03, chapters can wrap their content in EnvironmentProvider with custom
 * props to shift the perceived environment for their scene.
 *
 * @example
 * // Sprint 03: a chapter that dims the light
 * <EnvironmentProvider lightIntensity={0.4} vignetteStrength={0.98}>
 *   <ChapterContent />
 * </EnvironmentProvider>
 */
export function EnvironmentProvider({
  children,
  lightDirection,
  lightIntensity = 1.0,
  vignetteStrength,
  atmosphereVisible = true,
}: EnvironmentProviderProps) {
  const prefersReduced = useReducedMotion();

  const value = useMemo<EnvironmentContextValue>(
    () => ({
      lightDirection: lightDirection ?? defaultContext.lightDirection,
      lightIntensity,
      vignetteStrength: vignetteStrength ?? environment.vignetteStrength,
      atmosphereVisible,
      prefersReduced,
    }),
    [lightDirection, lightIntensity, vignetteStrength, atmosphereVisible, prefersReduced]
  );

  return (
    <EnvironmentContext.Provider value={value}>
      {children}
    </EnvironmentContext.Provider>
  );
}

EnvironmentProvider.displayName = "EnvironmentProvider";

// ─────────────────────────────────────────────────────────────
// HOOK
// ─────────────────────────────────────────────────────────────

/**
 * useEnvironment
 *
 * Returns the current environment state. Use in any component that needs to
 * respond to the global light source, vignette, or motion preferences.
 *
 * @example
 * const { lightDirection, prefersReduced } = useEnvironment();
 */
export function useEnvironment(): EnvironmentContextValue {
  return useContext(EnvironmentContext);
}

/**
 * Environment — Public API
 *
 * Re-exports EnvironmentEngine as the Environment component for backward
 * compatibility with the existing layout.tsx import.
 *
 * Usage (in layout.tsx):
 *   import { Environment } from "@/components/system/Environment";
 *   <Environment />
 *
 * Advanced usage (per-chapter in Sprint 03):
 *   import { EnvironmentEngine } from "./EnvironmentEngine";
 *   import { EnvironmentProvider, useEnvironment } from "./EnvironmentProvider";
 */

export { EnvironmentEngine as Environment } from "./EnvironmentEngine";
export { EnvironmentEngine } from "./EnvironmentEngine";
export { EnvironmentProvider, useEnvironment } from "./EnvironmentProvider";
export type { EnvironmentEngineProps as EnvironmentProps } from "./EnvironmentEngine";
export type { EnvironmentProviderProps, EnvironmentContextValue } from "./EnvironmentProvider";
export { ArchitecturalCanvas } from "./ArchitecturalCanvas";
export { AtmosphereLayer } from "./AtmosphereLayer";
export type { AtmosphereLayerProps } from "./AtmosphereLayer";
export { DepthOverlay } from "./DepthOverlay";
export { FocusPlane } from "./FocusPlane";
export { glassPanelShadow, deepPanelShadow, cardShadow, chipShadow, depthShadow, architecturalShadow } from "./ShadowSystem";

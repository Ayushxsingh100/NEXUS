/**
 * PROJECT NEXUS — System Components
 *
 * Barrel export for all active system-level design primitives.
 */

// ENVIRONMENT LAYER
export { Environment } from "./Environment";
export type { EnvironmentProps } from "./Environment";
export { LightPlane } from "./LightPlane";
export type { LightPlaneProps } from "./LightPlane";

// TYPOGRAPHY LAYER
export { HeroText } from "./HeroText";
export type { HeroTextProps } from "./HeroText";

// BUTTONS
export { Button } from "./Button";
export type { ButtonProps } from "./Button";

// LAYOUT & STRUCTURE
export { TransitionLayer, useTransitionLayer } from "./TransitionLayer";
export type { TransitionLayerProps, TransitionVariant } from "./TransitionLayer";

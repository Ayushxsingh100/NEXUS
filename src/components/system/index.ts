/**
 * PROJECT NEXUS — System Components
 *
 * Barrel export for all system-level design primitives.
 */

// ENVIRONMENT LAYER
export { Environment } from "./Environment";
export type { EnvironmentProps } from "./Environment";
export { SystemAmbientBackground } from "./AmbientBackground";
export type { SystemAmbientBackgroundProps } from "./AmbientBackground";
export { LightPlane } from "./LightPlane";
export type { LightPlaneProps } from "./LightPlane";

// SURFACE LAYER
export { Surface } from "./Surface";
export type { SurfaceProps } from "./Surface";
export { SystemGlassPanel } from "./GlassPanel";
export type { SystemGlassPanelProps } from "./GlassPanel";

// TYPOGRAPHY LAYER
export { HeroText } from "./HeroText";
export type { HeroTextProps } from "./HeroText";
export { SystemSectionTitle } from "./SectionTitle";
export type { SystemSectionTitleProps } from "./SectionTitle";

// BUTTONS
export { Button } from "./Button";
export type { ButtonProps } from "./Button";
export { IconButton } from "./Button/IconButton";
export type { IconButtonProps } from "./Button/IconButton";

// NAVIGATION
export { NavigationItem } from "./Navigation/NavigationItem";
export type { NavigationItemProps } from "./Navigation/NavigationItem";

// LAYOUT & STRUCTURE
export { Container } from "./Layout/Container";
export type { ContainerProps } from "./Layout/Container";
export { SectionWrapper } from "./Layout/SectionWrapper";
export type { SectionWrapperProps } from "./Layout/SectionWrapper";
export { FadeMask } from "./Layout/FadeMask";
export type { FadeMaskProps } from "./Layout/FadeMask";
export { SystemDivider } from "./Divider";
export type { SystemDividerProps } from "./Divider";
export { TransitionLayer, useTransitionLayer } from "./TransitionLayer";
export type { TransitionLayerProps, TransitionVariant } from "./TransitionLayer";

// CARD SYSTEM
export { BaseCard } from "./Card/BaseCard";
export type { BaseCardProps } from "./Card/BaseCard";
export { ProjectCard } from "./Card/ProjectCard";
export type { ProjectCardProps } from "./Card/ProjectCard";
export { KnowledgeCard } from "./Card/KnowledgeCard";
export type { KnowledgeCardProps } from "./Card/KnowledgeCard";

// FORM SYSTEM
export { Input } from "./Form/Input";
export type { InputProps } from "./Form/Input";
export { Textarea } from "./Form/Textarea";
export type { TextareaProps } from "./Form/Textarea";

import React, { forwardRef } from "react";
import { elevation as getElevation } from "@/design/elevation";
import { radius, radiusPx } from "@/design/radius";
import type { ElevationLevel } from "@/design/elevation";
import type { RadiusKey } from "@/design/radius";

export interface SurfaceProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Elevation level governs background color, shadow, and border.
   * 0 = canvas (invisible surface)
   * 1 = ground (default content layer)
   * 2 = raised (cards, panels)
   * 3 = floating (overlays)
   */
  elevation?: ElevationLevel;
  /**
   * Border-radius key from the radius scale.
   * Defaults to "none" — architectural surfaces are sharp.
   */
  borderRadius?: RadiusKey;
  /**
   * Polymorphic element type.
   * Default: "div"
   */
  as?: keyof React.JSX.IntrinsicElements;
  children?: React.ReactNode;
  className?: string;
}

/**
 * Surface
 *
 * The foundational architectural surface primitive.
 * Matte, heavy, minimal — no glass, no blur, no transparency.
 *
 * A Surface is what physical materials rest on. It carries elevation
 * (depth via shadow + background) and uses design tokens exclusively.
 *
 * Usage:
 *   Use Surface for content containers that need depth without interaction.
 *   For interactive glass panels, use SystemGlassPanel.
 *   For ambient background layers, use Environment or SystemAmbientBackground.
 *
 * @example
 * <Surface elevation={2} borderRadius="md">
 *   <p>Content</p>
 * </Surface>
 *
 * <Surface as="section" elevation={1} className="p-8">
 *   <h2>Chapter</h2>
 * </Surface>
 */
export const Surface = forwardRef<HTMLElement, SurfaceProps>(
  (
    {
      elevation = 1,
      borderRadius = "none",
      as: TagInput = "div",
      children,
      className = "",
      style,
      ...props
    },
    ref
  ) => {
    const elevationStyle = getElevation(elevation);
    const Tag = TagInput as unknown as React.ForwardRefExoticComponent<{ children?: React.ReactNode; className?: string; style?: React.CSSProperties } & React.RefAttributes<HTMLElement>>;

    return (
      <Tag
        ref={ref}
        className={className}
        style={{
          ...elevationStyle,
          borderRadius: radiusPx(radius[borderRadius]),
          borderWidth: 1,
          borderStyle: "solid",
          // Clean architectural structure styling
          transition: "background-color var(--transition-duration-comfortable, 450ms) var(--transition-timing-function-standard, ease), border-color var(--transition-duration-comfortable, 450ms) var(--transition-timing-function-standard, ease), box-shadow var(--transition-duration-comfortable, 450ms) var(--transition-timing-function-standard, ease)",
          ...style,
        }}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);

Surface.displayName = "Surface";

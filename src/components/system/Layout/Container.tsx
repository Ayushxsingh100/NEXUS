import React from "react";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

/**
 * Container
 *
 * Reusable layout boundary providing consistent max-widths and responsive padding.
 */
export function Container({ children, size = "lg", className = "", style, ...props }: ContainerProps) {
  const maxWidths = {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    full: "100%",
  };

  return (
    <div
      className={`mx-auto px-4 sm:px-6 md:px-8 w-full ${className}`}
      style={{
        maxWidth: maxWidths[size],
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

Container.displayName = "Container";

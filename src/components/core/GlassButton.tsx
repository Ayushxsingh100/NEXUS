import React, { forwardRef } from "react";
import { Button } from "@/components/system/Button";

export interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  active?: boolean;
}

export const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ children, className = "", active = false, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="secondary"
        active={active}
        className={className}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

GlassButton.displayName = "GlassButton";

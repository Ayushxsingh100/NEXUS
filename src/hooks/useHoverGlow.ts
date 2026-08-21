import { useEffect, RefObject } from "react";

/**
 * Tracks the mouse cursor coordinates relative to a target element and updates
 * CSS custom properties `--mouse-x` and `--mouse-y` for radial spotlight hover effects.
 */
export function useHoverGlow(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      el.style.setProperty("--mouse-x", `${x}px`);
      el.style.setProperty("--mouse-y", `${y}px`);
    };

    el.addEventListener("mousemove", handleMouseMove);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
    };
  }, [ref]);
}

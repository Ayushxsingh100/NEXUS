import { useEffect, RefObject } from "react";
import gsap from "gsap";

/**
 * Custom hook to apply a gentle floating drift to a referenced element using GSAP.
 */
export function useFloating(
  ref: RefObject<HTMLElement | null>,
  y = 8,
  duration = 4
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const anim = gsap.to(el, {
      y: `+=${y}`,
      duration,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      anim.kill();
    };
  }, [ref, y, duration]);
}

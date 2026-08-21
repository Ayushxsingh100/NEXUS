import { useEffect, RefObject } from "react";
import gsap from "gsap";

/**
 * Custom hook to apply smooth, blur-enhanced fade transitions on mount, or when visibility toggles.
 */
export function useFadeTransition(
  ref: RefObject<HTMLElement | null>,
  visible = true,
  delay = 0,
  duration = 1.5
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (visible) {
      gsap.fromTo(
        el,
        { opacity: 0, filter: "blur(6px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration,
          delay,
          ease: "power2.out",
          overwrite: "auto",
        }
      );
    } else {
      gsap.to(el, {
        opacity: 0,
        filter: "blur(6px)",
        duration: duration * 0.8,
        ease: "power2.inOut",
        overwrite: "auto",
      });
    }
  }, [ref, visible, delay, duration]);
}

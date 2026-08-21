import { useEffect, RefObject } from "react";
import gsap from "gsap";

/**
 * Custom hook to apply a subtle mouse parallax or tilt effect to a component.
 */
export function useParallax(
  ref: RefObject<HTMLElement | null>,
  strength = 15,
  tilt = false
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Set perspective on parent if tilting is enabled
    if (tilt && el.parentElement) {
      gsap.set(el.parentElement, { perspective: 1000 });
      gsap.set(el, { transformStyle: "preserve-3d" });
    }

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2); // Normalize between -1 and 1
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);

      const moveX = x * strength;
      const moveY = y * strength;

      const vars: gsap.TweenVars = {
        x: moveX,
        y: moveY,
        duration: 0.8,
        ease: "power2.out",
      };

      if (tilt) {
        vars.rotateY = x * 8; // Max 8 degrees tilt
        vars.rotateX = -y * 8;
      }

      gsap.to(el, vars);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [ref, strength, tilt]);
}

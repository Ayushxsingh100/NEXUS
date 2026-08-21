import gsap from "gsap";

/**
 * PROJECT NEXUS Motion Presets
 * Reusable animation routines powered by GSAP to maintain a slow, confident, and cinematic timing.
 */
export const animationPresets = {
  /**
   * Slow cinematic fade-in.
   */
  fadeIn: (target: gsap.TweenTarget, vars?: gsap.TweenVars) => {
    return gsap.fromTo(
      target,
      { opacity: 0 },
      { opacity: 1, duration: 1.8, ease: "power2.out", ...vars }
    );
  },

  /**
   * Fade-out sequence into blur.
   */
  fadeOut: (target: gsap.TweenTarget, vars?: gsap.TweenVars) => {
    return gsap.to(target, {
      opacity: 0,
      filter: "blur(8px)",
      duration: 1.2,
      ease: "power2.inOut",
      ...vars,
    });
  },

  /**
   * Slide up and fade in, ideal for headers and paragraphs.
   */
  slideUp: (target: gsap.TweenTarget, y = 15, vars?: gsap.TweenVars) => {
    return gsap.fromTo(
      target,
      { opacity: 0, y, filter: "blur(6px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.8, ease: "power3.out", ...vars }
    );
  },

  /**
   * Slide down and fade in.
   */
  slideDown: (target: gsap.TweenTarget, y = -15, vars?: gsap.TweenVars) => {
    return gsap.fromTo(
      target,
      { opacity: 0, y, filter: "blur(6px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.8, ease: "power3.out", ...vars }
    );
  },

  /**
   * Infinite gentle floating drift.
   */
  floating: (target: gsap.TweenTarget, y = 8, duration = 4, vars?: gsap.TweenVars) => {
    return gsap.to(target, {
      y: `+=${y}`,
      duration,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      ...vars,
    });
  },

  /**
   * Infinite soft scale breathing cycle.
   */
  breathing: (target: gsap.TweenTarget, scale = 1.025, duration = 5, vars?: gsap.TweenVars) => {
    return gsap.to(target, {
      scale,
      duration,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      ...vars,
    });
  },

  /**
   * Micro-lift on hover.
   */
  hoverLift: (target: gsap.TweenTarget, y = -4, duration = 0.4, vars?: gsap.TweenVars) => {
    return gsap.to(target, {
      y,
      duration,
      ease: "power2.out",
      ...vars,
    });
  },

  /**
   * Cyan/Violet glow on hover.
   */
  hoverGlow: (target: gsap.TweenTarget, glowColor = "rgba(125, 211, 252, 0.15)", borderColor = "rgba(125, 211, 252, 0.4)", duration = 0.4, vars?: gsap.TweenVars) => {
    return gsap.to(target, {
      boxShadow: `0 0 20px ${glowColor}`,
      borderColor,
      duration,
      ease: "power2.out",
      ...vars,
    });
  },

  /**
   * Camera slide or zoom tweening for scene transitions.
   */
  cameraPush: (
    sceneParams: { cameraZ: number },
    targetZ: number,
    duration = 20,
    ease = "sine.out",
    vars?: gsap.TweenVars
  ) => {
    return gsap.to(sceneParams, {
      cameraZ: targetZ,
      duration,
      ease,
      ...vars,
    });
  },

  /**
   * Cinematic transition sequence via overlay shading.
   */
  chapterTransition: (
    overlayTarget: gsap.TweenTarget,
    onComplete?: () => void,
    vars?: gsap.TweenVars
  ) => {
    const tl = gsap.timeline();
    tl.to(overlayTarget, {
      opacity: 1,
      duration: 1.5,
      ease: "power2.inOut",
    })
      .add(() => {
        if (onComplete) onComplete();
      })
      .to(overlayTarget, {
        opacity: 0,
        duration: 1.5,
        ease: "power2.inOut",
        ...vars,
      });
    return tl;
  },
};

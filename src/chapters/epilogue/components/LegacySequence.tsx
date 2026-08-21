"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import FinalTitle from "./FinalTitle";
import Signature from "./Signature";

export default function LegacySequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);
  const sigRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // --- Scene 1: PROJECT NEXUS reveal (2.5s - 5.0s) ---
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 2.2,
        delay: 2.5, // 2 seconds of silence, then start
      })
      
      // --- Scene 2: Final Words (5.0s - 7.0s) ---
      .to(wordsRef.current, {
        opacity: 0.6,
        y: 0,
        filter: "blur(0px)",
        duration: 1.8,
      }, "+=0.3")

      // --- Scene 3: Signature (7.0s - 9.0s) ---
      .to(sigRef.current, {
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.8,
      }, "+=0.5")

      // --- Scene 4: Hold and Fade Out Main Titles (13.5s - 16.0s) ---
      .to([titleRef.current, wordsRef.current, sigRef.current], {
        opacity: 0,
        filter: "blur(8px)",
        y: -10,
        duration: 2.2,
        delay: 4.5, // Hold for 4.5 seconds
        ease: "power2.inOut",
      })

      // --- Scene 5: Sub-sentence "Next chapter..." (18.0s - 20.0s) ---
      .to(detailRef.current, {
        opacity: 0.35,
        filter: "blur(0px)",
        duration: 2.0,
        delay: 1.8, // Silence gap before easter egg
      })

      // --- Scene 6: Final fade of easter egg (23.5s - 25.5s) ---
      .to(detailRef.current, {
        opacity: 0,
        filter: "blur(6px)",
        duration: 2.0,
        delay: 3.5, // Hold easter egg
        ease: "power2.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center text-center max-w-xl px-6 w-full min-h-[50vh] select-none"
    >
      {/* Main Titles Container */}
      <div className="flex flex-col gap-5 items-center justify-center">
        <FinalTitle opacityRef={titleRef} />
        
        {/* Final Words */}
        <div
          ref={wordsRef}
          className="opacity-0 filter blur-[5px] translate-y-3 flex items-center gap-3 sm:gap-4 flex-wrap justify-center"
        >
          <span className="text-[10px] sm:text-xs tracking-[0.25em] font-light text-zinc-400 uppercase">
            Designed.
          </span>
          <span className="w-1 h-1 rounded-full bg-zinc-700" />
          <span className="text-[10px] sm:text-xs tracking-[0.25em] font-light text-zinc-400 uppercase">
            Engineered.
          </span>
          <span className="w-1 h-1 rounded-full bg-zinc-700" />
          <span className="text-[10px] sm:text-xs tracking-[0.25em] font-light text-zinc-400 uppercase">
            Continuously Evolving.
          </span>
        </div>

        <Signature opacityRef={sigRef} />
      </div>

      {/* Optional Sub-sentence detail */}
      <div
        ref={detailRef}
        className="absolute bottom-10 flex items-center justify-center opacity-0 filter blur-[4px] pointer-events-none select-none"
      >
        <span className="text-[10px] sm:text-xs font-light text-zinc-500 tracking-[0.2em] italic uppercase pl-[0.2em]">
          {"The next chapter hasn't been written yet."}
        </span>
      </div>
    </div>
  );
}

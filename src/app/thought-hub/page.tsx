"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { usePageTransition } from "@/context/PageTransitionContext";

const ChapterThree = dynamic(() => import("@/chapters/chapter-3/ChapterThree"), { ssr: false });

export default function ThoughtHubPage() {
  const { navigateTo, markPageLoaded } = usePageTransition();

  useEffect(() => {
    markPageLoaded();
  }, [markPageLoaded]);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const checkNode = (className: string, path: string) => {
        if (target.classList.contains(className) || target.closest(`.${className}`)) {
          setTimeout(() => {
            navigateTo(path);
          }, 2800);
          return true;
        }
        return false;
      };

      if (checkNode("node-projects", "/projects")) return;
      if (checkNode("node-experience", "/experience")) return;
      if (checkNode("node-blogs", "/blogs")) return;
      if (checkNode("node-about", "/about")) return;
      if (checkNode("node-contact", "/contact")) return;
    };

    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, [navigateTo]);

  return <ChapterThree />;
}

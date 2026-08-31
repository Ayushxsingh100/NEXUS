"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { usePageTransition } from "@/context/PageTransitionContext";

const ChapterSeven = dynamic(() => import("@/chapters/chapter-7/ChapterSeven"), { ssr: false });

export default function AboutPage() {
  const { navigateTo, markPageLoaded } = usePageTransition();

  useEffect(() => {
    markPageLoaded();
  }, [markPageLoaded]);

  return (
    <ChapterSeven
      onReturn={() => navigateTo("/thought-hub")}
      onContact={() => navigateTo("/contact")}
    />
  );
}

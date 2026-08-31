"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { usePageTransition } from "@/context/PageTransitionContext";

const ChapterFive = dynamic(() => import("@/chapters/chapter-5/ChapterFive"), { ssr: false });

export default function ExperiencePage() {
  const { navigateTo, markPageLoaded } = usePageTransition();

  useEffect(() => {
    markPageLoaded();
  }, [markPageLoaded]);

  return (
    <ChapterFive onReturn={() => navigateTo("/thought-hub")} />
  );
}

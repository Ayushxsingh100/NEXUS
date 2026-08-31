"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { usePageTransition } from "@/context/PageTransitionContext";

const ChapterFour = dynamic(() => import("@/chapters/chapter-4/ChapterFour"), { ssr: false });

export default function ProjectsPage() {
  const { navigateTo, markPageLoaded } = usePageTransition();

  useEffect(() => {
    markPageLoaded();
  }, [markPageLoaded]);

  return (
    <ChapterFour onReturn={() => navigateTo("/thought-hub")} />
  );
}

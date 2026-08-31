"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { usePageTransition } from "@/context/PageTransitionContext";

const ChapterSix = dynamic(() => import("@/chapters/chapter-6/ChapterSix"), { ssr: false });

export default function BlogsPage() {
  const { navigateTo, markPageLoaded } = usePageTransition();

  useEffect(() => {
    markPageLoaded();
  }, [markPageLoaded]);

  return (
    <ChapterSix onReturn={() => navigateTo("/thought-hub")} />
  );
}

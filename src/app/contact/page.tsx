"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { usePageTransition } from "@/context/PageTransitionContext";

const ChapterEight = dynamic(() => import("@/chapters/chapter-8/ChapterEight"), { ssr: false });

export default function ContactPage() {
  const { navigateTo, markPageLoaded } = usePageTransition();

  useEffect(() => {
    markPageLoaded();
  }, [markPageLoaded]);

  return (
    <ChapterEight
      onReturn={() => navigateTo("/thought-hub")}
      onCompleteJourney={() => navigateTo("/epilogue")}
    />
  );
}

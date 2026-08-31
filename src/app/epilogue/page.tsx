"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { usePageTransition } from "@/context/PageTransitionContext";

const Epilogue = dynamic(() => import("@/chapters/epilogue/Epilogue"), { ssr: false });

export default function EpiloguePage() {
  const { markPageLoaded } = usePageTransition();

  useEffect(() => {
    markPageLoaded();
  }, [markPageLoaded]);

  return <Epilogue />;
}

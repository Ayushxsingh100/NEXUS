"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { PageTransitionProvider, usePageTransition } from "@/context/PageTransitionContext";
import { GlobalNavigationDrawer } from "@/components/system/Shell/GlobalNavigationDrawer";

const PATH_TO_CHAPTER: Record<string, string> = {
  "/": "chapter-1",
  "/thought-hub": "chapter-3",
  "/projects": "chapter-4",
  "/experience": "chapter-5",
  "/blogs": "chapter-6",
  "/about": "chapter-7",
  "/contact": "chapter-8",
  "/epilogue": "epilogue",
};

const CHAPTER_TO_PATH: Record<string, string> = {
  "chapter-1": "/",
  "chapter-3": "/thought-hub",
  "chapter-4": "/projects",
  "chapter-5": "/experience",
  "chapter-6": "/blogs",
  "chapter-7": "/about",
  "chapter-8": "/contact",
  "epilogue": "/epilogue",
};

function InnerAppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isMenuOpen, setIsMenuOpen, navigateTo } = usePageTransition();

  const activeChapter = PATH_TO_CHAPTER[pathname] || "chapter-1";

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleNavigate = (chapterId: string) => {
    const path = CHAPTER_TO_PATH[chapterId];
    if (path) {
      navigateTo(path);
    }
  };

  return (
    <>
      <GlobalNavigationDrawer
        isOpen={isMenuOpen}
        activeChapter={activeChapter}
        onClose={toggleMenu}
        onNavigate={handleNavigate}
      />

      <main 
        id="main-content" 
        className={`w-full h-screen bg-black relative ${
          activeChapter === "chapter-7" ? "overflow-y-auto" : "overflow-hidden"
        }`}
      >
        {children}
      </main>
    </>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <PageTransitionProvider>
      <InnerAppShell>{children}</InnerAppShell>
    </PageTransitionProvider>
  );
}

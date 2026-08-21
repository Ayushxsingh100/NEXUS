"use client";

import React from "react";

export default function BreathingDot() {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-10">
      <div
        id="breathing-dot"
        className="w-2 h-2 rounded-full bg-white opacity-0 shadow-[0_0_12px_rgba(255,255,255,0.7),0_0_24px_rgba(255,255,255,0.3)]"
      />
    </div>
  );
}

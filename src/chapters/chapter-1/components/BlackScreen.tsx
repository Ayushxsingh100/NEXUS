"use client";

import React from "react";

interface BlackScreenProps {
  className?: string;
}

export default function BlackScreen({ className = "" }: BlackScreenProps) {
  return (
    <div
      id="black-screen"
      className={`fixed inset-0 z-50 bg-black pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}

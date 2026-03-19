"use client";

import { useEffect, useRef } from "react";

export const CursorGlow = () => {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      el.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(31,180,180,0.25), rgba(31,180,180,0.1) 35%, rgba(31,180,180,0.03) 55%, transparent 65%)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
    />
  );
};

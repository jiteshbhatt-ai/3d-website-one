"use client";

import { useRef, useEffect, useState } from "react";

export const RobotMascot = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxOffset = 8;
      const clampedDistance = Math.min(distance, 300);
      const ratio = clampedDistance / 300;

      setPupilOffset({
        x: (dx / (distance || 1)) * maxOffset * ratio,
        y: (dy / (distance || 1)) * maxOffset * ratio,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="relative w-64 h-64 md:w-80 md:h-80 select-none">
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
        {/* Antenna */}
        <line x1="100" y1="30" x2="100" y2="10" stroke="#0E9494" strokeWidth="3" strokeLinecap="round" />
        <circle cx="100" cy="8" r="5" fill="#1FB4B4" className="animate-pulse" />

        {/* Head - rounded rectangle */}
        <rect x="40" y="30" width="120" height="110" rx="28" ry="28"
          fill="url(#headGradient)" stroke="#0E9494" strokeWidth="2" />

        {/* Face plate */}
        <rect x="52" y="50" width="96" height="70" rx="18" ry="18"
          fill="#0a3d3d" opacity="0.3" />

        {/* Left eye socket */}
        <ellipse cx="78" cy="82" rx="18" ry="20" fill="#0D4F4F" />
        <ellipse cx="78" cy="82" rx="15" ry="17" fill="#E0F7F7" />
        {/* Left pupil - follows mouse */}
        <circle
          cx={78 + pupilOffset.x}
          cy={82 + pupilOffset.y}
          r="7"
          fill="#0a0a0a"
        />
        <circle
          cx={75 + pupilOffset.x * 0.6}
          cy={79 + pupilOffset.y * 0.6}
          r="2.5"
          fill="white"
        />

        {/* Right eye socket */}
        <ellipse cx="122" cy="82" rx="18" ry="20" fill="#0D4F4F" />
        <ellipse cx="122" cy="82" rx="15" ry="17" fill="#E0F7F7" />
        {/* Right pupil - follows mouse */}
        <circle
          cx={122 + pupilOffset.x}
          cy={82 + pupilOffset.y}
          r="7"
          fill="#0a0a0a"
        />
        <circle
          cx={119 + pupilOffset.x * 0.6}
          cy={79 + pupilOffset.y * 0.6}
          r="2.5"
          fill="white"
        />

        {/* Mouth - friendly smile */}
        <path d="M 85 108 Q 100 120 115 108" stroke="#0E9494" strokeWidth="2.5" fill="none" strokeLinecap="round" />

        {/* Cheek blush */}
        <circle cx="62" cy="100" r="6" fill="#1FB4B4" opacity="0.3" />
        <circle cx="138" cy="100" r="6" fill="#1FB4B4" opacity="0.3" />

        {/* Ears / side panels */}
        <rect x="28" y="65" width="14" height="30" rx="5" fill="url(#headGradient)" stroke="#0E9494" strokeWidth="1.5" />
        <rect x="158" y="65" width="14" height="30" rx="5" fill="url(#headGradient)" stroke="#0E9494" strokeWidth="1.5" />

        {/* Neck */}
        <rect x="88" y="138" width="24" height="12" rx="4" fill="#158D8D" />

        {/* Body */}
        <rect x="55" y="148" width="90" height="48" rx="16" ry="16"
          fill="url(#bodyGradient)" stroke="#0E9494" strokeWidth="2" />

        {/* Chest light */}
        <circle cx="100" cy="170" r="6" fill="#1FB4B4" opacity="0.8" className="animate-pulse" />
        <circle cx="100" cy="170" r="3" fill="#ffffff" opacity="0.6" />

        {/* Bolt details on body */}
        <circle cx="75" cy="165" r="2.5" fill="#0E9494" />
        <circle cx="125" cy="165" r="2.5" fill="#0E9494" />

        <defs>
          <linearGradient id="headGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22C9C9" />
            <stop offset="50%" stopColor="#1FB4B4" />
            <stop offset="100%" stopColor="#178F8F" />
          </linearGradient>
          <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1EA8A8" />
            <stop offset="100%" stopColor="#158D8D" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

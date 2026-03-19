"use client";

import { useMemo } from "react";

interface Props {
  count: number;
  sizeRange: [number, number];
  blur?: number;
}

export const ParticleField = ({ count, sizeRange, blur = 0 }: Props) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]),
      duration: 6 + Math.random() * 10,
      delay: Math.random() * 8,
      opacity: 0.15 + Math.random() * 0.45,
    }));
  }, [count, sizeRange]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-brand-turquoise"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            filter: blur > 0 ? `blur(${blur}px)` : undefined,
            animation: `floatSlow ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
};

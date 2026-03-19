"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";

interface HeroTextProps {
  progress: MotionValue<number>;
}

export const HeroText = ({ progress }: HeroTextProps) => {
  // Title 1: visible immediately, hold until 28%, fade out 28–38%
  const title1Opacity = useTransform(progress, [0, 0.28, 0.38], [1, 1, 0]);
  const title1Y = useTransform(progress, [0, 0.38], [0, -60]);

  // Title 2: fade in 48–56%, hold 56–72%, fade out 72–82%
  const title2Opacity = useTransform(progress, [0.48, 0.56, 0.72, 0.82], [0, 1, 1, 0]);
  const title2Y = useTransform(progress, [0.48, 0.62], [40, 0]);

  // Title 3: fade in 88–94%, stay visible through last frame
  const title3Opacity = useTransform(progress, [0.88, 0.94], [0, 1]);
  const title3Y = useTransform(progress, [0.88, 0.96], [40, 0]);

  return (
    <div className="absolute inset-0 pointer-events-none z-[50]">
      <div className="h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Sequence 1 */}
        <motion.div
          style={{ opacity: title1Opacity, y: title1Y }}
          className="absolute text-center px-4"
        >
          <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl tracking-[0.2em] text-white uppercase drop-shadow-2xl">
            Perspective
            <br />
            Is Everything.
          </h1>
          <p className="mt-6 font-sans text-lg md:text-xl text-white/90 tracking-widest uppercase drop-shadow-md">
            Luxury redefined in the heart of the tropics.
          </p>
        </motion.div>

        {/* Sequence 2 */}
        <motion.div
          style={{ opacity: title2Opacity, y: title2Y }}
          className="absolute text-center px-4"
        >
          <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl tracking-[0.2em] text-white uppercase drop-shadow-2xl">
            You Deserve It.
          </h1>
          <p className="mt-6 font-sans text-lg md:text-xl text-white/90 tracking-widest uppercase drop-shadow-md">
            Transitions as seamless as the horizon.
          </p>
        </motion.div>

        {/* Sequence 3 — visible on last frames */}
        <motion.div
          style={{ opacity: title3Opacity, y: title3Y }}
          className="absolute text-center px-4"
        >
          <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl tracking-[0.2em] text-white uppercase drop-shadow-2xl">
            Your Journey
            <br />
            Awaits.
          </h1>
          <p className="mt-6 font-sans text-lg md:text-xl text-white/90 tracking-widest uppercase drop-shadow-md">
            Where every moment becomes a memory.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

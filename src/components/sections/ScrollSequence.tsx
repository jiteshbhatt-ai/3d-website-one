"use client";

import { useRef, useEffect } from "react";
import { useMotionValue, animate, type AnimationPlaybackControls } from "framer-motion";
import { useLenis } from "@studio-freight/react-lenis";
import { CanvasScroller } from "./CanvasScroller";
import { HeroText } from "../ui/HeroText";

interface Props {
  images: HTMLImageElement[];
  frameCount: number;
}

type Phase = "idle-start" | "playing-forward" | "idle-end" | "playing-backward";

const FULL_DURATION = 7; // seconds for the entire sequence

export const ScrollSequence = ({ images, frameCount }: Props) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);
  const phaseRef = useRef<Phase>("idle-start");
  const controlsRef = useRef<AnimationPlaybackControls | null>(null);
  const lenis = useLenis();

  const playForward = (from: number) => {
    phaseRef.current = "playing-forward";
    lenis?.stop();
    const remaining = 1 - from;
    controlsRef.current = animate(progress, 1, {
      duration: FULL_DURATION * remaining,
      ease: [0.42, 0, 0.58, 1],
      onComplete: () => {
        phaseRef.current = "idle-end";
        lenis?.start();
        requestAnimationFrame(() => {
          const section = sectionRef.current;
          const nextEl = section?.nextElementSibling as HTMLElement;
          if (nextEl && lenis) {
            lenis.scrollTo(nextEl, { duration: 1.2 });
          } else if (nextEl) {
            nextEl.scrollIntoView({ behavior: "smooth" });
          }
        });
      },
    });
  };

  const playBackward = (from: number) => {
    phaseRef.current = "playing-backward";
    lenis?.stop();
    controlsRef.current = animate(progress, 0, {
      duration: FULL_DURATION * from,
      ease: [0.42, 0, 0.58, 1],
      onComplete: () => {
        phaseRef.current = "idle-start";
        lenis?.start();
      },
    });
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const section = sectionRef.current;
      if (!section) return;

      const phase = phaseRef.current;
      const rect = section.getBoundingClientRect();
      const isSectionAtTop = rect.top > -50 && rect.top < 50;

      if (!isSectionAtTop) return;

      // Playing forward + scroll up → stop and reverse
      if (phase === "playing-forward" && e.deltaY < 0) {
        e.preventDefault();
        controlsRef.current?.stop();
        playBackward(progress.get());
        return;
      }

      // Playing backward + scroll down → stop and go forward
      if (phase === "playing-backward" && e.deltaY > 0) {
        e.preventDefault();
        controlsRef.current?.stop();
        playForward(progress.get());
        return;
      }

      // Block scroll during animation (same direction as current play)
      if (phase === "playing-forward" || phase === "playing-backward") {
        e.preventDefault();
        return;
      }

      // Idle at start → scroll down → play forward
      if (phase === "idle-start" && e.deltaY > 0) {
        e.preventDefault();
        playForward(0);
      }

      // Idle at end → scroll up → play backward
      if (phase === "idle-end" && e.deltaY < 0) {
        e.preventDefault();
        playBackward(1);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false, capture: true });
    return () => window.removeEventListener("wheel", handleWheel, { capture: true });
  }, [lenis, progress]);

  return (
    <div ref={sectionRef} className="relative h-screen">
      <CanvasScroller images={images} frameCount={frameCount} progress={progress} />
      <HeroText progress={progress} />
    </div>
  );
};

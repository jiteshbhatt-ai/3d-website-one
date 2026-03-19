"use client";

import { useState, useRef } from "react";
import { useImagePreloader } from "@/hooks/useImagePreloader";
import { useContainerScrollProgress } from "@/hooks/useContainerScrollProgress";
import { CanvasScroller } from "@/components/sections/CanvasScroller";
import { HeroText } from "@/components/ui/HeroText";
import { Navbar } from "@/components/ui/Navbar";
import { Preloader } from "@/components/ui/Preloader";
import { BookingForm } from "@/components/ui/BookingForm";
import { Footer } from "@/components/sections/Footer";

import { CursorGlow } from "@/components/ui/CursorGlow";

const FRAME_COUNT = 264;
const FRAME_PATH = "/sequence-1/";

export default function Home() {
  const { images, loadedCount, isComplete } = useImagePreloader(FRAME_COUNT, FRAME_PATH);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const progress = useContainerScrollProgress(scrollContainerRef);

  return (
    <main className="relative min-h-screen bg-black">
      {/* Loading Screen */}
      {!isComplete && (
        <Preloader progress={(loadedCount / FRAME_COUNT) * 100} />
      )}

      {/* Main Experience */}
      <div
        className={`relative z-10 transition-opacity duration-1000 ease-in-out ${isComplete ? "opacity-100" : "opacity-0"}`}
      >
        <CursorGlow />
        <Navbar onBookNow={() => setIsBookingOpen(true)} />

        {/* Scroll-scrubbed sequence */}
        <div ref={scrollContainerRef} className="relative h-[400vh]">
          <div className="sticky top-0 h-screen">
            <CanvasScroller images={images} frameCount={FRAME_COUNT} progress={progress} />
            <HeroText progress={progress} />
          </div>
        </div>

        {/* CTA section */}
        <div className="min-h-[60vh] bg-black/85 flex flex-col items-center justify-center text-center px-4 relative z-20">
          <h2 className="font-serif text-4xl md:text-6xl lg:text-8xl tracking-[0.2em] text-white uppercase mb-8 drop-shadow-sm">
            Your Journey<br />Awaits.
          </h2>
          <button
            onClick={() => setIsBookingOpen(true)}
            className="group relative overflow-hidden border border-brand-turquoise text-brand-turquoise px-8 py-5 mt-4 font-sans text-sm tracking-widest uppercase transition-all duration-300 hover:shadow-[0_0_25px_rgba(31,180,180,0.4)]"
          >
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">Start Your Reservation</span>
            <span className="absolute inset-0 bg-brand-turquoise scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
          </button>
        </div>

        {/* Footer */}
        <Footer />
      </div>

      <BookingForm
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </main>
  );
}

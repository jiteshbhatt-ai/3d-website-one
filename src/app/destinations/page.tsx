"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/ui/Navbar";
import { BookingForm } from "@/components/ui/BookingForm";
import { CursorGlow } from "@/components/ui/CursorGlow";

// Entire map must be client-only — Three.js crashes during SSR
const DestinationMap = dynamic(
  () => import("@/components/sections/DestinationMap").then(m => m.DestinationMap),
  { ssr: false, loading: () => <div className="h-screen bg-black" /> }
);

export default function DestinationsPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-black">
      <div className="relative z-10">
        <CursorGlow />
        <Navbar onBookNow={() => setIsBookingOpen(true)} />
        <DestinationMap />
      </div>

      <BookingForm
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </main>
  );
}

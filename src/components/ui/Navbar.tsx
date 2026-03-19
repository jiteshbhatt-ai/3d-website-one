"use client";

import React, { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import Link from "next/link";

export const Navbar = ({ onBookNow }: { onBookNow: () => void }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed left-1/2 -translate-x-1/2 z-50 flex items-center justify-between transition-all duration-500 ease-out ${
        scrolled
          ? "top-3 w-[95%] max-w-6xl px-5 py-3 rounded-full bg-black/60 backdrop-blur-xl border border-brand-turquoise/30 shadow-[0_0_20px_rgba(31,180,180,0.15)]"
          : "top-0 w-full px-8 py-6 rounded-none bg-white/10 backdrop-blur-md border border-transparent"
      }`}
    >
      <Link href="/" className="text-2xl font-serif tracking-widest text-white uppercase cursor-pointer hover:text-brand-turquoise transition-colors">
        Travel Co.
      </Link>
      <div className="flex items-center gap-8">
        <ul className="hidden md:flex items-center gap-8 text-white font-sans text-sm tracking-widest uppercase">
          <li><Link href="/destinations" className="hover:text-brand-turquoise transition-colors">Destinations</Link></li>
          <li><Link href="/" className="hover:text-brand-turquoise transition-colors">Experiences</Link></li>
          <li><Link href="/" className="hover:text-brand-turquoise transition-colors">Journal</Link></li>
        </ul>
        <button
          onClick={onBookNow}
          className={`group relative overflow-hidden bg-brand-turquoise text-white px-6 py-3 font-sans text-sm tracking-widest uppercase transition-all duration-500 hover:shadow-[0_0_20px_rgba(31,180,180,0.5)] ${scrolled ? "rounded-full" : ""}`}
        >
          <span className="relative z-10">Book Now</span>
          <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          <span className="absolute inset-0 z-10 flex items-center justify-center text-brand-turquoise font-sans text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            Book Now
          </span>
        </button>
        <button className="md:hidden text-white">
          <Menu size={24} />
        </button>
      </div>
    </nav>
  );
};

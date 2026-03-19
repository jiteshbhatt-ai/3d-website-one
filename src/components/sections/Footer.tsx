"use client";

import { RobotMascot } from "@/components/ui/RobotMascot";
import { ArrowRight } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative z-20">
      {/* Main footer area */}
      <div className="bg-gradient-to-b from-black/85 to-brand-turquoise">
        {/* Spacer for gradient transition */}
        <div className="h-32 md:h-48" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-center">
            {/* Left - Newsletter */}
            <div className="flex flex-col gap-6">
              <span className="font-sans text-xs tracking-[0.3em] uppercase text-white/70">
                Stay Up To Date
              </span>
              <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white lowercase leading-[1.1]">
                get our<br />newsletter
              </h3>
              <div className="flex items-center gap-3 mt-2">
                <div className="relative flex-1">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full bg-transparent border-b border-white/40 text-white placeholder-white/50 py-3 pr-10 font-sans text-sm tracking-wider outline-none focus:border-white transition-colors"
                  />
                </div>
                <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 hover:scale-110 transition-transform">
                  <ArrowRight size={20} className="text-brand-turquoise" />
                </button>
              </div>
            </div>

            {/* Center - Robot Mascot */}
            <div className="flex items-center justify-center">
              <RobotMascot />
            </div>

            {/* Right - Contact */}
            <div className="flex flex-col gap-4 md:items-end md:text-right">
              <span className="font-sans text-xs tracking-[0.3em] uppercase text-white/70">
                Get In Touch
              </span>
              <a href="mailto:hello@travelco.com" className="font-serif text-2xl md:text-3xl lg:text-4xl text-white hover:text-white/80 transition-colors">
                hello@travelco.com
              </a>
              <a href="tel:+11234567890" className="font-serif text-2xl md:text-3xl lg:text-4xl text-white hover:text-white/80 transition-colors">
                +1 (123) 456 7890
              </a>
              <div className="mt-2 font-sans text-sm text-white/80 leading-relaxed tracking-wider">
                <p>123 Paradise Avenue</p>
                <p>Maldives, 20026</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-brand-turquoise">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left links */}
          <div className="flex flex-wrap items-center gap-6 md:gap-8">
            <a href="#" className="font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/80 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/80 hover:text-white transition-colors">
              Disclaimer
            </a>
            <a href="#" className="font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/80 hover:text-white transition-colors">
              Terms and Conditions
            </a>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            <span className="font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/60 mr-2 hidden lg:block">
              See what we&apos;re up to
            </span>
            <SocialIcon href="#" label="Facebook">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </SocialIcon>
            <SocialIcon href="#" label="LinkedIn">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </SocialIcon>
            <SocialIcon href="#" label="Instagram">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </SocialIcon>
            <SocialIcon href="#" label="YouTube">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.13C5.12 19.56 12 19.56 12 19.56s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
            </SocialIcon>
          </div>
        </div>
      </div>
    </footer>
  );
};

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/20 transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </svg>
    </a>
  );
}

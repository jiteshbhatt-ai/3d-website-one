"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Destination } from "@/data/mapData";

interface Props {
  destination: Destination;
}

export const DestinationCard = ({ destination: dest }: Props) => {
  return (
    <motion.div
      key={dest.name}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.98 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="absolute bottom-12 left-6 md:left-12 z-30 w-72 md:w-80"
    >
      <div className="relative glass-card glow-border rounded-2xl overflow-hidden">
        {/* Image */}
        <div className="relative h-40 overflow-hidden">
          <Image
            src={dest.image}
            alt={dest.name}
            width={320}
            height={160}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <p className="absolute bottom-3 left-4 font-sans text-[10px] tracking-[0.3em] uppercase text-brand-turquoise">
            {dest.subtitle}
          </p>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-serif text-2xl md:text-3xl text-white uppercase tracking-wider mb-2">
            {dest.name}
          </h3>
          <p className="font-sans text-xs text-white/50 leading-relaxed mb-4 line-clamp-3">
            {dest.description}
          </p>
          <button className="group relative overflow-hidden border border-brand-turquoise text-brand-turquoise px-4 py-2 font-sans text-[10px] tracking-widest uppercase rounded-full transition-all duration-300 hover:shadow-[0_0_15px_rgba(31,180,180,0.4)]">
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
              Explore Destination
            </span>
            <span className="absolute inset-0 bg-brand-turquoise scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

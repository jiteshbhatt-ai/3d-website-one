"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const DESTINATIONS = [
  { name: "Maldives", subtitle: "Crystal Waters", image: "/sequence-1/0030.jpg", rotate: -3 },
  { name: "Bali", subtitle: "Temple Retreats", image: "/sequence-1/0060.jpg", rotate: 3 },
  { name: "Santorini", subtitle: "Aegean Sunsets", image: "/sequence-1/0100.jpg", rotate: -2 },
  { name: "Kyoto", subtitle: "Zen Gardens", image: "/sequence-1/0140.jpg", rotate: 4 },
  { name: "Patagonia", subtitle: "Wild Frontiers", image: "/sequence-1/0180.jpg", rotate: -3 },
  { name: "Swiss Alps", subtitle: "Peak Luxury", image: "/sequence-1/0220.jpg", rotate: 2 },
  { name: "Amalfi Coast", subtitle: "Coastal Dreams", image: "/sequence-1/0250.jpg", rotate: -4 },
];

export const DestinationCarousel = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-10%" });
  const [dragLimit, setDragLimit] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const calcLimits = () => {
      if (constraintsRef.current && innerRef.current) {
        const containerW = constraintsRef.current.offsetWidth;
        const contentW = innerRef.current.scrollWidth;
        setDragLimit(Math.min(0, -(contentW - containerW)));
      }
    };
    calcLimits();
    window.addEventListener("resize", calcLimits);
    return () => window.removeEventListener("resize", calcLimits);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black py-20 md:py-32 overflow-hidden"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="block font-sans text-xs tracking-[0.3em] uppercase text-brand-turquoise mb-4"
        >
          Our Destinations
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-4xl md:text-6xl lg:text-7xl text-white uppercase tracking-[0.15em]"
        >
          Where Will You<br />Wander Next?
        </motion.h2>
      </div>

      {/* Carousel */}
      <div ref={constraintsRef} className="relative w-full">
        <motion.div
          ref={innerRef}
          drag="x"
          dragConstraints={{ left: dragLimit, right: 0 }}
          dragElastic={0.08}
          dragMomentum
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setTimeout(() => setIsDragging(false), 50)}
          className="flex gap-6 md:gap-10 px-6 md:px-12"
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
        >
          {DESTINATIONS.map((dest, i) => (
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, y: 120 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 120 }}
              transition={{
                duration: 0.7,
                delay: 0.15 + i * 0.08,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="shrink-0"
              style={{ rotate: `${dest.rotate}deg` }}
            >
              <div
                className="relative w-[280px] h-[360px] md:w-[380px] md:h-[480px] lg:w-[420px] lg:h-[520px] rounded-2xl overflow-hidden shadow-2xl group select-none"
              >
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  sizes="(max-width: 768px) 280px, (max-width: 1024px) 380px, 420px"
                  className="object-cover pointer-events-none transition-transform duration-500 group-hover:scale-105"
                  draggable={false}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                {/* Text */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <p className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-brand-turquoise mb-2">
                    {dest.subtitle}
                  </p>
                  <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-white tracking-wider uppercase">
                    {dest.name}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="max-w-7xl mx-auto px-6 md:px-12 mt-16"
      >
        <button className="border border-brand-turquoise text-brand-turquoise px-8 py-4 font-sans text-sm tracking-widest uppercase hover:bg-brand-turquoise hover:text-white transition-all duration-300 rounded-full">
          Explore All Destinations
        </button>
      </motion.div>
    </section>
  );
};

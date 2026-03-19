"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "@studio-freight/react-lenis";
import * as THREE from "three";
import { DESTINATIONS, latLngToVector3 } from "@/data/mapData";
import { Globe } from "@/components/three/Globe";
import { DestinationCard } from "@/components/ui/DestinationCard";

const GLOBE_RADIUS = 2;
type Phase = "idle" | "animating";

function CameraController({ activeIndex }: { activeIndex: number }) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 1, 7));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    if (activeIndex === -1) {
      targetPos.current.set(0, 1, 7);
      targetLookAt.current.set(0, 0, 0);
    } else {
      const dest = DESTINATIONS[activeIndex];
      const pos = latLngToVector3(dest.lat, dest.lng, GLOBE_RADIUS);
      const destVec = new THREE.Vector3(pos.x, pos.y, pos.z);
      const camDir = destVec.clone().normalize();
      targetPos.current.copy(camDir.multiplyScalar(4.2));
      targetPos.current.y += 0.4;
      targetLookAt.current.copy(destVec.clone().normalize().multiplyScalar(GLOBE_RADIUS));
    }
  }, [activeIndex]);

  useFrame((_, delta) => {
    const speed = 2.5 * delta;
    camera.position.lerp(targetPos.current, speed);
    currentLookAt.current.lerp(targetLookAt.current, speed);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

export const DestinationMap = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const phaseRef = useRef<Phase>("idle");
  const indexRef = useRef(-1);
  const [activeIndex, setActiveIndex] = useState(-1);
  const lenis = useLenis();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const flyTo = useCallback(
    (targetIndex: number) => {
      phaseRef.current = "animating";
      lenis?.stop();
      setActiveIndex(targetIndex);
      indexRef.current = targetIndex;

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        phaseRef.current = "idle";
        lenis?.start();
      }, 1800);
    },
    [lenis]
  );

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      if (!(rect.top < vh * 0.5 && rect.bottom > vh * 0.5)) return;

      if (phaseRef.current === "animating") { e.preventDefault(); return; }

      const idx = indexRef.current;
      if (e.deltaY > 0) {
        if (idx < DESTINATIONS.length - 1) {
          e.preventDefault();
          if (idx === -1 && lenis && Math.abs(rect.top) > 5) lenis.scrollTo(section, { duration: 0.4 });
          flyTo(idx + 1);
        }
        return;
      }
      if (e.deltaY < 0 && idx >= 0) {
        e.preventDefault();
        flyTo(idx - 1);
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: false, capture: true });
    return () => window.removeEventListener("wheel", handleWheel, { capture: true });
  }, [flyTo, lenis]);

  const dest = activeIndex >= 0 ? DESTINATIONS[activeIndex] : null;

  return (
    <section ref={sectionRef} className="relative h-screen bg-black overflow-hidden">
      <div className="absolute top-8 left-6 md:left-12 z-20">
        <span className="font-sans text-xs tracking-[0.3em] uppercase text-brand-turquoise">Our Destinations</span>
      </div>

      {/* 3D Globe */}
      <Canvas camera={{ position: [0, 1, 7], fov: 45 }} className="absolute inset-0" gl={{ antialias: true }}>
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 3, 5]} intensity={1.5} />
        <directionalLight position={[-5, -2, -5]} intensity={0.4} />
        <pointLight position={[-3, 2, -3]} intensity={0.6} color="#1FB4B4" />
        <Stars radius={50} depth={60} count={2000} factor={4} saturation={0} fade speed={0.5} />
        <Globe activeIndex={activeIndex} onPinClick={flyTo} />
        <CameraController activeIndex={activeIndex} />
      </Canvas>

      {/* Destination Card */}
      <AnimatePresence mode="wait">
        {dest && <DestinationCard destination={dest} />}
      </AnimatePresence>

      {/* Progress dots */}
      <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4">
        {DESTINATIONS.map((d, i) => (
          <button key={d.name} onClick={() => flyTo(i)} className="flex items-center gap-3 group">
            {activeIndex === i && (
              <motion.span initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                className="font-sans text-[10px] tracking-widest uppercase text-white/60 hidden md:block">{d.name}</motion.span>
            )}
            <div className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
              activeIndex === i ? "bg-brand-turquoise scale-150 shadow-[0_0_8px_rgba(31,180,180,0.6)]" : "bg-white/20 group-hover:bg-white/40"
            }`} />
          </button>
        ))}
      </div>

      {/* Scroll hint */}
      <AnimatePresence>
        {activeIndex === -1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-px h-8 bg-white/40" />
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/50">Scroll to explore</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

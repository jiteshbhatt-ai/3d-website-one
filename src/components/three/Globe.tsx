"use client";

import { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Line, Html } from "@react-three/drei";
import * as THREE from "three";
import { DESTINATIONS, latLngToVector3 } from "@/data/mapData";

const GLOBE_RADIUS = 2;

interface GlobeProps {
  activeIndex: number;
  onPinClick?: (index: number) => void;
}

/** Generate arc between two destinations */
function generateArc(from: { lat: number; lng: number }, to: { lat: number; lng: number }, segments: number = 50) {
  const pts: THREE.Vector3[] = [];
  const v1 = latLngToVector3(from.lat, from.lng, GLOBE_RADIUS);
  const v2 = latLngToVector3(to.lat, to.lng, GLOBE_RADIUS);
  const vec1 = new THREE.Vector3(v1.x, v1.y, v1.z);
  const vec2 = new THREE.Vector3(v2.x, v2.y, v2.z);

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const point = new THREE.Vector3().lerpVectors(vec1, vec2, t).normalize();
    const elevation = 1 + 0.06 * Math.sin(t * Math.PI);
    point.multiplyScalar(GLOBE_RADIUS * elevation);
    pts.push(point);
  }
  return pts;
}

function DestinationPin({ dest, isActive, onClick }: {
  dest: typeof DESTINATIONS[0];
  isActive: boolean;
  onClick: () => void;
}) {
  const ringRef = useRef<THREE.Mesh>(null);
  const pos = latLngToVector3(dest.lat, dest.lng, GLOBE_RADIUS);
  const surfacePos = new THREE.Vector3(pos.x, pos.y, pos.z);
  const normal = surfacePos.clone().normalize();
  const pinHeight = isActive ? 0.3 : 0.18;
  const pinTop = surfacePos.clone().add(normal.clone().multiplyScalar(pinHeight));

  useFrame((_, delta) => {
    if (ringRef.current && isActive) {
      ringRef.current.scale.lerp(new THREE.Vector3(1.8, 1.8, 1.8), delta * 2);
      const mat = ringRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.max(0, mat.opacity - delta * 0.5);
      if (mat.opacity <= 0.05) {
        ringRef.current.scale.set(0.5, 0.5, 0.5);
        mat.opacity = 0.7;
      }
    }
  });

  // Orient ring to face outward from globe surface
  const quaternion = new THREE.Quaternion();
  quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);

  return (
    <group>
      {/* Pin stem */}
      <Line
        points={[surfacePos, pinTop]}
        color={isActive ? "#1FB4B4" : "#0E9494"}
        lineWidth={isActive ? 2.5 : 1.5}
      />

      {/* Pin head glow */}
      {isActive && (
        <mesh position={pinTop}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color="#1FB4B4" transparent opacity={0.2} />
        </mesh>
      )}

      {/* Pin head */}
      <mesh position={pinTop} onClick={onClick}>
        <sphereGeometry args={[isActive ? 0.055 : 0.035, 16, 16]} />
        <meshStandardMaterial
          color={isActive ? "#1FB4B4" : "#0E9494"}
          emissive={isActive ? "#1FB4B4" : "#000000"}
          emissiveIntensity={isActive ? 0.8 : 0}
        />
      </mesh>

      {/* White core */}
      <mesh position={pinTop}>
        <sphereGeometry args={[isActive ? 0.025 : 0.015, 12, 12]} />
        <meshBasicMaterial color="white" />
      </mesh>

      {/* Pulse ring on surface */}
      {isActive && (
        <mesh ref={ringRef} position={surfacePos.clone().add(normal.clone().multiplyScalar(0.01))} quaternion={quaternion}>
          <ringGeometry args={[0.06, 0.08, 32]} />
          <meshBasicMaterial color="#1FB4B4" transparent opacity={0.7} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Surface glow circle */}
      <mesh position={surfacePos.clone().add(normal.clone().multiplyScalar(0.005))} quaternion={quaternion}>
        <circleGeometry args={[isActive ? 0.08 : 0.05, 32]} />
        <meshBasicMaterial color="#1FB4B4" transparent opacity={isActive ? 0.4 : 0.15} side={THREE.DoubleSide} />
      </mesh>

      {/* Label */}
      {isActive && (
        <Html position={[pinTop.x + normal.x * 0.15, pinTop.y + normal.y * 0.15 + 0.1, pinTop.z + normal.z * 0.15]} center distanceFactor={5}>
          <div className="whitespace-nowrap font-sans text-[10px] tracking-widest uppercase text-brand-turquoise bg-black/70 px-3 py-1.5 rounded-full backdrop-blur-sm border border-brand-turquoise/30 shadow-[0_0_12px_rgba(31,180,180,0.3)]">
            {dest.name}
          </div>
        </Html>
      )}
    </group>
  );
}

export function Globe({ activeIndex, onPinClick }: GlobeProps) {
  const globeRef = useRef<THREE.Group>(null);

  const earthTexture = useLoader(THREE.TextureLoader, "/textures/earth-blue.jpg");
  const bumpTexture = useLoader(THREE.TextureLoader, "/textures/earth-topology.png");

  const arcs = useMemo(() => {
    const result: THREE.Vector3[][] = [];
    for (let i = 0; i < DESTINATIONS.length - 1; i++) {
      result.push(generateArc(DESTINATIONS[i], DESTINATIONS[i + 1]));
    }
    return result;
  }, []);

  // Slow idle rotation
  useFrame((_, delta) => {
    if (globeRef.current && activeIndex === -1) {
      globeRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group ref={globeRef}>
      {/* Earth globe with real map texture */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          bumpMap={bumpTexture}
          bumpScale={0.05}
          roughness={0.7}
          metalness={0.0}
          emissiveMap={earthTexture}
          emissive="#ffffff"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Atmosphere glow */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS * 1.015, 64, 64]} />
        <meshBasicMaterial color="#1FB4B4" transparent opacity={0.06} side={THREE.BackSide} />
      </mesh>

      {/* Outer atmosphere halo */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS * 1.08, 64, 64]} />
        <meshBasicMaterial color="#1FB4B4" transparent opacity={0.02} side={THREE.BackSide} />
      </mesh>

      {/* Route arcs */}
      {arcs.map((pts, i) => (
        <Line key={`arc-${i}`} points={pts} color="#1FB4B4" lineWidth={1.2} transparent opacity={0.4} dashed dashSize={0.04} gapSize={0.025} />
      ))}

      {/* Destination pins */}
      {DESTINATIONS.map((dest, i) => (
        <DestinationPin
          key={dest.name}
          dest={dest}
          isActive={activeIndex === i}
          onClick={() => onPinClick?.(i)}
        />
      ))}
    </group>
  );
}

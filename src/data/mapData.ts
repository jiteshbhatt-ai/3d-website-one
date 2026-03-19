export interface Destination {
  name: string;
  subtitle: string;
  description: string;
  image: string;
  lat: number;
  lng: number;
}

export const DESTINATIONS: Destination[] = [
  {
    name: "Santorini",
    subtitle: "Aegean Sunsets",
    description: "Perched above the caldera, whitewashed villas meet volcanic cliffs and endless blue. Santorini is where time slows to the rhythm of the Aegean.",
    image: "/sequence-1/0040.jpg",
    lat: 36.39,
    lng: 25.43,
  },
  {
    name: "Maldives",
    subtitle: "Crystal Waters",
    description: "A constellation of islands floating on turquoise glass. Overwater bungalows, private reefs, and sunsets that burn twice — once in the sky, once in the sea.",
    image: "/sequence-1/0090.jpg",
    lat: 3.20,
    lng: 73.22,
  },
  {
    name: "Bali",
    subtitle: "Temple Retreats",
    description: "Sacred temples rise through jungle canopy while rice terraces cascade down emerald hillsides. Bali is a spiritual journey disguised as paradise.",
    image: "/sequence-1/0140.jpg",
    lat: -8.34,
    lng: 115.09,
  },
  {
    name: "Kyoto",
    subtitle: "Zen Gardens",
    description: "Ancient tea houses, bamboo groves, and golden pavilions reflected in still water. Kyoto preserves a Japan that whispers rather than shouts.",
    image: "/sequence-1/0190.jpg",
    lat: 35.01,
    lng: 135.77,
  },
  {
    name: "Swiss Alps",
    subtitle: "Peak Luxury",
    description: "Snow-capped summits, alpine meadows, and world-class chalets perched above the clouds. The Alps redefine what it means to escape above it all.",
    image: "/sequence-1/0240.jpg",
    lat: 46.82,
    lng: 8.23,
  },
];

/** Convert lat/lng (degrees) to 3D position on a unit sphere */
export function latLngToVector3(lat: number, lng: number, radius: number = 1) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return {
    x: -(radius * Math.sin(phi) * Math.cos(theta)),
    y: radius * Math.cos(phi),
    z: radius * Math.sin(phi) * Math.sin(theta),
  };
}

export type Product = {
  slug: string;
  title: string;
  description: string;
  price: number;
  tags: string[];
  limited?: boolean;
};

export const allProducts: Product[] = [
  {
    slug: "smile-glitch-01",
    title: "Smile Glitch 01",
    description: "Faccia glitchata — good vibes con twist digitale.",
    price: 3.5,
    tags: ["glitch", "neon", "weirdcore"],
    limited: true
  },
  {
    slug: "neon-mood-02",
    title: "Neon Mood 02",
    description: "Emozione neon — colori vibranti e contorni deformati.",
    price: 3.0,
    tags: ["neon", "abstract"]
  },
  {
    slug: "faces-from-mars-03",
    title: "Faces from Mars 03",
    description: "Psichedelia pop da un altro pianeta.",
    price: 3.0,
    tags: ["psychedelic", "pop"],
    limited: true
  }
];

export function findBySlug(slug: string) {
  return allProducts.find(p => p.slug === slug);
}

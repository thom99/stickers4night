'use client';
import { create } from "zustand";

type CartItem = { slug: string; title: string; price: number; qty: number };
type CartState = {
  items: CartItem[];
  add: (p: { slug: string; title: string; price: number }) => void;
  remove: (slug: string) => void;
  total: () => number;
};

function load() {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem("s4n_cart") || "[]"); } catch { return []; }
}

export const useCartStore = create<CartState>((set, get) => ({
  items: load(),
  add: (p) => set(s => {
    const existing = s.items.find(i => i.slug === p.slug);
    let items;
    if (existing) {
      items = s.items.map(i => i.slug === p.slug ? { ...i, qty: i.qty + 1 } : i);
    } else {
      items = [...s.items, { ...p, qty: 1 }];
    }
    if (typeof window !== "undefined") localStorage.setItem("s4n_cart", JSON.stringify(items));
    return { items };
  }),
  remove: (slug) => set(s => {
    const items = s.items.filter(i => i.slug != slug);
    if (typeof window !== "undefined") localStorage.setItem("s4n_cart", JSON.stringify(items));
    return { items };
  }),
  total: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0)
}));

'use client';
import { useCartStore } from "@/lib/cart";

export default function AddToCartButton({ product }: { product: { slug: string; title: string; price: number } }) {
  const { add } = useCartStore();
  return (
    <button
      onClick={() => add(product)}
      className="mt-4 rounded-xl border border-white/20 px-4 py-2 hover:bg-white/10"
    >
      Aggiungi al carrello
    </button>
  );
}

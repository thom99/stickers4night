'use client';
import { useCartStore } from "@/lib/cart";
import Link from "next/link";

export default function Page() {
  const { items, total, remove } = useCartStore();
  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">Carrello</h1>
      {items.length === 0 ? (
        <p>Nessun elemento nel carrello. <Link href="/shop" className="underline">Vai allo shop</Link></p>
      ) : (
        <div className="space-y-4">
          {items.map((it, i) => (
            <div key={i} className="flex items-center justify-between border border-white/10 rounded-xl p-4">
              <div>
                <div className="font-semibold">{it.title}</div>
                <div className="text-sm opacity-80">€ {it.price.toFixed(2)} × {it.qty}</div>
              </div>
              <button onClick={() => remove(it.slug)} className="text-sm opacity-80 hover:opacity-100">Rimuovi</button>
            </div>
          ))}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="text-xl font-bold">Totale: € {total().toFixed(2)}</div>
            <Link href="/checkout" className="rounded-xl border border-white/20 px-4 py-2 hover:bg-white/10">Checkout</Link>
          </div>
        </div>
      )}
    </section>
  );
}

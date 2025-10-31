import Link from "next/link";
import ProductGrid from "@/components/ProductGrid";
import { allProducts } from "../lib/products";

export default function Page() {
  const featured = allProducts.slice(0, 6);
  return (
    <section className="space-y-10">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 p-10">
        <div className="absolute inset-0 -z-10 grad-neon opacity-60" />
        <h1 className="text-4xl md:text-6xl font-black tracking-tight">
          Arte che puoi staccare.
          <br />
          Weirdcore. Neon. Collezionabile.
        </h1>
        <p className="mt-4 max-w-xl text-white/80">
          Facce espressive e glitch emotivi. Serie a tiratura limitata,
          numerate. Entra nell’universo di Sticky4night.
        </p>
        <div className="mt-6 flex gap-3">
          <Link
            href="/shop"
            className="rounded-xl border border-white/20 px-4 py-2 hover:bg-white/10"
          >
            Compra ora
          </Link>
          <Link
            href="/drops"
            className="rounded-xl border border-white/20 px-4 py-2 hover:bg-white/10"
          >
            Prossimi drop
          </Link>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">In evidenza</h2>
        <ProductGrid products={featured} />
      </div>
    </section>
  );
}


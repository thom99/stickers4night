import Link from "next/link";
import type { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`} className="group block rounded-2xl border border-white/10 overflow-hidden">
      <div className="relative aspect-square">
        <div className="absolute inset-0 grad-neon opacity-70 group-hover:opacity-90 transition-opacity" />
      </div>
      <div className="p-3 flex items-center justify-between">
        <div>
          <div className="font-semibold">{product.title}</div>
          <div className="text-sm opacity-70">€ {product.price.toFixed(2)}</div>
        </div>
        {product.limited && <span className="text-xs opacity-80">Limited</span>}
      </div>
    </Link>
  );
}

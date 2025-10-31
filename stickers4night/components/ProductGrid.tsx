import ProductCard from "./ProductCard";
import type { Product } from "@/lib/products";

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {products.map(p => <ProductCard key={p.slug} product={p} />)}
    </div>
  );
}

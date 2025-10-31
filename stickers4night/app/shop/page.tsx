import ProductGrid from "@/components/ProductGrid";
import { allProducts } from "@/lib/products";

export default function Page() {
  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">Shop</h1>
      <ProductGrid products={allProducts} />
    </section>
  );
}

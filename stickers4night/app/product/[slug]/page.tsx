import { allProducts, findBySlug } from "@/lib/products";
import AddToCartButton from "@/components/AddToCartButton";
import Image from "next/image";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return allProducts.map(p => ({ slug: p.slug }));
}

export default function Page({ params }: Props) {
  const product = findBySlug(params.slug);
  if (!product) return <div>Not found</div>;
  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10">
        {/* Placeholder gradient as image substitute */}
        <div className="absolute inset-0 grad-neon opacity-80" />
      </div>
      <div>
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-white/80 mt-2">{product.description}</p>
        <p className="text-2xl font-black mt-4">€ {product.price.toFixed(2)}</p>
        <AddToCartButton product={product} />
        <ul className="mt-6 text-sm text-white/70 space-y-2 list-disc ml-5">
          <li>Dimensioni: 7–9 cm, vinile premium</li>
          <li>Finitura: lucida / olografica</li>
          <li>Numerata: {product.limited ? "Sì" : "No"}</li>
        </ul>
      </div>
    </div>
  );
}

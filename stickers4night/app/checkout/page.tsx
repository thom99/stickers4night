export default function Page() {
  return (
    <section className="max-w-lg">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <p className="text-white/80">Placeholder checkout. Integra Stripe Checkout o Shopify cart per i pagamenti.</p>
      <ul className="text-sm mt-4 list-disc ml-5">
        <li>Stripe: crea una sessione serverless /api/checkout/session.</li>
        <li>Shopify: usa Storefront API & cart webUrl.</li>
      </ul>
    </section>
  );
}

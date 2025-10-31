# Stickers4Night — MVP

MVP e-commerce in Next.js (App Router) per vendita di sticker weirdcore/neon, con carrello in client state (Zustand), pagine prodotto statiche e placeholder per Stripe/Shopify.

## Avvio

```bash
pnpm i # o npm i / yarn
pnpm dev
```

## Struttura
- `app/` — pagine (Home, Shop, Product, Cart, Checkout, Drops, Manifesto, Collab)
- `components/` — UI (ProductCard, ProductGrid, AddToCartButton)
- `lib/` — dati prodotti + store carrello
- `tailwind` — stile neon/dark
- integrazione pagamenti: implementa Stripe Checkout in `/app/api/checkout/session` oppure usa Shopify Storefront API.

## Idee future
- Art Drops con countdown e tirature numerate
- Collaborazioni con illustratori / brand streetwear
- Serie legate a eventi/festival
- Recensioni, wishlist, account, ordini

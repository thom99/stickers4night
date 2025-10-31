# stickers4night

- Migliorare stile UX e UI del sito;
- Login e Registrazione => account con i preferiti
- Catalogare gli sticker da mettere in evidenzia (landing page - i nuovi usciti o i più bello - max 10) => colonna DB es. "main";
- Art drops pubblicare nuove collezioni (es. halloween etc.) => colonna DB "collection";
- Creare Admin dashboard in cui possiamo caricare i file di sticker generici (cta "Carica stickers") o collezioni +files (cta "Carica collezione");
- Cambiare il "Manifesto";
- Agganciare servizio di pagamento con Stripe;

# in futuro

- Collab => colonna DB "collab";
- Login e Registrazione => account con gli sticker salvati sul carrello (gestire a DB)

# Stickers4Night — Roadmap & Technical Taskboard v1

## Vision breve

E‑commerce moderno per sticker artistici (weirdcore/neon), con drops tematici, preferiti, carrello persistente, pagamenti Stripe e dashboard admin per caricamento catalogo/collezioni.

---

## Roadmap (priorità)

- **P0 (Core MVP transazionale)**

  - UX/UI pass (typography, spacing, states, responsive, dark mode).
  - Auth (login/registrazione, reset password) + profilo utente.
  - Catalogo + dettagli prodotto + carrello + checkout con Stripe.
  - Evidenza in homepage ("main" max 10) + "collection" per drops.
  - Admin: upload singoli sticker + collezioni.
  - Manifesto (nuovo testo + sezione dedicata).

- **P1 (Retention & contenuto)**

  - Preferiti (wishlist) per account.
  - Art drops programmati + scheduling (visibilità per data).
  - SEO base (metadati, og:image, sitemap, robots) + performance (LCP/CLS/INP).

- **P2 (Growth & collab)**

  - Collaborazioni (flag "collab" + pagina hub).
  - Newsletter (opt‑in marketing) + teaser series.
  - Analytics eventi (add_to_cart, begin_checkout, purchase).

```markdown
## 🧩 Stickers4Night — Taskboard

| ID      | Epic / Area | Task                                                                  | Priorità | Stato   | Criteri di accettazione                                                                                                   |
| ------- | ----------- | --------------------------------------------------------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------- |
| **T1**  | UX/UI       | Uniformare tipografia, spazi, bottoni, hover/focus; dark theme pulita | P0       | 🟠 Todo | Audit UI; componenti Button/Input/Card/ImageBadge; stati focus accessibili; layout responsive < 360px; Lighthouse UI ≥ 90 |
| **T2**  | Auth        | Login/SignUp/Reset + sessione; pagina Profilo                         | P0       | 🟠 Todo | Login/SignUp funzionanti; redirect; token lato server; pagina `/account` con dati base                                    |
| **T3**  | Catalogo    | DB stickers + listing + filtri base; pagina dettaglio                 | P0       | 🟠 Todo | Lista con paginazione; scheda prodotto con immagini multiple; prezzo, tag, disponibilità                                  |
| **T4**  | Homepage    | Sezione “In evidenza” (colonna main=true, max 10)                     | P0       | 🟠 Todo | Query limita a 10; fallback se vuoto; skeleton loading                                                                    |
| **T5**  | Drops       | Collezioni (collection=slug); pagina `/collections/[slug]`            | P0       | 🟠 Todo | CRUD collezioni; pagina con banner + grid                                                                                 |
| **T6**  | Admin       | Dashboard upload: singolo sticker e intera collezione                 | P0       | 🟠 Todo | Form con upload multiplo, anteprima, validazioni, progress; ruoli admin                                                   |
| **T7**  | Manifesto   | Riscrivere manifesto + pagina dedicata                                | P0       | 🟠 Todo | Nuovo testo live; link da footer e header                                                                                 |
| **T8**  | Stripe      | Checkout, webhooks, fulfillment stub                                  | P0       | 🟠 Todo | createCheckoutSession; webhook purchase; salvataggio ordine                                                               |
| **T9**  | Wishlist    | Preferiti per utente loggato                                          | P1       | 🟠 Todo | Toggle cuore; pagina `/favorites`; server-side guard                                                                      |
| **T10** | Scheduling  | Data di pubblicazione per drops                                       | P1       | 🟠 Todo | Campo `publish_at`; visibile solo se now ≥ publish_at                                                                     |
| **T11** | SEO / Perf  | Meta, OG, sitemap, robots, LCP/CLS/INP                                | P1       | 🟠 Todo | Lighthouse Perf ≥ 90 mobile; `sitemap.xml` e `robots.txt` generati                                                        |
| **T12** | Collab      | Flag collab e pagina `/collab`                                        | P2       | 🟠 Todo | Filtri/landing collab; badge nelle card                                                                                   |
```

---

Vuoi che aggiunga anche una sezione sotto tipo **“Legenda stato”** (🟠 Todo / 🟡 In Progress / ✅ Done) per rendere la tabella più chiara nel README?

---

## Modello dati (Postgres/Supabase ‑ può essere adattato)

### Tabelle principali

- **users** (gestite da provider auth)

  - id (uuid, PK)
  - username, avatar_url
  - role (enum: user, admin)

- **stickers**

  - id (uuid, PK)
  - slug (unique)
  - title
  - description
  - price_cents (int)
  - currency (text, default EUR)
  - collection_slug (fk → collections.slug, nullable)
  - main (boolean, default false) ← _per homepage, max 10_
  - collab (boolean, default false)
  - stock (int, default 0)
  - images (jsonb[]) ← url, alt
  - tags (text[])
  - visible (boolean, default true)
  - publish_at (timestamptz, nullable)
  - created_at, updated_at

- **collections**

  - id (uuid, PK)
  - slug (unique)
  - title
  - subtitle
  - banner_url
  - description_md
  - publish_at (timestamptz)
  - visible (boolean, default true)

- **favorites**

  - user_id (uuid, fk → users.id)
  - sticker_id (uuid, fk → stickers.id)
  - PRIMARY KEY (user_id, sticker_id)

- **carts**

  - id (uuid, PK)
  - user_id (uuid, fk nullable per guest via cookie anon)
  - created_at, updated_at

- **cart_items**

  - id (uuid, PK)
  - cart_id (fk → carts.id)
  - sticker_id (fk → stickers.id)
  - qty (int)
  - unit*price_cents (int) ← \_snapshot al momento dell’aggiunta*

- **orders**

  - id (uuid, PK)
  - user_id (uuid)
  - status (enum: created, paid, failed, refunded)
  - total_cents (int)
  - currency (text)
  - stripe_payment_intent (text)
  - created_at

- **order_items**

  - id (uuid, PK)
  - order_id (fk → orders.id)
  - sticker_id (fk → stickers.id)
  - qty (int)
  - unit_price_cents (int)

- **manifests**

  - id (uuid, PK)
  - title
  - body_md
  - version (int)
  - published_at (timestamptz)

- **uploads** (audit opzionale)

  - id (uuid, PK)
  - user_id (admin)
  - payload (jsonb)
  - created_at

> Indici: `stickers(main)`, `stickers(collection_slug)`, `stickers(collab)`, `stickers(publish_at, visible)`, `cart_items(cart_id)`, `favorites(user_id)`, `orders(user_id, created_at)`.

---

## Rotte/app structure (Next.js App Router)

- `/` – Landing con "main" (max 10) + sezioni collection/collab
- `/shop` – Catalogo con filtri (tag, price, collab)
- `/stickers/[slug]` – Dettaglio prodotto
- `/collections/[slug]` – Listing di una collezione
- `/collab` – Hub collaborazioni
- `/manifesto` – Nuovo manifesto
- `/account` – Profilo, ordini, preferiti
- `/cart` – Carrello
- `/checkout` – Checkout → Stripe session
- `/admin` – Dashboard (protected)

  - `/admin/stickers` – CRUD + upload
  - `/admin/collections` – CRUD + upload batch
  - `/admin/orders` – read‑only ordini

---

## API (route handlers)

- `POST /api/checkout/session` → crea sessione Stripe da cart
- `POST /api/stripe/webhook` → aggiorna `orders`
- `POST /api/admin/stickers` → create (admin)
- `POST /api/admin/collections` → create con batch upload (admin)
- `POST /api/favorites/toggle` → upsert preferito
- `POST /api/cart/add|update|remove|merge` → gestione carrello

---

## Redux slices suggeriti

- `authSlice` → user/session, role, loading
- `catalogSlice` → stickers list, filters, pagination, status
- `collectionsSlice` → liste e dettaglio collection
- `favoritesSlice` → ids utente, optimistic update
- `cartSlice` → items {id, qty, unitPrice}, totals, hydrate da DB/cookie
- `uiSlice` → modali, toast, theme

> Persistenz a: cart e favorites via server per utenti loggati; per guest via cookie + merge on login.

---

## Admin Dashboard (MVP)

**Stickers**

- Form: title, slug, price, stock, main, collab, collection, images[], tags[]
- Upload multiplo (drag&drop), progress, validazioni

**Collections**

- Crea collezione con banner, testi, publish_at
- Bulk upload: associare N sticker a `collection_slug`

**Sicurezza**

- Ruolo `admin` via RLS/policy; tutte le write protette

---

## Stripe integrazione (flow)

1. Client chiama `POST /api/checkout/session` con `cart_id` (o items)
2. Server valida stock/prezzi, crea `Checkout Session` (mode=payment)
3. Redirect a Stripe Hosted Checkout
4. Webhook `checkout.session.completed` →

   - crea `order` + `order_items`
   - decrementa `stock`
   - segna `status=paid`

5. Pagina `/account/orders/[id]` mostra ricevuta

> Non dimenticare testi legali: termini, privacy, resi.

---

## Definition of Done (per feature)

- Copertura unit/integration sui reducer e API handlers critici
- Accessibilità: focus order, aria‑labels, contrasti
- Logging errori lato server
- Lighthouse mobile ≥ 90 (Perf/Best/SEO)
- Documentazione README sezione Deploy e Env

---

## Sprint suggerito (prossime 48h)

1. T1 UX/UI base (design tokens + componenti Button/Input/Card)
2. T2 Auth + pagina /account (stub)
3. T3 Catalogo + T4 Homepage main (query con limite 10)
4. T6 Admin: skeleton pagine + upload singolo sticker
5. Setup Stripe keys + route `checkout/session` (stub)


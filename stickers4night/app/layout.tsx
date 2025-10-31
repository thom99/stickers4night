import "./globals.css";
import { ReactNode } from "react";
import Link from "next/link";

export const metadata = {
  title: "Stickers4Night",
  description: "Neon weirdcore stickers — art you can peel.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="it">
      <body className="min-h-dvh antialiased selection:bg-neon.green/30">
        <div className="fixed inset-0 -z-10 grad-neon opacity-70" />
        <header className="sticky top-0 z-40 backdrop-blur border-b border-white/10 bg-black/40">
          <nav className="mx-auto max-w-6xl px-4 h-14 flex items-center gap-6 text-sm">
            <Link href="/" className="font-black tracking-tight text-white">
              Stickers4Night
            </Link>
            <div className="ml-auto flex items-center gap-4">
              <Link href="/shop">Shop</Link>
              <Link href="/drops">Art Drops</Link>
              <Link href="/manifesto">Manifesto</Link>
              {/* <Link href="/collab">Collab</Link> */}
              <Link href="/cart">Cart</Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
        <footer className="mx-auto max-w-6xl px-4 py-10 text-xs opacity-80">
          © {new Date().getFullYear()} Stickers4Night — Neon weirdcore art
          stickers.
        </footer>
      </body>
    </html>
  );
}


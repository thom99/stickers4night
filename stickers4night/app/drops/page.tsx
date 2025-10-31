export default function Page() {
  return (
    <section>
      <h1 className="text-3xl font-bold mb-2">Art Drops</h1>
      <p className="text-white/80 mb-6">Serie limitate con countdown, legate a eventi o collaborazioni. Esempi: Neon Mood, Smile Glitch, Faces from Mars.</p>
      <div className="grid md:grid-cols-3 gap-6">
        {[1,2,3].map(i => (
          <div key={i} className="rounded-2xl border border-white/10 p-6 relative overflow-hidden">
            <div className="absolute inset-0 grad-neon opacity-60" />
            <h3 className="font-bold">Drop #{i}</h3>
            <p className="text-sm opacity-80">Tiratura 100 — numerati.</p>
          </div>
        ))}
      </div>
    </section>
  );
}

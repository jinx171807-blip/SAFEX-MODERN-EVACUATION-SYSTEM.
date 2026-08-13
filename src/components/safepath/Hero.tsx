const STATS = [
  { value: "<1s", label: "Reroute latency" },
  { value: "3", label: "Hazard classes tracked" },
  { value: "100%", label: "Offline-capable nodes" },
];

export function Hero() {
  return (
    <header className="relative overflow-hidden">
      <div className="grid-floor absolute inset-0 opacity-40" aria-hidden />
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(60% 60% at 20% 0%, color-mix(in oklab, var(--primary) 18%, transparent), transparent 70%)",
        }}
      />
      <nav className="relative mx-auto flex max-w-6xl items-center justify-between px-5 py-6">
        <span className="font-display text-lg font-bold tracking-tight">
          Safe<span className="text-primary">Path</span>
        </span>
        <div className="hidden gap-6 text-sm text-muted-foreground sm:flex">
          <a href="#simulation" className="hover:text-foreground">Simulation</a>
          <a href="#how" className="hover:text-foreground">How it works</a>
          <a href="#roadmap" className="hover:text-foreground">Roadmap</a>
          <a href="#team" className="hover:text-foreground">Team</a>
        </div>
      </nav>

      <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-10 sm:pt-16">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 font-mono text-xs uppercase tracking-widest text-primary">
          <span className="h-2 w-2 rounded-full bg-hazard" style={{ animation: "pulse-ring 1.8s infinite" }} />
          Emergency systems research
        </span>
        <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.05] sm:text-6xl">
          Exit signs point the same way during every fire. SafePath doesn't.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
          SafePath turns a building into a live graph of zones, doorways and hazards, then
          guides every occupant along the safest route that still exists — updating as smoke,
          fire and crowds move.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#simulation"
            className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Run the simulation
          </a>
          <a
            href="#roadmap"
            className="rounded-lg border border-border px-5 py-3 text-sm font-semibold transition hover:bg-secondary"
          >
            See the roadmap
          </a>
        </div>
        <dl className="mt-12 grid max-w-xl grid-cols-3 gap-4">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card p-4">
              <dt className="font-display text-2xl font-bold text-primary">{s.value}</dt>
              <dd className="mt-1 text-xs text-muted-foreground">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
}

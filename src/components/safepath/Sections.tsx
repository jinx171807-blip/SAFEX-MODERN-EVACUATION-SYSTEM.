const FEATURES = [
  {
    title: "Zone-aware routing",
    body: "The building is modelled as a graph of zones and doorways. Every hazard reading reweights edges, so guidance follows a genuinely safe corridor instead of the nearest exit sign.",
  },
  {
    title: "Sub-second rerouting",
    body: "Sensor deltas stream into the routing core and a new path is published in under a second — fast enough for people already moving.",
  },
  {
    title: "Crowd-load balancing",
    body: "When a stairwell saturates, occupants are split across alternate exits to cut queueing time instead of funnelling everyone into one bottleneck.",
  },
  {
    title: "Works when the network doesn't",
    body: "Nodes hold the last known floor graph and keep directing locally over mesh radio if the uplink drops mid-incident.",
  },
  {
    title: "Responder view",
    body: "Incident command sees live occupancy density, hazard spread and which exits are still viable on a single floor plan.",
  },
  {
    title: "Retrofit-friendly",
    body: "Battery-powered arrow nodes mount over existing signage — no rewiring, no building shutdown.",
  },
];

const ROADMAP = [
  { phase: "Phase 1", title: "Simulation core", status: "Done", body: "Floor graph model, hazard propagation and rerouting solver validated in browser." },
  { phase: "Phase 2", title: "Sensor bench", status: "In progress", body: "ESP32 nodes with smoke, temperature and PIR occupancy sensors reporting over MQTT." },
  { phase: "Phase 3", title: "Directional signage", status: "Next", body: "LED arrow panels driven by the routing core, with mesh fallback." },
  { phase: "Phase 4", title: "Pilot install", status: "Planned", body: "Single-floor campus deployment with timed evacuation drills against a baseline." },
];

const TEAM = [
  { name: "Vaibhav Sudhir Shewale", role: "Systems & routing" },
  { name: "Hardware track", role: "Sensor nodes & signage" },
  { name: "Research track", role: "Evacuation modelling" },
];

export function Features() {
  return (
    <section id="how" className="border-t border-border py-20">
      <div className="mx-auto max-w-6xl px-5">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">How it works</p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Sense, re-weight, redirect</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <article key={f.title} className="rounded-xl border border-border bg-card p-5">
              <span className="font-mono text-xs text-primary">0{i + 1}</span>
              <h3 className="mt-2 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Roadmap() {
  return (
    <section id="roadmap" className="border-t border-border py-20">
      <div className="mx-auto max-w-6xl px-5">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">Roadmap</p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">From simulation to installed hardware</h2>
        <ol className="mt-10 space-y-4">
          {ROADMAP.map((r) => (
            <li key={r.phase} className="grid gap-3 rounded-xl border border-border bg-card p-5 sm:grid-cols-[7rem_1fr_7rem] sm:items-center">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{r.phase}</span>
              <div>
                <h3 className="text-lg font-semibold">{r.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{r.body}</p>
              </div>
              <span className="justify-self-start rounded-full border border-border px-3 py-1 text-xs font-semibold text-primary sm:justify-self-end">
                {r.status}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Team() {
  return (
    <section id="team" className="border-t border-border py-20">
      <div className="mx-auto max-w-6xl px-5">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">Team</p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Who is building SafePath</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {TEAM.map((t) => (
            <div key={t.name} className="rounded-xl border border-border bg-card p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary font-display text-lg font-bold text-primary-foreground">
                {t.name.charAt(0)}
              </div>
              <h3 className="mt-3 font-semibold">{t.name}</h3>
              <p className="text-sm text-muted-foreground">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p className="font-display font-semibold text-foreground">SafePath</p>
        <p>Adaptive emergency evacuation guidance — prototype.</p>
      </div>
    </footer>
  );
}

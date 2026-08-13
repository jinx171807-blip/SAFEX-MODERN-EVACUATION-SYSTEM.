import { useEffect, useMemo, useState } from "react";
import {
  COLS,
  ROWS,
  EXITS,
  WALLS,
  HAZARD_SCENARIOS,
  findRoute,
  key,
  type Cell,
} from "./simulation-engine";

const CELL = 34;
const W = COLS * CELL;
const H = ROWS * CELL;
const px = (v: number) => v * CELL + CELL / 2;

const hazardColor = {
  fire: "var(--hazard)",
  smoke: "var(--muted-foreground)",
  crowd: "var(--caution)",
} as const;

export function Simulation() {
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [person, setPerson] = useState<Cell>({ x: 8, y: 3 });
  const [progress, setProgress] = useState(0);

  const hazards = HAZARD_SCENARIOS[stage] ?? [];
  const { path, exit, blocked } = useMemo(
    () => findRoute(person, hazards),
    [person, hazards],
  );

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setStage((s) => (s + 1) % HAZARD_SCENARIOS.length), 3200);
    return () => clearInterval(t);
  }, [playing]);

  useEffect(() => {
    setProgress(0);
    const t = setInterval(() => setProgress((p) => (p >= path.length - 1 ? p : p + 1)), 140);
    return () => clearInterval(t);
  }, [path]);

  const walker = path[Math.min(progress, Math.max(path.length - 1, 0))] ?? person;
  const d = path.map((c, i) => `${i === 0 ? "M" : "L"}${px(c.x)},${px(c.y)}`).join(" ");

  return (
    <section id="simulation" className="border-t border-border bg-background py-20">
      <div className="mx-auto max-w-6xl px-5">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
          Live simulation
        </p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
          Watch the route rebuild itself as hazards spread
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Tap anywhere on the floor to drop an occupant. SafePath recomputes the shortest
          safe corridor to a reachable exit, avoiding fire, smoke and crowd congestion.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_18rem]">
          <div className="overflow-x-auto rounded-xl border border-border bg-card p-3">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="grid-floor h-auto w-full min-w-[640px] rounded-lg"
              role="img"
              aria-label="Floor plan showing the current safe evacuation route"
              onClick={(e) => {
                const r = (e.target as SVGElement).ownerSVGElement ?? (e.currentTarget as SVGSVGElement);
                const rect = r.getBoundingClientRect();
                const x = Math.floor(((e.clientX - rect.left) / rect.width) * COLS);
                const y = Math.floor(((e.clientY - rect.top) / rect.height) * ROWS);
                const c = { x, y };
                if (WALLS.has(key(c)) || blocked.has(key(c))) return;
                setPerson(c);
              }}
            >
              {[...WALLS].map((k) => {
                const [x, y] = k.split(",").map(Number);
                return (
                  <rect
                    key={k}
                    x={x * CELL + 3}
                    y={y * CELL + 3}
                    width={CELL - 6}
                    height={CELL - 6}
                    rx={3}
                    fill="var(--secondary)"
                    stroke="var(--border)"
                  />
                );
              })}

              {hazards.map((h) => (
                <g key={h.id}>
                  <circle
                    cx={px(h.center.x)}
                    cy={px(h.center.y)}
                    r={h.radius * CELL}
                    fill={hazardColor[h.kind]}
                    opacity={0.18}
                  />
                  <circle
                    cx={px(h.center.x)}
                    cy={px(h.center.y)}
                    r={h.radius * CELL}
                    fill="none"
                    stroke={hazardColor[h.kind]}
                    strokeDasharray="6 6"
                    opacity={0.7}
                  />
                </g>
              ))}

              {EXITS.map((e) => (
                <g key={key(e)}>
                  <rect
                    x={e.x * CELL + 2}
                    y={e.y * CELL + 2}
                    width={CELL - 4}
                    height={CELL - 4}
                    rx={4}
                    fill="var(--safe)"
                    opacity={exit && exit.x === e.x && exit.y === e.y ? 1 : 0.35}
                  />
                  <text
                    x={px(e.x)}
                    y={px(e.y) + 4}
                    textAnchor="middle"
                    fontSize={11}
                    fontWeight={700}
                    fill="var(--primary-foreground)"
                  >
                    EXIT
                  </text>
                </g>
              ))}

              {d && (
                <>
                  <path d={d} fill="none" stroke="var(--safe)" strokeWidth={7} opacity={0.25} strokeLinecap="round" />
                  <path
                    d={d}
                    fill="none"
                    stroke="var(--safe)"
                    strokeWidth={3}
                    strokeDasharray="10 6"
                    strokeLinecap="round"
                    style={{ animation: "dash-flow 1s linear infinite" }}
                  />
                </>
              )}

              <circle cx={px(person.x)} cy={px(person.y)} r={7} fill="var(--primary)" />
              <circle cx={px(walker.x)} cy={px(walker.y)} r={5} fill="var(--foreground)" opacity={0.9} />
            </svg>
          </div>

          <div className="flex flex-col gap-3">
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                Status
              </p>
              <p className="mt-1 text-lg font-semibold">
                {path.length
                  ? `Safe route — ${path.length} m`
                  : "No safe route — shelter in place"}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {path.length
                  ? `Directing to exit ${exit ? `${exit.x},${exit.y}` : ""}`
                  : "All exits currently unreachable from this position."}
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                Active hazards
              </p>
              <ul className="mt-2 space-y-2">
                {hazards.length === 0 && (
                  <li className="text-sm text-muted-foreground">All clear.</li>
                )}
                {hazards.map((h) => (
                  <li key={h.id} className="flex items-center gap-2 text-sm">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: hazardColor[h.kind], animation: "pulse-ring 1.6s infinite" }}
                    />
                    {h.label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setPlaying((p) => !p)}
                className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                {playing ? "Pause escalation" : "Resume escalation"}
              </button>
              <button
                onClick={() => setStage((s) => (s + 1) % HAZARD_SCENARIOS.length)}
                className="rounded-lg border border-border px-4 py-2.5 text-sm font-semibold transition hover:bg-secondary"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

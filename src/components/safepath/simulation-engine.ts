export const COLS = 20;
export const ROWS = 12;

export type Cell = { x: number; y: number };
export const key = (c: Cell) => `${c.x},${c.y}`;

// Interior walls of the demo floor plan (a small office footprint).
const WALL_SEGMENTS: Array<[number, number, number, number]> = [
  [5, 0, 5, 4],
  [5, 7, 5, 11],
  [12, 2, 12, 9],
  [6, 6, 11, 6],
  [13, 5, 18, 5],
];

export const WALLS: Set<string> = (() => {
  const s = new Set<string>();
  for (const [x1, y1, x2, y2] of WALL_SEGMENTS) {
    const dx = Math.sign(x2 - x1);
    const dy = Math.sign(y2 - y1);
    let x = x1;
    let y = y1;
    for (;;) {
      s.add(`${x},${y}`);
      if (x === x2 && y === y2) break;
      x += dx;
      y += dy;
    }
  }
  return s;
})();

export const EXITS: Cell[] = [
  { x: 0, y: 6 },
  { x: 19, y: 1 },
  { x: 19, y: 10 },
];

export type Hazard = {
  id: string;
  label: string;
  kind: "fire" | "smoke" | "crowd";
  center: Cell;
  radius: number;
};

export const HAZARD_SCENARIOS: Hazard[][] = [
  [],
  [{ id: "h1", label: "Fire — Server room", kind: "fire", center: { x: 15, y: 8 }, radius: 2 }],
  [
    { id: "h1", label: "Fire — Server room", kind: "fire", center: { x: 15, y: 8 }, radius: 2.4 },
    { id: "h2", label: "Smoke — East corridor", kind: "smoke", center: { x: 16, y: 3 }, radius: 2 },
  ],
  [
    { id: "h1", label: "Fire — Server room", kind: "fire", center: { x: 15, y: 8 }, radius: 2.6 },
    { id: "h2", label: "Smoke — East corridor", kind: "smoke", center: { x: 16, y: 3 }, radius: 2.2 },
    { id: "h3", label: "Crowd surge — Atrium", kind: "crowd", center: { x: 8, y: 9 }, radius: 1.8 },
  ],
];

export function blockedCells(hazards: Hazard[]): Set<string> {
  const s = new Set<string>();
  for (const h of hazards) {
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        const d = Math.hypot(x - h.center.x, y - h.center.y);
        if (d <= h.radius) s.add(`${x},${y}`);
      }
    }
  }
  return s;
}

/** Breadth-first search to the nearest reachable exit, avoiding walls + hazards. */
export function findRoute(start: Cell, hazards: Hazard[]) {
  const blocked = blockedCells(hazards);
  const isOpen = (c: Cell) =>
    c.x >= 0 &&
    c.y >= 0 &&
    c.x < COLS &&
    c.y < ROWS &&
    !WALLS.has(key(c)) &&
    !blocked.has(key(c));

  const prev = new Map<string, string | null>();
  const queue: Cell[] = [start];
  prev.set(key(start), null);
  let goal: Cell | null = null;

  while (queue.length) {
    const cur = queue.shift() as Cell;
    if (EXITS.some((e) => e.x === cur.x && e.y === cur.y)) {
      goal = cur;
      break;
    }
    const neighbours: Cell[] = [
      { x: cur.x + 1, y: cur.y },
      { x: cur.x - 1, y: cur.y },
      { x: cur.x, y: cur.y + 1 },
      { x: cur.x, y: cur.y - 1 },
    ];
    for (const n of neighbours) {
      if (!isOpen(n) || prev.has(key(n))) continue;
      prev.set(key(n), key(cur));
      queue.push(n);
    }
  }

  if (!goal) return { path: [] as Cell[], exit: null as Cell | null, blocked };

  const path: Cell[] = [];
  let cursor: string | null = key(goal);
  while (cursor) {
    const parts = cursor.split(",").map(Number);
    path.unshift({ x: parts[0] as number, y: parts[1] as number });
    cursor = prev.get(cursor) ?? null;
  }
  return { path, exit: goal, blocked };
}

export type Memory = {
  id: string;
  vec: number[];
  label: string;
};

export function dist(a: number[], b: number[]): number {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    const delta = (a[i] ?? 0) - (b[i] ?? 0);
    sum += delta * delta;
  }
  return Math.sqrt(sum);
}

/** Closest remembered example. Null when nothing has been taught yet. */
export function nearestMemory(memories: Memory[], vec: number[]): Memory | null {
  if (memories.length === 0) return null;
  let best = memories[0];
  let bestDistance = dist(best.vec, vec);
  for (let i = 1; i < memories.length; i++) {
    const candidate = memories[i];
    const distance = dist(candidate.vec, vec);
    if (distance < bestDistance) {
      best = candidate;
      bestDistance = distance;
    }
  }
  return best;
}

export function otherLabel(labels: string[], label: string): string {
  const next = labels.find((item) => item !== label);
  if (!next) throw new Error("Need two labels");
  return next;
}

export type SourceCard = {
  id: string;
  keywords: string[];
};

/** Keyword overlap. Returns null when nothing on the shelf matches. */
export function bestSource(
  query: string,
  cards: SourceCard[],
): { id: string; score: number } | null {
  const haystack = query.toLowerCase();
  let best: { id: string; score: number } | null = null;
  for (const card of cards) {
    let score = 0;
    for (const keyword of card.keywords) {
      if (haystack.includes(keyword.toLowerCase())) score += 1;
    }
    if (!best || score > best.score) best = { id: card.id, score };
  }
  if (!best || best.score < 1) return null;
  return best;
}

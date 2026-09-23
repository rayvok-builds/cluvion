export type MinMax = {
  min: number | null;
  max: number | null;
};

export function mapMinMax(mm: MinMax, fn: (val: number) => number | null): MinMax {
  return {
    min: mm.min === null ? null : fn(mm.min),
    max: mm.max === null ? null : fn(mm.max),
  };
}

export function combineMinMax(
  a: MinMax,
  b: MinMax,
  fn: (valA: number, valB: number) => number | null,
): MinMax {
  return {
    min: a.min === null || b.min === null ? null : fn(a.min, b.min),
    max: a.max === null || b.max === null ? null : fn(a.max, b.max),
  };
}

export function ceilWhole(n: number): number {
  return Math.ceil(n);
}

export function roundSharesToWhole(shares: number[], targetTotal: number): number[] {
  if (shares.length === 0) return [];
  const sum = shares.reduce((acc, s) => acc + s, 0);
  if (sum === 0) {
    const res = new Array(shares.length).fill(0);
    res[0] = targetTotal;
    return res;
  }

  const exact = shares.map((s) => (s / sum) * targetTotal);
  const rounded = exact.map((e) => Math.floor(e));
  let remainder = targetTotal - rounded.reduce((acc, r) => acc + r, 0);

  const diffs = exact
    .map((e, idx) => ({ idx, diff: e - rounded[idx] }))
    .sort((a, b) => b.diff - a.diff);

  for (let i = 0; i < remainder && i < diffs.length; i++) {
    rounded[diffs[i].idx] += 1;
  }

  return rounded;
}

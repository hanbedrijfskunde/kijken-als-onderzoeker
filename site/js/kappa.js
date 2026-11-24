// Interbeoordelaarsbetrouwbaarheid: verwarringsmatrix, Cohen's kappa en de duiding ervan.

export function confusionMatrix(codesA, codesB, categories) {
  if (codesA.length !== codesB.length) {
    throw new Error('Beide codeurs moeten evenveel eenheden coderen.');
  }
  const index = new Map(categories.map((c, i) => [c, i]));
  const m = categories.map(() => categories.map(() => 0));
  codesA.forEach((a, k) => {
    const i = index.get(a);
    const j = index.get(codesB[k]);
    if (i === undefined || j === undefined) throw new Error(`Onbekende code: ${i === undefined ? a : codesB[k]}`);
    m[i][j] += 1;
  });
  return m;
}

export function cohensKappa(matrix) {
  const n = matrix.flat().reduce((s, x) => s + x, 0);
  const rows = matrix.map((r) => r.reduce((s, x) => s + x, 0));
  const cols = matrix[0].map((_, j) => matrix.reduce((s, r) => s + r[j], 0));
  const po = matrix.reduce((s, r, i) => s + r[i], 0) / n;
  const pe = rows.reduce((s, r, i) => s + (r / n) * (cols[i] / n), 0);
  const kappa = Math.abs(1 - pe) < 1e-12 ? null : (po - pe) / (1 - pe);
  return { n, po, pe, kappa };
}

// Banden van Landis & Koch (1977).
export function landisKoch(kappa) {
  if (kappa < 0) return 'minder dan toeval';
  if (kappa <= 0.2) return 'gering';
  if (kappa <= 0.4) return 'redelijk';
  if (kappa <= 0.6) return 'matig';
  if (kappa <= 0.8) return 'aanzienlijk';
  return 'bijna perfect';
}

// Vuistregel voor een studentproject (ontwerp §7.3, station 4).
export function studentVerdict(kappa) {
  const k = Math.round(kappa * 1e9) / 1e9;
  if (k >= 0.8) return 'goed';
  if (k >= 0.6) return 'bruikbaar';
  return 'onvoldoende';
}

export function mostConfused(matrix, categories) {
  let best = null;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = i + 1; j < matrix.length; j++) {
      const count = matrix[i][j] + matrix[j][i];
      if (count > 0 && (!best || count > best.count)) best = { a: categories[i], b: categories[j], count };
    }
  }
  return best;
}

export function formatNl(x, digits = 2) {
  return new Intl.NumberFormat('nl-NL', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
    useGrouping: false,
  }).format(x);
}

export function parseNl(s) {
  const t = String(s ?? '').trim().replace(',', '.');
  if (!/^-?(\d+\.?\d*|\.\d+)$/.test(t)) return NaN;
  return Number(t);
}

// Turven: een eigen telling naast de sleutel zetten.

const aantal = (x) => (Number.isInteger(x) && x >= 0 ? x : 0);

export function compareTally(counts, key) {
  return Object.entries(key).map(([code, k]) => {
    const mine = aantal(counts?.[code]);
    const diff = mine - k;
    return { code, mine, key: k, diff, richting: diff > 0 ? 'meer' : diff < 0 ? 'minder' : 'gelijk' };
  });
}

// Tellingen per uur, zodat filialen die niet even lang geobserveerd zijn eerlijk te vergelijken zijn.
export function perUur(tellingen, uren) {
  if (!(uren > 0)) throw new Error('Het aantal uren moet groter zijn dan 0.');
  return Object.fromEntries(Object.entries(tellingen).map(([code, n]) => [code, n / uren]));
}

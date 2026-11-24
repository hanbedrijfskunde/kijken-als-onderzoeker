// Opgeslagen codes kunnen van een oudere versie van de inhoud komen. Lees ze altijd via cleanCodes.
export function cleanCodes(raw, ids, n) {
  const lijst = Array.isArray(raw) ? raw : [];
  return Array.from({ length: n }, (_, i) => (ids.includes(lijst[i]) ? lijst[i] : null));
}

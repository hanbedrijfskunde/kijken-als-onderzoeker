// Status van een station: nog-niet → bezig → klaar, of overgeslagen.
export function nextStatus(current = 'nog-niet', event) {
  if (event === 'geopend') return current === 'nog-niet' ? 'bezig' : current;
  if (event === 'doe-af') return 'klaar';
  if (event === 'overgeslagen') return current === 'klaar' ? 'klaar' : 'overgeslagen';
  return current;
}

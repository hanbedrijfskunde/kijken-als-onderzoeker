// Van adres (#/station/3) naar weergave.
export function parseHash(hash) {
  const m = /^#\/station\/([0-5])$/.exec(hash ?? '');
  if (m) return { view: 'station', id: `s${m[1]}` };
  if (hash === '#/plan') return { view: 'plan' };
  return { view: 'kaart' };
}

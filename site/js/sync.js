// Een ander tabblad bewaarde iets. Opnieuw tekenen stopt een lopende video en wist wat de student
// nog niet bewaarde (ingevulde getallen, open hulp). Teken daarom alleen opnieuw als iets veranderde
// wat deze weergave toont.

// Oefeningen die meer tonen dan hun eigen antwoorden.
const EXTRA = { s2: ['tally.s2'], s3: ['codes'], s4: ['codes'] };

export function padenVoor(route, inhoud) {
  if (route.view === 'kaart') return ['stations'];
  if (route.view === 'plan') return ['answers', 'checks.plan', 'checks.nulmeting-nieuw'];
  const c = inhoud[route.id] ?? {};
  const velden = [];
  const zoek = (blokken = []) => {
    for (const b of blokken) {
      if (b.type === 'open') velden.push(b.veld);
      if (b.blokken) zoek(b.blokken);
    }
  };
  zoek(c.kijk);
  zoek(c.doe);
  zoek(c.mijnProject);
  return [`stations.${route.id}`, `keuze.${route.id}`,
    ...velden.flatMap((v) => [`answers.${v}`, `checks.${v}`]), ...(EXTRA[route.id] ?? [])];
}

function lees(data, pad) {
  return pad.split('.').reduce((n, k) => (n != null && typeof n === 'object' ? n[k] : undefined), data);
}

// Oude en nieuwe waarde komen als tekst uit het storage-event. Onleesbaar of ontbrekend telt als veranderd.
export function geraakt(oudTekst, nieuwTekst, paden) {
  let oud;
  let nieuw;
  try {
    oud = JSON.parse(oudTekst);
    nieuw = JSON.parse(nieuwTekst);
  } catch {
    return true;
  }
  if (oud == null || nieuw == null) return true;
  return paden.some((p) => JSON.stringify(lees(oud, p)) !== JSON.stringify(lees(nieuw, p)));
}

import { GEDRAG } from '../content/s1.js';
import { renderKeuze } from './keuze.js';

// Waarneembaar of niet? Dezelfde vorm als de keuze-oefening, met de beschrijvingen uit station 1.
const OPTIES = ['Waarneembaar', 'Niet waarneembaar'];

export function renderSorteer(block, ctx) {
  return renderKeuze({
    items: GEDRAG.map((g) => ({ tekst: g.tekst, opties: OPTIES, juist: g.waarneembaar ? 0 : 1, uitleg: g.uitleg })),
    zinnen: {
      fout: 'Je koos {gekozen}; de sleutel zegt {juist}.',
      uitslag: 'Je deelde {goed} van de {n} beschrijvingen in zoals de sleutel.',
    },
    slot: block.slot,
  }, ctx);
}

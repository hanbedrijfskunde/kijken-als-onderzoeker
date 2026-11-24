import { FILIALEN, BESLISSINGEN } from '../content/s5.js';
import { CODES } from '../content/s3.js';
import { perUur } from '../tally.js';
import { formatNl } from '../kappa.js';
import { renderKeuze } from './keuze.js';
import { el } from './dom.js';

// Tellingen per uur voor vier filialen, en per beslissing: onderbouwen de data die, of niet?
function tabel(cel, kop, klasse) {
  return el('div', { class: 'tabel-wrap' }, el('table', { class: klasse },
    el('caption', {}, kop),
    el('thead', {}, el('tr', {},
      el('th', { scope: 'col' }, 'Filiaal'), el('th', { scope: 'col' }, 'Uren'),
      CODES.map((c) => el('th', { scope: 'col' }, c.naam)))),
    el('tbody', {}, FILIALEN.map((f) => el('tr', {},
      el('th', { scope: 'row' }, f.naam), el('td', {}, String(f.uren)),
      CODES.map((c) => el('td', {}, cel(f, c.id))))))));
}

export function renderBesluit(block, ctx) {
  const per = Object.fromEntries(FILIALEN.map((f) => [f.naam, perUur(f.tellingen, f.uren)]));
  return el('div', { class: 'besluit' },
    tabel((f, id) => formatNl(per[f.naam][id], 1), 'Aantal keer per uur', 'besluit__tabel'),
    el('details', { class: 'verdieping' },
      el('summary', {}, 'Toon de totalen (niet per uur)'),
      tabel((f, id) => String(f.tellingen[id]), 'Totaal aantal keer', 'besluit__totalen')),
    renderKeuze({
      items: BESLISSINGEN.map((b) => ({ tekst: b.tekst, opties: ['Onderbouwd', 'Niet onderbouwd'], juist: b.onderbouwd ? 0 : 1, uitleg: b.uitleg })),
      zinnen: {
        fout: 'Je koos {gekozen}; de sleutel zegt {juist}.',
        uitslag: 'Je beoordeelde {goed} van de {n} beslissingen zoals de sleutel.',
      },
      slot: block.slot,
    }, ctx));
}

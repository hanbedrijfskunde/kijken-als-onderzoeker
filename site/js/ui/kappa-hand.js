import { OEFENTABEL } from '../content/s4.js';
import { cohensKappa, formatNl, parseNl, landisKoch } from '../kappa.js';
import { el } from './dom.js';

const VELDEN = [
  { naam: 'po', label: 'pₒ: overeenstemming die je ziet', hint: 1 },
  { naam: 'pe', label: 'pₑ: overeenstemming door toeval', hint: 2 },
  { naam: 'kappa', label: 'κ: kappa', hint: 3 },
];

function tabel(m) {
  const [[a, b], [c, d]] = m;
  return el('div', { class: 'tabel-wrap' }, el('table', { class: 'kruistabel' },
    el('caption', {}, OEFENTABEL.vraag),
    el('thead', {}, el('tr', {}, el('td', {}), el('th', { scope: 'col' }, 'B: ja'), el('th', { scope: 'col' }, 'B: nee'), el('th', { scope: 'col' }, 'Totaal A'))),
    el('tbody', {},
      el('tr', {}, el('th', { scope: 'row' }, 'A: ja'), el('td', { class: 'diag' }, a), el('td', {}, b), el('td', { class: 'tot' }, a + b)),
      el('tr', {}, el('th', { scope: 'row' }, 'A: nee'), el('td', {}, c), el('td', { class: 'diag' }, d), el('td', { class: 'tot' }, c + d)),
      el('tr', {}, el('th', { scope: 'row' }, 'Totaal B'), el('td', { class: 'tot' }, a + c), el('td', { class: 'tot' }, b + d), el('td', { class: 'tot' }, a + b + c + d)))));
}

const HINTS = [
  ['Hint 1 · pₒ', 'Tel de beurten waarop de codeurs hetzelfde zeiden: de diagonaal. Dat is 9 + 6 = 15 van de 20. Dus pₒ = 15 / 20 = 0,75.'],
  ['Hint 2 · pₑ', 'Codeur A zegt 12 van de 20 keer ja (0,60), codeur B 11 van de 20 keer (0,55). De kans dat ze allebei toevallig ja zeggen is 0,60 × 0,55 = 0,33. Allebei nee: 0,40 × 0,45 = 0,18. Samen: pₑ = 0,33 + 0,18 = 0,51.'],
  ['Hint 3 · κ', 'κ = (pₒ − pₑ) / (1 − pₑ) = (0,75 − 0,51) / (1 − 0,51) = 0,24 / 0,49 = 0,49.'],
];

export function renderKappaHand(block, ctx) {
  const echt = cohensKappa(OEFENTABEL.matrix);
  const uitslag = el('div', { class: 'uitslag', 'aria-live': 'polite' });
  ctx.checkEl.append(uitslag);

  const velden = VELDEN.map((v) => {
    const input = el('input', { type: 'text', inputmode: 'decimal', name: v.naam, id: `kh-${v.naam}`, autocomplete: 'off', placeholder: '0,00' });
    const fb = el('span', { class: 'kh-fb', 'aria-live': 'polite' });
    const wrap = el('div', { class: 'kh-veld' }, el('label', { for: `kh-${v.naam}` }, v.label), input, fb);
    return { ...v, input, fb, wrap };
  });

  const knop = el('button', {
    type: 'button', class: 'knop',
    onclick: () => {
      let allesGoed = true;
      for (const v of velden) {
        const x = parseNl(v.input.value);
        const goed = Number.isFinite(x) && Math.abs(x - echt[v.naam]) <= 0.01;
        if (!goed) allesGoed = false;
        v.wrap.classList.toggle('is-goed', goed);
        v.wrap.classList.toggle('is-anders', !goed);
        v.fb.textContent = goed ? 'Goed' : (Number.isFinite(x) ? `Nog niet goed. Kijk bij Hint ${v.hint}.` : `Vul een getal in, bijvoorbeeld 0,50. Kijk bij Hint ${v.hint}.`);
      }
      if (allesGoed) {
        const k = formatNl(echt.kappa);
        uitslag.replaceChildren(el('p', { class: 'uitslag__kern' }, `Kappa met de hand: alle drie goed. κ = ${k}.`),
          el('p', {}, `Volgens Landis & Koch is dat ${landisKoch(echt.kappa)}. Voor een studentproject is het onvoldoende: de codeurs maken hun codeboek scherper en oefenen opnieuw.`));
        box.querySelector('.kh-klaar').textContent = `Alle drie goed. κ = ${k}: ${landisKoch(echt.kappa)}.`;
        ctx.event('doe-af');
      } else {
        box.querySelector('.kh-klaar').textContent = '';
      }
    },
  }, 'Controleer je berekening');

  const box = el('div', { class: 'kappa-hand' },
    tabel(OEFENTABEL.matrix),
    el('p', { class: 'formule' }, 'κ = (pₒ − pₑ) / (1 − pₑ)'),
    el('div', { class: 'kh-velden' }, velden.map((v) => v.wrap)),
    el('p', {}, knop),
    el('p', { class: 'kh-klaar uitslag__kern', 'aria-live': 'polite' }),
    el('div', { class: 'hints' }, HINTS.map(([t, x]) => el('details', { class: 'hint' }, el('summary', {}, t), el('p', {}, x)))));
  return box;
}

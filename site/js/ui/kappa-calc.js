import { CODES, VERKOPER_SLEUTEL, VOORBEELD_CODES } from '../content/s3.js';
import { ZELFDE_TOTALEN } from '../content/s4.js';
import { confusionMatrix, cohensKappa, landisKoch, studentVerdict, mostConfused, formatNl } from '../kappa.js';
import { el } from './dom.js';
import { cleanCodes } from '../codes.js';

const IDS = CODES.map((c) => c.id);
const NAAM = Object.fromEntries(CODES.map((c) => [c.id, c.naam]));
const AANTAL = VERKOPER_SLEUTEL.length;

const OORDEEL = {
  goed: 'Voor een studentproject is dat goed (vanaf 0,80).',
  bruikbaar: 'Voor een studentproject is dat bruikbaar (vanaf 0,60).',
  onvoldoende: 'Voor een studentproject is dat nog onvoldoende (onder 0,60). Maak je codeboek scherper en oefen opnieuw.',
};

function matrixTabel(m, rijKop, kolomKop) {
  return el('div', { class: 'tabel-wrap' }, el('table', { class: 'matrix' },
    el('thead', {},
      el('tr', {}, el('td', {}), el('th', { scope: 'colgroup', colspan: IDS.length }, kolomKop)),
      el('tr', {}, el('th', { scope: 'col' }, rijKop), IDS.map((id) => el('th', { scope: 'col' }, NAAM[id])))),
    el('tbody', {}, m.map((rij, i) => el('tr', {},
      el('th', { scope: 'row' }, NAAM[IDS[i]]),
      rij.map((x, j) => el('td', { class: `${i === j ? 'diag' : ''} ${i !== j && x > 0 ? 'mis' : ''}`.trim() }, x)))))));
}

export function resultaat(codesA, codesB, rijKop, kolomKop) {
  const m = confusionMatrix(codesA, codesB, IDS);
  const r = cohensKappa(m);
  const regels = [el('p', {}, `pₒ = ${formatNl(r.po)} · pₑ = ${formatNl(r.pe)}`)];
  if (r.kappa === null) {
    regels.push(el('p', { class: 'uitslag__kern' }, 'Kappa is niet te berekenen: jullie gebruikten allebei steeds dezelfde code.'));
  } else {
    regels.push(
      el('p', { class: 'uitslag__kern kc-kappa' }, `κ = ${formatNl(r.kappa)}: ${landisKoch(r.kappa)}.`),
      el('p', {}, OORDEEL[studentVerdict(r.kappa)]));
    const mc = mostConfused(m, IDS);
    regels.push(el('p', {}, mc
      ? `De meeste verschillen zitten tussen ‘${NAAM[mc.a]}’ en ‘${NAAM[mc.b]}’ (${mc.count} keer). Maak die regels in je codeboek scherper.`
      : 'Jullie zijn het overal over eens.'));
  }
  return el('div', { class: 'kc-resultaat' }, matrixTabel(m, rijKop, kolomKop), regels);
}

function zelfdeTotalen() {
  const r = cohensKappa(ZELFDE_TOTALEN.matrix);
  const [[a, b], [c, d]] = ZELFDE_TOTALEN.matrix;
  return el('div', { class: 'kc-zelfde' },
    el('h3', {}, 'Dezelfde totalen, toch oneens'),
    el('p', {}, `Twee codeurs coderen 10 beurten. Allebei zeggen ze ${a + b} keer ja en ${c + d} keer nee: dezelfde totalen. `,
      `Toch zijn ze het maar over ${a + d} van de 10 beurten eens, en is κ = ${formatNl(r.kappa)} (${landisKoch(r.kappa)}).`),
    el('p', {}, 'Totalen zeggen dus niets over overeenstemming. Daarom vergelijk je per eenheid: per beurt, per gebeurtenis of per tijdvak. ',
      'In station 2 turf je alleen totalen. Dat is genoeg om te tellen, maar niet om betrouwbaarheid te meten.'));
}

function partnerDeel(store, eigen) {
  const partner = cleanCodes(store.get('codes.partner'), IDS, AANTAL);
  const uit = el('div', { 'aria-live': 'polite' });
  function toon() {
    uit.replaceChildren(partner.every((c) => c) ? resultaat(eigen, partner, 'Jij', 'Medestudent')
      : el('p', { class: 'kc-nog' }, `Nog ${partner.filter((c) => !c).length} beurten in te vullen.`));
  }
  const selects = partner.map((waarde, i) => el('label', { class: 'kc-select' }, `Beurt ${i + 1}`,
    el('select', {
      onchange: (e) => { partner[i] = e.target.value || null; store.set('codes.partner', partner); toon(); },
    },
    el('option', { value: '' }, 'Kies…'),
    IDS.map((id) => el('option', { value: id, selected: waarde === id }, NAAM[id])))));
  toon();
  return el('details', { class: 'kc-partner verdieping', open: partner.some((c) => c) },
    el('summary', {}, 'Samen met een medestudent (niet verplicht)'),
    el('p', {}, 'Laat een medestudent het gesprek in station 3 op een eigen apparaat coderen. Vul hieronder de 15 codes van je medestudent in. De rekenhulp vergelijkt ze met jouw codes.'),
    el('div', { class: 'kc-selects' }, selects),
    uit);
}

export function renderKappaCalc(block, ctx) {
  const { store } = ctx;
  const eigenCodes = cleanCodes(store.get('codes.s3'), IDS, AANTAL);
  const gevuld = eigenCodes.filter((c) => c).length;
  const compleet = gevuld === AANTAL;
  const codes = compleet ? eigenCodes : VOORBEELD_CODES;

  ctx.checkEl.append(zelfdeTotalen());

  const melding = compleet ? null : el('p', { class: 'melding' },
    gevuld === 0 ? 'Je hebt station 3 nog niet gecodeerd. Hieronder staan de codes van een voorbeeldstudent. '
      : `Je codeerde ${gevuld} van de ${AANTAL} beurten. Maak station 3 af, of kijk hieronder naar de codes van een voorbeeldstudent. `,
    el('a', { href: '#/station/3' }, 'Naar station 3'));

  return el('div', { class: 'kappa-calc' },
    melding,
    el('p', {}, compleet ? 'Jouw codes (rijen) naast de sleutel (kolommen). Op de diagonaal staan de beurten waarover jullie het eens zijn.'
      : 'De codes van de voorbeeldstudent (rijen) naast de sleutel (kolommen). Op de diagonaal staan de beurten waarover ze het eens zijn.'),
    resultaat(codes, VERKOPER_SLEUTEL, compleet ? 'Jij' : 'Voorbeeldstudent', 'Sleutel'),
    compleet ? partnerDeel(store, codes) : null);
}

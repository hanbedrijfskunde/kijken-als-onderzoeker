import { CODES, GESPREK, BESLISREGEL } from '../content/s3.js';
import { el } from './dom.js';
import { cleanCodes } from '../codes.js';

const NAAM = Object.fromEntries(CODES.map((c) => [c.id, c.naam]));
const AANTAL = GESPREK.filter((b) => b.spreker === 'verkoper').length;

export function renderCodeboek() {
  return el('aside', { class: 'codeboek', 'aria-labelledby': 'codeboek-titel' },
    el('h3', { id: 'codeboek-titel' }, 'Codeboek'),
    CODES.map((c) => el('div', { class: 'code' },
      el('p', { class: 'code__naam' }, c.naam),
      el('p', { class: 'code__def' }, c.definitie),
      el('dl', {},
        el('dt', {}, 'Wel'), el('dd', {}, c.wel),
        el('dt', {}, 'Niet'), el('dd', {}, c.niet),
        el('dt', {}, 'Voorbeeld'), el('dd', {}, c.voorbeeld)))),
    el('p', { class: 'beslisregel' }, el('strong', {}, 'Beslisregel: '), BESLISREGEL));
}

export function renderCodeer(block, ctx) {
  const { store } = ctx;
  const codes = cleanCodes(store.get('codes.s3'), CODES.map((c) => c.id), AANTAL);
  const feedback = [];
  const knop = el('button', { type: 'button', class: 'knop' }, 'Controleer');
  const nog = el('span', { class: 'codeer__nog' });
  const uitslag = el('div', { class: 'uitslag', 'aria-live': 'polite' });
  ctx.checkEl.append(uitslag);

  function bijwerken() {
    const open = codes.map((c, i) => (c == null ? i + 1 : null)).filter((x) => x);
    knop.disabled = open.length > 0;
    if (open.length === 0) nog.textContent = '';
    else if (open.length <= 5) {
      const lijst = open.length === 1 ? String(open[0]) : `${open.slice(0, -1).join(', ')} en ${open.at(-1)}`;
      nog.textContent = `Nog niet gecodeerd: beurt ${lijst}.`;
    } else nog.textContent = `Nog ${open.length} beurten niet gecodeerd.`;
  }

  let n = -1;
  const beurten = GESPREK.map((b) => {
    if (b.spreker === 'klant') {
      return el('p', { class: 'beurt beurt--klant' }, el('span', { class: 'spreker' }, 'Klant'), b.tekst);
    }
    n += 1;
    const i = n;
    const fb = el('p', { class: 'beurt__feedback' });
    const tekstId = `beurt-tekst-${i}`;
    feedback[i] = fb;
    return el('fieldset', { class: 'beurt beurt--verkoper' },
      el('legend', {}, `Beurt ${i + 1}`),
      el('p', { class: 'beurt__tekst' }, el('span', { class: 'spreker' }, 'Verkoper'), el('span', { id: tekstId }, b.tekst)),
      el('div', { class: 'beurt__codes' }, CODES.map((c) => el('label', { class: 'keuze' },
        el('input', {
          type: 'radio', name: `beurt-${i}`, value: c.id, checked: codes[i] === c.id, 'aria-describedby': tekstId,
          onchange: () => {
            codes[i] = c.id;
            store.set('codes.s3', codes);
            fb.textContent = '';
            fb.className = 'beurt__feedback';
            bijwerken();
          },
        }), ' ', c.naam))),
      fb);
  });

  knop.addEventListener('click', () => {
    const verkoper = GESPREK.filter((b) => b.spreker === 'verkoper');
    let goed = 0;
    verkoper.forEach((b, i) => {
      const ok = codes[i] === b.sleutel;
      if (ok) goed += 1;
      feedback[i].className = `beurt__feedback ${ok ? 'is-goed' : 'is-anders'}`;
      feedback[i].textContent = ok ? `Goed: ${NAAM[b.sleutel]}.`
        : `Je codeerde ${NAAM[codes[i]]}; de sleutel zegt ${NAAM[b.sleutel]}. ${b.uitleg}`;
    });
    uitslag.replaceChildren(
      el('p', { class: 'uitslag__kern' }, `Je codeerde ${goed} van de ${AANTAL} beurten zoals de sleutel.`),
      goed < AANTAL
        ? el('p', {}, 'Bij de beurten met een oranje streep staat waarom de sleutel anders codeert. Lees vooral die uitleg: daar zit de les.')
        : el('p', {}, 'Precies zoals de sleutel. Let op: in echte observaties lukt dat zelden, en dat is ook niet het doel.'),
      el('p', {}, 'In station 4 reken je uit hoe goed jij en de sleutel overeenkomen. ',
        el('a', { href: '#/station/4' }, 'Naar station 4')));
    ctx.event('doe-af');
  });

  bijwerken();
  return el('div', { class: 'codeer' },
    renderCodeboek(),
    el('div', { class: 'codeer__gesprek' },
      el('div', { class: 'gesprek' }, beurten),
      el('p', { class: 'codeer__actie' }, knop, ' ', nog)));
}

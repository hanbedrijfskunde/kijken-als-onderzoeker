import { VIDEO_CODES, SLEUTEL, FEEDBACK, BESPREKING } from '../content/s2.js';
import { compareTally } from '../tally.js';
import { renderVideo } from './media.js';
import { el } from './dom.js';

// Klikteller voor de oefenclip. De klikgeschiedenis is de bron; de tellingen volgen eruit.
const IDS = VIDEO_CODES.map((c) => c.id);
const NAAM = Object.fromEntries(VIDEO_CODES.map((c) => [c.id, c.naam]));
const PAD = 'tally.s2';

function tel(history) {
  const counts = Object.fromEntries(IDS.map((id) => [id, 0]));
  for (const c of history) counts[c] += 1;
  return counts;
}

function verschil(r) {
  if (r.richting === 'gelijk') return 'gelijk';
  return `${Math.abs(r.diff)} ${r.richting}`;
}

export function renderTurf(block, ctx) {
  const { store } = ctx;
  const opgeslagen = store.get(PAD, {});
  const staat = {
    history: Array.isArray(opgeslagen?.history) ? opgeslagen.history.filter((c) => IDS.includes(c)) : [],
    vergeleken: opgeslagen?.vergeleken === true,
    besproken: opgeslagen?.besproken === true,
  };

  const aantallen = {};
  const knoppen = VIDEO_CODES.map((c) => {
    aantallen[c.id] = el('span', { class: 'turf__aantal' }, '0');
    return el('button', {
      type: 'button', class: 'turf__knop', 'data-code': c.id,
      onclick: () => { staat.history.push(c.id); bijwerken(c.id); },
    }, el('span', { class: 'turf__naam' }, c.naam), aantallen[c.id]);
  });
  const status = el('p', { class: 'sr-only', 'aria-live': 'polite' });
  const ongedaan = el('button', {
    type: 'button', class: 'knop knop--stil',
    onclick: () => { const c = staat.history.pop(); bijwerken(c); },
  }, 'Laatste klik ongedaan maken');
  const opnieuw = el('button', {
    type: 'button', class: 'knop knop--stil',
    onclick: () => { staat.history = []; staat.vergeleken = false; bijwerken(); },
  }, 'Opnieuw turven');
  const vergelijk = el('button', {
    type: 'button', class: 'knop',
    onclick: () => {
      staat.vergeleken = true;
      staat.besproken = true;
      bijwerken();
      ctx.event('doe-af');
    },
  }, 'Vergelijk met de sleutel');

  const vergelijking = el('div');
  const bespreking = el('div', { class: 'turf-bespreking' });
  ctx.checkEl.append(vergelijking, bespreking);

  function toonVergelijking(counts) {
    if (!staat.vergeleken) {
      vergelijking.replaceChildren();
      return;
    }
    const rijen = compareTally(counts, SLEUTEL);
    const gelijk = rijen.filter((r) => r.richting === 'gelijk').length;
    vergelijking.replaceChildren(el('div', { class: 'turf-vergelijk' },
      el('p', { class: 'uitslag__kern' }, `Je telde ${gelijk} van de ${rijen.length} codes precies zoals de sleutel.`),
      el('div', { class: 'tabel-wrap' }, el('table', {},
        el('thead', {}, el('tr', {},
          el('th', { scope: 'col' }, 'Code'), el('th', { scope: 'col' }, 'Jij'),
          el('th', { scope: 'col' }, 'Sleutel'), el('th', { scope: 'col' }, 'Verschil'))),
        el('tbody', {}, rijen.map((r) => el('tr', {},
          el('th', { scope: 'row' }, NAAM[r.code]), el('td', {}, String(r.mine)),
          el('td', {}, String(r.key)), el('td', {}, verschil(r))))))),
      el('ul', { class: 'turf-uitleg' }, rijen.map((r) => el('li', { class: r.richting === 'gelijk' ? 'is-goed' : 'is-anders' },
        el('strong', {}, `${NAAM[r.code]}: `), FEEDBACK[r.code][r.richting]))),
      el('p', {}, 'Turven is lastig, ook voor Chens publiek. Kijk hieronder de bespreking.')));
  }

  function bijwerken(laatste) {
    const counts = tel(staat.history);
    for (const id of IDS) aantallen[id].textContent = String(counts[id]);
    if (laatste) status.textContent = `${NAAM[laatste]}: ${counts[laatste]}`;
    ongedaan.disabled = staat.history.length === 0;
    opnieuw.disabled = staat.history.length === 0 && !staat.vergeleken;
    vergelijk.disabled = staat.history.length === 0;
    store.set(PAD, { counts, history: staat.history, vergeleken: staat.vergeleken, besproken: staat.besproken });
    toonVergelijking(counts);
    if (staat.besproken && !bespreking.hasChildNodes()) bespreking.append(renderVideo(BESPREKING));
  }

  bijwerken();
  return el('div', { class: 'turf' },
    el('h3', {}, 'De vier codes'),
    el('dl', { class: 'turf__codes' }, VIDEO_CODES.flatMap((c) => [el('dt', {}, c.naam), el('dd', {}, c.definitie)])),
    el('div', { class: 'turf__knoppen' }, knoppen),
    status,
    el('p', { class: 'turf__acties' }, ongedaan, ' ', opnieuw, ' ', vergelijk));
}

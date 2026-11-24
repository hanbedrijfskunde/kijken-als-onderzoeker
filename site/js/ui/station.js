import { STATIONS } from '../content/stations.js';
import { el } from './dom.js';
import { renderVideo, renderStill } from './media.js';
import { renderKenJeDitAl } from './kenjedital.js';

// Renderers per bloktype. Oefeningen melden zich hier aan (registerBlock).
const RENDERERS = {
  video: (b) => renderVideo(b),
  still: (b) => renderStill(b),
  tekst: (b) => el('div', { class: 'tekst', html: b.html }),
  details: (b, ctx) => el('details', { class: 'verdieping' },
    el('summary', {}, b.titel), renderBlocks(b.blokken, ctx)),
};

export function registerBlock(type, fn) {
  RENDERERS[type] = fn;
}

export function renderBlocks(blocks, ctx) {
  return blocks.map((b) => (RENDERERS[b.type] ? RENDERERS[b.type](b, ctx) : null));
}

function blok(naam, titel, ...inhoud) {
  return el('section', { class: `blok blok--${naam}`, 'aria-labelledby': `blok-${naam}` },
    el('h2', { id: `blok-${naam}` }, titel), ...inhoud);
}

export function renderStation(content, ctx) {
  const station = STATIONS.find((s) => s.id === content.id);
  const volgende = STATIONS.find((s) => s.nr === station.nr + 1);
  const jeKuntNu = el('p', { class: 'jekuntnu', hidden: true }, content.jeKuntNu);
  const kenSlot = el('div', { class: 'kenjedital-slot' },
    content.kenJeDitAl.length ? renderKenJeDitAl(content.kenJeDitAl, ctx) : null);

  const article = el('article', { class: 'station' },
    el('p', { class: 'terug' }, el('a', { href: '#/' }, 'Naar de kaart')),
    el('p', { class: 'bovenkop' }, `Station ${station.nr} · ${station.minuten} min`),
    el('h1', {}, station.titel),
    el('div', { class: 'station__start' }, kenSlot),
    blok('waarom', 'Waarom', content.waarom.map((p) => el('p', {}, p))),
    blok('kijk', 'Kijk', renderBlocks(content.kijk, ctx)),
    blok('doe', 'Doe', renderBlocks(content.doe, ctx)),
    blok('check', 'Check',
      el('p', { class: 'check__leeg' }, 'Hier zie je of je goed zit, zodra je de oefening bij Doe hebt gedaan.'),
      ctx.checkEl, jeKuntNu),
    blok('project', 'Mijn project',
      el('p', { class: 'project__intro' }, 'Wat neem je mee naar je eigen onderzoek? Je antwoord komt in je observatieplan.'),
      renderBlocks(content.mijnProject, ctx)),
    el('nav', { class: 'station__verder', 'aria-label': 'Verder' },
      volgende ? el('a', { class: 'knop', href: `#/station/${volgende.nr}` }, `Volgende: ${volgende.titel}`)
        : el('a', { class: 'knop', href: '#/plan' }, 'Naar mijn observatieplan'),
      el('a', { href: '#/' }, 'Naar de kaart')));

  ctx.onDoeAf(() => {
    jeKuntNu.hidden = false;
    article.querySelector('.check__leeg')?.remove();
  });
  return { article, kenSlot };
}

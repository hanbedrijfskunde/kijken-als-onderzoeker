import { el } from './dom.js';

const VIDEO = 'cVtblRCvtRI';
const TITEL = 'Behind the Research: Making Thinking Visible Through Quantitative Observational Coding';

export function embedUrl(start, end) {
  return `https://www.youtube-nocookie.com/embed/${VIDEO}?start=${start}&end=${end}&cc_load_policy=1&cc_lang_pref=en&rel=0`;
}

export function watchUrl(sec) {
  return `https://www.youtube.com/watch?v=${VIDEO}&t=${sec}s`;
}

export function mmss(sec) {
  return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`;
}

export function creditLine(sec) {
  return `Still op ${mmss(sec)} uit Shiyi Chen, “${TITEL}” (Class Lab 2.0, 2026).`;
}

export function renderVideo(block) {
  const duur = mmss(block.end - block.start);
  return el('div', { class: 'video' },
    el('figure', { class: 'video__figuur' },
      el('div', { class: 'video__kader' },
        el('iframe', {
          src: embedUrl(block.start, block.end),
          title: `Video: ${block.titel}`,
          loading: 'lazy',
          allow: 'encrypted-media; picture-in-picture; fullscreen',
          allowfullscreen: true,
          referrerpolicy: 'strict-origin-when-cross-origin',
        })),
      el('figcaption', {},
        el('strong', {}, block.titel),
        ` · fragment ${mmss(block.start)}–${mmss(block.end)} (${duur} min) · Engels, met ondertiteling · `,
        el('a', { href: watchUrl(block.start), target: '_blank', rel: 'noopener' }, 'Open op YouTube'))),
    block.samenvatting?.length ? el('div', { class: 'samenvatting' },
      el('p', { class: 'samenvatting__kop' }, 'In het kort'),
      el('ul', {}, block.samenvatting.map((s) => el('li', {}, s)))) : null);
}

export function renderStill(block) {
  return el('figure', { class: 'still' },
    el('img', {
      src: `assets/stills/${block.bestand}`, alt: block.alt, loading: 'lazy', width: 1280, height: 720,
    }),
    el('figcaption', {},
      block.bijschrift ? el('span', { class: 'still__bijschrift' }, block.bijschrift, ' ') : null,
      el('a', { href: watchUrl(block.sec), target: '_blank', rel: 'noopener', class: 'still__bron' }, creditLine(block.sec))));
}

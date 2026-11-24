import { STATIONS, STATUS_LABEL } from '../content/stations.js';
import { el } from './dom.js';

export function renderKaart(store, go) {
  const lijst = el('ol', { class: 'kaart__lijst' },
    STATIONS.map((s) => {
      const status = store.get(`stations.${s.id}.status`, 'nog-niet');
      return el('li', {},
        el('a', { class: 'kaart__station', href: `#/station/${s.nr}`, 'data-status': status },
          el('span', { class: 'kaart__nr', 'aria-hidden': 'true' }, String(s.nr)),
          el('span', { class: 'kaart__tekst' },
            el('span', { class: 'kaart__titel' }, s.titel),
            el('span', { class: 'kaart__meta' }, `${s.minuten} min`)),
          el('span', { class: 'kaart__status' }, STATUS_LABEL[status])));
    }));

  const dialog = el('dialog', { class: 'dialoog', 'aria-labelledby': 'wis-titel' },
    el('h2', { id: 'wis-titel' }, 'Opnieuw beginnen?'),
    el('p', {}, 'Al je antwoorden en je voortgang worden gewist. Dat kun je niet terugdraaien.'),
    el('div', { class: 'knoppen' },
      el('button', { type: 'button', class: 'knop knop--stil', onclick: () => dialog.close() }, 'Annuleren'),
      el('button', {
        type: 'button', class: 'knop',
        onclick: () => { store.reset(); dialog.close(); go('#/', true); },
      }, 'Ja, wis alles')));

  return el('section', { class: 'kaart' },
    el('p', { class: 'bovenkop' }, 'Observatie als onderzoeksmethode'),
    el('h1', {}, 'Kijken als onderzoeker'),
    el('p', { class: 'kaart__intro' },
      'Wat mensen zeggen en wat ze doen, verschilt vaak. Met gestructureerde observatie maak je gedrag telbaar. ',
      'Zo onderbouw je een beslissing met meer dan een indruk. Je eindigt met een observatieplan voor je eigen project.'),
    el('ul', { class: 'kaart__doelen' },
      el('li', {}, 'Je vertaalt een begrip dat je niet direct ziet naar gedrag dat je wel ziet.'),
      el('li', {}, 'Je codeert een fragment met een codeboek.'),
      el('li', {}, 'Je bepaalt met een tweede codeur hoe betrouwbaar je codeert.'),
      el('li', {}, 'Je laat zien welke beslissing je data onderbouwen, en welke niet.')),
    el('p', { class: 'kaart__route' },
      'Aanbevolen: volg de stations op volgorde. Elk station werkt ook los. ',
      'Samen kost het ongeveer 3 uur. ',
      store.persistent ? 'Stoppen kan altijd: je voortgang blijft in deze browser bewaard.'
        : 'Let op: deze browser bewaart je voortgang niet.'),
    lijst,
    el('a', { class: 'kaart__plan', href: '#/plan' }, 'Mijn observatieplan'),
    el('p', { class: 'kaart__reset' },
      el('button', { type: 'button', class: 'knop knop--stil', onclick: () => dialog.showModal() }, 'Opnieuw beginnen')),
    dialog);
}

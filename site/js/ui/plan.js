import { PLAN_SECTIES, VELD_LABEL, antwoord, buildPlanText } from '../plan.js';
import { INHOUD } from '../content/index.js';
import { STATIONS } from '../content/stations.js';
import { renderOpen } from './open.js';
import { el } from './dom.js';

// Bij welk station hoort elk antwoordveld? Zo linkt een lege sectie naar de plek waar je hem invult.
const STATION_VAN = {};
for (const s of STATIONS) for (const o of INHOUD[s.id]?.mijnProject ?? []) STATION_VAN[o.veld] = s.nr;

const NULMETING = INHOUD.s0.doe.find((b) => b.type === 'open' && b.veld === 'nulmeting');

// Pas hier, aan het eind, een voorbeeld bij de nulmetingvraag: in station 0 zou het de beginmeting bederven.
const NIEUW = {
  veld: 'nulmeting-nieuw',
  vraag: `Beantwoord dezelfde vraag opnieuw. ${NULMETING.vraag}`,
  voorbeeld: 'Ik maak klantgerichtheid meetbaar met gedrag dat ik kan zien: doorvragen, samenvatten en advies dat past bij de klant. Die codes leg ik vast in een codeboek, met per code een definitie, een grens en een voorbeeld. Ik turf live per gesprek, in elk filiaal op dezelfde dagen, en vergelijk per uur. Een tweede codeur codeert 20 % dubbel; vanaf een kappa van 0,60 is de codering bruikbaar.',
  checklist: [
    'Je meet gedrag, niet wat mensen zeggen dat ze doen.',
    'Je noemt concrete codes of een codeboek.',
    'Je zegt hoe je vastlegt en hoe lang je observeert.',
    'Je noemt een tweede codeur, of een andere controle op betrouwbaarheid.',
    'Je vergelijkt eerlijk, bijvoorbeeld per uur.',
  ],
};

const KENMERKEN = [
  'Je begrip is vertaald naar gedrag dat je kunt zien en tellen.',
  'Elke code heeft een naam, een definitie, een grens (wanneer niet) en een voorbeeld.',
  'Eenheid, plek en duur zijn zo beschreven dat een ander het kan herhalen.',
  'Je weet hoe je vastlegt, en toestemming is geregeld volgens de privacyregels van opleiding en organisatie.',
  'Een tweede codeur codeert een deel dubbel, en je noemt je drempel voor kappa.',
  'Je noemt de beslissing die je data moeten onderbouwen, en wat ze niet kunnen zeggen.',
];

function sectie(s, i, answers) {
  return el('section', { class: 'plan__sectie' },
    el('h2', {}, `${i + 1}. ${s.titel}`),
    s.velden.map((v) => {
      const t = antwoord(answers, v);
      const nr = STATION_VAN[v];
      return [
        s.velden.length > 1 ? el('h3', {}, VELD_LABEL[v]) : null,
        t ? [el('p', { class: 'plan__antwoord' }, t),
          el('p', { class: 'plan__aanpassen' }, el('a', { href: `#/station/${nr}` }, `Pas aan in station ${nr}`))]
          : el('p', { class: 'plan__leeg' }, 'Nog niet ingevuld. ', el('a', { href: `#/station/${nr}` }, `Naar station ${nr}`)),
      ];
    }));
}

function groei(store, answers) {
  const oud = antwoord(answers, 'nulmeting');
  return el('section', { class: 'plan__groei' },
    el('h2', {}, 'Wat heb je geleerd?'),
    el('p', {}, 'In station 0 beantwoordde je de vraag hieronder voor het eerst. Vergelijk je antwoord van toen met dat van nu.'),
    el('div', { class: 'plan__groei-kolommen' },
      el('div', {}, el('h3', {}, 'Je nulmeting'),
        oud ? el('p', { class: 'plan__antwoord' }, oud)
          : el('p', { class: 'plan__leeg' }, 'Je hebt nog geen nulmeting geschreven. ', el('a', { href: '#/station/0' }, 'Naar station 0'))),
      el('div', {}, el('h3', {}, 'Nu'), renderOpen(NIEUW, { store }))));
}

function checklist(store) {
  const vinkjes = new Set(store.get('checks.plan') ?? []);
  return el('section', { class: 'plan__checklist' },
    el('h2', {}, 'Is je plan compleet?'),
    el('fieldset', {},
      el('legend', {}, 'Vink aan wat in je plan staat.'),
      KENMERKEN.map((k, i) => el('label', {},
        el('input', {
          type: 'checkbox', checked: vinkjes.has(i),
          onchange: (e) => {
            if (e.target.checked) vinkjes.add(i); else vinkjes.delete(i);
            store.set('checks.plan', [...vinkjes].sort((a, b) => a - b));
          },
        }), ' ', k))));
}

function acties(store) {
  const melding = el('p', { class: 'plan__melding', role: 'status' });
  const kopie = el('div', { class: 'plan__kopie', hidden: true });
  const kopieer = el('button', {
    type: 'button', class: 'knop',
    onclick: async () => {
      const tekst = buildPlanText(store.get('answers', {}));
      try {
        await navigator.clipboard.writeText(tekst);
        kopie.hidden = true;
        melding.textContent = 'Gekopieerd. Plak de tekst in Word of een ander document.';
      } catch {
        const vak = el('textarea', { rows: 14, readonly: true, 'aria-label': 'Je observatieplan als tekst' });
        vak.value = tekst;
        kopie.replaceChildren(el('p', {}, 'Automatisch kopiëren lukte niet. Selecteer de tekst en kopieer hem.'), vak);
        kopie.hidden = false;
        melding.textContent = '';
        vak.focus();
        vak.select();
      }
    },
  }, 'Kopieer als tekst');
  const print = el('button', { type: 'button', class: 'knop knop--stil', onclick: () => window.print() }, 'Print of bewaar als pdf');
  return el('div', { class: 'plan__acties' }, el('p', {}, kopieer, ' ', print), melding, kopie);
}

export function renderPlan(store) {
  const answers = store.get('answers', {});
  return [
    el('p', { class: 'plan__intro' }, 'Hier staan je antwoorden uit Mijn project, in de volgorde van een methodeparagraaf. Je past ze aan in het station zelf. Kopieer het plan naar Word, of bewaar het als pdf.'),
    acties(store),
    PLAN_SECTIES.map((s, i) => sectie(s, i, answers)),
    groei(store, answers),
    checklist(store),
  ];
}

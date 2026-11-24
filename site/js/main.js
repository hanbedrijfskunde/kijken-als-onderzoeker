import { createStore, safeLocalStorage } from './store.js';
import { parseHash } from './router.js';
import { nextStatus } from './status.js';
import { STATIONS } from './content/stations.js';
import { renderKaart } from './ui/kaart.js';
import { el } from './ui/dom.js';
import { INHOUD } from './content/index.js';
import { renderStation } from './ui/station.js';
import { renderPlan } from './ui/plan.js';
import './ui/blokken.js';

const store = createStore(safeLocalStorage());
const app = document.getElementById('app');

if (!store.persistent) {
  app.before(el('p', { class: 'melding melding-opslag', role: 'status' },
    'Je browser laat deze pagina niets bewaren, bijvoorbeeld in een privévenster of binnen de leeromgeving. ',
    el('strong', {}, 'Je antwoorden worden niet bewaard als je deze pagina sluit.'),
    ' Open de pagina in een gewoon venster, of kopieer je antwoorden voordat je stopt.'));
}

function go(hash, force = false) {
  if (location.hash === hash && force) render();
  else location.hash = hash;
}

function setStatus(id, event) {
  const now = store.get(`stations.${id}.status`, 'nog-niet');
  const next = nextStatus(now, event);
  if (next !== now) store.set(`stations.${id}.status`, next);
}

function terugNaarKaart() {
  return el('p', { class: 'terug' }, el('a', { href: '#/' }, 'Naar de kaart'));
}

function renderStationView(id) {
  const station = STATIONS.find((s) => s.id === id);
  setStatus(id, 'geopend');
  const content = INHOUD[id];
  const doeAf = [];
  const ctx = {
    store,
    station,
    checkEl: el('div', { class: 'check' }),
    go,
    onDoeAf: (fn) => doeAf.push(fn),
    event(name) {
      setStatus(id, name);
      if (name === 'doe-af') doeAf.forEach((fn) => fn());
    },
  };
  const { article } = renderStation(content, ctx);
  if (store.get(`stations.${id}.status`) === 'klaar') doeAf.forEach((fn) => fn());
  return article;
}

function renderPlanView() {
  return el('article', { class: 'plan' }, terugNaarKaart(), el('h1', {}, 'Mijn observatieplan'), renderPlan(store));
}

function render() {
  const route = parseHash(location.hash);
  let view;
  try {
    if (route.view === 'station') view = renderStationView(route.id);
    else if (route.view === 'plan') view = renderPlanView();
    else view = renderKaart(store, go);
  } catch (fout) {
    console.error(fout);
    view = el('article', { class: 'station' }, terugNaarKaart(),
      el('h1', {}, 'Er ging iets mis'),
      el('p', {}, 'Dit onderdeel kon niet worden getoond. Ga terug naar de kaart. Blijft het gebeuren, kies dan op de kaart Opnieuw beginnen.'));
  }
  app.replaceChildren(view);
  window.scrollTo(0, 0);
  if (route.view !== 'kaart') app.focus({ preventScroll: true });
}

window.addEventListener('hashchange', render);
render();

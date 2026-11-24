import { createStore, safeLocalStorage, STORE_KEY } from './store.js';
import { parseHash } from './router.js';
import { nextStatus } from './status.js';
import { STATIONS } from './content/stations.js';
import { renderKaart } from './ui/kaart.js';
import { el } from './ui/dom.js';
import { INHOUD } from './content/index.js';
import { renderStation } from './ui/station.js';
import { renderPlan } from './ui/plan.js';
import { padenVoor, geraakt } from './sync.js';
import './ui/blokken.js';

const store = createStore(safeLocalStorage());
const STANDAARDTITEL = document.title;
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

// behoud: true bij een wijziging uit een ander tabblad; dan blijft de scrollpositie staan.
function render({ behoud = false } = {}) {
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
  const y = window.scrollY;
  app.replaceChildren(view);
  if (behoud) {
    window.scrollTo(0, y);
    return;
  }
  window.scrollTo(0, 0);
  // Titel en focus volgen de weergave: een schermlezer meldt dan waar de student nu is.
  const kop = route.view === 'kaart' ? null : view.querySelector('h1');
  document.title = kop ? `${kop.textContent} · Kijken als onderzoeker` : STANDAARDTITEL;
  if (kop) {
    kop.setAttribute('tabindex', '-1');
    kop.focus({ preventScroll: true });
  }
}

window.addEventListener('hashchange', () => render());
// Een ander tabblad bewaarde iets (key null: de opslag is gewist). Toon de nieuwe stand.
window.addEventListener('storage', (e) => {
  if (e.key !== STORE_KEY && e.key !== null) return;
  store.reload();
  if (e.key !== null && !geraakt(e.oldValue, e.newValue, padenVoor(parseHash(location.hash), INHOUD))) return;
  render({ behoud: true });
});
render();

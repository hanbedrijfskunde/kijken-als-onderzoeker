import { createStore, safeLocalStorage } from './store.js';
import { parseHash } from './router.js';
import { nextStatus } from './status.js';
import { STATIONS } from './content/stations.js';
import { renderKaart } from './ui/kaart.js';
import { el } from './ui/dom.js';
import { INHOUD } from './content/index.js';
import { renderStation } from './ui/station.js';
import './ui/blokken.js';

const store = createStore(safeLocalStorage());
const app = document.getElementById('app');

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
  if (!content) {
    return el('article', { class: 'station' },
      terugNaarKaart(), el('h1', {}, station.titel), el('p', {}, 'Dit station volgt nog.'));
  }
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
  return el('article', { class: 'plan' }, terugNaarKaart(), el('h1', {}, 'Mijn observatieplan'));
}

function render() {
  const route = parseHash(location.hash);
  let view;
  if (route.view === 'station') view = renderStationView(route.id);
  else if (route.view === 'plan') view = renderPlanView();
  else view = renderKaart(store, go);
  app.replaceChildren(view);
  window.scrollTo(0, 0);
  if (route.view !== 'kaart') app.focus({ preventScroll: true });
}

window.addEventListener('hashchange', render);
render();

import { el } from './dom.js';

// Meerkeuze per item, met directe feedback. De keuzes worden bewaard, zodat de feedback bij terugkomst blijft staan.
// De zinnen zijn per oefening in te stellen; {gekozen}, {juist}, {goed} en {n} worden ingevuld.
const ZINNEN = {
  fout: 'Je koos {gekozen}; hier past {juist} beter.',
  uitslag: 'Je koos {goed} van de {n} keer de methode die het best past.',
};
const vul = (zin, w) => zin.replace(/\{(\w+)\}/g, (_, k) => String(w[k]));

// Bewaard als {itemtekst: optietekst}: zo hoort een keuze ook na het herschikken van items bij het goede item.
// De site van fase 2 bewaarde een lijst op positie; die lezen we één keer zo in.
function lees(opgeslagen, items) {
  if (Array.isArray(opgeslagen)) {
    return items.map((item, i) => {
      const k = opgeslagen[i];
      return Number.isInteger(k) && k >= 0 && k < item.opties.length ? k : null;
    });
  }
  const per = opgeslagen && typeof opgeslagen === 'object' ? opgeslagen : {};
  return items.map((item) => {
    const k = Object.hasOwn(per, item.tekst) ? item.opties.indexOf(per[item.tekst]) : -1;
    return k >= 0 ? k : null;
  });
}

function bewaarvorm(keuzes, items) {
  return Object.fromEntries(items.flatMap((item, i) => (keuzes[i] == null ? [] : [[item.tekst, item.opties[keuzes[i]]]])));
}

export function renderKeuze(block, ctx) {
  const zinnen = { ...ZINNEN, ...block.zinnen };
  // De slotzin mag afhangen van wat de student elders deed (zie station 0).
  const slotTekst = () => (typeof block.slot === 'function' ? block.slot(ctx.store) : block.slot);
  const { store, station } = ctx;
  const pad = `keuze.${station.id}`;
  const opgeslagen = store.get(pad);
  const keuzes = lees(opgeslagen, block.items);
  if (Array.isArray(opgeslagen)) store.set(pad, bewaarvorm(keuzes, block.items));
  const uitslag = el('div', { class: 'uitslag', 'aria-live': 'polite' });
  ctx.checkEl.append(uitslag);
  let klaarGemeld = false;

  function toon(i, fb) {
    const item = block.items[i];
    const k = keuzes[i];
    if (k == null) return;
    const ok = k === item.juist;
    fb.className = `keuze-item__fb ${ok ? 'is-goed' : 'is-anders'}`;
    fb.textContent = ok ? `Goed: ${item.opties[k]}. ${item.uitleg}`
      : `${vul(zinnen.fout, { gekozen: item.opties[k], juist: item.opties[item.juist] })} ${item.uitleg}`;
  }

  function samenvatten(melden) {
    if (keuzes.some((k) => k == null)) return;
    const goed = keuzes.filter((k, i) => k === block.items[i].juist).length;
    uitslag.replaceChildren(el('p', { class: 'uitslag__kern' },
      vul(zinnen.uitslag, { goed, n: block.items.length })),
    slotTekst() ? el('p', {}, slotTekst()) : null);
    if (melden && !klaarGemeld) {
      klaarGemeld = true;
      ctx.event('doe-af');
    }
  }

  // Knoppen en geen keuzerondjes: bij rondjes kiezen de pijltjestoetsen al terwijl je de opties langsloopt,
  // en dan zie je de feedback voordat je zelf koos.
  const items = block.items.map((item, i) => {
    const fb = el('p', { class: 'keuze-item__fb', 'aria-live': 'polite' });
    const knoppen = item.opties.map((o, j) => el('button', {
      type: 'button', class: 'keuze-knop', 'aria-pressed': String(keuzes[i] === j),
      onclick: () => {
        keuzes[i] = j;
        store.set(pad, bewaarvorm(keuzes, block.items));
        knoppen.forEach((b, x) => b.setAttribute('aria-pressed', String(x === j)));
        toon(i, fb);
        samenvatten(true);
      },
    }, el('span', { class: 'keuze-knop__vink', 'aria-hidden': 'true' }, '✓'), o));
    const node = el('fieldset', { class: 'keuze-item' },
      el('legend', {}, item.tekst),
      el('div', { class: 'keuze-item__opties' }, knoppen),
      fb);
    toon(i, fb);
    return node;
  });

  samenvatten(false);
  return el('div', { class: 'keuze-oefening' }, items);
}

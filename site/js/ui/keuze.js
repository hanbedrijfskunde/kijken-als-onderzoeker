import { el } from './dom.js';

// Meerkeuze per item, met directe feedback. De keuzes worden bewaard, zodat de feedback bij terugkomst blijft staan.
// De zinnen zijn per oefening in te stellen; {gekozen}, {juist}, {goed} en {n} worden ingevuld.
const ZINNEN = {
  fout: 'Je koos {gekozen}; hier past {juist} beter.',
  uitslag: 'Je koos {goed} van de {n} keer de methode die het best past.',
};
const vul = (zin, w) => zin.replace(/\{(\w+)\}/g, (_, k) => String(w[k]));

export function renderKeuze(block, ctx) {
  const zinnen = { ...ZINNEN, ...block.zinnen };
  const { store, station } = ctx;
  const pad = `keuze.${station.id}`;
  const opgeslagen = store.get(pad);
  const keuzes = block.items.map((_, i) => {
    const k = Array.isArray(opgeslagen) ? opgeslagen[i] : null;
    return Number.isInteger(k) && k >= 0 && k < block.items[i].opties.length ? k : null;
  });
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
    block.slot ? el('p', {}, block.slot) : null);
    if (melden && !klaarGemeld) {
      klaarGemeld = true;
      ctx.event('doe-af');
    }
  }

  const items = block.items.map((item, i) => {
    const fb = el('p', { class: 'keuze-item__fb', 'aria-live': 'polite' });
    const node = el('fieldset', { class: 'keuze-item' },
      el('legend', {}, item.tekst),
      el('div', { class: 'keuze-item__opties' }, item.opties.map((o, j) => el('label', { class: 'keuze' },
        el('input', {
          type: 'radio', name: `keuze-${station.id}-${i}`, value: String(j), checked: keuzes[i] === j,
          onchange: () => {
            keuzes[i] = j;
            store.set(pad, keuzes);
            toon(i, fb);
            samenvatten(true);
          },
        }), ' ', o))),
      fb);
    toon(i, fb);
    return node;
  });

  samenvatten(false);
  return el('div', { class: 'keuze-oefening' }, items);
}

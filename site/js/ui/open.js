import { el } from './dom.js';
import { indexLijst } from '../lijst.js';

// Een open vraag met een voorbeeldantwoord en een checklist om je eigen antwoord langs te leggen.
// Zonder voorbeeld (de nulmeting) is er niets om mee te vergelijken: dan alleen het antwoordvak.
export function renderOpen(block, ctx) {
  const { store } = ctx;
  const id = `open-${block.veld}`;
  const vinkjes = new Set(indexLijst(store.get(`checks.${block.veld}`)));
  const textarea = el('textarea', {
    id, rows: 5,
    oninput: (e) => store.set(`answers.${block.veld}`, e.target.value),
  });
  const opgeslagen = store.get(`answers.${block.veld}`);
  textarea.value = typeof opgeslagen === 'string' ? opgeslagen : '';

  const metVoorbeeld = Boolean(block.voorbeeld && block.checklist?.length);
  const vergelijk = metVoorbeeld && el('div', { class: 'open__vergelijk', hidden: vinkjes.size === 0 },
    el('p', { class: 'open__voorbeeld' }, el('strong', {}, 'Voorbeeld: '), block.voorbeeld),
    el('fieldset', { class: 'open__checklist' },
      el('legend', {}, 'Staat dit in jouw antwoord? Vink aan wat erin staat.'),
      block.checklist.map((punt, i) => el('label', {},
        el('input', {
          type: 'checkbox', checked: vinkjes.has(i),
          onchange: (e) => {
            if (e.target.checked) vinkjes.add(i); else vinkjes.delete(i);
            store.set(`checks.${block.veld}`, [...vinkjes].sort());
          },
        }), ' ', punt))));

  return el('div', { class: 'open' },
    el('label', { for: id, class: 'open__vraag' }, block.vraag),
    textarea,
    el('p', { class: 'open__acties' },
      metVoorbeeld ? el('button', {
        type: 'button', class: 'knop knop--stil',
        onclick: () => { vergelijk.hidden = false; },
      }, 'Vergelijk met het voorbeeld') : null,
      el('span', { class: 'open__bewaard' }, store.persistent ? 'Je antwoord wordt bewaard in deze browser.'
        : 'Kopieer je antwoord voordat je de pagina sluit: deze browser bewaart het niet.')),
    metVoorbeeld ? vergelijk : null);
}

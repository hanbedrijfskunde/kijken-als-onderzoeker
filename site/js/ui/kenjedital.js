import { el } from './dom.js';

// "Ken je dit al?": wie alle vragen goed heeft, mag het station overslaan.
export function renderKenJeDitAl(vragen, ctx) {
  const uit = el('div', { class: 'kjda__uit', 'aria-live': 'polite' });
  const sets = vragen.map((v, i) => {
    const fb = el('p', { class: 'kjda__fb' });
    return {
      v, fb,
      node: el('fieldset', {},
        el('legend', {}, v.vraag),
        v.opties.map((o, j) => el('label', { class: 'kjda__optie' },
          el('input', { type: 'radio', name: `kjda-${ctx.station.id}-${i}`, value: String(j) }), ' ', o)),
        fb),
    };
  });

  const knop = el('button', {
    type: 'button', class: 'knop',
    onclick: () => {
      let goed = 0;
      for (const s of sets) {
        const gekozen = s.node.querySelector('input:checked');
        const ok = gekozen && Number(gekozen.value) === s.v.juist;
        if (ok) goed += 1;
        s.fb.className = `kjda__fb ${ok ? 'is-goed' : 'is-anders'}`;
        s.fb.textContent = `${ok ? 'Goed.' : 'Niet goed.'} ${s.v.uitleg}`;
      }
      if (goed === sets.length) {
        uit.replaceChildren(
          el('p', {}, 'Alles goed. Je kunt dit station overslaan en meteen je eigen project invullen.'),
          el('button', {
            type: 'button', class: 'knop',
            onclick: () => {
              ctx.event('overgeslagen');
              const doel = document.getElementById('blok-project');
              doel?.setAttribute('tabindex', '-1');
              doel?.focus();
              doel?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            },
          }, 'Sla dit station over'));
      } else {
        uit.replaceChildren(el('p', {}, `Je had ${goed} van de ${sets.length} goed. Werk het station gewoon door.`));
      }
    },
  }, 'Controleer je antwoorden');

  return el('details', { class: 'kenjedital' },
    el('summary', {}, 'Ken je dit al? Doe de check'),
    el('p', { class: 'kjda__intro' }, 'Heb je alles goed, dan kun je dit station overslaan.'),
    sets.map((s) => s.node),
    el('p', {}, knop),
    uit);
}

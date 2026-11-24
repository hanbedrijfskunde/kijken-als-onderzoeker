// Het observatieplan: de Mijn project-antwoorden in de volgorde van een methodeparagraaf.

export const PLAN_SECTIES = [
  { titel: 'Begrip en waarom observatie', velden: ['begrip'] },
  { titel: 'Indicatoren en codeboekregel', velden: ['indicatoren', 'codeboekregel'] },
  { titel: 'Eenheid, plek, duur, vastlegging en toestemming', velden: ['eenheid', 'vastlegging'] },
  { titel: 'Codeerschema', velden: ['codeerschema'] },
  { titel: 'Betrouwbaarheid', velden: ['betrouwbaarheid'] },
  { titel: 'Beslissing en grenzen', velden: ['beslissing'] },
];

// Tussenkopjes voor secties met meer dan één antwoord.
export const VELD_LABEL = {
  indicatoren: 'Indicatoren',
  codeboekregel: 'Codeboekregel',
  eenheid: 'Eenheid, plek en duur',
  vastlegging: 'Vastlegging en toestemming',
};

export const LEEG = '(nog niet ingevuld)';

export function antwoord(answers, veld) {
  const t = answers?.[veld];
  return typeof t === 'string' && t.trim() ? t.trim() : null;
}

export function buildPlanText(answers) {
  return PLAN_SECTIES.map((s, i) => {
    const delen = s.velden.map((v) => {
      const t = antwoord(answers, v) ?? LEEG;
      return s.velden.length > 1 ? `${VELD_LABEL[v]}:\n${t}` : t;
    });
    return `${i + 1}. ${s.titel}\n${delen.join('\n\n')}`;
  }).join('\n\n');
}

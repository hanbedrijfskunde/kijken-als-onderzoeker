import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PLAN_SECTIES, buildPlanText } from '../../site/js/plan.js';
import { ANTWOORDVELDEN } from '../../site/js/content/stations.js';
import { INHOUD } from '../../site/js/content/index.js';

const VELDEN = ['begrip', 'indicatoren', 'codeboekregel', 'eenheid', 'vastlegging', 'codeerschema', 'betrouwbaarheid', 'beslissing'];

test('six sections in the order of a methods section', () => {
  assert.deepEqual(PLAN_SECTIES.map((s) => s.titel), [
    'Begrip en waarom observatie', 'Indicatoren en codeboekregel',
    'Eenheid, plek, duur, vastlegging en toestemming', 'Codeerschema', 'Betrouwbaarheid', 'Beslissing en grenzen',
  ]);
  assert.deepEqual(PLAN_SECTIES.flatMap((s) => s.velden), VELDEN);
});

test('every plan field is the project question of exactly one station', () => {
  for (const veld of VELDEN) {
    assert.ok(ANTWOORDVELDEN.includes(veld));
    const stations = Object.values(INHOUD).filter((c) => c.mijnProject.some((o) => o.veld === veld));
    assert.equal(stations.length, 1, veld);
  }
});

test('plan text numbers the headings in order, with the answers under them', () => {
  const t = buildPlanText(Object.fromEntries(VELDEN.map((v) => [v, `antwoord ${v}`])));
  assert.ok(t.startsWith('1. Begrip en waarom observatie\nantwoord begrip'), t.slice(0, 60));
  const posities = PLAN_SECTIES.map((s, i) => t.indexOf(`${i + 1}. ${s.titel}`));
  assert.ok(posities.every((p, i) => p >= 0 && (i === 0 || p > posities[i - 1])), String(posities));
  assert.match(t, /Indicatoren:\nantwoord indicatoren/);
  assert.match(t, /Codeboekregel:\nantwoord codeboekregel/);
});

test('a missing or blank field shows a placeholder', () => {
  const t = buildPlanText({ begrip: '   ' });
  assert.equal(t.match(/\(nog niet ingevuld\)/g).length, VELDEN.length);
  assert.equal(buildPlanText(null).match(/\(nog niet ingevuld\)/g).length, VELDEN.length);
});

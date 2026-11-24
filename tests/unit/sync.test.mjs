import { test } from 'node:test';
import assert from 'node:assert/strict';
import { padenVoor, geraakt } from '../../site/js/sync.js';
import { INHOUD } from '../../site/js/content/index.js';

test('the map shows the station statuses', () => {
  assert.deepEqual(padenVoor({ view: 'kaart' }, INHOUD), ['stations']);
});

test('a station shows its status, choices, answer fields and its exercise data', () => {
  const s0 = padenVoor({ view: 'station', id: 's0' }, INHOUD);
  for (const p of ['stations.s0', 'keuze.s0', 'answers.nulmeting', 'answers.begrip', 'checks.begrip']) assert.ok(s0.includes(p), p);
  assert.ok(!s0.includes('answers.beslissing'));
  assert.ok(padenVoor({ view: 'station', id: 's1' }, INHOUD).includes('answers.herschrijf-betrokken'));
  assert.ok(padenVoor({ view: 'station', id: 's2' }, INHOUD).includes('tally.s2'));
  assert.ok(padenVoor({ view: 'station', id: 's4' }, INHOUD).includes('codes'));
});

test('geraakt: only a change on one of the paths counts', () => {
  const oud = JSON.stringify({ answers: { begrip: 'a', beslissing: 'x' }, checks: { plan: [1] } });
  const anderVeld = JSON.stringify({ answers: { begrip: 'a', beslissing: 'xy' }, checks: { plan: [1] } });
  const ditVeld = JSON.stringify({ answers: { begrip: 'ab', beslissing: 'x' }, checks: { plan: [1] } });
  assert.equal(geraakt(oud, anderVeld, ['answers.begrip']), false);
  assert.equal(geraakt(oud, ditVeld, ['answers.begrip']), true);
  assert.equal(geraakt(oud, ditVeld, ['answers']), true);
});

test('geraakt: missing or unreadable data counts as a change', () => {
  assert.equal(geraakt(null, JSON.stringify({ stations: { s0: { status: 'bezig' } } }), ['stations']), true);
  assert.equal(geraakt('{kapot', '{}', ['stations']), true);
});

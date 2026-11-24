import { test } from 'node:test';
import assert from 'node:assert/strict';
import s4, { OEFENTABEL, ZELFDE_TOTALEN } from '../../site/js/content/s4.js';
import { cohensKappa } from '../../site/js/kappa.js';
import { assertStationShape } from './helpers/content.mjs';

const close = (a, b) => assert.ok(Math.abs(a - b) < 1e-4, `${a} ≉ ${b}`);
const sums = (m) => [m.map((r) => r[0] + r[1]), [m[0][0] + m[1][0], m[0][1] + m[1][1]]];

test('station 4 has the station shape', () => assertStationShape(s4));

test('the hand exercise table gives kappa 0.49', () => {
  assert.deepEqual(OEFENTABEL.matrix, [[9, 3], [2, 6]]);
  close(cohensKappa(OEFENTABEL.matrix).kappa, 0.4898);
});

test('equal totals still give a low kappa', () => {
  const [rows, cols] = sums(ZELFDE_TOTALEN.matrix);
  assert.deepEqual(rows, cols);
  close(cohensKappa(ZELFDE_TOTALEN.matrix).kappa, 0.2);
});

test('station 4 uses the planned fragments, stills and exercises', () => {
  const videos = s4.kijk.filter((b) => b.type === 'video').map((b) => [b.start, b.end]);
  assert.deepEqual(videos, [[1749, 1925], [1927, 2043], [2044, 2298]]);
  const deep = s4.kijk.find((b) => b.type === 'details');
  assert.deepEqual(deep.blokken.filter((b) => b.type === 'video').map((b) => [b.start, b.end]), [[2298, 2426]]);
  assert.ok(deep.blokken.some((b) => b.type === 'still' && b.bestand.startsWith('13-')));
  const stills = s4.kijk.filter((b) => b.type === 'still').map((b) => b.bestand.slice(0, 2));
  assert.deepEqual(stills, ['10', '11', '12']);
  assert.deepEqual(s4.doe.filter((b) => b.type !== 'tekst').map((b) => b.type), ['kappa-hand', 'kappa-calc']);
  assert.deepEqual(s4.mijnProject.map((o) => o.veld), ['betrouwbaarheid']);
});

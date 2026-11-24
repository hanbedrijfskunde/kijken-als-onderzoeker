import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  confusionMatrix, cohensKappa, landisKoch, studentVerdict, mostConfused, formatNl, parseNl,
} from '../../site/js/kappa.js';

const close = (a, b) => assert.ok(Math.abs(a - b) < 1e-4, `${a} ≉ ${b}`);

test('kappa for the hand exercise table [[9,3],[2,6]]', () => {
  const r = cohensKappa([[9, 3], [2, 6]]);
  assert.equal(r.n, 20);
  close(r.po, 0.75); close(r.pe, 0.51); close(r.kappa, 0.4898);
});

test('kappa for equal totals [[3,2],[2,3]]', () => {
  const r = cohensKappa([[3, 2], [2, 3]]);
  close(r.po, 0.6); close(r.pe, 0.5); close(r.kappa, 0.2);
});

test('perfect agreement gives kappa 1', () => {
  close(cohensKappa([[5, 0], [0, 5]]).kappa, 1);
});

test('kappa is null when pe is 1', () => {
  assert.equal(cohensKappa([[10, 0], [0, 0]]).kappa, null);
});

test('confusionMatrix counts rows for A and columns for B', () => {
  assert.deepEqual(confusionMatrix(['a', 'b', 'a'], ['a', 'a', 'a'], ['a', 'b']), [[2, 0], [1, 0]]);
});

test('confusionMatrix throws on unequal length or unknown code', () => {
  assert.throws(() => confusionMatrix(['a'], ['a', 'b'], ['a', 'b']));
  assert.throws(() => confusionMatrix(['c'], ['a'], ['a', 'b']));
});

test('landisKoch bands', () => {
  assert.equal(landisKoch(-0.1), 'minder dan toeval');
  assert.equal(landisKoch(0.15), 'gering');
  assert.equal(landisKoch(0.2), 'gering');
  assert.equal(landisKoch(0.21), 'redelijk');
  assert.equal(landisKoch(0.49), 'matig');
  assert.equal(landisKoch(0.7), 'aanzienlijk');
  assert.equal(landisKoch(0.9), 'bijna perfect');
});

test('studentVerdict thresholds', () => {
  assert.equal(studentVerdict(0.59), 'onvoldoende');
  assert.equal(studentVerdict(0.6), 'bruikbaar');
  assert.equal(studentVerdict(0.79), 'bruikbaar');
  assert.equal(studentVerdict(0.8), 'goed');
});

test('mostConfused picks the largest off-diagonal pair', () => {
  assert.deepEqual(mostConfused([[4, 2, 0], [3, 5, 1], [0, 0, 6]], ['x', 'y', 'z']), { a: 'x', b: 'y', count: 5 });
  assert.equal(mostConfused([[4, 0], [0, 5]], ['x', 'y']), null);
});

test('formatNl uses a decimal comma', () => {
  assert.equal(formatNl(0.4898), '0,49');
  assert.equal(formatNl(1), '1,00');
  assert.equal(formatNl(2.25, 1), '2,3');
});

test('parseNl accepts comma and point', () => {
  for (const s of ['0,49', '0.49', ',49', ' 0,49 ']) close(parseNl(s), 0.49);
  assert.ok(Number.isNaN(parseNl('abc')));
  assert.ok(Number.isNaN(parseNl('')));
});

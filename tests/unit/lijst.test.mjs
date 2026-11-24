import { test } from 'node:test';
import assert from 'node:assert/strict';
import { indexLijst } from '../../site/js/lijst.js';

test('indexLijst gives [] for anything that is not an array', () => {
  for (const raw of [5, {}, '12', null, undefined, true]) assert.deepEqual(indexLijst(raw), []);
});

test('indexLijst keeps only the non-negative integers', () => {
  assert.deepEqual(indexLijst([2, 'x', -1, 1.5, 0]), [2, 0]);
});

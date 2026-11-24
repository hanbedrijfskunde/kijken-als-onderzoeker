import { test } from 'node:test';
import assert from 'node:assert/strict';
import { compareTally } from '../../site/js/tally.js';

test('compareTally gives one row per key code, in key order', () => {
  assert.deepEqual(compareTally({ a: 2, b: 7 }, { a: 1, b: 7 }), [
    { code: 'a', mine: 2, key: 1, diff: 1, richting: 'meer' },
    { code: 'b', mine: 7, key: 7, diff: 0, richting: 'gelijk' },
  ]);
});

test('a missing or broken count counts as zero', () => {
  const rows = compareTally({ b: 'x' }, { a: 1, b: 2 });
  assert.deepEqual(rows.map((r) => [r.mine, r.richting]), [[0, 'minder'], [0, 'minder']]);
  assert.deepEqual(compareTally(null, { a: 0 }).map((r) => r.richting), ['gelijk']);
});

test('perUur divides every count by the hours observed', async () => {
  const { perUur } = await import('../../site/js/tally.js');
  assert.deepEqual(perUur({ a: 15, b: 6 }, 6), { a: 2.5, b: 1 });
  assert.throws(() => perUur({ a: 1 }, 0));
});

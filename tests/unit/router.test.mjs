import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseHash } from '../../site/js/router.js';

test('station hash gives the station view', () => {
  assert.deepEqual(parseHash('#/station/3'), { view: 'station', id: 's3' });
  assert.deepEqual(parseHash('#/station/0'), { view: 'station', id: 's0' });
});
test('plan hash gives the plan view', () => {
  assert.deepEqual(parseHash('#/plan'), { view: 'plan' });
});
test('anything else gives the map', () => {
  for (const h of ['', '#/', '#/station/9', '#/station/x', '#iets']) {
    assert.deepEqual(parseHash(h), { view: 'kaart' });
  }
});

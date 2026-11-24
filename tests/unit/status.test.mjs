import { test } from 'node:test';
import assert from 'node:assert/strict';
import { nextStatus } from '../../site/js/status.js';

test('geopend moves nog-niet to bezig and leaves others', () => {
  assert.equal(nextStatus('nog-niet', 'geopend'), 'bezig');
  for (const s of ['bezig', 'klaar', 'overgeslagen']) assert.equal(nextStatus(s, 'geopend'), s);
});
test('doe-af always gives klaar', () => {
  for (const s of ['nog-niet', 'bezig', 'klaar', 'overgeslagen']) assert.equal(nextStatus(s, 'doe-af'), 'klaar');
});
test('overgeslagen applies to nog-niet and bezig, klaar stays klaar', () => {
  assert.equal(nextStatus('nog-niet', 'overgeslagen'), 'overgeslagen');
  assert.equal(nextStatus('bezig', 'overgeslagen'), 'overgeslagen');
  assert.equal(nextStatus('klaar', 'overgeslagen'), 'klaar');
});
test('undefined current counts as nog-niet', () => {
  assert.equal(nextStatus(undefined, 'geopend'), 'bezig');
});

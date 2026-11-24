import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createStore } from '../../site/js/store.js';

function fakeStorage({ throwOnSet = false } = {}) {
  const m = new Map();
  return {
    getItem: (k) => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => { if (throwOnSet) throw new Error('blocked'); m.set(k, String(v)); },
    removeItem: (k) => { m.delete(k); },
    _map: m,
  };
}

test('set then get, and a second store on the same storage reads it back', () => {
  const st = fakeStorage();
  const a = createStore(st);
  a.set('answers.begrip', 'x');
  assert.equal(a.get('answers.begrip'), 'x');
  const b = createStore(st);
  assert.equal(b.get('answers.begrip'), 'x');
  assert.equal(b.persistent, true);
});

test('get returns the fallback for a missing path', () => {
  const a = createStore(fakeStorage());
  assert.equal(a.get('stations.s3.status', 'nog-niet'), 'nog-niet');
});

test('setItem that throws gives persistent false and still works in memory', () => {
  const a = createStore(fakeStorage({ throwOnSet: true }));
  assert.equal(a.persistent, false);
  a.set('codes.s3', ['overig']);
  assert.deepEqual(a.get('codes.s3'), ['overig']);
});

test('null storage gives persistent false', () => {
  const a = createStore(null);
  assert.equal(a.persistent, false);
  a.set('answers.x', 'y');
  assert.equal(a.get('answers.x'), 'y');
});

test('corrupt JSON starts empty without throwing', () => {
  const st = fakeStorage();
  st._map.set('kijken-als-onderzoeker/v1', '{not json');
  const a = createStore(st);
  assert.deepEqual(a.snapshot(), {});
});

test('reset clears memory and removes the key', () => {
  const st = fakeStorage();
  const a = createStore(st);
  a.set('answers.begrip', 'x');
  a.reset();
  assert.equal(a.get('answers.begrip'), undefined);
  assert.equal(st.getItem('kijken-als-onderzoeker/v1'), null);
});

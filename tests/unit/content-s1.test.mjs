import { test } from 'node:test';
import assert from 'node:assert/strict';
import s1, { GEDRAG } from '../../site/js/content/s1.js';
import { assertStationShape } from './helpers/content.mjs';

test('station 1 has the station shape', () => assertStationShape(s1));

test('ten behaviours, at least three of each kind, each with an explanation', () => {
  assert.equal(GEDRAG.length, 10);
  assert.ok(GEDRAG.filter((g) => g.waarneembaar).length >= 3);
  assert.ok(GEDRAG.filter((g) => !g.waarneembaar).length >= 3);
  for (const g of GEDRAG) assert.ok(g.tekst && g.uitleg && typeof g.waarneembaar === 'boolean');
});

test('the two rewrite items are non-observable behaviours from the list', () => {
  const herschrijf = s1.doe.filter((b) => b.type === 'open');
  assert.equal(herschrijf.length, 2);
  for (const o of herschrijf) {
    const bron = GEDRAG.find((g) => o.vraag.includes(g.tekst.replace(/\.$/, '')));
    assert.ok(bron && !bron.waarneembaar, o.vraag);
    assert.ok(o.voorbeeld && o.checklist.length >= 3);
  }
  assert.ok(s1.doe.findIndex((b) => b.type === 'sorteer') < s1.doe.findIndex((b) => b.type === 'open'));
});

test('station 1 uses the planned video, stills and project fields', () => {
  const video = s1.kijk.find((b) => b.type === 'video');
  assert.deepEqual([video.start, video.end], [891, 1301]);
  const stills = s1.kijk.filter((b) => b.type === 'still');
  assert.deepEqual(stills.map((b) => b.bestand.slice(0, 2)), ['04', '05', '06']);
  for (const n of ['10', '6', '8', '2']) assert.match(stills[2].bijschrift, new RegExp(`\\b${n}\\b`));
  assert.deepEqual(s1.mijnProject.map((o) => o.veld), ['indicatoren', 'codeboekregel']);
  const regel = s1.mijnProject[1];
  for (const deel of ['naam', 'definitie', 'wanneer wel', 'wanneer niet', 'voorbeeld']) {
    assert.match(regel.vraag.toLowerCase(), new RegExp(deel));
  }
});

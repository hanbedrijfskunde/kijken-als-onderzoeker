import { test } from 'node:test';
import assert from 'node:assert/strict';
import s2, { VIDEO_CODES, SLEUTEL, FEEDBACK, BESPREKING, OEFENCLIP } from '../../site/js/content/s2.js';
import { assertStationShape } from './helpers/content.mjs';

test('station 2 has the station shape', () => assertStationShape(s2));

test('four video codes with the key from the video', () => {
  assert.deepEqual(VIDEO_CODES.map((c) => c.id), ['eigen-bouwwerk', 'strategie-wisselen', 'plan-bekijken', 'afgeleid']);
  for (const c of VIDEO_CODES) assert.ok(c.naam && c.definitie);
  assert.deepEqual(SLEUTEL, { 'eigen-bouwwerk': 1, 'strategie-wisselen': 7, 'plan-bekijken': 2, afgeleid: 1 });
  for (const c of VIDEO_CODES) for (const r of ['meer', 'minder', 'gelijk']) assert.ok(FEEDBACK[c.id][r], `${c.id}.${r}`);
});

test('station 2 uses the planned videos, no stills, and the project fields', () => {
  const videos = [...s2.kijk, ...s2.doe].filter((b) => b.type === 'video').map((b) => [b.start, b.end]);
  assert.deepEqual(videos, [[1301, 1408]], 'de oefenclip zit in de klikteller, direct boven de knoppen');
  assert.deepEqual([OEFENCLIP.start, OEFENCLIP.end], [1409, 1510]);
  assert.ok(OEFENCLIP.titel);
  assert.deepEqual([BESPREKING.start, BESPREKING.end], [1514, 1745]);
  assert.ok(BESPREKING.titel && BESPREKING.samenvatting.length >= 3);
  assert.equal([...s2.kijk, ...s2.doe].filter((b) => b.type === 'still').length, 0);
  assert.deepEqual(s2.mijnProject.map((o) => o.veld), ['eenheid', 'vastlegging']);
  const vast = s2.mijnProject[1];
  assert.match(vast.voorbeeld, /live/i);
  assert.ok(vast.checklist.some((p) => /privacyregels/.test(p)));
});

test('station 2 explains counting per event versus per interval before asking the student to choose', () => {
  const tekst = s2.kijk.filter((b) => b.type === 'tekst').map((b) => b.html).join(' ');
  assert.match(tekst, /per gebeurtenis/i);
  assert.match(tekst, /per tijdvak/i);
});

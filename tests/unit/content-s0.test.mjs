import { test } from 'node:test';
import assert from 'node:assert/strict';
import s0 from '../../site/js/content/s0.js';
import { assertStationShape } from './helpers/content.mjs';

const keuze = s0.doe.find((b) => b.type === 'keuze');

test('station 0 has the station shape', () => assertStationShape(s0));

test('three situations, one for each method', () => {
  assert.equal(keuze.items.length, 3);
  for (const it of keuze.items) {
    assert.deepEqual(it.opties, ['Observatie', 'Interview', 'Enquête']);
    assert.ok(it.tekst && it.uitleg);
  }
  assert.deepEqual(keuze.items.map((i) => i.juist).sort(), [0, 1, 2]);
});

test('station 0 uses the planned video, still, nulmeting and project field', () => {
  const video = s0.kijk.find((b) => b.type === 'video');
  assert.deepEqual([video.start, video.end], [579, 749]);
  assert.deepEqual(s0.kijk.filter((b) => b.type === 'still').map((b) => b.bestand.slice(0, 2)), ['02']);
  assert.ok(s0.kijk.some((b) => b.type === 'tekst' && /Deze tutorial/.test(b.html)), 'tabel met de vier vormen');
  const nulmeting = s0.doe.findIndex((b) => b.type === 'open' && b.veld === 'nulmeting');
  assert.ok(nulmeting >= 0 && nulmeting < s0.doe.indexOf(keuze), 'nulmeting voor de situaties');
  assert.match(s0.doe[nulmeting].vraag, /klantgericht/);
  assert.deepEqual(s0.mijnProject.map((o) => o.veld), ['begrip']);
});

test('the summary reports an association, not a cause', () => {
  const tekst = s0.kijk.filter((b) => b.type === 'video').flatMap((b) => b.samenvatting).join(' ');
  assert.ok(!/bijdr(oeg|aagt|oegen)/.test(tekst), 'geen oorzaak-taal: Chen vond een samenhang');
  assert.match(tekst, /samenhing/);
});

test('the summary does not rank the two associated domains (still 02 shows two stars on the other one)', () => {
  const tekst = s0.kijk.filter((b) => b.type === 'video').flatMap((b) => b.samenvatting).join(' ');
  assert.ok(!/sterkst|het meest/.test(tekst));
  assert.match(tekst, /een van de twee onderdelen/);
});

test('the study scored teaching on a rating scale; the summary does not say it counted', () => {
  const tekst = s0.kijk.filter((b) => b.type === 'tekst').map((b) => b.html).join(' ');
  assert.ok(!/keken en telden/.test(tekst));
  assert.match(tekst, /keken en scoorden/);
});

test('the nulmeting message depends on whether a nulmeting was written', () => {
  const keuze = s0.doe.find((b) => b.type === 'keuze');
  const store = (answers, persistent = true) => ({ persistent, get: (p) => (p === 'answers.nulmeting' ? answers : undefined) });
  assert.match(keuze.slot(store('Ik vraag het ze.')), /bewaard/);
  assert.match(keuze.slot(store('   ')), /nog niet geschreven/);
  assert.match(keuze.slot(store(undefined)), /nog niet geschreven/);
  assert.ok(!/bewaard/.test(keuze.slot(store('Ik vraag het ze.', false))));
});

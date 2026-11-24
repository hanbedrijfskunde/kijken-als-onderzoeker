import { test } from 'node:test';
import assert from 'node:assert/strict';
import s3, { CODES, GESPREK, VERKOPER_SLEUTEL, VOORBEELD_CODES } from '../../site/js/content/s3.js';
import { confusionMatrix, cohensKappa } from '../../site/js/kappa.js';
import { assertStationShape } from './helpers/content.mjs';

const ids = CODES.map((c) => c.id);

test('station 3 has the station shape', () => assertStationShape(s3));

test('five codes with every field filled', () => {
  assert.deepEqual(ids, ['open-vraag', 'doorvragen', 'samenvatten', 'advies', 'overig']);
  for (const c of CODES) for (const k of ['naam', 'definitie', 'wel', 'niet', 'voorbeeld']) assert.ok(c[k], `${c.id}.${k}`);
});

test('fifteen salesperson turns, each with a key and an explanation', () => {
  const v = GESPREK.filter((b) => b.spreker === 'verkoper');
  assert.equal(v.length, 15);
  for (const b of v) assert.ok(ids.includes(b.sleutel) && b.uitleg, `beurt ${b.nr}`);
  assert.deepEqual(VERKOPER_SLEUTEL, v.map((b) => b.sleutel));
  for (const id of ids) assert.ok(VERKOPER_SLEUTEL.includes(id), `code ${id} komt voor in de sleutel`);
});

test('the example student is usable but clearly off the key', () => {
  assert.equal(VOORBEELD_CODES.length, 15);
  for (const c of VOORBEELD_CODES) assert.ok(ids.includes(c));
  const { kappa } = cohensKappa(confusionMatrix(VOORBEELD_CODES, VERKOPER_SLEUTEL, ids));
  assert.ok(kappa >= 0.5 && kappa <= 0.75, `kappa ${kappa}`);
});

test('station 3 uses the planned video, stills and exercise', () => {
  const video = s3.kijk.find((b) => b.type === 'video');
  assert.deepEqual([video.start, video.end], [2603, 2870]);
  const stills = s3.kijk.filter((b) => b.type === 'still').map((b) => b.bestand.slice(0, 2));
  assert.deepEqual(stills, ['14', '15', '16']);
  assert.ok(s3.doe.some((b) => b.type === 'codeer'));
  assert.deepEqual(s3.mijnProject.map((o) => o.veld), ['codeerschema']);
});

test('the instructions have the student read the codebook before coding', () => {
  const tekst = s3.doe.filter((b) => b.type === 'tekst').map((b) => b.html).join(' ').replace(/<[^>]+>/g, '');
  const codeboek = tekst.search(/eerst[^.]*codeboek/i);
  const gesprek = tekst.search(/Lees (dan|daarna) het gesprek/i);
  assert.ok(codeboek >= 0, 'de instructie zegt dat je eerst het codeboek doorneemt');
  assert.ok(gesprek > codeboek, 'het gesprek komt pas na het codeboek');
  assert.match(tekst, /beslisregel/i, 'de instructie noemt de beslisregel');
});

test('the instructions say the codes are fixed after Controleer', () => {
  const tekst = s3.doe.filter((b) => b.type === 'tekst').map((b) => b.html).join(' ').replace(/<[^>]+>/g, '');
  assert.match(tekst, /Na Controleer staan je codes vast/);
});

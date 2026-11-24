import { test } from 'node:test';
import assert from 'node:assert/strict';
import s5, { FILIALEN, BESLISSINGEN } from '../../site/js/content/s5.js';
import { CODES } from '../../site/js/content/s3.js';
import { perUur } from '../../site/js/tally.js';
import { assertStationShape } from './helpers/content.mjs';

test('station 5 has the station shape', () => assertStationShape(s5));

test('four branches counted on the five codes of station 3', () => {
  assert.deepEqual(FILIALEN.map((f) => f.naam), ['Filiaal A', 'Filiaal B', 'Filiaal C', 'Filiaal D']);
  for (const f of FILIALEN) {
    assert.ok(f.uren > 0);
    assert.deepEqual(Object.keys(f.tellingen), CODES.map((c) => c.id));
  }
});

test('branch C asks follow-up questions least often per hour, by a wide margin', () => {
  const door = FILIALEN.map((f) => perUur(f.tellingen, f.uren).doorvragen);
  const c = door[2];
  assert.ok(door.every((d, i) => i === 2 || d >= c * 2), `doorvragen per uur: ${door}`);
});

test('branch B is the trap: second-lowest raw count, highest per hour', () => {
  const ruw = FILIALEN.map((f) => f.tellingen.doorvragen);
  const per = FILIALEN.map((f) => perUur(f.tellingen, f.uren).doorvragen);
  assert.equal([...ruw].sort((a, b) => a - b)[1], ruw[1]);
  assert.equal(Math.max(...per), per[1]);
});

test('six decisions: at least two supported, at least three not, with the planned traps', () => {
  assert.equal(BESLISSINGEN.length, 6);
  assert.ok(BESLISSINGEN.filter((b) => b.onderbouwd).length >= 2);
  assert.ok(BESLISSINGEN.filter((b) => !b.onderbouwd).length >= 3);
  for (const b of BESLISSINGEN) assert.ok(b.tekst && b.uitleg);
  const tekst = (re) => BESLISSINGEN.find((b) => re.test(b.tekst));
  assert.equal(tekst(/train.*filiaal C.*doorvragen/i)?.onderbouwd, true);
  assert.equal(tekst(/verkoper.*functioneert/i)?.onderbouwd, false);
  assert.equal(tekst(/omzet/i)?.onderbouwd, false);
  assert.equal(tekst(/hele jaar/i)?.onderbouwd, false);
});

test('station 5 uses the planned videos, still and project field', () => {
  const videos = s5.kijk.filter((b) => b.type === 'video').map((b) => [b.start, b.end]);
  assert.deepEqual(videos, [[2870, 2928], [3086, 3315]]);
  assert.deepEqual(s5.kijk.filter((b) => b.type === 'still').map((b) => b.bestand.slice(0, 2)), ['17']);
  assert.ok(s5.doe.some((b) => b.type === 'besluit'));
  assert.deepEqual(s5.mijnProject.map((o) => o.veld), ['beslissing']);
});

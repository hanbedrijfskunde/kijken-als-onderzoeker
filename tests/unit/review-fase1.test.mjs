import { test } from 'node:test';
import assert from 'node:assert/strict';
import s3, { CODES, GESPREK } from '../../site/js/content/s3.js';
import s4 from '../../site/js/content/s4.js';
import { landisKoch, studentVerdict } from '../../site/js/kappa.js';
import { cleanCodes } from '../../site/js/codes.js';

const ids = CODES.map((c) => c.id);
const verkoper = GESPREK.filter((b) => b.spreker === 'verkoper');

test('turn 2 opens a new topic: the customer has not said what the bike is for', () => {
  const voorTurn2 = GESPREK.slice(0, GESPREK.indexOf(verkoper[1])).filter((b) => b.spreker === 'klant');
  for (const b of voorTurn2) assert.ok(!/werk/.test(b.tekst), b.tekst);
});

test('Overig carves out proposals, and turn 14 explains the ja/nee rule', () => {
  assert.match(CODES.find((c) => c.id === 'overig').definitie, /voorstel/);
  assert.match(verkoper[13].uitleg, /ja of nee/);
});

test('Ken je dit al does not ask what comes first', () => {
  assert.ok(!/eerst/.test(s3.kenJeDitAl[1].vraag));
});

test('station 4 summary says ten more, not ten times as often', () => {
  const tekst = JSON.stringify(s4.kijk);
  assert.ok(!/tien keer vaker/.test(tekst));
  assert.match(tekst, /tien keer meer/);
});

test('station 4 shows the Landis & Koch bands in Dutch', () => {
  const html = s4.kijk.filter((b) => b.type === 'tekst').map((b) => b.html).join(' ');
  for (const label of ['gering', 'redelijk', 'matig', 'aanzienlijk', 'bijna perfect']) assert.match(html, new RegExp(label));
});

test('band and verdict follow the kappa as shown, rounded to two decimals', () => {
  assert.equal(studentVerdict(0.5968), 'bruikbaar');
  assert.equal(landisKoch(0.2012), 'gering');
  assert.equal(landisKoch(0.4034), 'redelijk');
});

test('cleanCodes keeps 15 slots and drops unknown codes', () => {
  const raw = [...Array(14).fill('overig'), 'weg', 'advies'];
  const c = cleanCodes(raw, ids, 15);
  assert.equal(c.length, 15);
  assert.equal(c[14], null);
  assert.equal(c[0], 'overig');
  assert.deepEqual(cleanCodes('kapot', ids, 3), [null, null, null]);
});

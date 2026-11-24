// Controleert de vorm van een stationsmodule (ontwerp §7.2, plan "Shared interfaces").
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { ANTWOORDVELDEN } from '../../../site/js/content/stations.js';

const STILLS = fileURLToPath(new URL('../../../site/assets/stills/', import.meta.url));
const TOEGESTAAN = ['02', '04', '05', '06', '10', '11', '12', '13', '14', '15', '16', '17'];

function walk(blocks, visit) {
  for (const b of blocks) {
    visit(b);
    if (b.blokken) walk(b.blokken, visit);
  }
}

export function assertStationShape(c) {
  for (const k of ['id', 'kenJeDitAl', 'waarom', 'kijk', 'doe', 'jeKuntNu', 'mijnProject']) {
    assert.ok(k in c, `veld ontbreekt: ${k}`);
  }
  assert.ok(c.kenJeDitAl.length >= 2 && c.kenJeDitAl.length <= 3, 'Ken je dit al: twee of drie vragen');
  for (const v of c.kenJeDitAl) {
    assert.ok(v.vraag && v.uitleg, 'vraag en uitleg');
    assert.ok(v.opties.length >= 3, 'minstens drie opties');
    assert.ok(Number.isInteger(v.juist) && v.juist >= 0 && v.juist < v.opties.length, 'geldig juist-antwoord');
  }
  assert.ok(c.waarom.length >= 1 && c.jeKuntNu.startsWith('Je kunt nu'));
  // "Wat heb je nodig?" is geschrapt: een veld dat nergens getoond wordt, hoort er niet te staan.
  assert.ok(!('nodig' in c), 'veld nodig is geschrapt');
  walk([...c.kijk, ...c.doe], (b) => {
    if (b.type === 'video') {
      assert.ok(b.start >= 0 && b.start < b.end && b.end <= 3616, `videotijden ${b.start}-${b.end}`);
      assert.ok(b.titel && b.samenvatting.length >= 1, 'video met titel en samenvatting');
    }
    if (b.type === 'still') {
      assert.ok(existsSync(STILLS + b.bestand), `still bestaat: ${b.bestand}`);
      assert.ok(TOEGESTAAN.includes(b.bestand.slice(0, 2)), `still toegestaan: ${b.bestand}`);
      assert.ok(b.alt && b.sec > 0, 'still met alt en tijd');
    }
  });
  assert.ok(c.mijnProject.length >= 1);
  for (const o of c.mijnProject) {
    assert.equal(o.type, 'open');
    assert.ok(ANTWOORDVELDEN.includes(o.veld), `bekend antwoordveld: ${o.veld}`);
    assert.ok(o.vraag && o.voorbeeld, 'vraag en voorbeeld');
    assert.ok(o.checklist.length >= 3 && o.checklist.length <= 5, 'checklist van 3 tot 5 punten');
  }
}

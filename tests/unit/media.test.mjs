import { test } from 'node:test';
import assert from 'node:assert/strict';
import { embedUrl, watchUrl, mmss, creditLine } from '../../site/js/ui/media.js';

test('embedUrl uses youtube-nocookie with start, end and captions', () => {
  assert.equal(embedUrl(2603, 2870),
    'https://www.youtube-nocookie.com/embed/cVtblRCvtRI?start=2603&end=2870&cc_load_policy=1&cc_lang_pref=en&rel=0');
});
test('watchUrl links to the moment', () => {
  assert.equal(watchUrl(2598), 'https://www.youtube.com/watch?v=cVtblRCvtRI&t=2598s');
});
test('mmss formats minutes and seconds', () => {
  assert.equal(mmss(2598), '43:18');
  assert.equal(mmss(59), '0:59');
  assert.equal(mmss(3616), '60:16');
});
test('creditLine names speaker, title, channel and year', () => {
  assert.equal(creditLine(2598),
    'Still op 43:18 uit Shiyi Chen, “Behind the Research: Making Thinking Visible Through Quantitative Observational Coding” (Class Lab 2.0, 2026).');
});

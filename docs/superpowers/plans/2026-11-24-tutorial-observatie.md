# Tutorial *Kijken als onderzoeker* Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A self-study web page in HAN house style that teaches HBO Bedrijfskunde students structured observation (operationalising, coding, inter-rater reliability, data to decision) with fragments of Shiyi Chen's webinar, and ends with a one-page observation plan for the student's own project.

**Architecture:** One static page (`site/index.html`) with hash routing between a station map, six stations and the plan view. Plain ES modules: pure logic (`store`, `kappa`, `tally`, `status`, `plan`, `router`) is unit-tested with `node --test`; content lives in one data module per station; one renderer per exercise type. Browser behaviour is tested with Python Playwright against a local `http.server`.

**Tech Stack:** HTML, CSS, JavaScript ES modules (no framework, no build step); Node 25 `node:test`; Python 3 + pytest 8 + Playwright (Chromium in `~/.cache/ms-playwright`); `cwebp`; GitHub Pages via Actions.

**Spec:** `docs/2026-11-24-basisontwerp-tutorial-observatie.md` (v0.3, approved 24-11-2026). Read it before every task; section numbers below refer to it.

## Global Constraints

- No data leaves the browser: no analytics, no form submission, no external requests besides the YouTube embed.
- Storage: `localStorage` key `kijken-als-onderzoeker/v1`. If storage is unavailable, everything works in memory and one notice shows: *Je antwoorden worden niet bewaard als je deze pagina sluit.*
- Video id `cVtblRCvtRI`. Embed: `https://www.youtube-nocookie.com/embed/cVtblRCvtRI?start=<s>&end=<s>&cc_load_policy=1&cc_lang_pref=en&rel=0`, `loading="lazy"`. Moment link: `https://www.youtube.com/watch?v=cVtblRCvtRI&t=<s>s`.
- Stills: webp, `cwebp -q 82 -resize 1280 0`, from `raw/images/behind-the-research-quantitative-observational-coding/`. Allowed: 02, 04, 05, 06, 10, 11, 12, 13, 14, 15, 16, 17. Never 01, 03, 07, 08, 09.
- Credit line under each still: `Still op M:SS uit Shiyi Chen, “Behind the Research: Making Thinking Visible Through Quantitative Observational Coding” (Class Lab 2.0, 2026).` linking to the moment.
- House style (§5): `--magenta: #e50056`, `--magenta-dark: #b70045` (links, small text), `--tint: #f7b2cc`, logo red `#d91e57`; grey, green and amber tokens copied from `~/Projects/rl-bedrijfskunde/assets/docs.css`; body `"Avenir Next", Avenir, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`; headings `"Avenir Next Condensed", "Avenir Next", …`.
- Logo `site/assets/han-logo.svg` (copy of `~/Projects/rl-bedrijfskunde/assets/han-logo.svg`) in header, footer and as favicon; alt `HAN University of Applied Sciences`.
- `<html lang="nl">`, `<meta name="robots" content="noindex">`, no sitemap.
- Dutch, je-form, short sentences. Numbers shown with a decimal comma (`0,49`). Inputs accept comma and point.
- Kappa thresholds: `< 0,60` onvoldoende, `≥ 0,60` bruikbaar, `≥ 0,80` goed. Landis & Koch bands: `< 0` minder dan toeval, `≤ 0,20` gering, `≤ 0,40` redelijk, `≤ 0,60` matig, `≤ 0,80` aanzienlijk, `> 0,80` bijna perfect.
- Fictional content (bike shop, four branches) uses no real company or person names.
- No design language visible to students (no `§`, no internal ids, no notes to the builder).
- Works from 360 px wide, keyboard operable, visible focus (`outline: 3px solid var(--magenta)`).
- `raw/` is gitignored. The repo holds `site/`, `tests/`, `scripts/`, `docs/`; Pages deploys `site/` only.

## Review Focus

1. **Decimal comma** in the hand-kappa inputs (`0,49`, `,49`, ` 0,49 `) must count as correct, like `0.49`. → Task 8 test `test_kappa_hand_accepts_comma_and_point`.
2. **Storage blocked** (LMS iframe, private mode): page and exercises work, notice shows once. → Task 2 unit tests + Task 11 `test_storage_blocked_notice_once`.
3. **Station 4 without a finished station 3** (none, or 10 of 15 coded): the calculator uses the example student's codes and says why. → Task 9 tests `test_calc_uses_example_when_s3_empty`, `test_calc_partial_s3_notice`.
4. **Kappa undefined** (both coders used one and the same code for every unit): a sentence, never `NaN`. → Task 3 `kappa is null when pe is 1` + Task 9 `test_calc_kappa_undefined_message`.
5. **Coming back later**: answers, codes and tally survive a reload; *Opnieuw beginnen* wipes all of it. → Tasks 4, 7, 10, 14 reload tests.

## File Structure

```
.gitignore                  raw/, node_modules/, .DS_Store, __pycache__/
package.json                {"type":"module"}, scripts test:unit / test:e2e
README.md                   what it is, how to test, source credit (Task 18)
scripts/make-stills.sh      PNG → webp for the 12 allowed stills
site/index.html             shell: header (logo), <main id="app">, footer (source, help line)
site/assets/han-logo.svg
site/assets/css/huisstijl.css   tokens + base typography (from rl-bedrijfskunde)
site/assets/css/tutorial.css    map, station blocks, exercises, print
site/assets/stills/*.webp
site/js/main.js             boot: store, router, render view
site/js/store.js            persistence with memory fallback
site/js/router.js           hash → view
site/js/status.js           station status transitions
site/js/kappa.js            matrix, kappa, bands, number formatting
site/js/tally.js            tally comparison, rates per hour
site/js/plan.js             plan sections + plain-text export
site/js/content/stations.js station list
site/js/content/s0.js … s5.js   one data module per station
site/js/ui/kaart.js         station map
site/js/ui/station.js       station frame (header + five blocks)
site/js/ui/media.js         video and still blocks
site/js/ui/open.js          open answer + model answer + checklist
site/js/ui/kenjedital.js    "Ken je dit al?" check
site/js/ui/keuze.js         multiple choice per item (s0)
site/js/ui/sorteer.js       observable / not observable (s1)
site/js/ui/turf.js          click counter (s2)
site/js/ui/codeer.js        code a conversation turn by turn (s3)
site/js/ui/kappa-hand.js    kappa by hand (s4)
site/js/ui/kappa-calc.js    kappa calculator + confusion matrix (s4)
site/js/ui/besluit.js       decisions on branch data (s5)
site/js/ui/plan.js          the plan view
tests/unit/*.test.mjs       node --test
tests/unit/helpers/content.mjs   assertStationShape()
tests/e2e/conftest.py       http.server + Playwright fixtures
tests/e2e/test_*.py
.github/workflows/pages.yml (Task 18)
```

## Shared interfaces (used by many tasks)

- **Store data shape:** `{ stations: {s0..s5: {status}}, answers: {[veld]: string}, checks: {[veld]: number[]}, codes: {s3: (string|null)[15], partner: (string|null)[15]}, tally: {s2: {counts: {[code]: number}, history: string[]}} }`.
- **Answer fields (`veld`):** `nulmeting`, `begrip` (s0); `indicatoren`, `codeboekregel` (s1); `eenheid`, `vastlegging` (s2); `codeerschema` (s3); `betrouwbaarheid` (s4); `beslissing` (s5); `nulmeting-nieuw` (plan).
- **Render context `ctx`:** `{ store, station, event(name: 'geopend'|'doe-af'|'overgeslagen'), checkEl: HTMLElement, go(hash: string) }`. Every exercise renderer is `renderX(block, ctx) -> HTMLElement` and writes its feedback into `ctx.checkEl`.
- **Station content module** (`site/js/content/sN.js`, default export): `{ id, nodig: string[], kenJeDitAl: Vraag[], waarom: string[], kijk: Block[], doe: Block[], jeKuntNu: string, mijnProject: OpenBlock[] }`. `Vraag = {vraag, opties: string[], juist: number, uitleg}`. `Block = {type: 'video'|'still'|'tekst'|'details'|<exercise>, …}`. `OpenBlock = {type:'open', veld, vraag, voorbeeld, checklist: string[]}`.

---

## Phase 1 — Proefstuk: map, storage, stations 3 and 4

### Task 1: Scaffold, house-style shell, test harness

**Files:**
- Create: `.gitignore`, `package.json`, `site/index.html`, `site/assets/han-logo.svg`, `site/assets/css/huisstijl.css`, `site/assets/css/tutorial.css`, `site/js/main.js`, `tests/e2e/conftest.py`, `tests/e2e/test_shell.py`

**Interfaces:**
- Produces: e2e fixtures `site_url` (session; base URL of `python3 -m http.server` on a free port, `cwd=site/`) and `page` (function scope; new browser context, so storage starts empty). `conftest.py` sets `PLAYWRIGHT_BROWSERS_PATH` to `~/.cache/ms-playwright` when unset.

- [ ] **Step 1:** `git init` in `~/Projects/observatie-tutorial`; write `.gitignore` and `package.json` (`"test:unit": "node --test tests/unit/"`, `"test:e2e": "python3 -m pytest tests/e2e -q"`).
- [ ] **Step 2: Write the failing test** `tests/e2e/test_shell.py::test_shell_house_style`: after `page.goto(site_url)`: header `img` has alt `HAN University of Applied Sciences` and is visible; `meta[name=robots]` content is `noindex`; `html[lang]` is `nl`; footer text contains `Behind the Research` and a link whose href contains `watch?v=cVtblRCvtRI`; `getComputedStyle(document.documentElement).getPropertyValue('--magenta').trim() == '#e50056'`; `link[rel=icon]` href ends with `han-logo.svg`.
- [ ] **Step 3:** Run `npm run test:e2e`. Expected: FAIL (no page).
- [ ] **Step 4:** Copy the logo; write `huisstijl.css` (tokens per Global Constraints, base typography, link and focus styles) and `index.html` (header with logo and title *Kijken als onderzoeker*, `<main id="app">`, footer with the source credit and the help line *Kom je er niet uit? Bekijk het voorbeeld bij Mijn project, of neem je vraag mee naar je projectbegeleider.*); `main.js` renders nothing yet.
- [ ] **Step 5:** Run `npm run test:e2e`. Expected: PASS.
- [ ] **Step 6:** Commit `feat: shell in HAN house style with test harness`.

### Task 2: Store with memory fallback

**Files:** Create `site/js/store.js`, `tests/unit/store.test.mjs`

**Interfaces:**
- Produces: `createStore(storage: Storage|null, key = 'kijken-als-onderzoeker/v1') -> { persistent: boolean, get(path: string, fallback?: any): any, set(path: string, value: any): void, reset(): void, snapshot(): object }`; `path` is dot-separated (`'answers.begrip'`, `'stations.s3.status'`). `safeLocalStorage() -> Storage|null` returns `null` when accessing `localStorage` throws.

- [ ] **Step 1: Write the failing tests** (fake storage = object with `getItem/setItem/removeItem` over a `Map`):
  - `set then get, and a second store on the same storage reads it back` → `get('answers.begrip') === 'x'`.
  - `setItem that throws gives persistent false and still works in memory`.
  - `null storage gives persistent false`.
  - `corrupt JSON starts empty without throwing` → `snapshot()` deep-equals `{}`.
  - `reset clears memory and removes the key`.
- [ ] **Step 2:** `npm run test:unit` → FAIL (module missing).
- [ ] **Step 3:** Implement. `persistent` is decided by a probe write at creation.
- [ ] **Step 4:** `npm run test:unit` → PASS.
- [ ] **Step 5:** Commit `feat: store with memory fallback`.

### Task 3: Kappa maths

**Files:** Create `site/js/kappa.js`, `tests/unit/kappa.test.mjs`

**Interfaces:**
- Produces: `confusionMatrix(codesA: string[], codesB: string[], categories: string[]) -> number[][]` (rows A, columns B; throws on unequal length or unknown code); `cohensKappa(matrix) -> {n, po, pe, kappa: number|null}`; `landisKoch(kappa: number) -> string`; `studentVerdict(kappa: number) -> 'onvoldoende'|'bruikbaar'|'goed'`; `mostConfused(matrix, categories) -> {a, b, count}|null` (largest `m[i][j] + m[j][i]`, i≠j); `formatNl(x: number, digits = 2) -> string`; `parseNl(s: string) -> number` (NaN when not a number).

- [ ] **Step 1: Write the failing tests** (`close(a, b)` = `Math.abs(a-b) < 1e-4`):
  - `[[9,3],[2,6]]` → po 0.75, pe 0.51, kappa 0.4898.
  - `[[3,2],[2,3]]` → po 0.6, pe 0.5, kappa 0.2.
  - `[[5,0],[0,5]]` → kappa 1.
  - `kappa is null when pe is 1`: `[[10,0],[0,0]]` → kappa `null`.
  - `confusionMatrix(['a','b','a'], ['a','a','a'], ['a','b'])` deep-equals `[[2,0],[1,0]]`; unequal length throws; code `'c'` throws.
  - `landisKoch`: −0.1 `minder dan toeval`, 0.15 and 0.20 `gering`, 0.21 `redelijk`, 0.49 `matig`, 0.7 `aanzienlijk`, 0.9 `bijna perfect`.
  - `studentVerdict`: 0.59 `onvoldoende`, 0.60 and 0.79 `bruikbaar`, 0.80 `goed`.
  - `mostConfused([[4,2,0],[3,5,1],[0,0,6]], ['x','y','z'])` → `{a:'x', b:'y', count:5}`; diagonal matrix → `null`.
  - `formatNl(0.4898) === '0,49'`, `formatNl(1) === '1,00'`; `parseNl` gives 0.49 for `'0,49'`, `'0.49'`, `',49'`, `' 0,49 '`; NaN for `'abc'` and `''`.
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement.
- [ ] **Step 4:** Run → PASS.
- [ ] **Step 5:** Commit `feat: kappa maths`.

### Task 4: Station list, router, status, station map

**Files:** Create `site/js/content/stations.js`, `site/js/router.js`, `site/js/status.js`, `site/js/ui/kaart.js`, `tests/unit/router.test.mjs`, `tests/unit/status.test.mjs`, `tests/e2e/test_kaart.py`; Modify `site/js/main.js`

**Interfaces:**
- Produces: `STATIONS = [{id:'s0', nr:0, titel:'Zeggen is geen doen', minuten:20}, {id:'s1', nr:1, titel:'Wat ga je zien?', minuten:25}, {id:'s2', nr:2, titel:'Zelf coderen', minuten:25}, {id:'s3', nr:3, titel:'Gesprekken als data', minuten:30}, {id:'s4', nr:4, titel:'Klopt het?', minuten:30}, {id:'s5', nr:5, titel:'Van turven naar besluit', minuten:25}]`.
- Produces: `parseHash(hash: string) -> {view:'kaart'} | {view:'station', id:string} | {view:'plan'}` (`'#/station/3'` → `{view:'station', id:'s3'}`, `'#/plan'` → plan, anything else → kaart).
- Produces: `nextStatus(current, event) -> status`. Statuses `nog-niet|bezig|klaar|overgeslagen`; `geopend`: `nog-niet`→`bezig`, others unchanged; `doe-af`: → `klaar`; `overgeslagen`: `nog-niet|bezig` → `overgeslagen`, `klaar` stays.
- Produces: `renderKaart(store, go) -> HTMLElement`. Labels: Nog niet / Bezig / Klaar / Overgeslagen. Note on the map: *Aanbevolen: volg de stations op volgorde. Elk station werkt ook los.*

- [ ] **Step 1: Write the failing unit tests** for `parseHash` (the three cases plus `''` and `'#/station/9'` → kaart) and `nextStatus` (every rule above).
- [ ] **Step 2: Write the failing e2e tests:**
  - `test_map_lists_stations`: six cards with titles from `STATIONS` and `20 min`/`25 min`/`30 min`, plus a link *Mijn observatieplan*.
  - `test_open_station_and_back`: click card 3 → URL ends `#/station/3`, `h1` is *Gesprekken als data*; one click on *Naar de kaart* returns; card 3 shows *Bezig*.
  - `test_status_survives_reload`: after the above, `page.reload()` → card 3 still *Bezig*.
  - `test_reset_wipes_all`: *Opnieuw beginnen* opens a `<dialog>`; confirm → card 3 shows *Nog niet*.
- [ ] **Step 3:** Run both suites → FAIL.
- [ ] **Step 4:** Implement. Stations not built yet render *Dit station volgt nog.* (removed in Task 16).
- [ ] **Step 5:** Run both suites → PASS.
- [ ] **Step 6:** Commit `feat: station map, routing and status`.

### Task 5: Station frame, video and stills

**Files:** Create `site/js/ui/station.js`, `site/js/ui/media.js`, `scripts/make-stills.sh`, `site/assets/stills/` (12 webp), `tests/unit/media.test.mjs`, `tests/unit/helpers/content.mjs`, `tests/e2e/test_station_frame.py`

**Interfaces:**
- Consumes: `STATIONS`, `store`, `nextStatus`.
- Produces: `embedUrl(start: number, end: number) -> string`; `watchUrl(sec: number) -> string`; `mmss(sec: number) -> string` (`2598` → `'43:18'`); `creditLine(sec: number) -> string`; `renderVideo(block: {type:'video', start, end, titel, samenvatting: string[]})`; `renderStill(block: {type:'still', bestand, sec, alt})`; `renderStation(content, ctx) -> HTMLElement` (header: duration, *Wat heb je nodig*, *Ken je dit al?* slot; then `h2`s *Waarom*, *Kijk*, *Doe*, *Check*, *Mijn project*; *Check* holds `ctx.checkEl` and ends with `Je kunt nu …`).
- Produces: `assertStationShape(content)` in `tests/unit/helpers/content.mjs`: every field of the station content module is present; each `Vraag` has 3+ options and a valid `juist`; each video has `0 ≤ start < end ≤ 3616`; each still `bestand` exists in `site/assets/stills/` and its number is in the allowed list; each `OpenBlock.veld` is a known answer field; `checklist` has 3–5 items.

- [ ] **Step 1:** Write `scripts/make-stills.sh` (the 12 allowed PNGs → `site/assets/stills/<same name>.webp`, settings per Global Constraints). Run it. Verify: `ls site/assets/stills/*.webp | wc -l` prints `12`, and `ls site/assets/stills | grep -E '^(01|03|07|08|09)-'` prints nothing.
- [ ] **Step 2: Write the failing unit tests:** `embedUrl(2603, 2870)` equals the Global Constraints URL with those values; `watchUrl(2598)` ends `&t=2598s`; `mmss(2598) === '43:18'`, `mmss(59) === '0:59'`; `creditLine(2598)` equals `Still op 43:18 uit Shiyi Chen, “Behind the Research: Making Thinking Visible Through Quantitative Observational Coding” (Class Lab 2.0, 2026).`
- [ ] **Step 3: Write the failing e2e test** `test_station_blocks_in_order` (on station 3 after Task 6 content exists; until then on a minimal stub content for s3): the `h2` texts in order are exactly `['Waarom', 'Kijk', 'Doe', 'Check', 'Mijn project']`; every iframe `src` starts with `https://www.youtube-nocookie.com/embed/cVtblRCvtRI?start=`; every still `img` has a non-empty alt and a sibling link whose href contains `watch?v=cVtblRCvtRI&t=`.
- [ ] **Step 4:** Run → FAIL. Implement. Opening a station fires `ctx.event('geopend')`.
- [ ] **Step 5:** Run → PASS. Commit `feat: station frame with video and stills`.

### Task 6: Station 3 content

**Files:** Create `site/js/content/s3.js`, `tests/unit/content-s3.test.mjs`

**Interfaces:**
- Produces (named exports): `CODES` = 5 objects `{id, naam, definitie, wel, niet, voorbeeld}` with ids `open-vraag`, `doorvragen`, `samenvatten`, `advies`, `overig`; `GESPREK` = turns `{nr, spreker:'klant'|'verkoper', tekst, sleutel?, uitleg?}` set in a fictional bike shop, exactly 15 `verkoper` turns, each with `sleutel` and `uitleg`; `VERKOPER_SLEUTEL` = the 15 key codes in order; `VOORBEELD_CODES` = 15 codes of an example student.
- Content per spec §7.3 station 3. *Kijk*: video 2603–2870 (*Gesprekken vastleggen en coderen*), stills 14, 15, 16. *Doe*: `[{type:'codeer'}]`. *Mijn project*: `veld: 'codeerschema'`. Add a short line that most student projects code live, without recording (spec §7.3 station 2).

- [ ] **Step 1: Write the failing tests:** `assertStationShape(default)`; 5 codes with non-empty fields; 15 verkoper turns; every `sleutel` is a code id and every code occurs at least once in the key; `VOORBEELD_CODES` has 15 valid ids; `cohensKappa(confusionMatrix(VOORBEELD_CODES, VERKOPER_SLEUTEL, ids)).kappa` lies between 0.50 and 0.75 (instructive: usable but with clear disagreements).
- [ ] **Step 2:** Run → FAIL. Write the content (Dutch, je-form, no real names).
- [ ] **Step 3:** Run → PASS. Commit `content: station 3`.

### Task 7: Coding exercise (station 3)

**Files:** Create `site/js/ui/codeer.js`, `tests/e2e/test_codeer.py`

**Interfaces:**
- Consumes: `CODES`, `GESPREK`, `store` path `codes.s3`.
- Produces: `renderCodeer(block: {type:'codeer'}, ctx)`. One `fieldset` per verkoper turn (legend `Beurt N`, five radios with the code names); klant turns shown as context. Every change saves `codes.s3`. *Controleer* is disabled until 15 of 15 are coded; then per turn in `ctx.checkEl`: correct → `Goed: <naam>`; wrong → `Je codeerde <naam>; de sleutel zegt <naam>, omdat <uitleg>`; summary `Je codeerde N van de 15 beurten zoals de sleutel.`; fires `doe-af`.

- [ ] **Step 1: Write the failing e2e tests:** `test_codeer_all_correct` (pick the key for each turn → `15 van de 15`, map card 3 *Klaar*); `test_codeer_one_wrong_shows_reason` (one wrong → text contains `Je codeerde` and that turn's `uitleg`); `test_codeer_disabled_until_complete` (14 coded → button disabled); `test_codeer_survives_reload` (code 5 turns, reload, the 5 radios are still checked).
- [ ] **Step 2:** Run → FAIL. Implement.
- [ ] **Step 3:** Run → PASS. Commit `feat: coding exercise`.

### Task 8: Station 4 content and kappa by hand

**Files:** Create `site/js/content/s4.js`, `site/js/ui/kappa-hand.js`, `tests/unit/content-s4.test.mjs`, `tests/e2e/test_kappa_hand.py`

**Interfaces:**
- Produces: `OEFENTABEL = {vraag: 'Vraagt de verkoper door?', categorieen: ['ja','nee'], matrix: [[9,3],[2,6]]}`; `ZELFDE_TOTALEN = {categorieen: ['ja','nee'], matrix: [[3,2],[2,3]]}`.
- Content per spec §7.3 station 4. *Kijk* videos: 1749–1925 *Cohen's kappa*, 1927–2043 *De verwarringsmatrix*, 2044–2298 *Vijf stappen naar betrouwbaarheid*; inside `details` *Verdieping: andere maten*: 2298–2426 and still 13. Stills 10, 11, 12. Software as text: Observer XT (betaald, uit de video), BORIS (gratis), MAXQDA, ELAN, Datavyu, or a spreadsheet for live coding. Threshold text from the spec. *Doe*: `[{type:'kappa-hand'}, {type:'kappa-calc'}]`. *Mijn project*: `veld: 'betrouwbaarheid'`.
- Produces: `renderKappaHand(block: {type:'kappa-hand'}, ctx)`: the 2×2 table with totals, inputs pₒ, pₑ, κ, *Controleer*; each accepted within ±0.01 of the true value via `parseNl`; three `details` hints (pₒ, pₑ, κ) with the worked numbers; all three correct fires `doe-af`.

- [ ] **Step 1: Write the failing tests:** unit `assertStationShape`; `cohensKappa(OEFENTABEL.matrix)` gives 0.4898 and `ZELFDE_TOTALEN` gives 0.2 with equal row and column totals. e2e `test_kappa_hand_accepts_comma_and_point` (`0,75`/`0,51`/`0,49` all correct; same with `0.75`/`0.51`/`.49`); `test_kappa_hand_wrong_value` (`0,6` for pₒ → that field marked wrong, the others not judged correct, hint 1 named).
- [ ] **Step 2:** Run → FAIL. Implement.
- [ ] **Step 3:** Run → PASS. Commit `feat: station 4 content and kappa by hand`.

### Task 9: Kappa calculator and confusion matrix

**Files:** Create `site/js/ui/kappa-calc.js`, `tests/e2e/test_kappa_calc.py`

**Interfaces:**
- Consumes: `CODES`, `VERKOPER_SLEUTEL`, `VOORBEELD_CODES`, `ZELFDE_TOTALEN`, kappa functions, `store` paths `codes.s3`, `codes.partner`.
- Produces: `renderKappaCalc(block: {type:'kappa-calc'}, ctx)`:
  - Source: `codes.s3` when all 15 are filled; otherwise `VOORBEELD_CODES` with *Je hebt station 3 nog niet gecodeerd. Hieronder staan de codes van een voorbeeldstudent.* or, when partly filled, *Je codeerde N van de 15 beurten. Maak station 3 af, of kijk hieronder naar de codes van een voorbeeldstudent.*
  - Output: 5×5 matrix (rows *Jij*, columns *Sleutel*, code names), pₒ, pₑ, κ with `formatNl`, the `landisKoch` label, a verdict sentence per `studentVerdict`, and either *Jullie verschillen het vaakst tussen ‘A’ en ‘B’ (N keer). Maak die regels in je codeboek scherper.* or *Jullie zijn het overal over eens.*
  - Same-totals demo from `ZELFDE_TOTALEN`: the two coders' totals are equal and κ is `0,20`, with the lesson that totals say nothing about agreement.
  - `details` *Samen met een studiegenoot*: 15 selects saved to `codes.partner`; when complete, a second result compares the student's codes with the partner's. When κ is `null`: *Kappa is niet te berekenen: jullie gebruikten allebei steeds dezelfde code.*

- [ ] **Step 1: Write the failing e2e tests:** `test_calc_uses_example_when_s3_empty` (notice shown; κ text equals `formatNl` of the example kappa, computed in the test via the same numbers); `test_calc_partial_s3_notice` (10 turns coded → `Je codeerde 10 van de 15`); `test_calc_identical_to_key` (s3 coded as key → κ `1,00`, *bijna perfect*, *Jullie zijn het overal over eens.*); `test_calc_same_totals_demo` (shows `0,20`); `test_calc_kappa_undefined_message` (store preset: `codes.s3` and `codes.partner` all `overig` → the undefined sentence; page text contains no `NaN`).
- [ ] **Step 2:** Run → FAIL. Implement.
- [ ] **Step 3:** Run → PASS. Commit `feat: kappa calculator`.

### Task 10: Open answers, "Ken je dit al?", skipping

**Files:** Create `site/js/ui/open.js`, `site/js/ui/kenjedital.js`, `tests/e2e/test_open_kenjedital.py`; Modify `site/js/ui/station.js`

**Interfaces:**
- Produces: `renderOpen(block: OpenBlock, ctx)`: label = `vraag`, textarea bound to `answers.<veld>` (saved on input); *Vergelijk met het voorbeeld* reveals `voorbeeld` and the `checklist` as checkboxes saved in `checks.<veld>` (indices).
- Produces: `renderKenJeDitAl(vragen: Vraag[], ctx)`: inside `details` *Ken je dit al? Doe de check*; *Controleer* shows per question correct/wrong with `uitleg`. All correct → button *Sla dit station over* fires `overgeslagen` and moves focus to *Mijn project*. Otherwise: *Werk het station gewoon door.*

- [ ] **Step 1: Write the failing e2e tests** on station 3: `test_open_answer_survives_reload`; `test_compare_shows_checklist_and_saves_ticks` (tick 2, reload, 2 still ticked); `test_kenjedital_all_correct_skips` (map card 3 *Overgeslagen*); `test_kenjedital_wrong_keeps_status` (card stays *Bezig*); `test_reset_wipes_answers` (answer, codes and ticks present → *Opnieuw beginnen* → all gone after reload).
- [ ] **Step 2:** Run → FAIL. Implement; mount both in every station frame.
- [ ] **Step 3:** Run → PASS. Commit `feat: open answers and skip check`.

### Task 11: Robustness, small screens, keyboard — then the student test

**Files:** Create `tests/e2e/test_robust.py`; Modify `site/js/main.js`, `site/assets/css/tutorial.css`

- [ ] **Step 1: Write the failing e2e tests:**
  - `test_storage_blocked_notice_once`: `add_init_script` makes `Storage.prototype.setItem` throw; load, open station 3, back to the map: exactly one element with the storage notice text; coding still works.
  - `test_no_horizontal_scroll_at_360` for the map, s3 and s4 at viewport 360×740: `document.scrollingElement.scrollWidth <= 360`.
  - `test_controls_have_names`: every `button, input, select, textarea` has a label, `aria-label` or text.
  - `test_focus_visible`: press Tab until a station card has focus; its computed `outline-style` is not `none`.
- [ ] **Step 2:** Run → FAIL where needed. Fix (wide tables scroll inside their own wrapper).
- [ ] **Step 3:** Run `npm run test:unit && npm run test:e2e` → all PASS. Commit `fix: robustness, small screens, keyboard`.
- [ ] **Step 4: Checkpoint — stop here.** Serve locally (`python3 -m http.server -d site 8000`) and report to the user: what to try, and the request to let 2–3 students do stations 3 and 4. Record findings in the spec as §13 *Bevindingen proefstuk* before Phase 2.

## Phase 2 — The other stations and the plan

### Task 12: Station 0 and multiple-choice items

**Files:** Create `site/js/content/s0.js`, `site/js/ui/keuze.js`, `tests/unit/content-s0.test.mjs`, `tests/e2e/test_s0.py`

**Interfaces:**
- Produces: `renderKeuze(block: {type:'keuze', items: {tekst, opties: string[], juist: number, uitleg}[]}, ctx)`: per item immediate feedback with `uitleg`; all answered fires `doe-af`.
- Content per spec §7.3 station 0: video 579–749; still 02; a 2×2 table of observation forms (gestructureerd/open × deelnemend/niet-deelnemend) marking where this tutorial sits; open block `nulmeting` (*Hoe zou jij meten of de verkopers in een winkel klantgericht zijn? Schrijf drie zinnen.*) placed in *Doe* before the three situations (options *Observatie*, *Interview*, *Enquête*); *Mijn project*: `veld: 'begrip'`.

- [ ] **Step 1:** Failing tests: unit `assertStationShape`, exactly 3 situations; e2e `test_s0_situations_feedback` (each answer shows its `uitleg`; card *Klaar* after all three), `test_s0_nulmeting_saved`.
- [ ] **Step 2:** Run → FAIL. Implement and write content.
- [ ] **Step 3:** Run → PASS. Commit `feat: station 0`.

### Task 13: Station 1 and sorting

**Files:** Create `site/js/content/s1.js`, `site/js/ui/sorteer.js`, `tests/unit/content-s1.test.mjs`, `tests/e2e/test_s1.py`

**Interfaces:**
- Produces: `GEDRAG` = 10 `{tekst, waarneembaar: boolean, uitleg}` about salespeople in the fictional bike shop, at least 3 of each kind; `renderSorteer(block: {type:'sorteer'}, ctx)`: per item buttons *Waarneembaar* / *Niet waarneembaar*, immediate feedback; all 10 answered fires `doe-af`. Then two open blocks (rewrite two non-observable items, with model answers; fields are local to the exercise, not plan fields).
- Content per spec §7.3 station 1: video 891–1301; stills 04, 05, 06 (06 captioned with the 10/6/8/2 code counts from the slide); *Mijn project*: `indicatoren`, `codeboekregel` (with the five parts naam, definitie, wanneer wel, wanneer niet, voorbeeld).

- [ ] **Step 1:** Failing tests: unit (10 items, ≥3 each); e2e `test_s1_sort_feedback_and_done`.
- [ ] **Step 2:** Run → FAIL. Implement and write content.
- [ ] **Step 3:** Run → PASS. Commit `feat: station 1`.

### Task 14: Station 2 and the click counter

**Files:** Create `site/js/content/s2.js`, `site/js/tally.js`, `site/js/ui/turf.js`, `tests/unit/tally.test.mjs`, `tests/unit/content-s2.test.mjs`, `tests/e2e/test_s2.py`

**Interfaces:**
- Produces: `compareTally(counts: {[code]: number}, key: {[code]: number}) -> {code, mine, key, diff, richting: 'meer'|'minder'|'gelijk'}[]` (key order).
- Produces: `VIDEO_CODES` = 4 `{id, naam, definitie}` with ids `eigen-bouwwerk`, `strategie-wisselen`, `plan-bekijken`, `afgeleid` (definitions translated from still 06 and the transcript 22:07–22:47); `SLEUTEL = {'eigen-bouwwerk': 1, 'strategie-wisselen': 7, 'plan-bekijken': 2, 'afgeleid': 1}`; `FEEDBACK[code][richting]` strings.
- Produces: `renderTurf(block: {type:'turf'}, ctx)`: four large buttons with live counts, *Laatste klik ongedaan maken*, *Opnieuw turven*, *Vergelijk met de sleutel* (table mine/key + `FEEDBACK`), state in `tally.s2`; comparing fires `doe-af`.
- Content per spec §7.3 station 2: videos 1301–1408 (*De vier codes*), 1409–1510 (*Oefenclip*), 1514–1745 (*De bespreking*, shown with the check); **no stills** (child in view). *Mijn project*: `eenheid`, `vastlegging` (the two routes, live coding first; consent; pointer to the privacy rules of programme and client, no legal advice).

- [ ] **Step 1:** Failing tests: unit `compareTally({a:2,b:7}, {a:1,b:7})` → `a` `meer` diff 1, `b` `gelijk`; content shape and `SLEUTEL` values; e2e `test_turf_counts_and_undo` (3 clicks, undo → 2), `test_turf_survives_reload`, `test_turf_compare_exact_key` (counts equal to the key → four times *gelijk*).
- [ ] **Step 2:** Run → FAIL. Implement and write content.
- [ ] **Step 3:** Run → PASS. Commit `feat: station 2`.

### Task 15: Station 5 and decisions

**Files:** Create `site/js/content/s5.js`, `site/js/ui/besluit.js`, `tests/unit/content-s5.test.mjs`, `tests/e2e/test_s5.py`; Modify `site/js/tally.js`

**Interfaces:**
- Produces: `perUur(tellingen: {[code]: number}, uren: number) -> {[code]: number}` in `tally.js`.
- Produces: `FILIALEN` = 4 `{naam: 'Filiaal A'…'Filiaal D', uren, tellingen}` over the five codes of station 3; `BESLISSINGEN` = 6 `{tekst, onderbouwd: boolean, uitleg}`: at least 2 supported (including *train filiaal C op doorvragen*) and at least 3 not (one about an individual salesperson, one causal claim about turnover, one generalisation beyond the observed period).
- Produces: `renderBesluit(block: {type:'besluit'}, ctx)`: table of rates per hour (`formatNl`, 1 decimal), per decision *Onderbouwd* / *Niet onderbouwd* with feedback; all 6 answered fires `doe-af`.
- Content per spec §7.3 station 5: videos 2870–2928 (*De lessen*), 3086–3315 (*Kan AI het coderen overnemen?*), still 17; *Mijn project*: `beslissing`.

- [ ] **Step 1:** Failing tests: unit — Filiaal C has the lowest `doorvragen` per hour; decision counts as specified; e2e `test_s5_decisions_feedback`.
- [ ] **Step 2:** Run → FAIL. Implement and write content.
- [ ] **Step 3:** Run → PASS. Commit `feat: station 5`.

### Task 16: The observation plan

**Files:** Create `site/js/plan.js`, `site/js/ui/plan.js`, `tests/unit/plan.test.mjs`, `tests/e2e/test_plan.py`; Modify `site/assets/css/tutorial.css` (print), `site/js/ui/kaart.js` (drop the placeholder)

**Interfaces:**
- Produces: `PLAN_SECTIES = [{titel:'Begrip en waarom observatie', velden:['begrip']}, {titel:'Indicatoren en codeboekregel', velden:['indicatoren','codeboekregel']}, {titel:'Eenheid, plek, duur, vastlegging en toestemming', velden:['eenheid','vastlegging']}, {titel:'Codeerschema', velden:['codeerschema']}, {titel:'Betrouwbaarheid', velden:['betrouwbaarheid']}, {titel:'Beslissing en grenzen', velden:['beslissing']}]`; `buildPlanText(answers) -> string` (numbered headings in this order; empty field → `(nog niet ingevuld)`).
- Produces: `renderPlan(store, go)`: the six sections (empty ones link to their station), the nulmeting beside a textarea `nulmeting-nieuw` with the same question, a checklist of six features of a good plan (saved in `checks.plan`), *Kopieer als tekst* (`navigator.clipboard.writeText(buildPlanText(...))`; on failure a selected textarea and *Selecteer de tekst en kopieer hem*), *Print of bewaar als pdf* (`window.print()`); print CSS hides header, map links and buttons.

- [ ] **Step 1:** Failing tests: unit — order of headings; placeholder for a missing field. e2e (context with clipboard permissions) `test_plan_shows_answers_in_order`, `test_plan_copy_to_clipboard` (clipboard text starts with `1. Begrip en waarom observatie`), `test_plan_print_hides_buttons` (`page.emulate_media(media='print')` → buttons hidden), `test_no_placeholder_left` (no station shows *Dit station volgt nog*).
- [ ] **Step 2:** Run → FAIL. Implement.
- [ ] **Step 3:** Run all suites → PASS. Commit `feat: observation plan`.

### Task 17: Language edit

**Files:** Modify `site/js/content/*.js`, `site/index.html`, `site/js/ui/*.js` (visible strings only)

- [ ] **Step 1:** Run the skill `schrap-ai-taal`, then `redigeer-nederlandse-tekst`, over all student-visible text. Apply the edits in place.
- [ ] **Step 2:** Add e2e `test_no_design_language`: for the map, each station and the plan, the visible text contains no `§`, `TODO`, `TBD`, `NaN` or `undefined`.
- [ ] **Step 3:** Run `npm run test:unit && npm run test:e2e` → PASS (content tests guard the structure the edit must not break). Commit `content: language edit`.

## Phase 3 — Publication

### Task 18: GitHub Pages

**Files:** Create `.github/workflows/pages.yml`, `README.md`

- [ ] **Step 1: Checkpoint — ask the user** which account or organisation and which repository name (proposal: `witusj/kijken-als-onderzoeker`). Do not create anything before the answer.
- [ ] **Step 2:** Write `pages.yml` (on push to `main`: `actions/upload-pages-artifact` with `path: site`, then `actions/deploy-pages`) and `README.md` (purpose, `npm run test:unit`, `npm run test:e2e`, source credit, note that `raw/` stays local, and the tip for teachers: link to the page from the LMS so that it opens in a new tab, never in an embedded frame).
- [ ] **Step 3:** Verify nothing from `raw/` is tracked: `git ls-files | grep -c '^raw/'` prints `0`.
- [ ] **Step 4:** `gh repo create <owner>/<name> --public --source . --push`; enable Pages for workflow builds (`gh api -X POST repos/<owner>/<name>/pages -f build_type=workflow`); wait for the run (`gh run watch`).
- [ ] **Step 5:** Verify live: `curl -sI https://<owner>.github.io/<name>/` shows `200`; run `tests/e2e/test_shell.py` and `test_station_frame.py` with `site_url` pointing at the live URL (env `SITE_URL`); open station 2 in a real browser and play the clip.
- [ ] **Step 6:** Report the URL to the user.

## Phase 4 — Afronding vóór de eerste uitvoering

The plan's phases 1–3 are built and live. The student trial happens during the first real run (decision of the client, 2026-11-24), so this phase closes the deferred review findings that a student in that run would notice, weighted by effect. No new content, no new stations.

**Review Focus (phase 4):**
1. **Two tabs** on different views (plan in one, a station in the other): work done in one tab survives a write from the other, and each tab shows the other's work after it changes. → Task 19.
2. **Malformed saved state** (a hand-edited or older `localStorage`: numbers, objects or strings where lists are expected): every view renders, no *Er ging iets mis*, no page error. → Task 20.
3. **Saved multiple-choice answers from the phase-2 site** (arrays by position) still show after this change, and a later reorder of items cannot attach a choice to the wrong item. → Task 21.
4. **Memory-only mode** (storage blocked): the cross-tab code and the code-book dialog do not break anything. → Tasks 19, 22 run their tests once with storage blocked.
5. **Phone, 360 × 740:** the code book is one tap away from every turn in station 3. → Task 22.

### Task 19: Work from another tab is never overwritten

**Files:** Modify `site/js/store.js`, `site/js/main.js`; Test `tests/unit/store.test.mjs`, `tests/e2e/test_tabs.py`

**Interfaces:**
- Produces: `store.set(path, value)` reads the stored state before it writes, so a write changes only `path`. `store.reload()` re-reads the stored state into memory. `main.js` listens for the `storage` event on `STORE_KEY`, calls `store.reload()` and re-renders the current view, keeping the scroll position and focus untouched.

- [ ] **Step 1:** Failing tests: unit `a stale store does not overwrite another store's path` (two stores on one fake storage; A sets `answers.a`, B sets `answers.b`; the storage holds both), `reload picks up another store's write`, `reset in one store is not undone by a stale store` (A resets, B sets `answers.b`: storage holds only `answers.b`). E2e `test_answer_survives_other_tab` (page 1 types an answer in station 0; page 2, opened before, ticks a plan checkbox; reload page 1: the answer is still there) and `test_other_tab_shows_new_answer` (page 2 on the plan shows the answer typed in page 1 without a reload).
- [ ] **Step 2:** Run → FAIL. Implement.
- [ ] **Step 3:** Run → PASS, whole suite. Commit `fix: keep work from other tabs`.

### Task 20: Malformed saved state never breaks a view

**Files:** Create `site/js/lijst.js`; Modify `site/js/ui/open.js`, `site/js/ui/plan.js`, any other reader the test exposes; Test `tests/unit/lijst.test.mjs`, `tests/e2e/test_robust.py`

**Interfaces:**
- Produces: `indexLijst(raw: unknown) -> number[]` = the non-negative integers in `raw` if it is an array, else `[]`. Every read of `checks.*` goes through it.

- [ ] **Step 1:** Failing tests: unit `indexLijst(5)`, `indexLijst({})`, `indexLijst('12')` → `[]`; `indexLijst([2, 'x', -1, 1.5, 0])` → `[2, 0]`. E2e `test_malformed_state_renders_every_view`: preset `{checks: {plan: 5, begrip: {}, nulmeting-nieuw: 'x'}, keuze: {s0: 'x', s1: {}, s5: 7}, tally: {s2: 5}, answers: {begrip: 5}, codes: {s3: 'x', partner: 3}, stations: {s0: 7}}`; open the map, every station and the plan; none shows *Er ging iets mis* and no `pageerror` fires.
- [ ] **Step 2:** Run → FAIL. Implement.
- [ ] **Step 3:** Run → PASS, whole suite. Commit `fix: survive malformed saved state`.

### Task 21: Multiple choice with buttons, stored per item

**Files:** Modify `site/js/ui/keuze.js`, `site/assets/css/tutorial.css`; Test `tests/e2e/test_keuze.py`, and the existing s0/s1/s5/kaart tests that pick an option

**Interfaces:**
- Produces: each item is a `fieldset` (legend = item text) with one `button[aria-pressed]` per option; pressing one chooses it and shows feedback. Arrow keys do nothing, so moving through the options never chooses one. Choices are stored as `keuze.<station> = {[itemTekst]: optieTekst}`; an array (phase-2 format) is read by position once and written back as an object. The feedback element is always rendered (never `display: none`), so a screen reader announces the first feedback too.
- Consumes: the `zinnen` and `slot` options of `renderKeuze` unchanged.

- [ ] **Step 1:** Failing tests: e2e `test_keuze_buttons_pressed_state` (pressing *Interview* sets `aria-pressed="true"` on it and `false` on the others), `test_keuze_arrow_keys_choose_nothing` (focus the first option, press ArrowRight twice: no feedback, nothing stored), `test_keuze_stored_by_item_text` (after a choice, `keuze.s0` is an object keyed by the item text), `test_keuze_reads_old_array` (preset `keuze.s1 = [0, 1, …]`: the choices show), `test_keuze_feedback_region_rendered` (before any choice the feedback element has a computed `display` other than `none`). Update the existing tests to press buttons.
- [ ] **Step 2:** Run → FAIL. Implement.
- [ ] **Step 3:** Run → PASS, whole suite. Commit `fix: multiple choice with buttons, stored per item`.

### Task 22: The code book within reach on small screens

**Files:** Modify `site/js/ui/codeer.js`, `site/assets/css/tutorial.css`; Test `tests/e2e/test_codeboek.py`

**Interfaces:**
- Produces: below the wide layout (`< 72rem`, where the code book is not beside the turns), a button *Codeboek* stays in view at the bottom of the conversation while the student codes. It opens a modal `<dialog>` with the full code book and the decision rule, and a *Sluiten* button. Escape closes it; focus returns to the button. On wide screens the button is hidden.

- [ ] **Step 1:** Failing tests: e2e at 360 × 740 `test_codeboek_button_in_view_at_turn_10` (scroll turn 10 into view; the button is in the viewport), `test_codeboek_dialog_opens_and_closes` (opens, shows *Beslisregel*, Escape closes, focus back on the button), `test_codeboek_button_works_after_locking` (after *Controleer*); at 1366 × 768 `test_codeboek_button_hidden_wide`.
- [ ] **Step 2:** Run → FAIL. Implement.
- [ ] **Step 3:** Run → PASS, whole suite. Commit `feat: code book button on small screens`.

### Task 23: Title and focus follow the view

**Files:** Modify `site/js/main.js`; Test `tests/e2e/test_shell.py`

**Interfaces:**
- Produces: on every route the document title is `<view title> · Kijken als onderzoeker` (map: the page's default title) and focus moves to the view's `h1` (`tabindex="-1"`), so a screen reader announces where the student is.

- [ ] **Step 1:** Failing tests: e2e `test_title_per_view` (station 3: title starts with `Gesprekken als data`; plan: `Mijn observatieplan`; map: the default), `test_focus_on_heading_after_navigation` (open a station from the map: `document.activeElement` is its `h1`).
- [ ] **Step 2:** Run → FAIL. Implement.
- [ ] **Step 3:** Run → PASS, whole suite. Commit `fix: title and focus per view`.

### Task 24: Small fixes and checks

**Files:** Modify `site/assets/css/tutorial.css`, `site/js/content/s5.js`, `site/js/content/index.js`, `tests/e2e/conftest.py`, `README.md`; Create `tests/e2e/test_video_live.py`; Test `tests/e2e/test_plan.py`, `tests/e2e/test_taal.py`

- [ ] **Step 1:** Failing tests: e2e `test_plan_long_url_no_sideways_scroll` (360 px, an answer with a 120-character URL: `scrollWidth <= innerWidth`), `test_plan_print_hides_intro` (print media: `.plan__intro` not visible), `test_no_design_language_after_doing` (do the exercises of stations 0, 1, 2 and 5, then check the visible text as in `test_taal`); unit: every station's `nodig` items start with a capital.
- [ ] **Step 2:** Run → FAIL. Fix: `overflow-wrap: anywhere` on plan answers; hide the intro in print; `Koptelefoon` in s5; drop the stale *Dit station volgt nog* comment.
- [ ] **Step 3:** Opt-in live video check: with `ECHTE_VIDEO=1` the YouTube stub is off, and `test_video_live.py` opens every station and checks that each embedded player loads without a YouTube error (`.ytp-error` absent in the frame). Skipped otherwise. README: how to run it before a run with students.
- [ ] **Step 4:** Run → PASS, whole suite; run `ECHTE_VIDEO=1 pytest tests/e2e/test_video_live.py` once against the live site. Commit `fix: small fixes and a live video check`.

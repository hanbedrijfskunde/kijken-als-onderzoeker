# Kijken als onderzoeker

Een zelfstudie over observatie als onderzoeksmethode, voor studenten HBO Bedrijfskunde vanaf jaar 2. De student leert gedrag meetbaar maken met een codeboek, een gesprek coderen, de betrouwbaarheid bepalen met Cohen's kappa en een beslissing onderbouwen met observatiedata. Gaandeweg schrijft de student een observatieplan voor het eigen project.

**Website:** <https://hanbedrijfskunde.github.io/kijken-als-onderzoeker/>

## Stand van zaken

Dit is een **proefstuk**. Alleen de stationskaart en stations 3 (*Gesprekken als data*) en 4 (*Klopt het?*) zijn af. De andere stations en het observatieplan tonen nog *volgt nog*.

## Voor docenten

- **Link vanuit de leeromgeving naar de pagina en laat die in een nieuw tabblad openen.** Zet de pagina niet in een ingesloten frame: daar kan de browser het bewaren van antwoorden blokkeren.
- Antwoorden en voortgang blijven in de browser van de student (`localStorage`). Er gaat niets naar een server, en de docent ziet niets. Het observatieplan blijft bij de student.
- Zoekmachines nemen de pagina niet op (`noindex`).

## Bron

De video's en stills komen uit Shiyi Chen, [“Behind the Research: Making Thinking Visible Through Quantitative Observational Coding”](https://www.youtube.com/watch?v=cVtblRCvtRI) (Class Lab 2.0, 2026). De video wordt ingesloten via YouTube (`youtube-nocookie.com`). De 12 stills in `site/assets/stills/` staan er met bronvermelding en een link naar het moment in de video. De rechten op video en stills liggen bij de maker.

Het gesprek in de fietsenwinkel, het codeboek, de sleutel en de oefentabellen zijn verzonnen voor deze tutorial.

## Opbouw

- `site/`: de website, gewone HTML, CSS en JavaScript zonder bouwstap. Alleen deze map wordt gepubliceerd (`.github/workflows/pages.yml`).
- `tests/`: unit-tests (Node) en browsertests (Python met Playwright).
- `docs/`: het ontwerp en het bouwplan.
- `scripts/make-stills.sh`: zet de stills om naar webp.
- `raw/` (transcript en originele beelden) blijft lokaal en staat niet in de repository.

## Lokaal bekijken en testen

```sh
python3 -m http.server -d site 8000     # daarna http://localhost:8000
npm run test:unit                       # Node 22 of nieuwer
npm run test:e2e                        # pytest en playwright (Chromium)
```

De browsertests starten zelf een server. Met `SITE_URL=https://…` lopen ze tegen een andere locatie, zoals de live site.

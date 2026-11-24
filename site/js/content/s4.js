// Station 4: Klopt het? Betrouwbaarheid van coderen.

// Twee codeurs, 20 beurten, één vraag: vraagt de verkoper door? Rijen: codeur A, kolommen: codeur B.
export const OEFENTABEL = { vraag: 'Vraagt de verkoper door?', categorieen: ['ja', 'nee'], matrix: [[9, 3], [2, 6]] };

// Dezelfde totalen, toch weinig overeenstemming (κ = 0,20).
export const ZELFDE_TOTALEN = { categorieen: ['ja', 'nee'], matrix: [[3, 2], [2, 3]] };

export default {
  id: 's4',
  nodig: ['pen en papier, of een rekenmachine', 'koptelefoon of oordopjes'],
  kenJeDitAl: [
    {
      vraag: 'Twee codeurs zijn het in 90 % van de beurten eens. Is hun codering dan betrouwbaar?',
      opties: ['Ja, 90 % is hoog', 'Dat weet je pas als je corrigeert voor overeenstemming door toeval', 'Nee, je hebt altijd 100 % nodig'],
      juist: 1,
      uitleg: 'Valt bijna alles in één code, dan zijn codeurs het ook bij gokken vaak eens. Cohen’s kappa corrigeert daarvoor.',
    },
    {
      vraag: 'Wat laat een verwarringsmatrix zien?',
      opties: ['Hoe vaak elke code voorkomt', 'Bij welke codes twee codeurs het oneens zijn, en hoe vaak', 'Hoe lang het coderen duurde'],
      juist: 1,
      uitleg: 'In de matrix zet je de codes van twee codeurs tegen elkaar uit. Buiten de diagonaal zie je waar ze verschillen.',
    },
    {
      vraag: 'Vanaf welke kappa is je codering in een studentproject bruikbaar?',
      opties: ['0,40', '0,55', '0,60'],
      juist: 2,
      uitleg: 'Vanaf 0,60 is je codering bruikbaar, vanaf 0,80 goed. Chen houdt voor wetenschappelijk onderzoek 0,85 aan.',
    },
  ],
  waarom: [
    'Jij noemt een verkoper klantgericht, je medestudent niet. Wat is je meting dan waard? Een observatie is pas bruikbaar als een tweede codeur met hetzelfde codeboek ongeveer hetzelfde ziet.',
    'Een manager die op basis van jouw tellingen een training inkoopt, wil weten dat de uitkomst niet afhangt van wie er toevallig keek.',
  ],
  kijk: [
    {
      type: 'video', start: 1749, end: 1925, titel: 'Cohen’s kappa',
      samenvatting: [
        'Chen codeert video’s met de software Observer XT. Haar doel: een kappa boven 0,85.',
        'Cohen’s kappa meet hoe vaak twee codeurs hetzelfde coderen, en corrigeert voor de overeenstemming die je ook door toeval zou krijgen.',
        'pₒ is de overeenstemming die je ziet, pₑ de overeenstemming die je bij toeval verwacht. Dan is κ = (pₒ − pₑ) / (1 − pₑ).',
      ],
    },
    { type: 'still', bestand: '10-32m00-cohens-kappa.webp', sec: 1920, alt: 'Dia met de formule van Cohen’s kappa en de banden van Landis en Koch, van gering tot bijna perfect.', bijschrift: 'De formule, en de banden van Landis & Koch (1977).' },
    { type: 'tekst', html: '<p><strong>Software.</strong> Chen gebruikt Observer XT (betaald). Andere programma’s zijn BORIS (gratis), MAXQDA, ELAN en Datavyu. Codeer je live op een formulier, dan is een spreadsheet genoeg.</p>' },
    {
      type: 'video', start: 1927, end: 2043, titel: 'De verwarringsmatrix',
      samenvatting: [
        'De software berekent kappa voor elk tweetal codeurs.',
        'Daarna kijkt Chen naar de verwarringsmatrix: bij welke codes zijn de codeurs het oneens?',
        'Bij haar zat het grootste verschil bij ‘strategie wisselen’: zij gaf die code tien keer meer dan haar eerste codeur.',
        'Zo weet je welke definitie in het codeboek scherper moet.',
      ],
    },
    { type: 'still', bestand: '11-33m50-confusion-matrix.webp', sec: 2030, alt: 'Verwarringsmatrix in Observer XT: de codes van twee codeurs tegen elkaar uitgezet.', bijschrift: 'Een verwarringsmatrix: de codes van twee codeurs tegen elkaar.' },
    {
      type: 'video', start: 2044, end: 2298, titel: 'Vijf stappen naar betrouwbaarheid',
      samenvatting: [
        'Maak een codeboek: per code een definitie, voorbeeldfragmenten en een basis in de theorie.',
        'Train de codeurs: eerst los van elkaar coderen, dan samen vergelijken en de verschillen bespreken. Houd een codeerlogboek bij.',
        'Een codeur mag pas echt coderen als die de drempel haalt. Bij Chen duurde dat 16 à 17 video’s: maanden werk.',
        'De eerste codeur codeert alles, een tweede codeur doet 20 % opnieuw. Over die 20 % rapporteer je kappa.',
        'Voorkom drift: wie lang alleen codeert, gaat ongemerkt anders coderen. Plan daarom regelmatig een gezamenlijke ijkronde.',
      ],
    },
    { type: 'still', bestand: '12-38m10-steps-for-establishing-reliability.webp', sec: 2290, alt: 'Schema met vijf stappen: codeboek maken, codeurs trainen, certificering bij kappa boven 0,85, video’s coderen, drift voorkomen.', bijschrift: 'De vijf stappen naar betrouwbaar coderen.' },
    { type: 'tekst', html: '<p><strong>Hoe lees je kappa?</strong> Landis & Koch (1977) gebruiken deze banden:</p><div class="tabel-wrap"><table class="banden"><thead><tr><th scope="col">κ</th><th scope="col">Overeenstemming</th></tr></thead><tbody><tr><td>onder 0</td><td>minder dan toeval</td></tr><tr><td>0,00 – 0,20</td><td>gering</td></tr><tr><td>0,21 – 0,40</td><td>redelijk</td></tr><tr><td>0,41 – 0,60</td><td>matig</td></tr><tr><td>0,61 – 0,80</td><td>aanzienlijk</td></tr><tr><td>0,81 – 1,00</td><td>bijna perfect</td></tr></tbody></table></div><p><strong>Welke kappa is genoeg?</strong> Voor een studentproject: vanaf 0,60 is je codering bruikbaar, vanaf 0,80 goed. De 0,85 uit de video is de strenge norm voor wetenschappelijk onderzoek.</p>' },
    {
      type: 'details', titel: 'Verdieping: andere maten voor overeenstemming',
      blokken: [
        {
          type: 'video', start: 2298, end: 2426, titel: 'Soorten betrouwbaarheidsmaten',
          samenvatting: [
            'Percentage overeenstemming: snel, maar zonder correctie voor toeval.',
            'Cohen’s kappa: twee codeurs, codes zonder volgorde. Fleiss’ kappa: drie of meer codeurs.',
            'Gewogen kappa: codes met een volgorde, zoals een schaal van 1 tot 5.',
            'ICC: voor scores op een doorlopende schaal. Krippendorffs alfa: voor elk soort data, maar lastig met de hand.',
          ],
        },
        { type: 'still', bestand: '13-40m25-types-of-inter-rater-reliability.webp', sec: 2425, alt: 'Tabel met zes maten voor overeenstemming tussen codeurs, met datatype, aantal codeurs, toepassing en vuistregel.', bijschrift: 'Zes maten naast elkaar.' },
      ],
    },
  ],
  doe: [
    { type: 'tekst', html: '<h3>Deel 1 · Kappa met de hand</h3><p>Twee codeurs keken naar dezelfde 20 beurten van verkopers. Bij elke beurt codeerden ze: vraagt de verkoper door, ja of nee? Reken pₒ, pₑ en κ uit, op twee decimalen.</p>' },
    { type: 'kappa-hand' },
    { type: 'tekst', html: '<h3>Deel 2 · Jouw codes uit station 3</h3><p>Hoe goed kwam jouw codering van het gesprek in de fietsenwinkel overeen met de sleutel? De rekenhulp zet jouw codes naast die van de sleutel.</p><p><strong>Klaar als:</strong> je kappa met de hand goed hebt uitgerekend en je eigen uitkomst hieronder hebt bekeken.</p>' },
    { type: 'kappa-calc' },
  ],
  jeKuntNu: 'Je kunt nu Cohen’s kappa uitrekenen en uitleggen. Je ziet ook met een verwarringsmatrix welke regel in je codeboek scherper moet.',
  mijnProject: [
    {
      type: 'open',
      veld: 'betrouwbaarheid',
      vraag: 'Hoe zorg je in je eigen project voor betrouwbare codes? Wie is je tweede codeur, welk deel codeert die dubbel, welke drempel houd je aan, en hoe voorkom je dat je ongemerkt anders gaat coderen (drift)?',
      voorbeeld: 'Een medestudent uit mijn projectgroep is tweede codeur. We oefenen eerst samen op twee gesprekken die niet meetellen. Daarna codeer ik alle 30 gesprekken; mijn medestudent codeert er 6 (20 %) los van mij. Over die 6 reken ik kappa uit, en ik wil minstens 0,60 halen. Halverwege doen we samen een ijkronde op één gesprek.',
      checklist: [
        'Je noemt wie je tweede codeur is.',
        'Je zegt welk deel dubbel gecodeerd wordt.',
        'Je noemt een drempel voor kappa.',
        'Je plant oefenen vóór het echte coderen, en een moment om drift te voorkomen.',
      ],
    },
  ],
};

// Station 1: Wat ga je zien? Van een begrip naar gedrag dat je kunt tellen.

// Tien beschrijvingen van verkopers in de fietsenwinkel. Verzonnen; geen echte personen.
export const GEDRAG = [
  { tekst: 'De verkoper vraagt waarvoor de klant de fiets gaat gebruiken.', waarneembaar: true, uitleg: 'Een vraag hoor je. Twee observatoren zijn het snel eens of die gesteld is.' },
  { tekst: 'De verkoper is betrokken bij de klant.', waarneembaar: false, uitleg: 'Betrokken is een oordeel. De een noemt een verkoper betrokken, de ander niet. Zeg aan welk gedrag je het ziet.' },
  { tekst: 'De verkoper laat de klant een proefrit maken.', waarneembaar: true, uitleg: 'Een proefrit zie je gebeuren.' },
  { tekst: 'De verkoper heeft geduld met de klant.', waarneembaar: false, uitleg: 'Geduld zit van binnen. Je ziet het pas aan gedrag, zoals de klant laten uitpraten.' },
  { tekst: 'De verkoper vat samen wat de klant zoekt en vraagt of dat klopt.', waarneembaar: true, uitleg: 'Een samenvatting met een controlevraag hoor je, en je kunt hem tellen.' },
  { tekst: 'De verkoper wil de klant echt helpen.', waarneembaar: false, uitleg: 'Een bedoeling zie je niet. Wat de verkoper doet om te helpen, zie je wel.' },
  { tekst: 'De verkoper begroet de klant binnen een minuut nadat die is binnengekomen.', waarneembaar: true, uitleg: 'Begroeten zie en hoor je, en de tijd kun je meten.' },
  { tekst: 'De verkoper begrijpt wat de klant nodig heeft.', waarneembaar: false, uitleg: 'Begrijpen gebeurt in het hoofd. Je ziet het hooguit aan een goede samenvatting, en die tel je dan.' },
  { tekst: 'De verkoper onderbreekt de klant terwijl die praat.', waarneembaar: true, uitleg: 'Onderbreken hoor je. Het is waarneembaar, ook al is het gedrag dat je liever niet ziet.' },
  { tekst: 'De verkoper is vriendelijk.', waarneembaar: false, uitleg: 'Vriendelijk is een oordeel waarover observatoren vaak verschillen. Maak het concreet: de verkoper glimlacht, noemt de klant bij naam of bedankt.' },
];

const HERSCHRIJF_CHECKLIST = [
  'Je beschrijft iets wat de verkoper doet of zegt.',
  'Twee observatoren zouden het allebei zien of horen.',
  'Je kunt tellen hoe vaak het gebeurt.',
];

const VERGELIJKING = '<p><strong>Van Chen naar de fietsenwinkel.</strong> Dezelfde stappen werken voor een bedrijfskundig begrip:</p>'
  + '<div class="tabel-wrap"><table><thead><tr><th scope="col"><span class="sr-only">Stap</span></th><th scope="col">Chen</th><th scope="col">Fietsenwinkel</th></tr></thead><tbody>'
  + '<tr><th scope="row">Begrip</th><td>Metacognitie</td><td>Klantgerichtheid</td></tr>'
  + '<tr><th scope="row">Waarom kijken?</th><td>Niet te zien, en kinderen kunnen er niet over vertellen</td><td>Verkopers vinden zichzelf bijna altijd klantgericht</td></tr>'
  + '<tr><th scope="row">Gedrag dat je telt</th><td>Eigen bouwwerk bekijken, plan bekijken, strategie wisselen</td><td>Doorvragen, samenvatten, advies dat past bij de klant</td></tr>'
  + '</tbody></table></div>';

export default {
  id: 's1',
  nodig: ['koptelefoon of oordopjes', 'pen en papier'],
  kenJeDitAl: [
    {
      vraag: 'Welke beschrijving is waarneembaar gedrag?',
      opties: ['De verkoper is betrokken', 'De verkoper vraagt waarvoor de klant de fiets gaat gebruiken', 'De verkoper wil de klant helpen'],
      juist: 1,
      uitleg: 'Een vraag kun je horen. Betrokkenheid en willen helpen zijn een oordeel en een bedoeling: die vertaal je eerst naar gedrag.',
    },
    {
      vraag: 'Wat is operationaliseren?',
      opties: ['Een begrip vertalen naar gedrag dat je kunt zien en tellen', 'Een onderzoek uitvoeren in een bedrijf', 'Je resultaten omzetten in een advies'],
      juist: 0,
      uitleg: 'Je maakt een begrip dat je niet direct ziet, zoals klantgerichtheid, meetbaar door te zeggen aan welk gedrag je het herkent.',
    },
    {
      vraag: 'Wat hoort er in een regel van een codeboek?',
      opties: ['Alleen de naam van de code', 'Naam, definitie, wanneer wel, wanneer niet en een voorbeeld', 'De naam van de codeur en de datum'],
      juist: 1,
      uitleg: 'Met een definitie, een grens en een voorbeeld coderen twee mensen hetzelfde gedrag op dezelfde manier.',
    },
  ],
  waarom: [
    'Klantgerichtheid kun je niet zien. Wat je wel ziet, is gedrag: een verkoper die doorvraagt, samenvat of een fiets laat proberen. Pas als je zegt aan welk gedrag je klantgerichtheid herkent, kun je het meten.',
    'Zonder die vertaling telt elke observator iets anders. Dan vergelijk je filialen op wie er keek, niet op wat de verkopers deden.',
  ],
  kijk: [
    {
      type: 'video', start: 891, end: 1301, titel: 'Van begrip naar codeerschema',
      samenvatting: [
        'Chen wil metacognitie meten: of kinderen nadenken over hun eigen denken en doen. Dat is van buiten niet te zien. En kinderen van vier tot zes jaar kunnen er nog niet goed over vertellen. Daarom kiest ze voor observatie.',
        'Ze geeft kinderen een taak: een treinbaan bouwen naar een plaatje. Die taak lokt gedrag uit waarin je metacognitie wel ziet: kinderen proberen manieren uit, controleren hun werk en sturen bij. Alles wordt gefilmd.',
        'Ze gebruikt een bestaand codeerschema, MetaSCoPE (Bryce & Whitebread, 2012). Dat is gebaseerd op een theorie over het bewaken en bijsturen van je eigen denken (Nelson & Narens, 1990).',
        'Het schema heeft 26 codes in drie groepen: bewaken (10 codes), bijsturen (6) en het ontbreken daarvan (10). De score is bewaken plus bijsturen, min het ontbreken ervan.',
        'Elke code heeft een naam, een beschrijving en een voorbeeld. Soms staat de grens erbij, zoals bij de code voor het eigen bouwwerk bekijken: niet als het kind maar één stukje bekijkt.',
      ],
    },
    { type: 'still', bestand: '04-15m40-how-to-quantify-metacognition.webp', sec: 940, alt: 'Dia met de vraag How to quantify metacognition? en een getekend kind dat nadenkt.', bijschrift: 'Hoe meet je iets wat je niet kunt zien?' },
    { type: 'still', bestand: '05-20m30-coding-framework-metascope.webp', sec: 1230, alt: 'Dia over het codeerschema MetaSCoPE: de theorie erachter, drie groepen codes (bewaken 10, bijsturen 6, het ontbreken daarvan 10) en de formule voor de totaalscore.', bijschrift: 'Van theorie naar codeerschema: drie groepen codes en één totaalscore.' },
    { type: 'still', bestand: '06-21m00-metascope-codebook-excerpt.webp', sec: 1260, alt: 'Uitsnede uit het codeboek van MetaSCoPE in twee tabellen: per code een naam met beschrijving en een voorbeeld, verdeeld over vier groepen.', bijschrift: 'Een uitsnede uit het codeboek. Per code een naam, een beschrijving en een voorbeeld. Bewaken telt hier 10 codes, bijsturen 6. Het ontbreken daarvan is gesplitst in volharden zonder resultaat (8) en afleiding (2).' },
    { type: 'tekst', html: VERGELIJKING },
  ],
  doe: [
    { type: 'tekst', html: '<p>Hieronder staan tien beschrijvingen van verkopers in de fietsenwinkel. Kies bij elke beschrijving: kun je dit zien of horen (<em>waarneembaar</em>), of is het een oordeel of een bedoeling (<em>niet waarneembaar</em>)?</p><p><strong>Klaar als:</strong> je alle tien beschrijvingen hebt ingedeeld. Herschrijf daarna twee beschrijvingen die niet waarneembaar zijn.</p>' },
    { type: 'sorteer', slot: 'Herschrijf nu twee beschrijvingen die niet waarneembaar zijn. Je vindt ze onder de tien beschrijvingen.' },
    { type: 'tekst', html: '<p><strong>Herschrijven.</strong> Maak van een oordeel gedrag dat je kunt zien of horen. Vaak zijn er meer goede antwoorden.</p>' },
    {
      type: 'open', veld: 'herschrijf-betrokken',
      vraag: 'Herschrijf ‘De verkoper is betrokken bij de klant’ tot gedrag dat je kunt zien of horen.',
      voorbeeld: 'De verkoper vraagt door op iets wat de klant net zei. Of: de verkoper noemt later in het gesprek iets wat de klant eerder vertelde.',
      checklist: HERSCHRIJF_CHECKLIST,
    },
    {
      type: 'open', veld: 'herschrijf-geduld',
      vraag: 'Herschrijf ‘De verkoper heeft geduld met de klant’ tot gedrag dat je kunt zien of horen.',
      voorbeeld: 'De verkoper laat de klant uitpraten zonder te onderbreken. Of: de verkoper legt iets een tweede keer uit als de klant het niet begreep.',
      checklist: HERSCHRIJF_CHECKLIST,
    },
  ],
  jeKuntNu: 'Je kunt nu een begrip vertalen naar gedrag dat je kunt zien en tellen, en dat vastleggen in een regel van een codeboek.',
  mijnProject: [
    {
      type: 'open',
      veld: 'indicatoren',
      vraag: 'Aan welke drie gedragingen herken je jouw begrip? Schrijf ze op als gedrag dat je kunt zien of horen.',
      voorbeeld: 'Klantgerichtheid herken ik aan drie gedragingen. 1. De verkoper vraagt door op wat de klant zegt. 2. De verkoper vat samen wat de klant zoekt. 3. De verkoper geeft advies dat past bij wat de klant vertelde.',
      checklist: [
        'Je noemt drie gedragingen.',
        'Elke gedraging kun je zien of horen; er staat geen oordeel of bedoeling in.',
        'Elke gedraging kun je tellen.',
        'Samen dekken ze je begrip: je mist geen belangrijk deel.',
      ],
    },
    {
      type: 'open',
      veld: 'codeboekregel',
      vraag: 'Werk één gedraging uit tot een volledige regel voor je codeboek: naam, definitie, wanneer wel, wanneer niet en een voorbeeld.',
      voorbeeld: 'Naam: Doorvragen. Definitie: de verkoper vraagt verder op iets wat de klant net zei, om het preciezer te maken. Wanneer wel: de vraag pakt een woord of onderwerp op uit de beurt van de klant ervoor. Wanneer niet: een vraag over een nieuw onderwerp (dat is Open vraag). Voorbeeld: Klant: “Ik heb last van mijn rug.” Verkoper: “Bij welke houding merk je dat het meest?”',
      checklist: [
        'Je regel heeft alle vijf delen: naam, definitie, wanneer wel, wanneer niet en een voorbeeld.',
        'De definitie beschrijft gedrag, geen oordeel.',
        'Bij wanneer niet noem je het gedrag dat er het meest op lijkt, en welke code dat dan krijgt.',
        'Een medestudent die alleen deze regel leest, zou hetzelfde coderen als jij.',
      ],
    },
  ],
};

// Station 3: Gesprekken als data.
// Het gesprek speelt zich af in een verzonnen fietsenwinkel. Namen van echte bedrijven of personen komen er niet in voor.

export const CODES = [
  {
    id: 'open-vraag',
    naam: 'Open vraag',
    definitie: 'De verkoper stelt een nieuwe vraag over wat de klant wil of nodig heeft. De klant kan er meer op zeggen dan ja of nee.',
    wel: 'De vraag opent een nieuw onderwerp: “Waar ga je de fiets vooral voor gebruiken?”',
    niet: 'Een vraag die verdergaat op wat de klant net zei (dat is Doorvragen). Een vraag met ja of nee als antwoord (dat is Overig).',
    voorbeeld: '“Wat vind je belangrijk aan een fiets?”',
  },
  {
    id: 'doorvragen',
    naam: 'Doorvragen',
    definitie: 'De verkoper vraagt verder op iets wat de klant net zei, om het preciezer te maken.',
    wel: 'De vraag pakt een woord of onderwerp op uit de beurt van de klant ervoor.',
    niet: 'Een vraag over een nieuw onderwerp (dat is Open vraag).',
    voorbeeld: 'Klant: “Ik heb last van mijn rug.” Verkoper: “Bij welke houding merk je dat het meest?”',
  },
  {
    id: 'samenvatten',
    naam: 'Samenvatten',
    definitie: 'De verkoper zegt in eigen woorden terug wat de klant wil, om te checken of hij het goed begrepen heeft.',
    wel: 'De beurt vat meerdere dingen samen die de klant eerder zei, vaak met “klopt dat?”.',
    niet: 'Alleen “oké” of “ja” (dat is Overig). Een samenvatting die eindigt in een voorstel (zie de beslisregel).',
    voorbeeld: '“Als ik je goed begrijp, wil je vooral comfortabel zitten op ritten van een half uur. Klopt dat?”',
  },
  {
    id: 'advies',
    naam: 'Advies',
    definitie: 'De verkoper stelt een product, een oplossing of een volgende stap voor, of legt uit waarom iets bij de klant past.',
    wel: 'Een concreet voorstel, ook als het als vraag klinkt (“Zal ik er een klaarzetten?”), of uitleg bij een product voor deze klant.',
    niet: 'Praktische informatie over de winkel, zoals openingstijden of betalen (dat is Overig).',
    voorbeeld: '“Voor jouw rit zou ik een fiets met een rechtere zithouding nemen.”',
  },
  {
    id: 'overig',
    naam: 'Overig',
    definitie: 'Alle andere beurten: begroeten, bevestigen (“oké”), praktische zaken, en vragen met ja of nee als antwoord die geen voorstel zijn.',
    wel: 'De beurt past bij geen van de andere vier codes.',
    niet: 'Een beurt die wel onder een van de andere vier codes valt.',
    voorbeeld: '“Goedemorgen, kijk gerust rond.”',
  },
];

export const BESLISREGEL = 'Doet een beurt twee dingen, codeer dan wat de verkoper als laatste doet.';

const k = (tekst) => ({ spreker: 'klant', tekst });
const v = (tekst, sleutel, uitleg) => ({ spreker: 'verkoper', tekst, sleutel, uitleg });

export const GESPREK = [
  v('Goedemorgen! Kijk gerust rond, hoor.', 'overig', 'Een begroeting. Er wordt niets gevraagd en niets voorgesteld.'),
  k('Dank je. Ik zoek eigenlijk een nieuwe fiets.'),
  v('Leuk. Waarvoor ga je de nieuwe fiets vooral gebruiken?', 'open-vraag', 'Een nieuwe vraag: de klant heeft nog niet gezegd waar de fiets voor is. Ze kan er veel op vertellen.'),
  k('Om naar mijn werk te fietsen. Dat is zo’n twaalf kilometer, deels over een dijk. Daar staat vaak veel wind.'),
  v('Veel wind op die dijk… Hoe lang doe je nu over die twaalf kilometer?', 'doorvragen', 'De verkoper pakt de twaalf kilometer en de wind op uit de beurt ervoor en vraagt daarop verder.'),
  k('Een klein uur. Ik kom vaak bezweet aan, en mijn rug speelt op.'),
  v('Waar in je rug merk je dat vooral?', 'doorvragen', 'Hij vraagt verder op de rug, die de klant net noemde.'),
  k('Onderin. Vooral als ik lang voorovergebogen zit.'),
  v('Oké.', 'overig', 'Alleen een bevestiging. Dat is nog geen samenvatting.'),
  k('En als ik haast heb, is het helemaal mis.'),
  v('Dus als ik het goed begrijp: twaalf kilometer met tegenwind, je wilt minder bezweet aankomen, en je rug moet ontzien worden. Klopt dat?', 'samenvatten', 'De verkoper zegt drie dingen terug die de klant eerder noemde en checkt of het klopt.'),
  k('Ja, precies.'),
  v('Heb je al eens op een elektrische fiets gereden?', 'overig', 'Een vraag, maar het antwoord is ja of nee. Volgens het codeboek is dat Overig, geen Open vraag.'),
  k('Nee, nog nooit.'),
  v('Dan zou ik je een e-bike met een rechte zithouding aanraden. Met trapondersteuning heb je minder last van de wind, en rechtop zitten ontlast je onderrug.', 'advies', 'Een concreet voorstel, met uitleg waarom het bij deze klant past.'),
  k('Hm, die zijn wel duur, toch?'),
  v('Wat zou je ongeveer willen uitgeven?', 'doorvragen', 'De klant begint over de prijs, en de verkoper vraagt daarop door. Het lijkt een nieuwe vraag, maar het onderwerp komt van de klant.'),
  k('Liefst niet meer dan tweeduizend euro.'),
  v('Daar hebben we een paar goede modellen voor. Deze hier kost 1.899 euro en heeft een accu die ruim vijftig kilometer meegaat.', 'advies', 'De verkoper stelt een product voor dat binnen het budget past.'),
  k('En is onderhoud dan niet lastig?'),
  v('Wat bedoel je precies met lastig?', 'doorvragen', 'Hij vraagt de klant uit te leggen wat ze net zei.'),
  k('Nou, ik heb geen idee hoe ik zo’n accu moet onderhouden.'),
  v('Dat valt mee. Je laadt hem op aan het stopcontact, en bij de jaarlijkse beurt kijken wij de accu na.', 'advies', 'Uitleg die het bezwaar van de klant oplost. Het gaat over de fiets van deze klant, niet over de winkel: Advies, geen Overig.'),
  k('Oké, dat klinkt goed.'),
  v('Wat zou je verder nog belangrijk vinden aan je nieuwe fiets?', 'open-vraag', 'Een nieuwe vraag over een nieuw onderwerp. De klant kan alles noemen.'),
  k('Een goed slot. Bij ons op het station wordt veel gestolen.'),
  v('Je wilt dus een e-bike onder de tweeduizend euro, met een goed slot erbij. Zal ik er een klaarzetten voor een proefrit?', 'advies', 'De beurt begint met een samenvatting en eindigt met een vraag waarop het antwoord ja of nee is. Toch is het geen Overig: de vraag is een voorstel voor een volgende stap. Volgens de beslisregel codeer je wat de verkoper als laatste doet: Advies.'),
  k('Ja, graag.'),
  v('Top. Mag ik even je identiteitsbewijs als borg?', 'overig', 'Een praktische vraag over de proefrit.'),
].map((b, i) => ({ nr: i + 1, ...b }));

export const VERKOPER_SLEUTEL = GESPREK.filter((b) => b.spreker === 'verkoper').map((b) => b.sleutel);

// Een voorbeeldstudent die vier keer anders codeert dan de sleutel (beurt 3, 7, 9 en 14 van de verkoper).
export const VOORBEELD_CODES = [
  'overig', 'open-vraag', 'open-vraag', 'doorvragen', 'overig', 'samenvatten', 'open-vraag', 'advies',
  'open-vraag', 'advies', 'doorvragen', 'advies', 'open-vraag', 'samenvatten', 'overig',
];

export default {
  id: 's3',
  nodig: ['koptelefoon of oordopjes', 'een rustige plek om te lezen'],
  kenJeDitAl: [
    {
      vraag: 'Wat is de eenheid van analyse als je een gesprek codeert?',
      opties: ['Het hele gesprek', 'Het stuk tekst dat één code krijgt, zoals een beurt of een uiting', 'Het aantal codes in je codeboek'],
      juist: 1,
      uitleg: 'De eenheid is het stuk dat je telkens één code geeft. In dit station is dat een beurt van de verkoper.',
    },
    {
      vraag: 'Je wilt klantgesprekken coderen. Hoe kom je aan je codes?',
      opties: ['Je bedenkt ze allemaal zelf', 'Je zoekt een bestaand codeerschema en past dat aan je doel aan', 'Je codeert alle gesprekken en kijkt daarna welke codes je nodig hebt'],
      juist: 1,
      uitleg: 'Een bestaand schema is al getest en heeft een basis in de literatuur. Van nul beginnen kost veel meer tijd. Chen doet het in de video ook zo.',
    },
    {
      vraag: 'Een verkoper zegt: “Dus je zoekt een fiets voor woon-werkverkeer, klopt dat?” Welke code past?',
      opties: ['Open vraag', 'Samenvatten', 'Doorvragen', 'Advies'],
      juist: 1,
      uitleg: 'De verkoper zegt terug wat de klant wil en checkt of het klopt. Dat is samenvatten, ook al eindigt de zin met een vraag.',
    },
  ],
  waarom: [
    'Veel werk in een organisatie gebeurt in gesprekken: met klanten, in een teamoverleg, aan de telefoon. Wat er in die gesprekken gebeurt, kun je ook tellen.',
    'Stel: een manager wil weten waarom het ene filiaal beter verkoopt dan het andere. Als je codeert hoe vaak verkopers doorvragen, vergelijk je de filialen op wat verkopers doen, niet op wat ze zeggen dat ze doen.',
  ],
  kijk: [
    {
      type: 'video', start: 2603, end: 2870, titel: 'Gesprekken vastleggen en coderen',
      samenvatting: [
        'Chen neemt de gesprekken van leerkrachten op met een klein opnameapparaat en schrijft ze uit.',
        'Ze vond geen codeerschema dat precies paste. Daarom past ze bestaande schema’s aan; van nul beginnen kost te veel tijd.',
        'Eerst kiest ze de eenheid van analyse (een uiting of een beurt) en het doel van het coderen.',
        'Ze test het schema op 15 % van de gesprekken, met twee codeurs, en past het daarna aan.',
        'Het resultaat is een codeboek: per code een naam, een definitie, wanneer wel en wanneer niet, en een voorbeeld.',
      ],
    },
    { type: 'still', bestand: '14-43m18-language-transcripts.webp', sec: 2598, alt: 'Dia met een uitgeschreven gesprek tussen een leerkracht en kinderen over drijven en zinken.', bijschrift: 'Een uitgeschreven gesprek: elke regel is een beurt.' },
    { type: 'still', bestand: '15-45m00-steps-adapting-language-coding-schemes.webp', sec: 2700, alt: 'Schema met vijf stappen: eenheid van analyse bepalen, doel bepalen, bestaand codeerschema kiezen, testen op 15 procent van de transcripten en aanpassen, codeboek maken.', bijschrift: 'De vijf stappen om een bestaand codeerschema aan te passen.' },
    { type: 'still', bestand: '16-45m30-baseline-language-coding-framework.webp', sec: 2730, alt: 'Tabel uit een bestaand codeerschema met per code een definitie en voorbeelden.', bijschrift: 'Een bestaand codeerschema (Deshmukh e.a., 2022): per code een definitie en voorbeelden.' },
    { type: 'tekst', html: '<p><strong>Voor je eigen project:</strong> je hoeft niets op te nemen. Vaak codeer je live, op een codeerformulier, terwijl het gesprek gebeurt. Je eenheid is dan een beurt of een vast tijdvak. Opnemen mag alleen met toestemming van iedereen die je opneemt.</p>' },
  ],
  doe: [
    { type: 'tekst', html: '<ol><li><strong>Neem eerst het codeboek door, voordat je één beurt codeert.</strong> Lees per code de definitie, wanneer de code wel en niet geldt, en het voorbeeld. Lees ook de beslisregel onderaan. Het codeboek staat rechts naast het gesprek; op een smal scherm staat het erboven.</li><li>Lees dan het gesprek in een fietsenwinkel. Geef elke beurt van de verkoper precies één code. Twijfel je tussen twee codes? Lees die twee definities dan nog een keer. De beurten van de klant codeer je niet; die staan er om het gesprek te kunnen volgen.</li></ol><p>Waarom eerst het codeboek? Het codeboek is je meetinstrument. Lees je een definitie anders dan bedoeld, dan codeer je anders, hoe goed je het gesprek ook begrijpt. In station 4 zie je dat terug in de kappa.</p><p><strong>Klaar als:</strong> je alle 15 beurten van de verkoper een code hebt gegeven en op <em>Controleer</em> hebt geklikt. Na Controleer staan je codes vast. Wat je anders codeerde dan de sleutel, blijft dus staan. In station 4 reken je daarmee verder.</p>' },
    { type: 'codeer' },
  ],
  jeKuntNu: 'Je kunt nu een gesprek beurt voor beurt coderen met een codeboek. Je ziet ook waarom elke code een definitie, een grens en een voorbeeld nodig heeft.',
  mijnProject: [
    {
      type: 'open',
      veld: 'codeerschema',
      vraag: 'Welk bestaand codeerschema kun je voor je eigen project gebruiken of aanpassen? En welke eenheid kies je: een beurt, een uiting of een vast tijdvak?',
      voorbeeld: 'Ik observeer adviesgesprekken aan de balie van een fietsenwinkel. Ik gebruik de vijf codes uit deze oefening als basis en voeg een code toe voor “product laten zien”. Mijn eenheid is een beurt van de verkoper. Ik test het schema eerst op drie gesprekken en pas het dan aan.',
      checklist: [
        'Je noemt waar je schema vandaan komt: een bestaand schema, of de codes uit deze tutorial.',
        'Je kiest één eenheid en zegt waarom die past.',
        'Elke code die je toevoegt, heeft een definitie, een grens (wanneer niet) en een voorbeeld.',
        'Je test het schema op een klein deel van je observaties voordat je alles codeert.',
      ],
    },
  ],
};

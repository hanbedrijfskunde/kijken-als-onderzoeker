// Station 2: Zelf coderen. Turven terwijl de oefenclip loopt.
// Geen stills: in de clip is een kind in beeld. De video zelf wordt ingesloten via YouTube.

// De vier codes uit de oefening (MetaSCoPE, still 06, en de uitleg op 22:07–22:47).
export const VIDEO_CODES = [
  { id: 'eigen-bouwwerk', naam: 'Eigen bouwwerk bekijken', definitie: 'Het kind pauzeert en kijkt naar de hele eigen treinbaan. Niet als het maar naar één stukje kijkt.' },
  { id: 'strategie-wisselen', naam: 'Strategie wisselen', definitie: 'Het kind gebruikt een andere aanpak of een ander stuk dan ervoor. Het eerste stuk dat het pakt, telt niet.' },
  { id: 'plan-bekijken', naam: 'Plan bekijken', definitie: 'Het kind kijkt naar het plaatje van de treinbaan en vergelijkt het met het eigen bouwwerk. Ook een korte blik telt.' },
  { id: 'afgeleid', naam: 'Afgeleid', definitie: 'Het kind is afgeleid door wat anderen doen of door eigen gedachten, maar werkt tussendoor door aan de taak.' },
];

// De sleutel uit de video (25:38).
export const SLEUTEL = { 'eigen-bouwwerk': 1, 'strategie-wisselen': 7, 'plan-bekijken': 2, afgeleid: 1 };

export const FEEDBACK = {
  'eigen-bouwwerk': {
    meer: 'Je telde vaker dan de sleutel. Telde je ook momenten waarop het kind naar één stukje keek? Die tellen niet: de code gaat over de hele baan.',
    minder: 'Je telde minder vaak dan de sleutel. Let op de korte pauzes waarin het kind de hele baan overziet.',
    gelijk: 'Precies zoals de sleutel.',
  },
  'strategie-wisselen': {
    meer: 'Je telde vaker dan de sleutel. Het eerste stuk dat het kind pakt, telt niet. Pas een andere aanpak of een ander stuk dan ervoor is een wissel.',
    minder: 'Je telde minder vaak dan de sleutel. Deze code komt het vaakst voor en gaat snel. Elke keer dat het kind een stuk omdraait of een ander stuk pakt dan ervoor, telt.',
    gelijk: 'Precies zoals de sleutel. Dit is de lastigste code, omdat hij zo vaak en zo snel voorkomt.',
  },
  'plan-bekijken': {
    meer: 'Je telde vaker dan de sleutel. Telde je ook blikken naar iets anders dan het plaatje, zoals naar een volwassene? Alleen kijken naar het plaatje telt.',
    minder: 'Je telde minder vaak dan de sleutel. Het kind kijkt soms maar heel kort naar het plaatje. Ook zo’n korte blik telt.',
    gelijk: 'Precies zoals de sleutel.',
  },
  afgeleid: {
    meer: 'Je telde vaker dan de sleutel. Naar de moeder kijken telt niet: dit kind doet dat steeds. Het is basisgedrag, en dat zegt niets over dat moment. In de bespreking legt Chen dit uit.',
    minder: 'Je telde minder vaak dan de sleutel. Het kind begint te vertellen over papa, die komt kijken. Dat gaat niet over de taak, dus het telt als afgeleid.',
    gelijk: 'Precies zoals de sleutel.',
  },
};

// Verschijnt pas na het vergelijken: de bespreking noemt de sleutel.
export const BESPREKING = {
  type: 'video', start: 1514, end: 1745, titel: 'De bespreking',
  samenvatting: [
    'Chen geeft de sleutel: één keer eigen bouwwerk bekijken, zeven keer strategie wisselen, twee keer plan bekijken en één keer afgeleid.',
    'Veel kijkers telden anders. Turven is moeilijk: er gebeurt veel tegelijk, en zonder training twijfel je vaak.',
    'Het kind begint te vertellen over papa, die komt kijken. Dat telt als afgeleid: het gaat niet over de taak.',
    'Iemand telde het kijken naar de moeder als afgeleid. Chen telt dat niet: dit kind doet dat steeds. Het is basisgedrag, en dat zegt niets over dat moment. Daarvoor heb je een beslisregel nodig.',
    'In Chens onderzoek duurt elke video 10 tot 20 minuten. Dit was anderhalve minuut.',
  ],
};

const ROUTES = '<p><strong>Voor je eigen project: hoe leg je vast wat je ziet?</strong></p><ul>'
  + '<li><strong>Live coderen op een codeerformulier.</strong> Je turft ter plekke en neemt niets op. Er worden geen beelden of geluid van klanten of medewerkers bewaard. Dit is de gewone route.</li>'
  + '<li><strong>Opnemen en achteraf coderen.</strong> Alleen met toestemming van iedereen die herkenbaar op de opname staat, en van de organisatie.</li>'
  + '</ul><p>Bij beide routes regel je vooraf toestemming van de organisatie en informeer je wie je observeert. Volg daarbij de privacyregels van je opleiding en van de organisatie. Deze tutorial geeft geen juridisch advies.</p>';

export default {
  id: 's2',
  nodig: ['koptelefoon of oordopjes', 'een rustige plek: de clip duurt anderhalve minuut en je moet blijven kijken'],
  kenJeDitAl: [
    {
      vraag: 'Een codeur telt ‘afgeleid’ elke keer dat een kind naar de moeder kijkt, terwijl het kind dat steeds doet. Wat ontbreekt er in het codeboek?',
      opties: ['Een extra code', 'Een beslisregel over basisgedrag', 'Een langere video'],
      juist: 1,
      uitleg: 'Gedrag dat iemand altijd vertoont, zegt niets over dat moment. Een beslisregel legt vast dat je het niet telt.',
    },
    {
      vraag: 'Wat is het verschil tussen tellen per gebeurtenis en tellen per tijdvak?',
      opties: ['Er is geen verschil', 'Per gebeurtenis tel je elke keer dat het gedrag gebeurt; per tijdvak noteer je per vaste periode of het gebeurde', 'Per tijdvak tel je alleen het eerste gedrag van de dag'],
      juist: 1,
      uitleg: 'Per gebeurtenis weet je hoe vaak iets gebeurt. Per tijdvak (bijvoorbeeld elke minuut: ja of nee) is makkelijker bij gedrag dat snel en vaak voorkomt.',
    },
    {
      vraag: 'Waarom codeer je in een eigen project vaak live, in plaats van met een opname?',
      opties: ['Live coderen is altijd nauwkeuriger', 'Je bewaart dan geen beelden of geluid van klanten en medewerkers', 'Opnemen mag nooit'],
      juist: 1,
      uitleg: 'Zonder opname hoef je geen beelden of geluid te bewaren en te beveiligen. Opnemen kan wel, maar alleen met toestemming van iedereen die herkenbaar is.',
    },
  ],
  waarom: [
    'Lezen hoe je codeert is iets anders dan het doen. Pas als je zelf turft, merk je hoe snel gedrag gaat en hoe vaak je twijfelt.',
    'In een winkel gaat het net zo snel. Mis je een beslisregel, dan telt elke observator iets anders. De cijfers zeggen dan meer over wie er keek dan over de verkopers.',
  ],
  kijk: [
    {
      type: 'video', start: 1301, end: 1408, titel: 'De vier codes',
      samenvatting: [
        'Chen laat zo een clip van anderhalve minuut zien. Daarin komen vier codes voor.',
        'Eigen bouwwerk bekijken: het kind pauzeert en kijkt naar de hele baan.',
        'Strategie wisselen: het kind gebruikt een andere aanpak of een ander stuk dan ervoor.',
        'Plan bekijken: het kind vergelijkt het plaatje met het eigen bouwwerk.',
        'Afgeleid: het kind is afgeleid door anderen of door eigen gedachten, maar werkt tussendoor door.',
      ],
    },
    { type: 'tekst', html: ROUTES },
  ],
  doe: [
    { type: 'tekst', html: '<ol><li><strong>Lees eerst de vier codes onder de clip.</strong> Houd ze erbij terwijl je kijkt.</li><li>Start de oefenclip. Klik op een code elke keer dat je die ziet. Verkeerd geklikt? Gebruik <em>Laatste klik ongedaan maken</em>.</li><li>Klik na de clip op <em>Vergelijk met de sleutel</em>.</li></ol><p><strong>Klaar als:</strong> je de clip hebt geturfd en je telling met de sleutel hebt vergeleken. Opnieuw proberen mag.</p>' },
    {
      type: 'video', start: 1409, end: 1510, titel: 'Oefenclip',
      samenvatting: ['Anderhalve minuut uit een opname van de treinbaantaak. Chen laat de clip zonder uitleg zien: jij turft.'],
    },
    { type: 'turf' },
  ],
  jeKuntNu: 'Je kunt nu gedrag turven terwijl het gebeurt. En je ziet waarom een codeboek beslisregels nodig heeft, bijvoorbeeld voor gedrag dat iemand altijd vertoont.',
  mijnProject: [
    {
      type: 'open',
      veld: 'eenheid',
      vraag: 'Tel je elke keer dat het gedrag gebeurt, of noteer je per vast tijdvak (bijvoorbeeld per minuut) of het gebeurde? Waar en hoe lang observeer je? En welke beslisregel heb je nodig?',
      voorbeeld: 'Ik tel elke keer dat een verkoper doorvraagt of samenvat. Ik observeer in twee filialen, op een zaterdag en op een doordeweekse middag, steeds twee uur, vanaf een plek bij de kassa. Beslisregel: een vraag die de verkoper herhaalt omdat de klant hem niet verstond, tel ik niet nog een keer.',
      checklist: [
        'Je kiest: elke gebeurtenis of vaste tijdvakken, en je zegt waarom.',
        'Je noemt plek en duur, zo concreet dat een ander het kan herhalen.',
        'Je hebt minstens één beslisregel voor een geval waarover je twijfelt.',
        'Je observeert op momenten die passen bij je vraag, zoals drukke en rustige uren.',
      ],
    },
    {
      type: 'open',
      veld: 'vastlegging',
      vraag: 'Hoe leg je vast wat je ziet: live op een codeerformulier, of met een opname die je achteraf codeert? En hoe regel je toestemming van wie je observeert?',
      voorbeeld: 'Ik codeer live op een codeerformulier: per gesprek een regel, met een streepje per code. Ik neem niets op, dus er worden geen beelden of geluid bewaard. De filiaalmanager geeft toestemming, en de verkopers weten vooraf dat ik observeer en waarom. Ik schrijf geen namen van klanten op. Mijn aanpak leg ik voor aan mijn projectbegeleider, en ik check de privacyregels van de opleiding en van de organisatie.',
      checklist: [
        'Je kiest live coderen of opnemen, en je zegt waarom.',
        'Neem je op, dan geeft iedereen die herkenbaar op de opname staat vooraf toestemming, en de organisatie ook.',
        'Je zegt wie je informeert en hoe: de organisatie, de medewerkers en, waar nodig, klanten.',
        'Je noemt de privacyregels van je opleiding en van de organisatie, en wie je om advies vraagt.',
      ],
    },
  ],
};

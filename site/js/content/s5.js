// Station 5: Van turven naar besluit. Wat onderbouwen observatiedata wel, en wat niet?

// Verzonnen tellingen van de vijf codes uit station 3, in vier filialen van de fietsenwinkel.
// Niet elk filiaal is even lang geobserveerd: B maar 4 uur. Daarom vergelijk je per uur.
export const FILIALEN = [
  { naam: 'Filiaal A', uren: 6, tellingen: { 'open-vraag': 30, doorvragen: 42, samenvatten: 18, advies: 36, overig: 48 } },
  { naam: 'Filiaal B', uren: 4, tellingen: { 'open-vraag': 22, doorvragen: 30, samenvatten: 10, advies: 26, overig: 30 } },
  { naam: 'Filiaal C', uren: 6, tellingen: { 'open-vraag': 33, doorvragen: 15, samenvatten: 9, advies: 45, overig: 51 } },
  { naam: 'Filiaal D', uren: 5, tellingen: { 'open-vraag': 24, doorvragen: 33, samenvatten: 16, advies: 28, overig: 40 } },
];

export const BESLISSINGEN = [
  {
    tekst: 'Train de verkopers van filiaal C op doorvragen.',
    onderbouwd: true,
    uitleg: 'In filiaal C wordt per uur veel minder doorgevraagd dan in de andere drie: 2,5 keer, tegen 6,6 tot 7,5. Het verschil is groot, en de codering is betrouwbaar genoeg (κ = 0,78).',
  },
  {
    tekst: 'Kijk in filiaal B hoe verkopers doorvragen, en gebruik dat in de training voor filiaal C.',
    onderbouwd: true,
    uitleg: 'Per uur wordt in B het vaakst doorgevraagd (7,5). Dat maakt B een logische plek om voorbeelden te zoeken. Of de training werkt, meet je daarna opnieuw.',
  },
  {
    tekst: 'Filiaal B heeft ook training nodig: daar is na filiaal C het minst doorgevraagd.',
    onderbouwd: false,
    uitleg: 'In B is in totaal weinig geteld. Maar B is ook korter geobserveerd: 4 uur, tegen 5 of 6 uur in de andere filialen. Per uur wordt in B juist het vaakst doorgevraagd. Vergelijk daarom per uur.',
  },
  {
    tekst: 'De verkoper van filiaal C die het minst doorvraagt, functioneert slecht en krijgt een gesprek.',
    onderbouwd: false,
    uitleg: 'Er is geteld per filiaal, niet per verkoper. Over één persoon zeggen deze data niets. Een beoordeling vraagt om een ander onderzoek, met afspraken die vooraf bekend zijn.',
  },
  {
    tekst: 'Doorvragen verhoogt de omzet, dus filiaal C verkoopt minder.',
    onderbouwd: false,
    uitleg: 'De observatie meet gedrag, geen omzet. Of doorvragen tot meer verkoop leidt, is een vraag naar oorzaak en gevolg. Daarvoor heb je omzetcijfers nodig en een andere opzet, bijvoorbeeld meten vóór en na een training.',
  },
  {
    tekst: 'In filiaal C wordt het hele jaar door weinig doorgevraagd.',
    onderbouwd: false,
    uitleg: 'Er is geobserveerd op twee zaterdagen in maart. Of het in andere weken net zo gaat, weet je niet. Wil je dat weten, dan observeer je ook in een andere periode.',
  },
];

export default {
  id: 's5',
  nodig: ['koptelefoon of oordopjes'],
  kenJeDitAl: [
    {
      vraag: 'Filiaal A is 6 uur geobserveerd: 42 keer doorvragen. Filiaal B is 4 uur geobserveerd: 30 keer. Waar wordt per uur vaker doorgevraagd?',
      opties: ['In A', 'In B', 'Even vaak'],
      juist: 1,
      uitleg: 'A: 42 / 6 = 7,0 per uur. B: 30 / 4 = 7,5 per uur. Verschilt de observatietijd, vergelijk dan per uur.',
    },
    {
      vraag: 'In filialen waar meer wordt doorgevraagd, is de omzet hoger. Wat kun je daaruit concluderen?',
      opties: ['Doorvragen verhoogt de omzet', 'Doorvragen en omzet gaan samen op, maar of het ene het andere veroorzaakt, weet je niet', 'Er is geen verband'],
      juist: 1,
      uitleg: 'Samenhang is nog geen oorzaak. Misschien werken in drukke filialen meer ervaren verkopers. Voor een uitspraak over oorzaak en gevolg heb je een ander onderzoek nodig.',
    },
    {
      vraag: 'Je observeerde op twee zaterdagen in maart. Voor welke uitspraak zijn je data genoeg?',
      opties: ['Zo gaat het het hele jaar', 'Zo ging het op die zaterdagen', 'Zo werkt elke verkoper altijd'],
      juist: 1,
      uitleg: 'Je data gaan over wat je zag, op de momenten dat je keek. Voor andere periodes of voor één persoon heb je meer of andere observaties nodig.',
    },
  ],
  waarom: [
    'Tellen is geen doel op zich. Een manager wil weten wat er moet gebeuren: welk filiaal training nodig heeft, en waarin.',
    'Data onderbouwen sommige beslissingen wel en andere niet. Wie dat verschil ziet, voorkomt dat een observatie wordt gebruikt voor iets wat ze niet kan dragen, zoals het beoordelen van één medewerker.',
  ],
  kijk: [
    {
      type: 'video', start: 2870, end: 2928, titel: 'De lessen',
      samenvatting: [
        'Gedrag coderen zet wat mensen doen en zeggen om in getallen die je kunt analyseren.',
        'Het codeerschema beschrijft waarneembaar gedrag, met een basis in de theorie.',
        'Codeurs moeten betrouwbaar coderen voordat het echte coderen begint. Dat kost veel tijd.',
        'Drie dingen helpen daarbij: een helder codeboek, samen kalibreren (eerst los coderen, dan samen, dan de verschillen oplossen) en blijven letten op drift.',
        'En: geduld.',
      ],
    },
    { type: 'still', bestand: '17-48m40-takeaway.webp', sec: 2920, alt: 'Dia met de lessen: gedrag omzetten in getallen, waarneembaar gedrag met een theoretische basis, betrouwbaarheid vóór het coderen, en drie aandachtspunten: een helder codeboek, kalibreren in de groep en drift voorkomen.', bijschrift: 'De lessen van Chen op één dia.' },
    {
      type: 'video', start: 3086, end: 3315, titel: 'Kan AI het coderen overnemen?',
      samenvatting: [
        'Iemand vraagt of AI kan helpen bij het coderen. Chen heeft dat voor deze data zelf nog niet geprobeerd.',
        'Iemand van Class Lab beschrijft de werkwijze daar. Eerst een codeboek, dan twee mensen die betrouwbaar coderen. Dan laat je de AI dezelfde set coderen en vergelijk je de uitkomsten. Pas als de AI even betrouwbaar is, mag die verder coderen.',
        'Video’s met kinderen gaan niet naar een AI. De laptop voor het coderen is zelfs nooit online.',
        'Taal zit vol nuances. Chen twijfelt of je een codeboek zo precies kunt schrijven dat een AI ze allemaal vangt.',
      ],
    },
    { type: 'tekst', html: '<p><strong>Voor je eigen project:</strong> wil je een AI laten meecoderen, volg dan dezelfde stappen. Eerst je codeboek, dan twee mensen die de drempel halen, dan de AI dezelfde gesprekken laten coderen en de kappa berekenen. Opnames met herkenbare mensen gaan niet naar een online AI.</p>' },
  ],
  doe: [
    { type: 'tekst', html: '<p>Een student observeerde adviesgesprekken in de vier filialen van de fietsenwinkel, op twee zaterdagen in maart. Live, met het codeboek uit station 3. Een tweede codeur codeerde 20 % van de gesprekken ook: κ = 0,78. Niet elk filiaal is even lang geobserveerd. Daarom staan de tellingen per uur.</p><p>Kies bij elke beslissing of de data die onderbouwen.</p><p><strong>Klaar als:</strong> je alle zes de beslissingen hebt beoordeeld.</p>' },
    { type: 'besluit' },
  ],
  jeKuntNu: 'Je kunt nu tellingen eerlijk vergelijken, per uur, en aangeven welke beslissingen je observatiedata wel onderbouwen en welke niet.',
  mijnProject: [
    {
      type: 'open',
      veld: 'beslissing',
      vraag: 'Welke beslissing moet jouw observatie onderbouwen? En wat kun je er níet mee zeggen?',
      voorbeeld: 'De observatie moet laten zien of een training in doorvragen nodig is, en in welk filiaal. De regiomanager beslist. Ik vergelijk de filialen per uur. Ik kan er niets mee zeggen over één verkoper, niet over omzet, en niet over andere maanden dan die ik observeer.',
      checklist: [
        'Je noemt één beslissing en wie die neemt.',
        'Je zegt welke uitkomst tot welke keuze leidt.',
        'Je noemt minstens twee dingen die je data níet kunnen zeggen, zoals iets over één persoon, een oorzaak of een andere periode.',
        'Je vergelijkt eerlijk, bijvoorbeeld per uur of per gesprek.',
      ],
    },
  ],
};

// Station 0: Zeggen is geen doen. Waarom observeren, en wanneer past het?

const METHODEN = ['Observatie', 'Interview', 'Enquête'];

const VORMEN = '<p><strong>Vier vormen van observatie.</strong> Je kunt observeren met vooraf vastgelegde codes of zonder (gestructureerd of open). En je kunt van buitenaf kijken of zelf meedoen (niet-deelnemend of deelnemend).</p>'
  + '<div class="tabel-wrap"><table class="vormen"><thead><tr><th scope="col"><span class="sr-only">Vorm</span></th><th scope="col">Niet-deelnemend: je kijkt van buitenaf</th><th scope="col">Deelnemend: je doet zelf mee</th></tr></thead><tbody>'
  + '<tr><th scope="row">Gestructureerd: je telt vooraf vastgelegd gedrag met een codeboek</th><td class="is-hier"><strong>Deze tutorial.</strong> Je telt vanaf een vaste plek in de winkel hoe vaak verkopers doorvragen.</td><td>Je werkt een dag mee als verkoper en turft na elk gesprek wat je collega deed.</td></tr>'
  + '<tr><th scope="row">Open: je schrijft op wat opvalt</th><td>Je kijkt een middag rond en maakt aantekeningen over wat er in de winkel gebeurt.</td><td>Je werkt een maand mee en houdt een dagboek bij.</td></tr>'
  + '</tbody></table></div>'
  + '<p>Deze tutorial gaat over gestructureerde observatie van buitenaf: je telt gedrag, zodat je kunt vergelijken. Open observatie helpt om eerst te verkennen welk gedrag ertoe doet.</p>';

export default {
  id: 's0',
  nodig: ['Koptelefoon of oordopjes'],
  kenJeDitAl: [
    {
      vraag: 'Een manager vraagt verkopers in een enquête hoe vaak ze doorvragen. Wat is het risico?',
      opties: ['Geen: verkopers weten zelf het best wat ze doen', 'Wat verkopers zeggen te doen, kan verschillen van wat ze doen', 'Een enquête levert altijd te weinig antwoorden op'],
      juist: 1,
      uitleg: 'Mensen schatten hun eigen gedrag vaak anders in dan het is. Wil je weten wat ze doen, dan kijk je.',
    },
    {
      vraag: 'Wat is gestructureerde observatie?',
      opties: ['Je kijkt rond en schrijft op wat opvalt', 'Je telt gedrag dat je vooraf in een codeboek hebt vastgelegd', 'Je vraagt mensen na afloop wat ze deden'],
      juist: 1,
      uitleg: 'Bij gestructureerde observatie leg je vooraf vast welk gedrag je telt en hoe je het herkent. Daardoor kun je tellen en vergelijken.',
    },
    {
      vraag: 'Wanneer past een interview beter dan observatie?',
      opties: ['Als je wilt weten waarom iemand iets doet', 'Als je wilt weten hoe vaak iemand iets doet', 'Als je gedrag van veel mensen wilt vergelijken'],
      juist: 0,
      uitleg: 'Een reden of een mening zie je niet; die vraag je. Gedrag, en hoe vaak het voorkomt, zie je wel.',
    },
  ],
  waarom: [
    'Vraag verkopers of ze klantgericht werken, en bijna iedereen zegt ja. Kijk je mee in de winkel, dan zie je wat ze echt doen. Mensen doen vaak iets anders dan ze zeggen.',
    'Neemt een manager een besluit op basis van wat er gezegd wordt, dan kan het misgaan. Er komt een training voor een probleem dat er niet is, of juist geen training voor een probleem dat er wel is.',
  ],
  kijk: [
    {
      type: 'video', start: 579, end: 749, titel: 'Wat de observaties lieten zien',
      samenvatting: [
        'Chen wilde weten welke manier van lesgeven in natuurwetenschappen samenhangt met wat jonge kinderen leren.',
        'Getrainde onderzoekers observeerden leerkrachten in de klas. Ze scoorden het lesgeven op acht onderdelen, met een bestaande beoordelingsschaal.',
        'Twee onderdelen hingen samen met wat kinderen leerden: het doorlopende gesprek met kinderen (extended conversation) en nagaan wat kinderen geleerd hebben. Dat patroon kwam drie jaar op rij terug.',
        'Juist het doorlopende gesprek, een van de twee onderdelen die samenhingen met wat kinderen leerden, kwam het minst voor.',
      ],
    },
    { type: 'still', bestand: '02-11m40-rq2-average-scores-eight-domains.webp', sec: 700, alt: 'Staafdiagram met de gemiddelde scores van leerkrachten op acht onderdelen van lesgeven. Extended Conversation scoort het laagst, rond 2,6, en heeft een sterretje: het hangt samen met wat kinderen leren.', bijschrift: 'Het doorlopende gesprek (Extended Conversation) scoort het laagst, terwijl het samenhangt met wat kinderen leren (sterretje).' },
    { type: 'tekst', html: '<p><strong>Wat heb je hieraan?</strong> Dat het doorlopende gesprek zo weinig voorkwam, zag Chen doordat onderzoekers keken en scoorden. In een bedrijf werkt dat net zo. Wie telt wat er gebeurt, ziet welk gedrag weinig voorkomt, terwijl het er wel toe doet.</p>' },
    { type: 'tekst', html: VORMEN },
  ],
  doe: [
    { type: 'tekst', html: '<p><strong>Eerst een nulmeting.</strong> Hoe zou jij het nu aanpakken? Er is geen goed of fout. Aan het eind beantwoord je dezelfde vraag opnieuw, en zie je wat je geleerd hebt.</p>' },
    { type: 'open', veld: 'nulmeting', vraag: 'Hoe zou jij meten of de verkopers in een winkel klantgericht zijn? Schrijf drie zinnen.' },
    { type: 'tekst', html: '<p><strong>Welke methode past?</strong> Lees de drie situaties uit de fietsenwinkel. Kies bij elke situatie de methode die het best past.</p><p><strong>Klaar als:</strong> je bij alle drie de situaties een methode hebt gekozen.</p>' },
    {
      type: 'keuze',
      // Alleen 'bewaard' zeggen als er een nulmeting is, en de browser hem echt bewaart.
      slot: (store) => {
        if (!String(store.get('answers.nulmeting') ?? '').trim()) {
          return 'Heb je je nulmeting nog niet geschreven? Doe dat nu, bovenaan bij Doe. Aan het eind vergelijk je die met je nieuwe antwoord.';
        }
        return store.persistent ? 'Je nulmeting is bewaard. Je vindt die terug in je observatieplan.'
          : 'Je nulmeting staat in je observatieplan zolang je deze pagina openhoudt.';
      },
      items: [
        {
          tekst: 'Een filiaalmanager wil weten hoe vaak verkopers doorvragen als een klant iets vraagt.',
          opties: METHODEN, juist: 0,
          uitleg: 'Hoe vaak iemand iets doet, zie je het best door te kijken en te tellen. Vraag je het de verkopers, dan hoor je wat ze denken dat ze doen.',
        },
        {
          tekst: 'De directie wil weten waarom twee ervaren verkopers dit jaar zijn vertrokken.',
          opties: METHODEN, juist: 1,
          uitleg: 'Een reden zie je niet. Die vraag je, en in een gesprek kun je doorvragen. Het gaat om twee mensen, dus een enquête heeft weinig zin.',
        },
        {
          tekst: 'Marketing wil weten hoe tevreden klanten van alle vier de filialen zijn over de service.',
          opties: METHODEN, juist: 2,
          uitleg: 'Tevredenheid is een oordeel van de klant, en je wilt het van veel klanten weten. Met een korte enquête bereik je veel mensen met weinig moeite.',
        },
      ],
    },
  ],
  jeKuntNu: 'Je kunt nu uitleggen waarom mensen iets anders kunnen doen dan ze zeggen. En je kunt kiezen wanneer observatie beter past dan een interview of een enquête.',
  mijnProject: [
    {
      type: 'open',
      veld: 'begrip',
      vraag: 'Welk begrip wil je in je eigen project meten? En waarom past observatie daarbij beter dan een interview of een enquête?',
      voorbeeld: 'Ik wil weten hoe klantgericht de verkopers in onze vier filialen zijn. Verkopers vinden zichzelf bijna altijd klantgericht, dus vragen levert weinig op. Door mee te kijken zie ik hoe vaak ze doorvragen en samenvatten. De uitkomst bepaalt of en waar we een training geven.',
      checklist: [
        'Je noemt één begrip dat je wilt meten.',
        'Je zegt waarom vragen niet genoeg is: mensen weten het niet, zeggen het niet, of beschrijven het anders dan het is.',
        'Je noemt gedrag dat je kunt zien.',
        'Je zegt welke beslissing van de uitkomst afhangt.',
      ],
    },
  ],
};

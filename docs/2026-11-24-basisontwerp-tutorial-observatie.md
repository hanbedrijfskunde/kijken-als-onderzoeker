# Tutorial *Kijken als onderzoeker*: ontwerp (v0.3)

24-11-2026. Status: **goedgekeurd** door de opdrachtgever (24-11-2026).
- v0.1 was de outline.
- v0.2 verwerkt het besluit *zelfstudie, het plan blijft bij de student*.
- v0.3 verwerkt de bouwerscheck en drie besluiten van de opdrachtgever: publicatie via GitHub Pages, geen vaste opzet voor de onderzoeksopzet, en de HAN-huisstijl met logo.

## 1. Waarom deze tutorial

Studenten Bedrijfskunde onderzoeken in hun projecten vooral wat mensen *zeggen*: via interviews en enquêtes. Wat mensen *doen*, wijkt daar vaak van af. Een manager zegt dat het team klantgericht is; een middag kijken op de winkelvloer laat iets anders zien. Gestructureerde observatie maakt gedrag telbaar, en dus vergelijkbaar en controleerbaar. Daarmee onderbouw je een beslissing beter dan met een indruk.

De video van Shiyi Chen laat dat in één onderzoekslijn zien. Observaties in 29 klassen toonden dat het gedrag dat leerkrachten het minst vertoonden (doorpraten met kinderen) het sterkst samenhing met wat kinderen leerden. Het vervolgonderzoek richt zich daarom op precies dat gedrag. De video legt daarnaast uit hoe je een codeerschema opzet, codeurs traint en betrouwbaarheid vaststelt. Dat is het hart van de methode.

## 2. Doelgroep en inzet

- **Doelgroep:** studenten HBO Bedrijfskunde vanaf jaar 2. Ze kennen interviews en enquêtes, en weten wat een onderzoeksvraag en een onderzoeksopzet zijn. Gestructureerde observatie kennen ze niet.
- **Inzet:** zelfstudie, zonder docent, zonder inleveren en zonder cijfer.
- **Studielast:** ongeveer 3 uur, in zes stations van 20 tot 30 minuten. Stoppen en later verdergaan kan op elk moment.
- **Wat de student overhoudt:** een observatieplan van één pagina voor het eigen project. Het plan blijft bij de student: kopiëren naar Word, printen of opslaan als pdf.

## 3. Leerdoelen (vier)

1. **Operationaliseren.** Je vertaalt een begrip dat je niet direct ziet, zoals klantgerichtheid of samenwerking, naar gedrag dat je wel ziet, en legt dat vast in een codeboek.
2. **Coderen.** Je codeert een video- of gespreksfragment met een codeboek.
3. **Betrouwbaarheid.** Je bepaalt de overeenstemming met een tweede codeur (percentage en Cohen's kappa) en gebruikt de verschillen om je codeboek scherper te maken.
4. **Van data naar besluit.** Je laat zien welke bedrijfskundige beslissing je observatiedata onderbouwen, en welke niet.

## 4. Doelen, niet-doelen, anti-doelen

**Doelen.** De vier leerdoelen. Elke student, ook zonder eigen project, eindigt met een ingevuld observatieplan.

**Niet-doelen.**
- Geen statistiekcursus. Met de hand reken je alleen Cohen's kappa uit (twee codeurs, nominale codes). Fleiss' kappa, gewogen kappa, ICC en Krippendorff's alfa staan als verdieping, met de tabel uit de video.
- Geen kwalitatieve observatie (participerend, etnografisch, open coderen). Station 0 plaatst gestructureerde observatie in één overzicht naast de andere vormen; daar blijft het bij.
- Geen leeromgeving-koppeling, geen accounts, geen docentweergave, geen dashboard.

**Anti-doelen** (dan is het mislukt, ook als alles werkt):
- De student besteedt aandacht aan navigeren en uitzoeken in plaats van aan de stof.
- De student moet het hele webinar van een uur kijken.
- Het voelt als een cursus kinderontwikkeling. De video is het voorbeeld; de oefeningen gaan over bedrijven.
- De student weet aan het eind wat kappa is, maar heeft geen plan voor het eigen project.

## 5. Randvoorwaarden

- **Privacy.** Er gaat geen data de browser uit: geen formulierverzending, geen analytics. Antwoorden en voortgang staan alleen in de browser van de student (`localStorage`). Werkt dat niet, bijvoorbeeld in een ingesloten frame of in privémodus, dan werkt de pagina gewoon door; alleen het bewaren tussen sessies valt weg, en de pagina meldt dat één keer.
- **Video.** Engelstalig, ingesloten van YouTube met begin- en eindtijd per fragment. Ondertiteling standaard aan. Elk fragment krijgt een Nederlandse samenvatting, zodat wie het Engels lastig vindt de draad houdt.
- **Kind in beeld.** Het oefenfilmpje (station 2) toont een jong kind. Het wordt alleen vanaf YouTube ingesloten, waar het kanaal het zelf publiceert. Stills met het kind (07, 08) worden niet gebruikt.
- **Stills.** Alleen dia's, als webp van maximaal 1280 px breed, met bronvermelding en een link naar het moment in de video.
- **Plek.** Een eigen projectmap, `~/Projects/observatie-tutorial/`, los van de ai-wiki.
- **Openen.** De pagina wordt via https geopend, in een eigen tabblad. Als lokaal bestand werken de YouTube-fragmenten niet (YouTube weigert insluiten zonder herkomstadres). In een frame van de leeromgeving kunnen de videospeler of de opslag geblokkeerd worden. Een link in de leeromgeving opent de pagina daarom in een nieuw tabblad.
- **Publicatie** (besluit opdrachtgever). De pagina staat openbaar op GitHub Pages, in een eigen openbare repository. Zoekmachines nemen de pagina niet op (`noindex`, geen sitemap). In de repository staan alleen de pagina en de 12 gepubliceerde stills als webp. Het transcript en de originele PNG's in `raw/` blijven lokaal (`.gitignore`). Het GitHub-account of de organisatie wordt bij de bouw bevestigd, vóórdat er iets wordt aangemaakt.
- **Bronvermelding.** Elke still krijgt een regel met spreker, kanaal en titel van de video, plus een link naar het moment. In de voettekst staat de video als bron.
- **Huisstijl HAN** (besluit opdrachtgever). Het voorbeeld is de huisstijl van het project `rl-bedrijfskunde` (`~/Projects/rl-bedrijfskunde/assets/docs.css`, kleuren volgens dat bestand opgehaald van han.nl):
  - **Kleuren:** magenta `#e50056` primair, `#b70045` donker (links, tekst op wit), `#f7b2cc` licht, `#d91e57` in het logo. Grijzen en de groene en oranje statuskleuren komen uit hetzelfde bestand.
  - **Lettertype:** Avenir Next, met systeemletters als terugval. Koppen in Avenir Next Condensed.
  - **Logo:** `~/Projects/rl-bedrijfskunde/assets/han-logo.svg`, gekopieerd naar `assets/`. Linksboven in de kopbalk en in de voettekst, ook als favicon. Alt-tekst: *HAN University of Applied Sciences*.
  - Oudere projecten (`operational-excellence-course`, `ai-reader-writer`) gebruiken magenta `#e5007d`. Dit ontwerp volgt `#e50056`, de meest recente en op han.nl gecontroleerde waarde.
  - Magenta `#e50056` op wit haalt ongeveer 4,7 : 1 en is dus genoeg voor gewone tekst. Voor links en kleine tekst wordt de donkere variant gebruikt.
- **Geen publicatie als Claude-artifact.** Met het HAN-logo erop wordt de pagina alleen via GitHub Pages gepubliceerd, onder het account van de opdrachtgever. Tijdens de bouw wordt lokaal bekeken.
- **Apparaten.** Werkt op laptop en telefoon (vanaf 360 px breed), met toetsenbord te bedienen, voldoende contrast.
- **Taal.** Nederlands, je-vorm, korte zinnen, in de taal van een tweedejaars student. Vaktermen worden de eerste keer uitgelegd (*codeboek*, *codeur*, *interbeoordelaarsbetrouwbaarheid*).

## 6. Gekozen aanpak

**Eén zelfstandige webpagina** (`index.html` plus een map `assets/` met stills), gewone HTML, CSS en JavaScript, zonder bouwstap of framework. Gepubliceerd via GitHub Pages; de leeromgeving linkt ernaar.

Overwogen en verworpen:
- **H5P Interactive Book in de leeromgeving.** Vragen op momenten in de video zijn mogelijk, maar een eigen klikteller of kappa-rekenhulp niet, en je bent afhankelijk van een H5P-server.
- **Losse pagina's met quizzen in de leeromgeving.** Meer klikken en navigeren; een teller of rekenhulp is er niet zonder extra tools.
- **Een diaserie of pdf.** Geen directe feedback, dus Mastery zakt.
- **De hele video met een werkblad.** Een uur Engelstalig webinar, inclusief vragenronde en veel kinderontwikkeling. Te zwaar voor KISS.

## 7. Opbouw

### 7.1 De pagina

- **Bovenaan:** een stationskaart met zes stations plus het eindproduct. Per station: titel, duur, status (*nog niet*, *bezig*, *klaar*, *overgeslagen*). Een klik opent het station. De kaart is vanuit elk station met één klik terug te halen.
- **Aanbevolen route:** 0 → 5 op volgorde, aangegeven op de kaart. Elk station werkt ook los: waar een station iets van een eerder station gebruikt, is er een voorbeeld om mee verder te gaan.
- **Onderaan de kaart:** *Mijn observatieplan* (het eindproduct) en *Opnieuw beginnen* (wist alles na bevestiging).

### 7.2 Vaste opbouw van elk station

Bovenaan elk station: duur, wat je nodig hebt (bijvoorbeeld *koptelefoon*, *pen en papier*), en *Ken je dit al?*: twee of drie vragen. Wie ze allemaal goed heeft, kan het station als *overgeslagen* markeren en direct naar *Mijn project*.

Daarna vijf blokken, altijd in deze volgorde:

| Blok | Inhoud | Beantwoordt voor de student |
|---|---|---|
| **Waarom** | 2–3 regels, met een bedrijfskundig voorbeeld | Waar let ik op, en waarom doe ik dit? |
| **Kijk** | videofragment, 1–2 stills, Nederlandse samenvatting van 3–5 regels | Wat moet ik weten? |
| **Doe** | één oefening, met een duidelijk eindpunt | Wat doe ik, en wanneer ben ik klaar? |
| **Check** | directe feedback, afgesloten met *Je kunt nu …* | Waaraan zie ik dat ik goed zit? |
| **Mijn project** | één beslissing voor het eigen onderzoek, met een voorbeeld ernaast | Wat neem ik mee? |

Er is geen docent, dus de vraag *Waarvoor vraag ik de docent?* krijgt een vast antwoord in de voettekst: *Kom je er niet uit? Bekijk het voorbeeld bij Mijn project, of neem je vraag mee naar je projectbegeleider.*

**Feedback zonder docent.**
- Gesloten oefeningen (sorteren, turven, coderen, kiezen) hebben een sleutel en per item uitleg. De uitleg gaat over wat de student deed (*Je codeerde beurt 4 als X; de sleutel zegt Y, omdat …*).
- Open antwoorden (nulmeting, *Mijn project*) krijgen geen automatisch oordeel. De student vergelijkt het eigen antwoord met een modelantwoord en een checklist van drie tot vijf punten, en vinkt af wat erin zit.

**Het lopende voorbeeld** is een fictieve fietsenwinkel met vier filialen. Het begrip dat gemeten wordt: *klantgerichtheid van verkopers*. Wie nog geen eigen project heeft, gebruikt dit voorbeeld ook bij *Mijn project*.

### 7.3 De stations

Tijden verwijzen naar de video. De nummers van de stills staan in `raw/videos/…stills.md`.

**Station 0 · Zeggen is geen doen** (20 min)
- *Waarom:* wat mensen zeggen en wat ze doen, verschilt. Een beslissing op basis van wat gezegd wordt, kan dan misgaan.
- *Kijk:* 9:39–12:29. Observaties in klassen laten zien dat het minst vertoonde gedrag het meest bijdraagt aan het leren (still 02). Daarna een overzicht van vier vormen van observatie (gestructureerd of open, deelnemend of niet), met de plek van deze tutorial erin.
- *Doe:* nulmeting. *Hoe zou jij meten of de verkopers in een winkel klantgericht zijn?* In 3 zinnen. Dan drie situaties: past hier observatie, een interview of een enquête?
- *Check:* feedback op de drie situaties. De nulmeting wordt bewaard en komt terug in het eindproduct.
- *Mijn project:* welk begrip wil je meten, en waarom past observatie (beter) dan een interview of enquête?

**Station 1 · Wat ga je zien?** (25 min)
- *Kijk:* 14:51–21:41. Metacognitie is niet te zien, en jonge kinderen kunnen er niet over vertellen; daarom observeren. Van theorie naar codeerschema (stills 04, 05) en een uitsnede van het codeboek (still 06).
- *Doe:* tien beschrijvingen van gedrag van verkopers in de fietsenwinkel. Bij elke beschrijving kiest de student: *waarneembaar* of *niet waarneembaar*. Herschrijf er daarna twee die niet waarneembaar zijn (bijvoorbeeld *de verkoper is betrokken*) tot gedrag dat je wel ziet.
- *Check:* feedback per beschrijving; modelantwoorden voor het herschrijven.
- *Mijn project:* drie gedragsindicatoren en één volledige codeboekregel: naam, definitie, wanneer wel, wanneer niet, voorbeeld.

**Station 2 · Zelf coderen** (25 min)
- *Kijk:* 21:41–23:28: de vier codes uitgelegd. Daarna de oefenclip, 23:29–25:10.
- *Doe:* de student turft met een klikteller terwijl de clip loopt. Er zijn vier knoppen (*eigen bouwwerk bekijken*, *strategie wisselen*, *plan bekijken*, *afgeleid*) en één knop om de laatste klik ongedaan te maken. Opnieuw proberen kan.
- *Check:* de eigen telling naast de sleutel uit de video (1 · 7 · 2 · 1), met uitleg per code bij te veel of te weinig. Dan de bespreking, 25:14–28:45: naar de moeder kijken telt níet als afleiding, omdat het basisgedrag van dit kind is. De les: een codeboek heeft beslisregels nodig.
- *Mijn project:* de observatie-eenheid (elke gebeurtenis, of vaste tijdvakken), plek en duur. Eén beslisregel. Hoe je vastlegt, met twee routes:
  - **Live coderen op een codeerformulier** (standaard): je turft ter plekke en neemt niets op. Er worden geen beelden of geluid van klanten of medewerkers bewaard.
  - **Opnemen en achteraf coderen**: alleen met toestemming van iedereen die herkenbaar op de opname staat en van de organisatie.

  Bij beide routes: hoe regel je toestemming van wie je observeert? Het modelantwoord verwijst naar de privacyregels van de opleiding en de opdrachtgever. De tutorial geeft zelf geen juridisch advies.

**Station 3 · Gesprekken als data** (30 min)
- *Kijk:* 43:23–47:50. Gesprekken vastleggen en uitschrijven, de eenheid van analyse kiezen, een bestaand codeerschema aanpassen, een pilot op 15 % van de transcripten (stills 14, 15, 16).
- *Doe:* de student codeert een verzonnen gesprek tussen een verkoper en een klant in de fietsenwinkel: 15 beurten van de verkoper, elk met precies één van vijf codes. Mini-codeboek van vijf codes, elk met definitie, wanneer wel, wanneer niet en een voorbeeld. De instructie zegt eerst het codeboek en de beslisregel door te nemen en pas daarna te coderen (zie §13).
- *Check:* feedback per beurt, met uitleg. De codes van de student worden bewaard voor station 4.
- *Mijn project:* welk bestaand codeerschema kun je aanpassen, en welke eenheid kies je?

**Station 4 · Klopt het?** (30 min)
- *Kijk:* 29:09–40:26. Cohen's kappa (still 10), de verwarringsmatrix (still 11), vijf stappen naar betrouwbaarheid (still 12). De tabel met soorten maten (still 13) staat als verdieping. Software als tekst: Observer XT (betaald, uit de video), BORIS (gratis), MAXQDA, ELAN, Datavyu, of een spreadsheet voor wie live codeert.
- *Drempel:* de student leert de banden van Landis & Koch. Als vuistregel voor een studentproject: vanaf .60 bruikbaar, vanaf .80 goed. De .85 uit de video is de strenge norm voor wetenschappelijk onderzoek.
- *Doe, deel 1:* kappa met de hand. Een uitgewerkte tabel van twee codeurs met twee codes en 20 eenheden. De student berekent pₒ, pₑ en κ, en vult ze in. Hulp in stappen voor wie vastloopt.
- *Doe, deel 2:* de rekenhulp zet de codes van de student uit station 3 naast die van een ervaren codeur (de sleutel), maakt de verwarringsmatrix van 5 × 5 en berekent pₒ, pₑ en κ, met de band van Landis & Koch. Wie station 3 oversloeg, gebruikt de codes van een voorbeeldstudent.
- *Optioneel met een studiegenoot:* die codeert hetzelfde gesprek op een eigen apparaat. De student voert de 15 codes van de studiegenoot in, en de rekenhulp vergelijkt die met de eigen codes.
- *Check:* het moment dat telt. Laat zien dat twee codeurs per code hetzelfde totaal kunnen hebben en het toch oneens zijn over welke beurten het waren. Turven alleen zegt dus niets over betrouwbaarheid; daarom codeer je per eenheid. De verwarringsmatrix wijst de code aan waar het meest over verschild wordt: welke regel in het codeboek moet scherper?
- *Mijn project:* wie is je tweede codeur, welk deel codeert die dubbel (bijvoorbeeld 20 %), en welke drempel houd je aan? Hoe voorkom je dat je codeert op gevoel naarmate je verder bent (in de video heet dat *drift*)?

**Station 5 · Van turven naar besluit** (25 min)
- *Kijk:* 47:50–48:45, de lessen (still 17). 51:43–55:10: kan AI het coderen overnemen? Het stappenplan uit de vragenronde: eerst een codeboek, dan twee mensen die de drempel halen, dan de AI dezelfde set laten coderen en vergelijken. Opnames met herkenbare mensen gaan niet naar een online AI.
- *Doe:* tellingen per uur van de vijf codes uit station 3, voor vier filialen. De student kiest welke van zes beslissingen de data onderbouwen. Sommige kunnen het wel (bijvoorbeeld *train filiaal C op doorvragen*), andere niet (*de verkoper met de laagste telling functioneert slecht*, *doorvragen verhoogt de omzet*, *dit geldt het hele jaar*).
- *Check:* feedback per beslissing: wat de data wel zeggen, en waarom niet meer.
- *Mijn project:* welke beslissing moet jouw data onderbouwen, en wat kun je er níet mee zeggen?

**Eindproduct · Mijn observatieplan**
- Alle *Mijn project*-antwoorden op één pagina, in de gangbare volgorde van een methodeparagraaf. De opleiding heeft geen vaste opzet (besluit opdrachtgever). De volgorde:
  1. begrip en waarom observatie;
  2. indicatoren en codeboekregel;
  3. eenheid, plek, duur, vastlegging en toestemming;
  4. codeerschema;
  5. betrouwbaarheid;
  6. beslissing en grenzen.

  De termen zijn de algemene termen uit deze tutorial.
- De nulmeting staat naast een nieuw antwoord op dezelfde vraag, zodat de student de eigen groei ziet.
- Een checklist met zes kenmerken van een goed plan.
- Knoppen: *Kopieer als tekst* (om te plakken in Word), *Print of bewaar als pdf*.

## 8. Hoe het ontwerp de criteria haalt

De meetlat is die van de skill `beoordeel-onderwijsontwerp` (PAMS + KISS). Zonder teams is het teamniveau n.v.t.; zonder docent ook KISS · Docent.

| Criterium | Mechanisme | Waaraan je ziet dat het werkt |
|---|---|---|
| **Mastery** | Elk station van voorbeeld via oefenen naar directe feedback. Zes momenten met bevestiging (*Je kunt nu …*). Nulmeting naast het eindantwoord. Hulp in stappen bij het kappa-rekenwerk | Teller, codeeroefening en rekenhulp geven meteen een uitkomst; het eindproduct toont groei |
| **Autonomy** | Stations in elke volgorde, met een voorbeeld voor wie een station oversloeg. *Ken je dit al?* om over te slaan. Niets telt mee, opnieuw proberen kan altijd. Eigen begrip en project; de fietsenwinkel voor wie nog geen project heeft. Verdieping inklapbaar. Stoppen en verdergaan wanneer je wilt | De statussen op de stationskaart |
| **Purpose** | Opent met een beslissing in een bedrijf. Het videoverhaal laat zien hoe observatie bepaalt waar een onderzoeksprogramma op inzet. Elk station levert een stap in het eigen plan; station 5 oefent expliciet van data naar besluit | Het plan is bruikbaar in de eigen onderzoeksopzet |
| **KISS** | Eén pagina, één ritme van vijf blokken, vier leerdoelen, één lopend voorbeeld. Geen login. Fragmenten starten en stoppen vanzelf. Werkt op een telefoon | Geen ontwerptaal of ontwerpersnotities op het scherm |
| **Social** | Bewust laag: zelfstudie. Optioneel samen coderen in station 4 | n.v.t. als vast mechanisme |

**Spanningen.**
- *Vrije volgorde en opbouw.* Station 4 bouwt op station 3. Opgelost met een aanbevolen route en een voorbeeld voor wie een station oversloeg.
- *Social en zelfstudie.* Betrouwbaarheid vraagt eigenlijk om twee mensen. De sleutel van een ervaren codeur is standaard de tweede codeur; een studiegenoot is optioneel. Dat is een bewuste keuze en geen vergissing.

## 9. Bronmateriaal

- Transcript: `raw/videos/behind-the-research-quantitative-observational-coding.md` (automatische ondertiteling, niet opgeschoond).
- Stills: `raw/images/behind-the-research-quantitative-observational-coding/`, met manifest. Gebruiken: 02, 04, 05, 06, 10, 11, 12, 13, 14, 15, 16, 17. Niet gebruiken: 07, 08 en 09 (kind in beeld), 01 en 03 (geen meerwaarde voor deze doelgroep).
- Alle gebruikte stills zijn bekeken. Still 14 is op 24-11 opnieuw gesneden, omdat de eerste versie een andere dia toonde.
- Bekende afwijking: volgens de automatische ondertiteling heeft elke categorie *two codes*; op de dia (still 06) staat 10 / 6 / 8 / 2. De dia is leidend.

## 10. Aan de bouwer

- Visuele vormgeving en iconen, binnen de HAN-huisstijl van §5.
- Exacte formuleringen, binnen de taalafspraken van §5. Laat de teksten voor publicatie nalopen met de skills `schrap-ai-taal` en `redigeer-nederlandse-tekst`.
- De verzonnen inhoud: de tien gedragsbeschrijvingen (station 1), het gesprek van 15 beurten met codeboek en sleutel (station 3), de kappa-oefentabel (station 4), de tellingen van vier filialen en zes beslissingen (station 5), de vragen voor *Ken je dit al?*, de modelantwoorden en checklists. Geen echte bedrijfsnamen of personen.
- Technische uitvoering: hoe fragmenten starten en stoppen, de opslag, het printen.

## 11. Bouwvolgorde

Eerst een werkend deel dat studenten kunnen proberen: de stationskaart, de opslag, en stations 3 en 4 met de codeeroefening en de kappa-rekenhulp. Dat is het risicovolste stuk. Twee of drie studenten proberen het uit voordat de andere stations gebouwd worden. Daarna stations 0, 1, 2 en 5 en het eindproduct.

## 12. Keuzes van de ontwerper na de bouwerscheck

Te controleren door de opdrachtgever:
- Live coderen zonder opname is de standaardroute in station 2; opnemen alleen met toestemming. De tutorial verwijst naar de privacyregels van opleiding en opdrachtgever en geeft zelf geen juridisch advies.
- De drempel voor een studentproject is vanaf .60 bruikbaar en vanaf .80 goed; de .85 uit de video heet de strenge norm.
- Still 09 valt af (kind in beeld); de software staat als tekst in station 4.
- De pagina opent altijd in een eigen tabblad via https.
- In de openbare repository staan alleen de pagina en de 12 webp-stills; `raw/` blijft lokaal. De pagina krijgt `noindex`.
- De HAN-huisstijl volgt `rl-bedrijfskunde` (magenta `#e50056`), niet de oudere `#e5007d`.
- De bouw begint met stations 3 en 4 als proefstuk.

## 13. Bevindingen proefstuk

- **2026-11-24, opdrachtgever.** Bij beurt 14 (“Je wilt dus een e-bike … Zal ik er een klaarzetten voor een proefrit?”) gekozen: *Samenvatten*; de sleutel zegt *Advies*. Oorzaak: het codeboek niet goed gelezen voor het coderen begon. Het codeboek zelf klopte (*Samenvatten*, wanneer niet: “een samenvatting die eindigt in een voorstel”). Aanpassing: de Doe-instructie van station 3 is nu een stappenlijst. Stap 1 is het codeboek doornemen, met de beslisregel. Stap 2 is pas coderen. Een korte uitleg zegt waarom: het codeboek is het meetinstrument.

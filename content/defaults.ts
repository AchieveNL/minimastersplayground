// All editable site text. DB rows override these per-section.
// Keys here = rows in Supabase `site_content` (key -> jsonb value).

export const contentDefaults = {
  banner: {
    text: "Wij werken met vaste speelsessies van 2,5 uur, waardoor de eindtijd voor iedereen gelijk is. Tickets reserveren = verplicht!",
  },

  hero: {
    infocards: [
      {
        title: "DE MINI MAATSCHAPPIJ",
        description:
          "Binnen minimasters stappen kinderen in een wereld die volledig is afgestemd op hun eigen belevingswereld. Zij krijgen de ruimte om spelenderwijs te ontdekken hoe vormen van samenwerking een belangrijke rol spelen in het dagelijks leven.",
      },
      {
        title: "HET EDUCATIEVE KARAKTER",
        description:
          "Ons doel is om kinderen te laten leren door te doen, door actief deel te nemen aan herkenbare beroepen. Zelfvertrouwen en creativiteit krijgen de ruimte omdat er geen goed of fout bestaat: elk kind mag op zijn eigen manier ontdekken.",
      },
      {
        title: "DE NIEUWE STANDAARD",
        description:
          "MiniMasters biedt een hoogwaardige, schone en begeleide speelomgeving waarin kinderen worden uitgedaagd om te ontdekken en te creeëren. Geen drukke of chaotische speelplekken, maar rust, overzicht en aandacht.",
      },
    ],
  },

  slider: {
    badge: "ONS AANBOD",
    cards: [
      { title: "Kinderfeestje", afbeelding: "/assets/slider/kinderfeestje.jpg" },
      { title: "Entreeticket", afbeelding: "/assets/slider/entreeticket.webp" },
      { title: "Zaalhuur", afbeelding: "/assets/slider/zaalhuur.jpg" },
      { title: "Scholen & BSO", afbeelding: "/assets/slider/scholen-bso.jpg" },
    ],
  },

  fotostrook: {
    afbeeldingen: [
      { afbeelding: "/assets/hero-imgs/img1.webp" },
      { afbeelding: "/assets/hero-imgs/img2.jpg" },
      { afbeelding: "/assets/hero-imgs/img3.jpg" },
      { afbeelding: "/assets/hero-imgs/img4.jpg" },
      { afbeelding: "/assets/hero-imgs/img5.webp" },
      { afbeelding: "/assets/hero-imgs/img6.jpg" },
    ],
  },

  tijdsloten: {
    badgeLeft: "ONZE TIJDSLOTEN",
    badgeRight: "LOYALTY PROGRAMMA",
    sessieText:
      "Elke sessie heeft een eigen naam, maar het aanbod aan activiteiten en het spelen blijft hetzelfde. Door te werken met sessies zorgen we voor minder drukte en meer speelplezier voor iedereen.",
    loyaltyIntro: "Spelen wordt nog leuker met sparen!",
    loyaltyHighlight: "Meld je aan en ontvang 10 punten cadeau.",
    loyaltyPunten: "Voor elke €1 die je besteedt, ontvang je 1 punt.",
    loyaltyWallet:
      "Spaar voor leuke beloningen en bewaar je QR-code eenvoudig in je e-wallet, zodat je je punten altijd bij de hand hebt.",
    knopAanmelden: "MELD JE AAN!",
    knopInloggen: "INLOGGEN",
  },

  openingstijden: {
    titel: "OPENINGSTIJDEN",
    rijen: [
      { label: "Ma t/m Vr:", tijd: "09:00–17:30" },
      { label: "Zaterdag:", tijd: "09:00–17:30" },
      { label: "Zondag:", tijd: "12:00–17:30" },
    ],
  },

  parkeren: {
    titel: "Parkeren kan bij:",
    garageNaam: "Parkeergarage Gouweplein - eerste 2 uur gratis",
    garageAdres: "Oude dreef, 2741 NJ Waddinxveen - 2 min lopen",
    garageGratis: "",
    wijk: "Parkeergelegenheid in de omliggende wijk - ca. 5 min lopen",
  },

  faq: {
    badge: "Veelgestelde vragen",
    categorieen: [
      {
        titel: "Nieuw bij Minimasters",
        items: [
          {
            vraag: "Hoe werken de arrangementen?",
            antwoord:
              "Wij werken dagelijks met drie vaste sessies van elk 2,5 uur.\n\nTussen iedere sessie hebben wij 30 minuten opruimtijd, zodat de ruimte weer schoon en klaar is voor de volgende groep kinderen. Op deze manier zorgen wij iedere sessie opnieuw voor een fijne en veilige speelervaring.\n\nElke sessie heeft een eigen naam, maar het aanbod aan activiteiten en het spelen is in elke sessie hetzelfde.",
          },
          {
            vraag: "Voor welk leeftijd is Minimasters?",
            antwoord:
              "Bij Minimasters is iedereen welkom, van jong tot oud! Onze activiteiten zijn wel in het bijzonder afgestemd op kinderen tot en met 8 jaar.",
          },
          {
            vraag: "Hoelaat moet ik aankomen?",
            antwoord:
              "We adviseren om ongeveer 5 minuten van tevoren aanwezig te zijn. Zo heb je rustig de tijd om je schoenen en jas op te bergen voordat je avontuur begint. Kom je eerder aan? Dan kan het zijn dat de deuren nog niet open zijn, omdat we tussen de speelsessies de ruimte nog aan het opruimen zijn.",
          },
          {
            vraag: "Waarom kopen ouders en verzorgers een kaartje?",
            antwoord:
              "Bij Minimasters werken we met een vast aantal plekken per sessie om het spelen voor iedereen veilig en prettig te houden. Omdat ouders en verzorgers ook aanwezig zijn in de speelruimte, vragen we voor hen eveneens een ticket. Zo blijft het overzichtelijk en kan iedereen volop genieten van het spelen.",
          },
          {
            vraag: "Mag ik schoenen aan tijdens het spelen?",
            antwoord:
              "Om hygiënische redenen is het niet toegestaan om schoenen te dragen tijdens het spelen. Daarom spelen we op sokken. Ben je je sokken vergeten? Geen probleem, je kunt sokken kopen bij de receptie.",
          },
        ],
      },
      {
        titel: "Tickets",
        items: [
          {
            vraag: "Zijn er tickets aan de deur verkrijgbaar?",
            antwoord:
              "Zolang een sessie niet is uitverkocht, kun je tickets kopen aan de deur. De huidige beschikbaarheid vind je op onze ticketpagina. Wil je verzekerd zijn van een tijdslot? Dan adviseren we je tickets online te bestellen.",
          },
          {
            vraag: "Kan ik mijn ticket nog annuleren?",
            antwoord:
              "Vooraf gekochte tickets worden niet terugbetaald. Je kunt je reservering wel tot 24 uur van tevoren kosteloos wijzigen naar een andere datum. Neem hiervoor contact op met de locatie.",
          },
          {
            vraag: "Wat gebeurt er als ik later aankom?",
            antwoord:
              "Geen probleem als je iets later aankomt. Houd er wel rekening mee dat de speelsessie een vaste eindtijd heeft. Deze eindtijd blijft hetzelfde voor alle spelers, ook als je later begint.",
          },
        ],
      },
      {
        titel: "Algemene vragen",
        items: [
          {
            vraag: "Mag ik eigen eten en drinken meenemen?",
            antwoord:
              "In ons café kun je terecht voor eten en drinken. Daarom vragen we je vriendelijk geen eigen consumpties mee te nemen. Babyvoeding en babyflessen zijn wel toegestaan.",
          },
          {
            vraag: "Mogen mijn kinderen alleen blijven?",
            antwoord:
              "Kinderen mogen niet zonder begeleiding bij Minimasters verblijven. Een ouder of verzorger dient te allen tijde aanwezig te zijn.",
          },
          {
            vraag: "Welke betaalmethoden worden er geaccepteerd?",
            antwoord:
              "Bij Minimasters is het alleen mogelijk met pin te betalen, contante betalingen worden niet geaccepteerd.",
          },
          {
            vraag: "Kan ik mijn kinderwagen meenemen?",
            antwoord:
              "Bij binnenkomst in de lobby vragen we je om de kinderwagen daar achter te laten. Vanwege hygiëne en de beperkte ruimte is het niet toegestaan om kinderwagens mee te nemen in de speelruimte en zitgedeelte.",
          },
          {
            vraag: "Kunnen mijn kinderen alleen blijven in Minimasters?",
            antwoord:
              "Nee, kinderen dienen altijd onder toezicht van hun ouders of verzorgers te blijven.",
          },
          {
            vraag: "Is er een borstvoeding ruimte?",
            antwoord:
              "Ja, wij hebben een privé ruimte waar je borstvoeding kunt geven.",
          },
          {
            vraag: "Verloren items?",
            antwoord:
              "We bewaren gevonden voorwerpen meestal 14 dagen, afhankelijk van de beschikbare ruimte. Ben je iets verloren? Mail ons dan naar hero@minimastersplayground.nl. Houd er rekening mee dat wij niet verantwoordelijk zijn voor verloren spullen en dat we niet kunnen garanderen dat het item wordt teruggevonden.",
          },
        ],
      },
    ],
  },

  footer: {
    nieuwsbriefPill: "JOIN THE COMMUNITY",
    nieuwsbriefTitel: "Schrijf je in voor ons nieuwsbrief",
    nieuwsbriefSubtitel:
      "Ontvang als eerste updates over onze opening, activiteiten en exclusieve acties!",
    knopAanmelden: "SIGN UP",
    succesBericht: "Bedankt voor je aanmelding!",
    foutBericht: "Er ging iets mis, probeer het opnieuw.",
    adres: "Marktstraat 38, 2741 NK Waddinxveen",
    reviews: [
      {
        naam: "Emily J.",
        rol: "Moeder van twee",
        tekst:
          "Alles ziet er veilig, creatief en super speels uit. Mijn zoontje vraagt nu al wanneer het open gaat!",
      },
      {
        naam: "Mark R.",
        rol: "Enthousiaste papa",
        tekst:
          "Dit is precies wat Waddinxveen nodig heeft. Een plek waar kinderen spelenderwijs leren, ontdekken en hun fantasie kunnen gebruiken.",
      },
      {
        naam: "Sophie M.",
        rol: "Toekomstige bezoeker",
        tekst:
          "Dit is precies wat kinderen nodig hebben: spelend leren! Ik kan niet wachten tot mijn dochter hier dokter, piloot of chef kan spelen en ondertussen zoveel leert.",
      },
      {
        naam: "David K.",
        rol: "Enthousiaste papa",
        tekst:
          "Eindelijk een plek waar fantasie en educatie samenkomen. Kinderen leren hier samenwerken, ontdekken beroepen en bouwen zelfvertrouwen op.",
      },
      {
        naam: "Laura V.",
        rol: "Lokale bewoner",
        tekst:
          "Rollenspel is één van de krachtigste manieren waarop kinderen leren. Dit concept maakt leren avontuurlijk, creatief en onvergetelijk.",
      },
      {
        naam: "Sharina",
        rol: "Bewuste ouder",
        tekst:
          "Aahh dit is fantastisch. Wel wat verder voor ons maar als ik de renners zie, ga ik zeker langskomen als het klaar is! Tot snel!",
      },
      {
        naam: "Roderick",
        rol: "Lokale bewoner",
        tekst:
          "Wat super leuk. Dit is precies wat wij nodig hebben hier in Waddinxveen. Dit gaan mijn meiden heel gaaf vinden. Succes met het realiseren van dit mooie project.",
      },
    ],
  },

  popup: {
    pill: "JOIN THE COMMUNITY",
    titel: "Meld je aan voor onze nieuwsbrief",
    subtitel:
      "Ontvang als eerste updates over onze opening, activiteiten en exclusieve acties!",
    placeholder: "E-mailadres*",
    knop: "MELD JE AAN!",
    knopBezig: "EVEN GEDULD...",
    succes: "Bedankt voor je aanmelding!",
    fout: "Er ging iets mis, probeer het opnieuw.",
  },

  // Juridische pagina's. `tekst` gebruikt een kleine opmaak-set:
  //   ### Kopje        -> tussenkopje
  //   - punt           -> opsomming
  //   3.4 tekst        -> genummerde regel (nummer zelf meetypen)
  //   **Term**: uitleg -> begrippenlijst
  //   **vet**          -> vetgedrukt
  //   lege regel       -> nieuwe alinea
  privacy: {
    titel: "PRIVACYVERKLARING",
    ondertitel: "Laatst gewijzigd: februari 2026",
    intro:
      "Minimasters Playground, gevestigd aan Marktstraat 38 t/m 42, 2741 NK te Waddinxveen, is verantwoordelijk voor de verwerking van persoonsgegevens zoals weergegeven in deze privacyverklaring.",
    infoblokTitel: "Contactgegevens",
    infoblokTekst:
      "Minimasters Playground\nE-mail: hero@minimastersplayground.nl\nKvK: 98235176",
    secties: [
      {
        titel: "Artikel 1. Verwerking van persoonsgegevens",
        tekst:
          "Minimasters Playground verwerkt op verschillende momenten persoonsgegevens. Hieronder leggen wij uit in welke situaties dit gebeurt, welke gegevens het betreft en wie daarvoor verantwoordelijk is.\n\n### Bezoek aan de website\nOp onze website maken wij gebruik van cookies en vergelijkbare technieken. Deze gebruiken wij om de website goed te laten functioneren, de gebruikservaring te verbeteren en het gebruik te analyseren. Meer informatie hierover vind je in onze cookieverklaring op onze website.\n\n### Reserveringen en ticketverkoop\nWanneer je een reservering maakt of tickets bestelt bij een vestiging van Minimasters Playground, kunnen onder andere de volgende persoonsgegevens worden verwerkt:\n\n- Voor- en achternaam\n- Adresgegevens (adres, postcode, woonplaats, land)\n- Telefoonnummer en e-mailadres\n- Geboortedatum\n- Datum van bezoek, evenement of kinderfeestje\n- Betaalgegevens en betaalwijze (zoals kortingscode, cadeaubon, lidmaatschap)\n- Voorkeuren voor het ontvangen van nieuwsbrieven\n- Accountgegevens (e-mailadres en wachtwoord)\n- Inloggegevens via sociale media (zoals gebruikersnaam)\n- Overige informatie die je zelf verstrekt, bijvoorbeeld via open tekstvelden of telefonisch contact\n\n### Bezoek zonder reservering\nWanneer je zonder reservering een vestiging bezoekt en ter plaatse een ticket koopt, worden uitsluitend noodzakelijke gegevens verwerkt. Medewerkers kunnen je vragen een legitimatiebewijs te tonen ter controle van bijvoorbeeld leeftijd. Er wordt geen kopie of scan gemaakt en er worden geen identiteitsgegevens vastgelegd.\n\n### Cameratoezicht\nIn onze vestigingen maken wij gebruik van camerabewaking. Dit doen wij ter bescherming van bezoekers, medewerkers en eigendommen en voor het vastleggen en afhandelen van incidenten.\n\n### Incidentenregistratie\nWanneer zich een incident voordoet of huisregels worden overtreden, wordt dit geregistreerd. Hierbij kunnen gegevens worden vastgelegd zoals:\n\n- Datum, tijd en locatie van het incident\n- Betrokken attractie of speeltoestel\n- Beschrijving van het voorval\n\nAfhankelijk van de situatie kunnen hierbij persoonsgegevens worden verwerkt. In uitzonderlijke gevallen kunnen – met uitdrukkelijke toestemming – bijzondere persoonsgegevens worden vastgelegd.\n\nOp grond van het Warenwetbesluit attractie- en speeltoestellen 2023 zijn wij verplicht ernstige incidenten te melden bij de Nederlandse Voedsel- en Warenautoriteit. Deze melding bevat uitsluitend geanonimiseerde gegevens.\n\nBij strafbare feiten zoals diefstal, geweld of opzettelijke schade kunnen persoonsgegevens worden geregistreerd en – indien noodzakelijk – gedeeld met opsporingsinstanties.\n\n### Contact\nWanneer je contact met ons opneemt, verwerken wij jouw naam, e-mailadres, telefoonnummer en overige gegevens die je met ons deelt in verband met jouw vraag of verzoek.",
      },
      {
        titel: "Artikel 2. Doeleinden van verwerking",
        tekst:
          "Minimasters Playground verwerkt persoonsgegevens onder meer voor de volgende doeleinden:\n\n- Het verwerken van reserveringen en betalingen\n- Het leveren van producten en diensten\n- Het aanbieden en beheren van accounts\n- Het aanbieden van loyaliteitsprogramma's en acties\n- Marketing en gerichte communicatie\n- Klantenservice en klachtenafhandeling\n- Beveiliging en incidentregistratie\n- Interne administratie en kostenbeheer\n- Handhaving van huisregels en voorwaarden\n- Voldoen aan wettelijke verplichtingen\n- Analyse en verbetering van dienstverlening\n- Websitebeheer en optimalisatie\n\nWij verwerken persoonsgegevens niet voor doeleinden die onverenigbaar zijn met bovenstaande doelen.",
      },
      {
        titel: "Artikel 3. Grondslagen voor verwerking",
        tekst:
          "Wij verwerken persoonsgegevens uitsluitend indien daarvoor een wettelijke grondslag bestaat, zoals:\n\n- Uitvoering van een overeenkomst (bij reserveringen en aankopen)\n- Gerechtvaardigd belang, bijvoorbeeld voor veiligheid, beveiliging en verbetering van dienstverlening\n- Wettelijke verplichting, zoals registratie van incidenten\n- Vitale belangen, bijvoorbeeld bij noodsituaties\n- Toestemming, bijvoorbeeld voor nieuwsbrieven of deelname aan een loyaliteitsprogramma\n\nWanneer verwerking plaatsvindt op basis van toestemming, kan deze te allen tijde worden ingetrokken.",
      },
      {
        titel: "Artikel 6. Minderjarigen",
        tekst:
          "Wij verwerken uitsluitend persoonsgegevens van kinderen indien dit noodzakelijk is voor veiligheid of incidentregistratie. Marketingactiviteiten richten zich uitsluitend op volwassen begeleiders.",
      },
      {
        titel: "Artikel 7. Bewaartermijn",
        tekst:
          "Wij bewaren persoonsgegevens niet langer dan noodzakelijk.\n\n- Reserveringsgegevens: in principe tot 2 jaar na het bezoek\n- Fiscale gegevens: tot 7 jaar (wettelijke bewaarplicht)\n- Gegevens in verband met juridische procedures: zolang noodzakelijk",
      },
      {
        titel: "Artikel 8. Toegang tot persoonsgegevens",
        tekst:
          "Toegang tot persoonsgegevens is beperkt tot medewerkers van de betreffende vestiging en bevoegde ondersteunende partijen.\n\nIndien wij externe dienstverleners inschakelen (bijvoorbeeld voor reserveringssystemen), sluiten wij verwerkersovereenkomsten waarin passende beveiligingsmaatregelen zijn vastgelegd.\n\nGegevens worden uitsluitend verstrekt aan autoriteiten indien wij daartoe wettelijk verplicht zijn.",
      },
      {
        titel: "Artikel 9. Verwerking buiten de EER",
        tekst:
          "Persoonsgegevens worden in beginsel verwerkt binnen de Europese Economische Ruimte (EER) of Zwitserland. Indien gebruik wordt gemaakt van dienstverleners buiten deze gebieden, zorgen wij voor passende waarborgen conform de geldende privacywetgeving.",
      },
      {
        titel: "Artikel 10. Geautomatiseerde besluitvorming",
        tekst:
          "Binnen ons loyaliteitsprogramma kunnen wij gebruikmaken van profilering om gepersonaliseerde aanbiedingen te doen. Deze profilering heeft geen juridische of vergelijkbare ingrijpende gevolgen. Je kunt hiertegen bezwaar maken of jouw toestemming intrekken.\n\nVerder passen wij geen geautomatiseerde besluitvorming toe.",
      },
      {
        titel: "Artikel 11. Beveiliging",
        tekst:
          "Wij nemen passende technische en organisatorische maatregelen om persoonsgegevens te beschermen tegen verlies of onrechtmatige verwerking. Dit omvat onder andere toegangsbeperking, beveiligde systemen en periodieke back-ups.",
      },
      {
        titel: "Artikel 12. Externe links",
        tekst:
          "Onze website kan links bevatten naar websites van derden. Wij zijn niet verantwoordelijk voor de inhoud of privacy praktijken van deze websites.",
      },
      {
        titel: "Artikel 13. Jouw rechten",
        tekst:
          "Op grond van privacywetgeving heb je onder meer de volgende rechten:\n\n- Recht op inzage\n- Recht op rectificatie\n- Recht op verwijdering\n- Recht op beperking\n- Recht op dataportabiliteit\n- Recht van bezwaar\n- Recht om toestemming in te trekken\n\nVerzoeken kunnen worden ingediend via het e-mailadres dat op onze website staat vermeld. Wij reageren binnen één maand, tenzij de wet een langere termijn toestaat.\n\nVoor minderjarigen onder 16 jaar kunnen ouders of wettelijke vertegenwoordigers deze rechten uitoefenen.",
      },
      {
        titel: "Artikel 14. Klachten",
        tekst:
          "Heb je een klacht over onze omgang met persoonsgegevens? Neem dan contact met ons op. Daarnaast kun je een klacht indienen bij de Autoriteit Persoonsgegevens.",
      },
      {
        titel: "Artikel 15. Wijzigingen",
        tekst:
          "Minimasters Playground kan deze privacyverklaring van tijd tot tijd aanpassen. De meest recente versie wordt gepubliceerd op onze website, met vermelding van de ingangsdatum. Bij ingrijpende wijzigingen zullen wij betrokkenen waar mogelijk actief informeren.",
      },
    ],
  },

  disclaimer: {
    titel: "DISCLAIMER",
    ondertitel: "Minimasters Playground",
    intro:
      "De informatie op de website en andere communicatie-uitingen van Minimasters Playground is uitsluitend bedoeld voor algemene informatiedoeleinden. Hoewel wij zorgvuldig proberen correcte en actuele informatie te verstrekken, kunnen wij de juistheid, volledigheid of actualiteit van de inhoud niet garanderen.",
    infoblokTitel: "",
    infoblokTekst: "",
    secties: [
      {
        titel: "Gebruik van de website en diensten",
        tekst:
          "Het gebruik van de website, de inhoud daarvan, en de faciliteiten van Minimasters Playground gebeurt volledig op eigen risico. Minimasters Playground is niet aansprakelijk voor directe of indirecte schade die kan voortvloeien uit het gebruik van de website, de inhoud daarvan, of het gebruik van de vestiging(en) en speeltoestellen.",
      },
      {
        titel: "Externe links",
        tekst:
          "Onze website kan links bevatten naar websites van derden. Minimasters Playground is niet verantwoordelijk voor de inhoud, functionaliteit, of het privacybeleid van deze externe websites. Gebruik van deze websites gebeurt op eigen risico.",
      },
      {
        titel: "Intellectuele eigendomsrechten",
        tekst:
          "Alle inhoud van de website, waaronder teksten, afbeeldingen, logo's, ontwerpen en software, is eigendom van Minimasters Playground of haar licentiegevers. Het is niet toegestaan om deze inhoud zonder voorafgaande schriftelijke toestemming te kopiëren, verspreiden of te gebruiken voor commerciële doeleinden.",
      },
      {
        titel: "Wijzigingen",
        tekst:
          "Minimasters Playground behoudt zich het recht voor om de inhoud van de website, de diensten en deze disclaimer op elk moment te wijzigen zonder voorafgaande kennisgeving.",
      },
      {
        titel: "Beperkingen aansprakelijkheid",
        tekst:
          "Minimasters Playground is niet aansprakelijk voor enige schade, van welke aard dan ook, die voortvloeit uit het gebruik van onze website, informatievoorziening, of faciliteiten, tenzij wettelijk anders vereist.",
      },
    ],
  },

  voorwaarden: {
    titel: "ALGEMENE VOORWAARDEN",
    ondertitel: "Minimasters Playground",
    intro: "",
    infoblokTitel: "Algemene gegevens",
    infoblokTekst:
      "Minimasters playground B.V.\nAdres: Marktstraat 38 t/m 42, 2741 NK te Waddinxveen\nE-mailadres: hero@minimastersplayground.nl\nKvK: 98235176",
    secties: [
      {
        titel: "Artikel 1. Definities",
        tekst:
          "1.1 In deze algemene voorwaarden hebben onderstaande begrippen de volgende betekenis:\n\n**A. Algemene Voorwaarden**: deze algemene bezoekersvoorwaarden.\n**B. Bezoeker**: de natuurlijke- of rechtspersoon die de gebouwen en/of terreinen van Minimasters Playground betreedt en/of op enigerlei wijze direct of indirect een Overeenkomst met Minimasters Playground sluit.\n**C. Bijzondere Voorwaarden**: huisregels, veiligheidsvoorschriften en andere aanvullende voorwaarden van Minimasters Playground.\n**D. Groep**: twee (2) of meer Bezoekers die Minimasters Playground in georganiseerd verband bezoeken.\n**E. Minimasters Playground**: een vestiging die is opgenomen op de Website en die door bezoeker wordt, of zal worden bezocht en/of waarmee Bezoeker een Overeenkomst aangaat.\n**F. Overeenkomst**: het geheel van afspraken tussen bezoeker en Minimasters Playground op grond waarvan Minimasters Playground diensten en/of producten levert (zoals het Toegangsbewijs, Algemene Voorwaarden, Bijzondere Voorwaarden).\n**G. Partijen**: Minimasters Playground en bezoeker, daaronder mede begrepen een Groep.\n**H. Toegangsbewijs**: een ticket, waaronder begrepen een rittenkaart, dat bezoeker de toegang verschaft tot Minimasters Playground tijdens openingstijden.\n**I. Website**: www.minimastersplayground.nl",
      },
      {
        titel: "Artikel 2. Toepasselijkheid",
        tekst:
          "2.1 Deze algemene voorwaarden zijn van toepassing op ieder bezoek aan Minimasters Playground, alsmede op alle aanbiedingen, reserveringen, offertes en overeenkomsten tussen Minimasters Playground en de bezoeker en/of groep, tenzij schriftelijk uitdrukkelijk anders is overeengekomen.\n2.2 De algemene voorwaarden worden voorafgaand aan of bij het aangaan van de overeenkomst aan de bezoeker beschikbaar gesteld. Dit kan door overhandiging bij binnenkomst, ter inzage op locatie of via digitale beschikbaarstelling.\n2.3 In geval van een telefonische of digitale reservering wordt de bezoeker erop gewezen dat de algemene voorwaarden ter inzage beschikbaar zijn bij Minimasters Playground en op verzoek kosteloos worden toegezonden. Daarnaast zijn de voorwaarden te raadplegen via de officiële website van Minimasters Playground.\n2.4 Door het betreden van Minimasters Playground en/of het aangaan van een reservering of overeenkomst verklaart de bezoeker zich akkoord met de toepasselijkheid en inhoud van deze algemene voorwaarden.\n2.5 Indien bepalingen uit de overeenkomst afwijken van deze algemene voorwaarden, prevaleren de bepalingen uit de overeenkomst. In geval van tegenstrijdigheid tussen informatie op de website, promotiemateriaal of uitingen op locatie en deze algemene voorwaarden, zijn de bepalingen van deze algemene voorwaarden leidend.\n2.6 Het niet of niet direct afdwingen van enige bepaling uit deze algemene voorwaarden door Minimasters Playground houdt geen afstand van recht in. Minimasters Playground behoudt zich te allen tijde het recht voor om volledige naleving van de overeenkomst en deze voorwaarden te verlangen.",
      },
      {
        titel: "Artikel 3. Offertes, aanbiedingen en totstandkoming",
        tekst:
          "3.1 Alle offertes, aanbiedingen, prijsopgaven, mededelingen en overige informatie die door Minimasters Playground worden verstrekt, waaronder maar niet beperkt tot openingstijden en tarieven, zijn vrijblijvend en kunnen te allen tijde worden gewijzigd.\n3.2 Een overeenkomst tussen Minimasters Playground en de bezoeker komt tot stand op het moment dat de bezoeker een aanbod van Minimasters Playground aanvaardt. Indien de overeenkomst digitaal (via de website) of per e-mail wordt gesloten, geldt als moment van totstandkoming het tijdstip waarop Minimasters Playground een bevestiging per e-mail aan de bezoeker heeft verzonden.\n3.4 Een toegangsbewijs wordt op naam uitgegeven, is persoonlijk en niet overdraagbaar. Het toegangsbewijs is uitsluitend geldig voor de op het bewijs vermelde datum, tijdstip en locatie van Minimasters Playground.\n3.5 Op grond van artikel 6:230p sub e van het Burgerlijk Wetboek geldt geen herroepingsrecht voor overeenkomsten betreffende vrijetijdsdiensten waarbij een specifieke datum of periode van uitvoering is overeengekomen. In dergelijke gevallen heeft de bezoeker geen recht op ontbinding van de overeenkomst. In overige gevallen heeft de bezoeker bij een via de website gesloten overeenkomst het recht deze binnen veertien (14) dagen na ontvangst van de bevestigingsmail te ontbinden.\n3.6 Minimasters Playground is niet gebonden aan een aanbod of overeenkomst indien de bezoeker redelijkerwijs had kunnen begrijpen dat sprake is van een kennelijke fout, vergissing of verschrijving.\n3.7 Offertes, aanbiedingen en overeenkomsten van Minimasters Playground zijn vertrouwelijk van aard en mogen zonder voorafgaande schriftelijke toestemming niet aan derden worden verstrekt. Derden kunnen aan dergelijke documenten geen rechten ontlenen.",
      },
      {
        titel: "Artikel 4. Toegang tot de vestiging",
        tekst:
          "4.1 Toegang tot de vestiging van Minimasters Playground is uitsluitend toegestaan op vertoon van een geldig toegangsbewijs. Bezoekers dienen hun toegangsbewijs gedurende hun verblijf te bewaren en op eerste verzoek van een medewerker te tonen.\n4.2 In geval van verlies, diefstal of beschadiging van een toegangsbewijs vindt geen restitutie of vervanging plaats.\n4.3 Minimasters Playground is gerechtigd een bezoeker de toegang tot de vestiging te weigeren of te ontzeggen indien de bezoeker naar het oordeel van medewerkers van Minimasters Playground en/of door haar ingeschakelde derden ongepast gekleed is of zich anderszins niet houdt aan de geldende huisregels.\n4.4 Bezoekers jonger dan zestien (16) jaar mogen de vestiging uitsluitend betreden onder begeleiding van een persoon van achttien (18) jaar of ouder.\n4.5 Begeleiders, waaronder begrepen ouders, verzorgers en groepsbegeleiders, dragen te allen tijde de verantwoordelijkheid voor het gedrag van de door hen begeleide bezoekers. Het is niet toegestaan minderjarigen zonder passend toezicht in de vestiging achter te laten. De begeleider blijft aansprakelijk voor schade die voortvloeit uit het handelen of nalaten van de door hem of haar begeleide bezoekers.",
      },
      {
        titel: "Artikel 5. Verplichtingen bezoeker",
        tekst:
          "5.1 Bezoekers zijn te allen tijde verplicht de Algemene Voorwaarden van Minimasters Playground, zoals gepubliceerd op de website en zichtbaar in de vestiging, na te leven. Daarnaast dienen bezoekers de instructies en aanwijzingen van medewerkers van Minimasters Playground en door haar ingeschakelde derden strikt op te volgen.\n5.3 Deelnemen aan activiteiten is uitsluitend toegestaan voor bezoekers die zich in goede fysieke en mentale gezondheid bevinden. Bezoekers verklaren gezond te zijn, fysiek in staat tot deelname en dat er geen medische of andere belemmeringen bestaan die de veiligheid in gevaar kunnen brengen (bijvoorbeeld zwangerschap of een lichamelijke/psychische beperking). Bij twijfel is het de verantwoordelijkheid van de bezoeker af te zien van deelname.\n5.4 Het is bezoekers niet toegestaan deel te nemen onder invloed van alcohol, drugs of medicatie die de veiligheid of het gedrag kan beïnvloeden.\n5.5 Eigen consumpties, zoals eten en drinken, mogen niet worden meegenomen of genuttigd in de vestiging.\n5.6 Het gebruik van vervoermiddelen zoals skateboards, rolschaatsen, skeelers, loopfietsen, (elektrische) steps en hoverboards is verboden, met uitzondering van hulpmiddelen zoals scootmobielen, rolstoelen, rollators en kinder- of babywagens.\n5.7 Bezoekers mogen geen steek-, slag- of vuurwapens, alcohol of verdovende middelen bij zich dragen.\n5.8 Op verzoek van Minimasters Playground dient de bezoeker een geldig identiteitsbewijs te tonen.\n5.9 Indien de omstandigheden dit vereisen, behoudt Minimasters Playground zich het recht voor preventieve veiligheidscontroles uit te voeren bij de ingang, waaronder oppervlakkige fouillering en tassencontrole (privaatrechtelijke oppervlakkige veiligheidsfouillering, POV). Toegang tot de vestiging is afhankelijk van medewerking aan deze controles.\n5.10 Indien een bezoeker handelt in strijd met de overeenkomst, de fatsoensnormen of wettelijke voorschriften – bijvoorbeeld bij vernieling, beschadiging, diefstal, overlast of het negeren van aanwijzingen – is Minimasters Playground gerechtigd: a) de bezoeker (verdere) toegang tot de vestiging te weigeren zonder restitutie van het toegangsbewijs; b) een tijdelijk of permanent toegangsverbod op te leggen voor één of meerdere vestigingen; c) aangifte te doen bij de politie; d) de bezoeker aansprakelijk te stellen voor alle door Minimasters Playground geleden schade, inclusief verlies en gederfde winst.",
      },
      {
        titel: "Artikel 6. Betaling en incasso",
        tekst:
          "6.1 Betaling voor deelname aan activiteiten dient volledig te geschieden vóór aanvang van de betreffende activiteit.\n6.2 Indien een factuur in het kader van de overeenkomst is verstrekt, dient de bezoeker het openstaande bedrag te voldoen binnen de op de factuur vermelde termijn. Ontbreekt een betalingstermijn, dan dient betaling uiterlijk veertien (14) dagen na factuurdatum te geschieden op de vermelde bankrekening.",
      },
      {
        titel: "Artikel 7. Annulering",
        tekst:
          "7.1 Een bezoeker kan zijn of haar reservering tot 12 uur vóór de gereserveerde activiteit kosteloos wijzigen naar een andere beschikbare datum en/of tijd. Het wijzigen van een reservering kan eenvoudig via de link in de reserveringsbevestiging. Na aankoop van tickets is restitutie van het betaalde bedrag niet mogelijk.\n7.2 Vanaf 12 uur vóór aanvang van de gereserveerde activiteit kunnen reserveringen niet meer worden gewijzigd of geannuleerd. Er wordt geen restitutie, tegoed of verplaatsing verleend, ook niet bij ziekte, een ongeval, overmacht of andere persoonlijke omstandigheden.",
      },
      {
        titel: "Artikel 8. Aansprakelijkheid en overmacht",
        tekst:
          "8.1 Het betreden van de vestiging van Minimasters Playground, deelname aan activiteiten en het gebruik van speeltoestellen geschiedt volledig op eigen risico van de bezoeker. De bezoeker erkent dat aan het spelen en verblijven in de vestiging risico's verbonden zijn, waaronder het risico op (ernstig) lichamelijk letsel en/of materiële schade.\n8.2 Indien Minimasters Playground aansprakelijk is wegens een toerekenbare tekortkoming in de uitvoering van de overeenkomst of op welke rechtsgrond dan ook, is deze aansprakelijkheid beperkt tot maximaal het door de bezoeker betaalde factuurbedrag (exclusief btw), dan wel tot het bedrag dat in het betreffende geval door de aansprakelijkheidsverzekeraar van Minimasters Playground wordt uitgekeerd.\n8.3 Minimasters Playground is niet aansprakelijk voor schade die is ontstaan doordat zij heeft vertrouwd op door of namens de bezoeker verstrekte onjuiste, onvolledige of misleidende informatie.\n8.4 Minimasters Playground aanvaardt geen aansprakelijkheid voor vergissingen of onjuistheden in publicaties, aankondigingen, aanbiedingen of andere informatievoorziening aan bezoekers, noch voor fouten bij de verkoop van toegangsbewijzen door derden.\n8.5 Aansprakelijkheid voor indirecte schade is uitgesloten. Hieronder wordt onder meer verstaan: gevolgschade, winstderving, gemiste besparingen, reputatieschade, stagnatieschade, schade door aanspraken van derden, schade voortvloeiend uit door de bezoeker voorgeschreven materialen of zaken, en schade die verband houdt met door de bezoeker aangewezen derden.\n8.6 Minimasters Playground is niet aansprakelijk voor verlies, diefstal, beschadiging of vermissing van eigendommen van bezoekers, ook niet indien gebruik wordt gemaakt van een (gratis) onbewaakte garderobe of kluisjes. De bezoeker vrijwaart Minimasters Playground tegen aanspraken van derden ter zake.\n8.7 Behoudens in het geval nakoming blijvend onmogelijk is, dient de bezoeker Minimasters Playground schriftelijk en zonder onredelijke vertraging in gebreke te stellen indien sprake is van een tekortkoming in de nakoming van de overeenkomst. Daarbij dient een redelijke termijn voor herstel te worden geboden.\n8.8 Iedere aanspraak op schadevergoeding vervalt twaalf (12) maanden na het moment waarop de schade is ontstaan, tenzij de bezoeker binnen deze termijn een gerechtelijke procedure aanhangig heeft gemaakt.\n8.9 De bezoeker is aansprakelijk voor schade die Minimasters Playground lijdt als gevolg van handelen of nalaten in strijd met de overeenkomst, deze algemene voorwaarden, of het niet opvolgen van instructies van medewerkers of ingeschakelde derden. Tevens is de bezoeker aansprakelijk voor schade veroorzaakt door personen voor wie hij verantwoordelijk is of met wie hij de vestiging bezoekt.\n8.10 Minimasters Playground draagt zorg voor een veilige speelomgeving. De aanwezige speeltoestellen en faciliteiten voldoen aan de geldende wettelijke veiligheidsnormen en keuringsvereisten. Het gebruik van de speelvoorzieningen geschiedt evenwel op eigen risico. Ouders en/of begeleiders blijven te allen tijde verantwoordelijk voor het toezicht op en het gedrag van de minderjarige bezoekers die zij begeleiden.\n8.11 In geval van overmacht is Minimasters Playground gerechtigd haar verplichtingen uit de overeenkomst tijdelijk op te schorten. Indien de situatie van overmacht langer dan zes (6) maanden voortduurt, hebben beide partijen het recht de overeenkomst te ontbinden zonder dat een verplichting tot schadevergoeding ontstaat.\n8.12 Onder overmacht wordt in ieder geval verstaan: oorlog, dreiging van oorlog, oproer, mobilisatie, binnenlandse of buitenlandse onlusten, overheidsmaatregelen, pandemieën, stakingen of werkonderbrekingen, storingen in energie-, internet- of telecommunicatievoorzieningen, brand, technische defecten, sabotage, inbraak, natuurrampen, extreme weersomstandigheden, transportproblemen, blokkades en andere omstandigheden die buiten de redelijke invloedssfeer van Minimasters Playground liggen.\n8.13 Indien Minimasters Playground bij het intreden van overmacht reeds gedeeltelijk aan haar verplichtingen heeft voldaan of nog gedeeltelijk kan voldoen, is zij gerechtigd dit deel afzonderlijk te factureren. De bezoeker is gehouden deze factuur te voldoen.\n8.14 De in dit artikel opgenomen aansprakelijkheidsbeperkingen en -uitsluitingen gelden niet voor zover de schade het directe gevolg is van opzet of bewuste roekeloosheid van Minimasters Playground.\n8.15 Schade als gevolg van overmacht komt niet voor vergoeding in aanmerking, anders dan eventuele restitutie of kwijtschelding van het gedeelte van de overeenkomst dat door overmacht niet kan worden uitgevoerd.",
      },
      {
        titel: "Artikel 9. Klachtenregeling",
        tekst:
          "9.1 De bezoeker is verplicht een klacht zo spoedig mogelijk te melden. Indien onmiddellijke melding redelijkerwijs niet mogelijk is, dient de klacht uiterlijk vóór het verlaten van de vestiging te worden gemeld bij de vestigingsmanager van Minimasters Playground.\n9.2 Indien de klacht betrekking heeft op (mogelijke) schade waarvoor de bezoeker Minimasters Playground aansprakelijk wil stellen, dient de gestelde schade vóór vertrek uit de vestiging aan de vestigingsmanager te worden getoond. De vestigingsmanager zal hiervan een rapport opstellen.\n9.3 Naar aanleiding van een ingediende klacht zullen de bezoeker en de vestigingsmanager gezamenlijk trachten tot een passende oplossing te komen. Indien dit niet tot een bevredigende uitkomst leidt, kan de bezoeker de klacht binnen veertien (14) dagen na het bezoek schriftelijk indienen bij de directie van Minimasters Playground.",
      },
      {
        titel: "Artikel 10. Wijzigingen en slotbepalingen",
        tekst:
          "10.1 Wijzigingen of aanvullingen op de overeenkomst zijn uitsluitend geldig indien deze schriftelijk door Minimasters Playground zijn bevestigd.\n10.2 Indien één of meerdere bepalingen van deze algemene voorwaarden geheel of gedeeltelijk nietig blijken te zijn, vernietigd worden of anderszins hun rechtsgeldigheid verliezen, blijven de overige bepalingen onverminderd van kracht.\n10.3 Minimasters Playground behoudt zich het recht voor deze algemene voorwaarden eenzijdig te wijzigen of aan te vullen. De meest actuele versie is van toepassing en zal kenbaar worden gemaakt via de daarvoor gebruikelijke kanalen.",
      },
      {
        titel: "Artikel 11. Privacy",
        tekst:
          "11.1 In het kader van het aangaan en uitvoeren van de overeenkomst(en) kan Minimasters Playground persoonsgegevens van bezoekers verwerken. Deze persoonsgegevens worden verwerkt in overeenstemming met het privacybeleid van Minimasters Playground.\n11.2 Persoonsgegevens worden uitsluitend gebruikt voor de doeleinden waarvoor ze zijn verzameld, tenzij de bezoeker hier expliciet toestemming voor geeft of indien gebruik anderszins wettelijk verplicht is.",
      },
      {
        titel: "Artikel 12. Toepasselijk recht en geschillen",
        tekst:
          "12.1 Op deze algemene voorwaarden en op de overeenkomst tussen de bezoeker en Minimasters Playground is uitsluitend Nederlands recht van toepassing.\n12.2 Geschillen die voortvloeien uit of verband houden met de overeenkomst zullen in eerste instantie worden voorgelegd aan de bevoegde rechter in de vestigingsplaats van Minimasters Playground, tenzij de wet dwingend anders voorschrijft.",
      },
    ],
  },
} as const;

export type SiteContent = {
  -readonly [K in keyof typeof contentDefaults]: DeepMutable<
    (typeof contentDefaults)[K]
  >;
};

type DeepMutable<T> = {
  -readonly [K in keyof T]: T[K] extends object ? DeepMutable<T[K]> : T[K];
};

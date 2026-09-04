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
      { title: "Kinderfeestje" },
      { title: "Entreeticket" },
      { title: "Zaalhuur" },
      { title: "Scholen & BSO" },
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
} as const;

export type SiteContent = {
  -readonly [K in keyof typeof contentDefaults]: DeepMutable<
    (typeof contentDefaults)[K]
  >;
};

type DeepMutable<T> = {
  -readonly [K in keyof T]: T[K] extends object ? DeepMutable<T[K]> : T[K];
};

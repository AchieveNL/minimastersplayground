"use client";

import Nav from "../components/Nav";
import Footer from "../components/Footer";
import SmoothScroll from "../components/SmoothScroll";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <>
      <SmoothScroll />
      <Nav />
      <main
        className="min-h-screen px-4 sm:px-8 md:px-16 lg:px-32 py-12 md:py-20"
        style={{ fontFamily: "Quicksand, sans-serif" }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-[#BB76FF] to-[#d4a5ff] px-8 py-3 rounded-br-4xl rounded-tl-4xl mb-6">
              <h1
                className="text-2xl md:text-4xl text-white font-bold"
                style={{ fontFamily: "StudlyFree, sans-serif" }}
              >
                PRIVACYVERKLARING
              </h1>
            </div>
            <p className="text-[#5763FF] font-semibold text-sm md:text-base">
              Laatst gewijzigd: februari 2026
            </p>
          </div>

          {/* Content Card */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-lg border border-white/40">
            <p className="text-gray-700 leading-relaxed mb-8">
              Minimasters Playground, gevestigd aan Marktstraat 38 t/m 42, 2741 NK te Waddinxveen, is verantwoordelijk voor de
              verwerking van persoonsgegevens zoals weergegeven in deze privacyverklaring.
            </p>

            <div className="bg-[#FFCA58]/20 rounded-2xl p-5 mb-8">
              <h3 className="font-bold text-[#FF5757] text-lg mb-2">Contactgegevens</h3>
              <p className="text-gray-700 leading-relaxed">
                Minimasters Playground<br />
                E-mail: hero@minimastersplayground.nl<br />
                KvK: 98235176
              </p>
            </div>

            {/* Article 1 */}
            <Section
              color="#FF5757"
              title="Artikel 1. Verwerking van persoonsgegevens"
            >
              <p className="text-gray-700 leading-relaxed mb-4">
                Minimasters Playground verwerkt op verschillende momenten persoonsgegevens. Hieronder leggen wij
                uit in welke situaties dit gebeurt, welke gegevens het betreft en wie daarvoor verantwoordelijk is.
              </p>

              <SubSection title="Bezoek aan de website">
                <p className="text-gray-700 leading-relaxed">
                  Op onze website maken wij gebruik van cookies en vergelijkbare technieken. Deze gebruiken wij om de
                  website goed te laten functioneren, de gebruikservaring te verbeteren en het gebruik te analyseren.
                  Meer informatie hierover vind je in onze cookieverklaring op onze website.
                </p>
              </SubSection>

              <SubSection title="Reserveringen en ticketverkoop">
                <p className="text-gray-700 leading-relaxed mb-3">
                  Wanneer je een reservering maakt of tickets bestelt bij een vestiging van Minimasters Playground,
                  kunnen onder andere de volgende persoonsgegevens worden verwerkt:
                </p>
                <BulletList items={[
                  "Voor- en achternaam",
                  "Adresgegevens (adres, postcode, woonplaats, land)",
                  "Telefoonnummer en e-mailadres",
                  "Geboortedatum",
                  "Datum van bezoek, evenement of kinderfeestje",
                  "Betaalgegevens en betaalwijze (zoals kortingscode, cadeaubon, lidmaatschap)",
                  "Voorkeuren voor het ontvangen van nieuwsbrieven",
                  "Accountgegevens (e-mailadres en wachtwoord)",
                  "Inloggegevens via sociale media (zoals gebruikersnaam)",
                  "Overige informatie die je zelf verstrekt, bijvoorbeeld via open tekstvelden of telefonisch contact",
                ]} />
              </SubSection>

              <SubSection title="Bezoek zonder reservering">
                <p className="text-gray-700 leading-relaxed">
                  Wanneer je zonder reservering een vestiging bezoekt en ter plaatse een ticket koopt, worden uitsluitend
                  noodzakelijke gegevens verwerkt. Medewerkers kunnen je vragen een legitimatiebewijs te tonen ter
                  controle van bijvoorbeeld leeftijd. Er wordt geen kopie of scan gemaakt en er worden geen
                  identiteitsgegevens vastgelegd.
                </p>
              </SubSection>

              <SubSection title="Cameratoezicht">
                <p className="text-gray-700 leading-relaxed">
                  In onze vestigingen maken wij gebruik van camerabewaking. Dit doen wij ter bescherming van
                  bezoekers, medewerkers en eigendommen en voor het vastleggen en afhandelen van incidenten.
                </p>
              </SubSection>

              <SubSection title="Incidentenregistratie">
                <p className="text-gray-700 leading-relaxed mb-3">
                  Wanneer zich een incident voordoet of huisregels worden overtreden, wordt dit geregistreerd. Hierbij
                  kunnen gegevens worden vastgelegd zoals:
                </p>
                <BulletList items={[
                  "Datum, tijd en locatie van het incident",
                  "Betrokken attractie of speeltoestel",
                  "Beschrijving van het voorval",
                ]} />
                <p className="text-gray-700 leading-relaxed mt-3">
                  Afhankelijk van de situatie kunnen hierbij persoonsgegevens worden verwerkt. In uitzonderlijke
                  gevallen kunnen – met uitdrukkelijke toestemming – bijzondere persoonsgegevens worden vastgelegd.
                </p>
                <p className="text-gray-700 leading-relaxed mt-3">
                  Op grond van het Warenwetbesluit attractie- en speeltoestellen 2023 zijn wij verplicht ernstige
                  incidenten te melden bij de Nederlandse Voedsel- en Warenautoriteit. Deze melding bevat uitsluitend
                  geanonimiseerde gegevens.
                </p>
                <p className="text-gray-700 leading-relaxed mt-3">
                  Bij strafbare feiten zoals diefstal, geweld of opzettelijke schade kunnen persoonsgegevens worden
                  geregistreerd en – indien noodzakelijk – gedeeld met opsporingsinstanties.
                </p>
              </SubSection>

              <SubSection title="Contact">
                <p className="text-gray-700 leading-relaxed">
                  Wanneer je contact met ons opneemt, verwerken wij jouw naam, e-mailadres, telefoonnummer en
                  overige gegevens die je met ons deelt in verband met jouw vraag of verzoek.
                </p>
              </SubSection>
            </Section>

            {/* Article 2 */}
            <Section color="#5763FF" title="Artikel 2. Doeleinden van verwerking">
              <p className="text-gray-700 leading-relaxed mb-3">
                Minimasters Playground verwerkt persoonsgegevens onder meer voor de volgende doeleinden:
              </p>
              <BulletList items={[
                "Het verwerken van reserveringen en betalingen",
                "Het leveren van producten en diensten",
                "Het aanbieden en beheren van accounts",
                "Het aanbieden van loyaliteitsprogramma's en acties",
                "Marketing en gerichte communicatie",
                "Klantenservice en klachtenafhandeling",
                "Beveiliging en incidentregistratie",
                "Interne administratie en kostenbeheer",
                "Handhaving van huisregels en voorwaarden",
                "Voldoen aan wettelijke verplichtingen",
                "Analyse en verbetering van dienstverlening",
                "Websitebeheer en optimalisatie",
              ]} />
              <p className="text-gray-700 leading-relaxed mt-4">
                Wij verwerken persoonsgegevens niet voor doeleinden die onverenigbaar zijn met bovenstaande doelen.
              </p>
            </Section>

            {/* Article 3 */}
            <Section color="#67CD8A" title="Artikel 3. Grondslagen voor verwerking">
              <p className="text-gray-700 leading-relaxed mb-3">
                Wij verwerken persoonsgegevens uitsluitend indien daarvoor een wettelijke grondslag bestaat, zoals:
              </p>
              <BulletList items={[
                "Uitvoering van een overeenkomst (bij reserveringen en aankopen)",
                "Gerechtvaardigd belang, bijvoorbeeld voor veiligheid, beveiliging en verbetering van dienstverlening",
                "Wettelijke verplichting, zoals registratie van incidenten",
                "Vitale belangen, bijvoorbeeld bij noodsituaties",
                "Toestemming, bijvoorbeeld voor nieuwsbrieven of deelname aan een loyaliteitsprogramma",
              ]} />
              <p className="text-gray-700 leading-relaxed mt-4">
                Wanneer verwerking plaatsvindt op basis van toestemming, kan deze te allen tijde worden ingetrokken.
              </p>
            </Section>

            {/* Article 6 */}
            <Section color="#FF5757" title="Artikel 6. Minderjarigen">
              <p className="text-gray-700 leading-relaxed">
                Wij verwerken uitsluitend persoonsgegevens van kinderen indien dit noodzakelijk is voor veiligheid of
                incidentregistratie. Marketingactiviteiten richten zich uitsluitend op volwassen begeleiders.
              </p>
            </Section>

            {/* Article 7 */}
            <Section color="#BB76FF" title="Artikel 7. Bewaartermijn">
              <p className="text-gray-700 leading-relaxed mb-3">
                Wij bewaren persoonsgegevens niet langer dan noodzakelijk.
              </p>
              <BulletList items={[
                "Reserveringsgegevens: in principe tot 2 jaar na het bezoek",
                "Fiscale gegevens: tot 7 jaar (wettelijke bewaarplicht)",
                "Gegevens in verband met juridische procedures: zolang noodzakelijk",
              ]} />
            </Section>

            {/* Article 8 */}
            <Section color="#5763FF" title="Artikel 8. Toegang tot persoonsgegevens">
              <p className="text-gray-700 leading-relaxed mb-3">
                Toegang tot persoonsgegevens is beperkt tot medewerkers van de betreffende vestiging en bevoegde
                ondersteunende partijen.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                Indien wij externe dienstverleners inschakelen (bijvoorbeeld voor reserveringssystemen), sluiten wij
                verwerkersovereenkomsten waarin passende beveiligingsmaatregelen zijn vastgelegd.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Gegevens worden uitsluitend verstrekt aan autoriteiten indien wij daartoe wettelijk verplicht zijn.
              </p>
            </Section>

            {/* Article 9 */}
            <Section color="#67CD8A" title="Artikel 9. Verwerking buiten de EER">
              <p className="text-gray-700 leading-relaxed">
                Persoonsgegevens worden in beginsel verwerkt binnen de Europese Economische Ruimte (EER) of
                Zwitserland. Indien gebruik wordt gemaakt van dienstverleners buiten deze gebieden, zorgen wij voor
                passende waarborgen conform de geldende privacywetgeving.
              </p>
            </Section>

            {/* Article 10 */}
            <Section color="#FF5757" title="Artikel 10. Geautomatiseerde besluitvorming">
              <p className="text-gray-700 leading-relaxed mb-3">
                Binnen ons loyaliteitsprogramma kunnen wij gebruikmaken van profilering om gepersonaliseerde
                aanbiedingen te doen. Deze profilering heeft geen juridische of vergelijkbare ingrijpende gevolgen. Je
                kunt hiertegen bezwaar maken of jouw toestemming intrekken.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Verder passen wij geen geautomatiseerde besluitvorming toe.
              </p>
            </Section>

            {/* Article 11 */}
            <Section color="#BB76FF" title="Artikel 11. Beveiliging">
              <p className="text-gray-700 leading-relaxed">
                Wij nemen passende technische en organisatorische maatregelen om persoonsgegevens te
                beschermen tegen verlies of onrechtmatige verwerking. Dit omvat onder andere toegangsbeperking,
                beveiligde systemen en periodieke back-ups.
              </p>
            </Section>

            {/* Article 12 */}
            <Section color="#5763FF" title="Artikel 12. Externe links">
              <p className="text-gray-700 leading-relaxed">
                Onze website kan links bevatten naar websites van derden. Wij zijn niet verantwoordelijk voor de inhoud
                of privacy praktijken van deze websites.
              </p>
            </Section>

            {/* Article 13 */}
            <Section color="#67CD8A" title="Artikel 13. Jouw rechten">
              <p className="text-gray-700 leading-relaxed mb-3">
                Op grond van privacywetgeving heb je onder meer de volgende rechten:
              </p>
              <BulletList items={[
                "Recht op inzage",
                "Recht op rectificatie",
                "Recht op verwijdering",
                "Recht op beperking",
                "Recht op dataportabiliteit",
                "Recht van bezwaar",
                "Recht om toestemming in te trekken",
              ]} />
              <p className="text-gray-700 leading-relaxed mt-4">
                Verzoeken kunnen worden ingediend via het e-mailadres dat op onze website staat vermeld. Wij
                reageren binnen één maand, tenzij de wet een langere termijn toestaat.
              </p>
              <p className="text-gray-700 leading-relaxed mt-3">
                Voor minderjarigen onder 16 jaar kunnen ouders of wettelijke vertegenwoordigers deze rechten
                uitoefenen.
              </p>
            </Section>

            {/* Article 14 */}
            <Section color="#FF5757" title="Artikel 14. Klachten">
              <p className="text-gray-700 leading-relaxed">
                Heb je een klacht over onze omgang met persoonsgegevens? Neem dan contact met ons op. Daarnaast
                kun je een klacht indienen bij de Autoriteit Persoonsgegevens.
              </p>
            </Section>

            {/* Article 15 */}
            <Section color="#BB76FF" title="Artikel 15. Wijzigingen">
              <p className="text-gray-700 leading-relaxed">
                Minimasters Playground kan deze privacyverklaring van tijd tot tijd aanpassen. De meest recente versie
                wordt gepubliceerd op onze website, met vermelding van de ingangsdatum. Bij ingrijpende wijzigingen
                zullen wij betrokkenen waar mogelijk actief informeren.
              </p>
            </Section>
          </div>

          {/* Back link */}
          <div className="text-center mt-10">
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-[#FFCA58] to-[#FFDB8D] text-white font-bold px-8 py-3 rounded-full shadow-md hover:scale-105 transition-transform duration-300"
              style={{ fontFamily: "StudlyFree, sans-serif" }}
            >
              TERUG NAAR HOME
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Section({ color, title, children }: { color: string; title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
        <h2 className="font-bold text-lg md:text-xl" style={{ color }}>{title}</h2>
      </div>
      {children}
    </div>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="ml-4 mb-4 pl-4 border-l-2 border-[#FFCA58]/50">
      <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
      {children}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5 ml-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-gray-700 leading-relaxed">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFCA58] mt-2 flex-shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  );
}

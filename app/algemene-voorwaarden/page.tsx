"use client";

import Nav from "../components/Nav";
import Footer from "../components/Footer";
import SmoothScroll from "../components/SmoothScroll";
import Link from "next/link";

export default function AlgemeneVoorwaardenPage() {
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
            <div className="inline-block bg-gradient-to-r from-[#5763FF] to-[#7b85ff] px-8 py-3 rounded-br-4xl rounded-tl-4xl mb-6">
              <h1
                className="text-2xl md:text-4xl text-white font-bold"
                style={{ fontFamily: "StudlyFree, sans-serif" }}
              >
                ALGEMENE VOORWAARDEN
              </h1>
            </div>
            <p className="text-[#5763FF] font-semibold text-sm md:text-base">
              Minimasters Playground
            </p>
          </div>

          {/* Content Card */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-lg border border-white/40">
            <div className="bg-[#5763FF]/10 rounded-2xl p-5 mb-8">
              <h3 className="font-bold text-[#5763FF] text-lg mb-2">Algemene gegevens</h3>
              <p className="text-gray-700 leading-relaxed">
                Eigenarese: Sofia Hu<br />
                Adres: Marktstraat 38 t/m 42, 2741 NK te Waddinxveen<br />
                E-mailadres: hero@minimastersplayground.nl<br />
                KvK: 98235176
              </p>
            </div>

            {/* Article 1 */}
            <Section color="#FF5757" title="Artikel 1. Definities">
              <p className="text-gray-700 leading-relaxed mb-3">
                1.1 In deze algemene voorwaarden hebben onderstaande begrippen de volgende betekenis:
              </p>
              <DefinitionList items={[
                { term: "A. Algemene Voorwaarden", def: "deze algemene bezoekersvoorwaarden." },
                { term: "B. Bezoeker", def: "de natuurlijke- of rechtspersoon die de gebouwen en/of terreinen van Minimasters Playground betreedt en/of op enigerlei wijze direct of indirect een Overeenkomst met Minimasters Playground sluit." },
                { term: "C. Bijzondere Voorwaarden", def: "huisregels, veiligheidsvoorschriften en andere aanvullende voorwaarden van Minimasters Playground." },
                { term: "D. Groep", def: "twee (2) of meer Bezoekers die Minimasters Playground in georganiseerd verband bezoeken." },
                { term: "E. Minimasters Playground", def: "een vestiging die is opgenomen op de Website en die door bezoeker wordt, of zal worden bezocht en/of waarmee Bezoeker een Overeenkomst aangaat." },
                { term: "F. Overeenkomst", def: "het geheel van afspraken tussen bezoeker en Minimasters Playground op grond waarvan Minimasters Playground diensten en/of producten levert (zoals het Toegangsbewijs, Algemene Voorwaarden, Bijzondere Voorwaarden)." },
                { term: "G. Partijen", def: "Minimasters Playground en bezoeker, daaronder mede begrepen een Groep." },
                { term: "H. Toegangsbewijs", def: "een ticket, waaronder begrepen een rittenkaart, dat bezoeker de toegang verschaft tot Minimasters Playground tijdens openingstijden." },
                { term: "I. Website", def: "www.minimastersplayground.nl" },
              ]} />
            </Section>

            {/* Article 2 */}
            <Section color="#67CD8A" title="Artikel 2. Toepasselijkheid">
              <NumberedList items={[
                "Deze algemene voorwaarden zijn van toepassing op ieder bezoek aan Minimasters Playground, alsmede op alle aanbiedingen, reserveringen, offertes en overeenkomsten tussen Minimasters Playground en de bezoeker en/of groep, tenzij schriftelijk uitdrukkelijk anders is overeengekomen.",
                "De algemene voorwaarden worden voorafgaand aan of bij het aangaan van de overeenkomst aan de bezoeker beschikbaar gesteld. Dit kan door overhandiging bij binnenkomst, ter inzage op locatie of via digitale beschikbaarstelling.",
                "In geval van een telefonische of digitale reservering wordt de bezoeker erop gewezen dat de algemene voorwaarden ter inzage beschikbaar zijn bij Minimasters Playground en op verzoek kosteloos worden toegezonden. Daarnaast zijn de voorwaarden te raadplegen via de officiële website van Minimasters Playground.",
                "Door het betreden van Minimasters Playground en/of het aangaan van een reservering of overeenkomst verklaart de bezoeker zich akkoord met de toepasselijkheid en inhoud van deze algemene voorwaarden.",
                "Indien bepalingen uit de overeenkomst afwijken van deze algemene voorwaarden, prevaleren de bepalingen uit de overeenkomst. In geval van tegenstrijdigheid tussen informatie op de website, promotiemateriaal of uitingen op locatie en deze algemene voorwaarden, zijn de bepalingen van deze algemene voorwaarden leidend.",
                "Het niet of niet direct afdwingen van enige bepaling uit deze algemene voorwaarden door Minimasters Playground houdt geen afstand van recht in. Minimasters Playground behoudt zich te allen tijde het recht voor om volledige naleving van de overeenkomst en deze voorwaarden te verlangen.",
              ]} prefix="2" />
            </Section>

            {/* Article 3 */}
            <Section color="#BB76FF" title="Artikel 3. Offertes, aanbiedingen en totstandkoming">
              <NumberedList items={[
                "Alle offertes, aanbiedingen, prijsopgaven, mededelingen en overige informatie die door Minimasters Playground worden verstrekt, waaronder maar niet beperkt tot openingstijden en tarieven, zijn vrijblijvend en kunnen te allen tijde worden gewijzigd.",
                "Een overeenkomst tussen Minimasters Playground en de bezoeker komt tot stand op het moment dat de bezoeker een aanbod van Minimasters Playground aanvaardt. Indien de overeenkomst digitaal (via de website) of per e-mail wordt gesloten, geldt als moment van totstandkoming het tijdstip waarop Minimasters Playground een bevestiging per e-mail aan de bezoeker heeft verzonden.",
                null,
                "Een toegangsbewijs wordt op naam uitgegeven, is persoonlijk en niet overdraagbaar. Het toegangsbewijs is uitsluitend geldig voor de op het bewijs vermelde datum, tijdstip en locatie van Minimasters Playground.",
                "Op grond van artikel 6:230p sub e van het Burgerlijk Wetboek geldt geen herroepingsrecht voor overeenkomsten betreffende vrijetijdsdiensten waarbij een specifieke datum of periode van uitvoering is overeengekomen. In dergelijke gevallen heeft de bezoeker geen recht op ontbinding van de overeenkomst. In overige gevallen heeft de bezoeker bij een via de website gesloten overeenkomst het recht deze binnen veertien (14) dagen na ontvangst van de bevestigingsmail te ontbinden.",
                "Minimasters Playground is niet gebonden aan een aanbod of overeenkomst indien de bezoeker redelijkerwijs had kunnen begrijpen dat sprake is van een kennelijke fout, vergissing of verschrijving.",
                "Offertes, aanbiedingen en overeenkomsten van Minimasters Playground zijn vertrouwelijk van aard en mogen zonder voorafgaande schriftelijke toestemming niet aan derden worden verstrekt. Derden kunnen aan dergelijke documenten geen rechten ontlenen.",
              ]} prefix="3" />
            </Section>

            {/* Article 4 */}
            <Section color="#FF5757" title="Artikel 4. Toegang tot de vestiging">
              <NumberedList items={[
                "Toegang tot de vestiging van Minimasters Playground is uitsluitend toegestaan op vertoon van een geldig toegangsbewijs. Bezoekers dienen hun toegangsbewijs gedurende hun verblijf te bewaren en op eerste verzoek van een medewerker te tonen.",
                "In geval van verlies, diefstal of beschadiging van een toegangsbewijs vindt geen restitutie of vervanging plaats.",
                "Minimasters Playground is gerechtigd een bezoeker de toegang tot de vestiging te weigeren of te ontzeggen indien de bezoeker naar het oordeel van medewerkers van Minimasters Playground en/of door haar ingeschakelde derden ongepast gekleed is of zich anderszins niet houdt aan de geldende huisregels.",
                "Bezoekers jonger dan zestien (16) jaar mogen de vestiging uitsluitend betreden onder begeleiding van een persoon van achttien (18) jaar of ouder.",
                "Begeleiders, waaronder begrepen ouders, verzorgers en groepsbegeleiders, dragen te allen tijde de verantwoordelijkheid voor het gedrag van de door hen begeleide bezoekers. Het is niet toegestaan minderjarigen zonder passend toezicht in de vestiging achter te laten. De begeleider blijft aansprakelijk voor schade die voortvloeit uit het handelen of nalaten van de door hem of haar begeleide bezoekers.",
              ]} prefix="4" />
            </Section>

            {/* Article 5 */}
            <Section color="#5763FF" title="Artikel 5. Verplichtingen bezoeker">
              <NumberedList items={[
                "Bezoekers zijn te allen tijde verplicht de Algemene Voorwaarden van Minimasters Playground, zoals gepubliceerd op de website en zichtbaar in de vestiging, na te leven. Daarnaast dienen bezoekers de instructies en aanwijzingen van medewerkers van Minimasters Playground en door haar ingeschakelde derden strikt op te volgen.",
                null,
                "Deelnemen aan activiteiten is uitsluitend toegestaan voor bezoekers die zich in goede fysieke en mentale gezondheid bevinden. Bezoekers verklaren gezond te zijn, fysiek in staat tot deelname en dat er geen medische of andere belemmeringen bestaan die de veiligheid in gevaar kunnen brengen (bijvoorbeeld zwangerschap of een lichamelijke/psychische beperking). Bij twijfel is het de verantwoordelijkheid van de bezoeker af te zien van deelname.",
                "Het is bezoekers niet toegestaan deel te nemen onder invloed van alcohol, drugs of medicatie die de veiligheid of het gedrag kan beïnvloeden.",
                "Eigen consumpties, zoals eten en drinken, mogen niet worden meegenomen of genuttigd in de vestiging.",
                "Het gebruik van vervoermiddelen zoals skateboards, rolschaatsen, skeelers, loopfietsen, (elektrische) steps en hoverboards is verboden, met uitzondering van hulpmiddelen zoals scootmobielen, rolstoelen, rollators en kinder- of babywagens.",
                "Bezoekers mogen geen steek-, slag- of vuurwapens, alcohol of verdovende middelen bij zich dragen.",
                "Op verzoek van Minimasters Playground dient de bezoeker een geldig identiteitsbewijs te tonen.",
                "Indien de omstandigheden dit vereisen, behoudt Minimasters Playground zich het recht voor preventieve veiligheidscontroles uit te voeren bij de ingang, waaronder oppervlakkige fouillering en tassencontrole (privaatrechtelijke oppervlakkige veiligheidsfouillering, POV). Toegang tot de vestiging is afhankelijk van medewerking aan deze controles.",
                "Indien een bezoeker handelt in strijd met de overeenkomst, de fatsoensnormen of wettelijke voorschriften – bijvoorbeeld bij vernieling, beschadiging, diefstal, overlast of het negeren van aanwijzingen – is Minimasters Playground gerechtigd: a) de bezoeker (verdere) toegang tot de vestiging te weigeren zonder restitutie van het toegangsbewijs; b) een tijdelijk of permanent toegangsverbod op te leggen voor één of meerdere vestigingen; c) aangifte te doen bij de politie; d) de bezoeker aansprakelijk te stellen voor alle door Minimasters Playground geleden schade, inclusief verlies en gederfde winst.",
              ]} prefix="5" />
            </Section>

            {/* Article 6 */}
            <Section color="#67CD8A" title="Artikel 6. Betaling en incasso">
              <NumberedList items={[
                "Betaling voor deelname aan activiteiten dient volledig te geschieden vóór aanvang van de betreffende activiteit.",
                "Indien een factuur in het kader van de overeenkomst is verstrekt, dient de bezoeker het openstaande bedrag te voldoen binnen de op de factuur vermelde termijn. Ontbreekt een betalingstermijn, dan dient betaling uiterlijk veertien (14) dagen na factuurdatum te geschieden op de vermelde bankrekening.",
              ]} prefix="6" />
            </Section>

            {/* Article 7 */}
            <Section color="#BB76FF" title="Artikel 7. Annulering">
              <NumberedList items={[
                "Een bezoeker kan een reservering tot 24 uur voor de datum van de gereserveerde activiteit kosteloos annuleren en het betaalde bedrag volledig terugkrijgen.",
                "Bij annulering binnen 24 uur voor de activiteit is restitutie niet mogelijk. De bezoeker kan in dat geval alleen de datum van de activiteit kosteloos verplaatsen naar een ander beschikbaar moment.",
                "Terugbetalingen op grond van artikel 7.1 worden binnen veertien (14) dagen na de oorspronkelijke reserveringsdatum teruggestort op de rekening van de bezoeker.",
              ]} prefix="7" />
            </Section>

            {/* Article 8 */}
            <Section color="#FF5757" title="Artikel 8. Aansprakelijkheid en overmacht">
              <NumberedList items={[
                "Het betreden van de vestiging van Minimasters Playground, deelname aan activiteiten en het gebruik van speeltoestellen geschiedt volledig op eigen risico van de bezoeker. De bezoeker erkent dat aan het spelen en verblijven in de vestiging risico's verbonden zijn, waaronder het risico op (ernstig) lichamelijk letsel en/of materiële schade.",
                "Indien Minimasters Playground aansprakelijk is wegens een toerekenbare tekortkoming in de uitvoering van de overeenkomst of op welke rechtsgrond dan ook, is deze aansprakelijkheid beperkt tot maximaal het door de bezoeker betaalde factuurbedrag (exclusief btw), dan wel tot het bedrag dat in het betreffende geval door de aansprakelijkheidsverzekeraar van Minimasters Playground wordt uitgekeerd.",
                "Minimasters Playground is niet aansprakelijk voor schade die is ontstaan doordat zij heeft vertrouwd op door of namens de bezoeker verstrekte onjuiste, onvolledige of misleidende informatie.",
                "Minimasters Playground aanvaardt geen aansprakelijkheid voor vergissingen of onjuistheden in publicaties, aankondigingen, aanbiedingen of andere informatievoorziening aan bezoekers, noch voor fouten bij de verkoop van toegangsbewijzen door derden.",
                "Aansprakelijkheid voor indirecte schade is uitgesloten. Hieronder wordt onder meer verstaan: gevolgschade, winstderving, gemiste besparingen, reputatieschade, stagnatieschade, schade door aanspraken van derden, schade voortvloeiend uit door de bezoeker voorgeschreven materialen of zaken, en schade die verband houdt met door de bezoeker aangewezen derden.",
                "Minimasters Playground is niet aansprakelijk voor verlies, diefstal, beschadiging of vermissing van eigendommen van bezoekers, ook niet indien gebruik wordt gemaakt van een (gratis) onbewaakte garderobe of kluisjes. De bezoeker vrijwaart Minimasters Playground tegen aanspraken van derden ter zake.",
                "Behoudens in het geval nakoming blijvend onmogelijk is, dient de bezoeker Minimasters Playground schriftelijk en zonder onredelijke vertraging in gebreke te stellen indien sprake is van een tekortkoming in de nakoming van de overeenkomst. Daarbij dient een redelijke termijn voor herstel te worden geboden.",
                "Iedere aanspraak op schadevergoeding vervalt twaalf (12) maanden na het moment waarop de schade is ontstaan, tenzij de bezoeker binnen deze termijn een gerechtelijke procedure aanhangig heeft gemaakt.",
                "De bezoeker is aansprakelijk voor schade die Minimasters Playground lijdt als gevolg van handelen of nalaten in strijd met de overeenkomst, deze algemene voorwaarden, of het niet opvolgen van instructies van medewerkers of ingeschakelde derden. Tevens is de bezoeker aansprakelijk voor schade veroorzaakt door personen voor wie hij verantwoordelijk is of met wie hij de vestiging bezoekt.",
                "Minimasters Playground draagt zorg voor een veilige speelomgeving. De aanwezige speeltoestellen en faciliteiten voldoen aan de geldende wettelijke veiligheidsnormen en keuringsvereisten. Het gebruik van de speelvoorzieningen geschiedt evenwel op eigen risico. Ouders en/of begeleiders blijven te allen tijde verantwoordelijk voor het toezicht op en het gedrag van de minderjarige bezoekers die zij begeleiden.",
                "In geval van overmacht is Minimasters Playground gerechtigd haar verplichtingen uit de overeenkomst tijdelijk op te schorten. Indien de situatie van overmacht langer dan zes (6) maanden voortduurt, hebben beide partijen het recht de overeenkomst te ontbinden zonder dat een verplichting tot schadevergoeding ontstaat.",
                "Onder overmacht wordt in ieder geval verstaan: oorlog, dreiging van oorlog, oproer, mobilisatie, binnenlandse of buitenlandse onlusten, overheidsmaatregelen, pandemieën, stakingen of werkonderbrekingen, storingen in energie-, internet- of telecommunicatievoorzieningen, brand, technische defecten, sabotage, inbraak, natuurrampen, extreme weersomstandigheden, transportproblemen, blokkades en andere omstandigheden die buiten de redelijke invloedssfeer van Minimasters Playground liggen.",
                "Indien Minimasters Playground bij het intreden van overmacht reeds gedeeltelijk aan haar verplichtingen heeft voldaan of nog gedeeltelijk kan voldoen, is zij gerechtigd dit deel afzonderlijk te factureren. De bezoeker is gehouden deze factuur te voldoen.",
                "De in dit artikel opgenomen aansprakelijkheidsbeperkingen en -uitsluitingen gelden niet voor zover de schade het directe gevolg is van opzet of bewuste roekeloosheid van Minimasters Playground.",
                "Schade als gevolg van overmacht komt niet voor vergoeding in aanmerking, anders dan eventuele restitutie of kwijtschelding van het gedeelte van de overeenkomst dat door overmacht niet kan worden uitgevoerd.",
              ]} prefix="8" />
            </Section>

            {/* Article 9 */}
            <Section color="#67CD8A" title="Artikel 9. Klachtenregeling">
              <NumberedList items={[
                "De bezoeker is verplicht een klacht zo spoedig mogelijk te melden. Indien onmiddellijke melding redelijkerwijs niet mogelijk is, dient de klacht uiterlijk vóór het verlaten van de vestiging te worden gemeld bij de vestigingsmanager van Minimasters Playground.",
                "Indien de klacht betrekking heeft op (mogelijke) schade waarvoor de bezoeker Minimasters Playground aansprakelijk wil stellen, dient de gestelde schade vóór vertrek uit de vestiging aan de vestigingsmanager te worden getoond. De vestigingsmanager zal hiervan een rapport opstellen.",
                "Naar aanleiding van een ingediende klacht zullen de bezoeker en de vestigingsmanager gezamenlijk trachten tot een passende oplossing te komen. Indien dit niet tot een bevredigende uitkomst leidt, kan de bezoeker de klacht binnen veertien (14) dagen na het bezoek schriftelijk indienen bij de directie van Minimasters Playground.",
              ]} prefix="9" />
            </Section>

            {/* Article 10 */}
            <Section color="#BB76FF" title="Artikel 10. Wijzigingen en slotbepalingen">
              <NumberedList items={[
                "Wijzigingen of aanvullingen op de overeenkomst zijn uitsluitend geldig indien deze schriftelijk door Minimasters Playground zijn bevestigd.",
                "Indien één of meerdere bepalingen van deze algemene voorwaarden geheel of gedeeltelijk nietig blijken te zijn, vernietigd worden of anderszins hun rechtsgeldigheid verliezen, blijven de overige bepalingen onverminderd van kracht.",
                "Minimasters Playground behoudt zich het recht voor deze algemene voorwaarden eenzijdig te wijzigen of aan te vullen. De meest actuele versie is van toepassing en zal kenbaar worden gemaakt via de daarvoor gebruikelijke kanalen.",
              ]} prefix="10" />
            </Section>

            {/* Article 11 */}
            <Section color="#5763FF" title="Artikel 11. Privacy">
              <NumberedList items={[
                "In het kader van het aangaan en uitvoeren van de overeenkomst(en) kan Minimasters Playground persoonsgegevens van bezoekers verwerken. Deze persoonsgegevens worden verwerkt in overeenstemming met het privacybeleid van Minimasters Playground.",
                "Persoonsgegevens worden uitsluitend gebruikt voor de doeleinden waarvoor ze zijn verzameld, tenzij de bezoeker hier expliciet toestemming voor geeft of indien gebruik anderszins wettelijk verplicht is.",
              ]} prefix="11" />
            </Section>

            {/* Article 12 */}
            <Section color="#FF5757" title="Artikel 12. Toepasselijk recht en geschillen">
              <NumberedList items={[
                "Op deze algemene voorwaarden en op de overeenkomst tussen de bezoeker en Minimasters Playground is uitsluitend Nederlands recht van toepassing.",
                "Geschillen die voortvloeien uit of verband houden met de overeenkomst zullen in eerste instantie worden voorgelegd aan de bevoegde rechter in de vestigingsplaats van Minimasters Playground, tenzij de wet dwingend anders voorschrijft.",
              ]} prefix="12" />
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

function DefinitionList({ items }: { items: { term: string; def: string }[] }) {
  return (
    <div className="space-y-3 ml-2">
      {items.map((item, i) => (
        <div key={i} className="pl-4 border-l-2 border-[#5763FF]/20">
          <span className="font-semibold text-gray-800">{item.term}:</span>{" "}
          <span className="text-gray-700">{item.def}</span>
        </div>
      ))}
    </div>
  );
}

function NumberedList({ items, prefix }: { items: (string | null)[]; prefix: string }) {
  return (
    <div className="space-y-3 ml-2">
      {items.map((item, i) => {
        if (item === null) return null;
        return (
          <div key={i} className="flex gap-3 text-gray-700 leading-relaxed">
            <span className="font-bold text-[#FFCA58] flex-shrink-0">{prefix}.{i + 1}</span>
            <span>{item}</span>
          </div>
        );
      })}
    </div>
  );
}

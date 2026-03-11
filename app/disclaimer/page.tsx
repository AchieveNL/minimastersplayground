"use client";

import Nav from "../components/Nav";
import Footer from "../components/Footer";
import SmoothScroll from "../components/SmoothScroll";
import Link from "next/link";

export default function DisclaimerPage() {
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
            <div className="inline-block bg-gradient-to-r from-[#67CD8A] to-[#A5DEB9] px-8 py-3 rounded-br-4xl rounded-tl-4xl mb-6">
              <h1
                className="text-2xl md:text-4xl text-white font-bold"
                style={{ fontFamily: "StudlyFree, sans-serif" }}
              >
                DISCLAIMER
              </h1>
            </div>
            <p className="text-[#67CD8A] font-semibold text-sm md:text-base">
              Minimasters Playground
            </p>
          </div>

          {/* Content Card */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-lg border border-white/40">
            <p className="text-gray-700 leading-relaxed mb-8">
              De informatie op de website en andere communicatie-uitingen van Minimasters Playground is
              uitsluitend bedoeld voor algemene informatiedoeleinden. Hoewel wij zorgvuldig proberen correcte en
              actuele informatie te verstrekken, kunnen wij de juistheid, volledigheid of actualiteit van de inhoud
              niet garanderen.
            </p>

            {/* Sections */}
            <Section color="#FF5757" title="Gebruik van de website en diensten">
              <p className="text-gray-700 leading-relaxed">
                Het gebruik van de website, de inhoud daarvan, en de faciliteiten van Minimasters Playground gebeurt
                volledig op eigen risico. Minimasters Playground is niet aansprakelijk voor directe of indirecte schade
                die kan voortvloeien uit het gebruik van de website, de inhoud daarvan, of het gebruik van de
                vestiging(en) en speeltoestellen.
              </p>
            </Section>

            <Section color="#5763FF" title="Externe links">
              <p className="text-gray-700 leading-relaxed">
                Onze website kan links bevatten naar websites van derden. Minimasters Playground is niet
                verantwoordelijk voor de inhoud, functionaliteit, of het privacybeleid van deze externe websites.
                Gebruik van deze websites gebeurt op eigen risico.
              </p>
            </Section>

            <Section color="#67CD8A" title="Intellectuele eigendomsrechten">
              <p className="text-gray-700 leading-relaxed">
                Alle inhoud van de website, waaronder teksten, afbeeldingen, logo&apos;s, ontwerpen en software, is
                eigendom van Minimasters Playground of haar licentiegevers. Het is niet toegestaan om deze inhoud
                zonder voorafgaande schriftelijke toestemming te kopiëren, verspreiden of te gebruiken voor
                commerciële doeleinden.
              </p>
            </Section>

            <Section color="#BB76FF" title="Wijzigingen">
              <p className="text-gray-700 leading-relaxed">
                Minimasters Playground behoudt zich het recht voor om de inhoud van de website, de diensten en
                deze disclaimer op elk moment te wijzigen zonder voorafgaande kennisgeving.
              </p>
            </Section>

            <Section color="#FF5757" title="Beperkingen aansprakelijkheid">
              <p className="text-gray-700 leading-relaxed">
                Minimasters Playground is niet aansprakelijk voor enige schade, van welke aard dan ook, die
                voortvloeit uit het gebruik van onze website, informatievoorziening, of faciliteiten, tenzij wettelijk
                anders vereist.
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

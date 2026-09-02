"use client";

import { useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import SmoothScroll from "../components/SmoothScroll";
import AnimatedSlider from "../components/AnimatedSilder";
import Preloader from "../components/Preloader";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const TICKETS_URL = "https://tickets.minimastersplayground.nl/";

function CardWrap({ children }: { children: React.ReactNode }) {
  const ref = useScrollAnimation<HTMLDivElement>({ type: "fadeUp", duration: 1 });
  return (
    <div ref={ref} className="w-full max-w-3xl mx-auto">
      {children}
    </div>
  );
}

export default function OnsAanbodPage() {
  const [loaded, setLoaded] = useState(false);
  const badgeRef = useScrollAnimation<HTMLDivElement>({
    type: "scaleIn",
    duration: 1,
  });

  return (
    <>
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      <SmoothScroll />
      <div style={{ visibility: loaded ? "visible" : "hidden" }}>
        <Nav />
        <main
          className="overflow-x-clip"
          style={{ fontFamily: "Quicksand, sans-serif" }}
        >
        {/* Section badge — same style as homepage */}
        <div
          ref={badgeRef}
          className="flex w-fit px-5 md:px-10 py-3 sm:py-4 md:py-3 pl-10 md:pl-20 items-center relative justify-center mx-auto mt-10 md:mt-16 bg-linear-to-r from-[#67CD8A] via-[#67CD8A] to-[#A5DEB9] rounded-br-4xl overflow-visible"
        >
          <img
            loading="lazy"
            src="/assets/badges/ticket.svg"
            className="absolute md:hidden"
            style={{ width: "100px", left: "-20%" }}
            alt=""
          />
          <img
            loading="lazy"
            src="/assets/badges/ticket.svg"
            className="absolute hidden md:block"
            style={{ width: "100px", left: -65 }}
            alt=""
          />
          <h1 className="font-bold md:text-lg text-center text-[#FDF9EF] md:pl-0 pl-6 w-full rounded-br-4xl">
            ONS AANBOD
          </h1>
        </div>

        {/* Cards — exported from Figma, whole card clicks through to tickets */}
        <div className="relative flex flex-col gap-14 md:gap-20 px-4 sm:px-8 mt-12 md:mt-16 mb-16 md:mb-24">
          {/* Faded background watermarks in the side gutters */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none select-none hidden lg:block"
          >
            <img src="/assets/aanbod/politiepet.png" alt="" className="absolute w-44 xl:w-56 left-0 top-[0.5%]" />
            <img src="/assets/aanbod/gereedschap.png" alt="" className="absolute w-40 xl:w-52 right-0 top-[13%]" />
            <img src="/assets/aanbod/vuur.png" alt="" className="absolute w-52 xl:w-64 left-0 top-[31%]" />
            <img src="/assets/aanbod/fire-alarm.png" alt="" className="absolute w-36 xl:w-44 right-0 top-[38%]" />
            <img src="/assets/aanbod/brandslang.png" alt="" className="absolute w-80 xl:w-[440px] left-[34%] top-[63.4%] rotate-[150deg]" />
            <img src="/assets/aanbod/boerderij.png" alt="" className="absolute w-48 xl:w-60 left-0 top-[70%]" />
            <img src="/assets/aanbod/molen.png" alt="" className="absolute w-40 xl:w-52 right-0 top-[84%]" />
            <img src="/assets/aanbod/kuiken.png" alt="" className="absolute w-40 xl:w-48 left-0 bottom-[-4%]" />
          </div>
          <CardWrap>
            <div className="relative">
              <img
                src="/assets/aanbod/schoolreisje.webp"
                alt="Schoolreisje — €14,95 per kind en per volwassene: 2,5 uur lang spelen, onbeperkt limonade, begeleiders 1 koffie of thee en 1 gebak naar keuze. Vanaf 10 personen."
                className="w-full h-auto rounded-[40px]"
              />
              {/* Real button covering the baked-in one */}
              <a
                href={TICKETS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center min-w-[34%] px-[4vw] sm:px-8 py-[1.5vw] sm:py-3 rounded-xl sm:rounded-2xl font-bold text-white text-[3.5vw] sm:text-xl md:text-2xl tracking-widest hover:scale-105 transition-transform"
                style={{
                  top: "79.3%",
                  background: "linear-gradient(135deg, #A5DEB9 0%, #8BC34A 100%)",
                }}
              >
                BOEK NU
              </a>
            </div>
          </CardWrap>

          <CardWrap>
            <div className="relative">
              <img
                src="/assets/aanbod/verjaardag.webp"
                alt="Verjaardag — €19,95 per kind, €15,95 per volwassene: 2,5 uur lang spelen, opgedekte tafel, onbeperkt limonade, zakje chips, zakje snoep bij vertrek, cadeautje voor de jarige, ouders 1 frisdrank en 1 gebak naar keuze. Vanaf 10 personen."
                className="w-full h-auto rounded-[40px]"
              />
              {/* Real button covering the baked-in one */}
              <a
                href={TICKETS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center min-w-[34%] px-[4vw] sm:px-8 py-[1.5vw] sm:py-3 rounded-xl sm:rounded-2xl font-bold text-white text-[3.5vw] sm:text-xl md:text-2xl tracking-widest hover:scale-105 transition-transform"
                style={{
                  top: "88%",
                  background: "linear-gradient(135deg, #A5DEB9 0%, #8BC34A 100%)",
                }}
              >
                BOEK NU
              </a>
            </div>
          </CardWrap>

          {/* Privé feestje — export misses the note + button, overlaid in HTML */}
          <CardWrap>
            <div className="relative">
              <img
                src="/assets/aanbod/prive-feestje.webp"
                alt="Privé feestje — exclusieve belevenis met de volledige locatie voor jullie alleen. 2,5 uur €1.000 of 3 uur €1.200, min. café afname €500, maximaal 70 gasten."
                className="w-full h-auto rounded-[40px]"
              />
              {/* sm and up: overlaid inside the card's empty zone */}
              <div
                className="absolute left-[10%] right-[10%] hidden sm:flex flex-col items-center gap-4 text-center"
                style={{ bottom: "12.5%" }}
              >
                <p className="text-[#5FB8AE] font-medium leading-snug sm:text-sm md:text-base">
                  Geef het feest <b>een persoonlijke touch!</b>
                  <br />
                  Jullie zijn van harte welkom om <b>het zitgedeelte</b> te
                  versieren.
                  <br />
                  <b>Let op!</b> vuurwerk, confetti en gezichtsschmink is{" "}
                  <b>niet toegestaan.</b> ⭐
                </p>
                <a
                  href={TICKETS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-12 md:px-14 py-3 rounded-2xl font-bold text-white text-xl md:text-2xl tracking-widest hover:scale-105 transition-transform shadow-md"
                  style={{
                    background:
                      "linear-gradient(135deg, #A5DEB9 0%, #8BC34A 100%)",
                  }}
                >
                  BOEK NU
                </a>
              </div>
            </div>
            {/* below sm: rendered under the card so text stays readable */}
            <div className="sm:hidden flex flex-col items-center gap-3 text-center mt-4 px-2">
              <p className="text-[#5FB8AE] font-medium leading-relaxed text-sm">
                Geef het feest <b>een persoonlijke touch!</b> Jullie zijn van
                harte welkom om <b>het zitgedeelte</b> te versieren.{" "}
                <b>Let op!</b> vuurwerk, confetti en gezichtsschmink is{" "}
                <b>niet toegestaan.</b> ⭐
              </p>
              <a
                href={TICKETS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-2.5 rounded-xl font-bold text-white text-base tracking-widest hover:scale-105 transition-transform shadow-md"
                style={{
                  background: "linear-gradient(135deg, #A5DEB9 0%, #8BC34A 100%)",
                }}
              >
                BOEK NU
              </a>
            </div>
          </CardWrap>
        </div>

        {/* Photo strip before footer */}
          <AnimatedSlider direction="right" variant="footer" />
        </main>
        <Footer />
      </div>
    </>
  );
}

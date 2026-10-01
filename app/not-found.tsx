import type { Metadata } from "next";
import Link from "next/link";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";

export const metadata: Metadata = {
  title: "Pagina niet gevonden — Minimasters Playground",
  description:
    "Deze pagina bestaat niet (meer). Ga terug naar de homepage of bekijk ons aanbod.",
  robots: { index: false, follow: true },
};

/** The 404 digits, so the colour stays decoration and the text stays readable. */
const DIGITS = [
  { char: "4", color: "#FF5757" },
  { char: "0", color: "#5763FF" },
  { char: "4", color: "#67CD8A" },
];

export default function NotFound() {
  return (
    <>
      <SmoothScroll />
      <Nav />
      <style>{`
        @keyframes notFoundFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .nf-float { animation: none !important; }
        }
      `}</style>

      <main
        className="relative min-h-screen overflow-x-clip px-4 sm:px-8 md:px-16 lg:px-32 py-12 md:py-20 pb-40 md:pb-64"
        style={{ fontFamily: "Quicksand, sans-serif" }}
      >
        {/* Two floating props — the guideline caps animated elements at two.
            These come from the badge set: the icons under assets/icons and
            assets/aanbod are white-at-15% watermarks meant for the coloured
            sections, and they disappear against this cream background. */}
        <img
          src="/assets/badges/vragen.svg"
          alt=""
          aria-hidden="true"
          className="nf-float pointer-events-none absolute -left-6 top-28 hidden w-28 sm:block sm:w-36 md:left-2 md:top-32 md:w-48 lg:left-8 lg:w-56"
          style={{ animation: "notFoundFloat 4.2s ease-in-out infinite" }}
        />
        <img
          src="/assets/badges/ticket.svg"
          alt=""
          aria-hidden="true"
          className="nf-float pointer-events-none absolute -right-6 top-64 hidden w-24 sm:block sm:w-32 md:right-2 md:top-56 md:w-44 lg:right-8 lg:w-52"
          style={{ animation: "notFoundFloat 3.7s ease-in-out 0.6s infinite" }}
        />

        <div className="relative mx-auto max-w-3xl">
          {/* Badge — same shape language as the section badges elsewhere */}
          <div className="mx-auto mb-8 flex w-fit items-center justify-center rounded-tr-[10px] rounded-br-[60px] bg-linear-to-r from-[#FF5757] to-[#ff8a8a] px-10 py-3 md:px-14 md:py-4">
            <span
              className="text-xl text-white md:text-3xl"
              style={{ fontFamily: "StudlyFree, sans-serif" }}
            >
              OEPS!
            </span>
          </div>

          <div className="rounded-3xl border border-white/40 bg-white/60 p-6 text-center shadow-lg backdrop-blur-sm md:p-12">
            <p
              className="flex items-center justify-center gap-1 text-[86px] leading-none sm:text-[120px] md:text-[150px]"
              style={{ fontFamily: "StudlyFree, sans-serif" }}
            >
              {DIGITS.map(({ char, color }, i) => (
                <span
                  key={i}
                  style={{ color, textShadow: "0 6px 0 rgba(84, 62, 40, 0.08)" }}
                >
                  {char}
                </span>
              ))}
            </p>

            <h1
              className="mt-4 text-2xl text-[#543E28] md:text-4xl"
              style={{ fontFamily: "StudlyFree, sans-serif" }}
            >
              Deze pagina is zoekgeraakt
            </h1>

            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-gray-700 md:text-lg">
              Misschien heeft een van onze mini-helden hem opgeruimd. Geen
              zorgen — hieronder vind je zo weer de weg terug.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/"
                className="inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center rounded-full bg-linear-to-r from-[#FFCA58] to-[#FFDB8D] px-8 py-3 font-bold text-white shadow-md transition-opacity duration-200 hover:opacity-90 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#FFCA58]/50 sm:w-auto"
                style={{ fontFamily: "StudlyFree, sans-serif" }}
              >
                TERUG NAAR HOME
              </Link>
              <Link
                href="/ons-aanbod"
                className="inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center rounded-full border-[3px] border-[#67CD8A] px-8 py-3 font-bold text-[#3fa060] transition-colors duration-200 hover:bg-[#67CD8A]/10 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#67CD8A]/40 sm:w-auto"
                style={{ fontFamily: "StudlyFree, sans-serif" }}
              >
                BEKIJK ONS AANBOD
              </Link>
            </div>

            <p className="mt-6 text-sm text-gray-600">
              Direct een tijdslot reserveren?{" "}
              <a
                href="https://tickets.minimastersplayground.nl/"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer font-bold text-[#5763FF] underline underline-offset-2 transition-colors duration-200 hover:text-[#3d49e0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5763FF]/40"
              >
                Bekijk de tickets
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

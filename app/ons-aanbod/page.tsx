"use client";

import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import SmoothScroll from "../components/SmoothScroll";
import AnimatedSlider from "../components/AnimatedSilder";
import Preloader from "../components/Preloader";
import { AanbodKaart, type KaartContent } from "../components/AanbodCard";
import { useContent } from "../content-context";
import { coiny } from "../fonts";
import OutlinedText, { GOLD_FROM, GOLD_TO } from "../components/OutlinedText";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

function CardWrap({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useScrollAnimation<HTMLDivElement>({ type: "fadeUp", duration: 1 });
  return (
    <div id={id} ref={ref} className={`w-full scroll-mt-32 ${className}`}>
      {children}
    </div>
  );
}

/**
 * One offer: the card, with its conditions image beside it on desktop and
 * underneath on phones. Without a conditions image the card keeps the width
 * of one column, centred.
 */
function AanbodRij({
  id,
  content,
  alt,
}: {
  id: string;
  content: KaartContent & { voorwaardenAfbeelding?: string };
  alt: string;
}) {
  const voorwaarden = content.voorwaardenAfbeelding?.trim();
  return (
    <CardWrap
      id={id}
      className={
        voorwaarden
          ? "grid gap-6 md:gap-8 lg:grid-cols-2 lg:items-start lg:gap-12"
          : "lg:mx-auto lg:max-w-[calc((100%-3rem)/2)]"
      }
    >
      <AanbodKaart content={content} alt={alt} />
      {voorwaarden && (
        <div className="@container">
          <img
            src={voorwaarden}
            alt={`Voorwaarden ${alt.toLowerCase()}`}
            loading="lazy"
            className="block h-auto w-full rounded-[5cqw]"
          />
        </div>
      )}
    </CardWrap>
  );
}

export default function OnsAanbodPage() {
  const { kaartVerjaardag, kaartPrive, kaartSchoolreisje } = useContent();
  const [loaded, setLoaded] = useState(false);
  const badgeRef = useScrollAnimation<HTMLDivElement>({
    type: "scaleIn",
    duration: 1,
  });

  // Scroll to the card named in the URL hash once the preloader is gone
  useEffect(() => {
    if (!loaded) return;
    const id = window.location.hash.slice(1);
    if (!id) return;
    const el = document.getElementById(id);
    if (el) {
      requestAnimationFrame(() =>
        el.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
    }
  }, [loaded]);

  return (
    <>
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      <SmoothScroll />
      <div style={{ visibility: loaded ? "visible" : "hidden" }}>
        <Nav ready={loaded} />
        <main
          className="overflow-x-clip"
          style={{ fontFamily: "Quicksand, sans-serif" }}
        >
        {/* Section badge — same style as homepage */}
        <div
          ref={badgeRef}
          className="flex w-fit px-5 md:px-14 py-3 sm:py-4 md:py-4 pl-10 md:pl-24 items-center relative justify-center mx-auto mt-12 md:mt-28 bg-linear-to-r from-[#67CD8A] via-[#67CD8A] to-[#A5DEB9] rounded-tr-[10px] rounded-br-[60px] overflow-visible"
        >
          <img
            loading="lazy"
            src="/assets/badges/ticket.svg"
            className="absolute md:hidden"
            style={{ width: "108px", left: "-30%" }}
            alt=""
          />
          <img
            loading="lazy"
            src="/assets/badges/ticket.svg"
            className="absolute hidden md:block"
            style={{ width: "145px", left: -95 }}
            alt=""
          />
          <h1 className={`${coiny.className} font-normal md:text-2xl text-center text-[#FDF9EF] md:pl-2 pl-6 whitespace-nowrap`}>
            <OutlinedText from={GOLD_FROM} to={GOLD_TO}>
              ONS AANBOD
            </OutlinedText>
          </h1>
        </div>

        {/* One row per offer: the card (image + BOEK NU link) with its
            conditions image beside it, all set in the dashboard. A card
            without a conditions image stays centred at the same width. */}
        <div className="relative px-4 sm:px-8 mt-12 md:mt-24 mb-16 md:mb-24">
          {/* Faded background watermarks in the side gutters */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none select-none hidden lg:block"
          >
            <style>{`
              @keyframes wmFloat {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-12px); }
              }
            `}</style>
            <img src="/assets/aanbod/politiepet.png" alt="" className="absolute w-56 xl:w-80 left-0 top-[0.5%]" style={{ animation: "wmFloat 4.2s ease-in-out 0s infinite" }} />
            <img src="/assets/aanbod/gereedschap.png" alt="" className="absolute w-40 xl:w-52 right-0 top-[13%]" style={{ animation: "wmFloat 3.8s ease-in-out 0.4s infinite" }} />
            <img src="/assets/aanbod/vuur.png" alt="" className="absolute w-52 xl:w-64 left-0 top-[31%]" style={{ animation: "wmFloat 4.6s ease-in-out 0.8s infinite" }} />
            <img src="/assets/aanbod/fire-alarm.png" alt="" className="absolute w-36 xl:w-44 right-0 top-[38%]" style={{ animation: "wmFloat 3.6s ease-in-out 1.1s infinite" }} />
            <img src="/assets/aanbod/brandslang.png" alt="" className="absolute w-80 xl:w-[440px] left-[34%] top-[63.4%] rotate-[150deg]" style={{ animation: "wmFloat 4.3s ease-in-out 0.7s infinite" }} />
            <img src="/assets/aanbod/boerderij.png" alt="" className="absolute w-48 xl:w-60 left-0 top-[70%]" style={{ animation: "wmFloat 4.4s ease-in-out 0.6s infinite" }} />
            <img src="/assets/aanbod/molen.png" alt="" className="absolute w-40 xl:w-52 right-0 top-[84%]" style={{ animation: "wmFloat 4s ease-in-out 1.3s infinite" }} />
            <img src="/assets/aanbod/kuiken.png" alt="" className="absolute w-40 xl:w-48 left-0 bottom-[-4%]" style={{ animation: "wmFloat 4.8s ease-in-out 0.2s infinite" }} />
          </div>
          <div className="relative mx-auto flex max-w-xl flex-col gap-12 md:gap-16 lg:max-w-6xl">
            <AanbodRij id="verjaardag" content={kaartVerjaardag} alt="Verjaardag" />
            <AanbodRij id="prive-feestje" content={kaartPrive} alt="Privé feestje" />
            <AanbodRij id="schoolreisje" content={kaartSchoolreisje} alt="Schoolreisje" />
          </div>
        </div>

        {/* Photo strip before footer */}
          <AnimatedSlider direction="right" variant="footer" />
        </main>
        <Footer />
      </div>
    </>
  );
}

"use client";

import Mobile from "./Mobile";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function MobileSection() {
  const leftRef = useScrollAnimation<HTMLDivElement>({ type: "fadeLeft", duration: 1.1, distance: 45 });
  const centerRef = useScrollAnimation<HTMLDivElement>({ type: "fadeUp", duration: 1.1, delay: 0.15 });
  const rightRef = useScrollAnimation<HTMLDivElement>({ type: "fadeRight", duration: 1.1, delay: 0.1, distance: 45 });
  const mobileTextRef = useScrollAnimation<HTMLHeadingElement>({ type: "fadeUp", duration: 0.9, delay: 0.2 });

  return (
    <div
      id="loyalty"
      style={{ fontFamily: "Quicksand" }}
      className="relative flex lg:flex-row flex-col px-6 sm:px-10 md:px-16 lg:px-20 xl:px-36 2xl:px-48 overflow-hidden pt-10 lg:pb-28 pb-20 lg:gap-0 gap-10"
    >
      <style>{`
        @keyframes phoneFloat1 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes phoneFloat2 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
      <img loading="lazy"
        src="/assets/mobile/icon1.svg"
        className="absolute right-0 -top-20 lg:w-60 w-30"
        alt=""
      />
      <img loading="lazy"
        src="/assets/mobile/icon2.svg"
        className="absolute lg:-bottom-40 lg:w-80 w-30 lg:left-1/2 lg:-translate-x-[80%] right-0 bottom-[60%] -z-10 translate-y-[30%] lg:translate-y-0"
        alt=""
      />
      <img loading="lazy"
        src="/assets/mobile/icon3.svg"
        className="absolute left-0 top-20 lg:w-40 w-30"
        alt=""
      />
      <div ref={leftRef} className="relative flex flex-col items-center lg:gap-8 gap-5">
        <div className="flex w-fit lg:px-10 px-5 lg:py-4 py-3 lg:pl-20 pl-10 items-center relative justify-center mx-auto m-auto bg-linear-to-r from-[#67CD8A] via-[#67CD8A] to-[#A5DEB9] rounded-br-4xl">
          <img loading="lazy"
            src="/elements/Klok Icoon.svg"
            className="absolute lg:hidden"
            style={{ width: "100px", left: "-10%" }}
            alt=""
          />
          <img loading="lazy"
            src="/elements/Klok Icoon.svg"
            className="absolute hidden lg:block"
            style={{ width: "120px", left: -50 }}
            alt=""
          />
          <h1 className="font-bold lg:text-lg text-center text-[#FDF9EF] lg:pl-0 pl-8 w-full rounded-br-4xl">
            ONZE TIJDSLOTEN{" "}
          </h1>
        </div>
        <div className="w-fit" style={{ animation: "phoneFloat1 3.5s ease-in-out infinite" }}>
          <Mobile
            content={
              <>
                <h1>
                  Elk avontuur duurt 2,5 uur. Kies hieronder jouw speelmoment en
                  ontdek het plezier!
                </h1>
                <div>
                  <h1>Kick start</h1>
                  <h1>09:00 - 11:30</h1>
                </div>
                <div>
                  <h1>Middag avontuur:</h1>
                  <h1>12:00 - 14:30</h1>
                </div>
                <div>
                  <h1>Eind pret:</h1>
                  <h1>15:30 - 17:30</h1>
                </div>
              </>
            }
          />
        </div>
      </div>
      <h1 ref={mobileTextRef} className="text-center text-base sm:text-lg md:text-xl font-semibold lg:hidden block text-[#5763FF] -mt-4 max-w-lg mx-auto">
        Bij ons staat kwaliteit centraal en verdient elk kind een unieke
        speelbeleving. Door te werken met speelsessies zorgen we voor minder
        drukte en meer speelplezier voor iedereen.
      </h1>

      <div ref={centerRef} className="lg:flex hidden flex-col gap-10 w-1/2 m-auto text-[#5763FF] px-6 xl:px-14 items-center mt-20 relative">
        <h1 className="text-center text-xl font-semibold">
          Bij ons staat kwaliteit centraal en verdient elk kind een unieke
          speelbeleving. Door te werken met speelsessies zorgen we voor minder
          drukte en meer speelplezier voor iedereen.
        </h1>
        <div>
          <img loading="lazy"
            src="/MiniMasters Loyalty Arrow (1).svg"
            className="w-30"
            alt=""
          />
        </div>
        <h1 className="text-center text-xl font-semibold">
          Altijd je spaarpunten bij de hand. Zet ons QR code handig in je
          e-wallet. Spelen worden nu nog leuker met sparen.
        </h1>
        <div>
          <img loading="lazy"
            src="/MiniMasters Loyalty Arrow (2).svg"
            className="w-30"
            alt=""
          />
        </div>
      </div>


      <div ref={rightRef} className="relative flex flex-col items-center lg:gap-8 gap-5 lg:mt-0 mt-4">
        <div className="flex w-fit lg:px-10 px-5 lg:py-4 py-2 lg:pl-20 pl-10 items-center relative justify-center mx-auto m-auto bg-linear-to-r from-[#67CD8A] via-[#67CD8A] to-[#A5DEB9] rounded-br-4xl">
          <img loading="lazy"
            src="/elements/Loyalty Icoon.svg"
            className="absolute lg:hidden"
            style={{ width: "100px", left: "-10%" }}
            alt=""
          />
          <img loading="lazy"
            src="/elements/Loyalty Icoon.svg"
            className="absolute hidden lg:block"
            style={{ width: "130px", left: -50 }}
            alt=""
          />
          <h1 className="font-bold lg:text-lg text-center text-[#FDF9EF] lg:pl-0 pl-8 w-full rounded-br-4xl">
            LOYALTY PROGRAMMA
          </h1>
        </div>
        <div className="w-fit" style={{ animation: "phoneFloat2 4s ease-in-out infinite 0.5s" }}>
          <Mobile
            content={
              <>
                <h1>
                  Scan bij elk bezoek onze QR-code! Verzamel punten en spaar
                  voor leuke cadeaus!
                </h1>
                <div>
                  <img loading="lazy"
                    src="/assets/mobile/scan.svg"
                    className="w-[80%] block m-auto"
                    alt=""
                  />
                </div>

                <div>
                  <img loading="lazy"
                    src="/assets/mobile/qrcode.svg"
                    className="w-[80%] block m-auto"
                    alt=""
                  />
                </div>
              </>
            }
          />
        </div>
        <h1 className="text-center text-base sm:text-lg md:text-xl font-semibold lg:hidden block text-[#5763FF] max-w-lg mx-auto">
          Altijd je spaarpunten bij de hand. Zet ons QR code handig in je
          e-wallet. Spelen worden nu nog leuker met sparen.
        </h1>
      </div>
    </div>
  );
}

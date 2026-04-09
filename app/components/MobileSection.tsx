"use client";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function MobileSection() {
  const leftRef = useScrollAnimation<HTMLDivElement>({
    type: "fadeLeft",
    duration: 1.1,
    distance: 45,
  });
  const centerRef = useScrollAnimation<HTMLDivElement>({
    type: "fadeUp",
    duration: 1.1,
    delay: 0.15,
  });
  const rightRef = useScrollAnimation<HTMLDivElement>({
    type: "fadeRight",
    duration: 1.1,
    delay: 0.1,
    distance: 45,
  });
  const mobileTextRef = useScrollAnimation<HTMLHeadingElement>({
    type: "fadeUp",
    duration: 0.9,
    delay: 0.2,
  });

  return (
    <div
      style={{ fontFamily: "Quicksand" }}
      className="relative -mt-14 flex flex-col lg:flex-row items-center lg:items-start justify-center px-4 xs:px-6 sm:px-10 md:px-16 lg:px-8 xl:px-20 2xl:px-40 overflow-visible pt-2 pb-16 sm:pb-20 lg:pb-10 gap-8 sm:gap-10 lg:gap-0"
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

      {/* Decorative icons */}
      <img
        loading="lazy"
        src="/assets/mobile/icon1.svg"
        className="absolute right-0 -top-20 w-20 sm:w-24 md:w-30 lg:w-48 xl:w-60"
        alt=""
      />
      <img
        loading="lazy"
        src="/assets/mobile/icon2.svg"
        className="absolute -z-10 w-20 sm:w-24 md:w-30 lg:w-60 xl:w-80 right-0 bottom-[60%] translate-y-[30%] lg:left-1/2 lg:-translate-x-[80%] lg:right-auto lg:-bottom-40 lg:translate-y-0"
        alt=""
      />
      <img
        loading="lazy"
        src="/assets/mobile/icon3.svg"
        className="absolute left-0 top-20 w-20 sm:w-24 md:w-30 lg:w-32 xl:w-40"
        alt=""
      />

      {/* LEFT — iPhone 1 (Tijdsloten) */}
      <div
        ref={leftRef}
        className="relative flex flex-col items-center gap-4 sm:gap-5 lg:gap-8 w-full sm:w-auto lg:flex-1"
      >
        <div className="flex w-fit items-center relative justify-center mx-auto bg-linear-to-r from-[#67CD8A] via-[#67CD8A] to-[#A5DEB9] rounded-br-4xl py-2 md:py-3 overflow-visible">
          <img
            loading="lazy"
            src="/newclockIcon.svg"
            className="absolute lg:hidden"
            style={{ width: "70px", left: "-22%" }}
            alt=""
          />
          <img
            loading="lazy"
            src="/newclockIcon.svg"
            className="absolute hidden lg:block"
            style={{ width: "100px", left: -55 }}
            alt=""
          />
          <h1 className="font-bold text-sm sm:text-base md:text-lg text-center text-[#FDF9EF] pl-12 sm:pl-14 md:pl-16 pr-4 sm:pr-5 md:pr-8 w-full rounded-br-4xl text-nowrap">
            ONZE TIJDSLOTEN
          </h1>
        </div>
        <div
          className="w-fit mx-auto"
          style={{ animation: "phoneFloat1 3.5s ease-in-out infinite" }}
        >
          <img
            loading="lazy"
            src="/iPhone 1 (Mini Masters).svg"
            alt="iPhone tijdsloten"
            className="block h-[40vh] min-h-[250px] sm:h-[45vh] md:h-[50vh] lg:h-[55vh] xl:h-[60vh] 2xl:h-[65vh] max-h-[600px] w-auto"
          />
        </div>
      </div>

      {/* Mobile-only text (between phones on small screens) */}
      <h1
        ref={mobileTextRef}
        className="text-center text-sm xs:text-base sm:text-lg md:text-xl font-semibold lg:hidden block text-[#5763FF] -mt-2 max-w-md sm:max-w-lg mx-auto px-2"
      >
        Bij ons staat kwaliteit centraal en verdient elk kind een unieke
        speelbeleving. Door te werken met speelsessies zorgen we voor minder
        drukte en meer speelplezier voor iedereen.
      </h1>

      {/* CENTER — Text + arrows (desktop only) */}
      <div
        ref={centerRef}
        className="hidden lg:flex flex-col gap-6 xl:gap-10 lg:w-[35%] xl:w-[30%] m-auto text-[#5763FF] px-4 xl:px-10 items-center mt-20 relative"
      >
        <h1 className="text-center text-base lg:text-lg xl:text-xl font-semibold">
          Bij ons staat kwaliteit centraal en verdient elk kind een unieke
          speelbeleving. Door te werken met speelsessies zorgen we voor minder
          drukte en meer speelplezier voor iedereen.
        </h1>
        <div>
          <img
            loading="lazy"
            src="/MiniMasters Loyalty Arrow (1).svg"
            className="w-20 lg:w-24 xl:w-30"
            alt=""
          />
        </div>
        <h1 className="text-center text-base lg:text-lg xl:text-xl font-semibold">
          Altijd je spaarpunten bij de hand. Zet ons QR code handig in je
          e-wallet. Spelen worden nu nog leuker met sparen.
        </h1>
        <div>
          <img
            loading="lazy"
            src="/MiniMasters Loyalty Arrow (2).svg"
            className="w-20 lg:w-24 xl:w-30"
            alt=""
          />
        </div>
      </div>

      {/* RIGHT — iPhone 2 (Loyalty) */}
      <div
        id="loyalty"
        ref={rightRef}
        className="relative flex flex-col items-center gap-4 sm:gap-5 lg:gap-8 w-full sm:w-auto lg:flex-1 lg:mt-0 mt-2"
      >
        <div className="flex w-fit items-center relative justify-center mx-auto bg-linear-to-r from-[#67CD8A] via-[#67CD8A] to-[#A5DEB9] rounded-br-4xl py-2 md:py-3 overflow-visible">
          <img
            loading="lazy"
            src="/elements/Loyalty Icoon.svg"
            className="absolute lg:hidden"
            style={{ width: "70px", left: "-13%" }}
            alt=""
          />
          <img
            loading="lazy"
            src="/elements/Loyalty Icoon.svg"
            className="absolute hidden lg:block"
            style={{ width: "100px", left: -45 }}
            alt=""
          />
          <h1 className="font-bold text-sm sm:text-base md:text-lg text-center text-[#FDF9EF] pl-12 sm:pl-14 md:pl-16 pr-4 sm:pr-5 md:pr-8 w-full rounded-br-4xl text-nowrap">
            LOYALTY PROGRAMMA
          </h1>
        </div>
        <div
          className="w-fit mx-auto"
          style={{ animation: "phoneFloat2 4s ease-in-out infinite 0.5s" }}
        >
          <img
            loading="lazy"
            src="/iPhone 2 (Mini Masters).svg"
            alt="iPhone loyalty programma"
            className="block h-[40vh] min-h-[250px] sm:h-[45vh] md:h-[50vh] lg:h-[55vh] xl:h-[60vh] 2xl:h-[65vh] max-h-[600px] w-auto"
          />
        </div>
        <h1 className="text-center text-sm xs:text-base sm:text-lg md:text-xl font-semibold lg:hidden block text-[#5763FF] max-w-md sm:max-w-lg mx-auto px-2">
          Altijd je spaarpunten bij de hand. Zet ons QR code handig in je
          e-wallet. Spelen worden nu nog leuker met sparen.
        </h1>
      </div>
    </div>
  );
}

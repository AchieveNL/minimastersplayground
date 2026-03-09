import Mobile from "./Mobile";

export default function MobileSection() {
  return (
    <div
      id="loyalty"
      style={{ fontFamily: "Quicksand" }}
      className="relative flex md:flex-row flex-col px-10 overflow-hidde pt-10 md:pb-28 pb-20 md:gap-0 gap-10"
    >
      <img
        src="/assets/mobile/icon1.svg"
        className="absolute right-0 -top-20 md:w-60 w-30"
        alt=""
      />
      <img
        src="/assets/mobile/icon2.svg"
        className="absolute md:-bottom-40 md:w-80 w-30 md:left-1/2 md:-translate-x-[80%] right-0 bottom-[60%] -z-10 translate-y-[30%] md:translate-y-0"
        alt=""
      />
      <img
        src="/assets/mobile/icon3.svg"
        className="absolute left-0 top-20 md:w-40 w-30"
        alt=""
      />
      <div className="relative flex md:flex-col flex-col-reverse items-center md:gap-8 gap-5">
        <div className="w-fit">
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
        <div className="flex w-fit md:px-10 px-5 md:py-4 py-3 md:pl-20 pl-10 items-center relative justify-center mx-auto m-auto bg-linear-to-r from-[#67CD8A] via-[#67CD8A] to-[#A5DEB9] rounded-br-4xl">
          <img
            src="/assets/icons/time.svg"
            className="absolute md:hidden"
            style={{ width: "100px", left: "-10%" }}
            alt=""
          />
          <img
            src="/assets/icons/time.svg"
            className="absolute hidden md:block"
            style={{ width: "120px", left: -50 }}
            alt=""
          />
          <h1 className="font-bold md:text-lg text-center text-[#FDF9EF] md:pl-0 pl-8 w-full rounded-br-4xl">
            ONZE TIJDSLOTEN{" "}
          </h1>
        </div>
      </div>
      <h1 className="text-center text-xl font-semibold md:hidden block text-[#5763FF] -mt-4">
        Bij ons staat kwaliteit centraal en verdient elk kind een unieke
        speelbeleving. Door te werken met speelsessies zorgen we voor minder
        drukte en meer speelplezier voor iedereen.
      </h1>

      <div className="md:flex hidden flex-col gap-10 w-1/2 m-auto text-[#5763FF] px-14 items-center mt-20">
        <h1 className="text-center text-xl font-semibold">
          Bij ons staat kwaliteit centraal en verdient elk kind een unieke
          speelbeleving. Door te werken met speelsessies zorgen we voor minder
          drukte en meer speelplezier voor iedereen.
        </h1>
        <div className="animate-bounce -rotate-90">
          <img
            src="/assets/icons/arrow.svg"
            className="w-30 rotate-90"
            alt=""
          />
        </div>
        <h1 className="text-center text-xl font-semibold">
          Altijd je spaarpunten bij de hand. Zet ons QR code handig in je
          e-wallet. Spelen worden nu nog leuker met sparen.
        </h1>
        <div className="animate-bounce -rotate-90 -scale-y-100">
          <img
            src="/assets/icons/arrow.svg"
            className="w-30 rotate-90"
            alt=""
          />
        </div>
      </div>

      <div className="relative flex flex-col items-center md:gap-8 gap-5 md:mt-0 mt-4">
        <div className="flex w-fit md:px-10 px-5 md:py-4 py-2 md:pl-20 pl-10 items-center relative justify-center mx-auto m-auto bg-linear-to-r from-[#67CD8A] via-[#67CD8A] to-[#A5DEB9] rounded-br-4xl">
          <img
            src="/assets/icons/hand.svg"
            className="absolute md:hidden"
            style={{ width: "100px", left: "-10%" }}
            alt=""
          />
          <img
            src="/assets/icons/hand.svg"
            className="absolute hidden md:block"
            style={{ width: "130px", left: -50 }}
            alt=""
          />
          <h1 className="font-bold md:text-lg text-center text-[#FDF9EF] md:pl-0 pl-8 w-full rounded-br-4xl">
            LOYALTY PROGRAMMA
          </h1>
        </div>
        <div className="w-fit">
          <Mobile
            content={
              <>
                <h1>
                  Scan bij elk bezoek onze QR-code! Verzamel punten en spaar
                  voor leuke cadeaus!
                </h1>
                <div>
                  <img
                    src="/assets/mobile/scan.svg"
                    className="w-[80%] block m-auto"
                    alt=""
                  />
                </div>

                <div>
                  <img
                    src="/assets/mobile/qrcode.svg"
                    className="w-[80%] block m-auto"
                    alt=""
                  />
                </div>
              </>
            }
          />
        </div>
        <h1 className="text-center text-xl font-semibold md:hidden block text-[#5763FF]">
          Altijd je spaarpunten bij de hand. Zet ons QR code handig in je
          e-wallet. Spelen worden nu nog leuker met sparen.
        </h1>
      </div>
    </div>
  );
}

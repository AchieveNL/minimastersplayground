"use client";

import { useEffect, useRef, useState } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function Location() {
  const openingsRef = useScrollAnimation<HTMLDivElement>({
    type: "fadeLeft",
    duration: 1.1,
    distance: 45,
  });
  const mapRef = useScrollAnimation<HTMLDivElement>({
    type: "fadeRight",
    duration: 1.1,
    delay: 0.15,
    distance: 45,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 1440, h: 800 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setSize({ w: width, h: height });
    });
    observer.observe(el);
    setSize({ w: el.offsetWidth, h: el.offsetHeight });
    return () => observer.disconnect();
  }, []);

  const W = size.w;
  const H = size.h;
  const AMP = W < 768 ? 20 : 40;

  const wavePath = [
    `M 0,${AMP * 1.0}`,
    `C ${W * 0.0335},${AMP * 1.5}  ${W * 0.106},${AMP * 1.83}  ${W * 0.106},${AMP * 1.83}`,
    `C ${W * 0.1576},${AMP * 2.0}  ${W * 0.1877},${AMP * 1.92} ${W * 0.2397},${AMP * 1.83}`,
    `C ${W * 0.2916},${AMP * 1.75} ${W * 0.3202},${AMP * 1.5}  ${W * 0.3715},${AMP * 1.25}`,
    `C ${W * 0.4216},${AMP * 1.0}  ${W * 0.4492},${AMP * 0.67} ${W * 0.4994},${AMP * 0.5}`,
    `C ${W * 0.5471},${AMP * 0.25} ${W * 0.5738},${AMP * 0.08} ${W * 0.6221},${0}`,
    `C ${W * 0.6715},${-AMP * 0.08} ${W * 0.6994},${0} ${W * 0.7487},${AMP * 0.17}`,
    `C ${W * 0.8484},${AMP * 0.5}  ${W},${AMP * 1.67} ${W},${AMP * 1.67}`,
    `L ${W},${H - AMP * 1.0}`,
    `C ${W * (1 - 0.0335)},${H - AMP * 1.5}  ${W * (1 - 0.106)},${H - AMP * 1.83}  ${W * (1 - 0.106)},${H - AMP * 1.83}`,
    `C ${W * (1 - 0.1576)},${H - AMP * 2.0}  ${W * (1 - 0.1877)},${H - AMP * 1.92} ${W * (1 - 0.2397)},${H - AMP * 1.83}`,
    `C ${W * (1 - 0.2916)},${H - AMP * 1.75} ${W * (1 - 0.3202)},${H - AMP * 1.5}  ${W * (1 - 0.3715)},${H - AMP * 1.25}`,
    `C ${W * (1 - 0.4216)},${H - AMP * 1.0}  ${W * (1 - 0.4492)},${H - AMP * 0.67} ${W * (1 - 0.4994)},${H - AMP * 0.5}`,
    `C ${W * (1 - 0.5471)},${H - AMP * 0.25} ${W * (1 - 0.5738)},${H - AMP * 0.08} ${W * (1 - 0.6221)},${H}`,
    `C ${W * (1 - 0.6715)},${H + AMP * 0.08} ${W * (1 - 0.6994)},${H} ${W * (1 - 0.7487)},${H - AMP * 0.17}`,
    `C ${W * (1 - 0.8484)},${H - AMP * 0.5}  ${0},${H - AMP * 1.67} ${0},${H - AMP * 1.67}`,
    `Z`,
  ].join(" ");

  return (
      <div
        ref={containerRef}
        id="openingstijden"
        style={{ fontFamily: "Quicksand", clipPath: "url(#wavyClipLocation)" }}
        className="relative w-full md:mt-8 xl:mt-0 xl:h-screen lg:h-[60vh] md:h-auto h-fit 2xl:h-200"
      >
        <svg aria-hidden="true" style={{ position: "absolute", width: 0, height: 0, overflow: "visible", pointerEvents: "none" }}>
          <defs>
            <clipPath id="wavyClipLocation" clipPathUnits="userSpaceOnUse">
              <path d={wavePath} />
            </clipPath>
          </defs>
        </svg>
        <div className="absolute inset-0 bg-[linear-gradient(93.35deg,#FFCA58_8.86%,#FFDB8D_90.44%)]" />

        <div className="relative flex lg:flex-row flex-col justify-center items-center gap-4 sm:gap-6 lg:gap-32 xl:gap-48 px-6 sm:px-10 lg:px-10 xl:px-20 lg:top-1/2 lg:-translate-y-1/2 bottom-0 py-8 md:py-12 lg:py-0">
          <img
            loading="lazy"
            src="/assets/location/img3.svg"
            className="absolute left-0 lg:-z-10 lg:w-30 w-14 sm:w-20 top-1/2 lg:-translate-y-[20%]"
            alt=""
          />
          <img
            loading="lazy"
            src="/assets/location/img4.svg"
            className="absolute right-0 lg:-z-10 lg:w-50 w-20 sm:w-30 top-1/2 lg:-translate-y-[20%] -translate-y-[40%]"
            alt=""
          />

          <style>{`
            @keyframes flagWave {
              0%, 100% { transform: rotate(-3deg) translateY(0); }
              25% { transform: rotate(-1deg) translateY(-2px); }
              50% { transform: rotate(-3.5deg) translateY(1px); }
              75% { transform: rotate(-2deg) translateY(-1px); }
            }
          `}</style>
          <div
            ref={openingsRef}
            className="flex flex-col items-center text-[#5763FF] font-bold gap-2 sm:gap-5 mt-4 sm:mt-10 lg:mt-20"
          >
            <div
              className="relative w-44 sm:w-64 md:w-72 lg:w-80"
              style={{ overflow: "visible" }}
            >
              <img
                loading="lazy"
                src="/Foto.svg"
                className="w-full"
                alt="Restaurant foto"
              />
              <img
                loading="lazy"
                src="/Vlag.svg"
                className="absolute w-[120%] -left-[6.5%] top-[-30%]"
                style={{
                  transformOrigin: "center top",
                  animation: "flagWave 3s ease-in-out infinite",
                }}
                alt="Vlag"
              />
            </div>
            <h1 className="text-base sm:text-xl md:text-2xl md:mt-3">
              OPENINGSTIJDEN
            </h1>
            <div className="flex gap-6 sm:gap-10 -mt-1 sm:-mt-4 text-xs sm:text-base md:text-lg">
              <div>
                <h1>Ma t/m Vr:</h1>
                <h1>Zaterdag:</h1>
                <h1>Zondag:</h1>
              </div>
              <div>
                <h1>09:00-18:00</h1>
                <h1>09:00-18:00</h1>
                <h1>09:00-18:00</h1>
              </div>
            </div>
          </div>
          <div ref={mapRef} className="w-full lg:w-auto flex justify-center">
            <object
              data="/assets/location/img2.svg"
              type="image/svg+xml"
              className="w-3/4 max-w-72 sm:w-90 sm:max-w-none md:w-96 lg:w-110 xl:w-120 py-2 sm:py-6 lg:py-0 mb-4 sm:mb-16 lg:mb-14"
              aria-label="Map showing Waddinxveen location"
            />
          </div>
        </div>
      </div>
  );
}

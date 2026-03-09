"use client";

import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function Location() {
  const openingsRef = useScrollAnimation<HTMLDivElement>({ type: "fadeLeft", duration: 1.1, distance: 45 });
  const mapRef = useScrollAnimation<HTMLDivElement>({ type: "fadeRight", duration: 1.1, delay: 0.15, distance: 45 });
  return (
    <>
      <svg
        width="0"
        height="0"
        style={{ position: "absolute", overflow: "hidden" }}
        aria-hidden="true"
      >
        <defs>
          <clipPath id="wavyClipExact" clipPathUnits="objectBoundingBox">
            <path
              d="
                M -0.01713,0.05723
                C 0.30342,0.17247  0.61870,-0.11822  1.01370,0.05698
                L 1.01370,0.96822
                C 1.01370,0.96822  0.94057,0.92835  0.89215,0.92059
                C 0.66626,0.86382  0.45405,0.99845  0.23000,0.99956
                C 0.16746,1.00418  0.02100,0.97201  -0.01713,0.95425
                Z
              "
            />
          </clipPath>
        </defs>
      </svg>

      <div
        id="openingstijden"
        style={{ fontFamily: "Quicksand" }}
        className="relative w-full md:mt-8 xl:mt-0 xl:h-screen lg:[50vh] md:h-[70vh] h-fit 2xl:h-200"
      >
        <div
          style={{ clipPath: "url(#wavyClipExact)" }}
          className="absolute inset-0 bg-[linear-gradient(93.35deg,#FFCA58_8.86%,#FFDB8D_90.44%)]"
        />

        <div className="relative flex md:flex-row flex-col justify-center items-center md:gap-40 lg:gap-60 md:px-5 lg:px-10 xl:px-20 px-15 md:top-1/2 md:-translate-y-1/2 bottom-0">
          <img
            src="/assets/location/img3.svg"
            className="absolute left-0 md:-z-10 md:w-30 w-20 top-1/2 md:-translate-y-[20%]"
            alt=""
          />
          <img
            src="/assets/location/img4.svg"
            className="absolute right-0 md:-z-10 md:w-50 w-30 top-1/2 md:-translate-y-[20%] -translate-y-[40%]"
            alt=""
          />

          <div ref={openingsRef} className="flex flex-col items-center text-[#5763FF] font-bold gap-5 mt-20">
            <img src="/assets/location/img1.svg" className="w-80" alt="" />
            <h1 className="text-xl md:mt-3">OPENINGSTIJDEN</h1>
            <div className="flex gap-10 -mt-4">
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
          <div ref={mapRef}>
            <object
              data="/assets/location/img2.svg"
              type="image/svg+xml"
              className="md:w-120 py-10 md:py-0 mb-10"
              aria-label="Map showing Waddinxveen location"
            />
          </div>
        </div>
      </div>
    </>
  );
}

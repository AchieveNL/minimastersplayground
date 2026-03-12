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
              M 0,0.0647
              C 0.0335,0.0952  0.106,0.1135   0.106,0.1135
              C 0.1576,0.1265  0.1877,0.1208  0.2397,0.1135
              C 0.2916,0.1062  0.3202,0.0927  0.3715,0.0763
              C 0.4216,0.0602  0.4492,0.0457  0.4994,0.0305
              C 0.5471,0.0161  0.5738,0.0043  0.6221,0
              C 0.6715,-0.0044 0.6994,0.0006  0.7487,0.0091
              C 0.8484,0.0265  1,0.1056       1,0.1056
              L 1,0.9262
              C 0.929,0.884   0.8821,0.8719  0.8821,0.8719
              C 0.8305,0.8585  0.8021,0.8503  0.75,0.8505
              C 0.7022,0.8507  0.6738,0.861   0.6263,0.8719
              C 0.5761,0.8834  0.5492,0.9039  0.5,0.9262
              C 0.4532,0.9474  0.4189,0.9612  0.3715,0.9768
              C 0.3214,0.9933  0.2905,1.0031  0.2397,1
              C 0.1893,0.9969  0.1557,0.9927  0.106,0.9768
              C 0.0577,0.9614  0,0.9262       0,0.9262
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

        <div className="relative flex md:flex-row flex-col justify-center items-center gap-6 md:gap-40 lg:gap-60 px-6 sm:px-10 md:px-5 lg:px-10 xl:px-20 md:top-1/2 md:-translate-y-1/2 bottom-0">
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

          <div ref={openingsRef} className="flex flex-col items-center text-[#5763FF] font-bold gap-5 mt-12 md:mt-20">
            <img src="/assets/location/img1.svg" className="w-56 sm:w-72 md:w-80" alt="" />
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
              className="w-full sm:w-96 md:w-120 py-6 md:py-0 mb-6 md:mb-10"
              aria-label="Map showing Waddinxveen location"
            />
          </div>
        </div>
      </div>
    </>
  );
}

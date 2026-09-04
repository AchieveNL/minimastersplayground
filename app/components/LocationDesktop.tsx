"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useContent } from "../content-context";

export default function LocationDesktop() {
  const { openingstijden, parkeren } = useContent();
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
  const [containerSize, setContainerSize] = useState({ w: 1440, h: 800 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let frame = 0;
    const observer = new ResizeObserver((entries) => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const { width, height } = entries[0].contentRect;
        setContainerSize((prev) =>
          prev.w === width && prev.h === height ? prev : { w: width, h: height },
        );
      });
    });
    observer.observe(el);
    setContainerSize({ w: el.offsetWidth, h: el.offsetHeight });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  const W = containerSize.w || 1440;
  const H = containerSize.h || 800;
  const AMP = 40;

  const clipPathValue = useMemo(() => {
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
    return `path('${wavePath}')`;
  }, [W, H]);

  return (
    <div
      ref={containerRef}
      style={{
        fontFamily: "Quicksand",
        position: "relative",
        clipPath: clipPathValue,
        WebkitClipPath: clipPathValue,
      }}
      className="w-full h-[900px] xl:h-[1000px] pt-26 bg-[linear-gradient(93.35deg,#FFCA58_8.86%,#FFDB8D_90.44%)]"
    >
      <div className="absolute left-0 -z-10 w-30 top-1/2 -translate-y-1/2">
        <img
          loading="lazy"
          src="/assets/location/brandblusser.svg"
          className="w-full"
          style={{ animation: "locFloat 4s ease-in-out infinite" }}
          alt=""
        />
      </div>
      <div className="absolute right-0 -z-10 w-50 top-1/2 -translate-y-1/2">
        <img
          loading="lazy"
          src="/assets/location/brandweerwagen.svg"
          className="w-full"
          style={{ animation: "locFloat 3.5s ease-in-out infinite 0.6s" }}
          alt=""
        />
      </div>

      <style>{`
        @keyframes locFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes flagWave {
          0%, 100% { transform: rotate(-3deg) translateY(0); }
          25% { transform: rotate(-1deg) translateY(-2px); }
          50% { transform: rotate(-3.5deg) translateY(1px); }
          75% { transform: rotate(-2deg) translateY(-1px); }
        }
      `}</style>

      <div className="relative flex flex-row justify-center items-center gap-16 lg:gap-24 xl:gap-48 px-10 xl:px-20">
        <div
          ref={openingsRef}
          className="flex flex-col items-center text-[#5763FF] font-bold gap-4"
        >
          <div className="relative w-72 lg:w-80 xl:w-96" style={{ overflow: "visible" }}>
            <img loading="lazy" src="/assets/location/foto.svg" className="w-full" alt="Restaurant foto" />
            <img
              loading="lazy"
              src="/assets/location/vlag.svg"
              className="absolute w-[120%] -left-[6.5%] top-[-30%]"
              style={{ transformOrigin: "center top", animation: "flagWave 3s ease-in-out infinite" }}
              alt="Vlag"
            />
          </div>
          <h1 className="text-2xl mt-3">{openingstijden.titel}</h1>
          <div className="flex gap-10 -mt-4 text-lg">
            <div>
              {openingstijden.rijen.map((r, i) => (
                <h1 key={i}>{r.label}</h1>
              ))}
            </div>
            <div>
              {openingstijden.rijen.map((r, i) => (
                <h1 key={i}>{r.tijd}</h1>
              ))}
            </div>
          </div>
        </div>

        <div
          ref={mapRef}
          className="flex flex-col items-center gap-4 text-[#5763FF]"
        >
          <img
            src="/assets/location/kaart.svg"
            className="w-75 lg:w-90 xl:w-110"
            alt="Map showing Waddinxveen location"
          />
          <div className="flex flex-col gap-3 text-base lg:text-lg leading-tight w-fit">
            <h2 className="text-2xl font-bold">{parkeren.titel}</h2>
            <div>
              <h3 className="font-bold">{parkeren.garageNaam}</h3>
              <p>{parkeren.garageAdres}</p>
              {parkeren.garageGratis && (
                <p className="font-bold">{parkeren.garageGratis}</p>
              )}
            </div>
            <p>{parkeren.wijk}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

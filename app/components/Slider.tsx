"use client";import { useEffect, useMemo, useState, useRef } from "react";
import { useContent } from "../content-context";
import ScrollHint from "./ScrollHint";

export default function Slider() {
  const { slider } = useContent();
  const data = [
    {
      bg: slider.cards[1]?.afbeelding ?? "/assets/slider/entreeticket.webp",
      text1: slider.cards[1]?.title ?? "Entreeticket",
      link: "https://tickets.minimastersplayground.nl/",
      disabled: false,
    },
    {
      bg: slider.cards[0]?.afbeelding ?? "/assets/slider/kinderfeestje.jpg",
      text1: slider.cards[0]?.title ?? "Kinderfeestje",
      link: "/ons-aanbod#verjaardag",
      disabled: false,
    },
    {
      bg: slider.cards[2]?.afbeelding ?? "/assets/slider/zaalhuur.jpg",
      text1: slider.cards[2]?.title ?? "Zaalhuur",
      link: "/ons-aanbod#prive-feestje",
      disabled: false,
    },
    {
      bg: slider.cards[3]?.afbeelding ?? "/assets/slider/scholen-bso.jpg",
      text1: slider.cards[3]?.title ?? "Scholen & BSO",
      link: "/ons-aanbod#schoolreisje",
      disabled: false,
    },
  ] as Array<{
    bg: string;
    text1: string;
    link: string;
    disabled: boolean;
  }>;
  const [screenW, setScreenW] = useState(1440);
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [showHint, setShowHint] = useState(false);
  const [containerSize, setContainerSize] = useState({ w: 1440, h: 800 });

  // Cards grow towards the middle of the row and shrink towards the edges, so
  // swiping through the offers reads as small, big, small, big.
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    let frame = 0;
    const paint = () => {
      frame = 0;
      const rowBox = row.getBoundingClientRect();
      const rowCenter = rowBox.left + rowBox.width / 2;
      const reach = rowBox.width / 2;
      row.querySelectorAll<HTMLElement>("[data-card]").forEach((card) => {
        const box = card.getBoundingClientRect();
        const distance = Math.abs(box.left + box.width / 2 - rowCenter);
        const falloff = Math.min(1, distance / reach);
        card.style.setProperty("--focus", (1 - falloff * 0.13).toFixed(3));
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    paint();
    setShowHint(row.scrollWidth > row.clientWidth + 8);

    const onScroll = () => {
      schedule();
      setShowHint(false);
    };
    row.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      row.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  useEffect(() => {
    const updateScreen = () => setScreenW(window.innerWidth);
    updateScreen();
    window.addEventListener("resize", updateScreen);
    return () => window.removeEventListener("resize", updateScreen);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let frame = 0;
    const observer = new ResizeObserver((entries) => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const { width, height } = entries[0].contentRect;
        setContainerSize((prev) =>
          prev.w === width && prev.h === height
            ? prev
            : { w: width, h: height },
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

  const isMobile = screenW < 768;
  const isSmallDesktop = screenW >= 768 && screenW < 1280;
  const CARD_WIDTH = isMobile ? 160 : isSmallDesktop ? 190 : 220;
  const CARD_HEIGHT = isMobile ? 240 : isSmallDesktop ? 285 : 330;

  const W = containerSize.w || 1440;
  const H = containerSize.h || 800;
  const AMP = isMobile ? 15 : 40;

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
  }, [W, H, AMP]);

  return (
    <>
      <div
        id="tickets"
        ref={containerRef}
        style={{
          fontFamily: "Quicksand",
          position: "relative",
          clipPath: clipPathValue,
          WebkitClipPath: clipPathValue,
        }}
        className="w-full relative -mt-14 md:h-[680px] xl:h-[780px] h-[580px] pt-20 md:pt-28 bg-linear-to-r from-[#FFCA58] to-[#FFDB8D] overflow-hidden"
      >
        <style>{`
          @keyframes sliderFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-12px); }
          }
        `}</style>
        <img
          loading="lazy"
          src="/assets/icons/winkelwagen.svg"
          className="absolute right-0 top-10 md:w-80 w-30"
          style={{ animation: "sliderFloat 4s ease-in-out infinite" }}
          alt=""
        />
        <img
          loading="lazy"
          src="/assets/icons/aardbei.svg"
          className="absolute left-0 md:w-40 w-20"
          style={{ animation: "sliderFloat 3.5s ease-in-out infinite 0.6s" }}
          alt=""
        />

        {/* Header badge */}
        <div className="flex w-fit px-5 md:px-10 py-3 sm:py-4 md:py-3 pl-10 md:pl-20 items-center relative justify-center mx-auto m-auto bg-linear-to-r from-[#67CD8A] via-[#67CD8A] to-[#A5DEB9] rounded-tr-[10px] rounded-br-[60px] overflow-visible">
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
          <h1 className="font-bold md:text-lg text-center text-[#FDF9EF] md:pl-0 pl-6 whitespace-nowrap">
            {slider.badge}
          </h1>
        </div>

        {/* Cards Row */}
        <div
          ref={rowRef}
          className="flex lg:justify-center items-center gap-8 lg:gap-10 xl:gap-16 mt-0 pt-10 md:mt-10 md:pt-0 md:mb-44 mb-12 pl-8 md:pl-10 pr-4 md:pr-10 flex-nowrap overflow-x-auto lg:overflow-visible [&::-webkit-scrollbar]:hidden snap-x snap-mandatory lg:snap-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {data.map((item, index) => {
            const wrapperStyle: React.CSSProperties = {
              // Warm brown reads much stronger than black against the yellow.
              boxShadow: isMobile
                ? "0 10px 20px rgba(118, 74, 8, 0.38), 0 3px 8px rgba(118, 74, 8, 0.26)"
                : "0 20px 38px rgba(118, 74, 8, 0.42), 0 6px 14px rgba(118, 74, 8, 0.28)",
              height: `${CARD_HEIGHT}px`,
              width: `${CARD_WIDTH}px`,
              borderRadius: isMobile ? "10px 42px 10px 42px" : "15px 70px 15px 70px",
            };

            // --focus is written by the scroll handler: 1 in the middle of the
            // row, a little smaller towards the edges.
            const wrapperClass =
              "relative flex-shrink-0 cursor-pointer snap-center transition-transform duration-500 ease-out scale-[var(--focus,1)] hover:scale-[calc(var(--focus,1)*1.05)]";

            const cardClass =
              "rounded-[10px_42px_10px_42px] md:rounded-[15px_70px_15px_70px] absolute inset-0 z-10 overflow-hidden text-white font-semibold flex flex-col items-center justify-start pt-5 md:pt-7 gap-2 md:gap-2.5";

            // Corner ribbon (Temani Afif clip-path technique, pivoted on bottom-right)
            const foldSize = isMobile ? 9 : 12;
            const ribbonFontSize = isMobile ? 10 : 11;
            const ribbonPadding = isMobile ? "0.45em 2.3em" : "0.45em 2.5em";

            const inner = (
              <>
                <div
                  className="absolute inset-0 rounded-[10px_42px_10px_42px] md:rounded-[15px_70px_15px_70px]"
                  style={{
                    background: `url('${item.bg}') no-repeat center/cover`,
                  }}
                />
                {/* Bottom pill — category title */}
                <span
                  className="relative z-10 px-3 py-1.5 md:px-5 md:py-2 rounded-full font-bold text-white text-[11px] md:text-sm tracking-wider whitespace-nowrap"
                  style={{
                    background:
                      "linear-gradient(135deg, #FFDB8D 0%, #FFCA58 100%)",
                  }}
                >
                  {item.text1}
                </span>
              </>
            );

            const ribbon = item.disabled && (
              <div
                aria-hidden
                className="absolute pointer-events-none z-30"
                style={{
                  top: 0,
                  left: 0,
                  color: "#fff",
                  padding: ribbonPadding,
                  background:
                    "linear-gradient(180deg, #FF7575 0%, #E63946 50%, #B91C1C 100%)",
                  borderBottom: `${foldSize}px solid rgba(0,0,0,0.45)`,
                  clipPath: `polygon(100% calc(100% - ${foldSize}px), 100% 100%, calc(100% - ${foldSize}px) calc(100% - ${foldSize}px), ${foldSize}px calc(100% - ${foldSize}px), 0 100%, 0 calc(100% - ${foldSize}px), 999px calc(100% - ${foldSize}px - 999px), calc(100% - 999px) calc(100% - ${foldSize}px - 999px))`,
                  transform:
                    "translate(calc((cos(45deg) - 1)*100%), -100%) rotate(-45deg)",
                  transformOrigin: "100% 100%",
                  fontFamily: "Quicksand, sans-serif",
                  fontWeight: 800,
                  fontSize: `${ribbonFontSize}px`,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  textShadow: "0 1px 2px rgba(0,0,0,0.4)",
                  whiteSpace: "nowrap",
                  filter: "none",
                }}
              >
                Nog niet boekbaar
              </div>
            );

            return (
              <div
                key={index}
                data-card
                className={wrapperClass}
                style={wrapperStyle}
              >
                {ribbon}
                {item.link ? (
                  <a
                    href={item.link}
                    {...(item.link.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className={`${cardClass} group`}
                  >
                    {inner}
                  </a>
                ) : (
                  <div className={`${cardClass} group`}>{inner}</div>
                )}
              </div>
            );
          })}
        </div>
        <ScrollHint visible={showHint} />
      </div>
    </>
  );
}

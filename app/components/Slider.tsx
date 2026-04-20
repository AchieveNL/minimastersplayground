"use client";
import { useEffect, useState, useRef } from "react";

export default function Slider() {
  const data = [
    {
      bg: "img4.jpg",
      text1: "Scholen & BSO",
      text2: "",
      link: "#contact",
      btnText: "SCHOOL & BSO",
      btnColor: "#FFCA58",
    },
    {
      bg: "img1.jpg",
      text1: "Entreeticket",
      text2: "",
      link: "#contact",
      btnText: "DIRECT BOEKEN",
      btnColor: "#67CD8A",
    },
    {
      bg: "img5.jpg",
      text1: "Kinderfeestje",
      text2: "",
      link: "#contact",
      btnText: "VERJAARDAG",
      btnColor: "#FFCA58",
    },
  ];
  const [screenW, setScreenW] = useState(1440);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ w: 1440, h: 800 });

  useEffect(() => {
    const updateScreen = () => setScreenW(window.innerWidth);
    updateScreen();
    window.addEventListener("resize", updateScreen);
    return () => window.removeEventListener("resize", updateScreen);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setContainerSize({ w: width, h: height });
    });
    observer.observe(el);
    setContainerSize({ w: el.offsetWidth, h: el.offsetHeight });
    return () => observer.disconnect();
  }, []);

  const isMobile = screenW < 768;
  const isSmallDesktop = screenW >= 768 && screenW < 1280;
  const CARD_WIDTH = isMobile ? 160 : isSmallDesktop ? 190 : 220;
  const CARD_HEIGHT = isMobile ? 240 : isSmallDesktop ? 285 : 330;

  const W = containerSize.w || 1440;
  const H = containerSize.h || 800;
  const AMP = isMobile ? 20 : 40;

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

  // Use CSS clip-path: path() directly — much better Safari support than SVG url(#id)
  const clipPathValue = `path('${wavePath}')`;

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
        <img
          loading="lazy"
          src="/assets/icons/cards-icon1.svg"
          className="absolute right-0 top-10 md:w-80 w-30"
          alt=""
        />
        <img
          loading="lazy"
          src="/assets/icons/cards-icon2.svg"
          className="absolute left-0 md:w-40 w-20"
          alt=""
        />

        {/* Header badge */}
        <div className="flex w-fit px-5 md:px-10 py-3 sm:py-4 md:py-3 pl-10 md:pl-20 items-center relative justify-center mx-auto m-auto bg-linear-to-r from-[#67CD8A] via-[#67CD8A] to-[#A5DEB9] rounded-br-4xl overflow-visible">
          <img
            loading="lazy"
            src="/elements/Ticket Icoon.svg"
            className="absolute md:hidden"
            style={{ width: "100px", left: "-20%" }}
            alt=""
          />
          <img
            loading="lazy"
            src="/elements/Ticket Icoon.svg"
            className="absolute hidden md:block"
            style={{ width: "100px", left: -65 }}
            alt=""
          />
          <h1 className="font-bold md:text-lg text-center text-[#FDF9EF] md:pl-0 pl-6 w-full rounded-br-4xl">
            ONZE ARRANGEMENTEN
          </h1>
        </div>

        {/* Cards Row */}
        <div className="flex md:justify-center items-center gap-8 md:gap-16 mt-10 md:mt-10 md:mb-44 mb-12 px-4 md:px-10 flex-nowrap overflow-x-auto md:overflow-visible">
          {data.map((item, index) => {
            const cardStyle: React.CSSProperties = {
              boxShadow: isMobile ? "none" : "4px 8px 24px 0px #00000055",
              height: `${CARD_HEIGHT}px`,
              width: `${CARD_WIDTH}px`,
            };

            const cardClass =
              "rounded-tr-[36px] rounded-bl-[36px] md:rounded-tr-[60px] md:rounded-bl-[60px] relative overflow-hidden text-white font-semibold flex flex-col items-center justify-end pb-4 md:pb-6 cursor-pointer transition-transform duration-400 ease-out hover:scale-105 flex-shrink-0";

            const inner = (
              <>
                <div
                  className="absolute inset-0 rounded-tr-[36px] rounded-bl-[36px] md:rounded-tr-[60px] md:rounded-bl-[60px]"
                  style={{
                    background: `url('/assets/slider/${item.bg}') no-repeat center/cover`,
                  }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 rounded-bl-[36px] md:rounded-bl-[60px] transition-all duration-350"
                  style={{
                    height: "80%",
                    background:
                      "linear-gradient(180deg, rgba(144, 119, 70, 0) 0%, rgba(56, 64, 163, 0.75) 100%)",
                  }}
                />
                <div className="relative z-10">
                  <span
                    className="px-3 py-1.5 md:px-5 md:py-2 rounded-full font-bold text-white text-[11px] md:text-sm tracking-wider block group-hover:hidden"
                    style={{
                      background:
                        "linear-gradient(135deg, #FFDB8D 0%, #FFCA58 100%)",
                    }}
                  >
                    {item.text1}
                  </span>
                  <span
                    className="px-3 py-1.5 md:px-5 md:py-2 rounded-full font-bold text-white text-[11px] md:text-sm tracking-wider hidden group-hover:block"
                    style={{
                      background: item.link
                        ? "linear-gradient(135deg, #A5DEB9 0%, #67CD8A 100%)"
                        : "linear-gradient(135deg, #B1B6FF 0%, #5763FF 100%)",
                    }}
                  >
                    {item.link ? "Boek nu" : "Coming soon"}
                  </span>
                </div>
              </>
            );

            return item.link ? (
              <a
                key={index}
                href={item.link}
                {...(item.link.startsWith("#")
                  ? {}
                  : { target: "_blank", rel: "noopener noreferrer" })}
                style={cardStyle}
                className={`${cardClass} group`}
              >
                {inner}
              </a>
            ) : (
              <div
                key={index}
                style={cardStyle}
                className={`${cardClass} group`}
              >
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

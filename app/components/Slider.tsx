"use client";
import { useEffect, useState, useCallback, useRef } from "react";

export default function Slider() {
  const data = [
    {
      bg: "img4.jpg",
      text1: "Scholen & BSO",
      text2: "",
      link: "https://minimasters.booqi.me/product/297636/scholen-bso",
      btnText: "SCHOOL & BSO",
      btnColor: "#FFCA58",
    },
    {
      bg: "img1.jpg",
      text1: "Entreeticket",
      text2: "",
      link: "https://minimasters.booqi.me/product/296874/entreetickets",
      btnText: "DIRECT BOEKEN",
      btnColor: "#67CD8A",
    },
    {
      bg: "img5.jpg",
      text1: "Kinderfeestje",
      text2: "",
      link: "https://minimasters.booqi.me/product/296875/kinderfeestjes",
      btnText: "VERJAARDAG",
      btnColor: "#FFCA58",
    },
    {
      bg: "img3.png",
      text1: "Abonnement",
      text2: "",
      link: "",
      btnText: "DIRECT BOEKEN",
      btnColor: "#67CD8A",
    },
  ];
  const SLOTS_NEEDED = 9; // = VISIBLE*2 + EXIT_TRAVEL + ENTER_TRAVEL + 3
  const repeatCount = Math.ceil(SLOTS_NEEDED / data.length);
  const cards = Array.from({ length: repeatCount }, () => data).flat();
  const total = cards.length;

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
  const CARD_WIDTH = isMobile ? Math.round((220 * 2) / 3) : 220;
  const CARD_HEIGHT = isMobile ? Math.round((330 * 2) / 3) : 330;

  const VISIBLE = 2; // visible slots each side of center
  const EXIT_TRAVEL = 1; // extra slots a card travels past the edge before recycling
  const ENTER_TRAVEL = 1; // extra slots the card enters from beyond the edge

  const RECYCLE_AT = -(VISIBLE + EXIT_TRAVEL + 1); // = -4
  const ENTER_FROM = VISIBLE + ENTER_TRAVEL + 1; // = +4

  const ANGLE_STEP = 22;
  const GAP = isMobile ? 14 : 24;
  const angleRad1 = (ANGLE_STEP * Math.PI) / 180;
  const RADIUS = (CARD_WIDTH + GAP) / Math.sin(angleRad1);

  const isAnimating = useRef(false);

  const [virtualIndex, setVirtualIndex] = useState(0);

  const half = Math.floor(total / 2);
  const cardVirtual = useRef<number[]>(cards.map((_, i) => i - half));

  const [teleportingCards, setTeleportingCards] = useState<Set<number>>(
    new Set(),
  );

  const getSlot = (index: number) => cardVirtual.current[index] - virtualIndex;

  const getCardStyle = (
    slot: number,
    teleporting = false,
  ): React.CSSProperties => {
    const angleDeg = slot * ANGLE_STEP;
    const angleRad = (angleDeg * Math.PI) / 180;
    const x = RADIUS * Math.sin(angleRad);
    const y = RADIUS * (1 - Math.cos(angleRad)) * 0.45;

    const absSlot = Math.abs(slot);

    const scale = Math.max(0.55, 1 - absSlot * 0.12);

    const zIndex = Math.max(0, 6 - absSlot);

    const opacity =
      absSlot <= VISIBLE
        ? 1
        : absSlot === VISIBLE + 1
          ? 0 // just crossed the edge – already hidden but still moving
          : 0; // deep off-screen

    const transition = teleporting
      ? "none"
      : [
          "left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          "top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          "opacity 0.3s ease",
        ].join(", ");

    return {
      position: "absolute",
      width: `${CARD_WIDTH}px`,
      left: `calc(50% + ${x}px - ${CARD_WIDTH / 2}px)`,
      top: `${y}px`,
      transform: `rotate(${angleDeg * 0.6}deg) scale(${scale})`,
      transformOrigin: "bottom center",
      zIndex,
      opacity,
      transition,
      pointerEvents: absSlot > VISIBLE ? "none" : "auto",
    };
  };

  // ── next() ─────────────────────────────────────────────────────────────────
  const next = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    setVirtualIndex((prev) => {
      const nextV = prev + 1;

      const targetSlotNow = RECYCLE_AT + 1;
      const exitingDataIndex = cardVirtual.current.findIndex(
        (v) => v - prev === targetSlotNow,
      );

      if (exitingDataIndex !== -1) {
        const targetVirtual = nextV + ENTER_FROM;

        setTeleportingCards((s) => new Set(s).add(exitingDataIndex));
        cardVirtual.current[exitingDataIndex] = targetVirtual;

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setTeleportingCards((s) => {
              const n = new Set(s);
              n.delete(exitingDataIndex);
              return n;
            });
          });
        });
      }

      return nextV;
    });

    setTimeout(() => {
      isAnimating.current = false;
    }, 520);
  }, [RECYCLE_AT, ENTER_FROM]);

  // ── prev() ─────────────────────────────────────────────────────────────────
  const prev = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    setVirtualIndex((prevV) => {
      const nextV = prevV - 1;

      const targetSlotNow = -(RECYCLE_AT + 1);
      const enteringDataIndex = cardVirtual.current.findIndex(
        (v) => v - prevV === targetSlotNow,
      );

      if (enteringDataIndex !== -1) {
        const targetVirtual = nextV - ENTER_FROM;

        setTeleportingCards((s) => new Set(s).add(enteringDataIndex));
        cardVirtual.current[enteringDataIndex] = targetVirtual;

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setTeleportingCards((s) => {
              const n = new Set(s);
              n.delete(enteringDataIndex);
              return n;
            });
          });
        });
      }

      return nextV;
    });

    setTimeout(() => {
      isAnimating.current = false;
    }, 520);
  }, [RECYCLE_AT, ENTER_FROM]);

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

  const clipId = "wavyClipFixed";

  return (
    <>
      <div
        id="tickets"
        ref={containerRef}
        style={{
          fontFamily: "Quicksand",
          position: "relative",
          clipPath: `url(#${clipId})`,
        }}
        className="w-full relative -mt-14 md:h-fit h-fit pt-28 md:pt-28 bg-linear-to-r from-[#FFCA58] to-[#FFDB8D] overflow-hidden"
      >
        <svg
          aria-hidden="true"
          style={{
            position: "absolute",
            width: 0,
            height: 0,
            overflow: "visible",
            pointerEvents: "none",
          }}
        >
          <defs>
            <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
              <path d={wavePath} />
            </clipPath>
          </defs>
        </svg>

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
        <div className="flex w-fit items-center relative justify-center mx-auto m-auto bg-linear-to-r from-[#67CD8A] via-[#67CD8A] to-[#A5DEB9] rounded-br-4xl md:py-3 py-2">
          <img
            loading="lazy"
            src="/elements/Ticket Icoon.svg"
            className="absolute md:hidden"
            style={{ width: "80px", left: "-15%" }}
            alt=""
          />
          <img
            loading="lazy"
            src="/elements/Ticket Icoon.svg"
            className="absolute hidden md:block"
            style={{ width: "100px", left: -45 }}
            alt=""
          />
          <h1 className="font-bold md:text-lg text-base text-center text-[#FDF9EF] md:pl-16 pl-14 md:pr-8 pr-5 w-full rounded-br-4xl text-nowrap">
            ONZE ARRANGEMENTEN
          </h1>
        </div>

        {/* Arc Carousel */}
        <div
          className="relative mt-10 w-full md:mb-44 mb-20"
          style={{ height: `${CARD_HEIGHT + 180}px`, overflow: "visible" }}
        >
          {cards.map((item, index) => {
            const slot = getSlot(index);
            const isTeleporting = teleportingCards.has(index);

            const cardStyle = {
              boxShadow: "4px 8px 24px 0px #00000055",
              height: `${CARD_HEIGHT}px`,
            };

            const cardClass =
              "rounded-tr-[60px] rounded-bl-[60px] relative overflow-hidden text-white font-semibold flex flex-col items-center justify-end pb-6 cursor-pointer transition-transform duration-400 ease-out hover:scale-110";

            const inner = (
              <>
                {/* Background image with zoom on hover */}
                <div
                  className="absolute inset-0 rounded-tr-[60px] rounded-bl-[60px]"
                  style={{
                    background: `url('/assets/slider/${item.bg}') no-repeat center/cover`,
                  }}
                />
                {/* Gradient overlay */}
                <div
                  className="absolute bottom-0 left-0 right-0 rounded-bl-[60px] transition-all duration-350"
                  style={{
                    height: "80%",
                    background:
                      "linear-gradient(180deg, rgba(144, 119, 70, 0) 0%, rgba(56, 64, 163, 0.75) 100%)",
                  }}
                />
                {/* Button: shows title, on hover changes to green "Boek nu" or purple "Coming soon" */}
                <div className="relative z-10">
                  {/* Default: yellow with title */}
                  <span
                    className="px-5 py-2 rounded-full font-bold text-white text-xs md:text-sm tracking-wider block group-hover:hidden"
                    style={{
                      background:
                        "linear-gradient(135deg, #FFDB8D 0%, #FFCA58 100%)",
                    }}
                  >
                    {item.text1}
                  </span>
                  {/* Hover: green "Boek nu" or purple "Coming soon" */}
                  <span
                    className="px-5 py-2 rounded-full font-bold text-white text-xs md:text-sm tracking-wider hidden group-hover:block"
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

            return (
              <div key={index} style={getCardStyle(slot, isTeleporting)}>
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      ...cardStyle,
                      textDecoration: "none",
                      color: "white",
                      display: "flex",
                    }}
                    className={`${cardClass} group`}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    {inner}
                  </a>
                ) : (
                  <div
                    style={cardStyle}
                    className={`${cardClass} group`}
                    onClick={next}
                  >
                    {inner}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

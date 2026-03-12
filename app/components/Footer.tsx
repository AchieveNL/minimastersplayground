"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

type CardState = "current" | "next" | "out" | "idle";

const cardData = [
  {
    title: "Emily J.",
    role: "Directrice",
    text: "Alles ziet er veilig, creatief en super speels uit. Mijn zoontje vraagt nu al wanneer het open gaat!",
  },
  
  {
    title: "Emily J.",
    role: "Directrice",
    text: "Alles ziet er veilig, creatief en super speels uit. Mijn zoontje vraagt nu al wanneer het open gaat!",
  },

  {
    title: "Emily J.",
    role: "Directrice",
    text: "Alles ziet er veilig, creatief en super speels uit. Mijn zoontje vraagt nu al wanneer het open gaat!",
  },
  
];

const POSITION_ROTATE: Record<CardState, string> = {
  current: "-12.49deg",
  next: "-24.85deg",
  idle: "0deg",
  out: "-12.49deg",
};

const ANIM_CSS = `
@keyframes card-out {
  0%   { z-index: 20; transform: rotate(-12.49deg) scale(1) translateY(0px); border-radius: 1.5rem; }
  40%  { transform: rotate(-5deg) scale(1.04) translateY(-110%); border-radius: 2rem; }
  80%  { z-index: 1; transform: rotate(-2deg) scale(0.97) translateY(-30px); border-radius: 1.2rem; }
  100% { transform: rotate(0deg) scale(0.95) translateY(0px); border-radius: 1rem; }
}
`;

export default function Footer() {
  const logoRef = useScrollAnimation<HTMLDivElement>({ type: "fadeUp", duration: 1 });
  const cardsRef = useScrollAnimation<HTMLDivElement>({ type: "scaleIn", duration: 1.1, delay: 0.1 });
  const newsletterRef = useScrollAnimation<HTMLDivElement>({ type: "fadeUp", duration: 1, delay: 0.2 });

  const [states, setStates] = useState<CardState[]>([
    "current",
    "next",
    "idle",
  ]);
  const animating = useRef(false);
  const styleInjected = useRef(false);

  useEffect(() => {
    if (!styleInjected.current) {
      const style = document.createElement("style");
      style.textContent = ANIM_CSS;
      document.head.appendChild(style);
      styleInjected.current = true;
    }
  }, []);

  const advance = () => {
    if (animating.current) return;
    animating.current = true;
    setStates((prev) => {
      const currentIdx = prev.indexOf("current");
      const nextIdx = prev.indexOf("next");
      const idleIdx = prev.findIndex((s) => s === "idle");
      const next = [...prev] as CardState[];
      next[currentIdx] = "out";
      next[nextIdx] = "current";
      next[idleIdx] = "next";
      return next;
    });
    setTimeout(() => {
      setStates(
        (prev) => prev.map((s) => (s === "out" ? "idle" : s)) as CardState[],
      );
      animating.current = false;
    }, 700);
  };

  useEffect(() => {
    const interval = setInterval(advance, 5000);
    return () => clearInterval(interval);
  }, []);

  const getCardStyle = (state: CardState): React.CSSProperties => {
    const rotate = POSITION_ROTATE[state];
    const transition = [
      "transform 0.65s cubic-bezier(.4,0,.2,1)",
      "opacity 0.5s ease",
      "border-radius 0.65s cubic-bezier(.4,0,.2,1)",
      "background 0.5s linear",
    ].join(", ");
    const base = { position: "absolute" as const, top: 0, left: 0 };
    switch (state) {
      case "current":
        return {
          ...base,
          zIndex: 10,
          transform: `rotate(${rotate}) scale(1)`,
          borderRadius: "1.5rem",
          background:
            "linear-gradient(230deg, #67CD8A 6%, #A5DEB9 23%, #67CD8A 65%, #67CD8A 94%)",
          opacity: 1,
          transition,
        };
      case "next":
        return {
          ...base,
          zIndex: 5,
          transform: `rotate(${rotate}) scale(0.97)`,
          borderRadius: "1.25rem",
          background:
            "linear-gradient(230deg, #52b874 6%, #8dcba4 23%, #52b874 65%, #52b874 94%)",
          opacity: 0.9,
          transition,
        };
      case "out":
        return {
          ...base,
          zIndex: 1,
          animation: `card-out 0.7s cubic-bezier(.4,0,.2,1) forwards`,
          background:
            "linear-gradient(230deg, #3fa060 6%, #72b88c 23%, #3fa060 65%, #3fa060 94%)",
          opacity: 0.8,
        };
      case "idle":
      default:
        return {
          ...base,
          zIndex: 2,
          transform: `rotate(${rotate}) scale(0.95)`,
          borderRadius: "1rem",
          background:
            "linear-gradient(230deg, #3fa060 6%, #72b88c 23%, #3fa060 65%, #3fa060 94%)",
          opacity: 0.75,
          transition,
        };
    }
  };

  const renderOrder = [
    ...states.map((s, i) => ({ s, i })).filter(({ s }) => s === "idle"),
    ...states.map((s, i) => ({ s, i })).filter(({ s }) => s === "out"),
    ...states.map((s, i) => ({ s, i })).filter(({ s }) => s === "next"),
    ...states.map((s, i) => ({ s, i })).filter(({ s }) => s === "current"),
  ];

  const cardStack = (size: number) => (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        position: "relative",
        flexShrink: 0,
      }}
    >
      {renderOrder.map(({ s, i }) => {
        const card = cardData[i];
        return (
          <div
            key={i}
            style={{
              ...getCardStyle(s),
              width: `${size}px`,
              height: `${size}px`,
              padding: "1.25rem",
              color: "white",
              boxShadow: "none",
              willChange: "transform, opacity, border-radius",
              userSelect: s === "current" ? "auto" : "none",
            }}
          >
            <h1 style={{ margin: 0, fontWeight: 700, fontSize: "1.25rem" }}>
              {card.title}
            </h1>
            <span style={{ fontSize: "1.1rem" }}>{card.role}</span>
            <img
              src="/assets/footer/stars.svg"
              style={{
                transform: "rotate(12.5deg)",
                marginTop: "0.75rem",
                display: "block",
              }}
              alt=""
            />
            <p
              style={{
                marginTop: "0.5rem",
                fontSize: "0.9rem",
                lineHeight: 1.4,
              }}
            >
              {card.text}
            </p>
          </div>
        );
      })}
    </div>
  );

  // Wave height as a fraction of viewport width: 291/1752
  // Half of that wave height = (100vw * 291 / 1752) / 2 = 100vw * 291 / 3504
  const waveHeight = "calc(100vw * 291 / 1752)";
  const halfWave = "calc(100vw * 291 / 3504)";

  return (
    <div
      id="contact"
      style={{ fontFamily: "Nunito Variable" }}
      className="relative w-full mt-6 md:mt-10"
    >
      {/* Layer 1: wave curve — sits at the top, drives its own height via aspect-ratio */}
      <div
        className="relative w-full pointer-events-none"
        style={{
          aspectRatio: "1752 / 291",
          zIndex: 0,
        }}
      >
        <svg
          viewBox="0 0 1752 291"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full block"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M-1 291L1753 291L1753 174C1753 174 1594.78 143 1327.5 120C1138.62 104 1003.14 125 819.492 155C599.677 194 340.285 238 264 238C43 238 -1 217 -1 217Z"
            fill="url(#curveGradient)"
          />
          <defs>
            <linearGradient
              id="curveGradient"
              x1="861.008"
              y1="0"
              x2="861.008"
              y2="291"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFDE98" />
              <stop offset="1" stopColor="#FFCA58" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Layer 2: solid body — starts right after the wave */}
      <div className="w-full" style={{ background: "#FFCA58" }}>
        {/* ✅ Content pulled up by half the wave height using negative marginTop.
            This visually centers the content at the wave/body boundary. */}
        <div
          className="relative flex flex-col lg:flex-row items-center justify-center gap-10 sm:gap-14 lg:gap-20 px-6 sm:px-10 pb-10 md:pt-0 pt-5"
          style={{
            zIndex: 1,
            marginTop: `calc(-1 * ${halfWave})`,
          }}
        >
          {/* Column 1: Logo + Socials */}
          <div ref={logoRef} className="flex flex-col gap-6 lg:gap-10 items-center flex-1 min-w-0 w-full lg:w-auto">
            <Link href="/">
              <img
                src="/assets/footer/logo.svg"
                alt=""
                className="mx-auto md:w-auto w-4/5"
              />
            </Link>
            <div className="flex gap-5">
              <Link href="https://www.instagram.com/minimastersplayground" target="_blank" className="group">
                <div className="relative rounded-full w-11 lg:w-12 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-6">
                  <div className="absolute inset-0 rounded-full bg-[#FF5757]/0 group-hover:bg-[#FF5757]/15 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(255,87,87,0.35)] group-hover:scale-125" />
                  <img
                    src="/assets/footer/insta.svg"
                    className="rounded-full w-full relative z-10"
                    alt=""
                  />
                </div>
              </Link>
              <Link href="https://www.tiktok.com/@minimastersplaygr" target="_blank" className="group">
                <div className="relative rounded-full w-11 lg:w-12 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-6">
                  <div className="absolute inset-0 rounded-full bg-[#5763FF]/0 group-hover:bg-[#5763FF]/15 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(87,99,255,0.35)] group-hover:scale-125" />
                  <img
                    src="/assets/footer/tiktok.svg"
                    className="rounded-full w-full relative z-10"
                    alt=""
                  />
                </div>
              </Link>
            </div>
          </div>

          {/* Column 2: Card Stack */}
          <div ref={cardsRef} className="flex-1 min-w-0 flex items-center justify-center w-full lg:w-auto">
            <div className="block lg:hidden">{cardStack(260)}</div>
            <div className="hidden lg:block">{cardStack(320)}</div>
          </div>

          {/* Column 3: Letter / newsletter */}
          <div ref={newsletterRef} className="flex-1 min-w-0 relative z-20 flex flex-col items-center w-full max-w-xs lg:max-w-none">
            <div className="relative w-full">
              <img src="/assets/footer/letter.svg" className="w-full" alt="" />
              <div className="absolute top-0 w-2/3 left-1/2 -translate-x-1/2 mt-8 lg:mt-10 flex flex-col gap-3 lg:gap-5 items-center">
                <h1 className="font-bold text-[#5763FF] text-center text-xs lg:text-sm xl:text-base leading-tight">
                  KRIJG ALS EERSTE EEN SEINTJE WANNEER WIJ OPENEN!
                </h1>
                <div className="w-full flex flex-col gap-2 text-xs">
                  <input
                    type="text"
                    className="bg-[#E1FBE9] p-2 lg:p-3 rounded outline-0 w-full"
                    placeholder="Naam"
                  />
                  <input
                    type="email"
                    className="bg-[#E1FBE9] p-2 lg:p-3 rounded outline-0 w-full"
                    placeholder="E-mail"
                  />
                </div>
                <button className="font-bold text-white text-xs rounded bg-[#BB76FF] p-2.5 px-4 lg:p-3 lg:px-5 w-fit block">
                  VERTEL ME ALLES!
                </button>
              </div>
            </div>
            <div className="flex mt-3 w-full justify-evenly">
              <Link href="https://share.google/ZLMrmSLkckXFQ7fsW" target="_blank" className="group">
                <img
                  src="/assets/footer/map.svg"
                  className="w-9 lg:w-10 xl:w-13 drop-shadow-md transition-all duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-1 group-hover:drop-shadow-lg group-hover:opacity-80"
                  alt=""
                />
              </Link>
              <Link href="#" className="group">
                <img
                  src="/assets/footer/phone.svg"
                  className="w-9 lg:w-10 xl:w-13 drop-shadow-md transition-all duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-1 group-hover:drop-shadow-lg group-hover:opacity-80"
                  alt=""
                />
              </Link>
              <Link href="mailto:hero@minimastersplayground.nl" className="group">
                <img
                  src="/assets/footer/mail.svg"
                  className="w-9 lg:w-10 xl:w-13 drop-shadow-md transition-all duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-1 group-hover:drop-shadow-lg group-hover:opacity-80"
                  alt=""
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{ fontFamily: "Quicksand" }}
        className="bg-[#FFCA58] md:pt-16 pt-5 pb-10 text-white font-semibold flex md:flex-row flex-col justify-between items-center md:px-10 lg:gap-24 px-6 sm:px-10"
      >
        <div className="flex md:flex-row flex-col items-center md:gap-10 gap-1">
          <Link href="/algemene-voorwaarden" className="hover:text-[#5763FF] transition-colors duration-300">Algemene voorwaarden</Link>
          <Link href="/privacy" className="hover:text-[#5763FF] transition-colors duration-300">Privacy beleid</Link>
          <Link href="/disclaimer" className="hover:text-[#5763FF] transition-colors duration-300">Disclaimer</Link>
        </div>
        <div className="md:mt-0 mt-4">
          <h1>
            Ontwikkeld door
            <Link href="https://www.achieve.nl" target="_blank" className="hover:text-[#5763FF] transition-colors duration-300">
              {" "}
              Achieve.nl
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
}

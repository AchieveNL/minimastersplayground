"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

type CardState = "current" | "next" | "out" | "idle";

const cardData = [
  {
    title: "Emily J.",
    role: "Moeder van twee",
    text: "Alles ziet er veilig, creatief en super speels uit. Mijn zoontje vraagt nu al wanneer het open gaat!",
  },
  {
    title: "Mark R.",
    role: "Enthousiaste papa",
    text: "Dit is precies wat Waddinxveen nodig heeft. Een plek waar kinderen spelenderwijs leren, ontdekken en hun fantasie kunnen gebruiken.",
  },
  {
    title: "Sophie M.",
    role: "Enthousiaste papa",
    text: "Dit is precies wat kinderen nodig hebben: spelend leren! Ik kan niet wachten tot mijn dochter hier dokter, piloot of chef kan spelen en ondertussen zoveel leert.",
  },
  {
    title: "David K.",
    role: "Enthousiaste papa",
    text: "Eindelijk een plek waar fantasie en educatie samenkomen. Kinderen leren hier samenwerken, ontdekken beroepen en bouwen zelfvertrouwen op.",
  },
  {
    title: "Laura V.",
    role: "Enthousiaste papa",
    text: "Rollenspel is één van de krachtigste manieren waarop kinderen leren. Dit concept maakt leren avontuurlijk, creatief en onvergetelijk.",
  },
  {
    title: "Sharina",
    role: "Bewuste ouder",
    text: "Aahh dit is fantastisch. Wel wat verder voor ons maar als ik de renners zie, ga ik zeker langskomen als het klaar is! Tot snel!",
  },
  {
    title: "Roderick",
    role: "Lokale bewoner",
    text: "Wat super leuk. Dit is precies wat wij nodig hebben hier in Waddinxveen. Dit gaan mijn meiden heel gaaf vinden. Succes met het realiseren van dit mooie project.",
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
  const logoRef = useScrollAnimation<HTMLDivElement>({
    type: "fadeUp",
    duration: 1,
  });
  const cardsRef = useScrollAnimation<HTMLDivElement>({
    type: "scaleIn",
    duration: 1.1,
    delay: 0.1,
  });
  const newsletterRef = useScrollAnimation<HTMLDivElement>({
    type: "fadeUp",
    duration: 1,
    delay: 0.2,
  });

  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [states, setStates] = useState<CardState[]>([
    "current",
    "next",
    "idle",
    "idle",
    "idle",
    "idle",
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
      // Find the next idle card after the current "next" index (wrapping around)
      let idleIdx = -1;
      for (let offset = 1; offset < prev.length; offset++) {
        const i = (nextIdx + offset) % prev.length;
        if (prev[i] === "idle") {
          idleIdx = i;
          break;
        }
      }
      if (idleIdx === -1) return prev;
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
              loading="lazy"
              src="/assets/footer/stars.svg"
              style={{
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

  // Half of wave height = (100vw * 291 / 1752) / 2 = 100vw * 291 / 3504
  const halfWave = "calc(100vw * 291 / 3504)";

  return (
    <div
      style={{ fontFamily: "Nunito Variable" }}
      className="relative w-full -mt-20 sm:-mt-24 md:-mt-32 lg:-mt-40 xl:-mt-48 2xl:-mt-52"
    >
      {/* Layer 1: wave curve — SVG drives its own height via viewBox */}
      <div
        className="relative w-full pointer-events-none"
        style={{
          zIndex: 0,
        }}
      >
        <svg
          viewBox="0 0 1752 291"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full block"
          style={{ display: "block", width: "100%", height: "auto" }}
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <path
            d="M-1 291L1753 281L1753 16.5C1753 19.5 1909 36.5 1588 9.5C1411.715 -7.5 1152.323 36.9 932.508 76.3C748.86 106.3 613.38 126.9 404.5 130.8C157.22 128 -1 56.9 -1 56.9Z"
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
          className="relative 
          flex flex-col lg:flex-row items-center justify-evenly gap-28 sm:gap-32 lg:gap-0 px-6 sm:px-10 pb-28 md:pb-44 md:pt-40 pt-20 min-h-0"
          style={{
            zIndex: 1,
            marginTop: `calc(-1 * ${halfWave})`,
          }}
        >
          {/* Column 1: Logo + Socials */}
          <div
            ref={logoRef}
            className="flex flex-col items-center flex-1 min-w-0 w-full lg:w-1/3 lg:max-w-[33%]"
          >
            <Link href="/" className="-mt-10 sm:-mt-16 lg:-mt-24 relative">
              <img
                loading="lazy"
                src="/Yellow Glow.png"
                alt=""
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-[370%] max-w-none"
              />
              <img
                loading="lazy"
                src="/FooterLogoV2.png"
                alt=""
                className="mx-auto w-60 sm:w-80 md:w-[28rem] lg:w-[28rem] xl:w-[36rem] 2xl:w-[42rem] relative"
              />
            </Link>
            <div className="flex gap-6 mt-10 lg:mt-16">
              <Link
                href="https://www.instagram.com/minimastersplayground"
                target="_blank"
                className="group"
              >
                <div className="relative rounded-full w-12 lg:w-14 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-6">
                  <div className="absolute inset-0 rounded-full bg-[#FF5757]/0 group-hover:bg-[#FF5757]/15 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(255,87,87,0.35)] group-hover:scale-125" />
                  <img
                    loading="lazy"
                    src="/assets/footer/insta.svg"
                    className="rounded-full w-full relative z-10"
                    alt=""
                  />
                </div>
              </Link>
              <Link
                href="https://www.tiktok.com/@minimastersplaygr"
                target="_blank"
                className="group"
              >
                <div className="relative rounded-full w-12 lg:w-14 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-6">
                  <div className="absolute inset-0 rounded-full bg-[#5763FF]/0 group-hover:bg-[#5763FF]/15 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(87,99,255,0.35)] group-hover:scale-125" />
                  <img
                    loading="lazy"
                    src="/assets/footer/tiktok.svg"
                    className="rounded-full w-full relative z-10"
                    alt=""
                  />
                </div>
              </Link>
            </div>
          </div>

          {/* Column 2: Card Stack */}
          <div
            ref={cardsRef}
            className="flex-1 min-w-0 flex items-center justify-center w-full lg:w-1/3 lg:max-w-[33%]"
          >
            <div className="block lg:hidden">{cardStack(260)}</div>
            <div className="hidden lg:block">{cardStack(320)}</div>
          </div>

          {/* Column 3: Newsletter + Contact */}
          <div
            id="contact"
            ref={newsletterRef}
            className="flex-1 min-w-0 relative z-20 flex flex-col items-start w-full lg:max-w-sm lg:w-1/3"
          >
            <div className="w-full px-2 lg:px-0 flex flex-col items-start">
              <h2
                className="font-extrabold text-white text-base lg:text-xl leading-snug mb-3 px-6 py-2 rounded-full w-fit"
                style={{
                  fontFamily: "Quicksand",
                  background:
                    "linear-gradient(135deg, #A5DEB9 0%, #67CD8A 100%)",
                }}
              >
                JOIN THE COMMUNITY
              </h2>
              <p
                className="text-[#5763FF] font-semibold text-sm lg:text-base mb-6 text-left"
                style={{ fontFamily: "Quicksand" }}
              >
                Ontvang als eerste updates over onze opening, activiteiten en
                exclusieve acties!
              </p>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const email = (
                    form.elements.namedItem("email") as HTMLInputElement
                  ).value;
                  if (!email) return;
                  setFormStatus("loading");
                  try {
                    const body = new FormData();
                    body.append("email", email);
                    const res = await fetch(
                      "https://api.leat.com/api/v1/forms/6e833c5f-50b3-459d-b091-43969efec8fc/public/submit",
                      { method: "POST", body },
                    );
                    if (res.ok) {
                      setFormStatus("success");
                      form.reset();
                    } else {
                      setFormStatus("error");
                    }
                  } catch {
                    setFormStatus("error");
                  }
                }}
                className="flex flex-col gap-4"
              >
                {formStatus === "success" ? (
                  <p className="text-[#67CD8A] font-bold text-sm">
                    Bedankt voor je aanmelding!
                  </p>
                ) : (
                  <>
                    <div>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="E-mailadres*"
                        className="w-full rounded-full bg-white/80 outline-none text-gray-700 font-medium py-3 px-5 placeholder-gray-400"
                        style={{ fontFamily: "Quicksand" }}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={formStatus === "loading"}
                      className="w-fit px-8 py-3 rounded-full font-bold text-white text-sm tracking-wider cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-60"
                      style={{
                        background:
                          "linear-gradient(135deg, #A5DEB9 0%, #67CD8A 100%)",
                      }}
                    >
                      {formStatus === "loading" ? "EVEN GEDULD..." : "SIGN UP"}
                    </button>
                    {formStatus === "error" && (
                      <p className="text-[#FF5757] font-bold text-xs">
                        Er ging iets mis, probeer het opnieuw.
                      </p>
                    )}
                  </>
                )}
              </form>
            </div>

            {/* Contact icons */}
            <div className="flex mt-5 justify-start gap-6 px-2 lg:px-0">
              <Link
                href="https://share.google/ZLMrmSLkckXFQ7fsW"
                target="_blank"
                className="group"
              >
                <img
                  loading="lazy"
                  src="/assets/footer/map.svg"
                  className="w-9 lg:w-10 xl:w-13 drop-shadow-md transition-all duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-1 group-hover:drop-shadow-lg group-hover:opacity-80"
                  alt=""
                />
              </Link>
              <Link href="tel:+31182231203" className="group">
                <img
                  loading="lazy"
                  src="/assets/footer/phone.svg"
                  className="w-9 lg:w-10 xl:w-13 drop-shadow-md transition-all duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-1 group-hover:drop-shadow-lg group-hover:opacity-80"
                  alt=""
                />
              </Link>
              <Link
                href="mailto:hero@minimastersplayground.nl"
                className="group"
              >
                <img
                  loading="lazy"
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
        className="bg-[#FFCA58] md:pt-8 pt-5 pb-10 text-white font-semibold flex md:flex-row flex-col justify-between items-center md:px-10 lg:gap-24 px-6 sm:px-10"
      >
        <div className="flex md:flex-row flex-col items-center md:gap-10 gap-1">
          <Link
            href="/algemene-voorwaarden"
            className="hover:text-[#5763FF] transition-colors duration-300"
          >
            Algemene voorwaarden
          </Link>
          <Link
            href="/privacy"
            className="hover:text-[#5763FF] transition-colors duration-300"
          >
            Privacy beleid
          </Link>
          <Link
            href="/disclaimer"
            className="hover:text-[#5763FF] transition-colors duration-300"
          >
            Disclaimer
          </Link>
        </div>
        <div className="md:mt-0 mt-4">
          <h1>
            Met liefde gemaakt door
            <Link
              href="https://www.achieve.nl"
              target="_blank"
              className="hover:text-[#5763FF] transition-colors duration-300"
            >
              {" "}
              Achieve.nl
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
}

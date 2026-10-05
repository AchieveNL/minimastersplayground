"use client";

import { useLayoutEffect, useRef } from "react";
import { Poppins } from "next/font/google";
import { renderInline } from "../../lib/inline-markup";

// The cards were designed in Poppins. Loaded here, not via a CSS variable
// from the layout: an undefined var() makes the whole font-family invalid,
// and the text silently falls back to the page's Quicksand.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "500", "600", "700"],
});

const TICKETS_URL = "https://tickets.minimastersplayground.nl/";
const GOLD = "#F6CA7A";

// Same pill as before the cards became HTML, sized in container units so it
// keeps its shape at every card width.
const BOEK_NU_CLASS =
  "inline-flex items-center justify-center min-w-[34cqw] px-[5cqw] py-[1.7cqw] rounded-[2.2cqw] font-bold text-white text-[3.4cqw] tracking-widest shadow-md hover:scale-105 transition-transform";
const BOEK_NU_BG = "linear-gradient(135deg, #A5DEB9 0%, #8BC34A 100%)";

/** Font size that tracks card width and shrinks when the text would overflow. */
const fs = (cqw: number) => `calc(${cqw}cqw * var(--fit, 1))`;

type Prijs = { bedrag: string; label: string };
type Optie = {
  titel: string;
  regels: string[];
  sessiesTitel: string;
  sessies: string[];
};

export type PakketContent = {
  titel: string;
  intro: string;
  prijzen: Prijs[];
  inbegrepen: string[];
  voetnoot: string;
  knop: string;
};

export type PriveContent = {
  titel: string;
  intro: string;
  opties: Optie[];
  notitie: string;
  knop: string;
};

/**
 * The card artwork (stripes, ribbon, icons) is the Figma export with every
 * word painted out; the text on top is HTML so the client can edit it.
 * `box` is the free area inside the cream panel, in % of the artwork.
 */
type Frame = {
  src: string;
  color: string;
  box: { top: number; right: number; bottom: number; left: number };
};

export const FRAMES = {
  verjaardag: {
    src: "/assets/aanbod/kaart-verjaardag.webp",
    color: "#A0B193",
    // bottom matches the other cards so the BOEK NU buttons line up
    box: { top: 20.5, right: 15.4, bottom: 10, left: 15.4 },
  },
  prive: {
    src: "/assets/aanbod/kaart-prive-feestje.webp",
    color: "#81C0B8",
    box: { top: 20.5, right: 9.5, bottom: 10, left: 9.5 },
  },
  schoolreisje: {
    src: "/assets/aanbod/kaart-schoolreisje.webp",
    color: "#B4B0FA",
    box: { top: 20.5, right: 14.5, bottom: 10, left: 14.5 },
  },
} satisfies Record<string, Frame>;

/**
 * Scales every font size down (via --fit) when the content is taller than
 * the cream panel, so extra lines added in the dashboard never spill out of
 * the artwork. Sizes are in cqw, so the ratio holds at any card width.
 */
function useFitToBox(signature: string) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const box = ref.current;
    if (!box) return;

    const measure = () => {
      let fit = 1;
      box.style.setProperty("--fit", "1");
      // The button keeps its size, so one ratio can undershoot; settle it.
      for (let pass = 0; pass < 4; pass++) {
        const need = box.scrollHeight;
        const have = box.clientHeight;
        if (need <= have + 1) break;
        fit = Math.max(0.55, fit * (have / need));
        box.style.setProperty("--fit", fit.toFixed(3));
      }
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(box);
    document.fonts?.ready.then(measure);
    return () => observer.disconnect();
  }, [signature]);

  return ref;
}

function Shell({
  frame,
  titel,
  signature,
  children,
}: {
  frame: Frame;
  titel: string;
  signature: string;
  children: React.ReactNode;
}) {
  const boxRef = useFitToBox(signature);
  const { box } = frame;

  return (
    <div className={`relative @container ${poppins.className}`}>
      <img
        src={frame.src}
        alt=""
        aria-hidden="true"
        className="block w-full h-auto rounded-[5cqw]"
      />

      <h2
        className="absolute left-1/2 top-[9.5%] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-bold tracking-wide"
        style={{ color: frame.color, fontSize: "6.2cqw", lineHeight: 1 }}
      >
        {titel}
      </h2>

      <div
        ref={boxRef}
        className="absolute flex flex-col items-center text-center"
        style={{
          top: `${box.top}%`,
          right: `${box.right}%`,
          bottom: `${box.bottom}%`,
          left: `${box.left}%`,
          color: frame.color,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Intro({ text, maxWidth }: { text: string; maxWidth?: string }) {
  return (
    <p
      className="font-light"
      style={{ fontSize: fs(2.2), lineHeight: 1.5, maxWidth }}
    >
      {renderInline(text, "font-semibold")}
    </p>
  );
}

function BoekNu({ label }: { label: string }) {
  return (
    <a
      href={TICKETS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`mt-auto ${BOEK_NU_CLASS}`}
      style={{ background: BOEK_NU_BG, fontFamily: "Quicksand, sans-serif" }}
    >
      {label}
    </a>
  );
}

/** Verjaardag and Schoolreisje: prices, what is included, a footnote. */
export function PakketCard({
  frame,
  content,
}: {
  frame: Frame;
  content: PakketContent;
}) {
  return (
    <Shell
      frame={frame}
      titel={content.titel}
      signature={JSON.stringify(content)}
    >
      {/* Figma's intro block is narrower than the panel, which sets its wrap */}
      <Intro text={content.intro} maxWidth="65cqw" />

      <div
        className="flex justify-center"
        style={{ gap: fs(11), marginTop: fs(4.5) }}
      >
        {content.prijzen.map((prijs, i) => (
          <div key={i} className="flex flex-col items-center">
            <span
              className="font-bold"
              style={{ color: GOLD, fontSize: fs(5), lineHeight: 1.05 }}
            >
              {prijs.bedrag}
            </span>
            <span
              className="font-bold whitespace-pre"
              style={{ color: GOLD, fontSize: fs(2.35), lineHeight: 1.3 }}
            >
              {prijs.label}
            </span>
          </div>
        ))}
      </div>

      <ul
        className="flex flex-col font-bold"
        style={{ gap: fs(1.6), marginTop: fs(4.5), fontSize: fs(2.85), lineHeight: 1.3 }}
      >
        {content.inbegrepen.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      {content.voetnoot ? (
        <p
          style={{ fontSize: fs(1.9), lineHeight: 1.4, marginTop: fs(4.5), opacity: 0.9 }}
        >
          {content.voetnoot.startsWith("*") ? (
            <>
              <span style={{ color: GOLD }}>*</span>
              {content.voetnoot.slice(1)}
            </>
          ) : (
            content.voetnoot
          )}
        </p>
      ) : null}

      <div style={{ height: fs(3) }} className="shrink-0" />
      <BoekNu label={content.knop} />
    </Shell>
  );
}

/** Privé feestje: two time options side by side, then a note. */
export function PriveCard({
  frame,
  content,
}: {
  frame: Frame;
  content: PriveContent;
}) {
  return (
    <Shell
      frame={frame}
      titel={content.titel}
      signature={JSON.stringify(content)}
    >
      <Intro text={content.intro} />

      <div
        className="grid w-full"
        style={{
          gridTemplateColumns: `repeat(${content.opties.length}, minmax(0, 1fr))`,
          marginTop: fs(5),
        }}
      >
        {content.opties.map((optie, i) => (
          <div
            key={i}
            className="flex flex-col items-center font-bold"
            style={{
              fontSize: fs(2.45),
              lineHeight: 1.3,
              borderLeft: i > 0 ? `0.35cqw solid ${GOLD}` : undefined,
            }}
          >
            <span
              className="font-bold"
              style={{ color: GOLD, fontSize: fs(5.7), lineHeight: 1.05 }}
            >
              {optie.titel}
            </span>
            <div
              className="flex flex-col"
              style={{ gap: fs(1.9), marginTop: fs(4) }}
            >
              {optie.regels.map((regel, j) => (
                <span key={j}>{regel}</span>
              ))}
            </div>
            <div
              className="flex flex-col"
              style={{ gap: fs(1.9), marginTop: fs(5.5) }}
            >
              <span>{optie.sessiesTitel}</span>
              {optie.sessies.map((sessie, j) => (
                <span key={j}>{sessie}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p
        className="font-medium"
        style={{ fontSize: fs(2.2), lineHeight: 1.5, marginTop: fs(4) }}
      >
        {renderInline(content.notitie, "font-bold")}
      </p>

      <div style={{ height: fs(2.5) }} className="shrink-0" />
      <BoekNu label={content.knop} />
    </Shell>
  );
}

"use client";

import { useId, useLayoutEffect, useRef, useState } from "react";
import { useContent } from "../content-context";

export const CAFE_URL =
  "https://online.byonesix.com/minimasters-playground-waddinxveen";

/**
 * Baselines on the flag that follow the wave of the ribbon, in the flag's
 * own coordinates (viewBox 0 0 936.84 784.96). vlag.svg is only the ribbon;
 * the text is laid over it so it uses the site font and comes from the
 * dashboard. MIDDLE runs through the centre of the ribbon; the two lines sit
 * SPREAD above and below it (at full size), closer together when the text
 * has to shrink. A short text gets one line on MIDDLE.
 */
const MIDDLE = [459.1, 485.95, 337.7, 361.4];
const SPREAD = [25.7, 29.25, 28.2, 26.6];
const baseline = (offset: number) => {
  const [y0, y1, y2, y3] = MIDDLE.map((y, i) => (y + offset * SPREAD[i]).toFixed(1));
  return `M60,${y0} C333.3,${y1} 606.7,${y2} 880,${y3}`;
};

/** Font size the flag was designed with, and the room a line may take. */
const FONT_SIZE = 31;
const MAX_LINE_LENGTH = 720;
/** Up to this many characters the text stays on one line. */
const ONE_LINE_MAX = 24;

/**
 * Splits the flag text over two lines. An enter typed in the dashboard
 * decides the break; otherwise the break goes where both lines are about
 * equally long, preferring the end of a sentence.
 */
function flagLines(raw: string): string[] {
  const text = raw.trim().toUpperCase();
  if (!text) return [];
  const typed = text.split(/\s*\n+\s*/).filter(Boolean);
  if (typed.length > 1) return [typed[0], typed.slice(1).join(" ")];

  const words = text.split(/\s+/);
  if (text.length <= ONE_LINE_MAX || words.length < 2) return [text];

  let best = 1;
  let bestCost = Infinity;
  for (let i = 1; i < words.length; i++) {
    const first = words.slice(0, i).join(" ");
    const second = words.slice(i).join(" ");
    const sentenceEnd = /[.!?,:;]$/.test(words[i - 1]) ? 12 : 0;
    const cost = Math.abs(first.length - second.length) - sentenceEnd;
    if (cost < bestCost) {
      bestCost = cost;
      best = i;
    }
  }
  return [words.slice(0, best).join(" "), words.slice(best).join(" ")];
}

/**
 * The café photo with its waving flag. Photo and flag together link to the
 * online menu. The flagWave keyframes come from the Location section.
 */
export default function CafeLink({ className }: { className: string }) {
  const { cafe } = useContent();
  const id = useId().replace(/[^\w-]/g, "");
  const lines = flagLines(cafe.vlagTekst);

  // Shrink the text when its longest line would run off the ribbon. Lines
  // are measured off the curve (text on a curve is cut off where the curve
  // ends), at the design size.
  const measureRefs = useRef<(SVGTextElement | null)[]>([]);
  const [scale, setScale] = useState(1);
  const linesKey = lines.join("\n");
  useLayoutEffect(() => {
    let cancelled = false;
    const fit = () => {
      if (cancelled) return;
      const els = measureRefs.current.filter(Boolean) as SVGTextElement[];
      const longest = Math.max(0, ...els.map((el) => el.getComputedTextLength()));
      if (longest) setScale(Math.min(1, MAX_LINE_LENGTH / longest));
    };
    fit();
    // Measure again once Quicksand has loaded; the fallback font is wider.
    document.fonts?.ready.then(fit);
    return () => {
      cancelled = true;
    };
  }, [linesKey]);

  const paths =
    lines.length === 1 ? [baseline(0)] : [baseline(-scale), baseline(scale)];

  return (
    <a
      href={CAFE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={cafe.vlagTekst.replace(/\s+/g, " ").trim() || "Bekijk de menukaart van ons café"}
      className={`relative block ${className}`}
    >
      {/* Round crop of any uploaded photo. 94.6% wide like the circle in the
          original artwork, which the flag's offsets below are tuned to. */}
      <img
        loading="lazy"
        src={cafe.afbeelding}
        className="mx-auto block aspect-square w-[94.6%] rounded-full object-cover"
        alt=""
      />
      <div
        className="absolute w-[120%] -left-[6.5%] top-[-40%]"
        style={{ transformOrigin: "center top", animation: "flagWave 3s ease-in-out infinite" }}
      >
        <img loading="lazy" src="/assets/location/vlag.svg" className="w-full" alt="" />
        <svg
          aria-hidden
          viewBox="0 0 936.84 784.96"
          className="absolute inset-0 h-full w-full"
          fontFamily="Quicksand, sans-serif"
          fontWeight={700}
          fontSize={FONT_SIZE * scale}
          fill="#f9f9f9"
          textAnchor="middle"
        >
          <defs>
            {paths.map((d, i) => (
              <path key={i} id={`${id}-${i}`} d={d} />
            ))}
          </defs>
          {lines.map((line, i) => (
            <text key={i}>
              <textPath href={`#${id}-${i}`} startOffset="50%">
                {line}
              </textPath>
            </text>
          ))}
          {lines.map((line, i) => (
            <text
              key={`m${i}`}
              ref={(el) => {
                measureRefs.current[i] = el;
              }}
              fontSize={FONT_SIZE}
              visibility="hidden"
            >
              {line}
            </text>
          ))}
        </svg>
      </div>
    </a>
  );
}

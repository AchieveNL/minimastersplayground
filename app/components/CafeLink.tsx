import { useId } from "react";

export const CAFE_URL =
  "https://online.byonesix.com/minimasters-playground-waddinxveen";

const CAFE_TEXT =
  "Maak heerlijk gebruik van ons café. Klik hier om ons menukaart te bekijken!";

/**
 * The flag's text, one entry per line. vlag.svg is only the ribbon; the text
 * is laid over it in the same coordinates (viewBox 0 0 936.84 784.96) so it
 * uses the site font and can be changed here. Each path is a baseline that
 * follows the wave of the ribbon; the line is centred on it.
 */
const FLAG_LINES = [
  {
    text: "MAAK HEERLIJK GEBRUIK VAN ONS CAFÉ.",
    d: "M60,433.4 C333.3,456.7 606.7,309.5 880,334.8",
  },
  {
    text: "KLIK HIER OM ONS MENUKAART TE BEKIJKEN!",
    d: "M60,484.8 C333.3,515.2 606.7,365.9 880,388",
  },
];

/**
 * The café photo with its waving flag. Photo and flag together link to the
 * online menu. The flagWave keyframes come from the Location section.
 */
export default function CafeLink({ className }: { className: string }) {
  const id = useId().replace(/[^\w-]/g, "");

  return (
    <a
      href={CAFE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={CAFE_TEXT}
      className={`relative block ${className}`}
    >
      <img loading="lazy" src="/assets/location/foto.svg" className="w-full" alt="" />
      <div
        className="absolute w-[120%] -left-[6.5%] top-[-30%]"
        style={{ transformOrigin: "center top", animation: "flagWave 3s ease-in-out infinite" }}
      >
        <img loading="lazy" src="/assets/location/vlag.svg" className="w-full" alt="" />
        <svg
          aria-hidden
          viewBox="0 0 936.84 784.96"
          className="absolute inset-0 h-full w-full"
          fontFamily="Quicksand, sans-serif"
          fontWeight={700}
          fontSize={31}
          fill="#f9f9f9"
          textAnchor="middle"
        >
          <defs>
            {FLAG_LINES.map((line, i) => (
              <path key={i} id={`${id}-${i}`} d={line.d} />
            ))}
          </defs>
          {FLAG_LINES.map((line, i) => (
            <text key={i}>
              <textPath href={`#${id}-${i}`} startOffset="50%">
                {line.text}
              </textPath>
            </text>
          ))}
        </svg>
      </div>
    </a>
  );
}

"use client";

import { renderInline } from "../../lib/inline-markup";

const TICKETS_URL = "https://tickets.minimastersplayground.nl/";

// One pill for every card, sized in container units so it keeps its shape
// at every card width.
const BOEK_NU_CLASS =
  "inline-flex items-center justify-center min-w-[34cqw] px-[5cqw] py-[1.7cqw] rounded-[2.2cqw] font-bold text-white text-[3.4cqw] tracking-widest shadow-md hover:scale-105 transition-transform";
const BOEK_NU_BG = "linear-gradient(135deg, #A5DEB9 0%, #8BC34A 100%)";

export type KaartContent = {
  afbeelding: string;
  link: string;
  knop: string;
  notitie?: string;
};

/**
 * Accepts what a client types in the dashboard: a full URL, a site path, or
 * a bare domain like "tickets.example.nl", which would otherwise be treated
 * as a relative path and 404.
 */
function resolveLink(raw: string) {
  const value = raw.trim();
  if (!value) return TICKETS_URL;
  if (/^(https?:|mailto:|tel:|\/|#)/i.test(value)) return value;
  return `https://${value}`;
}

/**
 * A card is one uploaded image with the BOEK NU button laid over it. The
 * button sits at the same height on every card so side-by-side cards line
 * up; new artwork needs that strip near the bottom left empty.
 */
export function AanbodKaart({
  content,
  alt,
  notitieKleur = "#5FB8AE",
}: {
  content: KaartContent;
  alt: string;
  notitieKleur?: string;
}) {
  const href = resolveLink(content.link);
  const external = /^https?:/i.test(href);

  return (
    <div className="relative @container">
      <img
        src={content.afbeelding}
        alt={alt}
        className="block w-full h-auto rounded-[5cqw]"
      />

      <div className="absolute left-[8%] right-[8%] bottom-[10.5%] flex flex-col items-center gap-[1.6cqw] text-center">
        {content.notitie ? (
          <p
            className="font-medium leading-snug text-[2.2cqw]"
            style={{ color: notitieKleur }}
          >
            {renderInline(content.notitie, "font-bold")}
          </p>
        ) : null}

        <a
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className={BOEK_NU_CLASS}
          style={{ background: BOEK_NU_BG }}
        >
          {content.knop || "BOEK NU"}
        </a>
      </div>
    </div>
  );
}

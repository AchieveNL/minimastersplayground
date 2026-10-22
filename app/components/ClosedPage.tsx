"use client";

import { usePathname } from "next/navigation";
import { useContent } from "../content-context";
import { coiny } from "../fonts";
import { renderInline } from "../../lib/inline-markup";

/**
 * Swaps every public page for the closed page while the dashboard switch is
 * on. /beheer stays reachable, otherwise the switch could never be turned off.
 */
export default function SiteGate({ children }: { children: React.ReactNode }) {
  const { gesloten } = useContent();
  const pathname = usePathname();
  const isDashboard = pathname === "/beheer" || pathname.startsWith("/beheer/");
  if (gesloten.aan === true && !isDashboard) {
    return <ClosedPage />;
  }
  return <>{children}</>;
}

function ClosedPage() {
  const { gesloten } = useContent();
  const email = (gesloten.email ?? "").trim();
  const hasContact = gesloten.contactTitel || gesloten.contactTekst || email;

  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F8F5E3] px-4 py-16 sm:px-8"
      style={{ fontFamily: "Quicksand, sans-serif" }}
    >
      <style>{`
        @keyframes closedFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .closed-float { animation: none !important; }
        }
      `}</style>

      <div aria-hidden className="absolute inset-x-0 top-0 h-3 bg-[#C3A6E8]" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#FFE9A8] sm:h-96 sm:w-96"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-28 -right-24 h-72 w-72 rounded-full bg-[#FFD6DA] sm:h-[26rem] sm:w-[26rem]"
      />

      <div className="relative w-full max-w-3xl rounded-[2.5rem] bg-[#FDFBF3] px-6 py-10 text-center shadow-[0_20px_60px_-20px_rgba(84,62,40,0.18)] sm:px-14 sm:py-14">
        {gesloten.afbeelding && (
          <div className="mx-auto mb-7 flex w-fit items-center justify-center rounded-[46%_54%_50%_50%/55%_48%_52%_45%] bg-[#DCEFD9] px-8 py-6">
            <img
              src={gesloten.afbeelding}
              alt=""
              aria-hidden
              className="closed-float max-h-36 max-w-[220px] object-contain sm:max-h-44 sm:max-w-[260px]"
              style={{ animation: "closedFloat 4s ease-in-out infinite" }}
            />
          </div>
        )}

        {gesloten.pill && (
          <p className="mx-auto mb-5 w-fit rounded-full bg-[#FFEDB0] px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#1F4D2E] sm:px-8 sm:text-sm">
            {gesloten.pill}
          </p>
        )}

        <h1
          className={`${coiny.className} text-4xl leading-tight text-[#1F4D2E] sm:text-5xl md:text-6xl`}
        >
          {gesloten.titel}
        </h1>

        {gesloten.tekst && (
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#2F5A3C] sm:text-lg">
            {renderInline(gesloten.tekst, "font-bold")}
          </p>
        )}

        {hasContact && (
          <div className="mx-auto mt-8 max-w-xl rounded-3xl bg-[#E6F0DF] px-5 py-6 text-[#1F4D2E] sm:px-8">
            {gesloten.contactTitel && (
              <p className="text-base font-bold sm:text-lg">
                {renderInline(gesloten.contactTitel, "font-extrabold")}
              </p>
            )}
            {gesloten.contactTekst && (
              <p className="mt-1 text-[15px] sm:text-base">
                {renderInline(gesloten.contactTekst, "font-bold")}
              </p>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                className="mt-1 inline-block break-all text-base font-bold underline underline-offset-4 transition-colors duration-200 hover:text-[#3fa060] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#67CD8A]/50 sm:text-lg"
              >
                {email}
              </a>
            )}
          </div>
        )}

        <div aria-hidden className="mt-8 flex justify-center gap-4">
          <span className="h-4 w-4 rounded-full bg-[#FFE9A8]" />
          <span className="h-4 w-4 rounded-full bg-[#FFD6DA]" />
          <span className="h-4 w-4 rounded-full bg-[#DCEFD9]" />
        </div>
      </div>
    </main>
  );
}

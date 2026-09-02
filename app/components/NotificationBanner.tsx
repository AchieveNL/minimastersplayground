"use client";

export default function NotificationBanner() {
  return (
    <div
      className="w-full text-center text-white font-bold py-1.5 sm:py-2 px-3 text-[11px] xs:text-xs sm:text-sm md:text-[15px] leading-tight"
      style={{
        background:
          "linear-gradient(90deg, #67CD8A 0%, #A5DEB9 50%, #67CD8A 100%)",
        fontFamily: "Quicksand, sans-serif",
        letterSpacing: "0.01em",
      }}
      role="status"
      aria-live="polite"
    >
      <span className="inline-block">
        Wij werken met vaste speelsessies van 2,5 uur, waardoor de eindtijd
        voor iedereen gelijk is. Tickets reserveren = verplicht!
      </span>
    </div>
  );
}

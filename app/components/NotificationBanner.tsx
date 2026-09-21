"use client";

import { useContent } from "../content-context";

export default function NotificationBanner({
  ready = true,
}: {
  ready?: boolean;
}) {
  const { banner } = useContent();
  return (
    <div
      data-banner
      className="w-full text-center text-white font-bold py-3 sm:py-3.5 md:py-4 px-4 text-[13px] xs:text-sm sm:text-[15px] md:text-[17px] leading-snug"
      style={{
        background:
          "linear-gradient(90deg, #67CD8A 0%, #A5DEB9 50%, #67CD8A 100%)",
        fontFamily: "Quicksand, sans-serif",
        letterSpacing: "0.01em",
        // Waits for the preloader so the drop-in is actually seen.
        animation: ready
          ? "bannerDrop 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both"
          : undefined,
        opacity: ready ? undefined : 0,
      }}
      role="status"
      aria-live="polite"
    >
      <style>{`
        @keyframes bannerDrop {
          from { opacity: 0; transform: translateY(-100%); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-banner] { animation: none !important; opacity: 1 !important; }
        }
      `}</style>
      <span className="inline-block">{banner.text}</span>
    </div>
  );
}

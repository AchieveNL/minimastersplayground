"use client";

import { Lottie } from "lottie-react";

/** Swipe gesture animation, shown until the visitor scrolls the row once. */
export default function ScrollHint({ visible }: { visible: boolean }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none mx-auto -mt-8 mb-4 w-28 transition-opacity duration-500 lg:hidden ${
        visible ? "opacity-80" : "opacity-0"
      }`}
    >
      <Lottie
        src="/assets/lottie/scroll-hint.json"
        className="h-10 w-full"
        autoplay
        loop
      />
    </div>
  );
}

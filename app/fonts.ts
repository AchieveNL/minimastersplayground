import { Coiny } from "next/font/google";

/**
 * Display font for the nav, the green title bars and the loyalty buttons.
 * Coiny ships one weight, so use it with font-normal: font-bold would make
 * the browser fake a heavier cut and smear the letters.
 */
export const coiny = Coiny({
  weight: "400",
  subsets: ["latin"],
});

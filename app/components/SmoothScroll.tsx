"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Handle anchor clicks with smooth scroll
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a[href^='#'], a[href^='/#']");
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href) {
          // Extract the hash part from both "#section" and "/#section" formats
          const hash = href.startsWith("/#") ? href.slice(1) : href;
          if (hash && hash !== "#") {
            const el = document.querySelector(hash);
            if (el) {
              e.preventDefault();
              lenis.scrollTo(el as HTMLElement, { offset: -80 });
            }
          }
        }
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
    };
  }, []);

  return null;
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type AnimationType =
  | "fadeUp"
  | "fadeIn"
  | "fadeLeft"
  | "fadeRight"
  | "scaleIn"
  | "staggerUp";

interface ScrollAnimationOptions {
  type?: AnimationType;
  duration?: number;
  delay?: number;
  stagger?: number;
  start?: string;
  distance?: number;
}

export function useScrollAnimation<T extends HTMLElement>(
  options: ScrollAnimationOptions = {}
) {
  const ref = useRef<T>(null);
  const {
    type = "fadeUp",
    duration = 1,
    delay = 0,
    stagger = 0.12,
    start = "top 90%",
    distance = 50,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // GPU acceleration hint
    gsap.set(el, { willChange: "transform, opacity" });

    const ctx = gsap.context(() => {
      const baseScrollTrigger = {
        trigger: el,
        start,
        toggleActions: "play none none none" as const,
      };

      const smoothEase = "power3.out";

      switch (type) {
        case "fadeUp":
          gsap.fromTo(
            el,
            { opacity: 0, y: distance },
            {
              opacity: 1,
              y: 0,
              duration,
              delay,
              ease: smoothEase,
              scrollTrigger: baseScrollTrigger,
              onComplete: () => { gsap.set(el, { willChange: "auto" }); },
            }
          );
          break;

        case "fadeIn":
          gsap.fromTo(
            el,
            { opacity: 0 },
            {
              opacity: 1,
              duration,
              delay,
              ease: smoothEase,
              scrollTrigger: baseScrollTrigger,
              onComplete: () => { gsap.set(el, { willChange: "auto" }); },
            }
          );
          break;

        case "fadeLeft":
          gsap.fromTo(
            el,
            { opacity: 0, x: -distance },
            {
              opacity: 1,
              x: 0,
              duration,
              delay,
              ease: smoothEase,
              scrollTrigger: baseScrollTrigger,
              onComplete: () => { gsap.set(el, { willChange: "auto" }); },
            }
          );
          break;

        case "fadeRight":
          gsap.fromTo(
            el,
            { opacity: 0, x: distance },
            {
              opacity: 1,
              x: 0,
              duration,
              delay,
              ease: smoothEase,
              scrollTrigger: baseScrollTrigger,
              onComplete: () => { gsap.set(el, { willChange: "auto" }); },
            }
          );
          break;

        case "scaleIn":
          gsap.fromTo(
            el,
            { opacity: 0, scale: 0.88 },
            {
              opacity: 1,
              scale: 1,
              duration,
              delay,
              ease: "back.out(1.2)",
              scrollTrigger: baseScrollTrigger,
              onComplete: () => { gsap.set(el, { willChange: "auto" }); },
            }
          );
          break;

        case "staggerUp":
          gsap.fromTo(
            el.children,
            { opacity: 0, y: distance },
            {
              opacity: 1,
              y: 0,
              duration,
              delay,
              stagger,
              ease: smoothEase,
              scrollTrigger: baseScrollTrigger,
              onComplete: () => { gsap.set(el, { willChange: "auto" }); },
            }
          );
          break;
      }
    }, el);

    return () => ctx.revert();
  }, [type, duration, delay, stagger, start, distance]);

  return ref;
}

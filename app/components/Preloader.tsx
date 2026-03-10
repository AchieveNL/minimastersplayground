"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  const barTrackRef = useRef<HTMLDivElement>(null);
  const barFillRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Exit animation
          const exitTl = gsap.timeline({
            onComplete: () => {
              document.body.style.overflow = "";
              onComplete();
            },
          });

          exitTl.to(barTrackRef.current, {
            opacity: 0,
            y: 20,
            duration: 0.3,
            ease: "power2.in",
          });

          exitTl.to(
            logoRef.current,
            {
              scale: 1.1,
              duration: 0.4,
              ease: "power2.in",
            },
            "-=0.2"
          );

          exitTl.to(overlayRef.current, {
            yPercent: -100,
            duration: 0.7,
            ease: "power3.inOut",
          });
        },
      });

      // Logo bounces in
      tl.fromTo(
        logoRef.current,
        { scale: 0, rotate: -15 },
        {
          scale: 1,
          rotate: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
        }
      );

      // Progress bar appears
      tl.fromTo(
        barTrackRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.4, ease: "power2.out" },
        "-=0.1"
      );

      // Progress bar fills
      tl.to(barFillRef.current, {
        scaleX: 1,
        duration: 1.2,
        ease: "power1.inOut",
        onUpdate: function () {
          setProgress(Math.round(this.progress() * 100));
        },
      });

      // Bouncing dots during load
      if (dotsRef.current) {
        const dots = dotsRef.current.children;
        gsap.to(dots, {
          y: -8,
          duration: 0.4,
          stagger: { each: 0.12, repeat: -1, yoyo: true },
          ease: "power2.inOut",
        });
      }
    });

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #FFCA58 0%, #FFDB8D 30%, #FFCA58 60%, #FFD074 100%)",
      }}
    >
      {/* Decorative background circles */}
      <div
        className="absolute rounded-full opacity-10 w-40 h-40 md:w-[300px] md:h-[300px] -top-16 -left-16 md:-top-20 md:-left-20"
        style={{ background: "#67CD8A" }}
      />
      <div
        className="absolute rounded-full opacity-10 w-28 h-28 md:w-[200px] md:h-[200px] -bottom-10 -right-10 md:-bottom-12 md:-right-12"
        style={{ background: "#BB76FF" }}
      />
      <div
        className="absolute rounded-full opacity-8 w-20 h-20 md:w-[150px] md:h-[150px] top-[15%] right-[5%] md:top-[20%] md:right-[10%]"
        style={{ background: "#5763FF" }}
      />

      {/* Logo */}
      <img
        ref={logoRef}
        src="/assets/logo.svg"
        alt="Minimasters"
        className="w-60 md:w-80"
        style={{ transform: "scale(0)" }}
      />

      {/* Progress bar */}
      <div className="mt-6 md:mt-8 flex flex-col items-center gap-2 md:gap-3">
        <div
          ref={barTrackRef}
          className="w-40 md:w-64 h-2.5 md:h-3 rounded-full overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.35)",
            transformOrigin: "center",
            opacity: 0,
          }}
        >
          <div
            ref={barFillRef}
            className="h-full rounded-full"
            style={{
              background:
                "linear-gradient(90deg, #67CD8A 0%, #5763FF 50%, #BB76FF 100%)",
              transformOrigin: "left",
              transform: "scaleX(0)",
            }}
          />
        </div>

        {/* Loading dots */}
        <div ref={dotsRef} className="flex gap-1.5 mt-1">
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: "#67CD8A" }}
          />
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: "#5763FF" }}
          />
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: "#BB76FF" }}
          />
        </div>
      </div>
    </div>
  );
}

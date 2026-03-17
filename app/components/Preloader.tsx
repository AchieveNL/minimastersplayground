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

      // Gentle pulse on stars during load
      if (dotsRef.current) {
        gsap.to(dotsRef.current, {
          y: -6,
          duration: 0.6,
          repeat: -1,
          yoyo: true,
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
      {/* Decorative background illustrations */}
      {/* Fire extinguisher — top right */}
      <img
        src="/assets/mobile/icon1.svg"
        className="absolute -top-8 -right-8 md:w-[20rem] w-48 opacity-[0.22]"
        style={{ filter: "brightness(0) invert(1)" }}
        alt=""
      />
      {/* Lollipop/spiral — bottom left */}
      <img
        src="/assets/mobile/icon2.svg"
        className="absolute -bottom-16 -left-14 md:w-[22rem] w-52 opacity-[0.20]"
        style={{ filter: "brightness(0) invert(1)" }}
        alt=""
      />
      {/* Chick — top left */}
      <img
        src="/assets/mobile/icon3.svg"
        className="absolute top-[3%] left-[2%] md:w-60 w-36 opacity-[0.18]"
        style={{ filter: "brightness(0) invert(1)" }}
        alt=""
      />
      {/* Barn — bottom right */}
      <img
        src="/assets/location/img4.svg"
        className="absolute -bottom-10 -right-10 md:w-72 w-44 opacity-[0.16]"
        style={{ filter: "brightness(0) invert(1)" }}
        alt=""
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

      </div>
    </div>
  );
}

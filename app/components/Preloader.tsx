"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);

  const barTrackRef = useRef<HTMLDivElement>(null);
  const barFillRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
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
            "-=0.2",
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
        },
      );

      // Progress bar appears
      tl.fromTo(
        barTrackRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.4, ease: "power2.out" },
        "-=0.1",
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
    });

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #FFCA58 0%, #FFDB8D 30%, #FFCA58 60%, #FFD074 100%)",
      }}
    >
      {/* Centered content — uses inset+margin:auto so GSAP transforms don't break centering */}
      <div
        ref={centerRef}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        style={{ margin: 0 }}
      >
        <img
          ref={logoRef}
          src="/header navbar logo.svg"
          alt="Minimasters"
          className="w-52 sm:w-72 md:w-[24rem] pointer-events-auto"
          style={{
            transform: "scale(0)",
            filter:
              "drop-shadow(0 0 25px rgba(255,255,255,0.7)) drop-shadow(0 0 50px rgba(255,255,255,0.4)) drop-shadow(0 0 80px rgba(255,255,255,0.2))",
          }}
        />

        <div
          ref={barTrackRef}
          className="mt-6 w-40 md:w-64 h-2.5 md:h-3 rounded-full overflow-hidden pointer-events-auto"
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

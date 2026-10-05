"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useContent } from "../content-context";

const HEX = /^#[0-9a-fA-F]{6}$/;

/** Falls back to the default when the dashboard holds a half-typed hex. */
function channels(hex: string, fallback: string) {
  const n = parseInt((HEX.test(hex) ? hex : fallback).slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function solid(hex: string, fallback: string) {
  return `rgb(${channels(hex, fallback).join(", ")})`;
}

/**
 * One even glow, centred behind the logo, fading into a flat background.
 * This replaced a diagonal background sweep plus a separate wide ellipse,
 * which together read as several blotchy glows instead of one.
 */
function glowBackground(kern: string, rand: string, basis: string) {
  const k = solid(kern, "#FFEECF");
  const r = solid(rand, "#FFCC5D");
  const b = solid(basis, "#FFCA58");
  return `radial-gradient(circle at 50% 46%, ${k} 0%, ${r} 42%, ${b} 82%)`;
}

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const { laadscherm } = useContent();
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

      // Logo bounces in. Clearing the transform afterwards makes the browser
      // re-render the SVG at full resolution instead of stretching the
      // low-res texture it rasterised while the logo was scaled down.
      tl.fromTo(
        logoRef.current,
        { scale: 0, rotate: -15 },
        {
          scale: 1,
          rotate: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          onComplete: () => {
            if (logoRef.current) {
              gsap.set(logoRef.current, { clearProps: "transform,willChange" });
            }
          },
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
        background: glowBackground(
          laadscherm.gloedKern,
          laadscherm.gloedRand,
          laadscherm.achtergrondBasis,
        ),
      }}
    >
      {/* Centered content — uses inset+margin:auto so GSAP transforms don't break centering */}
      <div
        ref={centerRef}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        style={{ margin: 0 }}
      >
        <div className="relative flex items-center justify-center">
          <img
            ref={logoRef}
            src={laadscherm.logo}
            alt="Minimasters"
            className="w-72 sm:w-80 md:w-[24rem] pointer-events-auto relative"
            style={{
              transform: "scale(0)",
            }}
          />
        </div>

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

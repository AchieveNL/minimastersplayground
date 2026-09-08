"use client";import { useEffect, useRef } from "react";
import gsap from "gsap";
import AnimatedSilder from "./AnimatedSilder";
import InfoCard from "./InfoCard";
import BlurText from "@/components/BlurText";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useContent } from "../content-context";

export default function Hero() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const gearsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useScrollAnimation<HTMLDivElement>({
    type: "staggerUp",
    duration: 1,
    stagger: 0.18,
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.3,
      });

      // Slider scales in
      tl.fromTo(
        sliderRef.current,
        { scale: 1.05, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1 },
      );

      // Gear icons fade in from sides
      if (gearsRef.current) {
        const gears = gearsRef.current.querySelectorAll("img");
        tl.fromTo(
          gears[0],
          { x: 40, opacity: 0, rotate: -20 },
          { x: 0, opacity: 1, rotate: 0, duration: 0.8 },
          "-=0.5",
        );
        tl.fromTo(
          gears[1],
          { x: -40, opacity: 0, rotate: 20 },
          { x: 0, opacity: 1, rotate: 0, duration: 0.8 },
          "-=0.6",
        );
      }
    });
    return () => ctx.revert();
  }, []);
  const { hero } = useContent();
  const cardMeta = [
    {
      iconWidthMobile: 95,
      posMobileLeft: "-15%",
      pos: -60,
      iconWidth: 92,
      icon: "/assets/badges/groep.svg",
      titlePad: "md:pl-6",
    },
    {
      iconWidthMobile: 120,
      posMobileLeft: "-20%",
      pos: -90,
      iconWidth: 120,
      icon: "/assets/badges/educatie.svg",
      titlePad: "md:pl-8",
    },
    {
      iconWidthMobile: 95,
      posMobileLeft: "-15%",
      pos: -85,
      iconWidth: 96,
      icon: "/assets/badges/standaard.svg",
      titlePad: "md:pl-6",
    },
  ];
  const infoCards = cardMeta.map((meta, i) => ({
    ...meta,
    title: (
      <h1
        className={`font-bold md:text-lg text-center text-[#FDF9EF] ${meta.titlePad} pl-8 whitespace-nowrap rounded-br-4xl`}
      >
        {hero.infocards[i]?.title}
      </h1>
    ),
    description: hero.infocards[i]?.description,
  }));
  return (
    <div
      className="-mt-4 md:-mt-14 relative overflow-x-clip"
      style={{ fontFamily: "Quicksand" }}
    >
      <div ref={sliderRef} style={{ opacity: 0 }}>
        <AnimatedSilder />
      </div>
      <div
        id="over-ons"
        className="pt-2 md:pt-1 relative flex flex-col items-center justify-center gap-5"
      >
        <style>{`
          @keyframes heroIconFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-12px); }
          }
        `}</style>
        <div ref={gearsRef}>
          <div
            className="absolute top-0 right-0 md:w-60 w-30"
            style={{ animation: "heroIconFloat 4.2s ease-in-out infinite" }}
          >
            <img src="/assets/icons/gear.svg" className="w-full" style={{ opacity: 0 }} alt="" />
          </div>
          <div
            className="absolute left-0 md:w-60 w-30"
            style={{ animation: "heroIconFloat 3.7s ease-in-out 0.6s infinite" }}
          >
            <img src="/assets/icons/gear2.svg" className="w-full" style={{ opacity: 0 }} alt="" />
          </div>
        </div>
        <BlurText
          text="TINY HEROES"
          delay={200}
          animateBy="letters"
          direction="top"
          threshold={0.6}
          rootMargin="0px 0px -80px 0px"
          loop
          loopDelay={1500}
          className="justify-center whitespace-nowrap bg-linear-to-r from-[#67CD8A] via-[#67CD8A] to-[#97d5ad] bg-clip-text text-transparent w-full px-5 md:drop-shadow-lg [font-family:'Frankfurter',sans-serif] font-normal tracking-[0.01em] text-[length:clamp(2.25rem,8vw,9.5rem)] [-webkit-text-fill-color:transparent]"
        />
        <BlurText
          text="BIG ADVENTURES"
          delay={200}
          animateBy="letters"
          direction="top"
          threshold={0.6}
          rootMargin="0px 0px -80px 0px"
          loop
          loopDelay={1500}
          className="justify-center whitespace-nowrap bg-linear-to-r from-[#FFCA58] via-[#FFCA58] to-[#FFCA58] bg-clip-text text-transparent w-full px-5 md:drop-shadow-lg [font-family:'Frankfurter',sans-serif] font-normal tracking-[0.01em] text-[length:clamp(2.25rem,8vw,9.5rem)] [-webkit-text-fill-color:transparent]"
        />
      </div>
      <div
        ref={cardsRef}
        className="md:my-28 my-20 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-12 md:gap-10 lg:gap-6 xl:gap-6 2xl:gap-10 md:mx-24 lg:mx-10 xl:mx-12 2xl:mx-24 mx-4 sm:mx-5"
      >
        {infoCards.map((card, index) => {
          return (
            <InfoCard
              posDesktop={card.pos}
              iconWidth={card.iconWidth}
              iconWidthMobile={card.iconWidthMobile}
              posMobileLeft={card.posMobileLeft}
              key={index}
              index={index}
              title={card.title}
              description={card.description}
              icon={card.icon}
            />
          );
        })}
      </div>
    </div>
  );
}

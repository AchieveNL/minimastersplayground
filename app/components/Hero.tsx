"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import AnimatedSilder from "./AnimatedSilder";
import InfoCard from "./InfoCard";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function Hero() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const tinyRef = useRef<HTMLHeadingElement>(null);
  const bigRef = useRef<HTMLHeadingElement>(null);
  const gearsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useScrollAnimation<HTMLDivElement>({ type: "staggerUp", duration: 1, stagger: 0.18 });

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
        { scale: 1, opacity: 1, duration: 1 }
      );

      // Title text: TINY HEROES slides up
      tl.fromTo(
        tinyRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        "-=0.4"
      );

      // BIG ADVENTURES slides up with slight delay
      tl.fromTo(
        bigRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        "-=0.6"
      );

      // Gear icons fade in from sides
      if (gearsRef.current) {
        const gears = gearsRef.current.querySelectorAll("img");
        tl.fromTo(
          gears[0],
          { x: 40, opacity: 0, rotate: -20 },
          { x: 0, opacity: 1, rotate: 0, duration: 0.8 },
          "-=0.5"
        );
        tl.fromTo(
          gears[1],
          { x: -40, opacity: 0, rotate: 20 },
          { x: 0, opacity: 1, rotate: 0, duration: 0.8 },
          "-=0.6"
        );
      }
    });
    return () => ctx.revert();
  }, []);
  const infoCards = [
    {
      posMobile: -30,
      pos: -70,
      iconWidth: 120,
      icon: "/elements/Groep Icoon.svg",
      title: (
        <h1 className="font-bold md:text-lg text-base text-center text-[#FDF9EF] bg-linear-to-r from-[#67CD8A] via-[#67CD8A] to-[#A5DEB9] py-1 md:pl-0 pl-6 w-full rounded-br-4xl text-nowrap">
          DE MINI MAATSCHAPPIJ
        </h1>
      ),
      description:
        "Binnen minimasters stappen kinderen in een wereld die volledig is afgestemd op hun eigen belevingswereld. zij krijgen de ruimte om spelenderwijs te ontdekken hoe vormen van samenwerking een belangrijke rol spelen in het dagelijks leven.",
    },
    {
      posMobile: -60,
      pos: -90,
      iconWidth: 150,
      icon: "/elements/Educatie Icoon.svg",
      title: (
        <h1 className="font-bold md:text-lg text-base text-center text-[#FDF9EF] bg-linear-to-r from-[#67CD8A] via-[#67CD8A] to-[#A5DEB9] py-1 md:pl-0 pl-8 w-full rounded-br-4xl text-nowrap">
          HET EDUCATIEVE KARAKTER
        </h1>
      ),
      description:
        "Ons doel is om kinderen te laten leren door te doen, door actief deel te nemen aan herkenbare beroepen. Zelfvertrouwen en creativiteit krijgen de ruimte omdat er geen goed of fout bestaat: elk kind mag op zijn eigen manier ontdekken.",
    },
    {
      posMobile: -30,
      pos: -50,
      iconWidth: 100,
      icon: "/elements/Standaard Icoon.svg",
      title: (
        <h1 className="font-bold md:text-lg text-base text-center text-[#FDF9EF] bg-linear-to-r from-[#67CD8A] via-[#67CD8A] to-[#A5DEB9] py-1 md:pl-1 pl-4 w-full rounded-br-4xl text-nowrap">
          DE NIEUWE STANDAARD
        </h1>
      ),
      description:
        "MiniMasters biedt een hoogwaardige, schone en begeleide speelomgeving waarin kinderen worden uitgedaagd om te ontdekken en te creeëren. Geen drukke of chaotische speelplekken, maar rust, overzicht en aandacht.",
    },
  ];
  return (
    <div className="-mt-21 relative" style={{ fontFamily: "Quicksand" }}>
      <div ref={sliderRef} style={{ opacity: 0 }}>
        <AnimatedSilder />
      </div>
      <div id="over-ons" className="pt-16 md:pt-28 relative flex flex-col items-center justify-center gap-5">
        <div ref={gearsRef}>
          <img
            src="/assets/icons/gear.svg"
            className="absolute top-0 right-0 md:w-60 w-30"
            style={{ opacity: 0 }}
            alt=""
          />
          <img
            src="/assets/icons/gear2.svg"
            className="absolute left-0 md:w-60 w-30"
            style={{ opacity: 0 }}
            alt=""
          />
        </div>
        <h1 ref={tinyRef} style={{ opacity: 0 }} className="md:text-8xl text-4xl sm:text-5xl font-extrabold text-center bg-linear-to-r from-[#67CD8A] via-[#67CD8A] to-[#97d5ad] bg-clip-text text-transparent w-fit md:m-auto mx-5 drop-shadow-lg">
          TINY HEROES
        </h1>
        <h1 ref={bigRef} style={{ opacity: 0 }} className="md:text-8xl text-4xl sm:text-5xl font-extrabold text-center bg-linear-to-r from-[#FFCA58] via-[#FFCA58] to-[#FFDB8D] bg-clip-text text-transparent w-fit md:m-auto mx-5 drop-shadow-lg">
          BIG ADVENTURES
        </h1>
      </div>
      <div ref={cardsRef} className="md:my-28 my-12 flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-10 md:mx-24 mx-4 sm:mx-5">
        {infoCards.map((card, index) => {
          return (
            <InfoCard
              posDesktop={card.pos}
              posMobile={card.posMobile}
              iconWidth={card.iconWidth}
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

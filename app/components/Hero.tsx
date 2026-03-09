import AnimatedSilder from "./AnimatedSilder";
import InfoCard from "./InfoCard";

export default function Hero() {
  const infoCards = [
    {
      posMobile: -30,
      pos: -70,
      iconWidth: 120,
      icon: "/assets/icons/group.svg",
      title: (
        <h1 className="font-bold text-xl text-center text-[#FDF9EF] bg-linear-to-r from-[#67CD8A] via-[#67CD8A] to-[#A5DEB9] py-1 md:pl-0 pl-8 w-full rounded-br-4xl">
          DE MINI <br /> MAATSCHAPPIJ
        </h1>
      ),
      description:
        "Binnen minimasters stappen kinderen in een wereld die volledig is afgestemd op hun eigen belevingswereld. zij krijgen de ruimte om spelenderwijs te ontdekken hoe vormen van samenwerking een belangrijke rol spelen in het dagelijks leven.",
    },
    {
      posMobile: -60,
      pos: -90,
      iconWidth: 150,
      icon: "/assets/icons/education.svg",
      title: (
        <h1 className="font-bold text-xl text-center text-[#FDF9EF] bg-linear-to-r from-[#67CD8A] via-[#67CD8A] to-[#A5DEB9] py-1 md:pl-0 pl-10 w-full rounded-br-4xl">
          HET EDUCATIEVE <br /> KARAKTER
        </h1>
      ),
      description:
        "Ons doel is om kinderen te laten leren door te doen, door actief deel te nemen aan herkenbare beroepen. Zelfvertrouwen en creativiteit krijgen de ruimte omdat er geen goed of fout bestaat: elk kind mag op zijn eigen manier ontdekken.",
    },
    {
      posMobile: -30,
      pos: -50,
      iconWidth: 100,
      icon: "/assets/icons/badge.svg",
      title: (
        <h1 className="font-bold text-xl text-center text-[#FDF9EF] bg-linear-to-r from-[#67CD8A] via-[#67CD8A] to-[#A5DEB9] py-1 pl-1 w-full rounded-br-4xl">
          DE NIEUWE <br /> STANDAARD
        </h1>
      ),
      description:
        "MiniMasters biedt een hoogwaardige, schone en begeleide speelomgeving waarin kinderen worden uitgedaagd om te ontdekken en te creeëren. Geen drukke of chaotische speelplekken, maar rust, overzicht en aandacht.",
    },
  ];
  return (
    <div className="-mt-21 relative" style={{ fontFamily: "Quicksand" }}>
      <AnimatedSilder />
      {/* <img src="/assets/hero.svg" alt="" /> */}
      <div id="over-ons" className="pt-28 relative flex flex-col items-center justify-center gap-5">
        <img
          src="/assets/icons/gear.svg"
          className="absolute top-0 right-0 md:w-60 w-30"
          alt=""
        />
        <img
          src="/assets/icons/gear2.svg"
          className="absolute left-0 md:w-60 w-30"
          alt=""
        />
        <h1 className="md:text-8xl text-5xl font-extrabold text-center bg-linear-to-r from-[#67CD8A] via-[#67CD8A] to-[#97d5ad] bg-clip-text text-transparent w-fit md:m-auto mx-5 drop-shadow-lg">
          TINY HEROES
        </h1>
        <h1 className="md:text-8xl text-5xl font-extrabold text-center bg-linear-to-r from-[#FFCA58] via-[#FFCA58] to-[#FFDB8D] bg-clip-text text-transparent w-fit md:m-auto mx-5 drop-shadow-lg">
          BIG ADVENTURES
        </h1>
      </div>
      <div className="my-28 flex flex-col lg:flex-row  items-center justify-center gap-10 md:mx-24 mx-5">
        {infoCards.map((card, index) => {
          return (
            <InfoCard
              posDesktop={card.pos}
              posMobile={card.posMobile}
              iconWidth={card.iconWidth}
              key={index}
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

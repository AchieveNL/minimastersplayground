"use client";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

type FaqItem = {
  question: string;
  answer: React.ReactNode;
};

type FaqCategory = {
  bg: string;
  title: string;
  items: FaqItem[];
  text: string;
};

const data: FaqCategory[] = [
  {
    text: "#67CD8A",
    bg: "#FFFCF6",
    title: "Algemene vragen",
    items: [
      {
        question: "Wat is Minimasters?",
        answer: (
          <>
            Minimasters is een unieke belevingswereld waar kinderen spelenderwijs de grote-mensenwereld ontdekken. Van een eigen restaurant tot verschillende speelruimtes zoals een spa, café en zelfs een supermarkt – alles is ingericht om fantasie, creativiteit en rollenspel te stimuleren. Bij Minimasters kunnen kinderen koken, werken, ontspannen en winkelen in een veilige en interactieve omgeving. Een plek waar leren en spelen samenkomen en elk bezoek een nieuw avontuur is!
          </>
        ),
      },
      {
        question: "Welke betaalmethoden worden geaccepteerd?",
        answer: (
          <>
            Bij Minimasters is het alleen mogelijk met pin te betalen, contante betalingen worden niet geaccepteerd.
          </>
        ),
      },
      {
        question: "Kan ik mijn kinderwagen meenemen?",
        answer: (
          <>
            Bij binnenkomst in de lobby vragen we je om de kinderwagen daar achter te laten. Vanwege hygiëne en de beperkte ruimte is het niet toegestaan om kinderwagens mee te nemen in de speelruimte en zitgedeelte.
          </>
        ),
      },
      {
        question: "Kunnen mijn kinderen alleen blijven in Minimasters?",
        answer: (
          <>
            Nee, kinderen dienen altijd onder toezicht van hun ouders of verzorgers te blijven.
          </>
        ),
      },
      {
        question: "Is er een borstvoeding ruimte?",
        answer: (
          <>
            Ja, wij hebben een privé ruimte waar je borstvoeding kunt geven.
          </>
        ),
      },
      {
        question: "Mag ik eigen eten en drinken meenemen?",
        answer: (
          <>
            In ons café kun je terecht voor eten en drinken. Daarom vragen we je vriendelijk geen eigen consumpties mee te nemen. Babyvoeding en babyflessen zijn wel toegestaan.
          </>
        ),
      },
      {
        question: "Verloren items?",
        answer: (
          <>
            We bewaren gevonden voorwerpen meestal 14 dagen, afhankelijk van de beschikbare ruimte. Ben je iets verloren? Mail ons dan naar hero@minimastersplayground.nl. Houd er rekening mee dat wij niet verantwoordelijk is voor verloren spullen en dat we niet kunnen garanderen dat het item wordt teruggevonden.
          </>
        ),
      },
    ],
  },
  {
    text: "#BB76FF",
    bg: "#F5EBFF",
    title: "Tarieven",
    items: [
      {
        question: "Hoe werken de arrangementen?",
        answer: (
          <>
            Wij werken dagelijks met drie vaste sessies van elk 2,5 uur.
            <br /><br />
            Tussen iedere sessie hebben wij 30 minuten opruimtijd, zodat de ruimte weer schoon en klaar is voor de volgende groep kinderen. Op deze manier zorgen wij iedere sessie opnieuw voor een fijne en veilige speelervaring.
            <br /><br />
            Elke sessie heeft een eigen naam, maar het aanbod aan activiteiten en het spelen is in elke sessie hetzelfde.
          </>
        ),
      },
      {
        question: "Hoelaat moet ik aankomen?",
        answer: (
          <>
            We adviseren om ongeveer 5 minuten van tevoren aanwezig te zijn. Zo heb je rustig de tijd om je schoenen en jas op te bergen voordat je avontuur begint. Kom je eerder aan? Dan kan het zijn dat de deuren nog niet open zijn, omdat we tussen de speelsessies de ruimte nog aan het opruimen zijn.
          </>
        ),
      },
      {
        question: "Waarom kopen ouders en verzorgers een kaartje?",
        answer: (
          <>
            Bij Minimasters werken we met een vast aantal plekken per sessie om het spelen voor iedereen veilig en prettig te houden. Omdat ouders en verzorgers ook aanwezig zijn in de speelruimte, vragen we voor hen eveneens een ticket. Zo blijft het overzichtelijk en kan ieder kind volop genieten van het spelen.
          </>
        ),
      },
      {
        question: "Mag ik schoenen aan tijdens het spelen?",
        answer: (
          <>
            Om hygiënische redenen is het niet toegestaan om schoenen te dragen tijdens het spelen. Daarom spelen we op sokken. Ben je je sokken vergeten? Geen probleem, je kunt sokken kopen bij de receptie.
          </>
        ),
      },
    ],
  },
  {
    text: "#FF5757",
    bg: "#FFEEEE",
    title: "Tickets",
    items: [
      {
        question: "Zijn er tickets aan de deur verkrijgbaar?",
        answer: (
          <>
            Zolang een sessie niet is uitverkocht, kun je tickets kopen aan de deur bij Minimasters. De huidige beschikbaarheid vind je op onze ticketpagina. Wil je verzekerd zijn van een tijdslot? Dan adviseren we je tickets online te bestellen.
          </>
        ),
      },
      {
        question: "Kan ik mijn ticket nog annuleren?",
        answer: (
          <>
            Vooraf gekochte tickets worden niet terugbetaald. Je kunt je reservering wel tot 24 uur van tevoren kosteloos wijzigen naar een andere datum. Neem hiervoor contact op met de locatie.
          </>
        ),
      },
      {
        question: "Wat gebeurt er als ik later aankom?",
        answer: (
          <>
            Geen probleem als je iets later aankomt. Houd er wel rekening mee dat de speelsessie een vaste eindtijd heeft. Deze eindtijd blijft hetzelfde voor alle spelers, ook als je later begint.
          </>
        ),
      },
    ],
  },
  {
    text: "#5763FF",
    bg: "#EAECFF",
    title: "Activiteiten",
    items: [
      {
        question: "Welke activiteiten zijn er?",
        answer: (
          <>
            Onze ruimte is ingericht als een klein dorp met verschillende huisjes, waar kinderen spelenderwijs verschillende beroepen en dagelijkse situaties kunnen ontdekken.
            <br /><br />
            Zo kunnen kinderen onder andere:
            <ul className="list-disc pl-5 mt-1">
              <li>Koeien melk geven</li>
              <li>Boodschappen doen in de supermarkt</li>
              <li>Spelen in het politiebureau</li>
              <li>Sleutelen in de autogarage</li>
            </ul>
            En nog veel meer! Alles staat in het teken van fantasie, ontdekken en samen spelen.
          </>
        ),
      },
      {
        question: "Is Minimasters geschikt voor kinderfeestjes?",
        answer: (
          <>
            Ja! Bij het reserveren van een sessie kun je ook kiezen voor een verjaardagsarrangement.
            <br /><br />
            Wij bieden twee soorten kinderfeestjes aan:
            <ul className="list-disc pl-5 mt-1">
              <li>Verjaardag type 1 (uitleg volgt)</li>
              <li>Verjaardag type 2 (uitleg volgt)</li>
            </ul>
          </>
        ),
      },
    ],
  },
];

// Framer Motion variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

const AccordionItem = ({
  question,
  answer,
  text,
  bg,
}: {
  text: string;
  bg: string;
  question: string;
  answer: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className="w-full relative"
    >

      <div
        onClick={() => setOpen((prev) => !prev)}
        className="w-full cursor-pointer p-4 px-6 rounded-xl mb-3"
        style={{
          overflow: "hidden",
          backgroundColor: open ? text : bg,
          transition: "background-color 0.3s ease",
        }}
      >
        <div className="flex items-center justify-between w-full">
          <h2
            className="font-bold text-lg"
            style={{
              color: open ? "#ffffff" : text,
              transition: "color 0.3s ease",
            }}
          >
            {question}
          </h2>
          <ChevronDown
            style={{
              color: open ? "#ffffff" : text,
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease, color 0.3s ease",
              flexShrink: 0,
            }}
          />
        </div>

        {/* Animated answer */}
        <div
          style={{
            display: "grid",
            gridTemplateRows: open ? "1fr" : "0fr",
            transition: "grid-template-rows 0.35s ease",
          }}
        >
          <div style={{ overflow: "hidden" }}>
            <div
              className="text-white font-medium text-base mt-3"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(8px)",
                transition:
                  "opacity 0.3s ease 0.05s, transform 0.3s ease 0.05s",
              }}
            >
              {answer}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CategoryCard = ({ title, items, text, bg }: FaqCategory) => {
  return (
    <motion.div
      className="flex flex-col items-center mt-5 w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={containerVariants}
    >
      <motion.h2
        className="font-bold text-[22px] text-center mb-2"
        style={{ color: text }}
        variants={titleVariants}
      >
        {title}
      </motion.h2>
      {items.map((item, index) => (
        <AccordionItem
          text={text}
          bg={bg}
          key={index}
          question={item.question}
          answer={item.answer}
        />
      ))}
    </motion.div>
  );
};

export default function Faq() {
  const badgeRef = useScrollAnimation<HTMLDivElement>({ type: "scaleIn", duration: 1 });
  const questionsRef = useScrollAnimation<HTMLDivElement>({ type: "fadeUp", duration: 1, delay: 0.1 });

  return (
    <div id="faq" className="md:my-24 my-16 relative" style={{ fontFamily: "Quicksand" }}>
      <img loading="lazy" src="/assets/faq/icon1.svg" className="absolute md:w-60 w-30 top-1/2 md:-translate-y-1/2" alt="" />
      <img loading="lazy" src="/assets/faq/icon2.svg" className="absolute md:w-50 w-20 right-0 md:-top-10 top-10 " alt="" />
      <img loading="lazy" src="/assets/faq/icon3.svg" className="absolute md:w-50 w-20 right-0 top-[70%]" alt="" />

      <div ref={badgeRef} className="flex w-fit md:px-10 px-5 py-3 sm:py-4 md:pl-20 pl-10 items-center relative justify-center mx-auto m-auto bg-linear-to-r from-[#67CD8A] via-[#67CD8A] to-[#A5DEB9] rounded-br-4xl">
        <img loading="lazy"
          src="/elements/Vragen Icoon.svg"
          className="absolute md:hidden"
          style={{ width: "120px", left: "-20%" }}
          alt=""
        />
        <img loading="lazy"
          src="/elements/Vragen Icoon.svg"
          className="absolute hidden md:block"
          style={{ width: "130px", left: -50 }}
          alt=""
        />

        <h1 className="font-bold md:text-lg text-center text-[#FDF9EF] md:pl-0 pl-8 w-full rounded-br-4xl">
          FAQ-ANTWOORDEN
        </h1>
      </div>
      <div ref={questionsRef} className="w-full md:w-3/4 lg:w-2/3 md:px-0 px-4 sm:px-5 flex flex-col items-center m-auto mt-8 md:mt-10">
        {data.map((category, index) => (
          <CategoryCard
            bg={category.bg}
            text={category.text}
            key={index}
            title={category.title}
            items={category.items}
          />
        ))}
      </div>

    </div>
  );
}

"use client";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useContent } from "../content-context";

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

const categoryPalette = [
  { text: "#BB76FF", bg: "#F5EBFF" },
  { text: "#67CD8A", bg: "#FFFCF6" },
  { text: "#5763FF", bg: "#EAECFF" },
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
            className="font-bold text-lg md:text-xl"
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
              className="text-white font-medium text-base md:text-lg mt-3"
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
  const { faq } = useContent();
  const data: FaqCategory[] = faq.categorieen.map((cat, i) => ({
    ...categoryPalette[i % categoryPalette.length],
    title: cat.titel,
    items: cat.items.map((item) => ({
      question: item.vraag,
      answer: <span className="whitespace-pre-line">{item.antwoord}</span>,
    })),
  }));
  const badgeRef = useScrollAnimation<HTMLDivElement>({
    type: "scaleIn",
    duration: 1,
  });
  const questionsRef = useScrollAnimation<HTMLDivElement>({
    type: "fadeUp",
    duration: 1,
    delay: 0.1,
  });

  return (
    <div
      id="faq"
      className="mt-4 md:-mt-10 md:mb-24 mb-16 relative overflow-x-clip"
      style={{ fontFamily: "Quicksand" }}
    >
      <img
        loading="lazy"
        src="/assets/faq/icon1.svg"
        className="absolute md:w-60 w-30 top-1/2 md:-translate-y-1/2"
        alt=""
      />
      <img
        loading="lazy"
        src="/assets/faq/icon2.svg"
        className="absolute md:w-50 w-20 right-0 md:-top-10 top-10 "
        alt=""
      />
      <img
        loading="lazy"
        src="/assets/faq/icon3.svg"
        className="absolute md:w-50 w-20 right-0 top-[70%]"
        alt=""
      />

      <div
        ref={badgeRef}
        className="flex w-fit md:px-10 px-5 py-3 sm:py-4 md:pl-20 pl-10 items-center relative z-10 justify-center mx-auto m-auto bg-linear-to-r from-[#67CD8A] via-[#67CD8A] to-[#A5DEB9] rounded-br-4xl"
      >
        <img
          loading="lazy"
          src="/assets/badges/vragen.svg"
          className="absolute z-20 md:hidden"
          style={{ width: "120px", left: "-20%" }}
          alt=""
        />
        <img
          loading="lazy"
          src="/assets/badges/vragen.svg"
          className="absolute z-20 hidden md:block"
          style={{ width: "130px", left: -50 }}
          alt=""
        />

        <h1 className="font-bold md:text-lg text-center text-[#FDF9EF] md:pl-0 pl-8 whitespace-nowrap rounded-br-4xl">
          {faq.badge}
        </h1>
      </div>
      <div
        ref={questionsRef}
        className="w-full md:w-3/4 lg:w-3/4 xl:w-2/3 md:px-0 px-4 sm:px-5 flex flex-col items-center m-auto mt-8 md:mt-10"
      >
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

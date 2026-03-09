"use client";

import Link from "next/link";
import { useState } from "react";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{ fontFamily: "StudlyFree, sans-serif" }}
      className="flex px-10 pt-8 pb-15 bg-[url('/assets/header-bg.svg')] bg-cover gap-50 relative overflow-hidden"
    >
      {/* Logo */}
      <Link href="/">
        <img
          src="/assets/logo.svg"
          className="w-72 md:mt-0 mt-5 md:mb-0 mb-10"
          alt=""
        />
      </Link>

      {/* Desktop Nav */}
      <div className="xl:flex hidden gap-8 text-lg">
        <Link href="/" className="text-[#FF5757]">
          HOME
        </Link>
        <Link href="/#over-ons" className="text-[#5763FF] text-nowrap">
          OVER ONS
        </Link>
        <Link href="/#tickets" className="text-[#FF5757]">
          TICKETS
        </Link>
        <Link href="/#openingstijden" className="text-[#BB76FF]">
          OPENINGSTIJDEN
        </Link>
        <Link href="/#faq" className="text-[#67CD8A]">
          FAQ
        </Link>
        <Link href="/#contact" className="text-[#5763FF]">
          CONTACT
        </Link>
      </div>

      {/* Hamburger Button (mobile only) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="xl:hidden flex flex-col justify-center items-center gap-1.5 ml-auto z-50 w-10 h-10 absolute top-0 right-0 m-2"
        aria-label="Toggle menu"
      >
        <span
          className={`block h-0.5 w-7 bg-blue-600 transition-all duration-300 ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-7 bg-red-600 transition-all duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-7 transition-all duration-300 ${
            isOpen ? "-rotate-45 -translate-y-2 bg-red-600" : "bg-green-600"
          }`}
        />
      </button>
      {isOpen && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="xl:hidden flex flex-col justify-center items-center gap-1.5 ml-auto z-50 w-10 h-10 fixed top-0 right-0 m-2"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-7 bg-blue-600 transition-all duration-300 ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-7 bg-red-600 transition-all duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-7 transition-all duration-300 ${
              isOpen ? "-rotate-45 -translate-y-2 bg-red-600" : "bg-green-600"
            }`}
          />
        </button>
      )}

      {/* Mobile Drawer */}
      <div
        className={`xl:hidden flex flex-col bg-[#FFCA58] items-center gap-8 text-lg fixed top-0 right-0 h-full w-2/3 py-8 z-40 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Link href="/" onClick={() => setIsOpen(false)}>
          <img src="/assets/logo.svg" className="w-full p-4 mt-6" alt="" />
        </Link>
        <Link
          href="/"
          className="text-[#FF5757]"
          onClick={() => setIsOpen(false)}
        >
          HOME
        </Link>
        <Link
          href="/#over-ons"
          className="text-[#5763FF]"
          onClick={() => setIsOpen(false)}
        >
          OVER ONS
        </Link>
        <Link
          href="/#tickets"
          className="text-[#FF5757]"
          onClick={() => setIsOpen(false)}
        >
          TICKETS
        </Link>
        <Link
          href="/#openingstijden"
          className="text-[#BB76FF]"
          onClick={() => setIsOpen(false)}
        >
          OPENINGSTIJDEN
        </Link>
        <Link
          href="/#faq"
          className="text-[#67CD8A]"
          onClick={() => setIsOpen(false)}
        >
          FAQ
        </Link>
        <Link
          href="/#contact"
          className="text-[#5763FF]"
          onClick={() => setIsOpen(false)}
        >
          CONTACT
        </Link>
      </div>

      {/* Backdrop overlay */}
      {isOpen && (
        <div
          className="xl:hidden fixed inset-0 bg-black/40 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

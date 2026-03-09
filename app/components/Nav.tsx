"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      );
      tl.fromTo(
        logoRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.7 },
        "-=0.4"
      );
      // Desktop nav links
      if (linksRef.current) {
        tl.fromTo(
          linksRef.current.children,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.06 },
          "-=0.3"
        );
      }
      // Mobile hamburger
      if (hamburgerRef.current) {
        tl.fromTo(
          hamburgerRef.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.5)" },
          "-=0.5"
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={navRef}
      style={{ fontFamily: "StudlyFree, sans-serif", opacity: 0 }}
      className="flex items-center px-10 pt-8 pb-15 bg-[url('/assets/header-bg.svg')] bg-cover sticky top-0 z-50 overflow-hidden"
    >
      {/* Logo */}
      <Link href="/" className="flex-shrink-0" ref={logoRef}>
        <img
          src="/assets/logo.svg"
          className="w-72 md:mt-0 mt-5 md:mb-0 mb-10"
          alt=""
        />
      </Link>

      {/* Desktop Nav */}
      <div ref={linksRef} className="xl:flex hidden gap-8 text-lg flex-1 justify-center text-nowrap">
        <Link href="/" className="text-[#FF5757]">
          HOME
        </Link>
        <Link href="/#over-ons" className="text-[#5763FF] text-nowrap">
          OVER ONS
        </Link>
        <Link href="/#tickets" className="text-[#FF5757]">
          TICKETS
        </Link>
        <Link href="/#loyalty" className="text-[#67CD8A]">
          LOYALTY
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
        ref={hamburgerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="xl:hidden flex flex-col justify-center items-center gap-1.5 ml-auto z-50 w-10 h-10 absolute top-0 right-0 m-2"
        style={{ opacity: 0 }}
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
          href="/#loyalty"
          className="text-[#67CD8A]"
          onClick={() => setIsOpen(false)}
        >
          LOYALTY
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

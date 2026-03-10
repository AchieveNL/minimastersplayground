"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const waveSvgRef = useRef<SVGSVGElement>(null);
  const flatBgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const logoImgRef = useRef<HTMLImageElement>(null);

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

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Unified GSAP transition between wave and flat states
  useEffect(() => {
    if (!waveSvgRef.current || !flatBgRef.current || !contentRef.current || !logoImgRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power2.inOut", duration: 0.45 } });

    if (scrolled) {
      tl.to(waveSvgRef.current, { opacity: 0, y: -15 }, 0)
        .to(flatBgRef.current, { opacity: 1 }, 0)
        .to(contentRef.current, { paddingTop: "0.5rem", paddingBottom: "0.5rem" }, 0)
        .to(logoImgRef.current, { width: "12rem", marginTop: 0, marginBottom: 0 }, 0);
    } else {
      tl.to(waveSvgRef.current, { opacity: 1, y: 0 }, 0)
        .to(flatBgRef.current, { opacity: 0 }, 0)
        .to(contentRef.current, { paddingTop: "1rem", paddingBottom: "1rem" }, 0)
        .to(logoImgRef.current, { width: "18rem", clearProps: "marginTop,marginBottom" }, 0);
    }

    return () => { tl.kill(); };
  }, [scrolled]);

  return (
    <div
      ref={navRef}
      style={{ fontFamily: "StudlyFree, sans-serif", opacity: 0 }}
      className="sticky top-0 z-50"
    >
      <div className="relative overflow-visible">
        {/* Background wave shape */}
        <svg
          ref={waveSvgRef}
          className="absolute top-0 left-0 w-full"
          style={{ height: "calc(100% + 100px)" }}
          viewBox="0 0 1752 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* White/cream wave (slightly larger, sits behind) */}
          <path
            d="M-1 0L1753 0L1753 196C1753 196 1594.78 164 1327.5 141C1138.62 125 1003.14 146 819.492 176C599.677 215 340.285 260 264 260C43 260 -1 238 -1 238L-1 0Z"
            fill="#FDF9EF"
          />
          {/* Yellow wave (main nav background) */}
          <path
            d="M-1 0L1753 0L1753 174.108C1753 174.108 1594.78 143 1327.5 120.229C1138.62 104.138 1003.14 124.719 819.492 154.652C599.677 194.063 340.285 238.5 264 238.5C43 238.5 -1 216.5 -1 216.5L-1 0Z"
            fill="url(#nav_gradient)"
          />
          <defs>
            <linearGradient id="nav_gradient" x1="-1" y1="119" x2="1377.09" y2="705.82" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFCA58" />
              <stop offset="1" stopColor="#FFDB8D" />
            </linearGradient>
          </defs>
        </svg>

        {/* Flat background (visible when scrolled) */}
        <div
          ref={flatBgRef}
          className="absolute inset-0"
          style={{
            background: "linear-gradient(90deg, #FFCA58 0%, #ffdb8dff 100%)",
            boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
            opacity: 0,
          }}
        />

        {/* Nav content */}
        <div
          ref={contentRef}
          className="flex items-center px-6 md:px-10 pt-4 pb-4 md:pt-5 md:pb-5 relative z-10"
        >
          {/* Logo */}
          <Link href="/" className="flex-shrink-0" ref={logoRef}>
            <img
              ref={logoImgRef}
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
        </div>
      </div>

      {/* Fixed hamburger when drawer is open */}
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

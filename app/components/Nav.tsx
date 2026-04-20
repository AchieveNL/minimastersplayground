"use client";import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
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
        { y: 0, opacity: 1, duration: 0.8 },
      );
      tl.fromTo(
        logoRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.7 },
        "-=0.4",
      );
      // Desktop nav links
      if (linksRef.current) {
        tl.fromTo(
          linksRef.current.children,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.06 },
          "-=0.3",
        );
      }
      // Mobile hamburger
      if (hamburgerRef.current) {
        tl.fromTo(
          hamburgerRef.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.5)" },
          "-=0.5",
        );
      }
    });
    return () => ctx.revert();
  }, []);

  // Scroll detection — throttled via rAF to avoid excess re-renders
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
      }
    };
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Unified GSAP transition between wave and flat states
  useEffect(() => {
    if (
      !waveSvgRef.current ||
      !flatBgRef.current ||
      !contentRef.current ||
      !logoImgRef.current
    )
      return;

    const isMobile = window.innerWidth < 768;
    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut", duration: 0.8 },
    });

    if (scrolled) {
      tl.to(waveSvgRef.current, { opacity: 1, y: 0 }, 0)
        .to(flatBgRef.current, { opacity: 0 }, 0)
        .to(
          contentRef.current,
          { paddingTop: "0.5rem", paddingBottom: "0.5rem" },
          0,
        )
        .to(
          logoImgRef.current,
          {
            width: isMobile ? "8rem" : "12rem",
            marginTop: isMobile ? "auto" : 0,
            marginBottom: isMobile ? "auto" : 0,
          },
          0,
        );
    } else {
      tl.to(waveSvgRef.current, { opacity: 1, y: 0 }, 0)
        .to(flatBgRef.current, { opacity: 0 }, 0)
        .to(
          contentRef.current,
          {
            paddingTop: isMobile ? "0.5rem" : "1.5rem",
            paddingBottom: isMobile ? "0.5rem" : "2.5rem",
          },
          0,
        )
        .to(
          logoImgRef.current,
          {
            width: isMobile ? "10rem" : "14rem",
            clearProps: "marginTop,marginBottom",
          },
          0,
        );
    }

    return () => {
      tl.kill();
    };
  }, [scrolled]);

  return (
    <>
      {/* Sticky Nav Bar */}
      <div
        ref={navRef}
        style={{ fontFamily: "Quicksand, sans-serif", opacity: 0 }}
        className="sticky top-0 z-50"
      >
        <div className="relative overflow-visible">
          {/* Background wave shape — desktop only */}
          <svg
            ref={waveSvgRef}
            className="absolute top-0 left-0 w-full h-[calc(100%+40px)] md:h-[calc(100%+90px)]!"
            style={{
              willChange: "transform, opacity",
              transform: "translateZ(0)",
            }}
            viewBox="0 0 1752 280"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            {/* White/cream wave (thin on left, thick on right) */}
            <path
              d={
                isMobile
                  ? "M-1 0L1753 0L1753 205C1753 205 1594.78 198 1327.5 194C1138.62 190 1003.14 193 819.492 198C599.677 204 340.285 212 264 212C43 212 -1 208 -1 208L-1 0Z"
                  : "M-1 0L1753 0L1753 205C1753 205 1594.78 170 1327.5 148C1138.62 130 1003.14 145 819.492 168C599.677 200 340.285 240 264 240C43 240 -1 220 -1 220L-1 0Z"
              }
              fill="#FDF9EF"
            />
            {/* Yellow wave (main nav background) */}
            <path
              d={
                isMobile
                  ? "M-1 0L1753 0L1753 174C1753 174 1594.78 168 1327.5 163C1138.62 160 1003.14 164 819.492 170C599.677 178 340.285 187 264 187C43 187 -1 183 -1 183L-1 0Z"
                  : "M-1 0L1753 0L1753 174.108C1753 174.108 1594.78 143 1327.5 120.229C1138.62 104.138 1003.14 124.719 819.492 154.652C599.677 194.063 340.285 238.5 264 238.5C43 238.5 -1 216.5 -1 216.5L-1 0Z"
              }
              fill="url(#nav_gradient)"
            />
            <defs>
              <linearGradient
                id="nav_gradient"
                x1="-1"
                y1="119"
                x2="1377.09"
                y2="705.82"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FFCA58" />
                <stop offset="1" stopColor="#FFDB8D" />
              </linearGradient>
            </defs>
          </svg>

          {/* Flat background — always visible on mobile, shown on scroll for desktop */}
          <div
            ref={flatBgRef}
            className="absolute inset-0 opacity-0"
            style={{
              background: "linear-gradient(90deg, #FFCA58 0%, #ffdb8dff 100%)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
            }}
          />

          {/* Nav content */}
          <div
            ref={contentRef}
            className="flex items-center px-4 sm:px-6 md:px-10 py-4 md:py-2 relative z-10"
          >
            {/* Logo */}
            <Link
              href="/"
              className="flex-shrink-0 my-3  md:my-0 md:mt-6"
              ref={logoRef}
            >
              <img
                ref={logoImgRef}
                src="/header navbar logo.svg"
                className="w-36 sm:w-44 md:w-56 xl:w-56 2xl:w-72"
                style={{
                  filter:
                    "drop-shadow(0 0 25px rgba(255,255,255,0.7)) drop-shadow(0 0 50px rgba(255,255,255,0.4)) drop-shadow(0 0 80px rgba(255,255,255,0.2))",
                  willChange: "transform",
                  transform: "translateZ(0)",
                }}
                alt=""
              />
            </Link>

            {/* Desktop Nav */}
            <div
              ref={linksRef}
              className="xl:flex hidden gap-5 2xl:gap-8 text-base 2xl:text-lg font-bold flex-1 justify-center items-center text-nowrap flex-nowrap"
            >
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="text-[#FF5757] cursor-pointer"
              >
                HOME
              </a>
              <Link href="/#over-ons" className="text-[#5763FF] text-nowrap">
                OVER ONS
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
              <Link
                href="/#tickets"
                className="text-white px-6 py-1.5 rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, #A5DEB9 0%, #67CD8A 100%)",
                }}
              >
                TICKETS
              </Link>
            </div>

            {/* Mobile: Hamburger + Tickets button */}
            <div className="xl:hidden flex items-center gap-1.5 ml-auto self-start -mt-1 -mr-1 sm:-mr-2 md:self-auto md:mt-6 md:mr-0">
              <button
                ref={hamburgerRef}
                onClick={() => setIsOpen(!isOpen)}
                className="flex flex-col justify-center items-center gap-[5px] rounded-full w-10 h-10 z-50"
                style={{
                  opacity: 0,
                  background:
                    "linear-gradient(135deg, #A5DEB9 0%, #67CD8A 100%)",
                }}
                aria-label="Toggle menu"
              >
                <span
                  className={`block h-[2.5px] w-[18px] rounded-full bg-white transition-all duration-300 ${
                    isOpen ? "rotate-45 translate-y-[7.5px]" : ""
                  }`}
                />
                <span
                  className={`block h-[2.5px] w-[18px] rounded-full bg-white transition-all duration-300 ${
                    isOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-[2.5px] w-[18px] rounded-full bg-white transition-all duration-300 ${
                    isOpen ? "-rotate-45 -translate-y-[7.5px]" : ""
                  }`}
                />
              </button>
              <Link
                href="/#tickets"
                className="text-white text-sm font-bold px-4 h-10 inline-flex items-center rounded-full leading-none"
                style={{
                  background:
                    "linear-gradient(135deg, #A5DEB9 0%, #67CD8A 100%)",
                  fontFamily: "Quicksand, sans-serif",
                }}
              >
                Tickets
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop overlay — rendered outside sticky nav to escape stacking context */}
      {isOpen && (
        <div
          className="xl:hidden fixed inset-0 z-[998]"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Drawer — rendered outside sticky nav to escape stacking context */}
      <div
        className={`xl:hidden flex flex-col items-center gap-5 sm:gap-6 text-base sm:text-lg fixed top-0 right-0 h-full w-2/3 sm:w-1/2 px-6 py-8 z-[999] transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          fontFamily: "Quicksand, sans-serif",
          fontWeight: "bold",
          backgroundColor: "#FFCA58",
          boxShadow: isOpen ? "-4px 0 20px rgba(0,0,0,0.15)" : "none",
        }}
      >
        {/* Close button inside drawer */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 flex flex-col justify-center items-center gap-1.5 w-10 h-10"
          aria-label="Close menu"
        >
          <span className="block h-0.5 w-7 bg-white rotate-45 translate-y-2 transition-all duration-300" />
          <span className="block h-0.5 w-7 bg-white opacity-0 transition-all duration-300" />
          <span className="block h-0.5 w-7 bg-white -rotate-45 -translate-y-2 transition-all duration-300" />
        </button>

        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="flex justify-center w-full mt-4 relative"
        >
          <img
            src="/Yellow Glow.png"
            alt=""
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-[170%] max-w-none opacity-50"
          />
          <img
            src="/header navbar logo.svg"
            className="w-3/4 p-2 relative"
            alt=""
          />
        </Link>
        <a
          href="#"
          className="text-[#FF5757]"
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          HOME
        </a>
        <Link
          href="/#over-ons"
          className="text-[#5763FF]"
          onClick={() => setIsOpen(false)}
        >
          OVER ONS
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
        <Link
          href="/#tickets"
          className="text-white px-6 py-1.5 rounded-full"
          style={{
            background: "linear-gradient(135deg, #A5DEB9 0%, #67CD8A 100%)",
          }}
          onClick={() => setIsOpen(false)}
        >
          TICKETS
        </Link>
      </div>
    </>
  );
}

"use client";
import Link from "next/link";
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
          {
            paddingTop: "10px",
            paddingBottom: "10px",
          },
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
            paddingTop: "10px",
            paddingBottom: "10px",
          },
          0,
        )
        .to(
          logoImgRef.current,
          {
            width: isMobile ? "0rem" : "14rem",
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
        <div
          className="relative overflow-visible"
          style={{ backgroundColor: "#FDF9EF" }}
        >
          {/* Background wave shape — desktop only */}
          <svg
            ref={waveSvgRef}
            className="absolute top-0 left-0 w-full h-[calc(100%+40px)] md:h-[calc(100%+90px)]!"
            viewBox="0 0 1752 280"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            {/* White/cream wave (thin on left, thick on right) */}
            <path
              d={
                isMobile
                  ? "M-1 0L1753 0L1753 205C1753 205 1594.78 184 1327.5 171C1138.62 161 1003.14 170 819.492 183C599.677 202 340.285 226 264 226C43 226 -1 214 -1 214L-1 0Z"
                  : "M-1 0L1753 0L1753 205C1753 205 1594.78 170 1327.5 148C1138.62 130 1003.14 145 819.492 168C599.677 200 340.285 240 264 240C43 240 -1 220 -1 220L-1 0Z"
              }
              fill="#FDF9EF"
            />
            {/* Yellow wave (main nav background) */}
            <path
              d={
                isMobile
                  ? "M-1 0L1753 0L1753 174C1753 174 1594.78 156 1327.5 142C1138.62 133 1003.14 145 819.492 163C599.677 186 340.285 212 264 212C43 212 -1 199 -1 199L-1 0Z"
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
              background: "linear-gradient(90deg, #FFCA58 0%, #ffdb8dff 80%)",
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
                className="w-36 sm:w-44 md:w-56 xl:w-56 2xl:w-72 md:[filter:drop-shadow(0_0_30px_rgba(255,255,255,0.55))]"
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
            <div className="xl:hidden flex items-center pb-2.5 gap-1.5 ml-auto -mr-1 sm:-mr-2 md:mr-0">
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
                href="/#contact"
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

      {/* Mobile Drawer — wrapped in fixed/inset-0/overflow-hidden so the closed-state
          translateX(100%) can't extend past the viewport (iOS horizontal-scroll bug). */}
      <div className="xl:hidden fixed inset-0 overflow-hidden pointer-events-none z-[999]">
        <div
          className={`flex flex-col items-center gap-5 sm:gap-6 text-base sm:text-lg absolute top-0 right-0 h-full w-2/3 sm:w-1/2 px-6 py-8 transition-transform duration-300 pointer-events-auto ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{
            fontFamily: "Quicksand, sans-serif",
            fontWeight: "bold",
            background:
              "linear-gradient(180deg, #FFCA58 0%, #FFDB8D 50%, #FFE9B5 100%)",
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
      </div>
    </>
  );
}

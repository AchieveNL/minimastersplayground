"use client";
import Marquee from "react-fast-marquee";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

const images = [
  "/assets/hero-imgs/img1.png",
  "/assets/hero-imgs/img2.jpg",
  "/assets/hero-imgs/img3.jpg",
  "/assets/hero-imgs/img4.jpg",
  "/assets/hero-imgs/img5.png",
  "/assets/hero-imgs/img6.jpg",
];

export default function AnimatedSlider({
  direction = "left",
}: {
  direction?: "left" | "right";
}) {
  const [marqueeSpeed, setMarqueeSpeed] = useState(100);

  useEffect(() => {
    const updateSpeed = () => {
      setMarqueeSpeed(window.innerWidth < 768 ? 50 : 50);
    };
    updateSpeed();
    window.addEventListener("resize", updateSpeed);
    return () => window.removeEventListener("resize", updateSpeed);
  }, []);

  return (
    <>
      <svg
        width="0"
        height="0"
        style={{ position: "absolute", overflow: "hidden" }}
        aria-hidden="true"
      >
        <defs>
          <clipPath id="wavyClip" clipPathUnits="objectBoundingBox">
            <path
              d="
              M 0,0.0647
              C 0.0335,0.0952  0.106,0.1135   0.106,0.1135
              C 0.1576,0.1265  0.1877,0.1208  0.2397,0.1135
              C 0.2916,0.1062  0.3202,0.0927  0.3715,0.0763
              C 0.4216,0.0602  0.4492,0.0457  0.4994,0.0305
              C 0.5471,0.0161  0.5738,0.0043  0.6221,0
              C 0.6715,-0.0044 0.6994,0.0006  0.7487,0.0091
              C 0.8484,0.0265  1,0.1056       1,0.1056
              L 1,0.9262
              C 0.929,0.884   0.8821,0.8719  0.8821,0.8719
              C 0.8305,0.8585  0.8021,0.8503  0.75,0.8505
              C 0.7022,0.8507  0.6738,0.861   0.6263,0.8719
              C 0.5761,0.8834  0.5492,0.9039  0.5,0.9262
              C 0.4532,0.9474  0.4189,0.9612  0.3715,0.9768
              C 0.3214,0.9933  0.2905,1.0031  0.2397,1
              C 0.1893,0.9969  0.1557,0.9927  0.106,0.9768
              C 0.0577,0.9614  0,0.9262       0,0.9262
              Z
            "
            />
          </clipPath>
        </defs>
      </svg>

      <div
        style={{ clipPath: "url(#wavyClip)" }}
        className="w-full mt-2 md:mt-8 xl:mt-0 xl:h-screen lg:h-130 md:h-100 h-62.5 2xl:h-200 mb-26 overflow-hidden bg-white"
      >
        <Marquee
          speed={marqueeSpeed}
          direction={direction}
          className="h-full overflow-hidden"
        >
          <div className="grid grid-cols-3 grid-rows-2 md:gap-3 gap-1 h-full md:p-1.5 p-0.75 md:w-[120vw] w-[160vw]">
            <img
              // key={i}
              src="/assets/hero-imgs/img1.png"
              alt=""
              className="w-full h-full object-cover rounded-sm md:-mt-5 mt-3"
            />
            <img
              // key={i}
              src="/assets/hero-imgs/img2.jpg"
              alt=""
              className="w-full h-full object-cover rounded-sm md:-mt-10"
            />
            <img
              // key={i}
              src="/assets/hero-imgs/img3.jpg"
              alt=""
              className="w-full h-full object-cover rounded-sm md:mt-0 mt-5"
            />
            <img
              // key={i}
              src="/assets/hero-imgs/img4.jpg"
              alt=""
              className="w-full h-full object-cover rounded-sm md:-mt-5 mt-3"
            />
            <img
              // key={i}
              src="/assets/hero-imgs/img5.png"
              alt=""
              className="w-full h-full object-cover rounded-sm md:-mt-10"
            />
            <img
              // key={i}
              src="/assets/hero-imgs/img6.jpg"
              alt=""
              className="w-full h-full object-cover rounded-sm md:mt-0 mt-5"
            />
            <img
              // key={i}
              src="/assets/hero-imgs/img1.png"
              alt=""
              className="w-full h-full object-cover rounded-sm md:-mt-5 mt-3"
            />
            <img
              // key={i}
              src="/assets/hero-imgs/img2.jpg"
              alt=""
              className="w-full h-full object-cover rounded-sm md:-mt-10"
            />
            <img
              // key={i}
              src="/assets/hero-imgs/img3.jpg"
              alt=""
              className="w-full h-full object-cover rounded-sm md:mt-0 mt-5"
            />
            <img
              // key={i}
              src="/assets/hero-imgs/img4.jpg"
              alt=""
              className="w-full h-full object-cover rounded-sm md:-mt-5 mt-3"
            />
            <img
              // key={i}
              src="/assets/hero-imgs/img5.png"
              alt=""
              className="w-full h-full object-cover rounded-sm md:-mt-10"
            />
            <img
              // key={i}
              src="/assets/hero-imgs/img6.jpg"
              alt=""
              className="w-full h-full object-cover rounded-sm md:mt-0 mt-5"
            />
          </div>
        </Marquee>
      </div>
    </>
  );
}

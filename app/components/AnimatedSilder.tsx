"use client";
import Marquee from "react-fast-marquee";
import { useEffect, useState } from "react";
import { useContent } from "../content-context";

const FALLBACK_IMAGES = [
  "/assets/hero-imgs/img1.webp",
  "/assets/hero-imgs/img2.jpg",
  "/assets/hero-imgs/img3.jpg",
  "/assets/hero-imgs/img4.jpg",
  "/assets/hero-imgs/img5.webp",
  "/assets/hero-imgs/img6.jpg",
];

// Every third column gets the same vertical offset, giving the strip its stagger.
const OFFSETS = [
  "",
  "-translate-y-2.5 md:-translate-y-5",
  "translate-y-2.5 md:translate-y-5",
];

// Strip height per screen size. The padding keeps the two main rows clear of
// the wavy edges; the rows below are sized from all three.
const STRIP_SIZE =
  "h-(--strip-h) [--strip-h:18rem] md:[--strip-h:420px] lg:[--strip-h:60vh] xl:[--strip-h:70vh] 2xl:[--strip-h:80vh] [--strip-pad:10px] md:[--strip-pad:calc(var(--strip-h)*0.07)] [--strip-gap:4px] md:[--strip-gap:12px]";

// The two main rows exactly fill the strip inside the padding, so no photo
// is cut off at the bottom.
const ROW =
  "calc((var(--strip-h) - 2 * var(--strip-pad) - var(--strip-gap)) / 2)";

export default function AnimatedSlider({
  direction = "left",
  variant = "hero",
}: {
  direction?: "left" | "right";
  variant?: "hero" | "footer";
}) {
  const { fotostrook } = useContent();
  const [marqueeSpeed, setMarqueeSpeed] = useState(100);

  const images: string[] =
    fotostrook?.afbeeldingen?.map((item) => item?.afbeelding).filter(Boolean) ??
    [];
  const source = images.length ? images : FALLBACK_IMAGES;
  // Two photos per column; an odd count borrows the first photo so the last
  // column is not half empty.
  const photos = source.length % 2 ? [...source, source[0]] : source;
  // Each column also gets a filler photo above and below, sitting mostly
  // outside the strip, so the wave cuts through a photo instead of leaving an
  // empty band where it is shallow. Fillers come from other columns so a
  // column never shows the same photo twice.
  const tiles = Array.from({ length: photos.length / 2 }, (_, c) => [
    photos[(2 * c + 3) % photos.length],
    photos[2 * c],
    photos[2 * c + 1],
    photos[(2 * c + photos.length - 2) % photos.length],
  ]).flat();

  useEffect(() => {
    const update = () => setMarqueeSpeed(window.innerWidth < 768 ? 50 : 50);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const desktopPath = `
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
  `;

  return (
    <>
      <svg
        width="0"
        height="0"
        style={{ position: "absolute", overflow: "hidden" }}
        aria-hidden="true"
      >
        <defs>
          <clipPath
            id={variant === "hero" ? "wavyClipHero" : "wavyClipFooter"}
            clipPathUnits="objectBoundingBox"
          >
            <path d={desktopPath} />
          </clipPath>
        </defs>
      </svg>

      <div
        style={{
          clipPath: `url(#${variant === "hero" ? "wavyClipHero" : "wavyClipFooter"})`,
          WebkitClipPath: `url(#${variant === "hero" ? "wavyClipHero" : "wavyClipFooter"})`,
          WebkitTransform: "translateZ(0)",
          position: "relative",
          zIndex: 0,
        }}
        className={`w-full overflow-hidden bg-[#FDF9EF] relative ${STRIP_SIZE} ${variant === "hero" ? "mt-2 md:mt-8 xl:mt-0 mb-4 md:mb-22" : "mb-18 md:mb-26"}`}
      >
        <Marquee
          speed={marqueeSpeed}
          direction={direction}
          autoFill
          className="h-full overflow-hidden"
        >
          <div
            className="grid grid-flow-col"
            style={{
              gridTemplateRows: `repeat(4, ${ROW})`,
              // 3:2, the shape the dashboard asks for, so photos show whole.
              gridAutoColumns: `calc(${ROW} * 1.5)`,
              gap: "var(--strip-gap)",
              padding: "var(--strip-pad) calc(var(--strip-gap) / 2)",
              // Pulls the filler rows outside the strip, keeping the main
              // rows where they were.
              marginBlock: `calc(-1 * (${ROW} + var(--strip-gap)))`,
            }}
          >
            {tiles.map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className={`w-full h-full object-cover rounded-sm ${OFFSETS[Math.floor(i / 4) % 3]}`}
              />
            ))}
          </div>
        </Marquee>
      </div>
    </>
  );
}

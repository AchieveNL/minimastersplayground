import React from "react";

export default function Mobile({ content }: { content: React.ReactNode }) {
  return (
    <div className="" style={{ fontFamily: "Quicksand" }}>
      <div className="relative w-fit">
        {/* Full phone SVG visible in its entirety */}
        <img loading="lazy"
          src="/assets/mobile/mobile.svg"
          alt="Mobile frame"
          className="block h-[50vh] md:h-[70vh]"
        />

        {/* Content overlaid on the screen — no overflow, everything fits */}
        <div className="absolute text-center text-xs md:text-lg text-white font-bold top-1/2 -translate-y-1/2 mt-2 md:mt-3 p-2 md:p-4 pb-4 md:pb-8 mx-4 md:mx-6 gap-2 md:gap-5 flex flex-col items-center overflow-hidden bg-[linear-gradient(200.1deg,#B1B6FF_2.75%,#D3D6FF_14.08%,#B1B6FF_33.74%,#B1B6FF_80.21%)] rounded-xl md:rounded-2xl">
          {/* Logo */}
          <img loading="lazy"
            src="/newLogo2.svg"
            className="object-contain shrink-0 w-20 md:w-[140px]"
            alt="Logo"
          />
          {content}
        </div>
      </div>
    </div>
  );
}
import React from "react";

export default function Mobile({ content }: { content: React.ReactNode }) {
  return (
    <div className="" style={{ fontFamily: "Quicksand" }}>
      <div className="relative w-fit">
        {/* Full phone SVG visible in its entirety */}
        <img loading="lazy"
          src="/assets/mobile/mobile.svg"
          alt="Mobile frame"
          className="block h-[50vh] sm:h-[55vh] md:h-[50vh] lg:h-[65vh]"
        />

        {/* Content overlaid on the screen — no overflow, everything fits */}
        <div className="absolute text-center text-xs lg:text-lg text-white font-bold inset-x-4 lg:inset-x-6 top-[12%] bottom-[12%] p-2 lg:p-4 gap-2 lg:gap-5 flex flex-col items-center justify-center overflow-hidden bg-[linear-gradient(200.1deg,#B1B6FF_2.75%,#D3D6FF_14.08%,#B1B6FF_33.74%,#B1B6FF_80.21%)] rounded-xl lg:rounded-2xl">
          {/* Logo */}
          <img loading="lazy"
            src="/Footeer Logo.svg"
            className="object-contain shrink-0 w-20 lg:w-[140px]"
            alt="Logo"
          />
          {content}
        </div>
      </div>
    </div>
  );
}
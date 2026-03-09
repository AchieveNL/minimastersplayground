import React from "react";

export default function Mobile({ content }: { content: React.ReactNode }) {
  return (
    <div className="" style={{ fontFamily: "Quicksand" }}>
      <div className="relative w-fit">
        {/* Full phone SVG visible in its entirety */}
        <img
          src="/assets/mobile/mobile.svg"
          alt="Mobile frame"
          className="block h-[90vh]"
        />

        {/* Content overlaid on the screen — no overflow, everything fits */}
        <div className="absolute text-center text-lg text-white font-bold top-1/2 -translate-y-1/2 mt-3 p-4 pb-8 mx-6 gap-5 flex flex-col items-center overflow-hidden bg-[linear-gradient(200.1deg,#B1B6FF_2.75%,#D3D6FF_14.08%,#B1B6FF_33.74%,#B1B6FF_80.21%)] rounded-2xl ">
          {/* Logo */}
          <img
            src="/assets/mobile/logo.svg"
            className="object-contain shrink-0"
            alt="Logo"
            style={{ width: "90px" }}
          />
          {content}
        </div>
      </div>
    </div>
  );
}
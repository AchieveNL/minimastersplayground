"use client";

import LocationDesktop from "./LocationDesktop";
import LocationMobile from "./LocationMobile";

export default function Location() {
  return (
    <div id="openingstijden">
      {/* Desktop/Tablet: md and up */}
      <div className="hidden md:block">
        <LocationDesktop />
      </div>
      {/* Mobile: below md */}
      <div className="block md:hidden">
        <LocationMobile />
      </div>
    </div>
  );
}

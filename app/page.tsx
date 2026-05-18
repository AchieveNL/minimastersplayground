"use client";
import { useState } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Slider from "./components/Slider";
import MobileSection from "./components/MobileSection";
import Location from "./components/Location";
import Faq from "./components/Faq";
import AnimatedSlider from "./components/AnimatedSilder";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import NewsletterPopup from "./components/NewsletterPopup";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      <div
        className="overflow-x-clip"
        style={{ visibility: loaded ? "visible" : "hidden" }}
      >
        <Nav />
        <Hero />
        <Slider />
        <MobileSection />
        <Location />
        <Faq />
        <AnimatedSlider direction="right" variant="footer" />
        <Footer />
      </div>
      {loaded && <NewsletterPopup />}
    </>
  );
}

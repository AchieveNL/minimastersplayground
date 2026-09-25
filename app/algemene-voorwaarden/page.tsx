"use client";

import LegalPage from "../components/LegalPage";
import { useContent } from "../content-context";

const ACCENTS = [
  "#FF5757",
  "#67CD8A",
  "#BB76FF",
  "#FF5757",
  "#5763FF",
  "#67CD8A",
  "#BB76FF",
  "#FF5757",
  "#67CD8A",
  "#BB76FF",
  "#5763FF",
  "#FF5757",
];

export default function AlgemeneVoorwaardenPage() {
  const { voorwaarden } = useContent();

  return (
    <LegalPage
      titel={voorwaarden.titel}
      ondertitel={voorwaarden.ondertitel}
      intro={voorwaarden.intro}
      infoblokTitel={voorwaarden.infoblokTitel}
      infoblokTekst={voorwaarden.infoblokTekst}
      secties={voorwaarden.secties}
      headerFrom="#5763FF"
      headerTo="#7b85ff"
      ondertitelKleur="#5763FF"
      infoblokKleur="rgba(87, 99, 255, 0.1)"
      kleuren={ACCENTS}
    />
  );
}

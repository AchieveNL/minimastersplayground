"use client";

import LegalPage from "../components/LegalPage";
import { useContent } from "../content-context";

const ACCENTS = [
  "#FF5757",
  "#5763FF",
  "#67CD8A",
  "#FF5757",
  "#BB76FF",
  "#5763FF",
  "#67CD8A",
  "#FF5757",
  "#BB76FF",
  "#5763FF",
  "#67CD8A",
  "#FF5757",
  "#BB76FF",
];

export default function PrivacyPage() {
  const { privacy } = useContent();

  return (
    <LegalPage
      titel={privacy.titel}
      ondertitel={privacy.ondertitel}
      intro={privacy.intro}
      infoblokTitel={privacy.infoblokTitel}
      infoblokTekst={privacy.infoblokTekst}
      secties={privacy.secties}
      headerFrom="#BB76FF"
      headerTo="#d4a5ff"
      ondertitelKleur="#5763FF"
      infoblokKleur="rgba(255, 202, 88, 0.2)"
      infoblokTitelKleur="#FF5757"
      kleuren={ACCENTS}
    />
  );
}

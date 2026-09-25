"use client";

import LegalPage from "../components/LegalPage";
import { useContent } from "../content-context";

export default function DisclaimerPage() {
  const { disclaimer } = useContent();

  return (
    <LegalPage
      titel={disclaimer.titel}
      ondertitel={disclaimer.ondertitel}
      intro={disclaimer.intro}
      infoblokTitel={disclaimer.infoblokTitel}
      infoblokTekst={disclaimer.infoblokTekst}
      secties={disclaimer.secties}
      headerFrom="#67CD8A"
      headerTo="#A5DEB9"
      ondertitelKleur="#67CD8A"
    />
  );
}

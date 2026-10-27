"use client";

import { useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Eye, Rocket, X } from "lucide-react";
import { publishDrafts } from "../beheer/actions";

export type PreviewInfo = {
  /** Sections with a concept that is not live yet. */
  concepten: number;
  weergave: "website" | "gesloten";
};

/**
 * Floating bar shown only in the admin preview. It sits at the bottom so it
 * never covers the site's own navigation.
 */
export default function PreviewBar({ preview }: { preview: PreviewInfo }) {
  const pathname = usePathname();
  const router = useRouter();
  const [publishing, startPublish] = useTransition();
  const [message, setMessage] = useState("");

  const viewHref = (weergave: PreviewInfo["weergave"]) =>
    `/api/preview?weergave=${weergave}&terug=${encodeURIComponent(pathname)}`;

  const publish = () => {
    const n = preview.concepten;
    if (
      !window.confirm(
        `${n} ${n === 1 ? "onderdeel" : "onderdelen"} live zetten? Bezoekers zien de wijzigingen daarna direct.`,
      )
    ) {
      return;
    }
    startPublish(async () => {
      const result = await publishDrafts();
      setMessage(
        result.ok ? "Gepubliceerd!" : `Publiceren mislukt: ${result.error}`,
      );
      router.refresh();
    });
  };

  const tab = (weergave: PreviewInfo["weergave"], label: string) => {
    const active = preview.weergave === weergave;
    return (
      <a
        href={viewHref(weergave)}
        aria-current={active ? "true" : undefined}
        className={`rounded-full px-3 py-1.5 transition-colors duration-200 ${
          active ? "bg-white text-[#5763FF]" : "text-white/80 hover:text-white"
        }`}
      >
        {label}
      </a>
    );
  };

  return (
    <div
      role="region"
      aria-label="Voorbeeld"
      className="fixed bottom-4 left-1/2 z-[1000] flex w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-3xl bg-[#5763FF] px-4 py-3 text-sm font-bold text-white shadow-2xl shadow-[#5763FF]/40 sm:rounded-full"
      style={{ fontFamily: "Quicksand, sans-serif" }}
    >
      <span className="inline-flex items-center gap-1.5">
        <Eye className="h-4 w-4" />
        VOORBEELD
      </span>
      <span className="text-white/80">
        {message ||
          (preview.concepten > 0
            ? `${preview.concepten} ${preview.concepten === 1 ? "wijziging" : "wijzigingen"} nog niet live`
            : "Alles staat live")}
      </span>

      <span className="flex rounded-full bg-white/15 p-1">
        {tab("website", "Website")}
        {tab("gesloten", "Gesloten pagina")}
      </span>

      {preview.concepten > 0 && (
        <button
          type="button"
          onClick={publish}
          disabled={publishing}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-[#67CD8A] px-4 py-1.5 transition-opacity duration-200 hover:opacity-90 disabled:opacity-60"
        >
          <Rocket className="h-4 w-4" />
          {publishing ? "Bezig…" : "Publiceren"}
        </button>
      )}

      <a
        href="/api/preview?actie=uit"
        className="inline-flex items-center gap-1 rounded-full px-2 py-1.5 text-white/80 transition-colors duration-200 hover:text-white"
      >
        <X className="h-4 w-4" />
        Sluiten
      </a>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "minimasters_newsletter_dismissed_at";
const SHOW_AFTER_MS = 5000;
const COOLDOWN_DAYS = 7;

type FormStatus = "idle" | "loading" | "success" | "error";

export default function NewsletterPopup() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const dismissedAt = localStorage.getItem(STORAGE_KEY);
      if (dismissedAt) {
        const elapsedDays =
          (Date.now() - Number(dismissedAt)) / (1000 * 60 * 60 * 24);
        if (elapsedDays < COOLDOWN_DAYS) return;
      }
    } catch {}
    const t = setTimeout(() => setOpen(true), SHOW_AFTER_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => {
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {}
    setOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    if (!email) return;
    setStatus("loading");
    try {
      const body = new FormData();
      body.append("email", email);
      const res = await fetch(
        "https://api.leat.com/api/v1/forms/13816a98-5cca-4d59-ac85-e42ba8cccc62/public/submit",
        { method: "POST", body },
      );
      if (res.ok) {
        setStatus("success");
        form.reset();
        setTimeout(() => close(), 2500);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center px-4 sm:px-6"
      style={{ fontFamily: "Quicksand, sans-serif" }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="newsletter-popup-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/55 backdrop-blur-sm animate-[npFadeIn_0.3s_ease-out]"
        onClick={close}
      />

      {/* Popup card — yellow gradient, playful */}
      <div
        className="relative w-full max-w-md rounded-tr-[60px] rounded-bl-[60px] rounded-tl-3xl rounded-br-3xl shadow-2xl animate-[npPopIn_0.45s_cubic-bezier(0.34,1.56,0.64,1)] overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #FFCA58 0%, #FFDB8D 55%, #FFE9B5 100%)",
        }}
      >
        {/* Top-right decorative icon */}
        <img
          src="/assets/icons/cards-icon1.svg"
          alt=""
          aria-hidden
          className="absolute -top-2 -right-4 w-24 sm:w-28 opacity-90 pointer-events-none select-none"
        />
        {/* Bottom-left decorative icon */}
        <img
          src="/assets/icons/cards-icon2.svg"
          alt=""
          aria-hidden
          className="absolute -bottom-2 -left-4 w-20 sm:w-24 opacity-90 pointer-events-none select-none"
        />

        {/* Close button */}
        <button
          type="button"
          onClick={close}
          aria-label="Sluiten"
          className="absolute top-3 right-3 flex items-center justify-center w-9 h-9 rounded-full bg-white/60 hover:bg-white/90 text-[#5763FF] transition-colors z-20"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        </button>

        <div className="relative z-10 flex flex-col items-center text-center px-6 py-9 sm:px-9 sm:py-11">
          {/* Header pill — green for contrast against yellow */}
          <h2
            id="newsletter-popup-title"
            className="font-extrabold text-white text-base sm:text-lg leading-snug mb-5 px-6 py-2 rounded-full w-fit shadow-md"
            style={{
              background: "linear-gradient(135deg, #A5DEB9 0%, #67CD8A 100%)",
            }}
          >
            JOIN THE COMMUNITY
          </h2>

          <p
            className="text-[#5763FF] font-extrabold text-xl sm:text-2xl mb-2 leading-tight"
            style={{ letterSpacing: "0.005em" }}
          >
            Nog eventjes geduld!
          </p>
          <p className="text-[#5763FF] font-semibold text-sm sm:text-base mb-6 max-w-xs">
            Ontvang als eerste updates over onze opening, activiteiten en
            exclusieve acties!
          </p>

          {status === "success" ? (
            <div className="py-4 flex flex-col items-center gap-2">
              <div
                className="flex items-center justify-center w-12 h-12 rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, #A5DEB9 0%, #67CD8A 100%)",
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="5 12 10 17 19 7" />
                </svg>
              </div>
              <p className="text-[#FDF9EF] font-extrabold text-base sm:text-lg">
                Bedankt voor je aanmelding!
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 w-full items-center"
            >
              <input
                type="email"
                name="email"
                required
                placeholder="E-mailadres*"
                className="w-full rounded-full bg-white/95 outline-none text-gray-700 font-medium py-3 px-5 placeholder-gray-400 text-center focus:ring-2 focus:ring-[#67CD8A] transition-all"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full sm:w-fit px-10 py-3 rounded-full font-extrabold text-white text-sm sm:text-base tracking-wider cursor-pointer hover:scale-105 transition-transform disabled:opacity-60 disabled:hover:scale-100 shadow-lg"
                style={{
                  background:
                    "linear-gradient(135deg, #A5DEB9 0%, #67CD8A 100%)",
                }}
              >
                {status === "loading" ? "EVEN GEDULD..." : "MELD JE AAN!"}
              </button>
              {status === "error" && (
                <p className="text-[#FF5757] font-bold text-sm bg-white/80 rounded-full px-3 py-1">
                  Er ging iets mis, probeer het opnieuw.
                </p>
              )}
            </form>
          )}
        </div>
      </div>

      <style>{`
        @keyframes npFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes npPopIn {
          0% { opacity: 0; transform: scale(0.85) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

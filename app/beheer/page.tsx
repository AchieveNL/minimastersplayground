"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import {
  Megaphone,
  LayoutGrid,
  Ticket,
  Clock,
  Star,
  Car,
  HelpCircle,
  Mail,
  MessageSquare,
  LogOut,
  ExternalLink,
  Trash2,
  Plus,
  Save,
  CheckCircle2,
  AlertCircle,
  Lock,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { createClient } from "../../lib/supabase/client";
import { contentDefaults, type SiteContent } from "../../content/defaults";
import { revalidateSite } from "./actions";

type SectionKey = keyof SiteContent;

const SECTIONS: {
  key: SectionKey;
  label: string;
  hint: string;
  icon: LucideIcon;
}[] = [
  { key: "banner", label: "Notificatiebalk", hint: "Groene balk bovenaan", icon: Megaphone },
  { key: "hero", label: "Infokaarten", hint: "Homepage introductie", icon: LayoutGrid },
  { key: "slider", label: "Ons aanbod", hint: "Kaarten op homepage", icon: Ticket },
  { key: "tijdsloten", label: "Tijdsloten & Loyalty", hint: "Telefoons sectie", icon: Clock },
  { key: "openingstijden", label: "Openingstijden", hint: "Tijden per dag", icon: Star },
  { key: "parkeren", label: "Parkeren", hint: "Parkeer tip blok", icon: Car },
  { key: "faq", label: "Veelgestelde vragen", hint: "Vragen & antwoorden", icon: HelpCircle },
  { key: "footer", label: "Footer & reviews", hint: "Nieuwsbrief, reviews, adres", icon: Mail },
  { key: "popup", label: "Nieuwsbrief popup", hint: "Popup na 5 seconden", icon: MessageSquare },
];

const FIELD_LABELS: Record<string, string> = {
  text: "Tekst",
  title: "Titel",
  titel: "Titel",
  description: "Beschrijving",
  infocards: "Infokaart",
  cards: "Kaart",
  badge: "Badge tekst",
  badgeLeft: "Badge links",
  badgeRight: "Badge rechts",
  sessieText: "Sessie uitleg",
  loyaltyIntro: "Loyalty intro",
  loyaltyHighlight: "Loyalty highlight (groen)",
  loyaltyPunten: "Punten uitleg",
  loyaltyWallet: "Wallet uitleg",
  knopAanmelden: "Knop aanmelden",
  knopInloggen: "Knop inloggen",
  rijen: "Rij",
  label: "Label",
  tijd: "Tijd",
  garageNaam: "Garage naam",
  garageAdres: "Garage adres",
  garageGratis: "Gratis regel",
  wijk: "Wijk regel",
  categorieen: "Categorie",
  items: "Vraag",
  vraag: "Vraag",
  antwoord: "Antwoord",
  nieuwsbriefPill: "Pill tekst",
  nieuwsbriefTitel: "Nieuwsbrief titel",
  nieuwsbriefSubtitel: "Nieuwsbrief subtitel",
  succesBericht: "Succes bericht",
  foutBericht: "Fout bericht",
  adres: "Adres",
  reviews: "Review",
  naam: "Naam",
  rol: "Rol",
  tekst: "Tekst",
  pill: "Pill tekst",
  subtitel: "Subtitel",
  placeholder: "E-mail placeholder",
  knop: "Knop",
  knopBezig: "Knop (bezig)",
  succes: "Succes bericht",
  fout: "Fout bericht",
};

const labelFor = (key: string) => FIELD_LABELS[key] ?? key;

function emptyLike(item: unknown): unknown {
  if (typeof item === "string") return "";
  if (Array.isArray(item)) return [];
  if (item && typeof item === "object") {
    return Object.fromEntries(
      Object.entries(item).map(([k, v]) => [k, emptyLike(v)]),
    );
  }
  return "";
}

const inputCls =
  "w-full rounded-xl border border-[#E8E0C8] bg-white px-3.5 py-2.5 text-[15px] text-slate-800 placeholder-slate-400 transition-colors duration-200 focus:outline-none focus:border-[#67CD8A] focus:ring-2 focus:ring-[#67CD8A]/30";

function FieldEditor({
  value,
  onChange,
  fieldKey,
}: {
  value: unknown;
  onChange: (v: unknown) => void;
  fieldKey: string;
}) {
  if (typeof value === "string") {
    const long = value.length > 60 || value.includes("\n");
    return (
      <label className="block">
        <span className="mb-1.5 block text-[13px] font-bold uppercase tracking-wide text-slate-500">
          {labelFor(fieldKey)}
        </span>
        {long ? (
          <textarea
            value={value}
            rows={Math.min(9, Math.max(2, Math.ceil(value.length / 70)))}
            onChange={(e) => onChange(e.target.value)}
            className={inputCls + " leading-relaxed"}
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={inputCls}
          />
        )}
      </label>
    );
  }

  if (Array.isArray(value)) {
    return (
      <div>
        <div className="space-y-4">
          {value.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-[#E8E0C8] bg-[#FDFAF1] p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#5763FF]/10 px-3 py-1 text-xs font-bold text-[#5763FF]">
                  {labelFor(fieldKey)} {i + 1}
                </span>
                <button
                  type="button"
                  aria-label={`${labelFor(fieldKey)} ${i + 1} verwijderen`}
                  onClick={() => onChange(value.filter((_, j) => j !== i))}
                  className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition-colors duration-200 hover:bg-[#FF5757]/10 hover:text-[#FF5757] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5757]/40"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <FieldEditor
                value={item}
                fieldKey={fieldKey}
                onChange={(v) =>
                  onChange(value.map((x, j) => (j === i ? v : x)))
                }
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => onChange([...value, emptyLike(value[0] ?? "")])}
          className="mt-3 inline-flex cursor-pointer items-center gap-1.5 rounded-full border-2 border-dashed border-[#67CD8A]/50 px-4 py-2 text-sm font-bold text-[#3fa060] transition-colors duration-200 hover:border-[#67CD8A] hover:bg-[#67CD8A]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#67CD8A]/40"
        >
          <Plus className="h-4 w-4" />
          {labelFor(fieldKey)} toevoegen
        </button>
      </div>
    );
  }

  if (value && typeof value === "object") {
    return (
      <div className="space-y-4">
        {Object.entries(value).map(([k, v]) => (
          <FieldEditor
            key={k}
            fieldKey={k}
            value={v}
            onChange={(nv) => onChange({ ...(value as object), [k]: nv })}
          />
        ))}
      </div>
    );
  }

  return null;
}

export default function BeheerPage() {
  const supabase = useMemo(() => createClient(), []);
  const [session, setSession] = useState<Session | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [content, setContent] = useState<SiteContent | null>(null);
  const [active, setActive] = useState<SectionKey>("banner");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ ok: boolean; msg: string } | null>(null);
  const savedSnapshot = useRef<string>("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthChecked(true);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    if (!session) return;
    (async () => {
      const merged = structuredClone(contentDefaults) as SiteContent;
      const { data } = await supabase.from("site_content").select("key, value");
      for (const row of data ?? []) {
        if (row.key in merged && row.value) {
          (merged as Record<string, unknown>)[row.key] = row.value;
        }
      }
      savedSnapshot.current = JSON.stringify(merged);
      setContent(merged);
    })();
  }, [session, supabase]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  const dirtyKeys = useMemo(() => {
    if (!content || !savedSnapshot.current) return new Set<string>();
    const saved = JSON.parse(savedSnapshot.current) as Record<string, unknown>;
    const set = new Set<string>();
    for (const k of Object.keys(content)) {
      if (
        JSON.stringify(content[k as SectionKey]) !== JSON.stringify(saved[k])
      ) {
        set.add(k);
      }
    }
    return set;
  }, [content]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoggingIn(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setLoginError("Inloggen mislukt — controleer e-mail en wachtwoord.");
    setLoggingIn(false);
  };

  const saveActive = async () => {
    if (!content) return;
    setSaving(true);
    const { error } = await supabase.from("site_content").upsert({
      key: active,
      value: content[active],
      updated_at: new Date().toISOString(),
    });
    if (error) {
      setToast({ ok: false, msg: "Opslaan mislukt: " + error.message });
    } else {
      await revalidateSite();
      const saved = JSON.parse(savedSnapshot.current);
      saved[active] = content[active];
      savedSnapshot.current = JSON.stringify(saved);
      setContent({ ...content });
      setToast({ ok: true, msg: "Opgeslagen — wijzigingen staan live." });
    }
    setSaving(false);
  };

  if (!authChecked) return null;

  /* ─────────────── Login ─────────────── */
  if (!session) {
    return (
      <main
        className="flex min-h-screen bg-[#FDF9EF]"
        style={{ fontFamily: "Quicksand, sans-serif" }}
      >
        <style>{`
          @keyframes loginFloat {
            0%, 100% { transform: translateY(0) rotate(var(--tilt, 0deg)); }
            50% { transform: translateY(-12px) rotate(var(--tilt, 0deg)); }
          }
          @keyframes loginPop {
            from { opacity: 0; transform: translateY(18px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes loginGlow {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 0.85; }
          }
          .login-pop { animation: loginPop 0.55s cubic-bezier(0.22, 1, 0.36, 1) both; }
          @media (prefers-reduced-motion: reduce) {
            .login-pop { animation: none !important; }
            .login-anim { animation: none !important; }
          }
        `}</style>

        {/* Left — brand showcase */}
        <section className="relative hidden w-1/2 overflow-hidden lg:flex lg:flex-col lg:justify-between bg-gradient-to-br from-[#FFCA58] via-[#FFD474] to-[#FFDB8D] p-10">
          <img
            src="/assets/branding/yellow-glow.png"
            alt=""
            aria-hidden
            className="login-anim pointer-events-none absolute left-1/2 top-1/2 w-[130%] max-w-none -translate-x-1/2 -translate-y-1/2 select-none"
            style={{ animation: "loginGlow 5s ease-in-out infinite" }}
          />
          <img src="/assets/aanbod/politiepet.png" alt="" aria-hidden className="login-anim pointer-events-none absolute left-8 top-24 w-28 opacity-75 select-none" style={{ animation: "loginFloat 4.2s ease-in-out infinite", "--tilt": "-6deg" } as React.CSSProperties} />
          <img src="/assets/aanbod/vuur.png" alt="" aria-hidden className="login-anim pointer-events-none absolute right-10 top-1/3 w-24 opacity-70 select-none" style={{ animation: "loginFloat 3.7s ease-in-out 0.5s infinite", "--tilt": "5deg" } as React.CSSProperties} />
          <img src="/assets/aanbod/kuiken.png" alt="" aria-hidden className="login-anim pointer-events-none absolute bottom-24 left-12 w-24 opacity-75 select-none" style={{ animation: "loginFloat 4.6s ease-in-out 0.9s infinite", "--tilt": "7deg" } as React.CSSProperties} />
          <img src="/assets/aanbod/molen.png" alt="" aria-hidden className="login-anim pointer-events-none absolute bottom-16 right-8 w-28 opacity-70 select-none" style={{ animation: "loginFloat 4s ease-in-out 1.3s infinite", "--tilt": "-5deg" } as React.CSSProperties} />

          <div className="relative">
            <span className="inline-flex rounded-full bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#5763FF] backdrop-blur">
              Tekstbeheer
            </span>
          </div>

          <div className="relative flex flex-col items-center text-center">
            <img
              src="/assets/branding/logo-footer.png"
              alt="Minimasters Playground"
              className="login-anim w-80 xl:w-96 drop-shadow-lg"
              style={{ animation: "loginFloat 5s ease-in-out infinite" }}
            />
            <p className="mt-6 max-w-sm text-lg font-bold text-white drop-shadow-sm xl:text-xl">
              Tiny Heroes, Big Adventures
            </p>
            <p className="mt-1 max-w-sm text-sm font-semibold text-white/85">
              Beheer alle teksten van de website — wijzigingen staan direct
              live.
            </p>

            <div className="mt-10 flex items-end justify-center">
              <img
                src="/assets/slider/kinderfeestje.jpg"
                alt=""
                aria-hidden
                className="login-anim h-40 w-32 -rotate-6 rounded-2xl border-4 border-white object-cover shadow-xl xl:h-48 xl:w-36"
                style={{ animation: "loginFloat 5.4s ease-in-out 0.3s infinite" }}
              />
              <img
                src="/assets/slider/entreeticket.webp"
                alt=""
                aria-hidden
                className="login-anim z-10 -mx-3 h-48 w-36 rounded-2xl border-4 border-white object-cover shadow-2xl xl:h-56 xl:w-44"
                style={{ animation: "loginFloat 4.8s ease-in-out infinite" }}
              />
              <img
                src="/assets/slider/scholen-bso.jpg"
                alt=""
                aria-hidden
                className="login-anim h-40 w-32 rotate-6 rounded-2xl border-4 border-white object-cover shadow-xl xl:h-48 xl:w-36"
                style={{ animation: "loginFloat 5.1s ease-in-out 0.6s infinite" }}
              />
            </div>
          </div>

          <div className="relative flex items-center gap-2 text-xs font-bold text-white/80">
            <span className="inline-block h-2 w-2 rounded-full bg-[#67CD8A]" />
            minimastersplayground.nl
          </div>
        </section>

        {/* Right — form */}
        <section className="relative flex w-full items-center justify-center px-5 py-12 lg:w-1/2">
          <div className="w-full max-w-sm">
            <img
              src="/assets/branding/logo-navbar.svg"
              alt="Minimasters Playground"
              className="login-pop mx-auto mb-8 w-44 lg:hidden"
            />
            <div className="login-pop" style={{ animationDelay: "0.05s" }}>
              <h1 className="text-2xl font-bold text-slate-800 xl:text-3xl">
                Welkom terug!
              </h1>
              <p className="mt-1.5 text-[15px] text-slate-500">
                Log in om de websiteteksten aan te passen.
              </p>
              <ul className="mt-5 space-y-2.5">
                {[
                  "Wijzigingen staan direct live",
                  "Geen technische kennis nodig",
                  "Veilig ingelogd via je eigen account",
                ].map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2.5 text-sm font-semibold text-slate-600"
                  >
                    <CheckCircle2 className="h-[18px] w-[18px] shrink-0 text-[#67CD8A]" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <form onSubmit={login} className="mt-8 space-y-5">
              <label className="login-pop block" style={{ animationDelay: "0.12s" }}>
                <span className="mb-1.5 block text-[13px] font-bold uppercase tracking-wide text-slate-500">
                  E-mailadres
                </span>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#67CD8A]" />
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="naam@voorbeeld.nl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputCls + " pl-11"}
                  />
                </div>
              </label>
              <label className="login-pop block" style={{ animationDelay: "0.19s" }}>
                <span className="mb-1.5 block text-[13px] font-bold uppercase tracking-wide text-slate-500">
                  Wachtwoord
                </span>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#67CD8A]" />
                  <input
                    type="password"
                    required
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputCls + " pl-11"}
                  />
                </div>
              </label>

              {loginError && (
                <p
                  role="alert"
                  className="flex items-center gap-2 rounded-xl bg-[#FF5757]/10 px-3 py-2.5 text-sm font-semibold text-[#d63c3c]"
                >
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {loginError}
                </p>
              )}

              <button
                type="submit"
                disabled={loggingIn}
                className="login-pop group flex w-full cursor-pointer items-center justify-center gap-2 rounded-full py-3.5 font-bold text-white shadow-lg shadow-[#67CD8A]/30 transition-all duration-200 hover:shadow-xl hover:shadow-[#67CD8A]/40 hover:brightness-105 disabled:opacity-60"
                style={{
                  animationDelay: "0.26s",
                  background:
                    "linear-gradient(135deg, #A5DEB9 0%, #67CD8A 100%)",
                }}
              >
                {loggingIn ? "Bezig…" : "Inloggen"}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </form>

            <p
              className="login-pop mt-8 text-center text-xs text-slate-400"
              style={{ animationDelay: "0.33s" }}
            >
              Alleen voor beheerders van Minimasters Playground
            </p>
          </div>
        </section>
      </main>
    );
  }

  /* ─────────────── Dashboard ─────────────── */
  const activeSection = SECTIONS.find((s) => s.key === active)!;

  return (
    <div
      className="flex min-h-screen bg-[#F8F5E3]"
      style={{ fontFamily: "Quicksand, sans-serif" }}
    >
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-[#EEE5CF] bg-white lg:flex">
        <div className="border-b border-[#EEE5CF] px-6 py-5">
          <img
            src="/assets/branding/logo-navbar.svg"
            alt="Minimasters Playground"
            className="w-36"
          />
          <p className="mt-1 text-xs font-bold uppercase tracking-widest text-slate-400">
            Tekstbeheer
          </p>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {SECTIONS.map(({ key, label, hint, icon: Icon }) => {
            const isActive = active === key;
            const dirty = dirtyKeys.has(key);
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActive(key)}
                aria-current={isActive ? "page" : undefined}
                className={`group flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5763FF]/40 ${
                  isActive
                    ? "bg-[#5763FF] text-white shadow-md shadow-[#5763FF]/20"
                    : "text-slate-600 hover:bg-[#F8F5E3]"
                }`}
              >
                <Icon
                  className={`h-5 w-5 shrink-0 ${
                    isActive ? "text-white" : "text-[#67CD8A]"
                  }`}
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold">
                    {label}
                  </span>
                  <span
                    className={`block truncate text-xs ${
                      isActive ? "text-white/70" : "text-slate-400"
                    }`}
                  >
                    {hint}
                  </span>
                </span>
                {dirty && (
                  <span
                    title="Niet opgeslagen"
                    className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                      isActive ? "bg-[#FFCA58]" : "bg-[#FFCA58]"
                    }`}
                  />
                )}
              </button>
            );
          })}
        </nav>
        <div className="space-y-1 border-t border-[#EEE5CF] px-3 py-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-600 transition-colors duration-200 hover:bg-[#F8F5E3] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5763FF]/40"
          >
            <ExternalLink className="h-5 w-5 text-[#67CD8A]" />
            Bekijk website
          </a>
          <button
            type="button"
            onClick={() => supabase.auth.signOut()}
            className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-bold text-slate-600 transition-colors duration-200 hover:bg-[#FF5757]/10 hover:text-[#FF5757] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5757]/40"
          >
            <LogOut className="h-5 w-5" />
            Uitloggen
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="min-w-0 flex-1">
        {/* Topbar */}
        <header className="sticky top-0 z-20 border-b border-[#EEE5CF] bg-white/90 backdrop-blur">
          <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileNavOpen(!mobileNavOpen)}
                aria-label="Secties"
                aria-expanded={mobileNavOpen}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-[#EEE5CF] text-slate-600 lg:hidden"
              >
                <LayoutGrid className="h-5 w-5" />
              </button>
              <div className="min-w-0">
                <h1 className="truncate text-lg font-bold text-slate-800">
                  {activeSection.label}
                </h1>
                <p className="hidden truncate text-xs text-slate-400 sm:block">
                  {activeSection.hint}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden cursor-pointer items-center gap-2 rounded-full border border-[#EEE5CF] px-4 py-2 text-sm font-bold text-slate-600 transition-colors duration-200 hover:border-[#67CD8A] hover:text-[#3fa060] sm:inline-flex lg:hidden"
              >
                <ExternalLink className="h-4 w-4" />
                Site
              </a>
              <button
                type="button"
                onClick={saveActive}
                disabled={saving || !dirtyKeys.has(active)}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white shadow-md transition-opacity duration-200 hover:opacity-90 disabled:cursor-default disabled:opacity-40"
                style={{
                  background:
                    "linear-gradient(135deg, #A5DEB9 0%, #67CD8A 100%)",
                }}
              >
                <Save className="h-4 w-4" />
                {saving ? "Opslaan…" : "Opslaan"}
              </button>
            </div>
          </div>

          {/* Mobile section picker */}
          {mobileNavOpen && (
            <nav className="grid grid-cols-2 gap-2 border-t border-[#EEE5CF] bg-white px-4 py-3 sm:grid-cols-3 lg:hidden">
              {SECTIONS.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setActive(key);
                    setMobileNavOpen(false);
                  }}
                  className={`flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-bold transition-colors duration-200 ${
                    active === key
                      ? "bg-[#5763FF] text-white"
                      : "bg-[#F8F5E3] text-slate-600"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{label}</span>
                  {dirtyKeys.has(key) && (
                    <span className="ml-auto h-2 w-2 shrink-0 rounded-full bg-[#FFCA58]" />
                  )}
                </button>
              ))}
              <button
                type="button"
                onClick={() => supabase.auth.signOut()}
                className="flex cursor-pointer items-center gap-2 rounded-xl bg-[#FF5757]/10 px-3 py-2.5 text-left text-sm font-bold text-[#FF5757]"
              >
                <LogOut className="h-4 w-4" /> Uitloggen
              </button>
            </nav>
          )}
        </header>

        {/* Editor */}
        <main className="mx-auto max-w-3xl px-4 py-8 sm:px-8">
          {!content ? (
            <div className="space-y-4" aria-busy="true">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-24 animate-pulse rounded-2xl bg-white/70"
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-[#EEE5CF] bg-white p-5 shadow-sm sm:p-7">
              <FieldEditor
                fieldKey={active}
                value={content[active]}
                onChange={(v) =>
                  setContent({ ...content, [active]: v } as SiteContent)
                }
              />
              <div className="mt-8 flex items-center justify-between border-t border-[#EEE5CF] pt-5">
                <p className="text-xs text-slate-400">
                  {dirtyKeys.has(active)
                    ? "Niet-opgeslagen wijzigingen"
                    : "Alles opgeslagen"}
                </p>
                <button
                  type="button"
                  onClick={saveActive}
                  disabled={saving || !dirtyKeys.has(active)}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold text-white shadow-md transition-opacity duration-200 hover:opacity-90 disabled:cursor-default disabled:opacity-40"
                  style={{
                    background:
                      "linear-gradient(135deg, #A5DEB9 0%, #67CD8A 100%)",
                  }}
                >
                  <Save className="h-4 w-4" />
                  {saving ? "Opslaan…" : "Opslaan"}
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Toast */}
      {toast && (
        <div
          role="status"
          className={`fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-white shadow-xl ${
            toast.ok ? "bg-[#3fa060]" : "bg-[#d63c3c]"
          }`}
        >
          {toast.ok ? (
            <CheckCircle2 className="h-5 w-5" />
          ) : (
            <AlertCircle className="h-5 w-5" />
          )}
          {toast.msg}
        </div>
      )}
    </div>
  );
}

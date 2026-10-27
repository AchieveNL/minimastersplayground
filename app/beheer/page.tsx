"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
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
  X,
  ZoomIn,
  Plus,
  Save,
  Upload,
  Images,
  CheckCircle2,
  AlertCircle,
  Lock,
  ArrowRight,
  Shield,
  FileText,
  Scale,
  Loader,
  Cake,
  PartyPopper,
  School,
  Power,
  Eye,
  Rocket,
  Undo2,
  ChevronUp,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import { createClient } from "../../lib/supabase/client";
import { contentDefaults, type SiteContent } from "../../content/defaults";
import {
  IMAGE_SLOTS,
  MAX_SOURCE_MB,
  deleteSiteImage,
  isStoredImage,
  listSiteImages,
  uploadSiteImage,
} from "../../lib/image-upload";
import { publishDrafts } from "./actions";
import { fillMissing } from "../../lib/fill-defaults";

type SectionKey = keyof SiteContent;

const SECTIONS: {
  key: SectionKey;
  label: string;
  hint: string;
  icon: LucideIcon;
}[] = [
  { key: "gesloten", label: "Website gesloten", hint: "Sluit de site met één knop", icon: Power },
  { key: "banner", label: "Notificatiebalk", hint: "Groene balk bovenaan", icon: Megaphone },
  { key: "hero", label: "Infokaarten", hint: "Homepage introductie", icon: LayoutGrid },
  { key: "slider", label: "Aanbod", hint: "Kaarten op homepage", icon: Ticket },
  { key: "fotostrook", label: "Fotostrook", hint: "Bewegende foto's", icon: Images },
  { key: "tijdsloten", label: "Tijdsloten & Loyalty", hint: "Telefoons sectie", icon: Clock },
  { key: "openingstijden", label: "Openingstijden", hint: "Tijden per dag", icon: Star },
  { key: "parkeren", label: "Parkeren", hint: "Parkeer tip blok", icon: Car },
  { key: "faq", label: "Veelgestelde vragen", hint: "Vragen & antwoorden", icon: HelpCircle },
  { key: "footer", label: "Footer & reviews", hint: "Nieuwsbrief, reviews, adres", icon: Mail },
  { key: "popup", label: "Nieuwsbrief popup", hint: "Popup na 5 seconden", icon: MessageSquare },
  { key: "kaartVerjaardag", label: "Aanbod — Verjaardag", hint: "Kaart en knop op /ons-aanbod", icon: Cake },
  { key: "kaartPrive", label: "Aanbod — Privé feestje", hint: "Kaart en knop op /ons-aanbod", icon: PartyPopper },
  { key: "kaartSchoolreisje", label: "Aanbod — Schoolreisje", hint: "Kaart en knop op /ons-aanbod", icon: School },
  { key: "laadscherm", label: "Laadscherm", hint: "Logo en gloed bij opstarten", icon: Loader },
  { key: "privacy", label: "Privacyverklaring", hint: "Pagina /privacy", icon: Shield },
  { key: "voorwaarden", label: "Algemene voorwaarden", hint: "Pagina /algemene-voorwaarden", icon: Scale },
  { key: "disclaimer", label: "Disclaimer", hint: "Pagina /disclaimer", icon: FileText },
];

const FIELD_LABELS: Record<string, string> = {
  text: "Tekst",
  title: "Titel",
  titel: "Titel",
  description: "Beschrijving",
  infocards: "Infokaart",
  cards: "Kaart",
  afbeelding: "Afbeelding",
  afbeeldingen: "Foto",
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
  ondertitel: "Ondertitel",
  intro: "Inleiding",
  infoblokTitel: "Infoblok titel",
  infoblokTekst: "Infoblok tekst",
  secties: "Artikel",
  link: "Link van de BOEK NU knop",
  notitie: "Tekst boven de knop (leeg = verbergen)",
  logo: "Logo",
  gloedKern: "Gloed — kern (midden)",
  gloedRand: "Gloed — rand (buitenkant)",
  achtergrondBasis: "Achtergrond (buitenrand)",
  kleur: "Hoofdkleur (titel, vraag en geopende vraag)",
  achtergrond: "Achtergrond dichte vraag",
  tekstOpen: "Tekstkleur geopende vraag",
  aan: "Website gesloten",
  contactTitel: "Contactblok titel",
  contactTekst: "Contactblok tekst",
  email: "E-mailadres (leeg = verbergen)",
};

const labelFor = (key: string) => FIELD_LABELS[key] ?? key;

function emptyLike(item: unknown): unknown {
  if (typeof item === "string") return HEX_COLOR.test(item) ? item : "";
  if (typeof item === "boolean") return false;
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

const HEX_COLOR = /^#[0-9a-fA-F]{6}$/;
/** Colour fields stay colour pickers while a half-typed hex is invalid. */
const COLOR_FIELDS = new Set([
  "gloedKern",
  "gloedRand",
  "achtergrondBasis",
  "kleur",
  "achtergrond",
  "tekstOpen",
]);
const IMAGE_PATH = /^(\/|https?:).*\.(webp|jpe?g|png|svg|gif|avif)$/i;

/**
 * The images a section ships with. They seed the picker so there is something
 * to choose from before anything has been uploaded, and they double as a way
 * back to the original artwork.
 */
function bundledImages(section: string): string[] {
  const found: string[] = [];
  const walk = (node: unknown) => {
    if (typeof node === "string") {
      if (IMAGE_PATH.test(node)) found.push(node);
    } else if (Array.isArray(node)) {
      node.forEach(walk);
    } else if (node && typeof node === "object") {
      Object.values(node).forEach(walk);
    }
  };
  walk((contentDefaults as Record<string, unknown>)[section]);
  return found;
}

function ColorField({
  value,
  onChange,
  fieldKey,
}: {
  value: string;
  onChange: (v: string) => void;
  fieldKey: string;
}) {
  return (
    <div>
      <span className="mb-1.5 block text-[13px] font-bold uppercase tracking-wide text-slate-500">
        {labelFor(fieldKey)}
      </span>
      <div className="flex items-center gap-3 rounded-2xl border border-[#E8E0C8] bg-white p-3">
        <input
          type="color"
          value={HEX_COLOR.test(value) ? value : "#000000"}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          className="h-12 w-16 shrink-0 cursor-pointer rounded-lg border border-[#E8E0C8] bg-white p-1"
        />
        <input
          type="text"
          value={value}
          spellCheck={false}
          onChange={(e) => {
            const next = e.target.value.toUpperCase();
            // Let her type freely; only valid hex reaches the site.
            if (/^#[0-9A-F]{0,6}$/.test(next)) onChange(next);
          }}
          className={inputCls + " font-mono uppercase"}
        />
      </div>
    </div>
  );
}

const ZOOM_MS = 260;

/**
 * Full-size preview. Fades the backdrop in and scales the photo up from
 * slightly smaller; closing plays the same in reverse before unmounting.
 * Closes on Escape, the close button or a backdrop click.
 */
function ImageZoom({ src, onClose }: { src: string; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [shown, setShown] = useState(false);
  const closing = useRef(false);

  const close = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    setShown(false);
    window.setTimeout(onClose, ZOOM_MS);
  }, [onClose]);

  useEffect(() => {
    // Next frame, so the browser paints the start state before animating.
    const frame = requestAnimationFrame(() => setShown(true));
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [close]);

  // Portalled so no transformed ancestor can trap the fixed overlay.
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Afbeelding vergroot"
      onClick={close}
      style={{ transitionDuration: `${ZOOM_MS}ms` }}
      className={
        "fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/75 p-4 backdrop-blur-sm transition-opacity ease-out motion-reduce:transition-none sm:p-8 " +
        (shown ? "opacity-100" : "opacity-0")
      }
    >
      <button
        ref={closeRef}
        type="button"
        aria-label="Sluiten"
        onClick={close}
        className="absolute right-4 top-4 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white text-slate-700 shadow-lg transition-colors duration-200 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5763FF]"
      >
        <X className="h-5 w-5" />
      </button>
      <img
        src={src}
        alt=""
        onClick={(e) => e.stopPropagation()}
        style={{
          transitionDuration: `${ZOOM_MS}ms`,
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        className={
          "max-h-full max-w-full rounded-2xl bg-white object-contain shadow-2xl transition-[opacity,transform] motion-reduce:transition-none " +
          (shown ? "scale-100 opacity-100" : "scale-90 opacity-0")
        }
      />
    </div>,
    document.body,
  );
}

function ImageField({
  value,
  onChange,
  section,
  fieldKey = "afbeelding",
}: {
  value: string;
  onChange: (v: string) => void;
  section: string;
  fieldKey?: string;
}) {
  const supabase = useMemo(() => createClient(), []);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [note, setNote] = useState("");
  const [library, setLibrary] = useState<string[]>([]);
  const [zoom, setZoom] = useState<string | null>(null);
  const closeZoom = useCallback(() => setZoom(null), []);
  const slot = IMAGE_SLOTS[section];

  const [libraryTick, setLibraryTick] = useState(0);
  const refreshLibrary = useCallback(() => setLibraryTick((n) => n + 1), []);

  useEffect(() => {
    let alive = true;
    listSiteImages(supabase, section).then((stored) => {
      // Switching sections mid-request must not overwrite the newer list.
      if (alive) setLibrary([...new Set([...stored, ...bundledImages(section)])]);
    });
    return () => {
      alive = false;
    };
  }, [supabase, section, libraryTick]);

  const handleFile = async (file?: File | null) => {
    if (!file) return;
    setError("");
    setNote("");
    setBusy(true);
    try {
      const { url, sizeKb, ratio } = await uploadSiteImage(
        supabase,
        file,
        section,
      );
      onChange(url);
      refreshLibrary();
      // ratio is 0 for SVG uploads, which have no fixed aspect to check.
      const off =
        ratio && slot && Math.abs(ratio - slot.ratio) / slot.ratio > 0.12
          ? " Let op: de verhouding wijkt af, de randen worden bijgesneden."
          : "";
      setNote(`Geüpload (${sizeKb} KB).${off} Vergeet niet op te slaan.`);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Uploaden mislukt, probeer opnieuw.",
      );
    }
    setBusy(false);
  };

  return (
    <div>
      <span className="mb-1.5 block text-[13px] font-bold uppercase tracking-wide text-slate-500">
        {labelFor(fieldKey)}
      </span>
      <div className="flex items-start gap-4 rounded-2xl border border-[#E8E0C8] bg-white p-3">
        <button
          type="button"
          aria-label="Afbeelding vergroten"
          title="Klik om te vergroten"
          onClick={() => setZoom(value)}
          className="group relative h-24 w-24 shrink-0 cursor-zoom-in overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5763FF]"
        >
          <img
            src={value}
            alt=""
            className={
              "h-full w-full " +
              (fieldKey === "logo"
                ? "bg-[#FFCA58] object-contain p-1.5"
                : "object-cover")
            }
          />
          <span className="absolute inset-0 flex items-center justify-center bg-slate-900/0 text-white opacity-0 transition-all duration-200 group-hover:bg-slate-900/35 group-hover:opacity-100">
            <ZoomIn className="h-6 w-6" />
          </span>
        </button>
        <div className="min-w-0 flex-1">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#5763FF] px-4 py-2 text-sm font-bold text-white transition-opacity duration-200 hover:opacity-90">
            <Upload className="h-4 w-4" />
            {busy ? "Bezig…" : "Vervang afbeelding"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={busy}
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
          </label>
          <p className="mt-2 text-xs text-slate-500">
            {slot && (
              <>
                Aanbevolen: <b>{slot.hint}</b>.{" "}
              </>
            )}
            Maximaal <b>{MAX_SOURCE_MB} MB</b> per foto — grotere bestanden
            worden geweigerd, kleinere worden automatisch verkleind.
          </p>
          {note && (
            <p className="mt-1.5 text-xs font-semibold text-[#3fa060]">
              {note}
            </p>
          )}
          {error && (
            <p className="mt-1.5 text-xs font-semibold text-[#d63c3c]">
              {error}
            </p>
          )}
        </div>
      </div>

      {library.length > 0 && (
        <div className="mt-3 rounded-2xl border border-[#E8E0C8] bg-white p-3">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">
            Eerder gebruikt — klik om te kiezen
          </p>
          <div className="flex flex-wrap gap-2">
            {library.map((url) => {
              const active = url === value;
              return (
                <div key={url} className="group relative">
                  <button
                    type="button"
                    title={active ? "Huidige afbeelding" : "Kies deze"}
                    onClick={() => {
                      onChange(url);
                      setError("");
                      setNote("Gekozen. Vergeet niet op te slaan.");
                    }}
                    className={
                      "block h-16 w-16 cursor-pointer overflow-hidden rounded-xl border-2 transition-colors duration-200 " +
                      (active
                        ? "border-[#5763FF]"
                        : "border-transparent hover:border-[#5763FF]/40")
                    }
                  >
                    <img
                      src={url}
                      alt=""
                      className={
                        "h-full w-full " +
                        (fieldKey === "logo"
                          ? "bg-[#FFCA58] object-contain p-1"
                          : "object-cover")
                      }
                    />
                  </button>
                  {!active && isStoredImage(url) && (
                    <button
                      type="button"
                      aria-label="Afbeelding verwijderen"
                      onClick={async () => {
                        if (!confirm("Deze afbeelding definitief verwijderen?"))
                          return;
                        try {
                          await deleteSiteImage(supabase, url);
                          refreshLibrary();
                        } catch {
                          setError("Verwijderen mislukt, probeer opnieuw.");
                        }
                      }}
                      className="absolute -right-1.5 -top-1.5 hidden h-6 w-6 items-center justify-center rounded-full bg-[#FF5757] text-white shadow group-hover:flex"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  )}
                  <button
                    type="button"
                    aria-label="Afbeelding vergroten"
                    onClick={() => setZoom(url)}
                    className="absolute -bottom-1.5 -left-1.5 hidden h-6 w-6 cursor-zoom-in items-center justify-center rounded-full bg-[#5763FF] text-white shadow group-hover:flex group-focus-within:flex"
                  >
                    <ZoomIn className="h-3 w-3" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {zoom && <ImageZoom src={zoom} onClose={closeZoom} />}
    </div>
  );
}

/**
 * Lets a FAQ question move to another category. The categories list provides
 * it per category, so the questions list inside knows where it lives.
 */
const MoveTargetContext = createContext<{
  titles: string[];
  current: number;
  moveTo: (itemIndex: number, target: number) => void;
} | null>(null);

const iconBtnCls =
  "inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition-colors duration-200 hover:bg-[#5763FF]/10 hover:text-[#5763FF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5763FF]/40 disabled:cursor-default disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400";

function move<T>(list: T[], from: number, to: number): T[] {
  const next = [...list];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

function FieldEditor({
  value,
  onChange,
  fieldKey,
  section,
}: {
  value: unknown;
  onChange: (v: unknown) => void;
  fieldKey: string;
  section: string;
}) {
  const moveTarget = useContext(MoveTargetContext);
  if (
    (fieldKey === "afbeelding" || fieldKey === "logo") &&
    typeof value === "string"
  ) {
    return (
      <ImageField
        value={value}
        section={section}
        fieldKey={fieldKey}
        onChange={(v) => onChange(v)}
      />
    );
  }

  if (typeof value === "boolean") {
    return (
      <div
        className={`flex items-center justify-between gap-4 rounded-2xl border-2 p-4 transition-colors duration-200 ${
          value
            ? "border-[#FF5757]/40 bg-[#FF5757]/5"
            : "border-[#E8E0C8] bg-[#FDFAF1]"
        }`}
      >
        <div>
          <span className="block text-[15px] font-bold text-slate-800">
            {labelFor(fieldKey)}
          </span>
          <span className="mt-0.5 block text-sm text-slate-500">
            {value
              ? "AAN — bezoekers zien alleen deze pagina (na opslaan)."
              : "UIT — de website is gewoon bereikbaar."}
          </span>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={value}
          aria-label={labelFor(fieldKey)}
          onClick={() => onChange(!value)}
          className={`relative h-8 w-14 shrink-0 cursor-pointer rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5763FF]/40 ${
            value ? "bg-[#FF5757]" : "bg-slate-300"
          }`}
        >
          <span
            className={`absolute top-1 left-1 h-6 w-6 rounded-full bg-white shadow transition-transform duration-200 ${
              value ? "translate-x-6" : ""
            }`}
          />
        </button>
      </div>
    );
  }

  if (
    typeof value === "string" &&
    (COLOR_FIELDS.has(fieldKey) || HEX_COLOR.test(value))
  ) {
    return <ColorField value={value} fieldKey={fieldKey} onChange={onChange} />;
  }

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
            rows={Math.min(20, Math.max(2, Math.ceil(value.length / 70)))}
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
    const label = labelFor(fieldKey);
    const isFaqCategories = section === "faq" && fieldKey === "categorieen";
    const isFaqQuestions = section === "faq" && fieldKey === "items";
    return (
      <div>
        <div className="space-y-4">
          {value.map((item, i) => {
            const editor = (
              <FieldEditor
                value={item}
                fieldKey={fieldKey}
                section={section}
                onChange={(v) =>
                  onChange(value.map((x, j) => (j === i ? v : x)))
                }
              />
            );
            return (
              <div
                key={i}
                className="rounded-2xl border border-[#E8E0C8] bg-[#FDFAF1] p-4"
              >
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#5763FF]/10 px-3 py-1 text-xs font-bold text-[#5763FF]">
                    {label} {i + 1}
                  </span>
                  <div className="flex items-center gap-1">
                    {isFaqQuestions && moveTarget && moveTarget.titles.length > 1 && (
                      <select
                        aria-label={`${label} ${i + 1} verplaatsen naar categorie`}
                        value=""
                        onChange={(e) => moveTarget.moveTo(i, Number(e.target.value))}
                        className="mr-1 h-9 max-w-[11rem] cursor-pointer rounded-lg border border-[#E8E0C8] bg-white px-2 text-xs font-bold text-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5763FF]/40"
                      >
                        <option value="" disabled>
                          Verplaats naar…
                        </option>
                        {moveTarget.titles.map((t, ci) =>
                          ci === moveTarget.current ? null : (
                            <option key={ci} value={ci}>
                              {t || `Categorie ${ci + 1}`}
                            </option>
                          ),
                        )}
                      </select>
                    )}
                    <button
                      type="button"
                      aria-label={`${label} ${i + 1} omhoog`}
                      disabled={i === 0}
                      onClick={() => onChange(move(value, i, i - 1))}
                      className={iconBtnCls}
                    >
                      <ChevronUp className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      aria-label={`${label} ${i + 1} omlaag`}
                      disabled={i === value.length - 1}
                      onClick={() => onChange(move(value, i, i + 1))}
                      className={iconBtnCls}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      aria-label={`${label} ${i + 1} verwijderen`}
                      onClick={() => {
                        if (
                          typeof item === "string" ||
                          window.confirm(`${label} ${i + 1} verwijderen?`)
                        ) {
                          onChange(value.filter((_, j) => j !== i));
                        }
                      }}
                      className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition-colors duration-200 hover:bg-[#FF5757]/10 hover:text-[#FF5757] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5757]/40"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                {isFaqCategories ? (
                  <MoveTargetContext.Provider
                    value={{
                      titles: value.map((c) => (c as { titel?: string }).titel ?? ""),
                      current: i,
                      moveTo: (itemIndex, target) => {
                        type Cat = { items: unknown[] };
                        const cats = value as Cat[];
                        const moved = cats[i].items[itemIndex];
                        onChange(
                          cats.map((c, ci) =>
                            ci === i
                              ? { ...c, items: c.items.filter((_, j) => j !== itemIndex) }
                              : ci === target
                                ? { ...c, items: [...c.items, moved] }
                                : c,
                          ),
                        );
                      },
                    }}
                  >
                    {editor}
                  </MoveTargetContext.Provider>
                ) : (
                  editor
                )}
              </div>
            );
          })}
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
            section={section}
            value={v}
            onChange={(nv) => onChange({ ...(value as object), [k]: nv })}
          />
        ))}
      </div>
    );
  }

  return null;
}

/** Sections whose content differs between two versions. */
function differingKeys(a: SiteContent | null, b: SiteContent | null) {
  const set = new Set<string>();
  if (!a || !b) return set;
  for (const k of Object.keys(a)) {
    const key = k as SectionKey;
    if (JSON.stringify(a[key]) !== JSON.stringify(b[key])) set.add(k);
  }
  return set;
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
  // What visitors see now, and that plus the saved concepts. `content` is the
  // editor's working copy on top of `saved`.
  const [live, setLive] = useState<SiteContent | null>(null);
  const [saved, setSaved] = useState<SiteContent | null>(null);
  const [active, setActive] = useState<SectionKey>("banner");
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [toast, setToast] = useState<{ ok: boolean; msg: string } | null>(null);
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

  const loadContent = useCallback(async () => {
    const [liveRows, draftRows] = await Promise.all([
      supabase.from("site_content").select("key, value"),
      supabase.from("site_content_draft").select("key, value"),
    ]);
    const apply = (target: SiteContent, rows: { key: string; value: unknown }[] | null) => {
      for (const row of rows ?? []) {
        if (row.key in target && row.value) {
          (target as Record<string, unknown>)[row.key] = fillMissing(
            row.value,
            (contentDefaults as Record<string, unknown>)[row.key],
          );
        }
      }
    };
    const nextLive = structuredClone(contentDefaults) as SiteContent;
    apply(nextLive, liveRows.data);
    const nextSaved = structuredClone(nextLive);
    apply(nextSaved, draftRows.data);
    return { nextLive, nextSaved };
  }, [supabase]);

  useEffect(() => {
    if (!session) return;
    loadContent().then(({ nextLive, nextSaved }) => {
      setLive(nextLive);
      setSaved(nextSaved);
      setContent(structuredClone(nextSaved));
    });
  }, [session, loadContent]);

  // Re-reads the DB after a publish, or when she comes back from the preview
  // tab (which can publish too). Unsaved edits are never overwritten: then
  // only the live state refreshes, which is all a publish changes. A load that
  // started before a local save finished is stale and is dropped.
  const hasUnsaved = useRef(false);
  const saveCount = useRef(0);
  const refresh = useCallback(async () => {
    const started = saveCount.current;
    const { nextLive, nextSaved } = await loadContent();
    if (started !== saveCount.current) return;
    setLive(nextLive);
    if (hasUnsaved.current) return;
    setSaved(nextSaved);
    setContent(structuredClone(nextSaved));
  }, [loadContent]);

  useEffect(() => {
    if (!session) return;
    window.addEventListener("focus", refresh);
    return () => window.removeEventListener("focus", refresh);
  }, [session, refresh]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  /** Edited here but not saved as a concept yet. */
  const dirtyKeys = useMemo(() => differingKeys(content, saved), [content, saved]);
  /** Saved as a concept but not live yet. */
  const conceptKeys = useMemo(() => differingKeys(saved, live), [saved, live]);
  useEffect(() => {
    hasUnsaved.current = dirtyKeys.size > 0;
  }, [dirtyKeys]);

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
    if (!content || !saved || !live) return;
    setSaving(true);
    saveCount.current += 1;
    const value = content[active];
    // Saving the live text back is not a concept, so drop the row instead.
    const sameAsLive = JSON.stringify(value) === JSON.stringify(live[active]);
    const { error } = sameAsLive
      ? await supabase.from("site_content_draft").delete().eq("key", active)
      : await supabase.from("site_content_draft").upsert({
          key: active,
          value,
          updated_at: new Date().toISOString(),
        });
    if (error) {
      setToast({ ok: false, msg: "Opslaan mislukt: " + error.message });
    } else {
      setSaved({ ...saved, [active]: structuredClone(value) } as SiteContent);
      setToast({
        ok: true,
        msg: sameAsLive
          ? "Opgeslagen — gelijk aan de live versie."
          : "Concept opgeslagen — nog niet live.",
      });
    }
    setSaving(false);
  };

  const discardActive = async () => {
    if (!content || !saved || !live) return;
    if (!window.confirm("Concept weggooien en terug naar de live versie?")) return;
    const { error } = await supabase
      .from("site_content_draft")
      .delete()
      .eq("key", active);
    if (error) {
      setToast({ ok: false, msg: "Verwijderen mislukt: " + error.message });
      return;
    }
    saveCount.current += 1;
    const liveValue = structuredClone(live[active]);
    setSaved({ ...saved, [active]: liveValue } as SiteContent);
    setContent({ ...content, [active]: structuredClone(liveValue) } as SiteContent);
    setToast({ ok: true, msg: "Concept verwijderd." });
  };

  // Also ends Draft Mode in this browser, so a preview tab left open does not
  // keep a preview cookie without a way to close it.
  const logout = async () => {
    await fetch("/api/preview?actie=uit").catch(() => {});
    await supabase.auth.signOut();
  };

  const openPreview = () => {
    if (
      dirtyKeys.size > 0 &&
      !window.confirm(
        "Je hebt wijzigingen die nog niet als concept zijn opgeslagen. Die zie je niet in het voorbeeld. Toch openen?",
      )
    ) {
      return;
    }
    window.open("/api/preview", "_blank", "noopener");
  };

  const publish = async () => {
    if (!saved) return;
    const n = conceptKeys.size;
    const unsavedNote =
      dirtyKeys.size > 0
        ? "\n\nLet op: wijzigingen die niet als concept zijn opgeslagen gaan niet mee."
        : "";
    if (
      !window.confirm(
        `${n} ${n === 1 ? "onderdeel" : "onderdelen"} live zetten? Bezoekers zien de wijzigingen daarna direct.${unsavedNote}`,
      )
    ) {
      return;
    }
    setPublishing(true);
    const result = await publishDrafts();
    setToast(
      result.ok
        ? { ok: true, msg: "Gepubliceerd — de wijzigingen staan live." }
        : { ok: false, msg: "Publiceren: " + result.error },
    );
    // Whatever was in the DB went live, including concepts from other tabs.
    await refresh();
    setPublishing(false);
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
              Beheer alle teksten van de website — en bekijk ze eerst in een
              voorbeeld voordat ze live gaan.
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
                  "Eerst bekijken, dan pas publiceren",
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
                {dirty ? (
                  <span
                    title="Niet opgeslagen"
                    className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#FFCA58]"
                  />
                ) : conceptKeys.has(key) ? (
                  <span
                    title="Concept — nog niet live"
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-[#5763FF]/10 text-[#5763FF]"
                    }`}
                  >
                    Concept
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>
        <div className="space-y-1 border-t border-[#EEE5CF] px-3 py-4">
          <button
            type="button"
            onClick={openPreview}
            className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-bold text-slate-600 transition-colors duration-200 hover:bg-[#F8F5E3] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5763FF]/40"
          >
            <Eye className="h-5 w-5 text-[#5763FF]" />
            Bekijk voorbeeld
          </button>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-600 transition-colors duration-200 hover:bg-[#F8F5E3] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5763FF]/40"
          >
            <ExternalLink className="h-5 w-5 text-[#67CD8A]" />
            Bekijk live website
          </a>
          <button
            type="button"
            onClick={logout}
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
              <button
                type="button"
                onClick={openPreview}
                aria-label="Bekijk voorbeeld"
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#EEE5CF] px-3 py-2.5 text-sm font-bold text-slate-600 transition-colors duration-200 hover:border-[#5763FF] hover:text-[#5763FF] sm:px-4 lg:hidden"
              >
                <Eye className="h-4 w-4" />
                <span className="hidden sm:inline">Voorbeeld</span>
              </button>
              <button
                type="button"
                onClick={saveActive}
                disabled={saving || publishing || !dirtyKeys.has(active)}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold text-white shadow-md transition-opacity duration-200 hover:opacity-90 disabled:cursor-default disabled:opacity-40 sm:px-5"
                style={{
                  background:
                    "linear-gradient(135deg, #A5DEB9 0%, #67CD8A 100%)",
                }}
              >
                <Save className="h-4 w-4" />
                {saving ? "Opslaan…" : "Opslaan"}
                <span className="hidden sm:inline">als concept</span>
              </button>
              <button
                type="button"
                onClick={publish}
                disabled={publishing || conceptKeys.size === 0}
                aria-label="Publiceren"
                className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#5763FF] px-3 py-2.5 text-sm font-bold text-white shadow-md shadow-[#5763FF]/20 transition-opacity duration-200 hover:opacity-90 disabled:cursor-default disabled:opacity-40 sm:px-5"
              >
                <Rocket className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {publishing ? "Bezig…" : "Publiceren"}
                </span>
                {conceptKeys.size > 0 && (
                  <span className="rounded-full bg-white/25 px-1.5 text-xs">
                    {conceptKeys.size}
                  </span>
                )}
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
                  {dirtyKeys.has(key) ? (
                    <span className="ml-auto h-2 w-2 shrink-0 rounded-full bg-[#FFCA58]" />
                  ) : conceptKeys.has(key) ? (
                    <span
                      className={`ml-auto h-2 w-2 shrink-0 rounded-full ${
                        active === key ? "bg-white" : "bg-[#5763FF]"
                      }`}
                    />
                  ) : null}
                </button>
              ))}
              <button
                type="button"
                onClick={logout}
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
            <>
            {conceptKeys.size > 0 && (
              <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-[#5763FF]/20 bg-[#5763FF]/5 p-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm font-semibold text-slate-700">
                  <b className="text-[#5763FF]">
                    {conceptKeys.size}{" "}
                    {conceptKeys.size === 1 ? "onderdeel" : "onderdelen"}
                  </b>{" "}
                  met wijzigingen die nog niet live staan.
                </p>
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={openPreview}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[#5763FF]/30 bg-white px-4 py-2 text-sm font-bold text-[#5763FF] transition-colors duration-200 hover:border-[#5763FF]"
                  >
                    <Eye className="h-4 w-4" />
                    Bekijk voorbeeld
                  </button>
                  <button
                    type="button"
                    onClick={publish}
                    disabled={publishing}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-[#5763FF] px-4 py-2 text-sm font-bold text-white transition-opacity duration-200 hover:opacity-90 disabled:opacity-60"
                  >
                    <Rocket className="h-4 w-4" />
                    {publishing ? "Bezig…" : "Publiceren"}
                  </button>
                </div>
              </div>
            )}
            <div className="rounded-3xl border border-[#EEE5CF] bg-white p-5 shadow-sm sm:p-7">
              <FieldEditor
                fieldKey={active}
                section={active}
                value={content[active]}
                onChange={(v) =>
                  setContent({ ...content, [active]: v } as SiteContent)
                }
              />
              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[#EEE5CF] pt-5">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <p className="text-xs text-slate-400">
                    {dirtyKeys.has(active)
                      ? "Niet-opgeslagen wijzigingen"
                      : conceptKeys.has(active)
                        ? "Concept opgeslagen — nog niet live"
                        : "Gelijk aan de live website"}
                  </p>
                  {conceptKeys.has(active) && (
                    <button
                      type="button"
                      onClick={discardActive}
                      className="inline-flex cursor-pointer items-center gap-1 text-xs font-bold text-slate-500 underline-offset-2 transition-colors duration-200 hover:text-[#FF5757] hover:underline"
                    >
                      <Undo2 className="h-3.5 w-3.5" />
                      Concept verwijderen
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  onClick={saveActive}
                  disabled={saving || publishing || !dirtyKeys.has(active)}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold text-white shadow-md transition-opacity duration-200 hover:opacity-90 disabled:cursor-default disabled:opacity-40"
                  style={{
                    background:
                      "linear-gradient(135deg, #A5DEB9 0%, #67CD8A 100%)",
                  }}
                >
                  <Save className="h-4 w-4" />
                  {saving ? "Opslaan…" : "Opslaan als concept"}
                </button>
              </div>
            </div>
            </>
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

"use client";

import Link from "next/link";
import Nav from "./Nav";
import Footer from "./Footer";
import SmoothScroll from "./SmoothScroll";

/**
 * Shared shell for /privacy, /disclaimer and /algemene-voorwaarden.
 *
 * The prose lives in content/defaults.ts so the client can edit it from
 * /beheer. Because a textarea cannot express the original JSX, each section
 * body is written in a small markup subset that RichText renders back into
 * the same components the pages used before:
 *
 *   ### Kopje          -> SubSection (indented block with a left border)
 *   - punt             -> BulletList
 *   3.4 tekst          -> NumberedList row (the number is written out, so
 *                         deliberate gaps in the numbering survive edits)
 *   **Term**: uitleg   -> DefinitionList row
 *   **vet** inline     -> bold
 *   blank line         -> new paragraph, single newline -> <br />
 */

export type LegalSection = { titel: string; tekst: string };

const SECTION_COLORS = ["#FF5757", "#5763FF", "#67CD8A", "#BB76FF"];

export default function LegalPage({
  titel,
  ondertitel,
  intro,
  infoblokTitel,
  infoblokTekst,
  secties,
  headerFrom,
  headerTo,
  ondertitelKleur,
  infoblokKleur,
  infoblokTitelKleur,
  kleuren,
}: {
  titel: string;
  ondertitel: string;
  intro?: string;
  infoblokTitel?: string;
  infoblokTekst?: string;
  secties: LegalSection[];
  headerFrom: string;
  headerTo: string;
  ondertitelKleur: string;
  infoblokKleur?: string;
  infoblokTitelKleur?: string;
  /** Accent per section, in order. Sections beyond the list cycle the default. */
  kleuren?: readonly string[];
}) {
  return (
    <>
      <SmoothScroll />
      <Nav />
      <main
        className="min-h-screen px-4 sm:px-8 md:px-16 lg:px-32 py-12 md:py-20 pb-40 md:pb-64"
        style={{ fontFamily: "Quicksand, sans-serif" }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div
              className="inline-block px-8 py-3 rounded-br-4xl rounded-tl-4xl mb-6"
              style={{
                backgroundImage: `linear-gradient(to right, ${headerFrom}, ${headerTo})`,
              }}
            >
              <h1
                className="text-2xl md:text-4xl text-white font-bold"
                style={{ fontFamily: "StudlyFree, sans-serif" }}
              >
                {titel}
              </h1>
            </div>
            <p
              className="font-semibold text-sm md:text-base"
              style={{ color: ondertitelKleur }}
            >
              {ondertitel}
            </p>
          </div>

          {/* Content Card */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-lg border border-white/40">
            {intro ? (
              <div className="mb-8">
                <RichText text={intro} />
              </div>
            ) : null}

            {infoblokTekst ? (
              <div
                className="rounded-2xl p-5 mb-8"
                style={{ backgroundColor: infoblokKleur ?? "rgba(255,202,88,0.2)" }}
              >
                {infoblokTitel ? (
                  <h3
                    className="font-bold text-lg mb-2"
                    style={{ color: infoblokTitelKleur ?? ondertitelKleur }}
                  >
                    {infoblokTitel}
                  </h3>
                ) : null}
                <RichText text={infoblokTekst} />
              </div>
            ) : null}

            {secties.map((sectie, i) => (
              <Section
                key={i}
                color={
                  kleuren?.[i] ?? SECTION_COLORS[i % SECTION_COLORS.length]
                }
                title={sectie.titel}
              >
                <RichText text={sectie.tekst} />
              </Section>
            ))}
          </div>

          {/* Back link */}
          <div className="text-center mt-10">
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-[#FFCA58] to-[#FFDB8D] text-white font-bold px-8 py-3 rounded-full shadow-md hover:scale-105 transition-transform duration-300"
              style={{ fontFamily: "StudlyFree, sans-serif" }}
            >
              TERUG NAAR HOME
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Section({
  color,
  title,
  children,
}: {
  color: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-3 h-3 rounded-full flex-shrink-0"
          style={{ backgroundColor: color }}
        />
        <h2 className="font-bold text-lg md:text-xl" style={{ color }}>
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

function SubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="ml-4 mb-4 pl-4 border-l-2 border-[#FFCA58]/50">
      <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
      {children}
    </div>
  );
}

/* ---------- markup subset ---------- */

type Block =
  | { kind: "sub"; title: string }
  | { kind: "para"; lines: string[] }
  | { kind: "bullets"; lines: string[] }
  | { kind: "numbered"; lines: string[] }
  | { kind: "defs"; lines: string[] };

const NUMBERED = /^\d+\.\d+\s+/;
const DEFINITION = /^\*\*(.+?)\*\*:\s*/;

function classify(line: string): Block["kind"] {
  if (line.startsWith("- ")) return "bullets";
  if (NUMBERED.test(line)) return "numbered";
  if (DEFINITION.test(line)) return "defs";
  return "para";
}

function parse(text: string): Block[] {
  const blocks: Block[] = [];
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (!line) {
      // Blank line closes whatever block was open.
      blocks.push({ kind: "para", lines: [] });
      continue;
    }
    if (line.startsWith("### ")) {
      blocks.push({ kind: "sub", title: line.slice(4).trim() });
      continue;
    }
    const kind = classify(line);
    const last = blocks[blocks.length - 1];
    if (last && last.kind === kind && last.kind !== "sub" && last.lines.length) {
      last.lines.push(line);
    } else {
      blocks.push({ kind, lines: [line] } as Block);
    }
  }
  return blocks.filter((b) => b.kind === "sub" || b.lines.length > 0);
}

function RichText({ text }: { text: string }) {
  const blocks = parse(text);

  // Everything after a "### " heading belongs to that subsection.
  const groups: { title?: string; blocks: Block[] }[] = [{ blocks: [] }];
  for (const block of blocks) {
    if (block.kind === "sub") groups.push({ title: block.title, blocks: [] });
    else groups[groups.length - 1].blocks.push(block);
  }

  return (
    <>
      {groups.map((group, i) =>
        group.title === undefined ? (
          <Blocks key={i} blocks={group.blocks} />
        ) : (
          <SubSection key={i} title={group.title}>
            <Blocks blocks={group.blocks} />
          </SubSection>
        ),
      )}
    </>
  );
}

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        const spacing = i === 0 ? "" : " mt-3";
        if (block.kind === "sub") return null;

        if (block.kind === "bullets") {
          return (
            <ul key={i} className={"space-y-1.5 ml-2" + spacing}>
              {block.lines.map((line, j) => (
                <li
                  key={j}
                  className="flex items-start gap-2 text-gray-700 leading-relaxed"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFCA58] mt-2 flex-shrink-0" />
                  <span>{inline(line.slice(2))}</span>
                </li>
              ))}
            </ul>
          );
        }

        if (block.kind === "numbered") {
          return (
            <div key={i} className={"space-y-3 ml-2" + spacing}>
              {block.lines.map((line, j) => {
                const number = line.match(NUMBERED)![0].trim();
                return (
                  <div
                    key={j}
                    className="flex gap-3 text-gray-700 leading-relaxed"
                  >
                    <span className="font-bold text-[#FFCA58] flex-shrink-0">
                      {number}
                    </span>
                    <span>{inline(line.replace(NUMBERED, ""))}</span>
                  </div>
                );
              })}
            </div>
          );
        }

        if (block.kind === "defs") {
          return (
            <div key={i} className={"space-y-3 ml-2" + spacing}>
              {block.lines.map((line, j) => {
                const match = line.match(DEFINITION)!;
                return (
                  <div key={j} className="pl-4 border-l-2 border-[#5763FF]/20">
                    <span className="font-semibold text-gray-800">
                      {match[1]}:
                    </span>{" "}
                    <span className="text-gray-700">
                      {inline(line.replace(DEFINITION, ""))}
                    </span>
                  </div>
                );
              })}
            </div>
          );
        }

        return (
          <p key={i} className={"text-gray-700 leading-relaxed" + spacing}>
            {block.lines.map((line, j) => (
              <span key={j}>
                {j > 0 ? <br /> : null}
                {inline(line)}
              </span>
            ))}
          </p>
        );
      })}
    </>
  );
}

/** Renders **bold** runs; everything else stays plain text. */
function inline(text: string): React.ReactNode {
  const parts = text.split("**");
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-gray-800">
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

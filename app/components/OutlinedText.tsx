/**
 * Text with a top-to-bottom gradient fill and a solid outline around every
 * letter, as in the client's Coiny mockups.
 *
 * The outline is a stroked copy of the text sitting behind it. Stroking the
 * gradient text itself would eat into the letters, and a text-shadow would
 * paint over a background-clipped fill.
 */
export default function OutlinedText({
  children,
  from,
  to,
  outline = "#FFF8E7",
  stroke = "0.22em",
}: {
  children: string;
  from: string;
  to: string;
  outline?: string;
  /** Total stroke width; about half of it shows outside the letters. */
  stroke?: string;
}) {
  return (
    <span className="relative inline-block">
      <span
        aria-hidden
        className="absolute inset-0"
        style={{ color: outline, WebkitTextStroke: `${stroke} ${outline}` }}
      >
        {children}
      </span>
      <span
        className="relative"
        style={{
          backgroundImage: `linear-gradient(180deg, ${from} 0%, ${to} 100%)`,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          color: "transparent",
        }}
      >
        {children}
      </span>
    </span>
  );
}

/** Gold used for the top-card titles and the loyalty buttons. */
export const GOLD_FROM = "#FFDB97";
export const GOLD_TO = "#F5BD66";

import type { ReactNode } from "react";

/**
 * Renders the dashboard's tiny inline markup: `**vet**` becomes bold and a
 * single newline becomes a line break. Everything else stays plain text, so
 * a client typing in a textarea cannot inject markup.
 */
export function renderInline(
  text: string,
  boldClassName = "font-semibold",
): ReactNode {
  return text.split("\n").map((line, li) => (
    <span key={li}>
      {li > 0 ? <br /> : null}
      {line.split("**").map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className={boldClassName}>
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </span>
  ));
}

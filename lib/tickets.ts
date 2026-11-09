export const TICKETS_URL = "https://tickets.minimastersplayground.nl/";

/**
 * Minimasters is temporarily closed, so every button that leads straight to
 * the ticket shop is shown greyed out and leads nowhere. Set back to true
 * when ticket sales reopen.
 */
export const TICKETS_OPEN = false;

/** True for links into the ticket shop, which close along with it. */
export function isTicketsLink(href: string) {
  return /^https?:\/\/tickets\.minimastersplayground\.nl(\/|$)/i.test(
    href.trim(),
  );
}

/** Look and hover text of a booking button while ticket sales are closed. */
export const CLOSED_CLASS = "cursor-not-allowed select-none opacity-60 grayscale";
export const CLOSED_TITLE = "Tijdelijk gesloten";

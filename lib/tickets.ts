export const TICKETS_URL = "https://tickets.minimastersplayground.nl/";

/**
 * Ticket sales are open: every button that leads straight to the ticket shop
 * works. Set to false to grey them all out again (e.g. while temporarily
 * closed).
 */
export const TICKETS_OPEN = true;

/** True for links into the ticket shop, which close along with it. */
export function isTicketsLink(href: string) {
  return /^https?:\/\/tickets\.minimastersplayground\.nl(\/|$)/i.test(
    href.trim(),
  );
}

/** Look and hover text of a booking button while ticket sales are closed. */
export const CLOSED_CLASS = "cursor-not-allowed select-none opacity-60 grayscale";
export const CLOSED_TITLE = "Tijdelijk gesloten";

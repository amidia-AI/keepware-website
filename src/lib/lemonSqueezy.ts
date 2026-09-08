/**
 * Lemon Squeezy checkout (TypeMaster v1 — Keepware Labs).
 *
 * Lemon.js is loaded once in index.html. Payment is handled entirely by
 * Lemon Squeezy on their hosted checkout — this file only opens it.
 * No API keys or secrets belong here; this is frontend code.
 */

const TYPEMASTER_CHECKOUT_URL =
  'https://keepware-ai.lemonsqueezy.com/checkout/buy/f938b8fa-303f-4bb6-ab3a-534860daa4b6';

declare global {
  interface Window {
    LemonSqueezy?: { Url?: { Open: (url: string) => void } };
    createLemonSqueezy?: () => void;
  }
}

/**
 * Opens the TypeMaster checkout as a Lemon.js overlay so the buyer stays on
 * the site. Falls back to a normal redirect if Lemon.js is unavailable
 * (blocked, offline, or still loading).
 */
export function openTypeMasterCheckout(): void {
  // `embed=1` tells Lemon Squeezy to render the checkout in the overlay.
  const url = `${TYPEMASTER_CHECKOUT_URL}?embed=1`;

  try {
    // Lemon.js self-initialises on load; re-run it in case this SPA mounted first.
    window.createLemonSqueezy?.();

    const open = window.LemonSqueezy?.Url?.Open;
    if (open) {
      open(url);
      return;
    }
  } catch {
    // Fall through to the redirect below.
  }

  window.location.assign(TYPEMASTER_CHECKOUT_URL);
}

import { ApiError } from "./validation";
import type { CatalogEntry } from "./catalog";

const LS_API_BASE = "https://api.lemonsqueezy.com/v1";

export function isPaymentsConfigured(): boolean {
  return Boolean(process.env.LEMONSQUEEZY_API_KEY);
}

/**
 * Creates a hosted Lemon Squeezy checkout for the given catalog entry.
 * Returns the checkout URL the browser should open (overlay or redirect).
 * The license is NOT issued here — it is minted by the signed
 * `order_created` webhook after Lemon Squeezy confirms payment.
 */
export async function createLemonCheckout(entry: CatalogEntry, email: string): Promise<string> {
  const apiKey = process.env.LEMONSQUEEZY_API_KEY;
  if (!apiKey) {
    throw new ApiError(
      503,
      "Payments are not configured yet. Set LEMONSQUEEZY_API_KEY in .env to enable checkout."
    );
  }

  const siteUrl = process.env.SITE_URL || "http://localhost:3000";
  const variantId = process.env.LEMONSQUEEZY_VARIANT_ID;
  const testMode = process.env.LEMONSQUEEZY_TEST_MODE === "true";

  const productOptions: Record<string, unknown> = {
    name: entry.name,
    success_redirect_url: `${siteUrl}/typemaster?purchase=success`,
  };

  const attributes: Record<string, unknown> = {
    product_options: productOptions,
    checkout_options: { embed: true },
    checkout_data: { email },
    custom_data: { appId: entry.id },
    preview: false,
  };

  if (variantId) {
    productOptions.variant_id = Number(variantId);
  } else {
    // No variant configured: charge the catalog price as a custom-price checkout.
    attributes.custom_price = { amount: Math.round(entry.priceUsd * 100), currency: "USD" };
  }

  if (testMode) {
    attributes.test_mode = true;
  }

  let res: Response;
  try {
    res = await fetch(`${LS_API_BASE}/checkouts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
        "Content-Type": "application/vnd.api+json",
      },
      body: JSON.stringify({ data: { type: "checkouts", attributes } }),
      signal: AbortSignal.timeout(15_000),
    });
  } catch (err) {
    console.error("Lemon Squeezy API request failed:", err);
    throw new ApiError(502, "Could not reach the payment provider. Please try again in a moment.");
  }

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error(`Lemon Squeezy checkout creation failed (${res.status}):`, detail.slice(0, 500));
    throw new ApiError(502, "Could not start checkout. Please try again in a moment.");
  }

  const json = (await res.json().catch(() => null)) as { data?: { attributes?: { url?: string } } } | null;
  const url = json?.data?.attributes?.url;
  if (!url) {
    console.error("Lemon Squeezy response missing checkout URL:", JSON.stringify(json)?.slice(0, 500));
    throw new ApiError(502, "Checkout provider returned an unexpected response.");
  }
  return url;
}

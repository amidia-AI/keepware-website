import { Router } from "express";
import type { Request } from "express";
import { asyncHandler, sendError } from "../http";
import { verifyWebhookSignature } from "../webhookSignature";
import { createOrder, hasProcessedWebhookEvent, markWebhookEventProcessed } from "../db";
import { generateLicenseKey } from "../license";
import { getCatalogEntry, DEFAULT_APP_ID } from "../catalog";
import { isValidEmail } from "../validation";

interface RequestWithRawBody extends Request {
  rawBody?: Buffer;
}

const router = Router();

// Lemon Squeezy webhook receiver.
// - HMAC-SHA256 of the raw body, hex, sent as the `X-Signature` header.
// - `order_created` mints the license. This is the ONLY path that issues
//   licenses for real payments — /api/checkout just opens the hosted checkout.
router.post(
  "/webhook",
  asyncHandler(async (req: RequestWithRawBody, res) => {
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
    if (!secret) {
      sendError(res, 503, "Webhook secret is not configured (LEMONSQUEEZY_WEBHOOK_SECRET)");
      return;
    }

    const signature = req.headers["x-signature"];
    if (!verifyWebhookSignature(req.rawBody, signature, secret)) {
      sendError(res, 401, "Invalid webhook signature");
      return;
    }

    const body = req.body;
    if (!body || typeof body !== "object") {
      sendError(res, 400, "Malformed webhook payload");
      return;
    }

    const payload = body as {
      meta?: { event_name?: string; custom_data?: { appId?: string } };
      data?: { id?: string; attributes?: Record<string, unknown> };
    };

    const eventId = typeof payload.data?.id === "string" ? payload.data.id : undefined;
    if (eventId && hasProcessedWebhookEvent(eventId)) {
      res.status(200).json({ received: true, duplicate: true });
      return;
    }

    if (payload.meta?.event_name === "order_created") {
      const attrs = payload.data?.attributes ?? {};
      const rawEmail = typeof attrs.user_email === "string" ? attrs.user_email.trim().toLowerCase() : "";
      const customAppId = payload.meta?.custom_data?.appId;

      // Trust the signed webhook: use the app from custom_data when it is a
      // known product, otherwise fall back to the default (manual dashboard
      // test orders carry no custom_data).
      const entry =
        (typeof customAppId === "string" ? getCatalogEntry(customAppId) : undefined) ??
        getCatalogEntry(DEFAULT_APP_ID);

      if (entry && isValidEmail(rawEmail)) {
        await createOrder({
          appId: entry.id,
          appName: entry.name,
          priceUsd: entry.priceUsd,
          email: rawEmail,
          licenseKey: generateLicenseKey(),
          source: "webhook",
        });
      } else {
        console.warn(
          `Webhook order_created skipped (email ${rawEmail ? "invalid" : "missing"}, appId ${customAppId ?? "none"})`
        );
      }
    } else {
      console.log("Lemon Squeezy webhook event received:", payload.meta?.event_name || "unknown");
    }

    if (eventId) {
      await markWebhookEventProcessed(eventId);
    }

    res.status(200).json({ received: true });
  })
);

export default router;

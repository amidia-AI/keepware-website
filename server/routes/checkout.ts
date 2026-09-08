import { Router } from "express";
import { asyncHandler } from "../http";
import { createRateLimiter, clientIp } from "../rateLimit";
import { requireEmail, requireNonEmptyString, ApiError } from "../validation";
import { findOrdersByEmail } from "../db";
import { getCatalogEntry } from "../catalog";
import { createLemonCheckout } from "../lemonsqueezy";

const router = Router();
const checkoutLimiter = createRateLimiter({ windowMs: 60_000, max: 10 })((req) => `checkout:${clientIp(req)}`);
const lookupLimiter = createRateLimiter({ windowMs: 60_000, max: 10 })((req) => `licenses:${clientIp(req)}`);

// Starts a hosted Lemon Squeezy checkout. Payment itself happens on Lemon
// Squeezy; the license is minted when their `order_created` webhook arrives.
router.post(
  "/checkout",
  checkoutLimiter,
  asyncHandler(async (req, res) => {
    const appId = requireNonEmptyString(req.body?.appId, "appId", 100);
    const email = requireEmail(req.body?.email, "email");

    const entry = getCatalogEntry(appId);
    if (!entry) {
      throw new ApiError(404, "Unknown app");
    }

    const checkoutUrl = await createLemonCheckout(entry, email);
    res.json({ checkoutUrl });
  })
);

router.get(
  "/licenses",
  lookupLimiter,
  asyncHandler(async (req, res) => {
    const email = typeof req.query.email === "string" ? req.query.email : "";
    if (!email) {
      res.json({ email: "", licenses: [] });
      return;
    }
    const orders = findOrdersByEmail(email);
    const licenses = orders.map((o) => ({
      appId: o.appId,
      appName: o.appName,
      licenseKey: o.licenseKey,
      purchasedAt: o.createdAt,
    }));
    res.json({ email, licenses });
  })
);

export default router;

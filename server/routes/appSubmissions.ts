import { Router } from "express";
import { asyncHandler } from "../http";
import { createRateLimiter, clientIp } from "../rateLimit";
import { requireEmail, requireNonEmptyString, isValidUrl, ApiError } from "../validation";
import { createAppSubmission } from "../db";

const router = Router();
const limiter = createRateLimiter({ windowMs: 60_000, max: 5 })((req) => `app-submit:${clientIp(req)}`);

router.post(
  "/app-submissions",
  limiter,
  asyncHandler(async (req, res) => {
    const appName = requireNonEmptyString(req.body?.appName, "appName", 200);
    const developerName = requireNonEmptyString(req.body?.developerName, "developerName", 200);
    const email = requireEmail(req.body?.email, "email");
    const url = req.body?.url;
    if (!isValidUrl(url)) {
      throw new ApiError(400, "url must be a valid http(s) URL");
    }
    const description = requireNonEmptyString(req.body?.description, "description", 2000);

    const record = await createAppSubmission({ appName, developerName, email, url, description });
    res.status(201).json({ success: true, id: record.id });
  })
);

export default router;

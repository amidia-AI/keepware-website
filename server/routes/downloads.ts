import { Router } from "express";
import { asyncHandler } from "../http";
import { createRateLimiter, clientIp } from "../rateLimit";
import { getDownloadCount, recordDownload } from "../db";

const router = Router();
const limiter = createRateLimiter({ windowMs: 60_000, max: 10 })((req) => `download:${clientIp(req)}`);

router.get(
  "/downloads",
  asyncHandler(async (_req, res) => {
    res.json({ count: getDownloadCount() });
  })
);

router.post(
  "/downloads",
  limiter,
  asyncHandler(async (_req, res) => {
    const count = await recordDownload();
    res.status(201).json({ count });
  })
);

export default router;

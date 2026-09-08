import { Router } from "express";
import { asyncHandler } from "../http";
import { createRateLimiter, clientIp } from "../rateLimit";
import { requireEmail } from "../validation";
import { createSubscriber } from "../db";

const router = Router();
const limiter = createRateLimiter({ windowMs: 60_000, max: 5 })((req) => `subscribe:${clientIp(req)}`);

router.post(
  "/subscribe",
  limiter,
  asyncHandler(async (req, res) => {
    const email = requireEmail(req.body?.email, "email");
    const { alreadySubscribed } = await createSubscriber(email);
    res.status(201).json({ success: true, alreadySubscribed });
  })
);

export default router;

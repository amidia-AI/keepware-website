import { Router } from "express";
import { asyncHandler } from "../http";
import { createRateLimiter, clientIp } from "../rateLimit";
import { requireEmail, requireNonEmptyString } from "../validation";
import { createProjectRequest } from "../db";

const router = Router();
const limiter = createRateLimiter({ windowMs: 60_000, max: 5 })((req) => `project:${clientIp(req)}`);

router.post(
  "/project-requests",
  limiter,
  asyncHandler(async (req, res) => {
    const clientName = requireNonEmptyString(req.body?.clientName, "clientName", 200);
    const clientEmail = requireEmail(req.body?.clientEmail, "clientEmail");
    const projectTitle = requireNonEmptyString(req.body?.projectTitle, "projectTitle", 200);
    const platformTarget = requireNonEmptyString(req.body?.platformTarget, "platformTarget", 100);
    const budgetRange = requireNonEmptyString(req.body?.budgetRange, "budgetRange", 100);
    const description = requireNonEmptyString(req.body?.description, "description", 4000);

    const record = await createProjectRequest({
      clientName,
      clientEmail,
      projectTitle,
      platformTarget,
      budgetRange,
      description,
    });

    res.status(201).json({ success: true, id: record.id });
  })
);

export default router;

import { Router } from "express";
import { asyncHandler, sendError } from "../http";
import { createRateLimiter, clientIp } from "../rateLimit";
import { requireNonEmptyString, ApiError } from "../validation";
import { createFeatureRequest, listFeatureRequests, toggleVote, votedIdsFor } from "../db";

const router = Router();
const limiter = createRateLimiter({ windowMs: 60_000, max: 20 });
const voteLimiter = limiter((req) => `vote:${clientIp(req)}`);
const createLimiter = limiter((req) => `create-fr:${clientIp(req)}`);

const CATEGORIES = ["Feature", "Language", "Model"] as const;

router.get(
  "/feature-requests",
  asyncHandler(async (req, res) => {
    const category = typeof req.query.category === "string" ? req.query.category : undefined;
    const voterId = typeof req.headers["x-voter-id"] === "string" ? req.headers["x-voter-id"] : "";
    const requests = listFeatureRequests(category);
    const votedIds = voterId ? votedIdsFor(voterId) : [];
    res.json({ requests, votedIds });
  })
);

router.post(
  "/feature-requests",
  createLimiter,
  asyncHandler(async (req, res) => {
    const title = requireNonEmptyString(req.body?.title, "title", 200);
    const description =
      typeof req.body?.description === "string" ? req.body.description.trim().slice(0, 1000) : "";
    const category = req.body?.category;
    const voterId = requireNonEmptyString(req.body?.voterId, "voterId", 100);

    if (!CATEGORIES.includes(category)) {
      throw new ApiError(400, `category must be one of ${CATEGORIES.join(", ")}`);
    }

    const request = await createFeatureRequest({ title, description, category, voterId });
    res.status(201).json({ request });
  })
);

router.post(
  "/feature-requests/:id/vote",
  voteLimiter,
  asyncHandler(async (req, res) => {
    const voterId = requireNonEmptyString(req.body?.voterId, "voterId", 100);
    const result = await toggleVote(req.params.id, voterId);
    if (!result) {
      sendError(res, 404, "Feature request not found");
      return;
    }
    res.json(result);
  })
);

export default router;

import type { NextFunction, Request, Response } from "express";
import { sendError } from "./http";

interface RateLimitOptions {
  windowMs: number;
  max: number;
}

export function createRateLimiter({ windowMs, max }: RateLimitOptions) {
  const hits = new Map<string, number[]>();

  return (keyFn: (req: Request) => string) =>
    (req: Request, res: Response, next: NextFunction): void => {
      const key = keyFn(req);
      const now = Date.now();
      const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);

      if (recent.length >= max) {
        sendError(res, 429, "Too many requests, please slow down.");
        return;
      }

      recent.push(now);
      hits.set(key, recent);
      next();
    };
}

export function clientIp(req: Request): string {
  return req.ip ?? req.socket.remoteAddress ?? "unknown";
}

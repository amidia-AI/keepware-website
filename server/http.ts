import type { NextFunction, Request, Response } from "express";
import { ApiError } from "./validation";

export function sendError(res: Response, status: number, message: string): void {
  res.status(status).json({ error: { message } });
}

export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
) {
  return (req: Request, res: Response, next: NextFunction): void => {
    fn(req, res, next).catch(next);
  };
}

export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const start = Date.now();
  res.on("finish", () => {
    const ms = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${ms}ms`);
  });
  next();
}

export function jsonErrorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void {
  if (err instanceof ApiError) {
    sendError(res, err.status, err.message);
    return;
  }
  if (err && typeof err === "object" && (err as { type?: string }).type === "entity.parse.failed") {
    sendError(res, 400, "Malformed JSON body");
    return;
  }
  console.error("Unhandled server error:", err);
  sendError(res, 500, "Internal server error");
}

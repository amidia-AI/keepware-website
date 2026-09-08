export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && EMAIL_RE.test(value.trim()) && value.length <= 254;
}

export function isValidUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function requireNonEmptyString(value: unknown, field: string, maxLen = 500): string {
  if (typeof value !== "string" || !value.trim()) {
    throw new ApiError(400, `${field} is required`);
  }
  const trimmed = value.trim();
  if (trimmed.length > maxLen) {
    throw new ApiError(400, `${field} must be at most ${maxLen} characters`);
  }
  return trimmed;
}

export function requireEmail(value: unknown, field = "email"): string {
  if (!isValidEmail(value)) {
    throw new ApiError(400, `${field} must be a valid email address`);
  }
  return (value as string).trim().toLowerCase();
}

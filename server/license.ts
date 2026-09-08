import crypto from "crypto";

export function generateLicenseKey(prefix = "KEEP-TYPE"): string {
  const segment = () => crypto.randomBytes(3).toString("hex").toUpperCase();
  return `${prefix}-${segment()}-${segment()}-${segment()}`;
}

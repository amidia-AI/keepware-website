import crypto from "crypto";

export function verifyWebhookSignature(
  rawBody: Buffer | undefined,
  signatureHeader: string | string[] | undefined,
  secret: string
): boolean {
  if (!rawBody || !signatureHeader || typeof signatureHeader !== "string") return false;

  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  const expectedBuf = Buffer.from(expected, "utf-8");
  const actualBuf = Buffer.from(signatureHeader, "utf-8");

  if (expectedBuf.length !== actualBuf.length) return false;
  return crypto.timingSafeEqual(expectedBuf, actualBuf);
}

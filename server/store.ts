import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "server", "data");
const DB_FILE = path.join(DATA_DIR, "db.json");

function ensureDataDir(): void {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export function readDb<T>(seedFactory: () => T): T {
  ensureDataDir();
  if (!fs.existsSync(DB_FILE)) {
    const seeded = seedFactory();
    fs.writeFileSync(DB_FILE, JSON.stringify(seeded, null, 2));
    return seeded;
  }
  try {
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    const seeded = seedFactory();
    fs.writeFileSync(DB_FILE, JSON.stringify(seeded, null, 2));
    return seeded;
  }
}

let writeQueue: Promise<unknown> = Promise.resolve();

export function writeDb(data: unknown): Promise<void> {
  writeQueue = writeQueue.then(async () => {
    ensureDataDir();
    const tmp = `${DB_FILE}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(data, null, 2));
    fs.renameSync(tmp, DB_FILE);
  });
  return writeQueue as Promise<void>;
}

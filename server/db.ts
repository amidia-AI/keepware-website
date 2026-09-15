import crypto from "crypto";
import { INITIAL_UPDATE_REQUESTS } from "../src/data/appsData";
import type { AppSubmission, ProjectRequest, UpdateRequestItem } from "../src/types";
import { readDb, writeDb } from "./store";

export interface FeatureRequestRecord extends UpdateRequestItem {
  voters: string[];
}

export interface Subscriber {
  id: string;
  email: string;
  createdAt: string;
}

export interface DbSchema {
  featureRequests: FeatureRequestRecord[];
  projectRequests: ProjectRequest[];
  appSubmissions: AppSubmission[];
  subscribers: Subscriber[];
}

function seedDb(): DbSchema {
  return {
    featureRequests: INITIAL_UPDATE_REQUESTS.map((item) => ({ ...item, voters: [] })),
    projectRequests: [],
    appSubmissions: [],
    subscribers: [],
  };
}

const loaded = readDb<Partial<DbSchema>>(seedDb);

// Defensive defaults so a db.json written by an older build never crashes the server.
const db: DbSchema = {
  featureRequests: loaded.featureRequests ?? [],
  projectRequests: loaded.projectRequests ?? [],
  appSubmissions: loaded.appSubmissions ?? [],
  subscribers: loaded.subscribers ?? [],
};

function persist(): Promise<void> {
  return writeDb(db);
}

// ---- Feature requests ----

export function listFeatureRequests(category?: string): FeatureRequestRecord[] {
  const sorted = [...db.featureRequests].sort((a, b) => b.votes - a.votes);
  if (!category || category === "All") return sorted;
  return sorted.filter((r) => r.category === category);
}

export function votedIdsFor(voterId: string): string[] {
  return db.featureRequests.filter((r) => r.voters.includes(voterId)).map((r) => r.id);
}

export async function createFeatureRequest(input: {
  title: string;
  description?: string;
  category: "Feature" | "Language" | "Model";
  voterId: string;
}): Promise<FeatureRequestRecord> {
  const record: FeatureRequestRecord = {
    id: `req-${crypto.randomUUID()}`,
    title: input.title,
    description: input.description || "Community requested feature update for upcoming releases.",
    category: input.category,
    votes: 1,
    status: "Under Review",
    tag: "Community Request",
    voters: [input.voterId],
  };
  db.featureRequests.unshift(record);
  await persist();
  return record;
}

export async function toggleVote(
  id: string,
  voterId: string
): Promise<{ request: FeatureRequestRecord; voted: boolean } | null> {
  const record = db.featureRequests.find((r) => r.id === id);
  if (!record) return null;

  const idx = record.voters.indexOf(voterId);
  let voted: boolean;
  if (idx >= 0) {
    record.voters.splice(idx, 1);
    record.votes = Math.max(0, record.votes - 1);
    voted = false;
  } else {
    record.voters.push(voterId);
    record.votes += 1;
    voted = true;
  }
  await persist();
  return { request: record, voted };
}

// ---- Project requests ----

export async function createProjectRequest(
  input: Omit<ProjectRequest, "id" | "createdAt">
): Promise<ProjectRequest> {
  const record: ProjectRequest = {
    id: `proj-${crypto.randomUUID()}`,
    createdAt: new Date().toISOString(),
    ...input,
  };
  db.projectRequests.unshift(record);
  await persist();
  return record;
}

// ---- App submissions ----

export async function createAppSubmission(
  input: Omit<AppSubmission, "id" | "createdAt" | "status">
): Promise<AppSubmission> {
  const record: AppSubmission = {
    id: `sub-${crypto.randomUUID()}`,
    createdAt: new Date().toISOString(),
    status: "pending",
    ...input,
  };
  db.appSubmissions.unshift(record);
  await persist();
  return record;
}

// ---- Subscribers ----

export async function createSubscriber(email: string): Promise<{ subscriber: Subscriber; alreadySubscribed: boolean }> {
  const normalized = email.trim().toLowerCase();
  const existing = db.subscribers.find((s) => s.email === normalized);
  if (existing) {
    return { subscriber: existing, alreadySubscribed: true };
  }
  const subscriber: Subscriber = {
    id: `sub-${crypto.randomUUID()}`,
    email: normalized,
    createdAt: new Date().toISOString(),
  };
  db.subscribers.unshift(subscriber);
  await persist();
  return { subscriber, alreadySubscribed: false };
}


import { TYPEMASTER_APP } from "../src/data/appsData";

export interface CatalogEntry {
  id: string;
  name: string;
  priceUsd: number;
}

export const CATALOG: Record<string, CatalogEntry> = {
  [TYPEMASTER_APP.id]: {
    id: TYPEMASTER_APP.id,
    name: TYPEMASTER_APP.name,
    priceUsd: TYPEMASTER_APP.priceUsd,
  },
};

export const DEFAULT_APP_ID: string = TYPEMASTER_APP.id;

export function getCatalogEntry(appId: string): CatalogEntry | undefined {
  return CATALOG[appId];
}

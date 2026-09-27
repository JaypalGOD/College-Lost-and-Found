import { MOCK_ITEMS } from "@/data/items";
import type { LostFoundItem, NewItemReport } from "@/types/item";

/**
 * Data access layer. Today it serves local mock data and keeps reports the
 * user creates in localStorage. To connect a backend, replace the bodies of
 * these functions with `fetch` calls — the signatures are already async.
 */

const STORAGE_KEY = "campus-lf:user-reports:v1";

function readUserReports(): LostFoundItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as LostFoundItem[]) : [];
  } catch {
    return [];
  }
}

function writeUserReports(items: LostFoundItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage full (e.g. large photo) or unavailable — retry without images.
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(items.map((i) => ({ ...i, image: undefined }))),
      );
    } catch {
      /* ignore: reports still live in memory for this session */
    }
  }
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const itemsService = {
  async list(): Promise<LostFoundItem[]> {
    return [...readUserReports(), ...MOCK_ITEMS];
  },

  async create(report: NewItemReport): Promise<LostFoundItem> {
    await delay(650); // simulate network latency so the UI's pending state is real
    const item: LostFoundItem = {
      ...report,
      id: `itm-${Date.now().toString(36)}`,
      createdAt: new Date().toISOString(),
    };
    writeUserReports([item, ...readUserReports()]);
    return item;
  },
};

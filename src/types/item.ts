export type ItemStatus = "lost" | "found";

export type ItemCategory =
  | "electronics"
  | "documents"
  | "bags"
  | "books"
  | "clothing"
  | "accessories"
  | "keys"
  | "bottles"
  | "other";

/** Keys for the built-in SVG item illustrations (no external images needed). */
export type ItemArt =
  | "earbuds"
  | "earbuds-case"
  | "bottle"
  | "id-card"
  | "calculator"
  | "backpack"
  | "keys"
  | "charger"
  | "book"
  | "hoodie"
  | "glasses"
  | "umbrella"
  | "laptop"
  | "wallet"
  | "generic";

export type LocationId =
  | "library"
  | "cse-block"
  | "main-gate"
  | "cafeteria"
  | "auditorium"
  | "sports-complex"
  | "hostel"
  | "parking"
  | "admin-block"
  | "engineering-block";

export interface CampusLocation {
  id: LocationId;
  name: string;
  /** Position on the illustrated campus map, as percentages of the map box. */
  map: { x: number; y: number };
}

export interface Reporter {
  /** Display name only — full contact details are never exposed publicly. */
  name: string;
  role?: "Student" | "Faculty" | "Staff";
  department?: string;
  verified?: boolean;
}

export interface LostFoundItem {
  id: string;
  title: string;
  description: string;
  status: ItemStatus;
  category: ItemCategory;
  location: LocationId;
  /** ISO date (YYYY-MM-DD) */
  date: string;
  /** 24h time, HH:mm */
  time?: string;
  /** Uploaded image (object/data URL) or remote URL. Falls back to `art`. */
  image?: string;
  art?: ItemArt;
  color?: string;
  tags?: string[];
  reporter?: Reporter;
  /** ISO timestamp when the report was created. */
  createdAt: string;
  /** True for reports created by the signed-in user (drives "My reports"). */
  ownedByMe?: boolean;
}

export type NewItemReport = Omit<LostFoundItem, "id" | "createdAt">;

export type SortOption = "newest" | "oldest" | "az";

export interface ItemFilters {
  query: string;
  status: ItemStatus | "all";
  category: ItemCategory | "all";
  location: LocationId | "all";
  sort: SortOption;
}

export interface ItemMatch {
  item: LostFoundItem;
  /** 0–100 */
  score: number;
  reasons: string[];
}

import { getCategory } from "@/data/categories";
import { getLocation } from "@/data/locations";
import type { ItemFilters, LostFoundItem } from "@/types/item";

export const DEFAULT_FILTERS: ItemFilters = {
  query: "",
  status: "all",
  category: "all",
  location: "all",
  sort: "newest",
};

function haystack(item: LostFoundItem): string {
  return [
    item.title,
    item.description,
    item.color,
    getCategory(item.category).label,
    getLocation(item.location).name,
    ...(item.tags ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

/** Every word in the query must appear somewhere in the item's text. */
export function matchesQuery(item: LostFoundItem, query: string): boolean {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return true;
  const text = haystack(item);
  return words.every((w) => text.includes(w));
}

export function filterItems(items: LostFoundItem[], f: ItemFilters): LostFoundItem[] {
  const result = items.filter(
    (item) =>
      (f.status === "all" || item.status === f.status) &&
      (f.category === "all" || item.category === f.category) &&
      (f.location === "all" || item.location === f.location) &&
      matchesQuery(item, f.query),
  );
  return sortItems(result, f.sort);
}

export function sortItems(items: LostFoundItem[], sort: ItemFilters["sort"]): LostFoundItem[] {
  const copy = [...items];
  switch (sort) {
    case "az":
      return copy.sort((a, b) => a.title.localeCompare(b.title));
    case "oldest":
      return copy.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    case "newest":
    default:
      return copy.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }
}

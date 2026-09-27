import { RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { CATEGORIES } from "@/data/categories";
import { LOCATIONS } from "@/data/locations";
import { DEFAULT_FILTERS } from "@/lib/filters";
import type { ItemFilters as Filters, SortOption } from "@/types/item";
import { SegmentedStatus } from "./SegmentedStatus";

export function ItemFilters({
  filters,
  onChange,
  resultCount,
}: {
  filters: Filters;
  onChange: (next: Filters) => void;
  resultCount: number;
}) {
  const set = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    onChange({ ...filters, [key]: value });

  const isDirty =
    filters.query !== "" ||
    filters.status !== "all" ||
    filters.category !== "all" ||
    filters.location !== "all" ||
    filters.sort !== DEFAULT_FILTERS.sort;

  return (
    <section aria-label="Search and filter items" className="rounded-3xl border bg-card/80 p-4 shadow-soft backdrop-blur sm:p-5">
      <form role="search" onSubmit={(e) => e.preventDefault()} className="grid gap-4">
        <div className="relative">
          <Label htmlFor="browse-q" className="sr-only">
            Search items
          </Label>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            id="browse-q"
            type="search"
            value={filters.query}
            onChange={(e) => set("query", e.target.value)}
            placeholder='Search for an item... e.g. "Black AirPods"'
            className="h-12 rounded-2xl pl-12 text-base focus-visible:shadow-glow"
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
          <SegmentedStatus value={filters.status} onChange={(v) => set("status", v)} name="browse-status" className="self-start" />

          <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="grid gap-1.5">
              <Label htmlFor="browse-category" className="text-xs text-muted-foreground">Category</Label>
              <NativeSelect
                id="browse-category"
                value={filters.category}
                onChange={(e) => set("category", e.target.value as Filters["category"])}
                className="rounded-xl"
              >
                <option value="all">All categories</option>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </NativeSelect>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="browse-location" className="text-xs text-muted-foreground">Location</Label>
              <NativeSelect
                id="browse-location"
                value={filters.location}
                onChange={(e) => set("location", e.target.value as Filters["location"])}
                className="rounded-xl"
              >
                <option value="all">All locations</option>
                {LOCATIONS.map((l) => (
                  <option key={l.id} value={l.id}>{l.name}</option>
                ))}
              </NativeSelect>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="browse-sort" className="text-xs text-muted-foreground">Sort by</Label>
              <NativeSelect
                id="browse-sort"
                value={filters.sort}
                onChange={(e) => set("sort", e.target.value as SortOption)}
                className="rounded-xl"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="az">Name (A–Z)</option>
              </NativeSelect>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t pt-3 text-sm">
          <p className="flex items-center gap-2 text-muted-foreground" aria-live="polite">
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            <span>
              <strong className="font-semibold text-foreground">{resultCount}</strong>{" "}
              {resultCount === 1 ? "item" : "items"} found
            </span>
          </p>
          {isDirty && (
            <Button type="button" variant="ghost" size="sm" onClick={() => onChange(DEFAULT_FILTERS)}>
              <RotateCcw className="h-4 w-4 group-hover/btn:-rotate-45" aria-hidden="true" />
              Clear filters
            </Button>
          )}
        </div>
      </form>
    </section>
  );
}

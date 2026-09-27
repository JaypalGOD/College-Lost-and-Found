import * as React from "react";
import { CircleAlert } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { ItemFilters } from "@/components/items/ItemFilters";
import { ItemGrid } from "@/components/items/ItemGrid";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/data/categories";
import { isLocationId } from "@/data/locations";
import { DEFAULT_FILTERS, filterItems } from "@/lib/filters";
import { useItems } from "@/lib/items-store";
import type { ItemCategory, ItemFilters as Filters, SortOption } from "@/types/item";
import { PageHeader } from "./PageHeader";

/** Filters live in the URL so results are shareable and survive refresh. */
function readFilters(p: URLSearchParams): Filters {
  const status = p.get("status");
  const category = p.get("category");
  const location = p.get("location");
  const sort = p.get("sort");
  return {
    query: p.get("q") ?? "",
    status: status === "lost" || status === "found" ? status : "all",
    category: CATEGORIES.some((c) => c.id === category) ? (category as ItemCategory) : "all",
    location: isLocationId(location) ? location : "all",
    sort: sort === "oldest" || sort === "az" ? (sort as SortOption) : "newest",
  };
}

function writeFilters(f: Filters, current: URLSearchParams): URLSearchParams {
  const p = new URLSearchParams();
  if (f.query) p.set("q", f.query);
  if (f.status !== "all") p.set("status", f.status);
  if (f.category !== "all") p.set("category", f.category);
  if (f.location !== "all") p.set("location", f.location);
  if (f.sort !== DEFAULT_FILTERS.sort) p.set("sort", f.sort);
  const item = current.get("item");
  if (item) p.set("item", item);
  return p;
}

export default function Browse() {
  const { items } = useItems();
  const [params, setParams] = useSearchParams();
  const filters = React.useMemo(() => readFilters(params), [params]);
  const deferred = React.useDeferredValue(filters);
  const results = React.useMemo(() => filterItems(items, deferred), [items, deferred]);

  const onChange = (next: Filters) => setParams(writeFilters(next, params), { replace: true, preventScrollReset: true });

  return (
    <>
      <PageHeader
        eyebrow="Browse"
        title="Browse Lost & Found"
        description="Search every report on campus. Filter by status, category or place — results update as you type."
      />
      <div className="container pb-16">
        <ItemFilters filters={filters} onChange={onChange} resultCount={results.length} />
        <ItemGrid
          items={results}
          className="mt-8"
          emptyAction={
            <Button asChild className="rounded-full">
              <Link to="/report?type=lost">
                <CircleAlert className="h-4 w-4" aria-hidden="true" /> Report a lost item
              </Link>
            </Button>
          }
        />
      </div>
    </>
  );
}

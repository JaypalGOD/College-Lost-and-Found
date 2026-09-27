import * as React from "react";
import { ArrowRight, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SegmentedStatus } from "@/components/items/SegmentedStatus";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { CATEGORIES } from "@/data/categories";
import { LOCATIONS } from "@/data/locations";
import { cn } from "@/lib/utils";
import type { ItemCategory, ItemStatus, LocationId } from "@/types/item";

const EXAMPLES = ["Black AirPods", "Blue water bottle", "Student ID", "Calculator"];

export function HeroSearch({ className }: { className?: string }) {
  const navigate = useNavigate();
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState<ItemStatus | "all">("all");
  const [category, setCategory] = React.useState<ItemCategory | "all">("all");
  const [location, setLocation] = React.useState<LocationId | "all">("all");

  const go = (q = query) => {
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (status !== "all") params.set("status", status);
    if (category !== "all") params.set("category", category);
    if (location !== "all") params.set("location", location);
    const search = params.toString();
    navigate(`/browse${search ? `?${search}` : ""}`);
  };

  return (
    <section
      aria-label="Search lost and found items"
      className={cn(
        "relative rounded-[28px] border border-white/70 bg-white/80 p-3 shadow-lift backdrop-blur-xl sm:p-4",
        className,
      )}
    >
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          go();
        }}
        className="grid gap-3"
      >
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="group/search relative flex-1">
            <Label htmlFor="hero-q" className="sr-only">
              Search for an item
            </Label>
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within/search:text-primary"
              aria-hidden="true"
            />
            <input
              id="hero-q"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for an item..."
              autoComplete="off"
              className="h-14 w-full rounded-2xl border border-input bg-background pl-12 pr-4 text-base shadow-inner shadow-black/[0.02] transition-[border-color,box-shadow] duration-300 placeholder:text-muted-foreground focus:border-primary/50 focus:shadow-glow focus:outline-none"
            />
          </div>
          <Button type="submit" size="xl" className="h-14 rounded-2xl px-7 text-base">
            Search
            <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1" aria-hidden="true" />
          </Button>
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <SegmentedStatus value={status} onChange={setStatus} name="hero-status" className="self-start" />
          <div className="grid flex-1 grid-cols-2 gap-3">
            <div>
              <Label htmlFor="hero-category" className="sr-only">Category</Label>
              <NativeSelect
                id="hero-category"
                value={category}
                onChange={(e) => setCategory(e.target.value as ItemCategory | "all")}
                className="rounded-full bg-muted/60"
              >
                <option value="all">All categories</option>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </NativeSelect>
            </div>
            <div>
              <Label htmlFor="hero-location" className="sr-only">Location</Label>
              <NativeSelect
                id="hero-location"
                value={location}
                onChange={(e) => setLocation(e.target.value as LocationId | "all")}
                className="rounded-full bg-muted/60"
              >
                <option value="all">Anywhere on campus</option>
                {LOCATIONS.map((l) => (
                  <option key={l.id} value={l.id}>{l.name}</option>
                ))}
              </NativeSelect>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 px-1 text-sm">
          <span className="text-muted-foreground">Try:</span>
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => {
                setQuery(ex);
                go(ex);
              }}
              className="rounded-full border bg-background px-3 py-1 text-foreground/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary"
            >
              "{ex}"
            </button>
          ))}
        </div>
      </form>
    </section>
  );
}

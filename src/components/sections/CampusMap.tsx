import * as React from "react";
import { ArrowRight, CircleAlert, MapPin, PackageCheck, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useItemHref } from "@/components/items/ItemCard";
import { ItemIllustration } from "@/components/items/ItemIllustration";
import { Button } from "@/components/ui/button";
import { LOCATIONS, getLocation } from "@/data/locations";
import { formatRelativeDay } from "@/lib/format";
import { useItems } from "@/lib/items-store";
import { sortItems } from "@/lib/filters";
import { cn } from "@/lib/utils";
import type { LocationId } from "@/types/item";
import { SectionHeading } from "./SectionHeading";

/** Illustrated (non-geographic) campus base map. Coordinates match LOCATIONS[].map (percent). */
function MapBase() {
  const b = (id: LocationId) => {
    const { x, y } = getLocation(id).map;
    return { x: x * 4, y: y * 3 };
  };
  const block = (id: LocationId, w = 46, h = 26, fill = "#fff") => {
    const { x, y } = b(id);
    return <rect x={x - w / 2} y={y - 6} width={w} height={h} rx="6" fill={fill} stroke="#d7dbf2" />;
  };
  const sports = b("sports-complex");
  const parking = b("parking");
  const gate = b("main-gate");

  return (
    <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <rect width="400" height="300" fill="#e7f5ec" />
      <path d="M0 0 H400 V40 Q300 60 200 40 T0 50 Z" fill="#dcefe4" />
      {/* Roads */}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M200 300 V112 M36 128 H372 M200 204 H372 M120 128 V204 H200 M300 128 V250 M72 128 V214" stroke="#fff" strokeWidth="13" />
        <path d="M200 300 V112 M36 128 H372 M200 204 H372" stroke="#e6e2d6" strokeWidth="1.5" strokeDasharray="5 6" />
      </g>
      {/* Lake / green */}
      <ellipse cx="150" cy="232" rx="34" ry="18" fill="#cfe4ff" />
      <ellipse cx="146" cy="228" rx="12" ry="4" fill="#fff" opacity=".6" />
      {/* Sports field */}
      <rect x={sports.x - 34} y={sports.y - 22} width="68" height="46" rx="23" fill="#f0b58b" />
      <rect x={sports.x - 26} y={sports.y - 15} width="52" height="32" rx="16" fill="#8fd3a4" />
      <line x1={sports.x} y1={sports.y - 15} x2={sports.x} y2={sports.y + 17} stroke="#fff" strokeWidth="1.5" />
      {/* Parking */}
      <rect x={parking.x - 28} y={parking.y - 8} width="56" height="28" rx="5" fill="#dfe1ea" />
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1={parking.x - 22 + i * 11} y1={parking.y - 6} x2={parking.x - 22 + i * 11} y2={parking.y + 4} stroke="#fff" strokeWidth="1.5" />
      ))}
      {/* Gate */}
      <path d={`M${gate.x - 22} ${gate.y + 14} V${gate.y - 2} Q${gate.x} ${gate.y - 18} ${gate.x + 22} ${gate.y - 2} V${gate.y + 14}`} fill="none" stroke="#6b70a0" strokeWidth="4" strokeLinecap="round" />
      {/* Buildings */}
      {block("library", 56, 30)}
      {block("cse-block", 50, 30)}
      {block("engineering-block", 50, 30)}
      {block("cafeteria", 44, 24, "#fff8ec")}
      {block("auditorium", 56, 30)}
      {block("hostel", 48, 34)}
      {block("admin-block", 50, 26)}
      {/* Trees */}
      {[
        [30, 90], [150, 60], [250, 60], [360, 100], [110, 260], [250, 160], [380, 180], [30, 160], [330, 290], [250, 290],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="9" fill="#7fcf9c" />
          <circle cx={x - 3} cy={y - 3} r="4" fill="#9adcb1" />
        </g>
      ))}
    </svg>
  );
}

export function CampusMap() {
  const { items } = useItems();
  const hrefFor = useItemHref();
  const [selected, setSelected] = React.useState<LocationId | null>(null);

  const counts = React.useMemo(() => {
    const map = new Map<LocationId, { lost: number; found: number }>();
    LOCATIONS.forEach((l) => map.set(l.id, { lost: 0, found: 0 }));
    items.forEach((i) => {
      const c = map.get(i.location);
      if (c) c[i.status]++;
    });
    return map;
  }, [items]);

  const visible = React.useMemo(
    () => sortItems(selected ? items.filter((i) => i.location === selected) : items, "newest"),
    [items, selected],
  );

  const busiest = [...LOCATIONS]
    .map((l) => ({ l, total: (counts.get(l.id)?.lost ?? 0) + (counts.get(l.id)?.found ?? 0) }))
    .sort((a, b) => b.total - a.total);

  const selectedLoc = selected ? getLocation(selected) : null;

  return (
    <section id="map" aria-labelledby="map-title" className="container scroll-mt-24 py-16 sm:py-24">
      <SectionHeading
        id="map-title"
        eyebrow="Campus map"
        title="Where items are being found"
        description="Tap a pin to see what's been reported there. Hotspots help you know where to look first."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        {/* Map */}
        <div className="relative overflow-hidden rounded-[32px] border bg-card p-2 shadow-soft">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[26px]">
            <MapBase />
            {LOCATIONS.map((loc, i) => {
              const c = counts.get(loc.id) ?? { lost: 0, found: 0 };
              const total = c.lost + c.found;
              const active = selected === loc.id;
              return (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => setSelected(active ? null : loc.id)}
                  aria-pressed={active}
                  aria-label={`${loc.name}: ${c.lost} lost, ${c.found} found`}
                  className="group absolute -translate-x-1/2 -translate-y-full rounded-full focus-visible:ring-offset-0"
                  style={{ left: `${loc.map.x}%`, top: `${loc.map.y}%` }}
                >
                  {total > 0 && (
                    <span
                      aria-hidden="true"
                      className="anim-ping absolute bottom-0 left-1/2 -ml-3 h-6 w-6 rounded-full bg-primary/40"
                      style={{ "--delay": `${i * 0.35}s` } as React.CSSProperties}
                    />
                  )}
                  <span
                    className={cn(
                      "relative flex flex-col items-center transition-transform duration-300 group-hover:-translate-y-1",
                      active && "-translate-y-1 scale-110",
                    )}
                  >
                    <span
                      className={cn(
                        "flex items-center gap-1 whitespace-nowrap rounded-full border bg-white px-2 py-1 text-[10px] font-semibold shadow-md transition-colors sm:text-xs",
                        active ? "border-primary bg-primary text-primary-foreground" : "text-foreground",
                      )}
                    >
                      <MapPin className="h-3 w-3" aria-hidden="true" />
                      <span className="hidden sm:inline">{loc.name}</span>
                      <span className={cn("tabular-nums", !active && "text-primary")}>{total}</span>
                    </span>
                    <span className={cn("h-2 w-0.5", active ? "bg-primary" : "bg-foreground/40")} />
                    <span className={cn("h-2 w-2 rounded-full border-2 border-white", active ? "bg-primary" : "bg-foreground/60")} />
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Panel */}
        <div className="flex flex-col rounded-[32px] border bg-card p-5 shadow-soft sm:p-6" aria-live="polite">
          {selectedLoc ? (
            <>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Showing items at</p>
                  <h3 className="mt-1 font-display text-2xl font-bold">{selectedLoc.name}</h3>
                </div>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full" onClick={() => setSelected(null)} aria-label="Clear location filter">
                  <X className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
              <div className="mt-3 flex gap-2 text-sm">
                <span className="inline-flex items-center gap-1 rounded-full bg-lost-soft px-2.5 py-1 font-medium text-lost-foreground">
                  <CircleAlert className="h-3.5 w-3.5" aria-hidden="true" /> {counts.get(selectedLoc.id)?.lost ?? 0} lost
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-found-soft px-2.5 py-1 font-medium text-found-foreground">
                  <PackageCheck className="h-3.5 w-3.5" aria-hidden="true" /> {counts.get(selectedLoc.id)?.found ?? 0} found
                </span>
              </div>
              <ul className="mt-5 grid gap-2">
                {visible.slice(0, 4).map((item) => (
                  <li key={item.id} className="animate-in fade-in slide-in-from-bottom-1 duration-300">
                    <Link
                      to={hrefFor(item.id)}
                      preventScrollReset
                      className="flex items-center gap-3 rounded-2xl border border-transparent p-2 transition-colors hover:border-border hover:bg-muted/60"
                    >
                      <span className="h-12 w-12 shrink-0 overflow-hidden rounded-xl">
                        <ItemIllustration art={item.art} category={item.category} color={item.color} image={item.image} alt="" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-medium">{item.title}</span>
                        <span className="block text-xs text-muted-foreground">
                          {item.status === "lost" ? "Lost" : "Found"} · {formatRelativeDay(item.date)}
                        </span>
                      </span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
                {visible.length === 0 && (
                  <li className="rounded-2xl border border-dashed p-4 text-sm text-muted-foreground">
                    Nothing reported here yet — good news!
                  </li>
                )}
              </ul>
              <Button asChild className="mt-auto w-full rounded-full" size="lg">
                <Link to={`/browse?location=${selectedLoc.id}`}>
                  View all at {selectedLoc.name}
                  <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1" aria-hidden="true" />
                </Link>
              </Button>
            </>
          ) : (
            <>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Hotspots this week</p>
              <h3 className="mt-1 font-display text-2xl font-bold">Pick a location</h3>
              <ul className="mt-4 grid gap-1.5">
                {busiest.slice(0, 6).map(({ l, total }, i) => (
                  <li key={l.id}>
                    <button
                      type="button"
                      onClick={() => setSelected(l.id)}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-muted/70"
                    >
                      <span className="w-5 font-display text-sm font-bold text-muted-foreground tabular-nums">{i + 1}</span>
                      <span className="flex-1 font-medium">{l.name}</span>
                      <span className="h-1.5 w-20 overflow-hidden rounded-full bg-muted" aria-hidden="true">
                        <span className="block h-full rounded-full bg-primary" style={{ width: `${(total / Math.max(1, busiest[0].total)) * 100}%` }} />
                      </span>
                      <span className="w-6 text-right text-sm tabular-nums text-muted-foreground">{total}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

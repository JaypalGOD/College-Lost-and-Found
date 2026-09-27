import { CircleAlert, PackageCheck } from "lucide-react";
import { getLocation } from "@/data/locations";
import { useItems } from "@/lib/items-store";
import { sortItems } from "@/lib/filters";

/** Live-feed style marquee of the latest reports (replaces the agency brand slider). */
export function CampusTicker() {
  const { items } = useItems();
  const latest = sortItems(items, "newest").slice(0, 10);
  const loop = [...latest, ...latest];

  return (
    <section aria-label="Latest reports" className="relative border-y bg-card/60 py-4 backdrop-blur">
      <div className="container flex items-center gap-6">
        <p className="hidden shrink-0 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground md:block">
          Just reported
        </p>
        <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
          <ul className="anim-marquee flex w-max gap-3 hover:[animation-play-state:paused]">
            {loop.map((item, i) => {
              const Icon = item.status === "lost" ? CircleAlert : PackageCheck;
              return (
                <li
                  key={`${item.id}-${i}`}
                  aria-hidden={i >= latest.length}
                  className="flex shrink-0 items-center gap-2 rounded-full border bg-background px-3.5 py-1.5 text-sm"
                >
                  <Icon
                    className={item.status === "lost" ? "h-4 w-4 text-lost" : "h-4 w-4 text-found"}
                    aria-hidden="true"
                  />
                  <span className="font-semibold">{item.status === "lost" ? "Lost" : "Found"}</span>
                  <span className="text-foreground/80">{item.title}</span>
                  <span className="text-muted-foreground">· {getLocation(item.location).name}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

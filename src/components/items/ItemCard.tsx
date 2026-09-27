import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { getCategory } from "@/data/categories";
import { getLocation } from "@/data/locations";
import { formatRelativeDay } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { LostFoundItem } from "@/types/item";
import { ItemIllustration } from "./ItemIllustration";
import { StatusBadge } from "./StatusBadge";

/** Builds a link that opens the item details dialog on top of the current page. */
export function useItemHref() {
  const location = useLocation();
  return (id: string) => {
    const params = new URLSearchParams(location.search);
    params.set("item", id);
    return { pathname: location.pathname, search: `?${params.toString()}` };
  };
}

export function ItemCard({ item, className }: { item: LostFoundItem; className?: string }) {
  const hrefFor = useItemHref();
  const category = getCategory(item.category);
  const CategoryIcon = category.icon;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-soft transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-primary/25 hover:shadow-lift focus-within:border-primary/40",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <ItemIllustration
          art={item.art}
          category={item.category}
          color={item.color}
          image={item.image}
          alt={`Illustration of ${item.title}`}
          className="transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        <StatusBadge status={item.status} className="absolute left-3 top-3 shadow-sm" />
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/85 px-2.5 py-0.5 text-xs font-medium text-foreground/80 backdrop-blur">
          <CategoryIcon className="h-3.5 w-3.5" aria-hidden="true" />
          {category.label}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="font-display text-lg font-semibold leading-snug">
          <Link
            to={hrefFor(item.id)}
            preventScrollReset
            className="after:absolute after:inset-0 after:content-[''] focus:outline-none"
          >
            {item.title}
          </Link>
        </h3>
        <dl className="grid gap-1.5 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <dt className="sr-only">Location</dt>
            <MapPin className="h-4 w-4 shrink-0 text-primary/70" aria-hidden="true" />
            <dd className="truncate">{getLocation(item.location).name}</dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="sr-only">Date</dt>
            <CalendarDays className="h-4 w-4 shrink-0 text-primary/70" aria-hidden="true" />
            <dd>{formatRelativeDay(item.date)}</dd>
          </div>
        </dl>
        <div className="mt-auto flex items-center justify-between border-t border-dashed pt-3 text-sm font-medium">
          <span className="text-primary">View Details</span>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-accent text-primary transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </div>
    </article>
  );
}

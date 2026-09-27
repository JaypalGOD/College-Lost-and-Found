import type { ReactNode } from "react";
import { SearchX } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import type { LostFoundItem } from "@/types/item";
import { ItemCard } from "./ItemCard";

export function ItemGrid({
  items,
  className,
  emptyAction,
}: {
  items: LostFoundItem[];
  className?: string;
  emptyAction?: ReactNode;
}) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed bg-card/60 px-6 py-16 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent text-primary">
          <SearchX className="h-6 w-6" aria-hidden="true" />
        </span>
        <h3 className="mt-4 font-display text-xl font-semibold">No items match your search</h3>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          Try a different keyword or clear a filter. If you still can't find it, report it so others can help.
        </p>
        {emptyAction && <div className="mt-5">{emptyAction}</div>}
      </div>
    );
  }

  return (
    <ul className={cn("grid gap-5 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {items.map((item, i) => (
        <Reveal as="li" key={item.id} delay={(i % 6) * 70}>
          <ItemCard item={item} />
        </Reveal>
      ))}
    </ul>
  );
}

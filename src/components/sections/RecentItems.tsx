import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ItemGrid } from "@/components/items/ItemGrid";
import { Button } from "@/components/ui/button";
import { useItems } from "@/lib/items-store";
import { sortItems } from "@/lib/filters";
import { SectionHeading } from "./SectionHeading";

/** The six featured items from the brief, newest first. */
const FEATURED = ["itm-1001", "itm-1002", "itm-1003", "itm-1004", "itm-1005", "itm-1006"];

export function RecentItems() {
  const { items } = useItems();
  const mine = items.filter((i) => i.ownedByMe);
  const featured = FEATURED.map((id) => items.find((i) => i.id === id)).filter(
    (i): i is NonNullable<typeof i> => Boolean(i),
  );
  const shown = sortItems([...mine, ...featured], "newest").slice(0, 6);

  return (
    <section aria-labelledby="recent-title" className="container py-14 sm:py-20">
      <SectionHeading
        id="recent-title"
        eyebrow="Live feed"
        title="Recently Reported"
        description="Fresh reports from across campus. Spot something familiar? Open it to see details."
        align="left"
        action={
          <Button asChild variant="outline" className="shrink-0 rounded-full">
            <Link to="/browse">
              View all items <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1" aria-hidden="true" />
            </Link>
          </Button>
        }
      />
      <ItemGrid items={shown} className="mt-10" />
    </section>
  );
}

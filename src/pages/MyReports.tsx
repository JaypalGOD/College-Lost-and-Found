import { CircleAlert, HandHelping, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { ItemGrid } from "@/components/items/ItemGrid";
import { Button } from "@/components/ui/button";
import { useItems } from "@/lib/items-store";
import { sortItems } from "@/lib/filters";
import { PageHeader } from "./PageHeader";

export default function MyReports() {
  const { items } = useItems();
  const mine = sortItems(items.filter((i) => i.ownedByMe), "newest");

  return (
    <>
      <PageHeader eyebrow="Your profile" title="My reports" description="Everything you've posted from this device. Open a report to see possible matches.">
        <div className="mt-6 flex items-center gap-3 rounded-2xl border bg-card/80 p-3 pr-5 shadow-soft sm:inline-flex">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-primary to-violet-500 text-white">
            <UserRound className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="font-semibold">Student account</p>
            <p className="text-sm text-muted-foreground">{mine.length} {mine.length === 1 ? "report" : "reports"}</p>
          </div>
        </div>
      </PageHeader>
      <div className="container pb-16">
        {mine.length > 0 ? (
          <ItemGrid items={mine} />
        ) : (
          <div className="flex flex-col items-center rounded-3xl border border-dashed bg-card/60 px-6 py-16 text-center">
            <h2 className="font-display text-2xl font-semibold">No reports yet</h2>
            <p className="mt-2 max-w-sm text-muted-foreground">When you report a lost or found item, it'll show up here.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/report?type=lost"><CircleAlert className="h-4 w-4" aria-hidden="true" /> Report Lost</Link>
              </Button>
              <Button asChild className="rounded-full">
                <Link to="/report?type=found"><HandHelping className="h-4 w-4" aria-hidden="true" /> I Found Something</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

import { useId } from "react";
import { ArrowRight, CalendarDays, MapPin, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useItemHref } from "@/components/items/ItemCard";
import { ItemIllustration } from "@/components/items/ItemIllustration";
import { StatusBadge } from "@/components/items/StatusBadge";
import { getLocation } from "@/data/locations";
import { formatRelativeDay } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { ItemMatch } from "@/types/item";

function SimilarityMeter({ score }: { score: number }) {
  const tone = score >= 75 ? "High" : score >= 55 ? "Medium" : "Possible";
  return (
    <div className="grid gap-1.5">
      <div className="flex items-center justify-between text-xs font-medium">
        <span className="text-muted-foreground">{tone} similarity</span>
        <span className="tabular-nums text-foreground">{score}%</span>
      </div>
      <div
        className="h-2 overflow-hidden rounded-full bg-muted"
        role="meter"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={score}
        aria-label="Similarity score"
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary via-violet-500 to-[hsl(var(--lime))] transition-[width] duration-1000 ease-out"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

export function MatchCard({ match, className }: { match: ItemMatch; className?: string }) {
  const hrefFor = useItemHref();
  const { item, score, reasons } = match;
  return (
    <article className={cn("group flex gap-4 rounded-2xl border bg-card p-3 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-lift", className)}>
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl sm:h-28 sm:w-28">
        <ItemIllustration art={item.art} category={item.category} color={item.color} image={item.image} alt={`Illustration of ${item.title}`} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Possible match
          </span>
          <StatusBadge status={item.status} className="text-[10px]" />
        </div>
        <h4 className="truncate font-display text-base font-semibold">{item.title}</h4>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" aria-hidden="true" />{getLocation(item.location).name}</span>
          <span className="inline-flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />{formatRelativeDay(item.date)}</span>
        </p>
        <SimilarityMeter score={score} />
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="truncate text-xs text-muted-foreground">{reasons.slice(0, 2).join(" · ")}</p>
          <Link
            to={hrefFor(item.id)}
            preventScrollReset
            className="inline-flex items-center gap-1 rounded-full text-sm font-semibold text-primary hover:underline"
          >
            View Match <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function PossibleMatches({
  matches,
  title = "Possible Matches",
  description,
  emptyText = "No similar reports yet. We'll keep your report visible so anyone who finds it can reach you.",
  className,
}: {
  matches: ItemMatch[];
  title?: string;
  description?: string;
  emptyText?: string;
  className?: string;
}) {
  const headingId = useId();
  return (
    <section aria-labelledby={headingId} className={cn("grid gap-4", className)}>
      <div>
        <h3 id={headingId} className="font-display text-xl font-semibold">{title}</h3>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {matches.length > 0 ? (
        <div className="grid gap-3">
          {matches.map((m, i) => (
            <div key={m.item.id} className="anim-pop" style={{ animationDelay: `${i * 90}ms` }}>
              <MatchCard match={m} />
            </div>
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed p-5 text-sm text-muted-foreground">
          {emptyText}
        </p>
      )}
    </section>
  );
}

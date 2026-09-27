import * as React from "react";
import {
  BadgeCheck,
  CalendarDays,
  CircleCheck,
  Clock,
  Hand,
  Lock,
  MapPin,
  MessageCircle,
  Send,
  Tag,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { PossibleMatches } from "@/components/report/PossibleMatches";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getCategory } from "@/data/categories";
import { getLocation } from "@/data/locations";
import { formatLongDate, formatRelativeDay, formatTime } from "@/lib/format";
import { useItems } from "@/lib/items-store";
import { findPossibleMatches } from "@/lib/matching";
import type { LostFoundItem } from "@/types/item";
import { ItemIllustration } from "./ItemIllustration";
import { StatusBadge } from "./StatusBadge";

type Mode = "idle" | "contact" | "claim" | "sent";

function Detail({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-muted/60 p-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
      <div className="min-w-0">
        <dt className="text-xs text-muted-foreground">{label}</dt>
        <dd className="truncate text-sm font-medium">{value}</dd>
      </div>
    </div>
  );
}

function ContactPanel({ item, mode, setMode }: { item: LostFoundItem; mode: Mode; setMode: (m: Mode) => void }) {
  const [message, setMessage] = React.useState("");
  const isClaim = mode === "claim";

  if (mode === "sent") {
    return (
      <div role="status" className="anim-pop flex items-start gap-3 rounded-2xl border border-found/25 bg-found-soft p-4 text-found-foreground">
        <CircleCheck className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
        <div className="text-sm">
          <p className="font-semibold">Message sent to {item.reporter?.name ?? "the reporter"}.</p>
          <p className="mt-0.5 opacity-90">You'll get a notification when they reply. Arrange hand-overs at a staffed help desk.</p>
        </div>
      </div>
    );
  }

  if (mode === "idle") return null;

  const placeholder = isClaim
    ? item.status === "found"
      ? "Describe something only the owner would know — a sticker, a scratch, what's inside, the lock-screen wallpaper…"
      : "Describe where and when you found it, and where it is now."
    : "Hi! I saw your report and wanted to ask…";

  return (
    <form
      className="anim-pop grid gap-3 rounded-2xl border bg-card p-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (message.trim().length < 5) return;
        setMode("sent");
      }}
    >
      <Label htmlFor="contact-msg" className="font-semibold">
        {isClaim ? (item.status === "found" ? "Prove it's yours" : "Tell them you found it") : `Message ${item.reporter?.name ?? "reporter"}`}
      </Label>
      <Textarea
        id="contact-msg"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={placeholder}
        required
        minLength={5}
        autoFocus
      />
      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Lock className="h-3.5 w-3.5" aria-hidden="true" />
        Sent through Campus Lost & Found — your phone number and email stay private.
      </p>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="ghost" onClick={() => setMode("idle")}>Cancel</Button>
        <Button type="submit">
          <Send className="h-4 w-4 group-hover/btn:translate-x-0.5" aria-hidden="true" />
          Send
        </Button>
      </div>
    </form>
  );
}

export function ItemDetailsDialog() {
  const [params, setParams] = useSearchParams();
  const { items, getItem } = useItems();
  const id = params.get("item");
  const item = id ? getItem(id) : undefined;
  const [mode, setMode] = React.useState<Mode>("idle");

  React.useEffect(() => setMode("idle"), [id]);

  const close = () => {
    const next = new URLSearchParams(params);
    next.delete("item");
    setParams(next, { preventScrollReset: true });
  };

  const matches = React.useMemo(() => (item ? findPossibleMatches(item, items, 2) : []), [item, items]);

  return (
    <Dialog open={Boolean(item)} onOpenChange={(open) => !open && close()}>
      {item && (
        <DialogContent className="max-w-3xl gap-0 p-0 sm:rounded-3xl">
          <div className="grid md:grid-cols-[1.05fr_1fr]">
            <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-full md:rounded-l-3xl">
              <ItemIllustration
                art={item.art}
                category={item.category}
                color={item.color}
                image={item.image}
                alt={`Illustration of ${item.title}`}
              />
              <StatusBadge status={item.status} className="absolute left-4 top-4 px-3 py-1 text-sm shadow" />
            </div>

            <div className="grid content-start gap-5 p-6 sm:p-7">
              <div className="pr-8">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {item.status === "lost" ? "Reported lost" : "Reported found"} · {formatRelativeDay(item.date)}
                </p>
                <DialogTitle className="mt-2">{item.title}</DialogTitle>
                <DialogDescription className="mt-2 text-[0.95rem] leading-relaxed text-foreground/75">
                  {item.description}
                </DialogDescription>
              </div>

              <dl className="grid grid-cols-2 gap-2.5">
                <Detail icon={Tag} label="Category" value={getCategory(item.category).label} />
                <Detail icon={MapPin} label="Location" value={getLocation(item.location).name} />
                <Detail icon={CalendarDays} label="Date" value={formatLongDate(item.date)} />
                <Detail icon={Clock} label="Approx. time" value={formatTime(item.time) ?? "Not specified"} />
              </dl>

              {item.reporter && (
                <div className="flex items-center gap-3 rounded-2xl border p-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-primary to-violet-500 font-display text-sm font-bold text-white" aria-hidden="true">
                    {item.reporter.name.slice(0, 1)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-1 text-sm font-semibold">
                      {item.reporter.name}
                      {item.reporter.verified && (
                        <BadgeCheck className="h-4 w-4 text-primary" aria-label="Campus verified" />
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {[item.reporter.role, item.reporter.department].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                  <Lock className="h-4 w-4 text-muted-foreground" aria-label="Contact details hidden for privacy" />
                </div>
              )}

              <ContactPanel item={item} mode={mode} setMode={setMode} />

              {mode === "idle" && (
                <div className="grid gap-2 sm:grid-cols-2">
                  <Button size="lg" className="rounded-full px-4" onClick={() => setMode("claim")}>
                    <Hand className="h-4 w-4 group-hover/btn:-rotate-12" aria-hidden="true" />
                    {item.status === "found" ? "I think this is mine" : "I found this"}
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-full px-4" onClick={() => setMode("contact")}>
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    Contact reporter
                  </Button>
                </div>
              )}
            </div>
          </div>

          {matches.length > 0 && (
            <div className="border-t bg-muted/40 p-6 sm:p-7 md:rounded-b-3xl">
              <PossibleMatches
                matches={matches}
                title={item.status === "lost" ? "Found items that might be this" : "Lost reports that might match"}
              />
            </div>
          )}
        </DialogContent>
      )}
    </Dialog>
  );
}

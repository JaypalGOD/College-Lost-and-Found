import * as React from "react";
import {
  ArrowRight,
  CircleAlert,
  HandHelping,
  ImagePlus,
  Loader2,
  Lock,
  RotateCcw,
  Send,
  Sparkles,
  Trash2,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { ItemCard } from "@/components/items/ItemCard";
import { defaultArtFor } from "@/components/items/ItemIllustration";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { CATEGORIES } from "@/data/categories";
import { LOCATIONS } from "@/data/locations";
import { todayISO } from "@/lib/format";
import { useItems } from "@/lib/items-store";
import { detectColor, findPossibleMatches } from "@/lib/matching";
import { cn } from "@/lib/utils";
import type { ItemCategory, ItemStatus, LocationId, LostFoundItem, NewItemReport } from "@/types/item";
import { PossibleMatches } from "./PossibleMatches";

interface FormState {
  status: ItemStatus;
  title: string;
  category: ItemCategory | "";
  description: string;
  location: LocationId | "";
  date: string;
  time: string;
  image?: string;
  details: string;
}

type Errors = Partial<Record<"title" | "category" | "location" | "date" | "image", string>>;

const MAX_IMAGE_MB = 5;

function emptyForm(status: ItemStatus): FormState {
  return { status, title: "", category: "", description: "", location: "", date: todayISO(), time: "", details: "", image: undefined };
}

function toReport(f: FormState): NewItemReport | null {
  if (!f.category || !f.location) return null;
  const text = `${f.title} ${f.description}`;
  return {
    status: f.status,
    title: f.title.trim(),
    description: [f.description.trim(), f.status === "lost" ? f.details.trim() : ""].filter(Boolean).join("\n\n") ||
      "No description provided.",
    category: f.category,
    location: f.location,
    date: f.date,
    time: f.time || undefined,
    image: f.image,
    art: defaultArtFor(f.category),
    color: detectColor(text),
    tags: f.title.toLowerCase().split(/\s+/).filter((w) => w.length > 2),
    reporter: { name: "You", role: "Student", verified: true },
    ownedByMe: true,
  };
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="flex items-center gap-1.5 text-sm font-medium text-destructive">
      <CircleAlert className="h-3.5 w-3.5" aria-hidden="true" />
      {message}
    </p>
  );
}

function StatusChoice({ value, onChange }: { value: ItemStatus; onChange: (s: ItemStatus) => void }) {
  const options = [
    { v: "lost" as const, title: "I lost something", text: "Let the campus know what to look out for.", icon: CircleAlert, on: "border-lost/50 bg-lost-soft/70 ring-lost/30", iconCls: "bg-lost text-white" },
    { v: "found" as const, title: "I found something", text: "Help it find its way back to the owner.", icon: HandHelping, on: "border-found/50 bg-found-soft/70 ring-found/30", iconCls: "bg-found text-white" },
  ];
  return (
    <fieldset>
      <legend className="font-display text-lg font-semibold">What happened?</legend>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {options.map((o) => {
          const Icon = o.icon;
          const checked = value === o.v;
          return (
            <label
              key={o.v}
              className={cn(
                "relative flex cursor-pointer items-start gap-3 rounded-2xl border-2 p-4 transition-all duration-200 hover:-translate-y-0.5 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring",
                checked ? cn("ring-4", o.on) : "border-border bg-background hover:border-primary/30",
              )}
            >
              <input type="radio" name="status" value={o.v} checked={checked} onChange={() => onChange(o.v)} className="sr-only" />
              <span className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors", checked ? o.iconCls : "bg-muted text-muted-foreground")}>
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-semibold">{o.title}</span>
                <span className="block text-sm text-muted-foreground">{o.text}</span>
              </span>
              <span
                aria-hidden="true"
                className={cn(
                  "absolute right-4 top-4 h-5 w-5 rounded-full border-2 transition-all",
                  checked ? "border-[6px] border-foreground" : "border-muted-foreground/40",
                )}
              />
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function ImageUpload({
  value,
  onChange,
  error,
  onError,
}: {
  value?: string;
  onChange: (v?: string) => void;
  error?: string;
  onError: (msg?: string) => void;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = React.useState(false);

  const readFile = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) return onError("Please choose an image file (JPG, PNG, WebP).");
    if (file.size > MAX_IMAGE_MB * 1024 * 1024) return onError(`Images must be under ${MAX_IMAGE_MB} MB.`);
    onError(undefined);
    const reader = new FileReader();
    reader.onload = () => onChange(typeof reader.result === "string" ? reader.result : undefined);
    reader.readAsDataURL(file);
  };

  if (value) {
    return (
      <div className="relative overflow-hidden rounded-2xl border">
        <img src={value} alt="Preview of the uploaded item" className="h-56 w-full object-cover" />
        <Button
          type="button"
          size="sm"
          variant="secondary"
          className="absolute right-3 top-3 rounded-full bg-white/90 backdrop-blur"
          onClick={() => {
            onChange(undefined);
            if (inputRef.current) inputRef.current.value = "";
          }}
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" /> Remove
        </Button>
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        readFile(e.dataTransfer.files?.[0]);
      }}
      className={cn(
        "relative flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-6 py-8 text-center transition-colors",
        dragging ? "border-primary bg-accent" : "border-input bg-muted/40 hover:border-primary/40",
        error && "border-destructive/60",
      )}
    >
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-background text-primary shadow-sm">
        <ImagePlus className="h-5 w-5" aria-hidden="true" />
      </span>
      <p className="text-sm">
        <label htmlFor="image" className="cursor-pointer font-semibold text-primary underline-offset-4 hover:underline">
          Upload a photo
        </label>{" "}
        <span className="text-muted-foreground">or drag and drop</span>
      </p>
      <p className="text-xs text-muted-foreground">JPG, PNG or WebP · up to {MAX_IMAGE_MB} MB · optional</p>
      <input
        ref={inputRef}
        id="image"
        type="file"
        accept="image/*"
        className="sr-only"
        aria-describedby={error ? "image-error" : undefined}
        onChange={(e) => readFile(e.target.files?.[0])}
      />
    </div>
  );
}

function SuccessState({ item, onReset }: { item: LostFoundItem; onReset: () => void }) {
  const { items } = useItems();
  const matches = React.useMemo(() => findPossibleMatches(item, items), [item, items]);
  const headingRef = React.useRef<HTMLHeadingElement>(null);

  React.useEffect(() => {
    headingRef.current?.focus();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
      <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
        <svg viewBox="0 0 64 64" className="anim-pop h-20 w-20" aria-hidden="true">
          <circle cx="32" cy="32" r="30" fill="hsl(var(--found-soft))" />
          <circle cx="32" cy="32" r="25" fill="none" stroke="hsl(var(--found))" strokeWidth="4" strokeLinecap="round" className="anim-check-circle" transform="rotate(-90 32 32)" />
          <path d="M21 33 L29 41 L44 25" fill="none" stroke="hsl(var(--found))" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="anim-check-mark" />
        </svg>
        <h2 ref={headingRef} tabIndex={-1} className="mt-6 font-display text-3xl font-bold tracking-tight focus:outline-none sm:text-4xl" role="status">
          Your report has been posted.
        </h2>
        <p className="mt-3 max-w-md text-muted-foreground">
          {item.status === "lost"
            ? "We'll show it to everyone browsing the campus feed. Check the possible matches — your item might already be waiting."
            : "Thank you for looking out for someone. The owner can now find it and message you privately."}
        </p>
        <div className="mt-8 w-full max-w-sm">
          <ItemCard item={item} />
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start">
          <Button type="button" variant="outline" className="rounded-full" onClick={onReset}>
            <RotateCcw className="h-4 w-4" aria-hidden="true" /> Report another
          </Button>
          <Button asChild className="rounded-full">
            <Link to="/browse">
              Browse items <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
      <div className="rounded-[28px] border bg-muted/40 p-5 sm:p-6">
        <PossibleMatches
          matches={matches}
          description={
            item.status === "lost"
              ? "Found items that look similar to what you reported."
              : "Lost reports that might belong to this item's owner."
          }
        />
      </div>
    </div>
  );
}

export function ReportItemForm() {
  const [params, setParams] = useSearchParams();
  const initialStatus: ItemStatus = params.get("type") === "found" ? "found" : "lost";
  const { items, addItem } = useItems();

  const [form, setForm] = React.useState<FormState>(() => emptyForm(initialStatus));
  const [errors, setErrors] = React.useState<Errors>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [created, setCreated] = React.useState<LostFoundItem | null>(null);

  // Keep the status in sync with navbar links like /report?type=found.
  React.useEffect(() => {
    setForm((f) => (f.status === initialStatus ? f : { ...f, status: initialStatus }));
  }, [initialStatus]);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const setStatus = (s: ItemStatus) => {
    update("status", s);
    const next = new URLSearchParams(params);
    next.set("type", s);
    setParams(next, { replace: true, preventScrollReset: true });
  };

  // Live "possible matches" while typing (deferred so typing stays snappy).
  const deferred = React.useDeferredValue(form);
  const liveMatches = React.useMemo(() => {
    if (deferred.title.trim().length < 3 && deferred.description.trim().length < 6) return [];
    const draft: NewItemReport = {
      ...(toReport({ ...deferred, category: deferred.category || "other", location: deferred.location || "library" }) as NewItemReport),
    };
    // Don't award "same place" / "same category" points for fields the user hasn't picked yet.
    if (!deferred.location) draft.location = "__none__" as LocationId;
    if (!deferred.category) draft.category = "__none__" as ItemCategory;
    return findPossibleMatches(draft, items);
  }, [deferred, items]);

  const validate = (): Errors => {
    const e: Errors = {};
    if (form.title.trim().length < 3) e.title = "Give the item a short name (at least 3 characters).";
    if (!form.category) e.category = "Choose a category.";
    if (!form.location) e.location = "Choose where it was lost or found.";
    if (!form.date) e.date = "Pick a date.";
    else if (form.date > todayISO()) e.date = "The date can't be in the future.";
    return e;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    const firstError = (["title", "category", "location", "date"] as const).find((k) => e[k]);
    if (firstError) {
      const el = document.getElementById(firstError === "category" ? "category-group" : firstError);
      el?.focus();
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const report = toReport(form);
    if (!report) return;
    setSubmitting(true);
    try {
      setCreated(await addItem(report));
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setCreated(null);
    setErrors({});
    setForm(emptyForm(form.status));
  };

  const fillExample = () => {
    setErrors({});
    setForm((f) =>
      f.status === "lost"
        ? { ...f, title: "Black wireless earbuds", category: "electronics", location: "library", description: "Black wireless earbuds lost in library, near the photocopy counter.", time: "15:00" }
        : { ...f, title: "Grey scientific calculator", category: "electronics", location: "engineering-block", description: "Casio calculator left on a bench in Lab 3.", time: "13:30" },
    );
  };

  if (created) return <SuccessState item={created} onReset={reset} />;

  const isLost = form.status === "lost";

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
      <form noValidate onSubmit={onSubmit} className="grid gap-8 rounded-[32px] border bg-card p-5 shadow-soft sm:p-8" aria-describedby="form-intro">
        <p id="form-intro" className="sr-only">Fields marked with an asterisk are required.</p>
        <StatusChoice value={form.status} onChange={setStatus} />

        <div className="grid gap-2">
          <div className="flex items-end justify-between gap-3">
            <Label htmlFor="title">
              Item name <span className="text-destructive" aria-hidden="true">*</span>
            </Label>
            <button type="button" onClick={fillExample} className="inline-flex items-center gap-1 rounded-full text-xs font-semibold text-primary hover:underline">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Fill an example
            </button>
          </div>
          <Input
            id="title"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder={isLost ? "e.g. Black AirPods Pro" : "e.g. Blue water bottle"}
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? "title-error" : undefined}
            required
            className="h-12 rounded-xl text-base"
            maxLength={80}
          />
          <FieldError id="title-error" message={errors.title} />
        </div>

        <fieldset
          id="category-group"
          tabIndex={-1}
          className="grid gap-3 focus:outline-none"
          aria-describedby={errors.category ? "category-error" : undefined}
        >
          <legend className="mb-3 text-sm font-medium">
            Category <span className="text-destructive" aria-hidden="true">*</span>
          </legend>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {CATEGORIES.map((c) => {
              const Icon = c.icon;
              const checked = form.category === c.id;
              return (
                <label
                  key={c.id}
                  className={cn(
                    "flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:border-primary/40 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring",
                    checked ? "border-primary bg-accent text-accent-foreground shadow-sm" : "bg-background",
                  )}
                >
                  <input type="radio" name="category" value={c.id} checked={checked} onChange={() => update("category", c.id)} className="sr-only" />
                  <Icon className={cn("h-4 w-4 shrink-0 transition-transform", checked ? "scale-110 text-primary" : "text-muted-foreground")} aria-hidden="true" />
                  <span className="truncate">{c.label}</span>
                </label>
              );
            })}
          </div>
          <FieldError id="category-error" message={errors.category} />
        </fieldset>

        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            placeholder={isLost ? "Colour, brand, stickers, case… anything that helps someone recognise it." : "What does it look like? Where exactly was it? Where is it now?"}
            maxLength={600}
            className="rounded-xl"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <div className="grid gap-2 sm:col-span-3 md:col-span-1">
            <Label htmlFor="location">
              Location <span className="text-destructive" aria-hidden="true">*</span>
            </Label>
            <NativeSelect
              id="location"
              value={form.location}
              onChange={(e) => update("location", e.target.value as LocationId)}
              aria-invalid={Boolean(errors.location)}
              aria-describedby={errors.location ? "location-error" : undefined}
              className="h-11 rounded-xl"
              required
            >
              <option value="" disabled>
                Select a place
              </option>
              {LOCATIONS.map((l) => (
                <option key={l.id} value={l.id}>{l.name}</option>
              ))}
            </NativeSelect>
            <FieldError id="location-error" message={errors.location} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="date">
              Date <span className="text-destructive" aria-hidden="true">*</span>
            </Label>
            <Input
              id="date"
              type="date"
              value={form.date}
              max={todayISO()}
              onChange={(e) => update("date", e.target.value)}
              aria-invalid={Boolean(errors.date)}
              aria-describedby={errors.date ? "date-error" : undefined}
              className="h-11 rounded-xl"
              required
            />
            <FieldError id="date-error" message={errors.date} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="time">Approximate time</Label>
            <Input id="time" type="time" value={form.time} onChange={(e) => update("time", e.target.value)} className="h-11 rounded-xl" />
          </div>
        </div>

        <div className="grid gap-2">
          <span className="text-sm font-medium" id="image-label">Photo</span>
          <ImageUpload
            value={form.image}
            onChange={(v) => update("image", v)}
            error={errors.image}
            onError={(msg) => setErrors((e) => ({ ...e, image: msg }))}
          />
          <FieldError id="image-error" message={errors.image} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="details">Additional details</Label>
          <Textarea
            id="details"
            value={form.details}
            onChange={(e) => update("details", e.target.value)}
            placeholder={isLost ? "Serial number, lock-screen wallpaper, what's inside…" : "Any identifying marks you noticed. Kept private and used to verify the owner."}
            maxLength={400}
            className="min-h-[80px] rounded-xl"
            aria-describedby="details-hint"
          />
          <p id="details-hint" className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Lock className="h-3.5 w-3.5" aria-hidden="true" />
            {isLost
              ? "Shown on your report. Leave out anything you'd use to prove ownership."
              : "Never shown publicly — used only to check a claimant really is the owner."}
          </p>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">Only your first name and department are shown on the report.</p>
          <Button type="submit" size="xl" disabled={submitting} className="min-w-[190px]">
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Publishing…
              </>
            ) : (
              <>
                Publish Report <Send className="h-4 w-4 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" aria-hidden="true" />
              </>
            )}
          </Button>
        </div>
      </form>

      <aside className="lg:sticky lg:top-24 lg:self-start" aria-label="Possible matches">
        <div className="rounded-[32px] border bg-gradient-to-b from-accent/70 to-card p-5 sm:p-6">
          <PossibleMatches
            matches={liveMatches}
            emptyText={
              form.title.trim().length < 3
                ? "Start typing the item name and description — similar reports will appear here instantly."
                : "No similar reports yet. Once you publish, anyone who finds it can reach you."
            }
            description={
              isLost
                ? "As you describe your item, we'll check it against things people have found."
                : "As you describe what you found, we'll check it against lost reports."
            }
          />
        </div>
      </aside>
    </div>
  );
}

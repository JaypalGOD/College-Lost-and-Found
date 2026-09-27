import { ArrowRight, CircleAlert, HandHelping, LayoutGrid, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

interface Action {
  title: string;
  text: string;
  cta: string;
  to: string;
  icon: LucideIcon;
  tone: string;
  glow: string;
}

const ACTIONS: Action[] = [
  {
    title: "Report Lost Item",
    text: "Tell the campus community what you lost.",
    cta: "Report Lost Item",
    to: "/report?type=lost",
    icon: CircleAlert,
    tone: "bg-lost-soft text-lost",
    glow: "from-[hsl(14_90%_70%/0.25)]",
  },
  {
    title: "I Found Something",
    text: "Help return something to its owner.",
    cta: "Report Found Item",
    to: "/report?type=found",
    icon: HandHelping,
    tone: "bg-found-soft text-found",
    glow: "from-[hsl(160_70%_55%/0.22)]",
  },
  {
    title: "Browse Items",
    text: "Explore recently reported items.",
    cta: "Browse Lost & Found",
    to: "/browse",
    icon: LayoutGrid,
    tone: "bg-accent text-primary",
    glow: "from-[hsl(243_90%_70%/0.25)]",
  },
];

export function QuickActions() {
  return (
    <section aria-label="Quick actions" className="container relative z-10 py-14 sm:py-20">
      <ul className="grid gap-5 md:grid-cols-3">
        {ACTIONS.map((a, i) => {
          const Icon = a.icon;
          return (
            <Reveal as="li" key={a.title} delay={i * 90}>
              <Link
                to={a.to}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-card p-6 shadow-soft transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-lift sm:p-7"
              >
                <div
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(closest-side,var(--tw-gradient-from),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                    a.glow,
                  )}
                />
                <span className={cn("grid h-14 w-14 place-items-center rounded-2xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110", a.tone)}>
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-bold tracking-tight">{a.title}</h3>
                <p className="mt-2 text-muted-foreground">{a.text}</p>
                <span className="mt-8 inline-flex items-center gap-2 font-semibold text-foreground">
                  {a.cta}
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-foreground text-background transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </span>
              </Link>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}

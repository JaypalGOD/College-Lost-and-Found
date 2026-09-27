import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";

const GROUPS: { title: string; links: { label: string; to: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Browse Items", to: "/browse" },
      { label: "Report Lost", to: "/report?type=lost" },
      { label: "Report Found", to: "/report?type=found" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "How It Works", to: "/#how-it-works" },
      { label: "About", to: "/#about" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", to: "/privacy" },
      { label: "Terms", to: "/terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-10 border-t bg-card/60">
      <div className="container grid gap-10 py-14 md:grid-cols-[1.4fr_2fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            The simplest way for your campus to report, find and return lost belongings.
          </p>
          <p className="mt-6 inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1.5 text-sm font-medium">
            Made for students, by students.
            <Heart className="h-4 w-4 fill-lost text-lost" aria-hidden="true" />
          </p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {GROUPS.map((g) => (
            <div key={g.title}>
              <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{g.title}</h2>
              <ul className="mt-4 grid gap-2.5">
                {g.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="border-t">
        <div className="container flex flex-col gap-2 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Campus Lost &amp; Found</p>
          <p>Hand over items at a staffed help desk whenever possible.</p>
        </div>
      </div>
    </footer>
  );
}

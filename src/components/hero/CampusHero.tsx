import { ArrowRight, CircleAlert, HandHelping, Headphones, IdCard, KeyRound } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CampusAnimation } from "./CampusAnimation";
import { HeroSearch } from "./HeroSearch";

export default function CampusHero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      {/* Backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-campus-grid absolute inset-0" />
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,hsl(243_90%_80%/0.45),transparent)]" />
        <div className="absolute -right-32 top-24 h-[460px] w-[460px] rounded-full bg-[radial-gradient(closest-side,hsl(82_80%_70%/0.28),transparent)]" />
      </div>

      <div className="container pb-12 pt-8 sm:pt-12 lg:pb-16 lg:pt-14">
        <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_1fr] lg:gap-12">
          <div className="page-enter text-center lg:text-left">
            <span className="eyebrow">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Campus Lost &amp; Found
            </span>

            <h1
              id="hero-title"
              className="mt-5 text-balance font-display text-[2.6rem] font-extrabold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-[4.4rem]"
            >
              Lost something on campus?{" "}
              <span className="relative inline-block bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                Let&apos;s get it back.
                <svg aria-hidden="true" viewBox="0 0 300 14" className="absolute -bottom-2 left-0 h-3 w-full text-[hsl(var(--lime))]" preserveAspectRatio="none">
                  <path d="M2 10 Q 80 2 150 7 T 298 5" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground lg:mx-0">
              Report lost items, post things you&apos;ve found, and help your campus community reunite with what matters.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Button asChild size="xl" className="w-full sm:w-auto">
                <Link to="/report?type=lost">
                  <CircleAlert className="h-[18px] w-[18px]" aria-hidden="true" />
                  Report Lost Item
                </Link>
              </Button>
              <Button asChild size="xl" variant="dark" className="w-full sm:w-auto">
                <Link to="/report?type=found">
                  <HandHelping className="h-[18px] w-[18px] group-hover/btn:-rotate-12" aria-hidden="true" />
                  I Found Something
                </Link>
              </Button>
            </div>
            <Link
              to="/browse"
              className="group mt-4 inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-sm font-semibold text-primary"
            >
              Browse Lost &amp; Found
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>

            <div className="mt-8 flex items-center justify-center gap-3 lg:justify-start">
              <div className="flex -space-x-2" aria-hidden="true">
                {[
                  { Icon: Headphones, cls: "bg-accent text-primary" },
                  { Icon: IdCard, cls: "bg-lost-soft text-lost" },
                  { Icon: KeyRound, cls: "bg-found-soft text-found" },
                ].map(({ Icon, cls }, i) => (
                  <span key={i} className={`grid h-9 w-9 place-items-center rounded-full border-2 border-background ${cls}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                ))}
              </div>
              <p className="text-left text-sm text-muted-foreground">
                <strong className="font-semibold text-foreground">947 items</strong> reunited with
                <br className="sm:hidden" /> their owners this year
              </p>
            </div>
          </div>

          <div className="page-enter relative mx-auto w-full max-w-[620px] [animation-delay:120ms]">
            <div aria-hidden="true" className="absolute -inset-4 -z-10 rounded-[44px] bg-gradient-to-br from-primary/20 via-violet-300/20 to-[hsl(var(--lime)/0.25)] blur-2xl" />
            <div className="rounded-[40px] border border-white/80 bg-white/60 p-2 shadow-lift backdrop-blur">
              <CampusAnimation />
            </div>
          </div>
        </div>

        <HeroSearch className="page-enter mx-auto mt-10 max-w-5xl [animation-delay:220ms] lg:mt-14" />
      </div>
    </section>
  );
}

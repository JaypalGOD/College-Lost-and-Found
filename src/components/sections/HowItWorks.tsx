import type { CSSProperties } from "react";
import { FilePenLine, Handshake, ScanSearch, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "./SectionHeading";

const STEPS: { n: string; title: string; text: string; icon: LucideIcon; tone: string }[] = [
  { n: "01", title: "Report", text: "Tell us what you lost or found.", icon: FilePenLine, tone: "from-primary to-violet-500" },
  { n: "02", title: "Discover", text: "Browse reports and possible matches.", icon: ScanSearch, tone: "from-violet-500 to-fuchsia-500" },
  { n: "03", title: "Reconnect", text: "Contact the reporter and safely reunite with the item.", icon: Handshake, tone: "from-emerald-500 to-lime-400" },
];

function Connector({ delay }: { delay: number }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 120 24" className="absolute -right-[60px] top-[52px] hidden h-6 w-[120px] md:block" style={{ zIndex: 1 }}>
      <path d="M4 12 H104" stroke="hsl(var(--primary) / 0.35)" strokeWidth="2" strokeLinecap="round" className="anim-dash" fill="none" />
      <path d="M100 6 L110 12 L100 18" stroke="hsl(var(--primary) / 0.55)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle r="4" cy="12" fill="hsl(var(--primary))" className="anim-travel" style={{ "--delay": `${delay}s` } as CSSProperties} />
    </svg>
  );
}

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="scroll-mt-24 bg-gradient-to-b from-transparent via-accent/50 to-transparent py-16 sm:py-24">
      <div className="container">
        <SectionHeading
          id="how-title"
          eyebrow="How it works"
          title="Three steps from lost to found"
          description="No sign-up forms, no notice boards. Just a faster way for your campus to look out for each other."
        />
        <ol className="mt-14 grid gap-6 md:grid-cols-3 md:gap-[60px]">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal as="li" key={s.n} delay={i * 140} className="relative">
                <div className="group relative h-full rounded-3xl border bg-card p-7 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <div className="relative mx-auto h-[88px] w-[88px]">
                    <span aria-hidden="true" className={`absolute inset-0 rounded-[28px] bg-gradient-to-br ${s.tone} opacity-20 blur-md transition-opacity group-hover:opacity-40`} />
                    <span
                      className={`anim-float relative grid h-full w-full place-items-center rounded-[28px] bg-gradient-to-br ${s.tone} text-white shadow-lg`}
                      style={{ "--delay": `${-i * 1.5}s` } as CSSProperties}
                    >
                      <Icon className="h-9 w-9" aria-hidden="true" />
                    </span>
                  </div>
                  <p className="mt-6 font-display text-sm font-bold tracking-[0.2em] text-primary">{s.n}</p>
                  <h3 className="mt-1 font-display text-2xl font-bold">{s.title}</h3>
                  <p className="mx-auto mt-2 max-w-[16rem] text-muted-foreground">{s.text}</p>
                </div>
                {i < STEPS.length - 1 && <Connector delay={i * 0.8} />}
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

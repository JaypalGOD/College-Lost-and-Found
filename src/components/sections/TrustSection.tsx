import { BadgeCheck, EyeOff, Timer, Users, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const INDICATORS: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: BadgeCheck, title: "Campus verified", text: "Reporters sign in with their college account, so you know who you're talking to." },
  { icon: Users, title: "Community powered", text: "Students, faculty, staff and help desks all post to one shared feed." },
  { icon: EyeOff, title: "Privacy focused", text: "Phone numbers and emails stay hidden. Messages go through the platform." },
  { icon: Timer, title: "Fast reporting", text: "A report takes under a minute — add a photo and you're done." },
];

export function TrustSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-24 py-16 sm:py-24">
      <div className="container grid items-start gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28">
          <span className="eyebrow">About</span>
          <h2 id="about-title" className="section-title mt-4 text-balance">
            Built for campus communities
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
            Every semester, hundreds of water bottles, ID cards, chargers and calculators go missing between
            classes. Campus Lost &amp; Found replaces scattered WhatsApp forwards and dusty help-desk boxes with a
            single place where students, faculty and staff can report, search and return belongings.
          </p>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Hand-overs happen in person — ideally at a staffed desk like the library counter or security office —
            and owners confirm details only they would know before anything changes hands.
          </p>
        </Reveal>

        <ul className="grid gap-4 sm:grid-cols-2">
          {INDICATORS.map((t, i) => {
            const Icon = t.icon;
            return (
              <Reveal as="li" key={t.title} delay={i * 90}>
                <div className="group h-full rounded-3xl border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-lift">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent text-primary transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold">{t.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

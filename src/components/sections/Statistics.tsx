import { useInView } from "@/hooks/use-in-view";
import { useCountUp } from "@/hooks/use-count-up";

const STATS = [
  { value: 1284, suffix: "", label: "Items reported" },
  { value: 947, suffix: "", label: "Items reunited" },
  { value: 73, suffix: "%", label: "Successful matches" },
  { value: 12, suffix: "", label: "Campus locations" },
];

function Stat({ value, suffix, label, start }: (typeof STATS)[number] & { start: boolean }) {
  const n = useCountUp(value, start);
  return (
    <div className="relative flex flex-col-reverse rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition-colors hover:bg-white/[0.07] sm:p-8">
      <dt className="mt-2 text-sm font-medium text-white/65">{label}</dt>
      <dd className="font-display text-4xl font-extrabold tracking-tight text-white tabular-nums sm:text-5xl">
        <span aria-hidden="true">
          {n.toLocaleString("en-IN")}
          {suffix}
        </span>
        <span className="sr-only">
          {value.toLocaleString("en-IN")}
          {suffix}
        </span>
      </dd>
    </div>
  );
}

export function Statistics() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.35 });
  return (
    <section ref={ref} aria-labelledby="stats-title" className="container py-10 sm:py-16">
      <div className="relative overflow-hidden rounded-[36px] bg-[hsl(240_35%_10%)] px-6 py-12 sm:px-12 sm:py-16">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-primary/40 blur-3xl" />
          <div className="absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-[hsl(var(--lime)/0.22)] blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" />
        </div>
        <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.4fr] lg:items-center">
          <div>
            <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/80">
              This academic year
            </span>
            <h2 id="stats-title" className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Small reports. <span className="text-[hsl(var(--lime))]">Big reunions.</span>
            </h2>
            <p className="mt-3 max-w-md text-white/65">
              Every report makes the next search faster. Here's what the community has done together so far.
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-3 sm:gap-4">
            {STATS.map((s) => (
              <Stat key={s.label} {...s} start={inView} />
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

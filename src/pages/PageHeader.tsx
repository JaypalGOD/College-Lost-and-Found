import type { ReactNode } from "react";

export function PageHeader({ eyebrow, title, description, children }: { eyebrow: string; title: ReactNode; description?: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-campus-grid absolute inset-0" />
        <div className="absolute -left-32 -top-40 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,hsl(243_90%_80%/0.4),transparent)]" />
      </div>
      <div className="container page-enter pb-8 pt-10 sm:pt-14">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="mt-4 max-w-3xl text-balance font-display text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl">{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">{description}</p>}
        {children}
      </div>
    </section>
  );
}

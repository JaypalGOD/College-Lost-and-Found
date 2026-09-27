import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  action,
  id,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  action?: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        <span className="eyebrow">{eyebrow}</span>
        <h2 id={id} className="section-title mt-4 text-balance">{title}</h2>
        {description && <p className="mt-4 text-pretty text-lg text-muted-foreground">{description}</p>}
      </div>
      {action}
    </Reveal>
  );
}

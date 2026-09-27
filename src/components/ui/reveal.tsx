import * as React from "react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

/** Fades + lifts children in when they enter the viewport. */
export function Reveal({
  as: Tag = "div",
  delay = 0,
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement> & { as?: React.ElementType; delay?: number }) {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <Tag
      ref={ref}
      data-visible={inView}
      className={cn("reveal", className)}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
      {...props}
    >
      {children}
    </Tag>
  );
}

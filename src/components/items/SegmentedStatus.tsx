import { CircleAlert, LayoutGrid, PackageCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ItemStatus } from "@/types/item";

type Value = ItemStatus | "all";

const OPTIONS: { value: Value; label: string; icon: typeof LayoutGrid }[] = [
  { value: "all", label: "All", icon: LayoutGrid },
  { value: "lost", label: "Lost", icon: CircleAlert },
  { value: "found", label: "Found", icon: PackageCheck },
];

/** Accessible radio-group styled as a segmented control. */
export function SegmentedStatus({
  value,
  onChange,
  name = "status",
  className,
}: {
  value: Value;
  onChange: (v: Value) => void;
  name?: string;
  className?: string;
}) {
  return (
    <fieldset className={cn("inline-flex rounded-full border bg-muted/70 p-1", className)}>
      <legend className="sr-only">Item status</legend>
      {OPTIONS.map((opt) => {
        const checked = value === opt.value;
        const Icon = opt.icon;
        return (
          <label
            key={opt.value}
            className={cn(
              "relative inline-flex cursor-pointer select-none items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-all duration-200 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring",
              checked && "bg-background text-foreground shadow-sm",
              checked && opt.value === "lost" && "text-lost-foreground",
              checked && opt.value === "found" && "text-found-foreground",
            )}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={checked}
              onChange={() => onChange(opt.value)}
              className="sr-only"
            />
            <Icon className="h-4 w-4" aria-hidden="true" />
            {opt.label}
          </label>
        );
      })}
    </fieldset>
  );
}

import { CircleAlert, PackageCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ItemStatus } from "@/types/item";

/** Lost/Found is always shown with an icon AND a text label — never color alone. */
export function StatusBadge({ status, className }: { status: ItemStatus; className?: string }) {
  const Icon = status === "lost" ? CircleAlert : PackageCheck;
  return (
    <Badge variant={status} className={cn("uppercase tracking-wide", className)}>
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {status === "lost" ? "Lost" : "Found"}
    </Badge>
  );
}

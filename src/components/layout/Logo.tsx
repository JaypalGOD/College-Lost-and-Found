import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("h-9 w-9", className)}>
      <defs>
        <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="hsl(243 75% 60%)" />
          <stop offset="1" stopColor="hsl(262 80% 58%)" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="10" fill="url(#logo-g)" />
      <circle cx="14" cy="14" r="6.4" fill="none" stroke="#fff" strokeWidth="2.6" />
      <path d="M19 19l5.4 5.4" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" />
      <circle cx="14" cy="14" r="2.1" fill="hsl(82 78% 60%)" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      className={cn("group inline-flex items-center gap-2.5 rounded-xl", className)}
      aria-label="Campus Lost & Found — home"
    >
      <LogoMark className="transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105" />
      <span className="font-display text-[1.05rem] font-bold leading-none tracking-tight">
        Campus <span className="text-primary">Lost</span> &amp; Found
      </span>
    </Link>
  );
}

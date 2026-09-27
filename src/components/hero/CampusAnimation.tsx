import * as React from "react";
import { CircleCheck, PackageCheck, Sparkles } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * Hero illustration: a stylised 2D campus built from SVG + CSS animations.
 * Every motion uses transform/opacity only (GPU-friendly), pauses when the
 * scene is off-screen, and is disabled for `prefers-reduced-motion` users.
 */

const NOTIFICATIONS = [
  { icon: PackageCheck, tone: "found", title: "Found · Blue Hydro Flask", meta: "Main Auditorium · 2 min ago" },
  { icon: Sparkles, tone: "match", title: "92% match · AirPods Pro", meta: "Library → Help Desk" },
  { icon: CircleCheck, tone: "returned", title: "Returned · Student ID", meta: "CSE Block · just now" },
] as const;

function Chip({
  x,
  y,
  delay,
  label,
  children,
}: {
  x: number;
  y: number;
  delay: number;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="anim-float" style={{ "--delay": `${delay}s` } as React.CSSProperties}>
        <title>{label}</title>
        <rect x="2" y="6" width="60" height="60" rx="18" fill="#1f2230" opacity=".08" />
        <rect width="60" height="60" rx="18" fill="#fff" stroke="#e6e8f4" />
        <g transform="translate(30 30)">{children}</g>
      </g>
    </g>
  );
}

function Pin({ x, y, delay, color }: { x: number; y: number; delay: number; color: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx="0" cy="6" rx="10" ry="3.5" fill={color} opacity=".35" className="anim-ping" style={{ "--delay": `${delay}s` } as React.CSSProperties} />
      <ellipse cx="0" cy="6" rx="6" ry="2" fill="#1f2230" opacity=".15" />
      <g className="anim-pin" style={{ "--delay": `${delay}s` } as React.CSSProperties}>
        <path d="M0 6 C0 6 -12 -4 -12 -12 A12 12 0 0 1 12 -12 C12 -4 0 6 0 6 Z" fill={color} />
        <circle cx="0" cy="-12" r="4.5" fill="#fff" />
      </g>
    </g>
  );
}

function Tree({ x, y, scale = 1, delay = 0 }: { x: number; y: number; scale?: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx="0" cy="2" rx="26" ry="5" fill="#1f2230" opacity=".07" />
      <rect x="-4" y="-40" width="8" height="42" rx="3" fill="#9a6b4a" />
      <g className="anim-sway" style={{ "--delay": `${delay}s` } as React.CSSProperties}>
        <circle cx="0" cy="-66" r="30" fill="#49b77e" />
        <circle cx="-20" cy="-48" r="20" fill="#3fa872" />
        <circle cx="20" cy="-50" r="21" fill="#58c78c" />
        <circle cx="-8" cy="-78" r="14" fill="#6fd49d" opacity=".8" />
      </g>
    </g>
  );
}

function Cloud({ y, scale, dur, delay }: { y: number; scale: number; dur: number; delay: number }) {
  return (
    <g transform={`translate(0 ${y}) scale(${scale})`}>
      <g className="anim-drift" style={{ "--dur": `${dur}s`, "--delay": `${delay}s` } as React.CSSProperties}>
        <path d="M20 40 a18 18 0 0 1 22 -22 a24 24 0 0 1 44 6 a16 16 0 0 1 14 16 z" fill="#fff" opacity=".95" />
      </g>
    </g>
  );
}

export function CampusAnimation({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [paused, setPaused] = React.useState(false);
  const [note, setNote] = React.useState(0);

  // Pause all CSS animation when the scene scrolls out of view.
  React.useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setPaused(!e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Cycle the floating notification card.
  React.useEffect(() => {
    if (reduced || paused) return;
    const id = window.setInterval(() => setNote((n) => (n + 1) % NOTIFICATIONS.length), 3400);
    return () => window.clearInterval(id);
  }, [reduced, paused]);

  // Subtle pointer parallax (fine pointers only), throttled to one update per frame.
  React.useEffect(() => {
    const el = rootRef.current;
    if (!el || reduced || !window.matchMedia("(pointer: fine)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
        el.style.setProperty("--my", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
      });
    };
    const onLeave = () => {
      el.style.setProperty("--mx", "0");
      el.style.setProperty("--my", "0");
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  const layer = (depth: number): React.CSSProperties => ({
    transform: `translate3d(calc(var(--mx, 0) * ${depth}px), calc(var(--my, 0) * ${depth * 0.6}px), 0)`,
    transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
  });

  const current = NOTIFICATIONS[note];
  const NoteIcon = current.icon;

  return (
    <div
      ref={rootRef}
      data-paused={paused}
      className={cn("campus-scene relative aspect-[600/520] w-full select-none", className)}
    >
      <svg
        viewBox="0 0 600 520"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-labelledby="scene-title scene-desc"
      >
        <title id="scene-title">Animated campus scene</title>
        <desc id="scene-desc">
          A university building with trees and a pathway. A student checks their phone while lost items — keys,
          headphones, an ID card and a water bottle — float nearby and location pins mark where they were found.
        </desc>
        <defs>
          <clipPath id="scene-clip">
            <rect width="600" height="520" rx="36" />
          </clipPath>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e9ebff" />
            <stop offset=".7" stopColor="#f6f3ff" />
            <stop offset="1" stopColor="#fdfcff" />
          </linearGradient>
          <radialGradient id="sun" cx=".5" cy=".5" r=".5">
            <stop offset="0" stopColor="#ffe6a3" />
            <stop offset="1" stopColor="#ffe6a3" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="lawn" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#d9f3e3" />
            <stop offset="1" stopColor="#c4ebd4" />
          </linearGradient>
          <linearGradient id="door" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#6366f1" />
            <stop offset="1" stopColor="#4338ca" />
          </linearGradient>
          <path id="walk" d="M332 520 C 324 450, 316 400, 310 344" />
        </defs>

        <g clipPath="url(#scene-clip)">
          {/* Sky */}
          <rect width="600" height="520" fill="url(#sky)" />
          <circle cx="486" cy="96" r="92" fill="url(#sun)" />
          <circle cx="486" cy="96" r="30" fill="#ffd97a" opacity=".85" />

          {/* Clouds — far layer */}
          <g style={layer(-6)}>
            <Cloud y={52} scale={1} dur={46} delay={-10} />
            <Cloud y={120} scale={0.7} dur={62} delay={-38} />
            <Cloud y={20} scale={0.55} dur={54} delay={-26} />
          </g>

          {/* Hills */}
          <g style={layer(-3)}>
            <path d="M0 318 Q110 262 240 306 T600 290 V520 H0 Z" fill="#e3e6fb" />
            <path d="M0 340 Q160 300 300 328 T600 318 V520 H0 Z" fill="#d9ddf8" opacity=".6" />
          </g>

          {/* Buildings — mid layer */}
          <g style={layer(4)}>
            {/* Library wing */}
            <g>
              <rect x="86" y="248" width="120" height="96" rx="6" fill="#fff" stroke="#dcdff3" />
              <rect x="80" y="240" width="132" height="14" rx="5" fill="#c9cdf7" />
              {[0, 1, 2].map((c) =>
                [0, 1].map((r) => (
                  <rect
                    key={`l${c}${r}`}
                    x={102 + c * 34}
                    y={266 + r * 34}
                    width="20"
                    height="22"
                    rx="4"
                    fill={(c + r) % 2 ? "#ffe8a8" : "#e2e5ff"}
                    className={(c + r) % 2 ? "anim-blink" : undefined}
                    style={{ "--delay": `${c * 0.7 + r}s` } as React.CSSProperties}
                  />
                )),
              )}
              <text x="146" y="236" textAnchor="middle" fontSize="10" fontWeight="700" letterSpacing="2" fill="#6b70a0">
                LIBRARY
              </text>
            </g>

            {/* CSE block */}
            <g>
              <rect x="414" y="232" width="118" height="112" rx="6" fill="#fff" stroke="#dcdff3" />
              <rect x="408" y="224" width="130" height="14" rx="5" fill="#c9cdf7" />
              {[0, 1, 2].map((c) =>
                [0, 1, 2].map((r) => (
                  <rect
                    key={`c${c}${r}`}
                    x={428 + c * 32}
                    y={248 + r * 30}
                    width="20"
                    height="18"
                    rx="4"
                    fill={(c * 2 + r) % 3 === 0 ? "#ffe8a8" : "#e2e5ff"}
                    className={(c * 2 + r) % 3 === 0 ? "anim-blink" : undefined}
                    style={{ "--delay": `${c + r * 0.5}s` } as React.CSSProperties}
                  />
                )),
              )}
              <text x="473" y="218" textAnchor="middle" fontSize="10" fontWeight="700" letterSpacing="2" fill="#6b70a0">
                CSE BLOCK
              </text>
            </g>

            {/* Main hall */}
            <g>
              <line x1="310" y1="160" x2="310" y2="112" stroke="#6b70a0" strokeWidth="3" strokeLinecap="round" />
              <path d="M311 114 L346 122 L311 134 Z" fill="#a3e635" className="anim-flag" />
              <path d="M192 220 L310 158 L428 220 Z" fill="#f3f4ff" stroke="#dcdff3" strokeLinejoin="round" />
              <circle cx="310" cy="196" r="14" fill="#fff" stroke="#c9cdf7" strokeWidth="2" />
              <path d="M310 196 V188 M310 196 L316 199" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" />
              <rect x="204" y="218" width="212" height="122" fill="#fff" stroke="#dcdff3" />
              <rect x="198" y="214" width="224" height="10" rx="3" fill="#e5e7fb" />
              {[222, 254, 352, 384].map((x) => (
                <rect key={x} x={x} y="228" width="14" height="100" rx="3" fill="#eef0fd" stroke="#e1e4f7" />
              ))}
              <path d="M288 328 V282 A22 22 0 0 1 332 282 V328 Z" fill="url(#door)" />
              <path d="M310 262 V328" stroke="#fff" strokeOpacity=".3" />
              <rect x="196" y="328" width="228" height="8" rx="2" fill="#e5e7fb" />
              <rect x="186" y="336" width="248" height="8" rx="2" fill="#dcdff5" />
            </g>
          </g>

          {/* Lawn + path */}
          <path d="M0 356 Q300 322 600 356 V520 H0 Z" fill="url(#lawn)" />
          <path d="M246 520 C 268 446, 296 400, 290 344 L330 344 C 334 400, 372 446, 424 520 Z" fill="#f5efe3" />
          <use href="#walk" fill="none" stroke="#e3d6bf" strokeWidth="3" strokeLinecap="round" className="anim-dash" />

          {/* Traveling "search pulse" along the pathway */}
          {!reduced && (
            <g>
              <circle r="5" fill="#6366f1">
                <animateMotion dur="5s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                  <mpath href="#walk" />
                </animateMotion>
              </circle>
              <circle r="10" fill="#6366f1" opacity=".18">
                <animateMotion dur="5s" repeatCount="indefinite">
                  <mpath href="#walk" />
                </animateMotion>
              </circle>
            </g>
          )}

          {/* Trees */}
          <g style={layer(8)}>
            <Tree x={48} y={372} scale={1.05} delay={0} />
            <Tree x={560} y={366} scale={1.1} delay={-1.6} />
            <Tree x={470} y={392} scale={0.72} delay={-0.8} />
          </g>

          {/* Location pins */}
          <g style={layer(10)}>
            <Pin x={146} y={404} delay={0} color="#e8583a" />
            <Pin x={400} y={306} delay={0.9} color="#1f9d6b" />
            <Pin x={392} y={452} delay={1.7} color="#4f46e5" />
          </g>

          {/* Student */}
          <g style={layer(14)}>
            <g transform="translate(206 0)">
              <ellipse cx="0" cy="482" rx="34" ry="7" fill="#1f2230" opacity=".12" />
              <g className="anim-bob">
                {/* legs */}
                <rect x="-13" y="436" width="11" height="42" rx="5" fill="#2b2f45" />
                <rect x="3" y="436" width="11" height="42" rx="5" fill="#33385a" />
                <rect x="-17" y="472" width="17" height="9" rx="4.5" fill="#f4f4f7" />
                <rect x="1" y="472" width="17" height="9" rx="4.5" fill="#f4f4f7" />
                {/* backpack */}
                <rect x="-34" y="388" width="24" height="44" rx="9" fill="#f2994a" />
                <rect x="-30" y="410" width="16" height="14" rx="4" fill="#e07f2d" />
                {/* hoodie */}
                <path d="M-20 392 Q-20 380 -8 378 H8 Q20 380 20 392 V444 H-20 Z" fill="#4f46e5" />
                <path d="M-8 378 Q0 390 8 378" fill="none" stroke="#3b34c4" strokeWidth="3" />
                <path d="M-18 390 L-14 398" stroke="#2f2aa0" strokeWidth="3" strokeLinecap="round" />
                {/* arm + phone */}
                <path d="M14 394 Q30 404 30 418" fill="none" stroke="#4f46e5" strokeWidth="10" strokeLinecap="round" />
                <rect x="24" y="406" width="14" height="22" rx="3" fill="#1f2230" />
                <rect x="26" y="409" width="10" height="15" rx="1.5" fill="#a3e635" className="anim-blink" />
                {/* head */}
                <rect x="-5" y="370" width="10" height="10" rx="3" fill="#e9b894" />
                <circle cx="0" cy="360" r="16" fill="#f1c7a5" />
                <path d="M-16 358 Q-16 340 2 341 Q17 342 16 356 Q8 350 -2 352 Q-10 354 -16 358 Z" fill="#2b2f45" />
                <circle cx="7" cy="362" r="1.6" fill="#2b2f45" />
                <path d="M6 368 q3 2 6 0" stroke="#b9826a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </g>

              {/* Phone notification bubble */}
              <g transform="translate(28 318)">
                <g className="anim-float" style={{ "--delay": "-1s" } as React.CSSProperties}>
                  <rect x="0" y="0" width="126" height="34" rx="17" fill="#1f2230" />
                  <path d="M16 32 L10 44 L26 33 Z" fill="#1f2230" />
                  <circle cx="18" cy="17" r="7" fill="#a3e635" />
                  <path d="M14.5 17 l2.5 2.5 l4.5 -5" stroke="#1f2230" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  <text x="32" y="21.5" fontSize="12" fontWeight="600" fill="#fff">Match found!</text>
                </g>
              </g>
            </g>
          </g>

          {/* Floating lost items */}
          <g style={layer(20)}>
            <Chip x={34} y={148} delay={0} label="Keys">
              <circle cx="-6" cy="-6" r="8" fill="none" stroke="#1f9d6b" strokeWidth="4" />
              <path d="M0 0 L12 12 M8 8 L4 12 M11 11 L8 14" stroke="#d9a93a" strokeWidth="4.5" strokeLinecap="round" />
            </Chip>
            <Chip x={516} y={156} delay={-2.2} label="Headphones">
              <path d="M-14 6 V0 A14 14 0 0 1 14 0 V6" fill="none" stroke="#1f2230" strokeWidth="4" strokeLinecap="round" />
              <rect x="-18" y="2" width="9" height="15" rx="4" fill="#6366f1" />
              <rect x="9" y="2" width="9" height="15" rx="4" fill="#6366f1" />
            </Chip>
            <Chip x={466} y={418} delay={-3.4} label="Student ID card">
              <rect x="-16" y="-12" width="32" height="24" rx="4" fill="#eef0ff" stroke="#6366f1" strokeWidth="2" />
              <circle cx="-7" cy="-2" r="5" fill="#c7cbf5" />
              <rect x="1" y="-5" width="11" height="3" rx="1.5" fill="#6366f1" />
              <rect x="1" y="1" width="8" height="3" rx="1.5" fill="#c7cbf5" />
            </Chip>
            <Chip x={28} y={420} delay={-1.2} label="Water bottle">
              <rect x="-5" y="-19" width="10" height="6" rx="2" fill="#1f2230" />
              <rect x="-9" y="-13" width="18" height="32" rx="6" fill="#2f5bd3" />
              <rect x="-5" y="-6" width="4" height="16" rx="2" fill="#fff" opacity=".45" />
            </Chip>
          </g>

          {/* Magnifying glass scanning the campus */}
          <g style={layer(24)}>
            <g transform="translate(446 70)">
            <g className="anim-scan">
              <circle cx="0" cy="0" r="28" fill="#fff" opacity=".35" stroke="#1f2230" strokeWidth="6" />
              <path d="M-12 -10 A16 16 0 0 1 4 -16" stroke="#fff" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M20 20 L42 42" stroke="#1f2230" strokeWidth="10" strokeLinecap="round" />
            </g>
            </g>
          </g>
        </g>
      </svg>

      {/* Cycling live-activity card (HTML overlay for crisp text) */}
      <div
        className="glass absolute left-[4%] top-[5%] flex max-w-[64%] items-center gap-3 rounded-2xl px-3 py-2.5 shadow-soft sm:px-4"
        style={layer(-10)}
        aria-hidden="true"
      >
        <span
          className={cn(
            "grid h-9 w-9 shrink-0 place-items-center rounded-xl",
            current.tone === "found" && "bg-found-soft text-found",
            current.tone === "match" && "bg-accent text-primary",
            current.tone === "returned" && "bg-[hsl(var(--lime)/0.25)] text-found-foreground",
          )}
        >
          <NoteIcon className="h-[18px] w-[18px]" />
        </span>
        <div key={note} className="min-w-0 animate-in fade-in slide-in-from-bottom-1 duration-500">
          <p className="truncate text-[13px] font-semibold leading-tight sm:text-sm">{current.title}</p>
          <p className="truncate text-[11px] text-muted-foreground sm:text-xs">{current.meta}</p>
        </div>
      </div>

      <div
        className="glass absolute bottom-[5%] right-[4%] hidden items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium shadow-soft sm:flex"
        style={layer(-14)}
        aria-hidden="true"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-found opacity-60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-found" />
        </span>
        Live across 12 campus spots
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
import type { ItemArt, ItemCategory } from "@/types/item";

/**
 * Lightweight, local SVG illustrations for common campus items.
 * No external images → instant loading and nothing to break offline.
 */

const COLOR_HEX: Record<string, string> = {
  black: "#1f2230",
  grey: "#8a8fa3",
  blue: "#2f5bd3",
  red: "#e0483a",
  green: "#2f9e6e",
  yellow: "#f2b43a",
  brown: "#8a5a36",
  white: "#f4f5f8",
  pink: "#e86aa0",
  purple: "#7b5cf0",
  orange: "#f07a2f",
  silver: "#b9bdc9",
};

const BG: Record<ItemCategory, [string, string]> = {
  electronics: ["#eef0ff", "#dfe3ff"],
  documents: ["#fff1ec", "#ffe1d6"],
  bags: ["#eef3f8", "#dde7f1"],
  books: ["#fff7e3", "#ffedbf"],
  clothing: ["#f1f0ff", "#e2e0fb"],
  accessories: ["#f6efe8", "#eadccd"],
  keys: ["#ecfaf2", "#d4f2e2"],
  bottles: ["#eaf5ff", "#d3e9ff"],
  other: ["#f3f4f7", "#e5e7ee"],
};

const DEFAULT_ART: Record<ItemCategory, ItemArt> = {
  electronics: "earbuds",
  documents: "id-card",
  bags: "backpack",
  books: "book",
  clothing: "hoodie",
  accessories: "glasses",
  keys: "keys",
  bottles: "bottle",
  other: "generic",
};

export function defaultArtFor(category: ItemCategory): ItemArt {
  return DEFAULT_ART[category];
}

function Art({ art, c }: { art: ItemArt; c: string }) {
  switch (art) {
    case "earbuds":
      return (
        <g>
          <rect x="62" y="48" width="76" height="62" rx="26" fill={c} />
          <rect x="62" y="48" width="76" height="62" rx="26" fill="url(#shine)" />
          <line x1="64" y1="72" x2="136" y2="72" stroke="#fff" strokeOpacity=".18" strokeWidth="2" />
          <g transform="translate(78 26) rotate(-18)">
            <circle cx="0" cy="0" r="11" fill="#fff" />
            <rect x="-4" y="6" width="8" height="26" rx="4" fill="#fff" />
          </g>
          <g transform="translate(122 24) rotate(16)">
            <circle cx="0" cy="0" r="11" fill="#fff" />
            <rect x="-4" y="6" width="8" height="26" rx="4" fill="#fff" />
          </g>
          <circle cx="100" cy="92" r="3" fill="#7cf29a" />
        </g>
      );
    case "earbuds-case":
      return (
        <g>
          <rect x="58" y="44" width="84" height="68" rx="28" fill={c} />
          <rect x="58" y="44" width="84" height="68" rx="28" fill="url(#shine)" />
          <line x1="60" y1="70" x2="140" y2="70" stroke="#fff" strokeOpacity=".2" strokeWidth="2" />
          <circle cx="100" cy="94" r="3" fill="#f3c34a" />
          <rect x="93" y="108" width="14" height="4" rx="2" fill="#000" opacity=".25" />
        </g>
      );
    case "bottle":
      return (
        <g>
          <rect x="86" y="18" width="28" height="16" rx="5" fill="#2b2f3f" />
          <rect x="82" y="32" width="36" height="8" rx="3" fill="#3a3f52" />
          <path d="M80 44 Q80 38 88 38 H112 Q120 38 120 44 V124 Q120 134 110 134 H90 Q80 134 80 124 Z" fill={c} />
          <path d="M80 44 Q80 38 88 38 H112 Q120 38 120 44 V124 Q120 134 110 134 H90 Q80 134 80 124 Z" fill="url(#shine)" />
          <circle cx="96" cy="78" r="8" fill="#fff" opacity=".9" />
          <path d="M92 80 l3-5 3 4 3-3 3 4z" fill={c} />
          <rect x="100" y="98" width="14" height="10" rx="3" fill="#ffd166" transform="rotate(-10 107 103)" />
        </g>
      );
    case "id-card":
      return (
        <g>
          <path d="M100 8 L100 36" stroke={c} strokeWidth="6" strokeLinecap="round" />
          <rect x="92" y="32" width="16" height="10" rx="3" fill="#9aa0b4" />
          <rect x="56" y="40" width="88" height="94" rx="10" fill="#fff" stroke="#e4e6ef" strokeWidth="2" />
          <rect x="56" y="40" width="88" height="22" rx="10" fill="#4f46e5" />
          <rect x="56" y="52" width="88" height="10" fill="#4f46e5" />
          <circle cx="100" cy="84" r="14" fill="#e6e8f5" />
          <circle cx="100" cy="80" r="6" fill="#b3b8d4" />
          <path d="M88 94 q12 -10 24 0" fill="#b3b8d4" />
          <rect x="72" y="106" width="56" height="6" rx="3" fill="#d6d9e8" />
          <rect x="80" y="117" width="40" height="5" rx="2.5" fill="#e6e8f2" />
        </g>
      );
    case "calculator":
      return (
        <g>
          <rect x="66" y="16" width="68" height="118" rx="12" fill="#5d6275" />
          <rect x="66" y="16" width="68" height="118" rx="12" fill="url(#shine)" />
          <rect x="76" y="28" width="48" height="22" rx="4" fill="#c9e7c9" />
          <rect x="104" y="37" width="14" height="6" rx="1" fill="#37503a" opacity=".6" />
          {Array.from({ length: 16 }).map((_, i) => (
            <rect
              key={i}
              x={77 + (i % 4) * 12}
              y={60 + Math.floor(i / 4) * 16}
              width="9"
              height="10"
              rx="2.5"
              fill={i % 4 === 3 ? "#f2a33a" : "#e8eaf2"}
            />
          ))}
        </g>
      );
    case "backpack":
      return (
        <g>
          <path d="M84 30 Q100 12 116 30" fill="none" stroke="#3a3f52" strokeWidth="6" strokeLinecap="round" />
          <rect x="62" y="30" width="76" height="104" rx="24" fill={c} />
          <rect x="62" y="30" width="76" height="104" rx="24" fill="url(#shine)" />
          <rect x="74" y="82" width="52" height="40" rx="12" fill="#6b7086" />
          <line x1="82" y1="94" x2="118" y2="94" stroke="#fff" strokeOpacity=".4" strokeWidth="2" />
          <rect x="96" y="89" width="8" height="10" rx="2" fill="#d6d9e8" />
          <rect x="70" y="46" width="60" height="4" rx="2" fill="#fff" opacity=".15" />
        </g>
      );
    case "keys":
      return (
        <g>
          <circle cx="100" cy="40" r="18" fill="none" stroke={c} strokeWidth="7" />
          <g transform="rotate(-24 100 58)">
            <rect x="94" y="56" width="12" height="62" rx="4" fill="#d9b24a" />
            <circle cx="100" cy="58" r="14" fill="#e9c35c" />
            <circle cx="100" cy="58" r="5" fill="#fff" opacity=".8" />
            <rect x="106" y="98" width="10" height="6" fill="#d9b24a" />
            <rect x="106" y="108" width="7" height="6" fill="#d9b24a" />
          </g>
          <g transform="rotate(22 100 58)">
            <rect x="95" y="56" width="10" height="56" rx="4" fill="#aeb4c5" />
            <circle cx="100" cy="58" r="12" fill="#c3c8d6" />
            <circle cx="100" cy="58" r="4" fill="#fff" opacity=".8" />
            <rect x="85" y="94" width="10" height="6" fill="#aeb4c5" />
          </g>
        </g>
      );
    case "charger":
      return (
        <g>
          <path d="M60 70 C 30 70, 30 120, 70 120 S 140 130, 150 96" fill="none" stroke="#2b2f3f" strokeWidth="5" strokeLinecap="round" />
          <rect x="72" y="46" width="64" height="42" rx="8" fill="#2b2f3f" />
          <rect x="72" y="46" width="64" height="42" rx="8" fill="url(#shine)" />
          <circle cx="104" cy="67" r="7" fill="none" stroke="#fff" strokeOpacity=".4" strokeWidth="2" />
          <circle cx="150" cy="96" r="6" fill="#4b5068" />
        </g>
      );
    case "book":
      return (
        <g>
          <rect x="62" y="24" width="80" height="106" rx="6" fill="#f0f0f0" />
          <rect x="58" y="20" width="80" height="106" rx="6" fill={c} />
          <rect x="58" y="20" width="12" height="106" rx="4" fill="#000" opacity=".12" />
          <rect x="80" y="40" width="46" height="6" rx="3" fill="#fff" opacity=".85" />
          <rect x="80" y="52" width="32" height="5" rx="2.5" fill="#fff" opacity=".6" />
          <path d="M92 76 l8 -14 8 14 z" fill="none" stroke="#fff" strokeWidth="3" strokeLinejoin="round" opacity=".85" />
          <circle cx="100" cy="92" r="6" fill="none" stroke="#fff" strokeWidth="3" opacity=".85" />
        </g>
      );
    case "hoodie":
      return (
        <g>
          <path d="M72 30 Q100 18 128 30 L156 60 L140 76 L132 68 V132 H68 V68 L60 76 L44 60 Z" fill={c} />
          <path d="M72 30 Q100 18 128 30 L156 60 L140 76 L132 68 V132 H68 V68 L60 76 L44 60 Z" fill="url(#shine)" />
          <path d="M82 30 Q100 56 118 30" fill="none" stroke="#000" strokeOpacity=".2" strokeWidth="4" />
          <line x1="94" y1="40" x2="92" y2="62" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="106" y1="40" x2="108" y2="62" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="80" y="98" width="40" height="22" rx="6" fill="#000" opacity=".12" />
        </g>
      );
    case "glasses":
      return (
        <g>
          <rect x="44" y="92" width="112" height="34" rx="17" fill="#8a5a36" />
          <rect x="44" y="92" width="112" height="34" rx="17" fill="url(#shine)" />
          <rect x="48" y="44" width="46" height="34" rx="10" fill="#cfe7ff" fillOpacity=".55" stroke={c} strokeWidth="6" />
          <rect x="106" y="44" width="46" height="34" rx="10" fill="#cfe7ff" fillOpacity=".55" stroke={c} strokeWidth="6" />
          <path d="M94 56 Q100 50 106 56" fill="none" stroke={c} strokeWidth="5" />
          <path d="M56 50 l10 -4" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        </g>
      );
    case "umbrella":
      return (
        <g>
          <path d="M40 76 Q100 4 160 76 Q145 66 130 76 Q115 66 100 76 Q85 66 70 76 Q55 66 40 76 Z" fill={c} />
          <path d="M40 76 Q100 4 160 76" fill="url(#shine)" />
          <line x1="100" y1="26" x2="100" y2="122" stroke="#3a3f52" strokeWidth="4" />
          <path d="M100 122 q0 12 -12 12 q-10 0 -10 -10" fill="none" stroke="#8a5a36" strokeWidth="6" strokeLinecap="round" />
        </g>
      );
    case "laptop":
      return (
        <g>
          <rect x="52" y="30" width="96" height="66" rx="6" fill="#2b2f3f" />
          <rect x="58" y="36" width="84" height="54" rx="3" fill="#6d74ff" opacity=".85" />
          <path d="M40 100 H160 L152 112 H48 Z" fill="#b9bdc9" />
        </g>
      );
    case "wallet":
      return (
        <g>
          <rect x="52" y="42" width="96" height="70" rx="12" fill={c} />
          <rect x="52" y="42" width="96" height="70" rx="12" fill="url(#shine)" />
          <rect x="64" y="32" width="56" height="20" rx="4" fill="#4f46e5" transform="rotate(-6 92 42)" />
          <rect x="112" y="64" width="40" height="28" rx="8" fill="#000" opacity=".18" />
          <circle cx="128" cy="78" r="5" fill="#e9c35c" />
          <path d="M60 52 H140" stroke="#fff" strokeOpacity=".2" strokeDasharray="4 4" strokeWidth="2" />
        </g>
      );
    case "generic":
    default:
      return (
        <g>
          <path d="M100 26 L148 50 V104 L100 128 L52 104 V50 Z" fill="#c9a979" />
          <path d="M100 26 L148 50 L100 74 L52 50 Z" fill="#dcc195" />
          <path d="M100 74 V128" stroke="#000" strokeOpacity=".12" strokeWidth="2" />
          <path d="M76 38 L124 62 V80" stroke="#fff" strokeOpacity=".5" strokeWidth="6" fill="none" />
        </g>
      );
  }
}

export function ItemIllustration({
  art,
  category,
  color,
  image,
  alt,
  className,
}: {
  art?: ItemArt;
  category: ItemCategory;
  color?: string;
  image?: string;
  alt: string;
  className?: string;
}) {
  if (image) {
    return (
      <img
        src={image}
        alt={alt}
        loading="lazy"
        className={cn("h-full w-full object-cover", className)}
      />
    );
  }

  const [bgA, bgB] = BG[category];
  const fill = COLOR_HEX[color ?? ""] ?? "#4f46e5";
  const id = `g-${category}`;

  return (
    <svg
      viewBox="0 0 200 150"
      role="img"
      aria-label={alt}
      preserveAspectRatio="xMidYMid slice"
      className={cn("h-full w-full", className)}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={bgA} />
          <stop offset="1" stopColor={bgB} />
        </linearGradient>
        <linearGradient id="shine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".28" />
          <stop offset=".5" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="200" height="150" fill={`url(#${id})`} />
      <circle cx="170" cy="22" r="40" fill="#fff" opacity=".35" />
      <circle cx="24" cy="138" r="30" fill="#fff" opacity=".3" />
      <ellipse cx="100" cy="138" rx="52" ry="6" fill="#1f2230" opacity=".08" />
      <Art art={art ?? DEFAULT_ART[category]} c={fill} />
    </svg>
  );
}

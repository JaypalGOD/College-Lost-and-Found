import { getLocation } from "@/data/locations";
import type { ItemMatch, LostFoundItem, NewItemReport } from "@/types/item";

/**
 * Lightweight, explainable matching heuristic.
 *
 * This is intentionally isolated behind `findPossibleMatches` so it can be
 * swapped for a server-side matcher (e.g. text embeddings + image similarity)
 * without touching any UI component.
 */

const STOP_WORDS = new Set([
  "a", "an", "the", "and", "or", "in", "on", "at", "of", "with", "my", "near",
  "lost", "found", "left", "some", "it", "is", "was", "i", "to", "for", "from",
]);

function tokens(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, " ")
      .split(/[\s-]+/)
      .map((w) => w.replace(/s$/, "")) // naive singularisation: earbuds → earbud
      .filter((w) => w.length > 2 && !STOP_WORDS.has(w)),
  );
}

function itemTokens(item: Pick<LostFoundItem, "title" | "description" | "tags" | "color">) {
  return tokens([item.title, item.title, item.color, ...(item.tags ?? []), item.description].join(" "));
}

function daysBetween(a: string, b: string): number {
  return Math.abs(new Date(a).getTime() - new Date(b).getTime()) / 86_400_000;
}

export function scoreMatch(
  report: NewItemReport | LostFoundItem,
  candidate: LostFoundItem,
): ItemMatch | null {
  if (report.status === candidate.status) return null;

  let score = 0;
  const reasons: string[] = [];

  if (report.category === candidate.category) {
    score += 30;
    reasons.push("Same category");
  }

  const a = itemTokens(report);
  const b = itemTokens(candidate);
  let overlap = 0;
  a.forEach((t) => b.has(t) && overlap++);
  if (overlap > 0) {
    const textScore = Math.min(40, Math.round((overlap / Math.max(3, Math.min(a.size, 8))) * 40));
    score += textScore;
    reasons.push("Similar description");
  }

  if (report.color && candidate.color && report.color === candidate.color) {
    score += 10;
    reasons.push(`Both ${candidate.color}`);
  }

  if (report.location === candidate.location) {
    score += 15;
    reasons.push(`Same place · ${getLocation(candidate.location).name}`);
  }

  const gap = daysBetween(report.date, candidate.date);
  if (gap <= 3) {
    score += Math.round(5 - gap);
    reasons.push(gap < 1 ? "Same day" : "Within a few days");
  }

  const final = Math.min(98, score);
  return final >= 35 ? { item: candidate, score: final, reasons } : null;
}

export function findPossibleMatches(
  report: NewItemReport | LostFoundItem,
  items: LostFoundItem[],
  limit = 3,
): ItemMatch[] {
  return items
    .filter((i) => !("id" in report) || i.id !== report.id)
    .map((i) => scoreMatch(report, i))
    .filter((m): m is ItemMatch => m !== null)
    .sort((x, y) => y.score - x.score)
    .slice(0, limit);
}

/** Best-effort colour extraction from free text, used by the report form. */
const COLORS = ["black", "white", "grey", "gray", "blue", "navy", "red", "green", "yellow", "brown", "pink", "purple", "orange", "silver"];
export function detectColor(text: string): string | undefined {
  const lower = text.toLowerCase();
  const hit = COLORS.find((c) => new RegExp(`\\b${c}\\b`).test(lower));
  if (hit === "gray") return "grey";
  if (hit === "navy") return "blue";
  return hit;
}

import {
  Backpack,
  BookOpen,
  CupSoda,
  Glasses,
  IdCard,
  KeyRound,
  Package,
  Shirt,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import type { ItemCategory } from "@/types/item";

export interface CategoryMeta {
  id: ItemCategory;
  label: string;
  icon: LucideIcon;
}

export const CATEGORIES: CategoryMeta[] = [
  { id: "electronics", label: "Electronics", icon: Smartphone },
  { id: "documents", label: "ID / Documents", icon: IdCard },
  { id: "bags", label: "Bags", icon: Backpack },
  { id: "books", label: "Books", icon: BookOpen },
  { id: "clothing", label: "Clothing", icon: Shirt },
  { id: "accessories", label: "Accessories", icon: Glasses },
  { id: "keys", label: "Keys", icon: KeyRound },
  { id: "bottles", label: "Water Bottles", icon: CupSoda },
  { id: "other", label: "Other", icon: Package },
];

const byId = new Map(CATEGORIES.map((c) => [c.id, c]));

export function getCategory(id: ItemCategory): CategoryMeta {
  return byId.get(id) ?? CATEGORIES[CATEGORIES.length - 1];
}

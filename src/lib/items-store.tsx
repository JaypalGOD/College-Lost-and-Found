import * as React from "react";
import { MOCK_ITEMS } from "@/data/items";
import { itemsService } from "@/lib/items-service";
import type { LostFoundItem, NewItemReport } from "@/types/item";

interface ItemsContextValue {
  items: LostFoundItem[];
  getItem: (id: string) => LostFoundItem | undefined;
  addItem: (report: NewItemReport) => Promise<LostFoundItem>;
}

const ItemsContext = React.createContext<ItemsContextValue | null>(null);

export function ItemsProvider({ children }: { children: React.ReactNode }) {
  // Seed synchronously with mock data so the first paint is never empty.
  const [items, setItems] = React.useState<LostFoundItem[]>(MOCK_ITEMS);

  React.useEffect(() => {
    let active = true;
    itemsService.list().then((list) => active && setItems(list));
    return () => {
      active = false;
    };
  }, []);

  const addItem = React.useCallback(async (report: NewItemReport) => {
    const created = await itemsService.create(report);
    setItems((prev) => [created, ...prev]);
    return created;
  }, []);

  const value = React.useMemo<ItemsContextValue>(
    () => ({
      items,
      addItem,
      getItem: (id) => items.find((i) => i.id === id),
    }),
    [items, addItem],
  );

  return <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>;
}

export function useItems(): ItemsContextValue {
  const ctx = React.useContext(ItemsContext);
  if (!ctx) throw new Error("useItems must be used inside <ItemsProvider>");
  return ctx;
}

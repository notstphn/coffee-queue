"use client";

import { useMemo, useState } from "react";
import { ItemModal } from "../components/item-modal";
import { menuItems, type MenuItem } from "../components/menu-data";
import { MenuItemCard } from "../components/menu-item-card";
import { useOrderStore } from "../components/order-store";
import { getSocket } from "../lib/socket-client";

export default function Home() {
  const { addOrder, orders } = useOrderStore();
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const orderCount = useMemo(() => orders.length, [orders.length]);

  return (
    <div className="min-h-screen bg-[#f7f2ea]">
      <header className="sticky top-0 z-30 border-b border-white/60 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#b07b4a]">
              Coffee Queue
            </p>
            <h1 className="font-display text-2xl text-[#2a1e15]">
              Coffee, Bites and Vibes Coffeehouse
            </h1>
          </div>
          <div className="rounded-full bg-[#2a1e15] px-4 py-2 text-xs font-semibold text-white">
            {orderCount} Active Orders
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl space-y-10 px-5 pb-16 pt-8">
        <section>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#b07b4a]">
                Menu
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {menuItems.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                onSelect={setSelectedItem}
              />
            ))}
          </div>
        </section>
      </main>

      <ItemModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onAdd={({ itemName, milkType, notes, sugarLevel }) => {
          const customerName =
            window.prompt("What name should we put on the order?")?.trim() ??
            "";
          if (!customerName) {
            return;
          }

          const order = {
            id: crypto.randomUUID(),
            customerName,
            itemName,
            sugarLevel,
            milkType,
            notes,
            status: "preparing",
            createdAt: new Date().toISOString(),
          };

          addOrder(order);
          // Send the new order to the real-time server.
          getSocket().emit("new-order", order);
          setSelectedItem(null);
        }}
      />
    </div>
  );
}

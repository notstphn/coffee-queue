"use client";

import { useEffect, useMemo, useState } from "react";
import { ItemModal } from "../components/item-modal";
import { menuItems, type MenuItem } from "../components/menu-data";
import { MenuItemCard } from "../components/menu-item-card";
import { useOrderStore } from "../components/order-store";
import { getSocket } from "../lib/socket-client";

const createOrderId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `order-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export default function Home() {
  const { addOrder, orders } = useOrderStore();
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    // Establish the socket connection on page load (mobile Safari can be picky).
    getSocket();
  }, []);

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

      {showConfirmation && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 px-6 backdrop-blur-sm">
          <div className="inline-flex items-center gap-4 rounded-3xl border border-emerald-200/80 bg-emerald-50 px-6 py-4 text-base font-semibold text-emerald-700 shadow-card">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white">
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 5.29a1 1 0 0 1 .006 1.415l-7.07 7.092a1 1 0 0 1-1.42.005L3.296 8.87a1 1 0 1 1 1.408-1.42l3.2 3.18 6.364-6.34a1 1 0 0 1 1.436 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            Order sent
          </div>
        </div>
      )}
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
        onAdd={({ customerName, itemName, milkType, notes, sugarLevel }) => {
          const order = {
            id: createOrderId(),
            customerName,
            itemName,
            sugarLevel,
            milkType,
            notes,
            status: "queued",
            createdAt: new Date().toISOString(),
          };

          addOrder(order);
          // Send the new order to the real-time server.
          getSocket().emit("new-order", order);
          setSelectedItem(null);
          setShowConfirmation(true);
          window.setTimeout(() => setShowConfirmation(false), 2000);
        }}
      />
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { OrderBoardColumns } from "../../components/order-board-columns";
import type { Order } from "../../components/order-store";
import { useOrderStore } from "../../components/order-store";
import { getSocket } from "../../lib/socket-client";

export default function AdminBoard() {
  const {
    orders,
    addOrder,
    startPreparing,
    markReady,
    removeOrder,
  } = useOrderStore();
  const [mounted, setMounted] = useState(false);
  const preparing = orders.filter((order) => order.status !== "ready");
  const ready = orders.filter((order) => order.status === "ready");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const socket = getSocket();
    const handleNewOrder = (order: Order) => {
      addOrder(order);
    };

    // Listen for new orders coming from the real-time server.
    socket.on("new-order", handleNewOrder);

    return () => {
      socket.off("new-order", handleNewOrder);
    };
  }, [addOrder]);

  const handleStartPreparing = (id: string) => {
    startPreparing(id);
    getSocket().emit("order-status", { id, status: "preparing" });
  };

  const handleMarkReady = (id: string) => {
    markReady(id);
    getSocket().emit("order-status", { id, status: "ready" });
  };

  const handleRemove = (id: string) => {
    removeOrder(id);
    getSocket().emit("order-remove", { id });
  };

  return (
    <div
      className="min-h-screen bg-[#101010] text-white"
      style={{
        // Replace "/bg.png" with any background image you add to /public.
        backgroundImage: "url('/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="min-h-screen bg-black/50 backdrop-blur-[2px]">
        <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 pb-8 pt-10">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-amber-200/80">
              Coffee Queue
            </p>
            <h1 className="font-display text-3xl text-white">
              Coffee, Bites and Vibes Coffeehouse
            </h1>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-6 pb-16">
          <div className="rounded-[36px] border border-white/20 bg-white/5 p-6 shadow-soft">
            {mounted ? (
              <OrderBoardColumns
                preparing={preparing}
                ready={ready}
                onStartPreparing={handleStartPreparing}
                onMarkReady={handleMarkReady}
                onRemove={handleRemove}
              />
            ) : (
              <div className="rounded-3xl border border-dashed border-white/30 bg-white/10 p-8 text-center text-sm text-white/70">
                Loading orders…
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

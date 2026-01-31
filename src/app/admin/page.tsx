"use client";

import { useEffect } from "react";
import { OrderBoardColumns } from "../../components/order-board-columns";
import type { Order } from "../../components/order-store";
import { useOrderStore } from "../../components/order-store";
import { getSocket } from "../../lib/socket-client";

export default function AdminBoard() {
  const { orders, addOrder, markReady, removeOrder } = useOrderStore();
  const preparing = orders.filter((order) => order.status === "preparing");
  const ready = orders.filter((order) => order.status === "ready");

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
              Order Pickup Board
            </h1>
            <p className="mt-2 max-w-xl text-sm text-amber-50/80">
              Keep this screen visible for guests. Tap an order to move it to
              ready, then clear it once it&apos;s picked up.
            </p>
          </div>
          <div className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-amber-100">
            Now Serving
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-6 pb-16">
          <div className="rounded-[36px] border border-white/20 bg-white/5 p-6 shadow-soft">
            <OrderBoardColumns
              preparing={preparing}
              ready={ready}
              onMarkReady={markReady}
              onRemove={removeOrder}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { CustomerOrderCard } from "../../components/customer-order-card";
import type { Order, OrderStatus } from "../../components/order-store";
import { useOrderStore } from "../../components/order-store";
import { getSocket } from "../../lib/socket-client";

export default function CustomerDisplay() {
  const { orders, addOrder, updateOrderStatus, removeOrder } = useOrderStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const socket = getSocket();

    const handleNewOrder = (order: Order) => {
      addOrder(order);
    };

    const handleStatus = (payload: { id: string; status: OrderStatus }) => {
      updateOrderStatus(payload.id, payload.status);
    };

    const handleRemove = (payload: { id: string }) => {
      removeOrder(payload.id);
    };

    socket.on("new-order", handleNewOrder);
    socket.on("order-status", handleStatus);
    socket.on("order-remove", handleRemove);

    return () => {
      socket.off("new-order", handleNewOrder);
      socket.off("order-status", handleStatus);
      socket.off("order-remove", handleRemove);
    };
  }, [addOrder, removeOrder, updateOrderStatus]);

  const sortedOrders = useMemo(() => {
    return [...orders].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [orders]);

  const preparing = sortedOrders.filter(
    (order) => order.status === "preparing"
  );
  const ready = sortedOrders.filter((order) => order.status === "ready");

  return (
    <div
      className="min-h-screen bg-[#101010] text-white"
      style={{
        // Replace "/display-bg.png" with your own background image in /public.
        backgroundImage: "url('/display-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="min-h-screen bg-black/50 backdrop-blur-[2px]">
        <header className="mx-auto max-w-7xl px-6 pb-6 pt-10 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-amber-200/80">
            Coffee Queue
          </p>
          <h1 className="font-display text-3xl text-white">
            Order Status Board
          </h1>
        </header>

        <main className="mx-auto max-w-7xl px-6 pb-16">
          {mounted ? (
            <div className="grid gap-8 lg:grid-cols-2">
              <section className="rounded-[32px] border border-white/20 bg-white/10 p-6 shadow-soft">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-amber-200/80">
                      Preparing
                    </p>
                    <h2 className="font-display text-2xl text-white">
                      In Progress
                    </h2>
                  </div>
                  <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">
                    {preparing.length} Orders
                  </span>
                </div>
                <div className="mt-6 grid gap-6 sm:grid-cols-1">
                  {preparing.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-white/30 bg-white/5 p-6 text-center text-sm text-white/70">
                      Waiting on the first order.
                    </div>
                  ) : (
                    preparing.map((order) => (
                      <CustomerOrderCard key={order.id} order={order} />
                    ))
                  )}
                </div>
              </section>

              <section className="rounded-[32px] border border-white/20 bg-white/10 p-6 shadow-soft">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-amber-200/80">
                      Now Serving
                    </p>
                    <h2 className="font-display text-2xl text-white">
                      Ready for Pickup
                    </h2>
                  </div>
                  <span className="rounded-full bg-amber-100/80 px-3 py-1 text-xs font-semibold text-amber-900">
                    {ready.length} Ready
                  </span>
                </div>
                <div className="mt-6 grid gap-6 sm:grid-cols-1">
                  {ready.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-white/30 bg-white/5 p-6 text-center text-sm text-white/70">
                      Ready orders will appear here.
                    </div>
                  ) : (
                    ready.map((order) => (
                      <CustomerOrderCard key={order.id} order={order} />
                    ))
                  )}
                </div>
              </section>
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-white/30 bg-white/10 p-8 text-center text-sm text-white/70">
              Loading board…
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

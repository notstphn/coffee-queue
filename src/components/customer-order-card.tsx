"use client";

import type { Order } from "./order-store";

type CustomerOrderCardProps = {
  order: Order;
};

export function CustomerOrderCard({ order }: CustomerOrderCardProps) {
  return (
    <div className="rounded-3xl border border-white/30 bg-white/80 p-5 text-center shadow-soft backdrop-blur">
      <p className="text-xs uppercase tracking-[0.25em] text-[#b07b4a]">
        {order.status === "ready" ? "Now Serving" : "Preparing"}
      </p>
      <h3 className="mt-2 font-display text-2xl text-[#2a1e15]">
        {order.customerName}
      </h3>
      <p className="mt-1 text-sm font-semibold text-[#5b4a3c]">
        {order.itemName}
      </p>
    </div>
  );
}

"use client";

import type { Order } from "./order-store";

type OrderCardProps = {
  order: Order;
  onMarkReady?: (id: string) => void;
  onRemove?: (id: string) => void;
  variant?: "preparing" | "ready";
};

export function OrderCard({
  order,
  onMarkReady,
  onRemove,
  variant = "preparing",
}: OrderCardProps) {
  return (
    <div className="rounded-3xl border border-white/40 bg-white/80 p-5 shadow-soft backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[#b07b4a]">
            {variant === "ready" ? "Now Serving" : "Order"}
          </p>
          <h3 className="font-display text-xl font-semibold text-[#2a1e15]">
            {order.customerName}
          </h3>
          <p className="text-sm text-[#5b4a3c]">{order.itemName}</p>
        </div>
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-[#7c4f26]">
          {new Date(order.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-3 text-xs text-[#5b4a3c]">
        <div>
          <dt className="uppercase tracking-[0.2em] text-[#b07b4a]">Sugar</dt>
          <dd className="text-sm font-semibold text-[#2a1e15]">
            {order.sugarLevel}%
          </dd>
        </div>
        <div>
          <dt className="uppercase tracking-[0.2em] text-[#b07b4a]">Milk</dt>
          <dd className="text-sm font-semibold text-[#2a1e15]">
            {order.milkType}
          </dd>
        </div>
        {order.notes ? (
          <div className="col-span-2">
            <dt className="uppercase tracking-[0.2em] text-[#b07b4a]">Notes</dt>
            <dd className="text-sm font-semibold text-[#2a1e15]">
              {order.notes}
            </dd>
          </div>
        ) : null}
      </dl>

      {(onMarkReady || onRemove) && (
        <div className="mt-5 flex flex-wrap gap-2">
          {onMarkReady && variant === "preparing" && (
            <button
              type="button"
              onClick={() => onMarkReady(order.id)}
              className="rounded-full bg-[#2a1e15] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#3a2c21]"
            >
              Mark Ready
            </button>
          )}
          {onRemove && (
            <button
              type="button"
              onClick={() => onRemove(order.id)}
              className="rounded-full border border-[#2a1e15]/20 px-4 py-2 text-xs font-semibold text-[#2a1e15] transition hover:bg-amber-50"
            >
              Picked Up
            </button>
          )}
        </div>
      )}
    </div>
  );
}

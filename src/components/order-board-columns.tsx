"use client";

import type { Order } from "./order-store";
import { OrderCard } from "./order-card";

type OrderBoardColumnsProps = {
  preparing: Order[];
  ready: Order[];
  onMarkReady: (id: string) => void;
  onRemove: (id: string) => void;
};

export function OrderBoardColumns({
  preparing,
  ready,
  onMarkReady,
  onRemove,
}: OrderBoardColumnsProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="rounded-[32px] border border-white/40 bg-white/60 p-5 shadow-soft backdrop-blur">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#b07b4a]">
              Queue
            </p>
            <h2 className="font-display text-2xl text-[#2a1e15]">
              Preparing
            </h2>
          </div>
          <span className="rounded-full bg-[#2a1e15] px-3 py-1 text-xs font-semibold text-white">
            {preparing.length} Orders
          </span>
        </div>
        <div className="mt-5 space-y-4">
          {preparing.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-[#d8c6b6] bg-white/70 p-6 text-center text-sm text-[#5b4a3c]">
              No drinks in the queue yet.
            </div>
          ) : (
            preparing.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onMarkReady={onMarkReady}
                onRemove={onRemove}
                variant="preparing"
              />
            ))
          )}
        </div>
      </section>

      <section className="rounded-[32px] border border-white/40 bg-white/70 p-5 shadow-soft backdrop-blur">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#b07b4a]">
              Ready for Pickup
            </p>
            <h2 className="font-display text-2xl text-[#2a1e15]">
              Now Serving
            </h2>
          </div>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-[#7c4f26]">
            {ready.length} Ready
          </span>
        </div>
        <div className="mt-5 space-y-4">
          {ready.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-[#d8c6b6] bg-white/70 p-6 text-center text-sm text-[#5b4a3c]">
              Waiting on first ready order.
            </div>
          ) : (
            ready.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onRemove={onRemove}
                variant="ready"
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
}

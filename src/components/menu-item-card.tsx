"use client";

import type { MenuItem } from "./menu-data";

type MenuItemCardProps = {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
};

export function MenuItemCard({ item, onSelect }: MenuItemCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/40 bg-white/80 p-5 text-left shadow-soft transition hover:-translate-y-1 hover:shadow-card"
    >
      <div
        className={`mb-4 h-28 w-full rounded-2xl bg-gradient-to-br ${item.accent} p-4`}
      >
        <div className="flex h-full items-end justify-between text-sm font-semibold text-[#2a1e15]">
          <span className="rounded-full bg-white/70 px-2 py-1">
            {item.category}
          </span>
          <span className="text-base font-bold">{item.price}</span>
        </div>
      </div>
      <h3 className="font-display text-xl font-semibold tracking-tight text-[#2a1e15]">
        {item.name}
      </h3>
      <p className="mt-2 text-sm text-[#5b4a3c]">{item.description}</p>
      <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-[#2a1e15]">
        Customize
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#2a1e15]/20 text-lg transition group-hover:translate-x-1">
          →
        </span>
      </span>
    </button>
  );
}

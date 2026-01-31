"use client";

import { useEffect, useMemo, useState } from "react";
import type { MenuItem } from "./menu-data";

type ItemModalProps = {
  item: MenuItem | null;
  onClose: () => void;
  onAdd: (payload: {
    itemName: string;
    sugarLevel: number;
    milkType: string;
    notes: string;
  }) => void;
};

const sugarOptions = [
  { label: "0%", value: 0 },
  { label: "25%", value: 25 },
  { label: "50%", value: 50 },
  { label: "75%", value: 75 },
  { label: "100%", value: 100 },
];

const milkOptions = ["Whole", "Oat", "Almond", "Soy", "Skim"];

export function ItemModal({ item, onClose, onAdd }: ItemModalProps) {
  const [sugarLevel, setSugarLevel] = useState(50);
  const [milkType, setMilkType] = useState(milkOptions[0]);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (item) {
      setSugarLevel(50);
      setMilkType(milkOptions[0]);
      setNotes("");
    }
  }, [item]);

  const isOpen = Boolean(item);

  const sugarLabel = useMemo(() => {
    const match = sugarOptions.find((option) => option.value === sugarLevel);
    return match?.label ?? `${sugarLevel}%`;
  }, [sugarLevel]);

  if (!isOpen || !item) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/40 px-4 pb-10 pt-24 backdrop-blur-sm md:items-center">
      <div className="w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-card">
        <div className="flex items-center justify-between border-b border-amber-100 px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#b07b4a]">
              Customize
            </p>
            <h2 className="font-display text-2xl text-[#2a1e15]">
              {item.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[#2a1e15]/20 px-3 py-1 text-sm font-semibold text-[#2a1e15] transition hover:bg-amber-50"
          >
            Close
          </button>
        </div>

        <div className="space-y-6 px-6 py-6">
          <div>
            <div className="flex items-center justify-between text-sm font-semibold text-[#2a1e15]">
              <span>Sugar Level</span>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs text-[#7c4f26]">
                {sugarLabel}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-5 gap-2">
              {sugarOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setSugarLevel(option.value)}
                  className={`rounded-full border px-3 py-2 text-xs font-semibold transition ${
                    sugarLevel === option.value
                      ? "border-[#2a1e15] bg-[#2a1e15] text-white"
                      : "border-[#d8c6b6] bg-white text-[#2a1e15] hover:bg-amber-50"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-[#2a1e15]">
              Milk Type
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {milkOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setMilkType(option)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                    milkType === option
                      ? "border-[#2a1e15] bg-[#2a1e15] text-white"
                      : "border-[#d8c6b6] bg-white text-[#2a1e15] hover:bg-amber-50"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-[#2a1e15]">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Add ice preference, extra foam, or special notes."
              className="mt-2 h-24 w-full resize-none rounded-2xl border border-[#e2d3c6] bg-[#fffaf5] p-3 text-sm text-[#2a1e15] focus:border-[#2a1e15] focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-amber-100 px-6 py-5">
          <div className="text-sm text-[#5b4a3c]">{item.price}</div>
          <button
            type="button"
            onClick={() =>
              onAdd({
                itemName: item.name,
                sugarLevel,
                milkType,
                notes,
              })
            }
            className="rounded-full bg-[#2a1e15] px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-[#3a2c21]"
          >
            Add to Order
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

export type OrderStatus = "queued" | "preparing" | "ready";

export type Order = {
  id: string;
  customerName: string;
  itemName: string;
  sugarLevel: number;
  milkType: string;
  notes: string;
  status: OrderStatus;
  createdAt: string;
};

type OrderStore = {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  markReady: (id: string) => void;
  startPreparing: (id: string) => void;
  removeOrder: (id: string) => void;
};

const OrderStoreContext = createContext<OrderStore | null>(null);

export function OrderStoreProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  const addOrder = (order: Order) => {
    setOrders((prev) => {
      if (prev.some((existing) => existing.id === order.id)) {
        return prev;
      }
      return [...prev, order];
    });
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === id ? { ...order, status } : order))
    );
  };

  const markReady = (id: string) => {
    updateOrderStatus(id, "ready");
  };

  const startPreparing = (id: string) => {
    updateOrderStatus(id, "preparing");
  };

  const removeOrder = (id: string) => {
    setOrders((prev) => prev.filter((order) => order.id !== id));
  };

  const value = useMemo(
    () => ({
      orders,
      addOrder,
      updateOrderStatus,
      markReady,
      startPreparing,
      removeOrder,
    }),
    [orders]
  );

  return (
    // NOTE: Orders live only in memory, so they reset on refresh.
    <OrderStoreContext.Provider value={value}>
      {children}
    </OrderStoreContext.Provider>
  );
}

export function useOrderStore() {
  const context = useContext(OrderStoreContext);
  if (!context) {
    throw new Error("useOrderStore must be used within OrderStoreProvider.");
  }
  return context;
}

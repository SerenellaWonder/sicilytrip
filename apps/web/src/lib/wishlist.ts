"use client";

import { useCallback, useEffect, useState } from "react";

export type WishlistItem = {
  hotelId: string;
  name: string;
  image?: string;
  zone?: string;
  stars?: number;
  price?: number;
  currency?: string;
  savedAt: string;
};

const STORAGE_KEY = "sicilytrip-wishlist";
const CHANGE_EVENT = "sicilytrip-wishlist-change";

function readWishlist(): WishlistItem[] {
  if (typeof window === "undefined") return [];

  try {
    const value: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    if (!Array.isArray(value)) return [];
    return value.filter(
      (item): item is WishlistItem =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as WishlistItem).hotelId === "string" &&
        typeof (item as WishlistItem).name === "string",
    );
  } catch {
    return [];
  }
}

function writeWishlist(items: WishlistItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function useWishlist() {
  const [items, setItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const refresh = () => setItems(readWishlist());
    refresh();
    window.addEventListener(CHANGE_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(CHANGE_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const toggle = useCallback((hotel: Omit<WishlistItem, "savedAt">) => {
    const current = readWishlist();
    const exists = current.some((item) => item.hotelId === hotel.hotelId);
    const next = exists
      ? current.filter((item) => item.hotelId !== hotel.hotelId)
      : [{ ...hotel, savedAt: new Date().toISOString() }, ...current];
    writeWishlist(next);
  }, []);

  const remove = useCallback((hotelId: string) => {
    writeWishlist(readWishlist().filter((item) => item.hotelId !== hotelId));
  }, []);

  return {
    items,
    has: (hotelId: string) => items.some((item) => item.hotelId === hotelId),
    toggle,
    remove,
  };
}

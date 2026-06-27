import { apiFetch } from "./api";
import type { CartItem } from "../types/cart";

type CreateOrderItem = {
  product_id: number;
  quantity: number;
};

type CreateOrderPayload = {
  items: CreateOrderItem[];
};

export type CreatedOrder = {
  id: number;
  total: string;
  status: string;
};

export function createOrder(cart: CartItem[]): Promise<CreatedOrder> {
  const payload: CreateOrderPayload = {
    items: cart.map((item) => ({
      product_id: item.product.id,
      quantity: item.quantity,
    })),
  };

  return apiFetch<CreatedOrder>("orders/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

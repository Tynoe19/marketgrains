import type { Product } from "./products";

/** A product in the cart plus how many the user wants */
export type CartItem = {
  product: Product;
  quantity: number;
};

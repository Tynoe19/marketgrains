import { apiFetch } from "./api";
import type { Product } from "../types/products";

export function getProducts(): Promise<Product[]> {
  return apiFetch<Product[]>("products/");
}

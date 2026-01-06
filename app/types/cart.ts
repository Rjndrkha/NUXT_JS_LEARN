import type { Product } from "./product";

export interface CartItem {
  productId: number;
  quantity: number;
  product?: Product;
}

export interface Cart {
  id: number;
  userId: number;
  products: CartItem[];
}

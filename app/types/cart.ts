import type { Product } from "./product";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface Cart {
  id: number;
  userId: number;
  products: CartItem[];
}

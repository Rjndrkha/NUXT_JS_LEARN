import { defineStore } from "pinia";
import type { CartItem, Cart } from "~/types/cart";
import type { Product } from "~/types/product";

export const useCartStore = defineStore("cart", () => {
  // STATE
  const cartId = ref<number | null>(null);
  const items = ref<CartItem[]>([]);
  const loading = ref(false);

  /**
   * Ambil cart by userId
   */
  const getCart = async (userId: number) => {
    loading.value = true;

    try {
      const carts = await $fetch<Cart[]>("https://fakestoreapi.com/carts");

      const userCart = carts.find((c) => c.userId === userId);

      if (!userCart) {
        cartId.value = null;
        items.value = [];
        return;
      }

      cartId.value = userCart.id;

      // Ambil detail product per productId
      const mergedItems = await Promise.all(
        userCart.products.map(async (item: CartItem) => {
          const product = await $fetch<Product>(
            `https://fakestoreapi.com/products/${item.productId}`
          );
          return { ...item, product };
        })
      );
      items.value = mergedItems;
    } catch (err) {
      console.error(err);
      cartId.value = null;
      items.value = [];
    } finally {
      loading.value = false;
    }
  };

  /**
   * Add product (local simulasi)
   */
  const addProduct = async (product: CartItem, userId: number) => {
    if (!cartId.value) {
      const cart = await $fetch<Cart>("https://fakestoreapi.com/carts", {
        method: "POST",
        body: {
          userId,
          products: [product],
        },
      });

      cartId.value = cart.id;
      items.value = cart.products;
      return;
    }

    const exists = items.value.find((p) => p.productId === product.productId);

    if (!exists) {
      items.value.push(product);
    }

    await $fetch(`https://fakestoreapi.com/carts/${cartId.value}`, {
      method: "PUT",
      body: {
        userId,
        products: items.value,
      },
    });
  };

  /**
   * Remove product
   */
  const removeProduct = async (productId: number) => {
    if (!cartId.value) return;

    items.value = items.value.filter((p) => p.productId !== productId);

    await $fetch(`https://fakestoreapi.com/carts/${cartId.value}`, {
      method: "PUT",
      body: { products: items.value },
    });
  };

  /**
   * Checkout (delete cart)
   */
  const deleteCart = async () => {
    if (!cartId.value) return;

    await $fetch(`https://fakestoreapi.com/carts/${cartId.value}`, {
      method: "DELETE",
    });

    cartId.value = null;
    items.value = [];
  };

  return {
    cartId,
    items,
    loading,
    getCart,
    addProduct,
    removeProduct,
    deleteCart,
  };
});

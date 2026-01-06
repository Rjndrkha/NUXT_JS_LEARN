<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
import type { CartItem } from "~/types/cart";

const cart = useCartStore();
const auth = useAuthStore();

/**
 * Redirect jika belum login
 */
onMounted(async () => {
  await cart.getCart(1); // User ID 1 untuk guest cart
});

/**
 * Total harga
 */
const total = computed(() =>
  cart.items.reduce((sum, item: CartItem) => {
    if (!item.product) return sum;
    return sum + item.product.price * item.quantity;
  }, 0)
);

const checkout = async () => {
  await cart.deleteCart();
  navigateTo("/checkout");
};
</script>

<template>
  <div class="container mx-auto px-4 py-8 max-w-3xl">
    <h1 class="text-2xl font-bold mb-6">Your Cart</h1>

    <!-- Empty -->
    <div v-if="cart.items.length === 0" class="text-gray-500">
      Your cart is empty.
    </div>

    <!-- Items -->
    <div v-else class="space-y-4">
      <UCard
        v-for="item in cart.items"
        :key="item.productId"
        class="flex gap-4 items-center"
      >
        <img
          v-if="item.product"
          :src="item.product.image"
          class="h-20 w-20 object-contain"
        />

        <div class="flex-1">
          <h3 class="font-medium" v-if="item.product">
            {{ item.product.title }}
          </h3>

          <p class="text-primary font-bold mt-1" v-if="item.product">
            ${{ item.product.price }}
          </p>

          <div class="flex items-center gap-2 mt-2">
            <span>Qty: {{ item.quantity }}</span>

            <UButton
              size="xs"
              color="error"
              variant="ghost"
              class="ml-auto"
              @click="cart.removeProduct(item.productId)"
            >
              Remove
            </UButton>
          </div>
        </div>
      </UCard>

      <!-- Summary -->
      <div class="flex justify-between items-center border-t pt-4 mt-6">
        <span class="text-lg font-semibold">
          Total: ${{ total.toFixed(2) }}
        </span>

        <UButton color="primary" @click="checkout"> Checkout </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

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
  cart.items.reduce((sum, item) => sum + item.price, 0)
);

const checkout = async () => {
  await cart.deleteCart();
  navigateTo("/checkout");
};
</script>

<template>
  <div class="container mx-auto px-4 py-8 max-w-3xl">
    <h1 class="text-2xl font-bold mb-6">Your Cart</h1>

    <div v-if="cart.items.length === 0" class="text-gray-500">
      Your cart is empty.
    </div>

    <div v-else class="space-y-4">
      <UCard
        v-for="item in cart.items"
        :key="item.id"
        class="flex gap-4 items-center"
      >
        <img :src="item.image" class="h-20 w-20 object-contain" />

        <div class="flex-1">
          <h3 class="font-medium">
            {{ item.title }}
          </h3>

          <p class="text-primary font-bold mt-1">${{ item.price }}</p>

          <UButton
            size="xs"
            color="error"
            variant="ghost"
            class="ml-auto"
            @click="cart.removeProduct(item.id)"
          >
            Remove
          </UButton>
        </div>
      </UCard>

      <div class="flex justify-between items-center border-t pt-4 mt-6">
        <span class="text-lg font-semibold">
          Total: ${{ total.toFixed(2) }}
        </span>

        <UButton color="primary" @click="checkout"> Checkout </UButton>
      </div>
    </div>
  </div>
</template>

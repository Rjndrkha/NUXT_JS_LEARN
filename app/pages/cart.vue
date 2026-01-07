<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useCartStore } from "~/stores/cart";
import CartItem from "~/components/CartItem.vue";

const cart = useCartStore();

onMounted(async () => {
  await cart.getCart(1);
});

const total = computed(() =>
  cart.items.reduce((sum, item) => {
    if (!item.product) return sum;
    return sum + item.product.price * item.quantity;
  }, 0)
);

const checkout = async () => {
  await cart.deleteCart();
  navigateTo("/checkout");
};

const handleIncrease = (productId: number) => cart.increaseQuantity(productId);
const handleDecrease = (productId: number) => cart.decreaseQuantity(productId);
const handleRemove = (productId: number) => cart.removeProduct(productId);
</script>

<template>
  <div class="container mx-auto px-4 py-8 max-w-3xl">
    <h1 class="text-2xl font-bold mb-6">Your Cart</h1>

    <div v-if="cart.items.length === 0" class="text-gray-500">
      Your cart is empty.
    </div>

    <div v-else class="space-y-4">
      <CartItem
        v-for="item in cart.items"
        :key="item.productId"
        :item="{ product: item.product, quantity: item.quantity }"
        @increase="handleIncrease(item.productId)"
        @decrease="handleDecrease(item.productId)"
        @remove="handleRemove(item.productId)"
      />

      <div class="flex justify-between items-center border-t pt-4 mt-6">
        <span class="text-lg font-semibold">
          Total: ${{ total.toFixed(2) }}
        </span>

        <UButton color="primary" @click="checkout"> Checkout </UButton>
      </div>
    </div>
  </div>
</template>

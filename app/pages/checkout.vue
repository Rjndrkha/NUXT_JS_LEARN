<script setup lang="ts">
import { computed } from "vue";
import { useCartStore } from "~/stores/cart";

const cart = useCartStore();

// Ambil snapshot items terakhir sebelum dihapus
// Kalau sudah deleteCart() dijalankan, gunakan empty array
const items = computed(() => cart.items);

// Total harga
const total = computed(() =>
  items.value.reduce((sum, item) => {
    if (!item.product) return sum;
    return sum + item.product.price * item.quantity;
  }, 0)
);
</script>

<template>
  <div class="container mx-auto px-4 py-8 max-w-3xl">
    <h1 class="text-2xl font-bold mb-6">Checkout</h1>

    <div v-if="items.length === 0" class="text-green-600 font-semibold">
      ✅ Checkout berhasil! Tidak ada item tersisa.
    </div>

    <div v-else class="space-y-4">
      <p class="text-gray-500">Items yang Anda checkout:</p>

      <div
        v-for="item in items"
        :key="item.productId"
        class="flex justify-between bg-gray-800 p-4 rounded shadow"
      >
        <div class="flex items-center gap-4">
          <img
            v-if="item.product"
            :src="item.product.image"
            class="h-16 w-16 object-contain"
          />
          <div>
            <h3 class="font-medium" v-if="item.product">
              {{ item.product.title }}
            </h3>
            <p class="text-white" v-if="item.product">
              ${{ item.product.price }}
            </p>
          </div>
        </div>
        <span class="font-semibold">x{{ item.quantity }}</span>
      </div>

      <div class="flex justify-between items-center border-t pt-4 mt-6">
        <span class="text-lg font-semibold"
          >Total: ${{ total.toFixed(2) }}</span
        >
        <span class="text-green-600 font-bold">✅ Checkout berhasil!</span>
      </div>
    </div>
  </div>
</template>

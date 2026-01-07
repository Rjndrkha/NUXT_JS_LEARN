<script setup lang="ts">
import type { Product } from "~/types/product";

const props = defineProps<{
  item: {
    product?: Product;
    quantity: number;
  };
}>();

const emit = defineEmits<{
  (e: "increase"): void;
  (e: "decrease"): void;
  (e: "remove"): void;
}>();
</script>

<template>
  <UCard>
    <div class="flex flex-row gap-4 items-center bg-gray-700">
      <div class="flex flex-column justify-center p-2">
        <img
          v-if="item.product"
          :src="item.product.image"
          class="h-20 w-20 object-contain"
        />
      </div>

      <div class="flex flex-col justify-center p-2 flex-1">
        <h3 v-if="item.product" class="font-medium">
          {{ item.product.title }}
        </h3>
        <p v-if="item.product" class="text-primary font-bold mt-1">
          ${{ item.product.price }}
        </p>
      </div>

      <div class="flex">
        <div class="flex items-center gap-2 mt-2">
          <UButton size="xs" variant="ghost" @click="emit('decrease')"
            >-</UButton
          >
          <span class="px-2">{{ item.quantity }}</span>
          <UButton size="xs" variant="ghost" @click="emit('increase')"
            >+</UButton
          >
          <UButton
            size="xs"
            color="error"
            variant="ghost"
            class="ml-auto"
            @click="emit('remove')"
          >
            Remove
          </UButton>
        </div>
      </div>
    </div>
  </UCard>
</template>

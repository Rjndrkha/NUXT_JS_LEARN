<script setup lang="ts">
import type { Product } from '~/types/product'

const props = defineProps<{
  item: {
    product: Product
    quantity: number
  }
}>()

const emit = defineEmits(['increase', 'decrease', 'remove'])
</script>

<template>
  <UCard class="flex gap-4 items-center">
    <img
      :src="item.product.image"
      class="h-20 w-20 object-contain"
    />

    <div class="flex-1">
      <h3 class="font-medium">
        {{ item.product.title }}
      </h3>

      <p class="text-primary font-bold mt-1">
        ${{ item.product.price }}
      </p>

      <div class="flex items-center gap-2 mt-2">
        <UButton size="xs" @click="emit('decrease')">-</UButton>
        <span>{{ item.quantity }}</span>
        <UButton size="xs" @click="emit('increase')">+</UButton>

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
  </UCard>
</template>

<script setup lang="ts">
import type { Product } from '~/types/product'

const route = useRoute()
const cart = useCartStore()

const { data: product, pending, error } =
  useFetch<Product>(`https://fakestoreapi.com/products/${route.params.id}`)
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- loading -->
    <div v-if="pending">Loading...</div>

    <!-- error -->
    <div v-else-if="error">Failed to load product</div>

    <!-- content -->
    <div v-else-if="product" class="grid md:grid-cols-2 gap-8">
      <img :src="product.image" class="h-80 mx-auto" />

      <div>
        <h1 class="text-2xl font-bold">{{ product.title }}</h1>
        <p class="mt-4 text-gray-600">{{ product.description }}</p>
        <p class="text-xl font-bold mt-4">${{ product.price }}</p>

        <UButton
          color="primary"
          class="mt-6"
          @click="cart.addProduct(product as Product, useAuthStore().userId)"
        >
          Add to Cart
        </UButton>
      </div>
    </div>
  </div>
</template>

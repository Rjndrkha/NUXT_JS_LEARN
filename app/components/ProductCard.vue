<script setup lang="ts">
import type { Product } from "../types/product";

const props = defineProps<{
  product: Product;
}>();

const auth = useAuthStore();
const cart = useCartStore();
const route = useRoute();

const addToCart = async () => {
  if (!auth.isLoggedIn) {
    navigateTo("/login");
    return;
  }

  await cart.addProduct(props.product, auth.userId);
};
</script>

<template>
  <UCard>
    <img :src="product.image" class="h-40 mx-auto object-contain" />

    <h3 class="font-semibold mt-2 line-clamp-2">
      {{ product.title }}
    </h3>

    <p class="text-primary font-bold mt-1">${{ product.price }}</p>

    <UButton class="mt-3" block @click="addToCart"> Add to Cart </UButton>
  </UCard>
</template>

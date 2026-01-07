<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "~/stores/auth";
import { useCartStore } from "~/stores/cart";
import { useProductsStore } from "~/stores/products";

import type { Product } from "~/types/product";

// Props
const props = defineProps<{ product: Product }>();

// Stores
const auth = useAuthStore();
const cart = useCartStore();
const productsStore = useProductsStore();
const toast = useToast();

// Modal & loading
const showModal = ref(false);
const productDetail = ref<Product | null>(null);
const loadingDetail = ref(false);

// Tambah ke cart
const addToCart = async (event: Event) => {
  event.stopPropagation();
  if (!auth.isLoggedIn) {
    navigateTo("/login");
    return;
  }

  const cartItem = {
    ...props.product,
    productId: props.product.id,
    quantity: 1,
  };
  await cart.addProduct(cartItem, auth.userId);
  toast.add({
    title: "Success",
    description: "Product added to cart",
    color: "success",
  });
};

// Buka modal & fetch detail
const openModal = async () => {
  showModal.value = true; // buka modal
  loadingDetail.value = true;

  // try {
  //   const detail = await productsStore.fetchProductById(props.product.id);
  //   productDetail.value = detail as Product | null;
  // } catch {
  //   productDetail.value = null;
  // } finally {
  //   loadingDetail.value = false;
  // }
};
</script>

<template>
  <!-- Card trigger -->
  <UCard
    class="flex flex-col bg-gray-600 shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
  >
    <div class="w-full h-48">
      <img :src="product.image" class="h-40 mx-auto object-contain" />
    </div>

    <div class="h-14">
      <h3 class="font-semibold mt-2 line-clamp-2">{{ product.title }}</h3>
    </div>

    <p class="text-primary font-bold mt-1">${{ product.price }}</p>

    <UButton class="mt-3" block @click="addToCart">Add to Cart</UButton>

    <UModal :modal="false" :title="product.title">
      <UButton label="View Details" block class="mt-3" />
      <template #body>
        <div v-if="loadingDetail" class="text-center py-8">Loading...</div>

        <div v-else-if="product" class="space-y-4">
          <img :src="product.image" class="h-48 mx-auto object-contain" />
          <h3 class="font-semibold text-lg">{{ product.title }}</h3>
          <p class="text-gray-600">{{ product.description }}</p>
          <p class="text-primary font-bold">Price: ${{ product.price }}</p>
          <p class="text-sm text-gray-500">Category: {{ product.category }}</p>
          <p class="text-sm text-yellow-500">
            ⭐ Rating: {{ product.rating?.rate ?? 0 }} ({{
              product.rating?.count ?? 0
            }}
            reviews)
          </p>
        </div>
      </template>
    </UModal>
  </UCard>
</template>

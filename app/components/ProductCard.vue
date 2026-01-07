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
  showModal.value = true;
  loadingDetail.value = true;
  // try {
  const detail = await productsStore.fetchProductById(props.product.id);
  productDetail.value = detail as Product | null;
  // } catch (err) {
  //   productDetail.value = null;
  // } finally {
  //   loadingDetail.value = false;
  // }
};

// Tutup modal
const closeModal = () => {
  showModal.value = false;
  productDetail.value = null;
};
</script>

<template>
  <!-- Card trigger -->
  <UModal
    v-model:show="showModal"
    title="Product Details"
    :overlay="true"
    :close-on-click-outside="true"
  >
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
      <UButton class="mt-3" block @click="openModal">View Details</UButton>
    </UCard>

    <template #body>
      <div v-if="loadingDetail" class="text-center py-8">Loading...</div>

      <div v-else-if="productDetail" class="space-y-4">
        <img :src="productDetail.image" class="h-48 mx-auto object-contain" />
        <h3 class="font-semibold text-lg">{{ productDetail.title }}</h3>
        <p class="text-gray-600">{{ productDetail.description }}</p>
        <p class="text-primary font-bold">Price: ${{ productDetail.price }}</p>
        <p class="text-sm text-gray-500">
          Category: {{ productDetail.category }}
        </p>
        <p class="text-sm text-yellow-500">
          ⭐ Rating: {{ productDetail.rating?.rate ?? 0 }} ({{
            productDetail.rating?.count ?? 0
          }}
          reviews)
        </p>
      </div>
    </template>
  </UModal>
</template>

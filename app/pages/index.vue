<script setup lang="ts">
const productsStore = useProductsStore();

definePageMeta({
  public: true,
});
onMounted(() => {
  productsStore.fetchProducts();
});
</script>

<template>
  <div class="container mx-auto px-4 py-6">
    <h1 class="text-2xl font-bold mb-6">Products</h1>

    <div v-if="productsStore.loading">
      <USkeleton class="h-40" v-for="i in 6" :key="i" />
    </div>

    <div v-else-if="productsStore.error">
      <UAlert color="error">{{ productsStore.error }}</UAlert>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      <ProductCard
        v-for="product in productsStore.products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

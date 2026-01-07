import { defineStore } from "pinia";

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [] as any[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchProducts() {
      this.loading = true;
      try {
        this.products = await $fetch("https://fakestoreapi.com/products");
      } catch (err: any) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    async fetchProductById(id: number) {
      this.loading = true;
      try {
        const product = await $fetch(`https://fakestoreapi.com/products/${id}`);
        return product;
      } catch (err: any) {
        this.error = err.message;
        return null;
      } finally {
        this.loading = false;
      }
    },               
  },
});


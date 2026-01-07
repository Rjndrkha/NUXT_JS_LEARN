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

    async addProduct(productData: any) {
      this.loading = true;
      try {
        const newProduct = await $fetch("https://fakestoreapi.com/products", {
          method: "POST",
          body: productData,
        });
        this.products.push(newProduct);
      } catch (err: any) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    async updateProduct(id: number, updatedData: any) {
      this.loading = true;
      try {
        const updatedProduct = await $fetch(
          `https://fakestoreapi.com/products/${id}`,
          {
            method: "PUT",
            body: updatedData,
          }
        );
        const index = this.products.findIndex((p) => p.id === id);
        if (index !== -1) {
          this.products[index] = updatedProduct;
        }
      } catch (err: any) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    async deleteProduct(id: number) {
      this.loading = true;
      try {
        await $fetch(`https://fakestoreapi.com/products/${id}`, {
          method: "DELETE",
        });
        this.products = this.products.filter((p) => p.id !== id);
      } catch (err: any) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
  },
});

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";

import AdminTable from "~/components/AdminTable.vue";
import AdminModal from "~/components/AdminModal.vue";
import { useUsersStore, type User } from "~/stores/users";
import type { Product } from "~/types/product";
import type { button } from "#build/ui";
import { tr } from "zod/locales";
import { data } from "autoprefixer";

const toast = useToast();
const productsStore = useProductsStore();
const usersStore = useUsersStore();

const activeTab = ref<"products" | "users">("products");
const productForm = reactive<Partial<Product>>({});
const isEditingProduct = ref(false);

const saveProduct = async (data: Product, isEdit = false) => {
  try {
    if (isEdit && data.id) {
      await productsStore.updateProduct(data.id, data);
      toast.add({
        title: "Success",
        description: "Product updated",
        color: "success",
      });
    } else {
      await productsStore.addProduct(data);
      toast.add({
        title: "Success",
        description: "Product added",
        color: "success",
      });
    }
  } catch {
    toast.add({
      title: "Error",
      description: "Failed to save product",
      color: "error",
    });
  }
};

const deleteProduct = async (id: number) => {
  if (!confirm("Are you sure?")) return;
  await productsStore.deleteProduct(id);
  toast.add({
    title: "Success",
    description: "Product deleted",
    color: "success",
  });
};

const showUserModal = ref(false);
const userForm = reactive<Partial<User>>({});

const saveUser = async (data: any, editMode = false) => {
  try {
    if (editMode && data.id) {
      await usersStore.updateUser(data.id, data);
      toast.add({
        title: "Success",
        description: "User updated",
        color: "success",
      });
    } else {
      await usersStore.addUser(data);
      toast.add({
        title: "Success",
        description: "User added",
        color: "success",
      });
    }
    showUserModal.value = false;
  } catch {
    toast.add({
      title: "Error",
      description: "Failed to save user",
      color: "error",
    });
  }
};

const deleteUser = async (id: number) => {
  if (!confirm("Are you sure?")) return;
  await usersStore.deleteUser(id);
  toast.add({
    title: "Success",
    description: "User deleted",
    color: "success",
  });
};

onMounted(() => {
  productsStore.fetchProducts();
  usersStore.fetchUsers();
});
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Admin Dashboard</h1>

    <!-- Tabs -->
    <div class="flex gap-2 mb-4">
      <UButton
        :color="activeTab === 'products' ? 'primary' : 'neutral'"
        @click="activeTab = 'products'"
        >Products</UButton
      >
      <UButton
        :color="activeTab === 'users' ? 'primary' : 'neutral'"
        @click="activeTab = 'users'"
        >Users</UButton
      >
    </div>

    <div v-if="activeTab === 'products'">
      <AdminModal
        :mode="'add'"
        :title="isEditingProduct ? 'Edit Product' : 'Add Product'"
        :buttonLabel="'Add Product'"
        :saveButtonLabel="isEditingProduct ? 'Edit' : 'Save'"
        :fields="[
          { name: 'title', label: 'Title' },
          { name: 'price', label: 'Price', type: 'number' },
          { name: 'category', label: 'Category' },
          { name: 'image', label: 'Image URL' },
          { name: 'description', label: 'Description' },
        ]"
        :initialData="productForm"
        @save="
          (data) => {
            Object.assign(productForm, data);
            saveProduct(data, false);
          }
        "
      />

      <AdminTable :columns="['ID', 'Title', 'Price', 'Category', 'Actions']">
        <template #body>
          <tr v-for="p in productsStore.products" :key="p.id">
            <td>{{ p.id }}</td>
            <td>{{ p.title }}</td>
            <td>${{ p.price }}</td>
            <td>{{ p.category }}</td>
            <td class="flex gap-2">
              <AdminModal
                :title="'Edit Product'"
                :buttonLabel="'Edit'"
                :saveButtonLabel="'Save'"
                :fields="[
                  { name: 'title', label: 'Title' },
                  { name: 'price', label: 'Price', type: 'number' },
                  { name: 'category', label: 'Category' },
                  { name: 'image', label: 'Image URL' },
                  { name: 'description', label: 'Description' },
                ]"
                :initialData="p"
                @save="
                  (data) => {
                    Object.assign(productForm, data);
                    saveProduct(data, true);
                  }
                "
              />

              <UButton color="error" class="mb-2" @click="deleteProduct(p.id)"
                >Delete</UButton
              >
            </td>
          </tr>
        </template>
      </AdminTable>
    </div>

    <!-- Users -->
    <div v-if="activeTab === 'users'">
      <AdminModal
        :title="'Add User'"
        :buttonLabel="'Add User'"
        :saveButtonLabel="'Save'"
        :fields="[
          { name: 'username', label: 'Username' },
          { name: 'email', label: 'Email' },
          { name: 'password', label: 'Password', type: 'password' },
        ]"
        @save="
          (data) => {
            Object.assign(userForm, data);
            saveUser(data, false);
          }
        "
      />

      <AdminTable :columns="['ID', 'Username', 'Email', 'Actions']">
        <template #body>
          <tr v-for="u in usersStore.users" :key="u.id">
            <td>{{ u.id }}</td>
            <td>{{ u.username }}</td>
            <td>{{ u.email }}</td>
            <td class="flex gap-2 justify-center m-3">
              <AdminModal
                :title="'Edit User'"
                :buttonLabel="'Edit'"
                :saveButtonLabel="'Save'"
                :button-color="'warning'"
                :fields="[
                  { name: 'username', label: 'Username' },
                  { name: 'email', label: 'Email' },
                  { name: 'password', label: 'Password', type: 'password' },
                ]"
                :initialData="u"
                @save="
                  (data) => {
                    Object.assign(userForm, data);
                    saveUser(data, true);
                  }
                "
              />
              <UButton class="mb-2" color="error" @click="deleteUser(u.id)"
                >Delete</UButton
              >
            </td>
          </tr>
        </template>
      </AdminTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "~/stores/auth";

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();
const toast = useToast();

// navigation menu items tanpa onClick
const items = computed(() => {
  const menu: { label: string; to: string; active?: boolean }[] = [
    {
      label: "Admin Dashboard",
      to: "/admin",
      active: route.path.startsWith("/admin"),
    },
    { label: "Cart", to: "/cart", active: route.path === "/cart" },
  ];

  if (!auth.isLoggedIn) {
    menu.push({
      label: "Login",
      to: "/login",
      active: route.path === "/login",
    });
  }

  return menu;
});

// Logout button, diletakkan terpisah agar SPA friendly
const handleLogout = () => {
  auth.logout();
  toast.add({
    title: "Logout success",
    description: "You have been logged out.",
    color: "success",
  });
};
</script>

<template>
  <UHeader>
    <template #title>
      <Logo class="h-6 w-auto" src="/logo.svg" />
    </template>

    <UNavigationMenu :items="items" />

    <template #right>
      <UColorModeButton />

      <button
        v-if="auth.isLoggedIn"
        @click="handleLogout"
        class="ml-4 px-3 py-1 text-white rounded transition hover:bg-gray-700 bg-gray-800"
      >
        Logout
      </button>
    </template>
  </UHeader>
</template>

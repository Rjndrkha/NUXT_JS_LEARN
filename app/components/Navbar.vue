<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

const auth = useAuthStore();
const logout = () => auth.logout();
</script>

<template>
  <nav class="flex justify-between p-4">
    <NuxtLink to="/" class="font-bold">FakeStore</NuxtLink>
    <div class="flex gap-4">
      <NuxtLink to="/cart">Cart</NuxtLink>
      <button
        v-if="auth.token"
        @click="logout"
        class="text-red-500 hover:underline"
      >
        Logout
      </button>
    </div>
  </nav>
</template>

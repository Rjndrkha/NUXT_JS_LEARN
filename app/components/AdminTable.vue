<script setup lang="ts">
const props = defineProps<{
  columns: string[];
}>();
</script>

<template>
  <div class="overflow-x-auto">
    <table class="min-w-full border border-gray-300 text-center">
      <thead class="bg-gray-700">
        <tr>
          <th
            v-for="col in columns"
            :key="col"
            class="border-b border-gray-300 px-4 py-2 text-white font-semibold uppercase"
          >
            {{ col }}
          </th>
        </tr>
      </thead>
      <tbody >
        <slot name="body"></slot>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
tbody tr:hover {
  background-color: #f3f4f6; /* hover row effect */
  transition: background-color 0.2s;
}
</style>

<script setup lang="ts">
const colorMode = useColorMode();

const color = computed(() =>
  colorMode.value === "dark" ? "#020618" : "white"
);

useHead({
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { key: "theme-color", name: "theme-color", content: color },
  ],
  link: [{ rel: "icon", href: "/favicon.ico" }],
  htmlAttrs: {
    lang: "en",
  },
});

useSeoMeta({
  titleTemplate: "%s - Nuxt SaaS template",
  ogImage: "https://ui.nuxt.com/assets/templates/nuxt/saas-light.png",
  twitterImage: "https://ui.nuxt.com/assets/templates/nuxt/saas-light.png",
  twitterCard: "summary_large_image",
});

const links = [
  {
    label: "Docs",
    icon: "i-lucide-book",
    to: "/docs/getting-started",
  },
  {
    label: "Pricing",
    icon: "i-lucide-credit-card",
    to: "/pricing",
  },
  {
    label: "Blog",
    icon: "i-lucide-pencil",
    to: "/blog",
  },
  {
    label: "Changelog",
    icon: "i-lucide-history",
    to: "/changelog",
  },
];
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

  </UApp>
</template>

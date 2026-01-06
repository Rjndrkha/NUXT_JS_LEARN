import tailwindcss from "@tailwindcss/vite";
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  nitro: {
    compatibilityDate: "2026-01-06",
  },
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@nuxt/ui"],
  css: ["~/assets/css/tailwind.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  typescript: { strict: true },
});

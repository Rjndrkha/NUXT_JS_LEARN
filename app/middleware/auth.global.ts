import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to) => {
  const user = useAuthStore();

  if (to.meta.public) return;

  if (!user.token && to.path !== "/") {
    if (to.path !== "/login") {
      return navigateTo("/login");
    }
  }

  if (user.token && to.path === "/login") {
    return navigateTo("/");
  }
});

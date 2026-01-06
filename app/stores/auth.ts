import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const token = useCookie<string | null>("token", { maxAge: 60 * 60 * 24 });
  const userId = 1;
  const isLoggedIn = computed(() => !!token.value);

  const login = async (username: string, password: string) => {
    try {
      const res: any = await $fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        body: { username, password },
      });
      token.value = res.token;
      return true;
    } catch (err) {
      throw new Error("Login gagal! Username atau password salah.");
    }
  };

  const logout = () => {
    token.value = null;
    navigateTo("/login");
  };

  return { token, login, logout, isLoggedIn, userId };
});

import { defineStore } from "pinia";
import { useCookie } from "#app";
import toast from "#build/ui/toast";

export const useAuthStore = defineStore("auth", () => {
  // token disimpan di cookie
  const token = useCookie<string | null>("token", { maxAge: 60 * 60 * 24 });
  const userId = 1;

  // computed untuk mengecek login
  const isLoggedIn = computed(() => !!token.value);

  // login
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

  // logout
  const logout = () => {
    token.value = null;
    navigateTo("/");
  };

  return { token, login, logout, isLoggedIn, userId };
});

import { defineStore } from "pinia";

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

export const useUsersStore = defineStore("users", () => {
  const users = ref<User[]>([]);
  const loading = ref(false);

  const fetchUsers = async () => {
    loading.value = true;
    try {
      users.value = await $fetch<User[]>("https://fakestoreapi.com/users");
    } finally {
      loading.value = false;
    }
  };

  const addUser = async (payload: Partial<User>) => {
    await $fetch("https://fakestoreapi.com/users", {
      method: "POST",
      body: {
        id: users.value.length + 1,
        ...payload,
      },
    });
    await fetchUsers();
  };

  const updateUser = async (id: number, payload: Partial<User>) => {
    await $fetch(`https://fakestoreapi.com/users/${id}`, {
      method: "PUT",
      body: payload,
    });
    await fetchUsers();
  };

  const deleteUser = async (id: number) => {
    await $fetch(`https://fakestoreapi.com/users/${id}`, { method: "DELETE" });
    await fetchUsers();
  };

  return { users, loading, fetchUsers, addUser, updateUser, deleteUser };
});

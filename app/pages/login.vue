<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const auth = useAuthStore();
definePageMeta({
  layout: "auth",
  public: true,
});

useSeoMeta({
  title: "Login",
  description: "Login to your account to continue",
});

const state = reactive({
  username: "johnd",
  password: "m38rmF$",
  remember: true,
});

const toast = useToast();

const fields = [
  {
    name: "username",
    type: "text" as const,
    label: "Username",
    placeholder: "Enter your username",
    required: true,
  },
  {
    name: "password",
    type: "password" as const,
    label: "Password",
    placeholder: "Enter your password",
    required: true,
  },
  {
    name: "remember",
    label: "Remember me",
    type: "checkbox" as const,
  },
];

const schema = z.object({
  username: z.string().min(3, "Username is required"),
  password: z.string().min(6, "Password is required"),
});

type Schema = z.output<typeof schema>;

const loading = ref(false);

const onSubmit = async ({ data }: FormSubmitEvent<Schema>) => {
  console.log("Submitting", data);
  try {
    loading.value = true;
    await auth.login(data.username, data.password);

    toast.add({
      title: "Login success",
      description: "Welcome back!",
      color: "success",
    });

    navigateTo("/");
  } catch (err: any) {
    toast.add({
      title: "Login failed",
      description: err.message || "Invalid credentials",
      color: "error",
    });
  }
};
</script>

<template>
  <div class="w-full h-screen flex items-center justify-center">
    <div class="max-w-md w-full px-4">
      <UAuthForm
        :fields="fields"
        :schema="schema"
        title="Welcome back"
        icon="i-lucide-lock"
        submit-label="Login"
        @submit="onSubmit"
      >
        <template #description>
          Use the provided Fake Store credentials to login.
        </template>

        <template #password-hint>
          <span class="text-xs text-gray-400">
            Username: <b>johnd</b> | Password: <b>m38rmF$</b>
          </span>
        </template>

        <template #footer>
          By signing in, you agree to our
          <ULink to="/" class="text-primary font-medium">
            Terms of Service </ULink
          >.
        </template>
      </UAuthForm>
    </div>
  </div>
</template>

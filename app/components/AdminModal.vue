<template>
  <UModal :modal="false" :title="title">
    <UButton :label="buttonLabel" color="success" class="mb-2" />
    <template #body>
      <div class="space-y-2">
        <UInput
          v-for="field in fields"
          :key="field.name"
          v-model="formData[field.name]"
          :label="field.label"
          :type="field.type || 'text'"
          :placeholder="field.name || ''"
        />
      </div>
    </template>
    <template #footer>
      <UButton :color="buttonColor" @click="handleSave">{{
        saveButtonLabel
      }}</UButton>
    </template>
  </UModal>
</template>

<script setup>
const props = defineProps({
  buttonColor: {
    type: String,
    default: "primary",
  },
  title: {
    type: String,
    default: "Add Item",
  },
  buttonLabel: {
    type: String,
    default: "Open",
  },
  saveButtonLabel: {
    type: String,
    default: "Save",
  },
  fields: {
    type: Array,
    required: true,
  },
  initialData: {
    type: Object,
    default: () => ({}),
  },
  mode: {
    type: String,
    default: "add", // or 'edit'
  },
});

const emit = defineEmits(["save"]);

const formData = ref({ ...props.initialData });

const handleSave = () => {
  emit("save", formData.value);
  formData.value = { ...props.initialData };
};
</script>

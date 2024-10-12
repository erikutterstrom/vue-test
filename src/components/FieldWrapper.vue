<template>
  <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
    <label
      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
      :for="id"
      v-text="label"
    />
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "FieldWrapper",
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
};
</script>

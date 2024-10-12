<template>
  <button v-bind="$attrs" v-on="$listeners" :class="buttonClasses">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    buttonStyle: {
      type: String,
      default: "primary",
      validator: (value) => {
        return ["primary", "secondary"].includes(value);
      },
    },
  },

  computed: {
    buttonClasses() {
      return this.buttonStyle === "primary"
        ? "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        : "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded";
    },
  },
};
</script>

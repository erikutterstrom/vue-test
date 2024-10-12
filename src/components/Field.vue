<template>
  <FieldWrapper :id="id" :label="label">
    <input
      class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
      :required="required"
      :max="max"
    />
  </FieldWrapper>
</template>

<script>
import FieldWrapper from "./FieldWrapper";

export default {
  name: "Field",
  components: {
    FieldWrapper,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "text",
    },
    max: {
      type: [String, Number],
      default: undefined,
    },
    value: {
      type: String,
      default: "",
    },
  },
  computed: {
    placeholder() {
      return `Enter ${this.label}`;
    },
  },
};
</script>

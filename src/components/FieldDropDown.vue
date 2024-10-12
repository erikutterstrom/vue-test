<template>
  <FieldWrapper :id="id" :label="label">
    <div class="relative">
      <select
        :id="id"
        class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        :value="value"
        @change="$emit('input', $event.target.value)"
        required
      >
        <option disabled value="">Please select one</option>
        <option
          v-for="option in options"
          :value="option.value"
          :key="option.value"
          v-text="option.text"
        />
      </select>
      <div
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
      >
        <svg
          class="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
          />
        </svg>
      </div>
    </div>
  </FieldWrapper>
</template>

<script>
import FieldWrapper from "./FieldWrapper.vue";
export default {
  name: "FieldDropDown",
  components: {
    FieldWrapper,
  },
  props: {
    value: {
      type: [String, Number],
      default: null,
    },
    options: {
      type: Array,
      default: () => [
        { value: 1, text: "Option 1" },
        { value: 2, text: "Option 2" },
      ],
    },
    required: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
};
</script>

<template>
  <form
    class="px-3 md:px-0 md:w-8/12 mx-auto my-10"
    @submit.prevent="addNewUser"
    @keydown.enter.prevent
  >
    <div class="flex flex-wrap -mx-3 mb-6">
      <Field
        id="first-name"
        label="First Name"
        v-model="user.firstName"
        required
      />
      <Field
        id="last-name"
        label="Last Name"
        v-model="user.lastName"
        required
      />
      <Field
        id="date-of-birth"
        label="Date of Birth"
        type="date"
        v-model="user.birthDate"
        :max="currentDate"
        required
      />
      <Field id="quote" label="Favorite Quote" v-model="user.quote" required />

      <FieldDropDown
        id="profession"
        v-model="user.professionId"
        label="Profession"
        :options="professions"
        required
      />

      <FieldDropDown
        id="country"
        v-model="user.countryId"
        label="Country"
        :options="countries"
        required
      />
    </div>
    <ButtonComponent type="submit"> Save User </ButtonComponent>
  </form>
</template>

<script>
import { mapActions } from "vuex";
import FieldDropDown from "./FieldDropDown";
import ButtonComponent from "./Button";
import { PROFESSION_MAP } from "../data/profession";
import { COUNTRY_MAP } from "../data/country";
import Field from "./Field";

const generateOptions = (map) =>
  Object.entries(map).map(([key, value]) => ({
    value: key,
    text: value,
  }));

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default {
  name: "AddUser",
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        birthDate: "",
        quote: "",
        professionId: null,
        countryId: null,
      },
    };
  },
  components: {
    FieldDropDown,
    ButtonComponent,
    Field,
  },
  methods: {
    ...mapActions(["addUser"]),
    addNewUser() {
      this.addUser(this.user);
      this.user = {
        firstName: "",
        lastName: "",
        birthDate: "",
        quote: "",
        professionId: null,
        countryId: null,
      };
    },
  },
  computed: {
    professions() {
      return generateOptions(PROFESSION_MAP);
    },
    countries() {
      return generateOptions(COUNTRY_MAP);
    },
    currentDate() {
      return formatDate(new Date());
    },
  },
};
</script>

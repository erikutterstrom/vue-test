<template>
  <section>
    <div class="overflow-x-auto mb-2">
      <table class="table-auto mx-auto mb-2" v-if="users.length">
        <thead>
          <th class="px-2 py-2"></th>
          <th v-for="header in tableHeaders" :key="header" class="px-4 py-2">
            {{ header }}
          </th>
        </thead>
        <tbody>
          <tr
            v-for="user in users"
            :key="user.id"
            @click="select(user.id)"
            @keydown.enter.exact="select(user.id)"
            class="hover:bg-gray-100 cursor-pointer"
            :aria-selected="isSelected(user)"
            :aria-label="rowAriaLabel(user)"
            tabindex="0"
          >
            <td
              class="sticky-col border px-2 py-2"
              :class="{ 'bg-blue-500': isSelected(user) }"
            ></td>
            <TableCell>{{ fullName(user) }}</TableCell>
            <TableCell>{{ user.birthDate }}</TableCell>
            <TableCell>{{ userAge(user) }}</TableCell>
            <TableCell>{{ localisedProfession(user.professionId) }}</TableCell>
            <TableCell>{{ localisedCountry(user.countryId) }}</TableCell>
            <TableCell>{{ user.quote }}</TableCell>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="px-3 md:px-0 md:w-8/12 mx-auto">
      <ButtonComponent
        v-if="selected.length"
        :aria-label="`Remove ${selectedFullNames}`"
        buttonStyle="secondary"
        @click="removeSelectedUsers"
      >
        Remove
      </ButtonComponent>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ButtonComponent from "./Button";
import { PROFESSION_MAP } from "../data/profession";
import { COUNTRY_MAP } from "../data/country";
import TableCell from "./TableCell.vue";

export default {
  name: "UserList",
  components: {
    ButtonComponent,
    TableCell,
  },
  data() {
    return {
      selected: [],
    };
  },
  computed: {
    ...mapState({
      users: (state) => state.userModule.users,
    }),
    selectedFullNames() {
      return this.users
        .filter((user) => this.selected.includes(user.id))
        .map((user) => `${user.firstName} ${user.lastName}`)
        .join(", ");
    },
    tableHeaders() {
      return [
        "Namn",
        "Date of Birth",
        "Age",
        "Profession",
        "Country",
        "Favorite Quote",
      ];
    },
  },
  methods: {
    ...mapActions(["removeUsers"]),
    select(userId) {
      const index = this.selected.indexOf(userId);
      if (index === -1) {
        this.selected.push(userId);
      } else {
        this.selected.splice(index, 1);
      }
    },
    removeSelectedUsers() {
      if (!this.selected.length) {
        return;
      }
      this.removeUsers(this.selected);
      this.selected = [];
    },
    userAge(user) {
      const birthDateInMilliseconds = new Date(user.birthDate).getTime();
      const ageInMilliSeconds = Date.now() - birthDateInMilliseconds;
      return Math.floor(ageInMilliSeconds / 1000 / 60 / 60 / 24 / 365);
    },
    fullName(user) {
      return `${user.firstName} ${user.lastName}`;
    },
    localisedProfession(professionId) {
      return PROFESSION_MAP[professionId];
    },
    localisedCountry(countryId) {
      return COUNTRY_MAP[countryId];
    },
    rowAriaLabel(user) {
      const selected = this.isSelected(user);
      return `Row for ${this.fullName(user)}, date of birth ${
        user.birthDate
      }, age ${this.userAge(user)}, profession ${this.localisedProfession(
        user.professionId
      )}, country ${this.localisedCountry(user.countryId)}, favorite quote ${
        user.quote
      }. ${selected ? "Selected" : "Unselected"}. ${
        selected ? "Press enter to deselect." : "Press enter to select."
      }`;
    },
    isSelected(user) {
      return this.selected.includes(user.id);
    },
  },
};
</script>

<style scoped>
.sticky-col {
  position: sticky;
  left: 0;
  z-index: 1;
}
</style>

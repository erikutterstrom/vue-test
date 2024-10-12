import Vue from "vue";
import Vuex from "vuex";
import userModule from "./user";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    userModule,
  },
});

export default store;

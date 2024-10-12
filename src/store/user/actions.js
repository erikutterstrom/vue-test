const actions = {
  removeUsers({ commit }, userIds) {
    userIds.forEach((userId) => {
      commit("REMOVE_USER", userId);
    });
  },
  addUser({ commit }, user) {
    commit("ADD_USER", user);
  },
};

export default actions;

const mutations = {
  REMOVE_USER: (state, userId) => {
    state.users = state.users.filter((user) => user.id !== userId);
  },
  ADD_USER: (state, newUser) => {
    state.idCount += 1;
    state.users.push({ ...newUser, id: state.idCount });
  },
};

export default mutations;

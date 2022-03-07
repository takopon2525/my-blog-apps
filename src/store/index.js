import { createStore } from "vuex";

const store = createStore({
  state: {
    blogHTML: null,
  },
  mutations: {
    setBlogHTML(state, payload) {
      state.blogHTML = payload;
    },
  },
  actions: {},
});

export default store;

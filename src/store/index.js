import { createStore } from "vuex";

const store = createStore({
  state: {
    blogHTML: null,
    blogTitleImageFile: null,
    blogTitleImageName: null,
    blogTitleImageURL: null,
  },
  mutations: {
    setBlogHTML(state, payload) {
      state.blogHTML = payload;
    },
    setBlogTitleImageFile(state, payload) {
      state.blogTitleImageFile = payload;
    },
    setBlogTitleImageName(state, payload) {
      state.blogTitleImageName = payload;
    },
    setBlogTitleImageURL(state, payload) {
      state.blogTitleImageURL = payload;
    },
  },
  actions: {},
});

export default store;

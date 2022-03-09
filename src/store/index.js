import { createStore } from "vuex";

const store = createStore({
  state: {
    blogHTML: "ここから入力してください。",
    blogTitle: null,
    blogTitleImageFile: null,
    blogTitleImageName: null,
    blogTitleImageURL: null,
  },
  mutations: {
    init(state) {
      state.blogHTML = "ここから入力してください。";
      state.blogTitle = null;
      state.blogTitleImageFile = null;
      state.blogTitleImageName = null;
      state.blogTitleImageURL = null;
    },
    setBlogHTML(state, payload) {
      state.blogHTML = payload;
    },
    setBlogTitle(state, payload) {
      state.blogTitle = payload;
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

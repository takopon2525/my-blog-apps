import * as vueRouter from "vue-router";
import Home from "../views/Home.vue";
import CreatePost from "../views/CreatePost.vue";

const routes = [
  {
    path: "/",
    component: Home,
    meta: {
      title: "Home",
    },
  },
  {
    path: "/create-post",
    name: "CreatePost",
    component: CreatePost,
    meta: {
      title: "CreatePost",
    },
  },
];

const router = vueRouter.createRouter({
  history: vueRouter.createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}|MyBlog`;
  next();
});

export default router;

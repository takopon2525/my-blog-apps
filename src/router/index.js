import * as vueRouter from "vue-router";
import Home from "../views/Home.vue";
import CreatePost from "../views/CreatePost.vue";
import BlogPreview from "../views/BlogPreview.vue";
import EditBlog from "../views/EditBlog.vue";
import EditBlogPreview from "../views/EditBlogPreview.vue";
import Blog from "../views/Blog.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";

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
  {
    path: "/blog-preview",
    name: "BlogPreview",
    component: BlogPreview,
    meta: {
      title: "BlogPreview",
    },
  },
  {
    path: "/blog/:blogId",
    name: "Blog",
    component: Blog,
    meta: {
      title: "Blog",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Login",
    },
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    meta: {
      title: "Signup",
    },
  },
  {
    path: "/edit-blog",
    name: "EditBlog",
    component: EditBlog,
    meta: {
      title: "EditBlog",
    },
  },
  {
    path: "/editBlog-preview",
    name: "EditBlogPreview",
    component: EditBlogPreview,
    meta: {
      title: "EditBlogPreview",
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

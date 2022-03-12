<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import hljs from "highlight.js";
import { onMounted } from "vue";
import "highlight.js/styles/xcode.css";
import Created from "../assets/icons/created_date.svg";

const route = useRoute();
const store = useStore();

const blogPost = computed(() => {
  return store.state.blogPosts.find((e) => e.blogId === route.params.blogId);
});

onMounted(() => {
  document.querySelectorAll("pre code").forEach((el) => {
    hljs.highlightElement(el);
  });
});
</script>
<template>
  <div class="mx-20">
    <div class="flex">
      <div
        class="text-black flex items-center bg-secondary-100 text-xs uppercase font-bold rounded-full p-2 top-0 mt-2"
      >
        <img :src="Created" class="h-6 w-auto" />
        <span>{{
          new Date(blogPost.blogCreatedAt.seconds * 1000).toLocaleDateString()
        }}</span>
      </div>
    </div>
    <div class="mb-3">
      <h2>{{ blogPost.blogTitle }}</h2>
    </div>
    <div>
      <img :src="blogPost.blogImageURL" />
    </div>
    <div class="my-5" v-html="blogPost.blogHTML"></div>
  </div>
</template>
<style lang="scss" scoped>
h2 {
  padding: 0.25em 0.5em;
  color: #494949;
  background: transparent;
  border-left: solid 5px #7db4e6;
}
</style>

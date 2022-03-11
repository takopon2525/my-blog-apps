<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import hljs from "highlight.js";
import { onMounted } from "vue";
import "highlight.js/styles/xcode.css";

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
        class="text-black bg-secondary-100 text-xs uppercase font-bold rounded-full p-2 top-0 mt-2"
      >
        <svg
          class="h-6 w-6 inline-block"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{{
          new Date(blogPost.blogCreatedAt.seconds * 1000).toLocaleDateString()
        }}</span>
      </div>
    </div>
    <div>
      <h2>{{ blogPost.blogTitle }}</h2>
    </div>
    <div>
      <img width="400" height="auto" :src="blogPost.blogImageURL" />
    </div>
    <div v-html="blogPost.blogHTML"></div>
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

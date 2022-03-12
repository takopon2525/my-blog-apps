<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const handlePostBlog = async () => {
  try {
    await store.dispatch("uploadPost");
  } catch (err) {
    return;
  }
  router.push("/");
};
</script>
<template>
  <div>
    <div class="grid place-items-center">
      <h1>{{ store.state.blogTitle }}</h1>
      <img width="500" height="auto" :src="store.state.blogTitleImageURL" />
      <div v-html="store.state.blogHTML"></div>
    </div>
    <div class="ml-5 my-3">
      <button
        class="button mr-2 disabled:button--disabled"
        @click="router.push('/create-post')"
      >
        戻る
      </button>
      <button class="button mr-2" @click="handlePostBlog">
        <span>投稿</span>
      </button>
    </div>
  </div>
</template>

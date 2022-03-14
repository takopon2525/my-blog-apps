<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref } from "vue";

const store = useStore();
const router = useRouter();
const loading = ref(false);
const handlePostBlog = async () => {
  try {
    loading.value = true;
    await store.dispatch("uploadPost");
    store.commit("setSnack", {
      isOpen: true,
      message: "ブログ投稿に成功しました!",
      type: "success",
    });
  } catch (err) {
    loading.value = false;
    store.commit("setSnack", {
      isOpen: true,
      message: "プロフィール投稿に失敗しました。",
      type: "failed",
    });
    return;
  }
  loading.value = false;
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
      <button
        class="button mr-2"
        :class="loading ? 'button--disabled' : ''"
        :disabled="loading"
        @click="handlePostBlog"
      >
        <span v-if="!loading">投稿</span>
        <div v-if="loading" class="button_loading"></div>
      </button>
    </div>
  </div>
</template>

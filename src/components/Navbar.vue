<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import ProfileMenu from "../components/ProfileMenu.vue";

const store = useStore();
const router = useRouter();
const user = computed(() => store.state.user);
const isOpen = ref(false);
const toggle = () => {
  isOpen.value = !isOpen.value;
};
const handleCreatePost = () => {
  store.commit("init");
  router.push("/create-post");
};
</script>
<template>
  <nav class="flex items-center justify-between flex-wrap bg-teal-600 p-6">
    <div class="flex items-center flex-shrink-0 text-white mr-6">
      <span class="font-semibold text-2xl tracking-tight"
        >My-blog #駆け出しエンジニア</span
      >
    </div>
    <div class="block md:hidden">
      <button
        @click="toggle"
        class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
      >
        <svg
          class="fill-current h-3 w-3"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
    </div>
    <div
      :class="isOpen ? '' : 'hidden'"
      class="w-full md:flex md:items-center md:w-auto"
    >
      <div
        v-if="user"
        class="md:flex md:flex-row md:items-center md:w-auto flex flex-col"
      >
        <router-link class="nav_link" to="/">ブログ</router-link>
        <a class="nav_link" @click="handleCreatePost">投稿の作成</a>
        <ProfileMenu />
      </div>
      <div
        v-if="!user"
        class="md:flex md:flex-row md:items-center md:w-auto flex flex-col"
      >
        <router-link class="nav_link" to="/">ブログ</router-link>
        <router-link class="nav_link" to="/login">ログイン</router-link>
        <router-link class="nav_link" to="/signup">アカウント作成</router-link>
      </div>
    </div>
  </nav>
</template>

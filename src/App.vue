<script setup>
import { useStore } from "vuex";
import { onMounted, onUnmounted, watchEffect } from "vue";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import SnackBar from "./components/SnackBar.vue";

const store = useStore();
onMounted(() => {
  store.dispatch("startPostsListner");
});
onUnmounted(() => {
  store.dispatch("stopPostsListner");
});
watchEffect(() => {
  if (store.state.user) {
    store.dispatch("getUser");
  }
});
</script>

<template>
  <div class="flex flex-col bg-gray-100 min-h-screen">
    <Navbar />
    <SnackBar />
    <div class="flex-grow">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

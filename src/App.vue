<script setup>
import { useStore } from "vuex";
import { onMounted, onUnmounted } from "vue";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

const store = useStore();
onMounted(() => {
  store.dispatch("startPostsListner");
});
onUnmounted(() => {
  store.dispatch("stopPostsListner");
});
</script>

<template>
  <div class="flex flex-col bg-gray-100 min-h-screen">
    <Navbar />
    <div class="flex-grow">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { watchEffect } from "vue";

const store = useStore();
watchEffect(() => {
  if (store.state.snackbar) {
    setTimeout(() => {
      store.commit("setSnack", { isOpen: false, message: null, type: null });
    }, 3000);
  }
});
</script>
<template>
  <div
    v-show="store.state.snackbar"
    class="rounded py-2 w-auto text-white text-center fixed z-10 top-7 inset-x-1/3 transition ease-in-out duration-300"
    :class="store.state.snackType === 'success' ? 'bg-sky-400' : 'bg-red-400'"
  >
    {{ store.state.snackMessage }}
  </div>
</template>

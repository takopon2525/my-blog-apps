<script setup>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { ref, watchEffect } from "vue";

const content = ref(null);

watchEffect(() => {
  if (content.value) {
    console.log("content.value", content.value);
    // ここで情報をセットする
  }
});
</script>
<template>
  <div class="mx-auto w-4/5">
    <QuillEditor
      v-model:content="content"
      contentType="html"
      theme="snow"
      toolbar="full"
    />
  </div>
</template>

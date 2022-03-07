<script setup>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { ref, watchEffect } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import ImgFileConfirmModal from "../components/modals/ImgFileConfirmModal.vue";

const store = useStore();
const router = useRouter();
const content = ref("ここから入力してください。");
const handleFileUpload = () => {};

watchEffect(() => {
  if (content.value) {
    store.commit("setBlogHTML", content.value);
  }
});
</script>
<template>
  <div class="my-5">
    <div class="mx-auto w-4/5">
      <input
        type="text"
        class="rounded-sm appearance-none border-b-2 border-gray-600 mr-2 focus:outline-none focus:border-blue-200"
        placeholder="タイトルを入力してください。"
      />
      <label for="blog-photo" class="button">カバー画像追加</label>
      <input
        type="file"
        ref="blogPhoto"
        id="blog-photo"
        class="hidden"
        @change="handleFileUpload()"
        accept=".png,.jpgs,.jpeg"
      />
      <ImgFileConfirmModal />
    </div>
    <div class="mx-auto w-4/5">
      <QuillEditor
        v-model:content="content"
        contentType="html"
        theme="snow"
        toolbar="full"
      />
    </div>
  </div>
</template>
<style lang="scss">
.ql-container.ql-snow {
  min-height: 300px !important;
}
</style>

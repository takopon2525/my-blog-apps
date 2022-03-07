<script setup>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { ref, watchEffect, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import ImgFileConfirmModal from "../components/modals/ImgFileConfirmModal.vue";

const store = useStore();
const router = useRouter();
const blogTitle = ref(null);
const blogPhoto = ref(null);
const content = ref("ここから入力してください。");
let file = null;

const blogTitleImageName = computed(() => store.state.blogTitleImageName);
const handleFileUpload = () => {
  file = blogPhoto.value.files[0];
  store.commit("setBlogTitleImageFile", file);
  store.commit("setBlogTitleImageName", file.name);
  store.commit("setBlogTitleImageURL", URL.createObjectURL(file));
};

watchEffect(() => {
  if (content.value) {
    store.commit("setBlogHTML", content.value);
  }
  if (blogTitle.value) {
    store.commit("setBlogTitle", blogTitle.value);
  }
});
</script>
<template>
  <div class="my-5 mx-auto w-4/5">
    <div class="flex gap-2 mb-5">
      <input
        type="text"
        class="rounded-sm appearance-none border-b-2 border-gray-600 mr-2 focus:outline-none focus:border-blue-200"
        placeholder="タイトルを入力してください。"
        v-model="blogTitle"
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
      <span v-if="blogTitleImageName"
        >選択されたファイル名：{{ blogTitleImageName }}</span
      >
      <span v-else>ファイルは未選択です。</span>
    </div>
    <div>
      <QuillEditor
        v-model:content="content"
        contentType="html"
        theme="snow"
        toolbar="full"
      />
    </div>
    <div class="mt-5">
      <button
        class="button mr-2 button--disabled"
        :disabled="!store.state.blogTitle || !store.state.blogTitleImageURL"
      >
        投稿
      </button>
      <button
        class="button mr-2 button--disabled"
        :disabled="!store.state.blogTitle || !store.state.blogTitleImageURL"
      >
        プレビュー
      </button>
    </div>
  </div>
</template>
<style lang="scss">
.ql-container.ql-snow {
  min-height: 300px !important;
}
</style>

<script setup>
import { QuillEditor } from "@vueup/vue-quill";
import ImageUploader from "quill-image-uploader";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { ref as vueRef, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import ImgFileConfirmModal from "../components/modals/ImgFileConfirmModal.vue";
import { storage } from "../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const store = useStore();
const router = useRouter();
const blogPhoto = vueRef(null);
let file = null;
const modules = {
  name: "imageUploader",
  module: ImageUploader,
  options: {
    upload: (file) => {
      console.log("file", file);
      return new Promise((resolve, reject) => {
        const storageRef = ref(
          storage,
          `documents/blogPostPhotos/${file.name}`
        );
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          async (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {},
          async () => {
            const downLoadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downLoadURL);
          }
        );
      });
    },
  },
};

const blogTitle = computed({
  get() {
    return store.state.blogTitle;
  },
  set(val) {
    store.commit("setBlogTitle", val);
  },
});

const content = computed({
  get() {
    return store.state.blogHTML;
  },
  set(val) {
    store.commit("setBlogHTML", val);
  },
});

const handleFileUpload = () => {
  file = blogPhoto.value.files[0];
  store.commit("setBlogTitleImageFile", file);
  store.commit("setBlogTitleImageName", file.name);
  store.commit("setBlogTitleImageURL", URL.createObjectURL(file));
};

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
      <span v-if="store.state.blogTitleImageName"
        >選択されたファイル名：{{ store.state.blogTitleImageName }}</span
      >
      <span v-else>ファイルは未選択です。</span>
    </div>
    <div>
      <QuillEditor
        v-model:content="content"
        contentType="html"
        theme="snow"
        toolbar="full"
        :modules="modules"
      />
    </div>
    <div class="mt-5">
      <button
        class="button mr-2 button--disabled"
        :disabled="!store.state.blogTitle || !store.state.blogTitleImageURL"
        @click="handlePostBlog"
      >
        編集
      </button>
      <button
        class="button mr-2 button--disabled"
        :disabled="!store.state.blogTitle || !store.state.blogTitleImageURL"
        @click="router.push('/editBlog-preview')"
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

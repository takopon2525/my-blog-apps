<script setup>
import Edit from "../assets/icons/edit-regular.svg";
import Reload from "../assets/icons/reload.svg";
import createdDate from "../assets/icons/created_date.svg";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import DeleteModal from "../components/modals/DeleteModal.vue";

const router = useRouter();
const store = useStore();
const props = defineProps({
  editEnabled: Boolean,
  post: Object,
});
const editPost = () => {
  store.commit("setBlogTitle", props.post.blogTitle);
  store.commit("setBlogTitleImageName", props.post.blogImageName);
  store.commit("setBlogTitleImageURL", props.post.blogImageURL);
  store.commit("setBlogHTML", props.post.blogHTML);
  router.push("/edit-blog");
};
const deletePost = () => {};
</script>
<template>
  <div class="card relative">
    <img
      class="cursor-pointer w-full"
      :src="props.post.blogImageURL"
      @click="
        router.push({
          name: 'Blog',
          params: { blogId: `${props.post.blogId}` },
        })
      "
    />
    <div class="flex gap-2 mt-1">
      <div class="ml-4" v-if="props.post?.blogEditedAt">
        <img :src="Reload" class="blogCard_icon_img" />
        <span>{{
          new Date(props.post.blogEditedAt.seconds * 1000).toLocaleDateString()
        }}</span>
      </div>
      <div class="ml-4">
        <img :src="createdDate" class="blogCard_icon_img" />
        <span>{{
          new Date(props.post.blogCreatedAt.seconds * 1000).toLocaleDateString()
        }}</span>
      </div>
    </div>
    <div class="ml-4 mt-2">
      <router-link
        class="link"
        :to="{ name: 'Blog', params: { blogId: `${props.post.blogId}` } }"
        >{{ props.post.blogTitle }}</router-link
      >
      <div class="flex">
        <span class="block text-gray-500 text-sm py-2 mr-2"
          >編集者：テスト太郎</span
        >
        <span class="block text-gray-500 text-sm py-2">作成者：テスト次郎</span>
      </div>
    </div>
    <div class="icons" v-if="props.editEnabled">
      <div class="icon" @click="editPost(props.post)">
        <img :src="Edit" class="icon_img" />
      </div>
      <DeleteModal :post="props.post" />
    </div>
  </div>
</template>

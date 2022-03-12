<script setup>
import Edit from "../assets/icons/edit-regular.svg";
import Delete from "../assets/icons/trash-regular.svg";
import Reload from "../assets/icons/reload.svg";
import createdDate from "../assets/icons/created_date.svg";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();
const props = defineProps({
  editEnabled: Boolean,
  post: Object,
});
const editPost = () => {
  store.commit("setBlogTitle", props.blogTitle);
  store.commit("setBlogTitleImageName", props.blogTitleImageName);
  store.commit("setBlogTitleImageURL", props.blogTitleImageURL);
  store.commit("setBlogHTML", props.blogHTML);
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
      <div class="icon ml-2" @click="deletePost(props.post)">
        <img :src="Delete" class="icon_img" />
      </div>
    </div>
  </div>
</template>

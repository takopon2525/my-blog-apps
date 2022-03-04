<script setup>
import Edit from "../assets/icons/edit-regular.svg";
import Delete from "../assets/icons/trash-regular.svg";
import Reload from "../assets/icons/reload.svg";
import createdDate from "../assets/icons/created_date.svg";

const props = defineProps({
  editEnabled: Boolean,
  post: Object,
});
</script>
<template>
  <div class="card relative">
    <img class="cursor-pointer w-full" :src="props.post.blogImage" />
    <div class="flex gap-2 mt-1">
      <div class="ml-4">
        <img :src="Reload" class="blogCard_icon_img" />
        <span>2022/3/3</span>
      </div>
      <div class="ml-4">
        <img :src="createdDate" class="blogCard_icon_img" />
        <span>2022/3/3</span>
      </div>
    </div>
    <div class="ml-4 mt-2">
      <router-link class="link" to="#">ブログタイトル</router-link>
      <div class="flex">
        <span class="block text-gray-500 text-sm py-2 mr-2"
          >編集者：テスト太郎</span
        >
        <span class="block text-gray-500 text-sm py-2">作成者：テスト次郎</span>
      </div>
    </div>
    <div class="icons" v-if="props.editEnabled">
      <div class="icon">
        <img :src="Edit" class="icon_img" />
      </div>
      <div class="icon ml-2">
        <img :src="Delete" class="icon_img" />
      </div>
    </div>
  </div>
</template>

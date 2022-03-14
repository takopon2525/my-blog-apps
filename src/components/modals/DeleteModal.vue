<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import Delete from "../../assets/icons/trash-regular.svg";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogTitle,
} from "@headlessui/vue";

const store = useStore();
const loading = ref(false);
const props = defineProps({
  post: Object,
});
const isOpen = ref(false);

const closeModal = () => {
  isOpen.value = false;
};
const openModal = () => {
  isOpen.value = true;
};

const deletePost = async () => {
  try {
    loading.value = true;
    await store.dispatch("deleteBlog", { blogId: props.post.blogId });
    store.commit("setSnack", {
      isOpen: true,
      message: "選択した記事が削除されました。",
      type: "success",
    });
  } catch (err) {
    loading.value = false;
    store.commit("setSnack", {
      isOpen: true,
      message: "選択した記事の削除に失敗しました。",
      type: "failed",
    });
    return;
  }
  loading.value = false;
  isOpen.value = false;
};
</script>
<template>
  <div>
    <div @click="openModal" class="icon ml-2">
      <img :src="Delete" class="icon_img" />
    </div>
  </div>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal">
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="min-h-screen px-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div
              class="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                {{ props.post.blogTitle }}
                <br />を削除してもいいですか？
              </DialogTitle>
              <div class="mt-2">
                <p>※一度削除した記事は、全て削除されます。</p>
              </div>

              <div class="mt-4">
                <button type="button" class="button" @click="closeModal">
                  閉じる
                </button>
                <button
                  type="button"
                  class="ml-2 delete_button"
                  @click="deletePost"
                  :class="loading ? 'delete_button--disabled' : ''"
                  :disabled="loading"
                >
                  削除
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

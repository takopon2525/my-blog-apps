<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogTitle,
} from "@headlessui/vue";

const store = useStore();
const isOpen = ref(false);

const closeModal = () => {
  isOpen.value = false;
};
const openModal = () => {
  isOpen.value = true;
};
</script>
<template>
  <div>
    <button
      type="button"
      @click="openModal"
      class="button button--disabled"
      :disabled="!store.state.blogTitleImageName"
    >
      画像の確認
    </button>
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
                {{ store.state.blogTitleImageName }}
              </DialogTitle>
              <div class="mt-2">
                <img :src="store.state.blogTitleImageURL" />
              </div>

              <div class="mt-4">
                <button
                  type="button"
                  class="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  @click="closeModal"
                >
                  閉じる
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

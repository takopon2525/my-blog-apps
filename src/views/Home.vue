<script setup>
import { ref } from "@vue/reactivity";
import BlogCard from "../components/BlogCard.vue";
import { Switch } from "@headlessui/vue";

const enabled = ref(false);
</script>

<template>
  <div class="mx-5">
    <div class="text-center my-10">
      <h1
        class="text-2xl tracking-tight font-bold text-gray-900 sm:text-3xl md:text-4xl"
      >
        <span class="block xl:inline">0 to Web Engineer!</span>
        {{ " " }}
        <span class="block text-indigo-600 xl:inline"
          >Nuxt.js,Vue.js,Tailwindcss,Firebase</span
        >
      </h1>
      <p class="mt-3 text-base font-bold text-gray-500">
        モダンフレームなフレームワークを使って、最速でエンジニアへ
      </p>
    </div>
    <div class="flex justify-between mt-5">
      <h2 class="font-bold">最新の投稿</h2>
      <div class="flex items-center">
        <p
          class="font-bold pr-2 transition ease-in-out duration-200"
          :class="enabled ? 'text-black' : 'text-gray-400'"
        >
          記事の編集/削除
        </p>
        <Switch
          v-model="enabled"
          :class="enabled ? 'bg-teal-600' : 'bg-teal-800'"
          class="inline-flex flex-shrink-0 h-[28px] w-[57px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          <span class="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            :class="enabled ? 'translate-x-7' : 'translate-x-0'"
            class="pointer-events-none inline-block h-[24px] w-[24px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200"
          />
        </Switch>
      </div>
    </div>
    <div class="my-5">
      <BlogCard :editEnabled="enabled" />
    </div>
  </div>
</template>

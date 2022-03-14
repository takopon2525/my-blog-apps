<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();
const router = useRouter();
const initial = computed(() => {
  return store.state.userInfo?.name?.slice(0, 1);
});
const menus = [
  { text: "プロフィール", value: "profile" },
  { text: "ログアウト", value: "signout" },
];
const handleClick = (menu) => {
  if (menu.value === "signout") {
    store.dispatch("logout");
    router.push("/login");
  } else {
    router.push(menu.value);
  }
};
</script>

<template>
  <div class="">
    <Menu as="div" class="ml-3 relative">
      <div>
        <MenuButton
          class="w-10 h-10 bg-gray-600 flex text-white text-xl uppercase items-center justify-center font-bold rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
        >
          {{ initial }}
        </MenuButton>
      </div>
      <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <MenuItems
          class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <template v-for="menu in menus">
            <MenuItem v-slot="{ active }">
              <a
                @click.prevent.stop="handleClick(menu)"
                :class="[
                  active ? 'bg-gray-100' : '',
                  'block px-4 py-2 text-sm text-gray-700',
                ]"
                >{{ menu.text }}</a
              >
            </MenuItem>
          </template>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

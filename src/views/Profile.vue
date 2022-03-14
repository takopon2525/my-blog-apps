<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";

const error = ref(null);
const store = useStore();
const nickName = ref("");
const email = ref("");
const loading = ref(false);

onMounted(() => {
  nickName.value = store.state.userInfo.name;
  email.value = store.state.userInfo.email;
});
const handleSubmit = async () => {
  loading.value = true;
  try {
    await store.dispatch("updateUser", {
      nickName: nickName.value,
    });
    await store.dispatch("getUser");
  } catch (err) {
    return;
  }
  loading.value = false;
};
</script>
<template>
  <div class="mt-10 flex flex-col items-center justify-center bg-gray-100">
    <div
      class="flex flex-col bg-white shadow-md px-10 py-8 rounded-3xl w-50 w-96"
    >
      <div class="font-medium self-center text-3xl text-gray-800">
        プロフィール
      </div>
      <div class="mt-10">
        <form @submit.prevent="handleSubmit">
          <div class="flex flex-col mb-6">
            <label for="password" class="form_label">ニックネーム</label>
            <input
              type="text"
              v-model="nickName"
              class="form_input"
              placeholder="ニックネーム"
            />
          </div>
          <div class="flex flex-col mb-5">
            <label for="email" class="form_label">メールアドレス</label>
            <input
              disabled
              type="email"
              name="email"
              :value="email"
              class="form_input"
              placeholder="メールアドレス"
            />
          </div>

          <div class="flex w-full">
            <button
              type="submit"
              class="form_button flex mt-2 items-center justify-center"
              :class="loading ? 'button--disabled' : ''"
              :disabled="loading"
            >
              <span class="mr-2 uppercase">プロフィールの変更 </span>
              <div v-if="loading" class="button_loading"></div>
            </button>
          </div>
          <div v-if="error">{{ error }}</div>
        </form>
      </div>
    </div>
  </div>
</template>

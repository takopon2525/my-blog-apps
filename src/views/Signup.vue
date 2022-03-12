<script setup>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Arrow from "../assets/icons/arrow.svg";

const nickName = ref("");
const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref(null);

const store = useStore();
const router = useRouter();
const handleSubmit = async () => {
  try {
    loading.value = true;
    await store.dispatch("signup", {
      email: email.value,
      password: password.value,
    });
    await store.dispatch("userSettings", {
      nickName: nickName.value,
      uid: store.state.user.uid,
      email: email.value,
    });
    loading.value = false;
    router.push("/");
  } catch (err) {
    loading.value = false;
    error.value = err.message;
  }
};
</script>
<template>
  <div class="mt-10 flex flex-col items-center justify-center bg-gray-100">
    <div
      class="flex flex-col bg-white shadow-md px-10 py-8 rounded-3xl w-50 w-96"
    >
      <div class="font-medium self-center text-3xl text-gray-800">
        アカウント作成
      </div>
      <div class="mt-4 self-center text-sm text-gray-800">
        登録情報を入力して、アイディアをシェアしよう
      </div>
      <div class="mt-10">
        <form @submit.prevent="handleSubmit">
          <div class="flex flex-col mb-5">
            <label for="name" class="form_label">ニックネーム</label>
            <input
              type="text"
              name="name"
              v-model="nickName"
              class="form_input"
              placeholder="ニックネーム"
            />
          </div>
          <div class="flex flex-col mb-5">
            <label for="email" class="form_label">メールアドレス</label>
            <input
              type="email"
              name="email"
              v-model="email"
              class="form_input"
              placeholder="メールアドレス"
            />
          </div>
          <div class="flex flex-col mb-6">
            <label for="password" class="form_label">パスワード</label>
            <input
              type="password"
              v-model="password"
              class="form_input"
              placeholder="パスワード"
            />
          </div>

          <div class="flex w-full">
            <button
              :disabled="loading"
              type="submit"
              class="form_button flex mt-2 items-center justify-center"
              :class="loading ? 'button--disabled' : ''"
            >
              <span>登録</span>
              <div v-if="loading" class="button_loading"></div>
              <span v-if="!loading">
                <img :src="Arrow" class="h-6 w-auto" />
              </span>
            </button>
          </div>
          <div v-if="error">{{ error }}</div>
        </form>
      </div>
    </div>
  </div>
</template>

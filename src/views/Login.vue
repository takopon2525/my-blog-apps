<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref(null);

const store = useStore();
const router = useRouter();
const handleSubmit = async () => {
  try {
    loading.value = true;
    await store.dispatch("login", {
      email: email.value,
      password: password.value,
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
        ようこそtaka-logへ！
      </div>
      <div class="mt-10">
        <form @submit.prevent="handleSubmit">
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
              class="login_button flex mt-2 items-center justify-center"
              :class="loading ? 'button--disabled' : ''"
            >
              <span class="mr-2 uppercase">ログイン</span>
              <div v-if="loading" class="button_loading"></div>
              <span v-if="!loading">
                <svg
                  class="h-6 w-6"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
            </button>
          </div>
          <div v-if="error">{{ error }}</div>
        </form>
      </div>
    </div>
  </div>
</template>

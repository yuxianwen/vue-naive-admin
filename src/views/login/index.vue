<template>
  <div class="login flex justify-center items-center">
    <n-form
      class="form text-white"
      ref="formRef"
      :model="formValue"
      :rules="rules"
      @submit.passive="submit"
    >
      <h1 class="text-center text-white">系统登录</h1>
      <n-form-item class="-mb-5" path="username">
        <n-input
          v-model:value="formValue.username"
          placeholder="请输入账号"
          size="large"
          round
          clearable
        >
          <template #prefix>
            <n-icon :component="UserRegular" />
          </template>
        </n-input>
      </n-form-item>
      <n-form-item path="password">
        <n-input
          v-model:value="formValue.password"
          placeholder="请输入密码"
          size="large"
          type="password"
          show-password-on="click"
          round
          clearable
        >
          <template #prefix>
            <n-icon :component="Lock" />
          </template>
        </n-input>
      </n-form-item>
      <n-button
        class="mb-3"
        size="large"
        attr-type="submit"
        type="primary"
        round
        block
        :loading="loading"
        :disabled="loading"
        >登录</n-button
      >
      <div class="flex justify-between">
        <div>
          <p>账号 : admin密码 : 随便填</p>
          <p>账号 : editor 密码 : 随便填</p>
        </div>
        <n-button type="primary">第三方登录</n-button>
      </div>
    </n-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { UserRegular, Lock } from "@vicons/fa";
import { FormInst, useMessage } from "naive-ui";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const name = "Login";
const formRef = ref<FormInst | null>(null);
const router = useRouter();
const loading = ref(false);
const store = useStore();
const formValue = ref({
  username: "admin",
  password: "123",
});

const rules = {
  username: {
    required: true,
    message: "请输入账号",
    trigger: ["input"],
  },
  password: {
    required: true,
    message: "请输入密码",
    trigger: ["input"],
  },
};

const submit = () => {
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      loading.value = true;
      await store.dispatch("user/GET_TOKEN", formValue);
      loading.value = false;
      router.push({ path: "/" });
    } else {
      console.log(errors);
    }
  });
};
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  background-color: #101015;
}

.form {
  width: 350px;
}
</style>
